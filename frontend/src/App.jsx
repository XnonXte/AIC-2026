import React, { useState } from 'react';
import Header from './components/Header';
import CameraView from './components/CameraView';
import LoadingProgress from './components/LoadingProgress';
import GradeStamp from './components/GradeStamp';
import ExclusionCard from './components/ExclusionCard';
import BuyerCard from './components/BuyerCard';
import HistoryDrawer from './components/HistoryDrawer';
import { MOCK_GRADING_RESULTS, INITIAL_HISTORY } from './data/mockData';
import { Camera, RefreshCw, Sliders } from 'lucide-react';

export default function App() {
  // Navigation & View States
  const [currentView, setCurrentView] = useState('CAMERA'); // 'CAMERA' | 'LOADING' | 'RESULT'
  const [selectedMaterial, setSelectedMaterial] = useState('pet');
  const [scenario, setScenario] = useState('GRADED_A');
  const [resultData, setResultData] = useState(MOCK_GRADING_RESULTS.GRADED_A);
  const [isDesktopView, setIsDesktopView] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historyList, setHistoryList] = useState(INITIAL_HISTORY);

  // Trigger Capture & Start 3-Stage Progress
  const handleCapture = (targetScenario = scenario) => {
    const data = MOCK_GRADING_RESULTS[targetScenario] || MOCK_GRADING_RESULTS.GRADED_A;
    setResultData(data);
    setCurrentView('LOADING');
  };

  // Complete Loading Transition
  const handleLoadingComplete = () => {
    setCurrentView('RESULT');

    if (resultData.statusCode === 'GRADED' || resultData.statusCode === 'LOLOS_DENGAN_PERINGATAN' || resultData.statusCode === 'DOWNGRADE_PAKSA') {
      const newEntry = {
        id: `h-${Date.now()}`,
        date: 'Baru saja',
        material: resultData.materialName || selectedMaterial.toUpperCase(),
        grade: resultData.grade || 'B',
        confidence: resultData.confidenceScore || 80,
        bestPrice: resultData.buyers ? resultData.buyers[0].pricePerKg : 4200,
        buyerName: resultData.buyers ? resultData.buyers[0].name : 'CV Bersih Jaya',
        status: resultData.statusCode
      };
      setHistoryList((prev) => [newEntry, ...prev]);
    }
  };

  return (
    <div className="app-viewport-wrapper">
      <div className={`app-frame ${isDesktopView ? 'desktop-wide-view' : ''}`}>
        
        {/* Header Bar only for Result Screen or Desktop toggle */}
        {currentView === 'RESULT' && (
          <Header 
            onOpenHistory={() => setIsHistoryOpen(true)}
            isDesktopView={isDesktopView}
            onToggleView={() => setIsDesktopView(!isDesktopView)}
          />
        )}

        {/* Screen 1: Camera Capture View (Exact Mockup Match) */}
        {currentView === 'CAMERA' && (
          <CameraView 
            onCapture={handleCapture}
            selectedMaterial={selectedMaterial}
            setSelectedMaterial={setSelectedMaterial}
            scenario={scenario}
            setScenario={setScenario}
          />
        )}

        {/* Screen 2: 3-Stage Process Loading (Exact Mockup Match) */}
        {currentView === 'LOADING' && (
          <LoadingProgress 
            scenario={scenario}
            onComplete={handleLoadingComplete}
          />
        )}

        {/* Screen 3: Result View & Buyer Recommendations (Exact Mockup Match) */}
        {currentView === 'RESULT' && (
          <div 
            style={{
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              backgroundColor: '#EFE7D8',
              flex: 1,
              paddingBottom: '90px'
            }}
          >
            {/* Top Interactive Demo Scenario Switcher */}
            <div 
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '12px',
                padding: '8px 12px',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-ink)' }}>
                <Sliders size={14} color="var(--color-primary)" />
                <span style={{ fontWeight: 600 }}>Mode Demo:</span>
                <span className="text-mono" style={{ fontSize: '11px', color: 'var(--color-primary)' }}>{scenario}</span>
              </div>
              <button 
                type="button"
                onClick={() => setCurrentView('CAMERA')}
                style={{
                  fontSize: '11px',
                  color: 'var(--color-primary)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Coba Skenario Lain →
              </button>
            </div>

            {/* Standard Graded Result Layout (Exact Mockup Match) */}
            {resultData.statusCode === 'GRADED' && (
              <>
                {/* Official Stamp & System Confidence Score */}
                <GradeStamp 
                  grade={resultData.grade} 
                  confidenceScore={resultData.confidenceScore} 
                  status={resultData.statusCode} 
                />

                {/* Detected Material Details Card (Exact Mockup Match) */}
                <div 
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    textAlign: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    border: '1px solid rgba(216, 203, 176, 0.5)'
                  }}
                >
                  <h3 style={{ fontSize: '15px', color: '#2A211A', fontWeight: 700, marginBottom: '2px' }}>
                    {resultData.materialName}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#7A6E5F' }}>
                    {resultData.description}
                  </p>
                </div>

                {/* Buyer Recommendations Section (Exact Mockup Match) */}
                <div style={{ marginTop: '8px' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#2A211A', marginBottom: '2px' }}>
                      Rekomendasi pembeli
                    </h2>
                    <p style={{ fontSize: '12px', color: '#7A6E5F' }}>
                      Terurut dari yang terbaik untuk {selectedMaterial.toUpperCase()} Grade {resultData.grade}
                    </p>
                  </div>

                  {/* Buyer Cards List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {resultData.buyers && resultData.buyers.map((buyer, index) => (
                      <BuyerCard key={buyer.id} buyer={buyer} rank={index + 1} />
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Exclusion Matrix Cards for Non-Graded Cases */}
            {resultData.statusCode !== 'GRADED' && (
              <ExclusionCard 
                data={resultData}
                onRetake={() => setCurrentView('CAMERA')}
                onProceed={() => {
                  setResultData((prev) => ({
                    ...prev,
                    statusCode: 'GRADED',
                    buyers: prev.buyers || MOCK_GRADING_RESULTS.GRADED_A.buyers
                  }));
                }}
              />
            )}

          </div>
        )}

        {/* Screen 3 Bottom Fixed Primary CTA Button (Exact Mockup Match: Foto Material Lagi) */}
        {currentView === 'RESULT' && (
          <div 
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              right: '16px',
              zIndex: 90
            }}
          >
            <button 
              type="button"
              className="btn btn-primary"
              onClick={() => setCurrentView('CAMERA')}
              style={{
                borderRadius: '14px',
                minHeight: '48px',
                fontSize: '15px',
                fontWeight: 700,
                backgroundColor: '#A8481F',
                color: '#FFFFFF',
                boxShadow: '0 4px 16px rgba(168, 72, 31, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Camera size={18} />
              <span>Foto Material Lagi</span>
            </button>
          </div>
        )}

        {/* Past History Logs Drawer */}
        <HistoryDrawer 
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          historyList={historyList}
        />

      </div>
    </div>
  );
}
