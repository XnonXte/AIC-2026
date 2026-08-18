import React, { useState } from 'react';
import { ArrowLeft, Search, Trash2 } from 'lucide-react';

/**
 * DesktopHistoryView Component
 * Desktop-optimized history view with search and filtering
 */
export default function DesktopHistoryView({ historyList = [], onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGrade, setFilterGrade] = useState('ALL');

  const filteredHistory = historyList.filter((item) => {
    const matchesSearch =
      item.material?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.buyerName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = filterGrade === 'ALL' || item.grade === filterGrade;
    return matchesSearch && matchesGrade;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'GRADED':
        return '#4C7A3D';
      case 'LOLOS_DENGAN_PERINGATAN':
        return '#3D5A6C';
      case 'TOLAK_FOTO':
      case 'TOLAK_PENILAIAN':
        return '#A13324';
      default:
        return '#C89238';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'GRADED':
        return 'Berhasil Dinilai';
      case 'LOLOS_DENGAN_PERINGATAN':
        return 'Lolos Peringatan';
      case 'TOLAK_FOTO':
      case 'TOLAK_PENILAIAN':
        return 'Ditolak';
      default:
        return 'Penilaian';
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      height: '100%',
      maxHeight: 'calc(100vh - 120px)'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        padding: '16px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        border: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-ink)',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 700,
            color: 'var(--color-ink)',
            margin: 0
          }}>
            Riwayat Penilaian
          </h2>
          <p style={{
            fontSize: '12px',
            color: 'var(--color-ink-soft)',
            margin: 0
          }}>
            Total {historyList.length} penilaian
          </p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        padding: '16px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        border: '1px solid var(--color-border)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px'
      }}>
        {/* Search Input */}
        <div style={{
          position: 'relative',
          gridColumn: '1 / -1'
        }}>
          <Search size={16} style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--color-ink-soft)',
            pointerEvents: 'none'
          }} />
          <input
            type="text"
            placeholder="Cari material, pembeli, atau grade..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px 10px 36px',
              borderRadius: '10px',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-bg)',
              fontSize: '13px',
              fontFamily: 'var(--font-body)',
              color: 'var(--color-ink)',
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--color-primary)';
              e.target.style.backgroundColor = '#FFFFFF';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--color-border)';
              e.target.style.backgroundColor = 'var(--color-bg)';
            }}
          />
        </div>

        {/* Grade Filter */}
        <select
          value={filterGrade}
          onChange={(e) => setFilterGrade(e.target.value)}
          style={{
            padding: '10px 12px',
            borderRadius: '10px',
            border: '1px solid var(--color-border)',
            backgroundColor: '#FFFFFF',
            fontSize: '13px',
            fontFamily: 'var(--font-body)',
            color: 'var(--color-ink)',
            cursor: 'pointer',
            outline: 'none',
            transition: 'all 0.2s ease'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--color-primary)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--color-border)';
          }}
        >
          <option value="ALL">Semua Grade</option>
          <option value="A">Grade A</option>
          <option value="B">Grade B</option>
          <option value="C">Grade C</option>
        </select>

        {/* Sort Option */}
        <select
          defaultValue="newest"
          style={{
            padding: '10px 12px',
            borderRadius: '10px',
            border: '1px solid var(--color-border)',
            backgroundColor: '#FFFFFF',
            fontSize: '13px',
            fontFamily: 'var(--font-body)',
            color: 'var(--color-ink)',
            cursor: 'pointer',
            outline: 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <option value="newest">Terbaru</option>
          <option value="oldest">Terlama</option>
          <option value="highest-price">Harga Tertinggi</option>
          <option value="lowest-price">Harga Terendah</option>
        </select>
      </div>

      {/* History Table */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        border: '1px solid var(--color-border)',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {filteredHistory.length === 0 ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '300px',
            color: 'var(--color-ink-soft)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 8px 0' }}>
                {searchQuery || filterGrade !== 'ALL' ? 'Tidak ada hasil' : 'Belum ada riwayat'}
              </p>
              <p style={{ fontSize: '13px', opacity: 0.8, margin: 0 }}>
                {searchQuery || filterGrade !== 'ALL'
                  ? 'Coba ubah filter pencarian Anda'
                  : 'Mulai penilaian material untuk melihat riwayat'}
              </p>
            </div>
          </div>
        ) : (
          <div style={{
            overflowY: 'auto',
            flex: 1
          }}>
            {/* Table Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '120px 100px 100px 120px 100px 80px',
              gap: '12px',
              padding: '12px 16px',
              backgroundColor: 'var(--color-bg)',
              borderBottom: '1px solid var(--color-border)',
              position: 'sticky',
              top: 0,
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--color-ink-soft)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              <div>Waktu</div>
              <div>Material</div>
              <div>Grade</div>
              <div>Pembeli Terbaik</div>
              <div>Harga</div>
              <div>Status</div>
            </div>

            {/* Table Rows */}
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 100px 100px 120px 100px 80px',
                  gap: '12px',
                  padding: '14px 16px',
                  borderBottom: '1px solid var(--color-border)',
                  alignItems: 'center',
                  fontSize: '13px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{ color: 'var(--color-ink-soft)' }}>
                  {item.date}
                </div>
                <div style={{ fontWeight: 600, color: 'var(--color-ink)' }}>
                  {item.material}
                </div>
                <div style={{
                  fontWeight: 700,
                  color: getStatusColor(item.status),
                  fontSize: '14px'
                }}>
                  {item.grade}
                </div>
                <div style={{ color: 'var(--color-ink)' }}>
                  {item.buyerName}
                </div>
                <div style={{
                  fontWeight: 600,
                  color: 'var(--color-accent-gold)'
                }}>
                  Rp {item.bestPrice?.toLocaleString('id-ID')}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  backgroundColor: `${getStatusColor(item.status)}20`,
                  color: getStatusColor(item.status),
                  fontSize: '11px',
                  fontWeight: 600,
                  textAlign: 'center'
                }}>
                  {item.status === 'GRADED' ? '✓' : '!'}
                  {getStatusLabel(item.status)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats Footer */}
      {filteredHistory.length > 0 && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '12px 16px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          border: '1px solid var(--color-border)',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          fontSize: '13px'
        }}>
          <div>
            <p style={{ color: 'var(--color-ink-soft)', margin: '0 0 4px 0', fontWeight: 600, fontSize: '11px' }}>
              Total Penilaian
            </p>
            <p style={{ color: 'var(--color-ink)', margin: 0, fontSize: '16px', fontWeight: 700 }}>
              {filteredHistory.length}
            </p>
          </div>
          <div>
            <p style={{ color: 'var(--color-ink-soft)', margin: '0 0 4px 0', fontWeight: 600, fontSize: '11px' }}>
              Rata-rata Grade
            </p>
            <p style={{ color: 'var(--color-ink)', margin: 0, fontSize: '16px', fontWeight: 700 }}>
              {(filteredHistory.reduce((sum, item) => sum + (item.grade === 'A' ? 3 : item.grade === 'B' ? 2 : 1), 0) / filteredHistory.length).toFixed(1)}
            </p>
          </div>
          <div>
            <p style={{ color: 'var(--color-ink-soft)', margin: '0 0 4px 0', fontWeight: 600, fontSize: '11px' }}>
              Harga Tertinggi
            </p>
            <p style={{ color: 'var(--color-accent-gold)', margin: 0, fontSize: '16px', fontWeight: 700 }}>
              Rp {Math.max(...filteredHistory.map(item => item.bestPrice || 0)).toLocaleString('id-ID')}
            </p>
          </div>
          <div>
            <p style={{ color: 'var(--color-ink-soft)', margin: '0 0 4px 0', fontWeight: 600, fontSize: '11px' }}>
              Tingkat Sukses
            </p>
            <p style={{ color: 'var(--color-grade-a)', margin: 0, fontSize: '16px', fontWeight: 700 }}>
              {Math.round((filteredHistory.filter(item => item.status === 'GRADED').length / filteredHistory.length) * 100)}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
