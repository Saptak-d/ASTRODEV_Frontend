import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import GenerateReport from './pages/GenerateReport';
import ReportViewer from './pages/ReportViewer';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[#F5F2E9] text-[#2A1B18]">
        {/* Header navigation bar */}
        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/generate" element={<GenerateReport />} />
            <Route path="/report/:id" element={<ReportViewer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        {/* Footer info links */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
