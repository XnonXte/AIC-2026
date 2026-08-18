# Trash Classification YOLO App

This project contains a FastAPI backend and a Vite + React frontend for uploading images, selecting a YOLO model, and receiving classified detection results.

## Project structure

```text
AIC-2026/
├── app.py
├── requirements.txt
├── Dockerfile
├── README.md
├── .gitignore
├── models/
│   ├── can_model.pt
│   ├── cardboard_model.pt
│   └── pet_model.pt
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   └── src/
└── .venv/   # local Python environment
```

## Backend setup

From the repository root:

```bash
python -m venv .venv

# Windows PowerShell
.venv\Scripts\Activate.ps1

# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
```

Place the trained YOLO model weights in the root `models/` folder:

```text
models/
├── can_model.pt
├── cardboard_model.pt
└── pet_model.pt
```

The backend exposes these model names:

- `can`
- `cardboard`
- `pet`

## Start the backend server

From the repository root:

```bash
python app.py
```

Or:

```bash
uvicorn app:app --host 0.0.0.0 --port 7860 --reload
```

The API documentation is available at:

```text
http://localhost:7860/docs
```

## Frontend setup

Install the frontend dependencies:

```bash
cd frontend
npm install
```

## Start the frontend server

```bash
cd frontend
npm run dev -- --host 0.0.0.0
```

The frontend will typically run at:

```text
http://localhost:5173
```

## Run both together

Open two terminals:

1. Backend:

```bash
python app.py
```

2. Frontend:

```bash
cd frontend
npm run dev -- --host 0.0.0.0
```

Then open the frontend URL in the browser and use the backend API at `http://localhost:7860`.

## Example prediction request

```bash
curl -X POST "http://localhost:7860/predict" \
  -F "model=can" \
  -F "image=@test.jpg"
```

## Example response

```json
{
  "model": "can",
  "image": {
    "width": 1920,
    "height": 1080
  },
  "object_count": 2,
  "detections": [
    {
      "class": "Grade_A",
      "confidence": 0.96,
      "bounding_box": {
        "x1": 350,
        "y1": 120,
        "x2": 470,
        "y2": 250
      }
    }
  ]
}
```

## Production build

To build the frontend for deployment:

```bash
cd frontend
npm run build
```

Then preview it locally:

```bash
cd frontend
npm run preview -- --host 0.0.0.0
```

## Notes

- The backend includes `GET /health` and `GET /models` endpoints.
- The confidence threshold is configurable with `CONFIDENCE_THRESHOLD`.
- CORS is enabled for local development and can be restricted with `CORS_ORIGINS`.
- The app automatically uses CUDA when available and falls back to CPU otherwise.
- Local environment files and Python virtual environments are intentionally ignored by Git.
