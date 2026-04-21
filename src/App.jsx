import { useState, useCallback } from 'react';
import { ParkingProvider } from './context/ParkingContext';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import Dashboard from './pages/Dashboard';
import ParkVehicle from './pages/ParkVehicle';
import ExitVehicle from './pages/ExitVehicle';
import SlotStatus from './pages/SlotStatus';
import Revenue from './pages/Revenue';

function AppContent() {
  const [activePage, setActivePage] = useState('dashboard');
  const [toast, setToast] = useState(null);

  const handleToast = useCallback((t) => {
    setToast(null);
    setTimeout(() => setToast(t), 50);
  }, []);

  const renderPage = () => {
    const props = { onToast: handleToast, setActivePage };
    switch (activePage) {
      case 'dashboard': return <Dashboard setActivePage={setActivePage} />;
      case 'park':      return <ParkVehicle {...props} />;
      case 'exit':      return <ExitVehicle {...props} />;
      case 'slots':     return <SlotStatus setActivePage={setActivePage} />;
      case 'revenue':   return <Revenue setActivePage={setActivePage} />;
      default:          return <Dashboard setActivePage={setActivePage} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--navy-900)' }}>
      <ParticleBackground />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar activePage={activePage} setActivePage={setActivePage} />
        <main style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 24px 48px' }}>
          {renderPage()}
        </main>
        <footer style={{
          textAlign: 'center', padding: '18px 24px',
          borderTop: '1px solid var(--border)',
          fontSize: 12, color: 'var(--text-3)',
          letterSpacing: '0.5px',
        }}>
          SRM Parking Management System · 12 Slots · Car ₹50 · Bike ₹20 · Truck ₹100/hr
        </footer>
      </div>
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default function App() {
  return (
    <ParkingProvider>
      <AppContent />
    </ParkingProvider>
  );
}
