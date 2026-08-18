import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * GradeStamp Component (Stempel Penilaian - Support Single & Multiple Items)
 * Lingkaran stempel warna grade dengan teks besar letter (mis. 'A') dan 'GRADE A' di dalamnya.
 * Di bawahnya terdapat 'Keyakinan sistem: 92%' (font mono).
 * Support untuk multiple items dengan carousel/tabs.
 */
export default function GradeStamp({ 
  grade = 'A', 
  confidenceScore = 92, 
  status = 'GRADED', 
  capturedPhoto = null,
  items = null, // Array of items jika multiple grades
  currentItemIndex = 0,
  onItemChange = null
}) {
  const [activeIndex, setActiveIndex] = useState(currentItemIndex);
  
  // Determine if multiple items
  const isMultiple = Array.isArray(items) && items.length > 1;
  const currentItem = isMultiple ? items[activeIndex] : null;
  
  const itemGrade = currentItem ? currentItem.grade : grade;
  const itemConfidence = currentItem ? currentItem.confidenceScore : confidenceScore;
  const itemMaterial = currentItem ? currentItem.materialName : null;

  let borderColor = '#4C7A3D'; // Grade A Green
  let gradeLetter = itemGrade;
  let gradeSubText = `GRADE ${itemGrade}`;

  if (status === 'TOLAK_FOTO' || status === 'TOLAK_PENILAIAN' || itemGrade === 'C') {
    borderColor = '#A13324'; // Red Grade C / Ditolak
    gradeLetter = itemGrade === 'C' ? 'C' : '✕';
    gradeSubText = itemGrade === 'C' ? 'GRADE C' : 'DITOLAK';
  } else if (itemGrade === 'B' || status === 'DOWNGRADE_PAKSA') {
    borderColor = '#C89238'; // Gold Grade B
    gradeLetter = 'B';
    gradeSubText = 'GRADE B';
  }

  const handlePrevItem = () => {
    const newIndex = activeIndex > 0 ? activeIndex - 1 : items.length - 1;
    setActiveIndex(newIndex);
    if (onItemChange) onItemChange(newIndex);
  };

  const handleNextItem = () => {
    const newIndex = activeIndex < items.length - 1 ? activeIndex + 1 : 0;
    setActiveIndex(newIndex);
    if (onItemChange) onItemChange(newIndex);
  };

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

      {/* Multiple Items Indicator - Top */}
      {isMultiple && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '12px',
          color: '#7A6E5F',
          fontWeight: 600
        }}>
          <span>Ditemukan {items.length} item</span>
          <span style={{ color: '#D4AF37' }}>•</span>
          <span>Item {activeIndex + 1} dari {items.length}</span>
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

      {/* Confidence Score Below Stamp */}
      <div style={{ textAlign: 'center', fontSize: '14px', color: 'var(--color-ink)' }}>
        <span style={{ fontWeight: 500, color: 'var(--color-ink-soft)' }}>Keyakinan sistem: </span>
        <span className="text-mono" style={{ fontWeight: 700, fontSize: '15px', color: 'var(--color-ink)' }}>
          {itemConfidence}%
        </span>
      </div>

      {/* Material Name for Multiple Items */}
      {isMultiple && itemMaterial && (
        <div style={{
          backgroundColor: '#faf9f6',
          borderRadius: '12px',
          padding: '10px 12px',
          border: '1px solid #e0d5c7',
          textAlign: 'center',
          width: '100%',
          maxWidth: '280px'
        }}>
          <p style={{
            fontSize: '11px',
            color: '#7A6E5F',
            margin: '0 0 4px 0',
            fontWeight: 500
          }}>
            Material:
          </p>
          <p style={{
            fontSize: '12px',
            fontWeight: 700,
            color: '#2A211A',
            margin: 0
          }}>
            {itemMaterial}
          </p>
        </div>
      )}

      {/* Navigation Arrows for Multiple Items */}
      {isMultiple && (
        <div style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          width: '100%',
          maxWidth: '280px',
          justifyContent: 'center'
        }}>
          <button
            onClick={handlePrevItem}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#f5eee6',
              border: '1px solid #e0d5c7',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ede5db'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f5eee6'}
          >
            <ChevronLeft size={16} color="#7A6E5F" />
          </button>

          {/* Dot Indicators */}
          <div style={{
            display: 'flex',
            gap: '4px',
            alignItems: 'center'
          }}>
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveIndex(idx);
                  if (onItemChange) onItemChange(idx);
                }}
                style={{
                  width: idx === activeIndex ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: idx === activeIndex ? '#C89238' : '#e0d5c7',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              />
            ))}
          </div>

          <button
            onClick={handleNextItem}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#f5eee6',
              border: '1px solid #e0d5c7',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ede5db'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f5eee6'}
          >
            <ChevronRight size={16} color="#7A6E5F" />
          </button>
        </div>
      )}
    </div>
  );
}
