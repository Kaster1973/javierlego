import React from 'react';
import { soundEffects } from '../../utils/audio';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundEffects.playHoverClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-14 px-6 bg-[#05070a] border-t border-white/10 text-xs font-mono text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded bg-[#FFE600] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#E3000B]" />
          </div>
          <span className="font-['Outfit'] font-black text-sm text-white tracking-wider">
            JAVIER SAEZ
          </span>
          <span className="text-slate-600">·</span>
          <span>Creative LEGO Designer © 2026</span>
        </div>

        {/* Social / Portfolio Portals */}
        <div className="flex items-center gap-6 text-slate-400">
          <a
            href="https://www.behance.net"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Behance
          </a>
          <a
            href="https://www.artstation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            ArtStation
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Instagram
          </a>
        </div>

        {/* Scroll To Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
          title="Volver arriba"
        >
          <span>VOLVER ARRIBA</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#FFE600]" />
        </button>
      </div>

      {/* Trademark Legal Disclaimer */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 text-[11px] text-slate-400 text-center md:text-left leading-relaxed">
        LEGO® es una marca registrada de The LEGO Group, compañía que no patrocina, autoriza ni respalda este sitio web de portfolio conceptual ficticio. Todos los diseños, modelos 3D y marcas mostradas tienen fines exclusivos de exhibición creativa personal de Javier Saez.
      </div>
    </footer>
  );
};
