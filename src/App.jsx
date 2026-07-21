import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import GenerateReport from './pages/GenerateReport';
import ReportViewer from './pages/ReportViewer';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import PdfGenerator from './pages/PdfGenerator';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-[#F5F2E9] text-[#2A1B18]">
          {/* Header navigation bar */}
          <Navbar />
          
          {/* Main Content Area */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/generate" element={<GenerateReport />} />
              <Route path="/pdf-generator" element={<PdfGenerator />} />
              <Route path="/report/:id" element={<ReportViewer />} />

              
              {/* Payment Flow */}
              <Route path="/checkout/:reportId" element={<Checkout />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/failed" element={<PaymentFailed />} />

              {/* Admin Panel */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          
          {/* Footer info links */}
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

