import React from 'react';
import { X, Calendar, ChevronRight, Award } from 'lucide-react';

/**
 * HistoryDrawer Component
 * Displays past material grading logs with official grade stamps and prices
 */
export default function HistoryDrawer({ isOpen, onClose, historyList }) {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 200,
        display: 'flex',
        justifyContent: 'flex-end',
        backdropFilter: 'blur(3px)'
      }}
    >
      <div 
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'var(--color-bg)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Drawer Header */}
        <div 
          style={{
            padding: '16px 20px',
            backgroundColor: 'var(--color-ink)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={20} color="var(--color-accent-gold)" />
            <h3 style={{ fontSize: '18px', color: '#FFFFFF', margin: 0 }}>
              Riwayat Penilaian
            </h3>
          </div>
          <button 
            onClick={onClose}
            style={{ 
              background: 'rgba(255, 255, 255, 0.12)', 
              border: 'none', 
              color: '#FFFFFF', 
              cursor: 'pointer',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content Body */}
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {historyList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-ink-soft)' }}>
              <p style={{ fontSize: '15px' }}>Belum ada riwayat penilaian material.</p>
            </div>
          ) : (
            historyList.map((item) => (
              <div 
                key={item.id}
                className="card-surface"
                style={{
                  padding: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-ink-soft)', marginBottom: '4px' }}>
                    <Calendar size={12} />
                    <span>{item.date}</span>
                  </div>
                  <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-ink)' }}>
                    {item.material}
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--color-accent-gold)', fontWeight: 600, fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                    Rp {item.bestPrice.toLocaleString('id-ID')}/kg ({item.buyerName})
                  </p>
                </div>

                {/* Grade Badge */}
                <div 
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    border: `2px solid ${item.grade === 'A' ? 'var(--color-grade-a)' : item.grade === 'B' ? 'var(--color-grade-b)' : 'var(--color-grade-c)'}`,
                    color: item.grade === 'A' ? 'var(--color-grade-a)' : item.grade === 'B' ? 'var(--color-grade-b)' : 'var(--color-grade-c)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '16px',
                    backgroundColor: '#FFFFFF',
                    transform: 'rotate(-6deg)',
                    flexShrink: 0
                  }}
                >
                  {item.grade}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
