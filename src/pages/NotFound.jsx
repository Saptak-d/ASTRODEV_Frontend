import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto text-center py-24 px-6">
      <h1 className="text-6xl font-extrabold text-[#D4AF37] mb-4">404</h1>
      <h2 className="text-2xl font-bold uppercase tracking-widest text-[#2A1B18] mb-2">Coordinates Lost</h2>
      <p className="text-gray-600 text-sm mb-6 font-sans">The cosmic path you are searching for does not exist in this timezone.</p>
      <Link to="/" className="bg-[#2A1B18] text-[#F5F2E9] py-3 px-8 rounded shadow-sm tracking-widest font-bold text-xs uppercase hover:bg-[#4A3E3D] transition">
        Return to Safety
      </Link>
    </div>
  );
}
