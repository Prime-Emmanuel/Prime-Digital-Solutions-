/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Methodology from './components/Methodology';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import LoadingScreen from './components/LoadingScreen';
import StartProjectFlow from './components/StartProjectFlow';
import ClientPortal from './components/ClientPortal';
import AdminPanel from './components/AdminPanel';
import PortalInfoPopup from './components/PortalInfoPopup';
import { AnimatePresence } from 'motion/react';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainLanding() {
  return (
    <>
      <Navbar />
      <PortalInfoPopup />
      <main>
        <Hero />
        <About />
        <Services />
        <Methodology />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function AppContent() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden relative">
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<MainLanding />} />
            <Route path="/start-project" element={<StartProjectFlow />} />
            <Route path="/client-portal" element={<ClientPortal />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
          <WhatsAppButton />
        </BrowserRouter>
      )}
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
