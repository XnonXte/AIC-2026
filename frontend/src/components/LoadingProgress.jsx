import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';


export default function LoadingProgress({ onComplete, scenario = 'GRADED_A' }) {
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

      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>
          Menilai material kamu
        </h2>
        <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)' }}>
          Biasanya kurang dari 3 detik
        </p>
      </div>


      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '100%',
          maxWidth: '280px'
        }}
      >
        {/* Step 1 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: currentStage >= 2 ? '#4C7A3D' : 'rgba(255,255,255,0.2)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 700
            }}
          >
            ✓
          </div>
          <span style={{ fontSize: '15px', fontWeight: 600, color: '#FFFFFF' }}>
            Mengecek kualitas foto
          </span>
        </div>

        {/* Step 2 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: currentStage >= 3 ? '#4C7A3D' : currentStage === 2 ? '#C89238' : 'rgba(255,255,255,0.2)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 700
            }}
          >
            {currentStage >= 3 ? '✓' : '2'}
          </div>
          <span style={{ fontSize: '15px', fontWeight: 600, color: currentStage >= 2 ? '#FFFFFF' : 'rgba(255,255,255,0.5)' }}>
            Menilai grade material
          </span>
        </div>

        {/* Step 3 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: currentStage === 3 ? '#C89238' : 'rgba(255,255,255,0.2)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 700
            }}
          >
            3
          </div>
          <span style={{ fontSize: '15px', fontWeight: 600, color: currentStage === 3 ? '#FFFFFF' : 'rgba(255,255,255,0.5)' }}>
            Menyusun rekomendasi pembeli
          </span>
        </div>
      </div>

      {/* Bottom Demo Link (Exact Mockup Match: (demo → lihat state gagal/timeout)) */}
      <div style={{ position: 'absolute', bottom: '20px', left: 0, right: 0, textAlign: 'center' }}>
        <button
          type="button"
          onClick={() => onComplete('EXCLUSION_TOLAK_FOTO')}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '11px',
            textDecoration: 'underline',
            cursor: 'pointer'
          }}
        >
          (demo → lihat state gagal/timeout)
        </button>
      </div>
    </div>
  );
}
