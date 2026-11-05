import React, { useState, useEffect } from 'react';
import { soundEffects } from '../../utils/audio';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'inicio', label: 'INICIO' },
    { id: 'sobre-mi', label: 'SOBRE MÍ' },
    { id: 'proyectos', label: 'PROYECTOS' },
    { id: 'showreel', label: 'SHOWREEL' },
    { id: 'curriculum', label: 'CURRÍCULUM' },
  ];

  const handleLinkClick = (id: string) => {
    soundEffects.playHoverClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-[#07090e]/90 border-white/10 shadow-xl'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element wordmark) */}
        <button
          onClick={() => handleLinkClick('inicio')}
          className="flex items-center gap-2.5 text-left group cursor-pointer whitespace-nowrap shrink-0"
        >
          {/* LEGO stud square logo mark */}
          <div className="w-8 h-8 rounded bg-[#FFE600] flex items-center justify-center shadow-[0_2px_8px_rgba(255,230,0,0.3)] relative">
            <div className="w-3.5 h-3.5 rounded-full bg-[#E3000B] shadow-inner" />
          </div>
          <span className="font-['Outfit'] font-black tracking-wider text-xl text-white group-hover:text-[#FFE600] transition-colors">
            JAVIER SAEZ
          </span>
        </button>

        {/* Zone 2: 4-5 Clean single-line text nav links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive ? 'text-[#FFE600]' : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFE600] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary action */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <button
            onClick={() => handleLinkClick('contacto')}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#FFE600] hover:bg-[#ffea33] text-black font-semibold text-xs rounded-xl tracking-wider uppercase transition-all shadow-[0_4px_16px_rgba(255,230,0,0.25)] hover:shadow-[0_6px_22px_rgba(255,230,0,0.4)] hover:-translate-y-0.5 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>CONTACTAR</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={() => handleLinkClick('contacto')}
            className="px-3.5 py-1.5 bg-[#FFE600] text-black font-semibold text-xs rounded-lg uppercase tracking-wider whitespace-nowrap"
          >
            Contacto
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white bg-white/5 rounded-lg border border-white/10"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0d14]/98 border-b border-white/10 px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`text-left text-base font-semibold py-2 px-3 rounded-lg transition-colors ${
                activeSection === link.id
                  ? 'bg-white/10 text-[#FFE600]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleLinkClick('contacto')}
            className="w-full mt-2 py-3 bg-[#FFE600] text-black font-bold text-center rounded-xl tracking-wider uppercase flex items-center justify-center gap-2"
          >
            <span>INICIAR CONTACTO</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
