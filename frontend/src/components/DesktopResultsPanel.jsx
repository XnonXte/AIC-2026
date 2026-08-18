import React, { useState } from 'react';
import { AlertCircle, CheckCircle, XCircle, Phone, MapPin, Star, Camera, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * DesktopResultsPanel Component
 * Professional results display with buyer recommendations
 */
export default function DesktopResultsPanel({
  resultData,
  selectedMaterial,
  capturedPhoto,
  onRetake,
  onProceed
}) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  if (!resultData) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '400px',
        color: 'var(--color-ink-soft)'
      }}>
        <p>Tidak ada hasil untuk ditampilkan</p>
      </div>
    );
  }

  // Check if multiple items
  const isMultiple = Array.isArray(resultData.items) && resultData.items.length > 1;
  const currentItem = isMultiple ? resultData.items[activeItemIndex] : (resultData.items ? resultData.items[0] : resultData);

  const getStatusBadge = (status) => {
    let icon, color, label;
    switch (status) {
      case 'GRADED':
        icon = <CheckCircle size={16} />;
        color = '#4C7A3D';
        label = 'Berhasil Dinilai';
        break;
      case 'LOLOS_DENGAN_PERINGATAN':
        icon = <AlertCircle size={16} />;
        color = '#3D5A6C';
        label = 'Lolos dengan Peringatan';
        break;
      case 'TOLAK_FOTO':
      case 'TOLAK_PENILAIAN':
        icon = <XCircle size={16} />;
        color = '#A13324';
        label = 'Ditolak';
        break;
      default:
        icon = <CheckCircle size={16} />;
        color = '#4C7A3D';
        label = 'Berhasil';
    }
    return { icon, color, label };
  };

  const statusInfo = getStatusBadge(resultData.statusCode);

  const handlePrevItem = () => {
    setActiveItemIndex(prev => prev > 0 ? prev - 1 : resultData.items.length - 1);
  };

  const handleNextItem = () => {
    setActiveItemIndex(prev => prev < resultData.items.length - 1 ? prev + 1 : 0);
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      padding: '24px',
      backgroundColor: '#EFE7D8',
      overflow: 'auto',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center'
    }}>
      {/* Main Container */}
      <div style={{
        width: '100%',
        maxWidth: '1100px',
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 350px) 1fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left Panel: Photo & Grade */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {/* Captured Photo */}
          {capturedPhoto && (
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              border: '1px solid rgba(216, 203, 176, 0.5)',
              aspectRatio: '4 / 3',
              width: '100%'
            }}>
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

          {/* Multiple Items Indicator */}
          {isMultiple && (
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '12px 14px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              border: '1px solid rgba(216, 203, 176, 0.5)',
              textAlign: 'center',
              fontSize: '13px',
              color: '#7A6E5F',
              fontWeight: 600
            }}>
              <span>Ditemukan {resultData.items.length} item</span>
              <span style={{ margin: '0 6px', color: '#D4AF37' }}>•</span>
              <span>Item {activeItemIndex + 1} dari {resultData.items.length}</span>
            </div>
          )}

          {/* Grade Badge Card */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            border: '1px solid rgba(216, 203, 176, 0.5)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center'
          }}>
            {/* Grade Circle */}
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              border: `3px solid #528f52`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                inset: '5px',
                borderRadius: '50%',
                border: `1.5px dashed #528f52`,
                pointerEvents: 'none'
              }} />
              <span style={{
                fontSize: '40px',
                fontWeight: 700,
                color: '#528f52',
                lineHeight: 1,
                fontFamily: 'var(--font-display)'
              }}>
                {currentItem.grade || 'A'}
              </span>
            </div>

            <div>
              <p style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#528f52',
                letterSpacing: '0.5px',
                margin: 0,
                fontFamily: 'var(--font-display)'
              }}>
                GRADE {currentItem.grade || 'A'}
              </p>
              <p style={{
                fontSize: '13px',
                color: '#2A211A',
                fontWeight: 600,
                margin: '4px 0 0 0'
              }}>
                Keyakinan: {currentItem.confidenceScore || 85}%
              </p>
            </div>

            {/* Material Info */}
            <div style={{
              backgroundColor: '#faf9f6',
              width: '100%',
              borderRadius: '12px',
              padding: '10px',
              border: '1px solid #e0d5c7',
              textAlign: 'left'
            }}>
              <h3 style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#2A211A',
                margin: '0 0 3px 0'
              }}>
                {currentItem.materialName || 'Material'}
              </h3>
              <p style={{
                fontSize: '11px',
                color: '#7A6E5F',
                margin: 0,
                lineHeight: '1.3'
              }}>
                {currentItem.description || 'Deskripsi material'}
              </p>
            </div>
          </div>

          {/* Navigation for Multiple Items */}
          {isMultiple && (
            <div style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'center'
            }}>
              <button
                onClick={handlePrevItem}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
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
                <ChevronLeft size={18} color="#7A6E5F" />
              </button>

              {/* Dot Indicators */}
              <div style={{
                display: 'flex',
                gap: '6px',
                alignItems: 'center'
              }}>
                {resultData.items.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveItemIndex(idx)}
                    style={{
                      width: idx === activeItemIndex ? '28px' : '10px',
                      height: '10px',
                      borderRadius: '5px',
                      backgroundColor: idx === activeItemIndex ? '#C89238' : '#e0d5c7',
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
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
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
                <ChevronRight size={18} color="#7A6E5F" />
              </button>
            </div>
          )}

          {/* Retake Button */}
          <button
            onClick={onRetake}
            style={{
              padding: '12px',
              backgroundColor: '#A8481F',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7A3216'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#A8481F'}
          >
            <Camera size={14} />
            Foto Ulang
          </button>
        </div>

        {/* Right Panel: Buyer Recommendations */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxHeight: 'calc(100vh - 48px)',
          overflowY: 'auto'
        }}>
          {/* Header */}
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#2A211A',
              margin: '0 0 4px 0'
            }}>
              Rekomendasi Pembeli
            </h2>
            <p style={{
              fontSize: '13px',
              color: '#7A6E5F',
              margin: 0
            }}>
              Terurut dari yang terbaik untuk {currentItem.materialName || selectedMaterial.toUpperCase()} Grade {currentItem.grade}
            </p>
          </div>

          {/* Buyers List */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {currentItem.buyers && currentItem.buyers.map((buyer, index) => (
              <div
                key={buyer.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '16px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  border: '1px solid rgba(216, 203, 176, 0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                }}
              >
                {/* Top Row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}>
                  {/* Left: Rank & Company */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    flex: 1
                  }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: index === 0 ? '#C89238' : '#EAE5D9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: index === 0 ? '#FFFFFF' : '#5C4F41',
                      flexShrink: 0
                    }}>
                      {index + 1}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#2A211A',
                        margin: 0,
                        wordBreak: 'break-word'
                      }}>
                        {buyer.name}
                      </h3>
                      <p style={{
                        fontSize: '12px',
                        color: '#7A6E5F',
                        margin: '2px 0 0 0'
                      }}>
                        {buyer.distanceKm} km • {buyer.capacityStatus}
                      </p>
                    </div>
                  </div>

                  {/* Right: Price */}
                  <div style={{
                    textAlign: 'right',
                    flexShrink: 0
                  }}>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#C89238'
                    }}>
                      Rp {buyer.pricePerKg?.toLocaleString('id-ID')}
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: '#7A6E5F'
                    }}>
                      /kg
                    </div>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px'
                }}>
                  <button
                    onClick={() => window.open(`https://wa.me/${buyer.phone}`)}
                    style={{
                      padding: '8px 10px',
                      backgroundColor: 'rgba(168, 72, 31, 0.08)',
                      border: '1px solid rgba(168, 72, 31, 0.2)',
                      color: '#A8481F',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(168, 72, 31, 0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(168, 72, 31, 0.08)';
                    }}
                  >
                    <Phone size={12} />
                    Hubungi
                  </button>
                  <button
                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(buyer.address)}`)}
                    style={{
                      padding: '8px 10px',
                      backgroundColor: '#f5eee6',
                      border: '1px solid #e0d5c7',
                      color: '#7A6E5F',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#ede5db';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f5eee6';
                    }}
                  >
                    <MapPin size={12} />
                    Peta
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
