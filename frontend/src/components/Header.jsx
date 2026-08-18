import React from 'react';
import { Recycle, History } from 'lucide-react';

/**
 * Header Component
 * Mobile-only title bar with brand and history shortcut
 */
export default function Header({ onOpenHistory }) {
  return (
    <header
      style={{
        backgroundColor: 'var(--color-ink)',
        color: '#FFFFFF',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}
    >
      {/* Brand Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

        <div>
          <h1 style={{ fontSize: '15px', color: '#FFFFFF', fontWeight: 700, margin: 0 }}>
            DaurAI Intelligence
          </h1>
          <span style={{ fontSize: '10px', color: 'var(--color-bg-alt)', opacity: 0.8, display: 'block' }}>
            Rantai Pasok Daur Ulang
          </span>
        </div>
      </div>

      {/* History Button */}
      <button
        type="button"
        onClick={onOpenHistory}
        style={{
          background: 'rgba(255, 255, 255, 0.12)',
          border: 'none',
          color: '#FFFFFF',
          padding: '8px 12px',
          borderRadius: 'var(--radius-button)',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
          minHeight: '36px'
        }}
        title="Lihat Riwayat Penilaian"
      >
        <History size={14} />
        <span style={{ fontSize: '11px' }}>Riwayat</span>
      </button>
    </header>
  );
}
