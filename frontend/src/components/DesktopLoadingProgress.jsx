import React, { useEffect, useState } from 'react';

/**
 * DesktopLoadingProgress Component
 * 3-stage loading progress optimized for desktop screens
 */
export default function DesktopLoadingProgress({ onComplete, scenario = 'GRADED_A' }) {
  const [currentStage, setCurrentStage] = useState(1);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setCurrentStage(2);
    }, 800);

    const timer2 = setTimeout(() => {
      setCurrentStage(3);
    }, 1600);

    const timer3 = setTimeout(() => {
      onComplete && onComplete(scenario);
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete, scenario]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#3E392F',
        color: '#FFFFFF',
        position: 'relative',
        padding: '24px 20px',
        overflowY: 'auto'
      }}
    >
      {/* Modal Container */}
      <div style={{
        backgroundColor: '#252525',
        borderRadius: '24px',
        padding: '40px',
        width: '100%',
        maxWidth: '500px',
        border: '1px solid #333333',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)'
      }}>
        {/* Header */}
        <h2 style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#FFFFFF',
          textAlign: 'center',
          margin: '0 0 8px 0',
          fontFamily: 'var(--font-display)'
        }}>
          Menilai material kamu
        </h2>
        <p style={{
          fontSize: '13px',
          color: 'rgba(255, 255, 255, 0.7)',
          textAlign: 'center',
          margin: '0 0 32px 0'
        }}>
          Biasanya kurang dari 3 detik
        </p>

        {/* Progress Steps */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {/* Step 1 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            backgroundColor: '#1f1f1f',
            padding: '16px',
            borderRadius: '16px',
            border: '1px solid #333333'
          }}>
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: currentStage >= 2 ? '#4a9f4a' : 'rgba(255,255,255,0.2)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 700,
                flexShrink: 0
              }}
            >
              ✓
            </div>
            <span style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#FFFFFF'
            }}>
              Mengecek kualitas foto
            </span>
          </div>

          {/* Step 2 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            backgroundColor: '#1f1f1f',
            padding: '16px',
            borderRadius: '16px',
            border: '1px solid #333333'
          }}>
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: currentStage >= 3 ? '#4a9f4a' : currentStage === 2 ? '#d97736' : 'rgba(255,255,255,0.2)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 700,
                flexShrink: 0
              }}
            >
              {currentStage >= 3 ? '✓' : '2'}
            </div>
            <span style={{
              fontSize: '14px',
              fontWeight: '600',
              color: currentStage >= 2 ? '#FFFFFF' : 'rgba(255,255,255,0.5)'
            }}>
              Menilai grade material
            </span>
          </div>

          {/* Step 3 (Active) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            backgroundColor: currentStage === 3 ? '#2d2d2d' : '#1f1f1f',
            padding: '16px',
            borderRadius: '16px',
            border: currentStage === 3 ? '1px solid #444444' : '1px solid #333333',
            animation: currentStage === 3 ? 'pulse 2s infinite' : 'none'
          }}>
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: currentStage === 3 ? '#d97736' : 'rgba(255,255,255,0.2)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 700,
                flexShrink: 0
              }}
            >
              3
            </div>
            <span style={{
              fontSize: '14px',
              fontWeight: '600',
              color: currentStage === 3 ? '#FFFFFF' : 'rgba(255,255,255,0.5)'
            }}>
              Menyusun rekomendasi pembeli
            </span>
          </div>
        </div>
      </div>

      {/* Demo Button */}
      <button
        type="button"
        onClick={() => onComplete('EXCLUSION_TOLAK_FOTO')}
        style={{
          position: 'absolute',
          bottom: '20px',
          left: 0,
          right: 0,
          textAlign: 'center',
          background: 'none',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '11px',
          textDecoration: 'underline',
          cursor: 'pointer',
          padding: 0
        }}
      >
        (demo → lihat state gagal/timeout)
      </button>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 0.3; }
          100% { transform: scale(1); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
