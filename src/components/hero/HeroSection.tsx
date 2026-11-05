import React from 'react';
import { soundEffects } from '../../utils/audio';
import { ArrowDown, Play, Sparkles, Layers } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onShowreelClick: () => void;
  exploded: boolean;
  onToggleExploded: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onShowreelClick,
  exploded,
  onToggleExploded,
}) => {
  // Letters structured for volumetric LEGO brick styling
  const firstName = ['J', 'A', 'V', 'I', 'E', 'R'];
  const lastName = ['S', 'A', 'E', 'Z'];

  const handleLetterHover = (char: string) => {
    soundEffects.playHoverClick();
  };

  const handleLetterClick = (char: string) => {
    soundEffects.playBrickSnap(1.1 + Math.random() * 0.3);
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 pt-24 pb-20 select-none overflow-hidden"
    >
      {/* Ambient background glow & grid lines */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#07090e]/60 to-[#07090e] pointer-events-none" />
      <div className="absolute inset-0 bg-lego-studs opacity-40 pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Top Kicker / Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#FFE600] shadow-[0_0_8px_#FFE600]" />
          <span>ESTUDIO CREATIVO 3D & ESCULTURA MODULAR</span>
          <span className="text-slate-500">/</span>
          <span className="text-[#FFE600] font-semibold">2026 EDITION</span>
        </div>

        {/* Central Volumetric LEGO 3D Name: JAVIER SAEZ */}
        <div className="mb-6 flex flex-col items-center justify-center">
          {/* First Name: JAVIER */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 mb-2.5">
            {firstName.map((letter, idx) => (
              <div
                key={`first-${idx}`}
                onMouseEnter={() => handleLetterHover(letter)}
                onClick={() => handleLetterClick(letter)}
                className="group relative cursor-pointer transform hover:-translate-y-2 active:translate-y-1 transition-all duration-200"
                style={{
                  animationDelay: `${idx * 80}ms`,
                }}
              >
                {/* 3D LEGO Block Letter Container */}
                <div className="relative w-12 h-16 sm:w-16 sm:h-22 md:w-20 md:h-28 lg:w-24 lg:h-32 bg-gradient-to-b from-[#ffea33] via-[#FFE600] to-[#d4be00] rounded-lg sm:rounded-xl flex items-center justify-center shadow-[0_12px_24px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.7),inset_0_-4px_8px_rgba(0,0,0,0.35)] border-t border-white/50 border-b-2 border-black/30">
                  {/* Top Studs Row */}
                  <div className="absolute -top-2.5 sm:-top-3.5 left-0 right-0 flex justify-around px-1 pointer-events-none">
                    <div className="w-3.5 h-2.5 sm:w-5 sm:h-3.5 rounded-full bg-[#ffea33] shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.6)] border-t border-white/60" />
                    <div className="w-3.5 h-2.5 sm:w-5 sm:h-3.5 rounded-full bg-[#ffea33] shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.6)] border-t border-white/60" />
                  </div>

                  {/* Tactile Letter Typography */}
                  <span className="font-['Outfit'] font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#121620] tracking-tighter drop-shadow-[0_2px_2px_rgba(255,255,255,0.4)]">
                    {letter}
                  </span>

                  {/* Lateral bevel highlight */}
                  <div className="absolute inset-y-0 right-0 w-1 bg-black/15 rounded-r-lg" />
                </div>
              </div>
            ))}
          </div>

          {/* Last Name: SAEZ */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3.5">
            {lastName.map((letter, idx) => (
              <div
                key={`last-${idx}`}
                onMouseEnter={() => handleLetterHover(letter)}
                onClick={() => handleLetterClick(letter)}
                className="group relative cursor-pointer transform hover:-translate-y-2 active:translate-y-1 transition-all duration-200"
                style={{
                  animationDelay: `${(idx + 6) * 80}ms`,
                }}
              >
                {/* 3D LEGO Red & Obsidian Block Letter Container */}
                <div className={`relative w-12 h-16 sm:w-16 sm:h-22 md:w-20 md:h-28 lg:w-24 lg:h-32 rounded-lg sm:rounded-xl flex items-center justify-center border-t border-white/40 border-b-2 border-black/40 shadow-[0_12px_24px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-4px_8px_rgba(0,0,0,0.4)] ${
                  idx === 0 || idx === 3
                    ? 'bg-gradient-to-b from-[#ff2e3b] via-[#E3000B] to-[#a30007]'
                    : 'bg-gradient-to-b from-[#1e2638] via-[#141a26] to-[#0c1017]'
                }`}>
                  {/* Top Studs */}
                  <div className="absolute -top-2.5 sm:-top-3.5 left-0 right-0 flex justify-around px-1 pointer-events-none">
                    <div className={`w-3.5 h-2.5 sm:w-5 sm:h-3.5 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.5)] ${
                      idx === 0 || idx === 3 ? 'bg-[#ff3845]' : 'bg-[#252f44]'
                    }`} />
                    <div className={`w-3.5 h-2.5 sm:w-5 sm:h-3.5 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.5)] ${
                      idx === 0 || idx === 3 ? 'bg-[#ff3845]' : 'bg-[#252f44]'
                    }`} />
                  </div>

                  {/* Letter Text */}
                  <span className={`font-['Outfit'] font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] ${
                    idx === 0 || idx === 3 ? 'text-white' : 'text-[#FFE600]'
                  }`}>
                    {letter}
                  </span>

                  {/* Lateral bevel highlight */}
                  <div className="absolute inset-y-0 right-0 w-1 bg-black/25 rounded-r-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subtitle: CREATIVE LEGO DESIGNER */}
        <div className="mt-4 mb-8">
          <h2 className="font-['Outfit'] font-bold text-xl sm:text-2xl md:text-3xl text-white tracking-[0.22em] uppercase text-balance">
            CREATIVE LEGO DESIGNER
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Escultura volumétrica 3D, desarrollo de sets de alta gama, dirección de arte cinemática y experiencias modulares de vanguardia para coleccionistas y marcas internacionales.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <button
            onClick={() => {
              soundEffects.playBrickSnap(1.2);
              onExploreClick();
            }}
            className="flex items-center gap-2.5 px-7 py-3.5 bg-[#FFE600] hover:bg-[#ffea33] text-black font-bold text-sm rounded-xl tracking-wider uppercase transition-all shadow-[0_4px_24px_rgba(255,230,0,0.35)] hover:shadow-[0_8px_32px_rgba(255,230,0,0.55)] hover:-translate-y-0.5 cursor-pointer"
          >
            <span>DESCUBRIR PORTFOLIO</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              soundEffects.playHoverClick();
              onShowreelClick();
            }}
            className="flex items-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-medium text-sm rounded-xl border border-white/10 hover:border-white/20 transition-all backdrop-blur-sm cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>VER SHOWREEL 3D</span>
          </button>
        </div>

        {/* Interactive 3D Assembly Pill Trigger */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[#0d111a]/80 border border-white/10 backdrop-blur-md">
          <Layers className="w-4 h-4 text-[#FFE600]" />
          <span className="text-xs text-slate-300">Escenario 3D interactivo en tiempo real</span>
          <span className="text-slate-600">·</span>
          <button
            onClick={() => {
              soundEffects.playBrickSnap(exploded ? 0.9 : 1.3);
              onToggleExploded();
            }}
            className="text-xs font-semibold text-[#FFE600] hover:underline cursor-pointer flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" />
            <span>{exploded ? 'Reensamblar' : 'Despiezar en 3D'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
