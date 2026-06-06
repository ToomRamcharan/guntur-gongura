/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Admin from './pages/Admin.tsx';
import WhatsAppButton from './components/WhatsAppButton.tsx';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cream selection:bg-brand-orange selection:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
        <WhatsAppButton />
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}

