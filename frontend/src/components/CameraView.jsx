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
          padding: 'var(--padding-sm) var(--padding-md) calc(var(--padding-sm) - 4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-xs)', justifyContent: 'center', width: '100%' }}>

          <span
            style={{
              fontSize: 'var(--font-size-lg)',
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
          padding: 'var(--padding-sm)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(80px, 20vw, 120px), 1fr))',
          gap: 'var(--gap-sm)'
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
                gap: 'var(--gap-xs)',
                padding: 'var(--padding-xs)',
                borderRadius: '14px',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 600,
                cursor: 'pointer',
                minHeight: 'var(--button-height-sm)',
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
                <FlaskConical size={clamp(18, '4vw', 24)} color="#FFFFFF" />
              ) : item.id === 'kardus' ? (
                <Package size={clamp(18, '4vw', 24)} color="#FFFFFF" />
              ) : (
                <Container size={clamp(18, '4vw', 24)} color="#FFFFFF" />
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-xs)' }}>
                <span>{item.name}</span>
                {isActive && <Check size={11} color="var(--color-accent-gold)" strokeWidth={3} />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Camera Viewfinder View */}
      <div
        style={{
          flex: 1,
          margin: '0 var(--padding-md)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#161412',
          borderRadius: 'clamp(16px, 4vw, 24px)',
          border: '1.5px dashed rgba(255, 255, 255, 0.3)',
          overflow: 'hidden',
          minHeight: 'clamp(240px, 50vh, 400px)'
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
                padding: 'var(--padding-xs) var(--padding-sm)',
                backgroundColor: '#d97706',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 600,
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--gap-sm)',
                minHeight: 'var(--button-height-sm)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#b45309';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#d97706';
              }}
            >
              <Upload size={clamp(12, '2.5vw', 16)} />
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
        <div style={{ position: 'absolute', top: 'clamp(8px, 2vw, 16px)', left: 'clamp(8px, 2vw, 16px)', width: 'clamp(16px, 3vw, 24px)', height: 'clamp(16px, 3vw, 24px)', borderTop: '2.5px solid #FFF', borderLeft: '2.5px solid #FFF', borderRadius: '4px 0 0 0', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 'clamp(8px, 2vw, 16px)', right: 'clamp(8px, 2vw, 16px)', width: 'clamp(16px, 3vw, 24px)', height: 'clamp(16px, 3vw, 24px)', borderTop: '2.5px solid #FFF', borderRight: '2.5px solid #FFF', borderRadius: '0 4px 0 0', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 'clamp(8px, 2vw, 16px)', left: 'clamp(8px, 2vw, 16px)', width: 'clamp(16px, 3vw, 24px)', height: 'clamp(16px, 3vw, 24px)', borderBottom: '2.5px solid #FFF', borderLeft: '2.5px solid #FFF', borderRadius: '0 0 0 4px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 'clamp(8px, 2vw, 16px)', right: 'clamp(8px, 2vw, 16px)', width: 'clamp(16px, 3vw, 24px)', height: 'clamp(16px, 3vw, 24px)', borderBottom: '2.5px solid #FFF', borderRight: '2.5px solid #FFF', borderRadius: '0 0 4px 0', pointerEvents: 'none' }} />

        {/* Floating Glassmorphic Lighting Banner Overlay */}
        {showLightingTip && (
          <div
            className="animate-fade-in"
            style={{
              position: 'absolute',
              bottom: 'var(--padding-sm)',
              left: 'var(--padding-sm)',
              right: 'var(--padding-sm)',
              backgroundColor: 'rgba(15, 13, 11, 0.88)',
              backdropFilter: 'blur(8px)',
              color: '#FFFFFF',
              padding: 'var(--padding-xs) var(--padding-sm)',
              borderRadius: 'clamp(10px, 2vw, 14px)',
              fontSize: 'var(--font-size-xs)',
              lineHeight: 1.4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 5,
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
              gap: 'var(--gap-sm)'
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
          padding: 'var(--padding-md) var(--padding-md) var(--padding-lg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--gap-md)'
        }}
      >
        {/* Outer Ring & Solid Shutter Button */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            className="pulse-glow-ring"
            style={{
              position: 'absolute',
              width: 'clamp(64px, 14vw, 88px)',
              height: 'clamp(64px, 14vw, 88px)',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              pointerEvents: 'none'
            }}
          />
          <button
            type="button"
            onClick={() => onCapture(scenario)}
            style={{
              width: 'clamp(56px, 12vw, 76px)',
              height: 'clamp(56px, 12vw, 76px)',
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
          fontSize: 'var(--font-size-sm)',
          color: '#6B7280',
          margin: 'var(--padding-sm) 0 0 0'
        }}>
          (demo → klik untuk lanjut)
        </p>
      </div>
    </div>
  );
}
