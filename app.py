from __future__ import annotations

import os
from io import BytesIO
from pathlib import Path
from typing import Any

import torch
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, Field
from PIL import Image, UnidentifiedImageError
from ultralytics import YOLO

BASE_DIR = Path(__file__).resolve().parent
MODEL_REGISTRY = {
    "can": "models/can_model.pt",
    "cardboard": "models/cardboard_model.pt",
    "pet": "models/pet_model.pt",
}
SUPPORTED_IMAGE_FORMATS = {"JPEG", "PNG", "BMP", "WEBP", "TIFF"}
DEFAULT_CONFIDENCE_THRESHOLD = float(os.getenv("CONFIDENCE_THRESHOLD", "0.25"))


class BoundingBox(BaseModel):
    x1: int
    y1: int
    x2: int
    y2: int


class DetectionItem(BaseModel):
    class_name: str = Field(alias="class")
    confidence: float
    bounding_box: BoundingBox

    model_config = ConfigDict(populate_by_name=True)


class ImageInfo(BaseModel):
    width: int
    height: int


class PredictionResponse(BaseModel):
    model: str
    image: ImageInfo
    object_count: int
    detections: list[DetectionItem]


def get_device() -> str:
    return "cuda" if torch.cuda.is_available() else "cpu"


def get_allowed_origins() -> list[str]:
    raw_value = os.getenv("CORS_ORIGINS", "*")
    if raw_value.strip() == "*":
        return ["*"]
    return [origin.strip() for origin in raw_value.split(",") if origin.strip()]


def load_model_registry() -> dict[str, YOLO]:
    loaded_models: dict[str, YOLO] = {}
    for model_name, relative_model_path in MODEL_REGISTRY.items():
        model_path = (BASE_DIR / relative_model_path).resolve()
        if not model_path.exists():
            raise FileNotFoundError(f"Model file not found for '{model_name}': {model_path}")
        try:
            model = YOLO(str(model_path))
            model.to(get_device())
            loaded_models[model_name] = model
        except Exception as exc:  # pragma: no cover - defensive guard for startup validation
            raise RuntimeError(f"Failed to load model '{model_name}' from {model_path}") from exc
    return loaded_models


def create_app() -> FastAPI:
    app = FastAPI(
        title="Trash Classification YOLO API",
        version="1.0.0",
        description="Detect trash quality classes using YOLO models.",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=get_allowed_origins(),
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.on_event("startup")
    async def startup_event() -> None:
        app.state.device = get_device()
        try:
            app.state.models = load_model_registry()
        except Exception as exc:  # pragma: no cover - startup should fail loudly if model loading fails
            raise RuntimeError("Model loading failed during startup") from exc

    @app.get("/health")
    async def health() -> dict[str, str]:
        return {"status": "ok"}

    @app.get("/models")
    async def get_models() -> dict[str, list[str]]:
        return {"models": list(MODEL_REGISTRY.keys())}

    @app.post("/predict", response_model=PredictionResponse)
    async def predict(
        image: UploadFile = File(..., description="Uploaded image to classify."),
        model: str = Form(..., description="Model name to use: can, cardboard, or pet."),
    ) -> PredictionResponse:
        if image is None:
            raise HTTPException(status_code=400, detail="Missing image.")

        if not image.filename:
            raise HTTPException(status_code=400, detail="Missing image filename.")

        if not model or not model.strip():
            raise HTTPException(status_code=400, detail="Missing model parameter.")

        model_name = model.strip().lower()
        if model_name not in MODEL_REGISTRY:
            available = ", ".join(MODEL_REGISTRY.keys())
            raise HTTPException(status_code=400, detail=f"Invalid model name. Choose one of: {available}")

        image_bytes = await image.read()
        if not image_bytes:
            raise HTTPException(status_code=400, detail="Uploaded image is empty.")

        try:
            with Image.open(BytesIO(image_bytes)) as pil_image:
                pil_image.load()
                image_format = (pil_image.format or "").upper()
                if image_format not in SUPPORTED_IMAGE_FORMATS:
                    raise ValueError(f"Unsupported image format: {image_format or 'unknown'}")
                width, height = pil_image.size
                image_object = pil_image.copy()
        except (UnidentifiedImageError, OSError, ValueError) as exc:
            raise HTTPException(status_code=400, detail="Invalid or unsupported image file.") from exc

        try:
            model_instance = app.state.models[model_name]
            threshold = float(os.getenv("CONFIDENCE_THRESHOLD", str(DEFAULT_CONFIDENCE_THRESHOLD)))
            prediction = model_instance(image_object, conf=threshold, device=app.state.device, verbose=False)[0]
        except Exception as exc:
            raise HTTPException(status_code=500, detail="Inference failed.") from exc

        detections: list[DetectionItem] = []
        if prediction.boxes is not None:
            for box in prediction.boxes:
                class_id = int(box.cls.item())
                confidence = float(box.conf.item())
                if confidence < threshold:
                    continue

                x1, y1, x2, y2 = [int(value) for value in box.xyxy[0].tolist()]
                class_name = prediction.names.get(class_id, str(class_id))
                detections.append(
                    DetectionItem(
                        class_name=class_name,
                        confidence=round(confidence, 6),
                        bounding_box={
                            "x1": x1,
                            "y1": y1,
                            "x2": x2,
                            "y2": y2,
                        },
                    )
                )

        return PredictionResponse(
            model=model_name,
            image={"width": width, "height": height},
            object_count=len(detections),
            detections=detections,
        )

    return app


app = create_app()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=7860)
