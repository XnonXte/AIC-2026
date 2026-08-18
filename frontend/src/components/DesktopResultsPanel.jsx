import React, { useState } from 'react';
import { TrendingUp, Award, AlertCircle, CheckCircle, XCircle, Copy, Download, Phone, MapPin, Star, Camera } from 'lucide-react';

/**
 * DesktopResultsPanel Component
 * Professional results display with buyer recommendations and analytics
 */
export default function DesktopResultsPanel({
  resultData,
  selectedMaterial,
  onRetake,
  onProceed
}) {
  const [copiedId, setCopiedId] = useState(null);

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

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '100vh',
      padding: '32px 16px',
      backgroundColor: '#EFE7D8',
      overflow: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Centered Container */}
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        display: 'grid',
        gridTemplateColumns: '1fr 1.5fr',
        gap: '32px',
        height: 'fit-content'
      }}>
        {/* Left Panel: Grade Info (1/3) */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {/* Grade Circle Badge - Dipanjangkan */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '40px 32px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            border: '1px solid rgba(216, 203, 176, 0.5)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '420px',
            justifyContent: 'space-between'
          }}>
            {/* Grade Circle */}
            <div style={{
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              border: `4px solid #528f52`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              position: 'relative'
            }}>
              {/* Inner Dashed Circle */}
              <div style={{
                position: 'absolute',
                inset: '8px',
                borderRadius: '50%',
                border: '1.5px dashed #528f52',
                pointerEvents: 'none'
              }} />
              <span style={{
                fontSize: '64px',
                fontWeight: 700,
                color: '#528f52',
                lineHeight: 1,
                fontFamily: 'var(--font-display)'
              }}>
                {resultData.grade || 'A'}
              </span>
              <span style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#528f52',
                marginTop: '4px',
                letterSpacing: '0.5px',
                fontFamily: 'var(--font-display)'
              }}>
                GRADE {resultData.grade || 'A'}
              </span>
            </div>

            {/* Confidence Score */}
            <p style={{
              fontSize: '16px',
              color: '#2A211A',
              fontWeight: 600,
              margin: '0 0 20px 0'
            }}>
              Keyakinan sistem: <span style={{ fontWeight: 700 }}>{resultData.confidenceScore || 85}%</span>
            </p>

            {/* Material Info Card */}
            <div style={{
              backgroundColor: '#faf9f6',
              width: '100%',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid #e0d5c7',
              textAlign: 'left'
            }}>
              <h3 style={{
                fontSize: '17px',
                fontWeight: 700,
                color: '#2A211A',
                margin: '0 0 6px 0'
              }}>
                {resultData.materialName || 'PET - Botol bening, dipres rapi'}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#7A6E5F',
                margin: 0,
                lineHeight: '1.4'
              }}>
                {resultData.description || 'Tanpa label, tanpa residu terlihat'}
              </p>
            </div>
          </div>

          {/* Retake Button */}
          <button
            onClick={onRetake}
            style={{
              padding: '16px 20px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: '#a05526',
              color: '#FFFFFF',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 700,
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 16px rgba(160, 85, 38, 0.35)',
              minHeight: '48px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#8b4920';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#a05526';
            }}
          >
            <Camera size={18} />
            <span>Foto Material Lagi</span>
          </button>
        </div>

        {/* Right Panel: Buyer Recommendations (2/3) */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          height: 'fit-content'
        }}>
          {/* Title */}
          <div>
            <h2 style={{
              fontSize: '26px',
              fontWeight: 700,
              color: '#2A211A',
              margin: '0 0 6px 0'
            }}>
              Rekomendasi pembeli
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#7A6E5F',
              margin: 0
            }}>
              Terurut dari yang terbaik untuk {resultData.materialName || selectedMaterial.toUpperCase()} Grade {resultData.grade}
            </p>
          </div>

          {/* Buyers List */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxHeight: '600px',
            overflowY: 'auto',
            paddingRight: '8px'
          }}>
            {resultData.buyers && resultData.buyers.map((buyer, index) => (
              <div
                key={buyer.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  border: '1px solid rgba(216, 203, 176, 0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                }}
              >
                {/* Top Row: Rank & Company Info + Price */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '16px'
                }}>
                  {/* Left: Rank & Company Info */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    flex: 1
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: index === 0 ? '#C89238' : '#EAE5D9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: index === 0 ? '#FFFFFF' : '#5C4F41',
                      flexShrink: 0,
                      boxShadow: index === 0 ? '0 2px 8px rgba(200, 146, 56, 0.4)' : 'none'
                    }}>
                      {index + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '4px'
                      }}>
                        <h3 style={{
                          fontSize: '18px',
                          fontWeight: 700,
                          color: '#2A211A',
                          margin: 0
                        }}>
                          {buyer.name}
                        </h3>
                        {buyer.rating && (
                          <span style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: '#C89238',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px',
                            backgroundColor: 'rgba(200, 146, 56, 0.1)',
                            padding: '2px 6px',
                            borderRadius: '4px'
                          }}>
                            <Star size={10} fill="#C89238" color="#C89238" />
                            {buyer.rating}
                          </span>
                        )}
                      </div>
                      <p style={{
                        fontSize: '14px',
                        color: '#7A6E5F',
                        margin: '0 0 6px 0'
                      }}>
                        {buyer.distanceKm ?? '2.1 km'} • {buyer.capacityStatus || 'Kapasitas tersedia'}
                      </p>
                      <span className={buyer.isRealData ? 'badge-data-asli' : 'badge-data-simulasi'} style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        padding: '3px 10px',
                        borderRadius: '4px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <span style={{ fontSize: '7px' }}>●</span> {buyer.isRealData ? 'Data Asli' : 'Data Simulasi'}
                      </span>
                    </div>
                  </div>

                  {/* Right: Price */}
                  <div style={{
                    textAlign: 'right',
                    flexShrink: 0
                  }}>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: 700,
                      color: '#C89238'
                    }}>
                      Rp {buyer.pricePerKg?.toLocaleString('id-ID')}
                    </div>
                    <span style={{
                      fontSize: '13px',
                      color: '#7A6E5F'
                    }}>
                      /kg
                    </span>
                  </div>
                </div>

                {/* Separator */}
                <div style={{
                  height: '1px',
                  backgroundColor: 'rgba(216, 203, 176, 0.5)',
                  margin: '8px 0 0 0',
                  borderTop: '1px dashed rgba(216, 203, 176, 0.5)'
                }} />

                {/* Bottom Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center'
                }}>
                  {/* Hubungi Pembeli Button */}
                  <button
                    type="button"
                    onClick={() => {
                      alert(`Menghubungi ${buyer.name} (Simulasi Telepon/WhatsApp)...`);
                    }}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(168, 72, 31, 0.08)',
                      border: '1px solid rgba(168, 72, 31, 0.2)',
                      color: '#A8481F',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      minHeight: '40px',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(168, 72, 31, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(168, 72, 31, 0.08)';
                    }}
                  >
                    <Phone size={14} />
                    <span>Hubungi Pembeli</span>
                  </button>

                  {/* Lokasi/Peta Button */}
                  <button
                    type="button"
                    onClick={() => {
                      const query = encodeURIComponent(buyer.address || buyer.name);
                      window.open(`https://maps.google.com/?q=${query}`, '_blank');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      backgroundColor: '#F5EFE6',
                      border: '1px solid rgba(216, 203, 176, 0.5)',
                      color: '#7A6E5F',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      minHeight: '40px',
                      transition: 'all 0.15s ease',
                      title: 'Buka Lokasi di Google Maps'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E9DFD3';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#F5EFE6';
                    }}
                  >
                    <MapPin size={14} />
                    <span>Peta</span>
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
