import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BuyerCard from './BuyerCard';

/**
 * MultipleGradesView Component
 * Menampilkan hasil penilaian untuk multiple items dalam satu foto
 * Dengan item selector dan carousel untuk navigasi antar item
 */
export default function MultipleGradesView({ 
  items = [], 
  capturedPhoto = null,
  selectedMaterial = 'material'
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentItem = items[activeIndex] || items[0];

  if (!items || items.length === 0) {
    return null;
  }

  const isMultiple = items.length > 1;

  const handlePrevItem = () => {
    setActiveIndex(prev => prev > 0 ? prev - 1 : items.length - 1);
  };

  const handleNextItem = () => {
    setActiveIndex(prev => prev < items.length - 1 ? prev + 1 : 0);
  };

  let borderColor = '#4C7A3D'; // Grade A Green
  if (currentItem.grade === 'C') {
    borderColor = '#A13324'; // Red
  } else if (currentItem.grade === 'B') {
    borderColor = '#C89238'; // Gold
  }

  return (
    <div style={{
      backgroundColor: '#EFE7D8',
      borderRadius: '16px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      border: '1px solid rgba(216, 203, 176, 0.5)'
    }}>
      {/* Header with Item Counter */}
      {isMultiple && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '12px',
          borderBottom: '1px solid rgba(216, 203, 176, 0.3)'
        }}>
          <div>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#2A211A',
              margin: 0
            }}>
              Hasil Penilaian
            </h3>
            <p style={{
              fontSize: '12px',
              color: '#7A6E5F',
              margin: '4px 0 0 0'
            }}>
              Ditemukan {items.length} item • Item {activeIndex + 1} dari {items.length}
            </p>
          </div>
        </div>
      )}

      {/* Grade Stamp Circle */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px'
      }}>
        {/* Grade Circle */}
        <div style={{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          border: `3px solid ${borderColor}`,
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <div style={{
            position: 'absolute',
            inset: '4px',
            borderRadius: '50%',
            border: `1.5px dashed ${borderColor}`,
            pointerEvents: 'none'
          }} />
          <span style={{
            fontSize: '36px',
            fontWeight: 700,
            color: borderColor,
            lineHeight: 1,
            fontFamily: 'var(--font-display)',
            zIndex: 1
          }}>
            {currentItem.grade}
          </span>
        </div>

        {/* Grade Text & Confidence */}
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontSize: '12px',
            fontWeight: 700,
            color: borderColor,
            margin: 0,
            letterSpacing: '0.5px',
            fontFamily: 'var(--font-display)'
          }}>
            GRADE {currentItem.grade}
          </p>
          <p style={{
            fontSize: '13px',
            color: '#2A211A',
            fontWeight: 600,
            margin: '4px 0 0 0'
          }}>
            Keyakinan: {currentItem.confidenceScore}%
          </p>
        </div>
      </div>

      {/* Material Info Card */}
      <div style={{
        backgroundColor: '#faf9f6',
        borderRadius: '12px',
        padding: '12px 14px',
        border: '1px solid #e0d5c7'
      }}>
        <p style={{
          fontSize: '11px',
          fontWeight: 600,
          color: '#7A6E5F',
          margin: '0 0 4px 0',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Material
        </p>
        <h4 style={{
          fontSize: '13px',
          fontWeight: 700,
          color: '#2A211A',
          margin: '0 0 4px 0'
        }}>
          {currentItem.materialName}
        </h4>
        <p style={{
          fontSize: '12px',
          color: '#7A6E5F',
          margin: 0,
          lineHeight: '1.4'
        }}>
          {currentItem.description}
        </p>
      </div>

      {/* Item Navigation */}
      {isMultiple && (
        <div style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '8px'
        }}>
          <button
            onClick={handlePrevItem}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#f5eee6',
              border: '1px solid #e0d5c7',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ede5db'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f5eee6'}
          >
            <ChevronLeft size={18} color="#7A6E5F" />
          </button>

          {/* Dot Indicators */}
          <div style={{
            display: 'flex',
            gap: '5px',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center'
          }}>
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                style={{
                  width: idx === activeIndex ? '20px' : '8px',
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
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#f5eee6',
              border: '1px solid #e0d5c7',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ede5db'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f5eee6'}
          >
            <ChevronRight size={18} color="#7A6E5F" />
          </button>
        </div>
      )}

      {/* Buyers Recommendations */}
      {currentItem.buyers && currentItem.buyers.length > 0 && (
        <div style={{
          borderTop: '1px solid rgba(216, 203, 176, 0.3)',
          paddingTop: '16px'
        }}>
          <div style={{ marginBottom: '12px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#2A211A',
              margin: '0 0 4px 0'
            }}>
              Rekomendasi pembeli
            </h3>
            <p style={{
              fontSize: '12px',
              color: '#7A6E5F',
              margin: 0
            }}>
              Terurut dari terbaik untuk Grade {currentItem.grade}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {currentItem.buyers.map((buyer, index) => (
              <BuyerCard key={buyer.id} buyer={buyer} rank={index + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
