import React from 'react';

/**
 * GradeStamp Component (Stempel Penilaian - 100% Mockup Page 5 Exact Match)
 * Lingkaran stempel warna grade dengan teks besar letter (mis. 'A') dan 'GRADE A' di dalamnya.
 * Di bawahnya terdapat 'Keyakinan sistem: 92%' (font mono).
 */
export default function GradeStamp({ grade = 'A', confidenceScore = 92, status = 'GRADED', capturedPhoto = null }) {
  let borderColor = '#4C7A3D'; // Grade A Green
  let gradeLetter = grade;
  let gradeSubText = `GRADE ${grade}`;

  if (status === 'TOLAK_FOTO' || status === 'TOLAK_PENILAIAN' || grade === 'C') {
    borderColor = '#A13324'; // Red Grade C / Ditolak
    gradeLetter = grade === 'C' ? 'C' : '✕';
    gradeSubText = grade === 'C' ? 'GRADE C' : 'DITOLAK';
  } else if (grade === 'B' || status === 'DOWNGRADE_PAKSA') {
    borderColor = '#C89238'; // Gold Grade B
    gradeLetter = 'B';
    gradeSubText = 'GRADE B';
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', margin: '8px 0 16px' }}>
      {/* Captured Photo Display */}
      {capturedPhoto && (
        <div
          style={{
            width: '100%',
            maxWidth: '280px',
            height: '180px',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(216, 203, 176, 0.5)'
          }}
        >
          <img
            src={capturedPhoto}
            alt="Captured material"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
      )}

      {/* Circle Official Stamp Badge (Exact Mockup Match) */}
      <div 
        style={{
          width: '110px',
          height: '110px',
          borderRadius: '50%',
          border: `3px solid ${borderColor}`,
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.06)',
          position: 'relative',
          padding: '6px'
        }}
      >
        {/* Inner Dotted Circle Line */}
        <div 
          style={{
            position: 'absolute',
            inset: '4px',
            borderRadius: '50%',
            border: `1.5px dashed ${borderColor}`,
            pointerEvents: 'none'
          }}
        />

        {/* Huge Grade Letter (A / B / C) */}
        <span 
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: gradeLetter === '✕' ? '36px' : '44px', 
            fontWeight: 700, 
            color: borderColor,
            lineHeight: 1,
            marginTop: '2px'
          }}
        >
          {gradeLetter}
        </span>

        {/* Subtext (GRADE A / GRADE B / DITOLAK) */}
        <span 
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '11px', 
            fontWeight: 700, 
            color: borderColor,
            letterSpacing: '0.5px',
            marginTop: '2px'
          }}
        >
          {gradeSubText}
        </span>
      </div>

      {/* Confidence Score Below Stamp (Exact Mockup Match: Keyakinan sistem: 92%) */}
      <div style={{ textAlign: 'center', fontSize: '14px', color: 'var(--color-ink)' }}>
        <span style={{ fontWeight: 500, color: 'var(--color-ink-soft)' }}>Keyakinan sistem: </span>
        <span className="text-mono" style={{ fontWeight: 700, fontSize: '15px', color: 'var(--color-ink)' }}>
          {confidenceScore}%
        </span>
      </div>
    </div>
  );
}
