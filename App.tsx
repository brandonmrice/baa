import React from 'react';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import { Sidebar } from './components/Sidebar';
import { InitiateAuditModal } from './components/InitiateAuditModal';
import { UpgradeModal } from './components/UpgradeModal';
import { WalletModal } from './components/WalletModal';
import { Dashboard } from './pages/Dashboard';
import { NewAudit } from './pages/NewAudit';
import { Report } from './pages/Report';
import { Monitoring } from './pages/Monitoring';
import { Settings } from './pages/Settings';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-retro-bg flex text-white font-terminal scanlines selection:bg-retro-pink selection:text-white overflow-hidden relative">
      {/* Moving Grid Background */}
      <div className="fixed inset-0 bg-[length:40px_40px] bg-grid-pattern opacity-30 pointer-events-none animate-[pulse_4s_infinite]"></div>
      <div className="fixed inset-0 bg-gradient-to-t from-retro-bg via-transparent to-retro-bg/50 pointer-events-none"></div>

      <Sidebar />
      <main className="flex-1 ml-72 p-8 md:p-12 overflow-y-auto h-screen scroll-smooth relative z-10">
        {children}
      </main>
      <InitiateAuditModal />
      <UpgradeModal />
      <WalletModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MemoryRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/new-audit" element={<NewAudit />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/report/:id" element={<Report />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </MemoryRouter>
    </AppProvider>
  );
}