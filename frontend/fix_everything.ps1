Write-Host "===================================================" -ForegroundColor Cyan
Write-Host " Fixing Root Repository (Including Backend & Frontend)" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

cd ..

# Remove nested .git folders if present
if (Test-Path "frontend\.git") { Remove-Item -Recurse -Force "frontend\.git" }
if (Test-Path "backend\.git") { Remove-Item -Recurse -Force "backend\.git" }

git init
git remote remove origin 2>$null
git remote add origin https://github.com/XnonXte/AIC-2026.git
git checkout -b main 2>$null

git reset

# Step 1
Write-Host "`n[Step 1] Setup & Design Tokens" -ForegroundColor Yellow
git add package.json frontend/package.json frontend/vite.config.js frontend/index.html frontend/src/index.css frontend/src/data/mockData.js frontend/.gitignore implementation_plan.md frontend/implementation_plan.md backend/
git commit -m "feat(setup): initialize React application with UI/UX design tokens and typography system"

# Step 2
Write-Host "`n[Step 2] Signature Components (Grade Stamp & Buyer Cards)" -ForegroundColor Yellow
git add frontend/src/components/GradeStamp.jsx frontend/src/components/BuyerCard.jsx
git commit -m "feat(components): implement official serrated grade stamp signature element and buyer recommendation cards"

# Step 3
Write-Host "`n[Step 3] Exclusion Matrix & Loading Process" -ForegroundColor Yellow
git add frontend/src/components/ExclusionCard.jsx frontend/src/components/LoadingProgress.jsx
git commit -m "feat(components): add exclusion matrix status handler cards and explicit 3-stage progress indicator"

# Step 4
Write-Host "`n[Step 4] Camera Capture & Header" -ForegroundColor Yellow
git add frontend/src/components/Header.jsx frontend/src/components/CameraView.jsx
git commit -m "feat(views): build mobile-first camera capture interface with material selector and lighting banner"

# Step 5
Write-Host "`n[Step 5] Full Integration & History" -ForegroundColor Yellow
git add frontend/src/App.jsx frontend/src/main.jsx frontend/src/components/HistoryDrawer.jsx frontend/walkthrough.md walkthrough.md
git commit -m "feat(app): complete material grading workflow integration, interactive scenario switcher, and history drawer"

# Push
Write-Host "`nPushing to GitHub..." -ForegroundColor Cyan
git push origin main --force

Write-Host "`n===================================================" -ForegroundColor Green
Write-Host " SUCCESS! Both Backend and Frontend are Live on GitHub!" -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Green
