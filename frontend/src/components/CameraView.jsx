import React, { useState } from 'react';
import { Camera, X, Upload, SlidersHorizontal } from 'lucide-react';
import { MATERIALS } from '../data/mockData';

/**
 * CameraView Component (100% Mockup Screen 1 Exact Match)
 * Layar 'Foto Material': Header judul di atas, 3 chip material (PET, Kardus, Kaleng),
 * frame kamera dengan garis putus-putus, banner tips pencahayaan, tombol shutter putih bulat,
 * dan tautan demo di bagian paling bawah.
 */
export default function CameraView({ onCapture, selectedMaterial, setSelectedMaterial, scenario, setScenario }) {
  const [showLightingTip, setShowLightingTip] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [showDemoPanel, setShowDemoPanel] = useState(false);

  // Handle image upload fallback
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
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
        backgroundColor: '#0F0E0D',
        color: '#FFFFFF',
        position: 'relative',
        height: '100%'
      }}
    >
      {/* Centered Top Title (Exact Mockup Match: 'Foto Material') */}
      <div 
        style={{
          padding: '16px 0 12px',
          textAlign: 'center',
          fontSize: '16px',
          fontWeight: 600,
          fontFamily: 'var(--font-display)',
          color: '#FFFFFF'
        }}
      >
        Foto Material
      </div>

      {/* Material Filter Chips (PET, Kardus, Kaleng - Exact Mockup Match) */}
      <div 
        style={{
          padding: '0 16px 16px',
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
                padding: '10px 4px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border: isActive ? '1.5px solid #FFFFFF' : '1px solid rgba(255, 255, 255, 0.25)',
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                color: '#FFFFFF',
                transition: 'all 0.15s ease'
              }}
            >
              {/* Material Icons */}
              <span style={{ fontSize: '18px' }}>
                {item.id === 'pet' ? '🍾' : item.id === 'kardus' ? '📦' : '🥫'}
              </span>
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Camera Viewfinder Frame with Dashed Rectangle Border */}
      <div 
        style={{
          flex: 1,
          margin: '0 16px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#161514',
          borderRadius: '16px',
          border: '1.5px dashed rgba(255, 255, 255, 0.35)',
          overflow: 'hidden',
          minHeight: '380px'
        }}
      >
        {previewImage ? (
          <img 
            src={previewImage} 
            alt="Material preview" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '20px', color: 'rgba(255, 255, 255, 0.5)' }}>
            <Camera size={48} style={{ marginBottom: '12px', opacity: 0.6 }} />
            <p style={{ fontSize: '13px', marginBottom: '8px' }}>Arahkan kamera ke material {selectedMaterial.toUpperCase()}</p>
            <label 
              style={{
                fontSize: '12px',
                color: 'var(--color-accent-gold)',
                textDecoration: 'underline',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Upload size={14} />
              <span>Upload foto dari HP</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>
          </div>
        )}

        {/* Floating Lighting Banner Overlay (Exact Mockup Match) */}
        {showLightingTip && (
          <div 
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              right: '12px',
              backgroundColor: 'rgba(15, 14, 13, 0.92)',
              color: '#FFFFFF',
              padding: '10px 12px',
              borderRadius: '10px',
              fontSize: '11px',
              lineHeight: 1.4,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              zIndex: 5,
              border: '1px solid rgba(255, 255, 255, 0.12)'
            }}
          >
            <div>
              <p style={{ fontWeight: 600 }}>Pastikan pencahayaan cukup terang.</p>
              <p style={{ opacity: 0.85 }}>Sebarkan material, jangan menumpuk &gt; 2 lapis.</p>
            </div>
            <button 
              type="button"
              onClick={() => setShowLightingTip(false)}
              style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', padding: '2px', marginLeft: '6px' }}
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Bottom Controls: White Shutter Button & Demo Link (Exact Mockup Match) */}
      <div 
        style={{
          padding: '24px 16px 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        {/* Large White Solid Circle Shutter Button */}
        <button 
          type="button"
          onClick={() => onCapture(scenario)}
          style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
            transition: 'transform 0.1s ease',
            outline: 'none'
          }}
          title="Foto Material"
        />

        {/* Bottom Small Demo Link (Exact Mockup Match: (demo → izin kamera ditolak)) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            type="button"
            onClick={() => setShowDemoPanel(!showDemoPanel)}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '11px',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            (demo → izin kamera ditolak / ganti state)
          </button>
        </div>

        {/* Demo Switcher Quick Drawer */}
        {showDemoPanel && (
          <div 
            style={{
              width: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginTop: '4px'
            }}
          >
            <span style={{ fontSize: '11px', color: 'var(--color-accent-gold)', fontWeight: 600 }}>
              PILIH SKENARIO PENGUJIAN AI:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              <button 
                type="button"
                onClick={() => setScenario('GRADED_A')}
                style={{
                  padding: '6px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: scenario === 'GRADED_A' ? 'var(--color-grade-a)' : 'rgba(255,255,255,0.1)',
                  color: '#FFF',
                  fontSize: '11px',
                  cursor: 'pointer'
                }}
              >
                ✓ Grade A (PET Bening)
              </button>
              <button 
                type="button"
                onClick={() => setScenario('GRADED_B')}
                style={{
                  padding: '6px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: scenario === 'GRADED_B' ? 'var(--color-grade-b)' : 'rgba(255,255,255,0.1)',
                  color: '#FFF',
                  fontSize: '11px',
                  cursor: 'pointer'
                }}
              >
                ✓ Grade B (Label)
              </button>
              <button 
                type="button"
                onClick={() => setScenario('EXCLUSION_TOLAK_FOTO')}
                style={{
                  padding: '6px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: scenario === 'EXCLUSION_TOLAK_FOTO' ? 'var(--color-grade-c)' : 'rgba(255,255,255,0.1)',
                  color: '#FFF',
                  fontSize: '11px',
                  cursor: 'pointer'
                }}
              >
                ✕ Tolak Foto (Gelap)
              </button>
              <button 
                type="button"
                onClick={() => setScenario('EXCLUSION_WARNING')}
                style={{
                  padding: '6px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: scenario === 'EXCLUSION_WARNING' ? 'var(--color-info)' : 'rgba(255,255,255,0.1)',
                  color: '#FFF',
                  fontSize: '11px',
                  cursor: 'pointer'
                }}
              >
                ⚠ Lolos Peringatan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
