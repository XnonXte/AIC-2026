import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CameraView from './components/CameraView';
import DesktopCameraView from './components/DesktopCameraView';
import LoadingProgress from './components/LoadingProgress';
import DesktopLoadingProgress from './components/DesktopLoadingProgress';
import GradeStamp from './components/GradeStamp';
import ExclusionCard from './components/ExclusionCard';
import BuyerCard from './components/BuyerCard';
import HistoryDrawer from './components/HistoryDrawer';
import DesktopLayout from './components/DesktopLayout';
import DesktopResultsPanel from './components/DesktopResultsPanel';
import DesktopHistoryView from './components/DesktopHistoryView';
import { MOCK_GRADING_RESULTS, INITIAL_HISTORY } from './data/mockData';
import { Camera, Sliders, Smartphone } from 'lucide-react';

export default function App() {
  // Device Detection
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 960);
  
  // Navigation & View States
  const [currentView, setCurrentView] = useState('CAMERA'); // 'CAMERA' | 'LOADING' | 'RESULT' | 'HISTORY'
  const [selectedMaterial, setSelectedMaterial] = useState('pet');
  const [scenario, setScenario] = useState('GRADED_A');
  const [resultData, setResultData] = useState(MOCK_GRADING_RESULTS.GRADED_A);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historyList, setHistoryList] = useState(INITIAL_HISTORY);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 960);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Trigger Capture & Start 3-Stage Progress
  const handleCapture = (targetScenario = scenario, photo = null) => {
    const data = MOCK_GRADING_RESULTS[targetScenario] || MOCK_GRADING_RESULTS.GRADED_A;
    setResultData(data);
    setCapturedPhoto(photo);
    setActiveItemIndex(0); // Reset to first item
    setCurrentView('LOADING');
  };

  // Complete Loading Transition
  const handleLoadingComplete = () => {
    setCurrentView('RESULT');

    if (resultData.statusCode === 'GRADED' || resultData.statusCode === 'LOLOS_DENGAN_PERINGATAN' || resultData.statusCode === 'DOWNGRADE_PAKSA') {
      // For multiple items, record each item separately or the primary one
      const items = resultData.items || [resultData];
      const primaryItem = items[0];
      
      const newEntry = {
        id: `h-${Date.now()}`,
        date: 'Baru saja',
        material: primaryItem.materialName || selectedMaterial.toUpperCase(),
        grade: primaryItem.grade || 'B',
        confidence: primaryItem.confidenceScore || 80,
        bestPrice: primaryItem.buyers ? primaryItem.buyers[0].pricePerKg : 4200,
        buyerName: primaryItem.buyers ? primaryItem.buyers[0].name : 'CV Bersih Jaya',
        status: resultData.statusCode,
        itemCount: items.length > 1 ? items.length : undefined
      };
      setHistoryList((prev) => [newEntry, ...prev]);
    }
  };

  // Desktop view for screens > 960px width
  if (isDesktop) {
    return (
      <DesktopLayout
        currentView={currentView}
        onViewChange={setCurrentView}
        historyCount={historyList.length}
        onOpenHistory={() => setCurrentView('HISTORY')}
      >
        {/* Desktop Camera View */}
        {currentView === 'CAMERA' && (
          <DesktopCameraView
            onCapture={handleCapture}
            selectedMaterial={selectedMaterial}
            setSelectedMaterial={setSelectedMaterial}
            scenario={scenario}
            setScenario={setScenario}
          />
        )}

        {/* Desktop Loading Progress */}
        {currentView === 'LOADING' && (
          <DesktopLoadingProgress
            scenario={scenario}
            onComplete={handleLoadingComplete}
          />
        )}

        {/* Desktop Results Panel */}
        {currentView === 'RESULT' && (
          <DesktopResultsPanel
            resultData={resultData}
            selectedMaterial={selectedMaterial}
            capturedPhoto={capturedPhoto}
            onRetake={() => setCurrentView('CAMERA')}
            onProceed={() => {
              if (resultData.statusCode !== 'GRADED') {
                setResultData((prev) => ({
                  ...prev,
                  statusCode: 'GRADED',
                  buyers: prev.buyers || MOCK_GRADING_RESULTS.GRADED_A.buyers
                }));
              }
            }}
          />
        )}

        {/* Desktop History View */}
        {currentView === 'HISTORY' && (
          <DesktopHistoryView
            historyList={historyList}
            onBack={() => setCurrentView('CAMERA')}
          />
        )}
      </DesktopLayout>
    );
  }

  // Mobile view for screens <= 960px width
  return (
    <>
      {/* Mobile App */}
      <div className="app-viewport-wrapper">
      <div className="app-frame">

          {/* Screen 1: Camera Capture View */}
          {currentView === 'CAMERA' && (
            <CameraView
              onCapture={handleCapture}
              selectedMaterial={selectedMaterial}
              setSelectedMaterial={setSelectedMaterial}
              scenario={scenario}
              setScenario={setScenario}
            />
          )}

          {/* Screen 2: 3-Stage Process Loading */}
          {currentView === 'LOADING' && (
            <LoadingProgress
              scenario={scenario}
              onComplete={handleLoadingComplete}
            />
          )}

          {/* Screen 3: Result View & Buyer Recommendations */}
          {currentView === 'RESULT' && (
            <div
              style={{
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                backgroundColor: '#EFE7D8',
                flex: 1,
                overflowY: 'auto',
                paddingBottom: '90px'
              }}
            >


           {/* Standard Graded Result Layout */}
              {resultData.statusCode === 'GRADED' && (
                <>
                   <GradeStamp
                    grade={resultData.grade}
                    confidenceScore={resultData.confidenceScore}
                    status={resultData.statusCode}
                    capturedPhoto={capturedPhoto}
                    items={resultData.items}
                    currentItemIndex={activeItemIndex}
                    onItemChange={setActiveItemIndex}
                  />

                  {resultData.items && resultData.items.length > 0 ? (
                    <>
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
                          {resultData.items[activeItemIndex].materialName}
                        </h3>
                        <p style={{ fontSize: '13px', color: '#7A6E5F' }}>
                          {resultData.items[activeItemIndex].description}
                        </p>
                      </div>

                      <div style={{ marginTop: '8px' }}>
                        <div style={{ marginBottom: '12px' }}>
                          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#2A211A', marginBottom: '2px' }}>
                            Rekomendasi pembeli
                          </h2>
                          <p style={{ fontSize: '12px', color: '#7A6E5F' }}>
                            Terurut dari yang terbaik untuk {selectedMaterial.toUpperCase()} Grade {resultData.items[activeItemIndex].grade}
                          </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {resultData.items[activeItemIndex].buyers && resultData.items[activeItemIndex].buyers.map((buyer, index) => (
                            <BuyerCard key={buyer.id} buyer={buyer} rank={index + 1} />
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
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

                      <div style={{ marginTop: '8px' }}>
                        <div style={{ marginBottom: '12px' }}>
                          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#2A211A', marginBottom: '2px' }}>
                            Rekomendasi pembeli
                          </h2>
                          <p style={{ fontSize: '12px', color: '#7A6E5F' }}>
                            Terurut dari yang terbaik untuk {selectedMaterial.toUpperCase()} Grade {resultData.grade}
                          </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {resultData.buyers && resultData.buyers.map((buyer, index) => (
                            <BuyerCard key={buyer.id} buyer={buyer} rank={index + 1} />
                          ))}
                        </div>
                      </div>
                    </>
                  )}
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

          {/* Bottom Fixed CTA Button */}
          {currentView === 'RESULT' && (
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                zIndex: 90,
                paddingBottom: 'env(safe-area-inset-bottom, 0px)'
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
    </>
  );
}
