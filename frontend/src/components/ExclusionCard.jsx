import React from 'react';
import { AlertTriangle, AlertCircle, Info, RefreshCw, ArrowRight, ShieldAlert } from 'lucide-react';

/**
 * ExclusionCard Component (Exclusion Matrix)
 * Specification 3.3:
 * Mengikuti pola tetap:
 * [Ikon status] [Judul singkat status]
 * [Pesan actionable - bahasa exclusion matrix]
 * [Tombol aksi]
 * Warna border kartu mengikuti tingkat keparahan:
 * - TOLAK_FOTO, TOLAK_PENILAIAN, TOLAK_TOTAL -> border --color-grade-c
 * - LOLOS_DENGAN_PERINGATAN -> border --color-info
 * - DOWNGRADE_PAKSA -> border --color-grade-b + catatan "Grade diturunkan otomatis"
 */
export default function ExclusionCard({ data, onRetake, onProceed }) {
  const { statusCode, title, actionableMessage, actionButtonText, secondaryButtonText, severity } = data;

  let borderColor = 'var(--color-grade-c)';
  let iconColor = 'var(--color-grade-c)';
  let IconComponent = AlertCircle;
  let bgTint = 'rgba(161, 51, 36, 0.05)';

  if (severity === 'info' || statusCode === 'LOLOS_DENGAN_PERINGATAN') {
    borderColor = 'var(--color-info)';
    iconColor = 'var(--color-info)';
    IconComponent = Info;
    bgTint = 'rgba(61, 90, 108, 0.08)';
  } else if (severity === 'b' || statusCode === 'DOWNGRADE_PAKSA') {
    borderColor = 'var(--color-grade-b)';
    iconColor = 'var(--color-grade-b)';
    IconComponent = AlertTriangle;
    bgTint = 'rgba(200, 146, 56, 0.08)';
  }

  return (
    <div 
      className="card-surface animate-fade-in"
      style={{
        borderLeft: `5px solid ${borderColor}`,
        borderColor: severity === 'info' ? 'var(--color-info)' : 'var(--color-border)',
        backgroundColor: bgTint,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}
    >
      {/* Header: Icon + Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div 
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `2px solid ${borderColor}`,
            flexShrink: 0
          }}
        >
          <IconComponent size={22} color={iconColor} />
        </div>

        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-ink)' }}>
            {title}
          </h3>
          <span 
            className="text-mono" 
            style={{ fontSize: '12px', color: 'var(--color-ink-soft)', opacity: 0.8 }}
          >
            Status: {statusCode}
          </span>
        </div>
      </div>

      {/* Downgrade Paksa Transparent Tag */}
      {statusCode === 'DOWNGRADE_PAKSA' && (
        <div 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: 'var(--radius-pill)',
            backgroundColor: 'rgba(200, 146, 56, 0.15)',
            color: 'var(--color-ink)',
            fontSize: '13px',
            fontWeight: 600,
            border: '1px solid var(--color-grade-b)',
            alignSelf: 'flex-start'
          }}
        >
          <ShieldAlert size={14} color="var(--color-grade-b)" />
          <span>Grade diturunkan otomatis (Transparansi Sistem)</span>
        </div>
      )}

      {/* Actionable Message */}
      <p style={{ fontSize: '15px', color: 'var(--color-ink)', lineHeight: 1.5 }}>
        {actionableMessage}
      </p>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
        {/* Primary Action Button */}
        <button 
          className="btn btn-primary"
          onClick={() => {
            if (statusCode === 'TOLAK_FOTO' || statusCode === 'TOLAK_PENILAIAN') {
              onRetake && onRetake();
            } else {
              onProceed && onProceed();
            }
          }}
        >
          {statusCode === 'TOLAK_FOTO' || statusCode === 'TOLAK_PENILAIAN' ? (
            <>
              <RefreshCw size={18} />
              <span>{actionButtonText || 'Foto Ulang'}</span>
            </>
          ) : (
            <>
              <span>{actionButtonText || 'Lanjut ke Rekomendasi'}</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>

        {/* Secondary Action Button if present */}
        {secondaryButtonText && (
          <button className="btn btn-secondary" onClick={onRetake}>
            <RefreshCw size={18} />
            <span>{secondaryButtonText}</span>
          </button>
        )}
      </div>
    </div>
  );
}
