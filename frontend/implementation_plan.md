# Implementation Plan: 100% UI/UX Compliant React App for AI Material Recycling Intelligence

Implementation of a high-fidelity, mobile-first responsive React web application following 100% of the specifications in the **Panduan UI/UX (AI Decision Intelligence: Optimasi Aliran Material Rantai Pasok Daur Ulang)** document.

## User Review Required

> [!IMPORTANT]
> - **Step-by-Step Development with Professional Commits**: The project will be built across 5 incremental, clean steps. Each step will include detailed code additions and a standardized conventional Git commit message.
> - **Signature Element ("Stempel Penilaian")**: Custom SVG/CSS implementation of the serrated circular official stamp with grade rotation (-6° to -8°), 3px grade-colored border, and confidence percentage display alongside.
> - **Exclusion Matrix & Real/Simulated Data Compliance**: Explicit rendering of all Exclusion Matrix status cards (`TOLAK_FOTO`, `TOLAK_PENILAIAN`, `LOLOS_DENGAN_PERINGATAN`, `DOWNGRADE_PAKSA`) and mandatory "Data Asli" (green) vs "Data Simulasi" (grey) tags on buyer recommendation cards.

## Step-by-Step Commit Breakdown

### Step 1: Initial Setup & Design Tokens
- **Files**: `package.json`, `vite.config.js`, `index.html`, `src/index.css`, `src/data/mockData.js`
- **Commit Message**: `feat(setup): initialize React app with design tokens, CSS variables, and Google Fonts`

### Step 2: Signature Components (Grade Stamp & Buyer Cards)
- **Files**: `src/components/GradeStamp.jsx`, `src/components/BuyerCard.jsx`
- **Commit Message**: `feat(components): implement official serrated grade stamp signature element and buyer recommendation cards`

### Step 3: Exclusion Matrix & Loading Process Components
- **Files**: `src/components/ExclusionCard.jsx`, `src/components/LoadingProgress.jsx`
- **Commit Message**: `feat(components): add exclusion matrix status handler cards and explicit 3-stage process indicator`

### Step 4: Camera Capture Interface & Header Shell
- **Files**: `src/components/CameraView.jsx`, `src/components/Header.jsx`
- **Commit Message**: `feat(views): build mobile-first camera capture interface with material selector and lighting banner`

### Step 5: Full Application Integration, Scenario Switcher & History
- **Files**: `src/App.jsx`, `src/main.jsx`, `src/components/HistoryDrawer.jsx`
- **Commit Message**: `feat(app): complete material grading workflow integration, interactive scenario switcher, and history drawer`

## Proposed Changes

### Frontend Architecture (`C:\AIC 26\AIC-2026\frontend`)

#### [NEW] [index.html](file:///C:/AIC%2026/AIC-2026/frontend/index.html)
- Main HTML entry point.
- Embed Google Fonts: `Space Grotesk` (600, 700), `Inter` (400, 500, 600), `IBM Plex Mono` (400, 500).

#### [NEW] [src/index.css](file:///C:/AIC%2026/AIC-2026/frontend/src/index.css)
- Implement Design Tokens CSS custom properties & utility classes.

#### [NEW] [src/components/GradeStamp.jsx](file:///C:/AIC%2026/AIC-2026/frontend/src/components/GradeStamp.jsx)
- Serrated circular official stamp SVG/CSS.

#### [NEW] [src/components/ExclusionCard.jsx](file:///C:/AIC%2026/AIC-2026/frontend/src/components/ExclusionCard.jsx)
- Renders non-graded statuses from Exclusion Matrix.

#### [NEW] [src/components/BuyerCard.jsx](file:///C:/AIC%2026/AIC-2026/frontend/src/components/BuyerCard.jsx)
- Displays buyer recommendation with mandatory Data Asli/Simulasi badges.

#### [NEW] [src/components/CameraView.jsx](file:///C:/AIC%2026/AIC-2026/frontend/src/components/CameraView.jsx)
- Camera feed simulation, material chips, lighting banner tip.

#### [NEW] [src/components/LoadingProgress.jsx](file:///C:/AIC%2026/AIC-2026/frontend/src/components/LoadingProgress.jsx)
- Explicit 3-stage loading sequence.

#### [NEW] [src/App.jsx](file:///C:/AIC%2026/AIC-2026/frontend/src/App.jsx)
- Full app integration with state switcher & responsive mobile container.

## Verification Plan

### Manual Verification
1. **Design Tokens & Fonts**: Colors, Google Fonts, 48x48px min touch targets.
2. **Signature Element**: Rotated serrated stamp styling with confidence % displayed outside.
3. **Exclusion Matrix & Data Tagging**: All 4 status card variations & Data Asli/Simulasi tags.
4. **Flow & Navigation**: Material Select → Camera Capture → 3-Stage Loading → Grading Result & Buyer Recommendations → Retake.

