/**
 * DesktopLayout Component (Simplified - Full Screen Only)
 * Removed sidebar and header for full-screen dark/light mode UI
 */
export default function DesktopLayout({ 
  children, 
  currentView, 
  onViewChange, 
  historyCount = 0,
  onOpenHistory 
}) {
  // Tentukan background berdasarkan current view - match dengan mobile colors
  let backgroundColor;
  if (currentView === 'CAMERA') {
    backgroundColor = '#000000'; // Pure black for outer background
  } else if (currentView === 'LOADING') {
    backgroundColor = '#3E392F'; // Mobile loading brown
  } else {
    backgroundColor = '#EFE7D8'; // Mobile results light cream
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100vw',
      height: '100vh',
      backgroundColor: backgroundColor,
      fontFamily: 'var(--font-body)',
      color: 'var(--color-ink)',
      transition: 'background-color 0.5s ease',
      overflow: 'hidden'
    }}>
      {/* Full Screen Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}>
        {children}
      </div>
    </div>
  );
}
