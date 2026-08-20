import React, { useState, useRef, useEffect } from 'react';
import { Upload, Camera, X, FlaskConical, Package, Container, Check } from 'lucide-react';
import { MATERIALS } from '../data/mockData';

/**
 * DesktopCameraView Component - Sesuai Mockup Design
 * Dark mode dengan layout optimal
 */
export default function DesktopCameraView({
  onCapture,
  selectedMaterial,
  setSelectedMaterial,
  scenario,
  setScenario
}) {
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.warn("Camera access denied:", err);
      setCameraError("Kamera tidak dapat diakses. Gunakan drag & drop untuk upload gambar.");
      setIsCameraActive(false);
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleFileUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const preview = event.target.result;
        setPreviewImage(preview);
        setIsCameraActive(false);
        onCapture({ file, preview });
      };
      reader.readAsDataURL(file);
    }
  };

  const submitCapture = async () => {
    const preview = captureFromCamera();
    if (!preview) return;
    const file = selectedFile || new File([await (await fetch(preview)).blob()], 'camera-capture.jpg', { type: 'image/jpeg' });
    onCapture({ file, preview });
  };

  // Capture from video stream
  const captureFromCamera = () => {
    if (videoRef.current && isCameraActive) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0);
      return canvas.toDataURL('image/jpeg');
    }
    return previewImage; // Return preview if available
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 24px',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      color: '#FFFFFF',
      height: '100%'
    }}>
      <h1 style={{
        fontSize: '28px',
        fontWeight: 700,
        marginBottom: '32px',
        color: '#FFFFFF'
      }}>
        Foto Material
      </h1>

      {/* Material Tabs */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '32px',
        flexWrap: 'wrap'
      }}>
        {MATERIALS.map((material) => {
          const isActive = selectedMaterial === material.id;
          const bgColor = isActive ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.05)';
          const borderColor = isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.15)';
          const textColor = '#FFFFFF';

          return (
            <button
              key={material.id}
              onClick={() => setSelectedMaterial(material.id)}
              style={{
                backgroundColor: bgColor,
                border: isActive ? '1.5px solid ' + borderColor : '1px solid ' + borderColor,
                padding: '10px 24px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: textColor,
                cursor: 'pointer',
                fontWeight: 500,
                transition: 'all 0.2s ease',
                fontSize: '14px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = bgColor;
              }}
            >
              {material.id === 'pet' ? (
                <FlaskConical size={18} color="#FFFFFF" />
              ) : material.id === 'kardus' ? (
                <Package size={18} color="#FFFFFF" />
              ) : (
                <Container size={18} color="#FFFFFF" />
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>{material.name}</span>
                {isActive && <Check size={16} color="var(--color-accent-gold)" strokeWidth={3} />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Viewfinder */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        style={{
          width: '100%',
          maxWidth: '800px',
          height: '400px',
          backgroundColor: '#161412',
          borderRadius: '24px',
          border: dragActive ? '2px solid #d97706' : '1.5px dashed rgba(255, 255, 255, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          cursor: dragActive ? 'copy' : 'default',
          transition: 'all 0.2s ease'
        }}
      >
        {/* Camera Stream */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: isCameraActive ? 'block' : 'none'
          }}
        />

        {/* Preview Image */}
        {!isCameraActive && previewImage && (
          <img
            src={previewImage}
            alt="Material preview"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        )}

        {/* Empty State */}
        {!isCameraActive && !previewImage && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}>
            <Camera size={42} color="rgba(255, 255, 255, 0.35)" />
          </div>
        )}

        {/* Camera Controls Overlay */}
        {previewImage && (
          <button
            onClick={() => setPreviewImage(null)}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <div style={{
          color: '#D1D5DB',
          width: 'min(100%, 520px)',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 8px 0' }}>
            Pastikan pencahayaan cukup terang.
          </p>
          <p style={{ fontSize: '14px', fontWeight: 500, margin: 0 }}>
            Sebarkan material, jangan menumpuk &gt; 2 lapis.
          </p>
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          style={{
            padding: '10px 18px',
            backgroundColor: '#d97706',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Upload size={14} />
          Upload foto
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
          style={{ display: 'none' }}
        />
      </div>

      {/* Shutter Button */}
      <div style={{
        marginTop: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
      }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            className="pulse-glow-ring"
            style={{
              position: 'absolute',
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              pointerEvents: 'none'
            }}
          />
          <button
            onClick={submitCapture}
            style={{
              width: '66px',
              height: '66px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '4px solid rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.6)',
              transition: 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
              outline: 'none',
              zIndex: 2
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.92)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
        <p style={{
          fontSize: '12px',
          color: '#6B7280',
          marginTop: '12px',
          margin: '12px 0 0 0'
        }}>
          (demo → klik untuk lanjut)
        </p>
      </div>
    </div>
  );
}
