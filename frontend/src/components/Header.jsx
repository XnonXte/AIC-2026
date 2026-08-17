import React from 'react';
import { Recycle, History, Smartphone, Monitor } from 'lucide-react';

/**
 * Header Component
 * Provides mobile title bar, history shortcut button, and viewport mode toggle
 */
export default function Header({ onOpenHistory, isDesktopView, onToggleView }) {
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
        boxShadow: 'var(--shadow-md)'
      }}
    >
      {/* Brand Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            backgroundColor: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Recycle size={20} color="#FFFFFF" />
        </div>
        <div>
          <h1 style={{ fontSize: '15px', color: '#FFFFFF', fontFamily: 'var(--font-display)', fontWeight: 700, margin: 0 }}>
            DaurAI Intelligence
          </h1>
          <span style={{ fontSize: '10px', color: 'var(--color-bg-alt)', opacity: 0.8, display: 'block' }}>
            Rantai Pasok Daur Ulang
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Toggle Desktop View */}
        <button
          type="button"
          onClick={onToggleView}
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            border: 'none',
            color: '#FFFFFF',
            padding: '6px 10px',
            borderRadius: 'var(--radius-button)',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer'
          }}
          title={isDesktopView ? "Ganti ke tampilan Mobile" : "Ganti ke tampilan Desktop"}
        >
          {isDesktopView ? <Smartphone size={14} /> : <Monitor size={14} />}
          <span style={{ fontSize: '11px' }}>{isDesktopView ? "Mobile" : "Desktop"}</span>
        </button>

        {/* History Drawer Trigger */}
        <button
          type="button"
          onClick={onOpenHistory}
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            border: 'none',
            color: '#FFFFFF',
            padding: '6px 10px',
            borderRadius: 'var(--radius-button)',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer'
          }}
          title="Lihat Riwayat Penilaian"
        >
          <History size={14} />
          <span style={{ fontSize: '11px' }}>Riwayat</span>
        </button>
      </div>
    </header>
  );
}
