import React from 'react';

/**
 * BuyerCard Component (100% Mockup Screen 3 Exact Match)
 * White rounded card with Rank circle, Buyer Name, Distance • Capacity,
 * Data Asli / Data Simulasi badge, and Price/kg on top right.
 */
export default function BuyerCard({ buyer, rank = 1 }) {
  const formattedPrice = new Intl.NumberFormat('id-ID').format(buyer.pricePerKg);

  return (
    <div 
      className="animate-fade-in"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        padding: '16px 18px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        border: '1px solid rgba(216, 203, 176, 0.5)',
        position: 'relative'
      }}
    >
      {/* Left Column: Rank Circle + Details */}
      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
        {/* Rank Circle (1, 2, 3) */}
        <div 
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: '#EAE5D9',
            color: '#5C4F41',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: '2px'
          }}
        >
          {rank}
        </div>

        {/* Buyer Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#2A211A', margin: 0 }}>
            {buyer.name}
          </h4>

          <div style={{ fontSize: '12px', color: '#7A6E5F', display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span>{buyer.distanceKm} km</span>
            <span>•</span>
            <span>{buyer.capacityStatus}</span>
          </div>

          {/* Badge Data Asli vs Data Simulasi (Exact Mockup Match) */}
          <div style={{ marginTop: '6px' }}>
            {buyer.isRealData ? (
              <span 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(76, 122, 61, 0.12)',
                  color: '#4C7A3D',
                  fontSize: '11px',
                  fontWeight: 600
                }}
              >
                <span style={{ fontSize: '8px' }}>●</span> Data Asli
              </span>
            ) : (
              <span 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(92, 79, 65, 0.12)',
                  color: '#5C4F41',
                  fontSize: '11px',
                  fontWeight: 600
                }}
              >
                <span style={{ fontSize: '8px' }}>●</span> Data Simulasi
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Price/kg in Accent Gold (Exact Mockup Match) */}
      <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
        <div 
          style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '16px', 
            fontWeight: 700, 
            color: '#C89238' 
          }}
        >
          Rp {formattedPrice}<span style={{ fontSize: '12px', fontWeight: 400, color: '#5C4F41' }}>/kg</span>
        </div>
      </div>
    </div>
  );
}
