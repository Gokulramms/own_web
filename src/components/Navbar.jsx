import React from 'react';
import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-3xl shadow-[0_0_40px_rgba(0,212,255,0.08)]">
      <div className="flex justify-between items-center px-8 py-6 max-w-[1600px] mx-auto">
        
        {/* Brand */}
        <a className="text-2xl font-black text-white tracking-tighter hover:text-primary transition-colors interactive-card" href="#">
          GOKUL.DEV
        </a>
        
        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-label tracking-wide uppercase text-[11px]">
          <a className="text-primary font-bold border-b border-primary pb-1 interactive-card" href="#">Work</a>
          <a className="text-on-surface-variant hover:text-white transition-colors duration-300 interactive-card" href="#">Intelligence</a>
          <a className="text-on-surface-variant hover:text-white transition-colors duration-300 interactive-card" href="#">About</a>
          <a className="text-on-surface-variant hover:text-white transition-colors duration-300 interactive-card" href="#">Contact</a>
        </nav>
        
        {/* Trailing Action */}
        <button className="hidden md:flex items-center px-6 py-2.5 bg-white/5 hover:bg-white/10 text-primary font-headline font-bold text-xs tracking-widest rounded transition-all duration-300 transform hover:scale-105 interactive-card">
          INITIATE CONTACT
        </button>
        
        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white p-2 interactive-card">
          <Menu />
        </button>
      </div>
    </header>
  );
}
