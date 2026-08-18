import React from 'react';
import { Phone, MapPin, Star, MessageSquare } from 'lucide-react';

/**
 * BuyerCard Component (Enhanced Mobile UI/UX)
 * Displays buyer recommendation card with rank number, rating, price per kg,
 * data origin badge, and quick action buttons for WhatsApp call and Google Maps location.
 */
export default function BuyerCard({ buyer, rank = 1 }) {
  const formattedPrice = new Intl.NumberFormat('id-ID').format(buyer.pricePerKg);

  const handleContactBuyer = (e) => {
    e.stopPropagation();
    alert(`Menghubungi ${buyer.name} (Simulasi Telepon/WhatsApp)...`);
  };

  const handleOpenMap = (e) => {
    e.stopPropagation();
    const query = encodeURIComponent(buyer.address || buyer.name);
    window.open(`https://maps.google.com/?q=${query}`, '_blank');
  };

  return (
    <div
      className="animate-fade-in"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        padding: '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        boxShadow: '0 3px 12px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(216, 203, 176, 0.6)',
        position: 'relative'
      }}
    >
      {/* Top Row: Left Info + Right Price */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', flexWrap: 'wrap' }}>
        {/* Left Column: Rank Badge + Buyer Info */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          {/* Rank Badge Circle */}
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: rank === 1 ? 'var(--color-accent-gold)' : '#EAE5D9',
              color: rank === 1 ? '#FFFFFF' : '#5C4F41',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: '2px',
              boxShadow: rank === 1 ? '0 2px 8px rgba(200, 146, 56, 0.4)' : 'none'
            }}
          >
            {rank}
          </div>

          {/* Buyer Main Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#2A211A', margin: 0 }}>
                {buyer.name}
              </h4>
              {buyer.rating && (
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#C89238',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '2px',
                    backgroundColor: 'rgba(200, 146, 56, 0.1)',
                    padding: '1px 5px',
                    borderRadius: '4px'
                  }}
                >
                  <Star size={10} fill="#C89238" color="#C89238" />
                  {buyer.rating}
                </span>
              )}
            </div>

            <div style={{ fontSize: '12px', color: '#7A6E5F', display: 'flex', gap: '6px', alignItems: 'center' }}>
              <span> {buyer.distanceKm} km</span>
              <span>•</span>
              <span style={{ fontWeight: 500 }}>{buyer.capacityStatus}</span>
            </div>

            {/* Badge Data Asli vs Data Simulasi */}
            <div style={{ marginTop: '4px' }}>
              {buyer.isRealData ? (
                <span className="badge-data-asli">
                  <span style={{ fontSize: '7px' }}>●</span> Data Asli
                </span>
              ) : (
                <span className="badge-data-simulasi">
                  <span style={{ fontSize: '7px' }}>●</span> Data Simulasi
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Price/kg Accent */}
        <div className="buyer-price" style={{ textAlign: 'right', whiteSpace: 'nowrap', flexShrink: 0 }}>
          <div
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#C89238'
            }}
          >
            Rp {formattedPrice}
          </div>
          <span style={{ fontSize: '13px', fontWeight: 400, color: '#5C4F41' }}>/kg</span>
        </div>
      </div>

      {/* Bottom Action Strip: Hubungi & Map Location */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          paddingTop: '8px',
          borderTop: '1px dashed rgba(216, 203, 176, 0.5)',
          marginTop: '2px'
        }}
      >
        <button
          type="button"
          onClick={handleContactBuyer}
          style={{
            flex: 1,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '10px 12px',
            borderRadius: '8px',
            backgroundColor: 'rgba(168, 72, 31, 0.08)',
            border: '1px solid rgba(168, 72, 31, 0.2)',
            color: 'var(--color-primary)',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            minHeight: '40px',
            transition: 'all 0.15s ease'
          }}
        >
          <Phone size={13} />
          <span>Hubungi Pembeli</span>
        </button>

        <button
          type="button"
          onClick={handleOpenMap}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: '#F5EFE6',
            border: '1px solid var(--color-border)',
            color: 'var(--color-ink-soft)',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            minHeight: '40px',
            transition: 'all 0.15s ease'
          }}
          title="Buka Lokasi Google Maps"
        >
          <MapPin size={13} />
          <span>Peta</span>
        </button>
      </div>
    </div>
  );
}

