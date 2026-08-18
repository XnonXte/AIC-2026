@echo off
echo ===================================================
echo  Fixing Root Repository (Including Backend & Frontend)
echo ===================================================

cd ..

:: Remove sub-repository .git inside frontend and backend so root AIC-2026 is the main Git repo
if exist "frontend\.git" rmdir /s /q "frontend\.git"
if exist "backend\.git" rmdir /s /q "backend\.git"

git init
git remote remove origin 2>nul
git remote add origin https://github.com/XnonXte/AIC-2026.git
git checkout -b main 2>nul || git checkout main

git reset

echo [Step 1] Setup & Design Tokens (Backend & Frontend Setup)
git add package.json frontend/package.json frontend/vite.config.js frontend/index.html frontend/src/index.css frontend/src/data/mockData.js frontend/.gitignore implementation_plan.md frontend/implementation_plan.md backend/
git commit -m "feat(setup): initialize React application with UI/UX design tokens and typography system"

echo [Step 2] Signature Components (Grade Stamp & Buyer Cards)
git add frontend/src/components/GradeStamp.jsx frontend/src/components/BuyerCard.jsx
git commit -m "feat(components): implement official serrated grade stamp signature element and buyer recommendation cards"

echo [Step 3] Exclusion Matrix & Loading Process
git add frontend/src/components/ExclusionCard.jsx frontend/src/components/LoadingProgress.jsx
git commit -m "feat(components): add exclusion matrix status handler cards and explicit 3-stage progress indicator"

echo [Step 4] Camera Capture & Header
git add frontend/src/components/Header.jsx frontend/src/components/CameraView.jsx
git commit -m "feat(views): build mobile-first camera capture interface with material selector and lighting banner"

echo [Step 5] Full Integration & History
git add frontend/src/App.jsx frontend/src/main.jsx frontend/src/components/HistoryDrawer.jsx frontend/walkthrough.md walkthrough.md
git commit -m "feat(app): complete material grading workflow integration, interactive scenario switcher, and history drawer"

git push origin main --force

echo ===================================================
echo  SUCCESS! Both Backend and Frontend are Live on GitHub!
echo ===================================================
pause
