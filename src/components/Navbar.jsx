import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-[#2A1B18] text-[#F5F2E9] border-b-2 border-[#D4AF37] px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-widest flex items-center gap-2">
          <span>🕉</span> ASTRODEV
        </Link>
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-[#D4AF37] transition font-sans text-sm tracking-wider">HOME</Link>
          
          <div 
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link 
              to="/#services" 
              className="hover:text-[#D4AF37] transition font-sans text-sm tracking-wider flex items-center gap-1 py-1"
              onClick={() => setDropdownOpen(false)}
            >
              SERVICES <span className="text-[8px]">▼</span>
            </Link>
            
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-[#1C120F]/95 border border-[#D4AF37]/35 rounded-xl shadow-2xl py-2 z-50 backdrop-blur-md text-left">
                <Link 
                  to="/generate" 
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2.5 text-[11px] font-sans font-bold tracking-wider hover:bg-[#D4AF37] hover:text-[#1E1410] text-[#F5F2E9] transition uppercase flex items-center gap-2"
                >
                  <span>☸</span> Sacred Kundli Reading
                </Link>
                <div className="h-px bg-[#D4AF37]/15 my-1"></div>
                <span className="block px-4 py-2.5 text-[10px] font-sans text-gray-500 uppercase tracking-wider cursor-not-allowed opacity-60 flex items-center gap-2">
                  <span>⚭</span> Kundli Milan (Soon)
                </span>
                <span className="block px-4 py-2.5 text-[10px] font-sans text-gray-500 uppercase tracking-wider cursor-not-allowed opacity-60 flex items-center gap-2">
                  <span>⏳</span> Varshaphal Return (Soon)
                </span>
                <span className="block px-4 py-2.5 text-[10px] font-sans text-gray-500 uppercase tracking-wider cursor-not-allowed opacity-60 flex items-center gap-2">
                  <span>💎</span> Gemstone Guidance (Soon)
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
