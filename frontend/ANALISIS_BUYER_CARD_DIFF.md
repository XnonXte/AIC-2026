# ANALISIS: Perbedaan BuyerCard Mobile vs Desktop

## Mobile BuyerCard (BuyerCard.jsx)
```
Layout:
- Top Row: Rank badge + Buyer info (left) | Price (right)
  - Rank circle: 28px, color based on rank
  - Buyer name (15px bold) + rating badge
  - Distance + capacity status (12px)
  - Data badge (Asli/Simulasi)
  - Price: 16px, monospace, accent gold color

- Bottom Action Strip: Divided by dashed border
  - Button "Hubungi Pembeli" (flex: 1, full-width left)
    - Phone icon + text
    - BG: rgba(168, 72, 31, 0.08)
    - Border: rgba(168, 72, 31, 0.2)
    - Color: var(--color-primary)
    - Min-height: 40px
  
  - Button "Peta" (fixed-width right)
    - MapPin icon + text
    - BG: #F5EFE6
    - Border: var(--color-border)
    - Color: var(--color-ink-soft)
    - Min-height: 40px

Spacing:
- Card padding: 14px 16px
- Gap between elements: 10px
- Border-top: 1px dashed rgba(216, 203, 176, 0.5)
- Margin-top between top row & actions: 2px + padding-top 8px
```

## Desktop BuyerCard (DesktopResultsPanel.jsx) - CURRENT
```
Layout:
- Single Row: Rank + Info (left) | Price (right)
  - Rank circle: 40px, color #e0d5c7
  - Company name: 18px
  - Location + capacity + data badge: 14px/13px/12px
  - Price: 24px

⚠️ MISSING:
- Hubungi Penjual button
- Peta/Lokasi button
- Separator/border
- Action buttons area
```

## PERBEDAAN YANG PERLU DIPERBAIKI

| Aspek | Mobile | Desktop Saat Ini | Desktop Harus |
|-------|--------|-----------------|---------------|
| Action Buttons | ✓ Ada 2 buttons | ✗ Tidak ada | ✓ Harus ditambah |
| Button "Hubungi" | Phone + text | - | Phone + text |
| Button "Peta" | MapPin + text | - | MapPin + text |
| Separator | Border-top dashed | - | Border-top dashed |
| Card layout | Flex column | Flex row | Flex column (top) + Flex row (bottom actions) |
| Card padding | 14px 16px | 20px | 20px (SAMA) |
| Gap | 10px | 16px | 12px (lebih compact) |

## IMPLEMENTASI PLAN

### Desktop Buyer Card harus jadi:
```
┌─────────────────────────────────────────┐
│ Rank  Nama              | Harga         │
│       Lokasi • Kapasitas| per kg        │
│       Data Asli         |               │
├─────────────────────────────────────────┤
│  [Hubungi Pembeli]      [Peta]          │
└─────────────────────────────────────────┘
```

### Styling Details:
- Card: flex column, padding 20px, gap 12px
- Top section: flex row, space-between
- Left info: flex column
- Right price: flex column, text-right
- Separator: 1px dashed rgba(216, 203, 176, 0.5), margin-top 8px, padding-top 12px
- Action buttons: flex row, gap 10px
  - Hubungi: flex 1, min-height 40px, primary color styling
  - Peta: fixed width, secondary styling

### Icon & Handler Functions:
- Use lucide-react: Phone, MapPin icons
- handleContactBuyer(): alert atau whatsapp action
- handleOpenMap(): google maps
