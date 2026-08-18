import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, Upload, RefreshCw, SwitchCamera, Sparkles, Check, FlaskConical, Package, Container, Lightbulb } from 'lucide-react';
import { MATERIALS } from '../data/mockData';

/**
 * CameraView Component (Enhanced Mobile UI/UX)
 * Features:
 * - Live camera stream with fallback to file upload
 * - Touch-optimized material chips (PET, Kardus, Kaleng) with active state animations
 * - Animated Shutter button with outer pulse ring
 * - Glassmorphic floating tips overlay
 */
export default function CameraView({ onCapture, selectedMaterial, setSelectedMaterial, scenario, setScenario }) {
  const [showLightingTip, setShowLightingTip] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  // Start live webcam stream if supported
  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.warn("Camera access denied or unavailable:", err);
      setCameraError("Kamera HP tidak dapat diakses, menggunakan mode simulasi.");
      setIsCameraActive(false);
    }
  };

  // Stop camera stream on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Handle image upload fallback
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
        setIsCameraActive(false);
      };
      reader.readAsDataURL(file);
    }
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

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#0C0A09',
        color: '#FFFFFF',
        position: 'relative',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}
    >
      {/* Top Header Bar */}
      <div
        style={{
          padding: '16px 16px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', width: '100%' }}>

          <span
            style={{
              fontSize: '15px',
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.3px',
              color: '#FFFFFF'
            }}
          >
            Foto Material
          </span>
        </div>

        {/* Toggle Live Camera / File Upload button */}

      </div>

      {/* Material Filter Chips (PET, Kardus, Kaleng) */}
      <div
        style={{
          padding: '12px 16px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '8px'
        }}
      >
        {MATERIALS.map((item) => {
          const isActive = selectedMaterial === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedMaterial(item.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                padding: '12px 6px',
                borderRadius: '14px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                minHeight: '44px',
                border: isActive ? '1.5px solid #FFFFFF' : '1px solid rgba(255, 255, 255, 0.15)',
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.05)',
                color: '#FFFFFF',
                boxShadow: isActive ? '0 4px 12px rgba(0, 0, 0, 0.3)' : 'none',
                transform: isActive ? 'scale(1.02)' : 'scale(1)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                outline: 'none'
              }}
            >
              {item.id === 'pet' ? (
                <FlaskConical size={20} color="#FFFFFF" />
              ) : item.id === 'kardus' ? (
                <Package size={20} color="#FFFFFF" />
              ) : (
                <Container size={20} color="#FFFFFF" />
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span>{item.name}</span>
                {isActive && <Check size={11} color="var(--color-accent-gold)" strokeWidth={3} />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Camera Viewfinder View */}
      <div
        className="camera-viewfinder"
        style={{
          flex: 1,
          margin: '0 16px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#161412',
          borderRadius: '20px',
          border: '1.5px dashed rgba(255, 255, 255, 0.3)',
          overflow: 'hidden',
          minHeight: '280px'
        }}
      >
        {/* Real Live Video Feed */}
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

        {/* Static Upload Preview Image */}
        {!isCameraActive && previewImage && (
          <img
            src={previewImage}
            alt="Material preview"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}

        {/* Viewfinder Overlay Placeholder when no camera & no preview */}
        {!isCameraActive && !previewImage && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', color: 'rgba(255, 255, 255, 0.6)', height: '100%' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px'
              }}
            >
              <Camera size={32} style={{ opacity: 0.85, color: '#FFFFFF' }} />
            </div>
            <p style={{ fontSize: '13px', fontWeight: 500, marginBottom: '10px', color: 'rgba(255, 255, 255, 0.9)' }}>
              Arahkan kamera ke material {selectedMaterial.toUpperCase()}
            </p>

            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                padding: '10px 16px',
                backgroundColor: '#d97706',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#b45309';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#d97706';
              }}
            >
              <Upload size={14} />
              <span>Upload</span>
            </button>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload} 
              style={{ display: 'none' }} 
            />

            {cameraError && (
              <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px' }}>
                {cameraError}
              </p>
            )}
          </div>
        )}

        {/* Viewfinder Target Framing Corners */}
        <div style={{ position: 'absolute', top: 12, left: 12, width: 20, height: 20, borderTop: '2.5px solid #FFF', borderLeft: '2.5px solid #FFF', borderRadius: '4px 0 0 0', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 12, right: 12, width: 20, height: 20, borderTop: '2.5px solid #FFF', borderRight: '2.5px solid #FFF', borderRadius: '0 4px 0 0', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 12, left: 12, width: 20, height: 20, borderBottom: '2.5px solid #FFF', borderLeft: '2.5px solid #FFF', borderRadius: '0 0 0 4px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 12, right: 12, width: 20, height: 20, borderBottom: '2.5px solid #FFF', borderRight: '2.5px solid #FFF', borderRadius: '0 0 4px 0', pointerEvents: 'none' }} />

        {/* Floating Glassmorphic Lighting Banner Overlay */}
        {showLightingTip && (
          <div
            className="animate-fade-in"
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              right: '12px',
              backgroundColor: 'rgba(15, 13, 11, 0.88)',
              backdropFilter: 'blur(8px)',
              color: '#FFFFFF',
              padding: '10px 14px',
              borderRadius: '12px',
              fontSize: '11px',
              lineHeight: 1.4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 5,
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.4)'
            }}
          >
            <div>
              <p style={{ fontWeight: 600, color: '#D1D5DB', fontSize: '14px', margin: '0 0 8px 0' }}>Pastikan pencahayaan cukup terang.</p>
              <p style={{ fontWeight: 500, color: '#D1D5DB', fontSize: '14px', margin: 0 }}>Sebarkan material, jangan menumpuk &gt; 2 lapis.</p>
            </div>
            <button
              type="button"
              onClick={() => setShowLightingTip(false)}
              style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', padding: '4px', marginLeft: '6px' }}
            >
              <X size={15} />
            </button>
          </div>
        )}
      </div>

      {/* Bottom Controls: Shutter Button & Demo Mode Switcher */}
      <div
        style={{
          padding: '16px 16px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        {/* Outer Ring & Solid Shutter Button */}
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
            type="button"
            onClick={() => onCapture(scenario, captureFromCamera())}
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
            onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.92)'}
            onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
            title="Foto Material Sekarang"
          />
        </div>

        {/* Demo Text Display */}
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
