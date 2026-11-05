import React from 'react';
import { LightingPreset } from './LegoCanvas';
import { soundEffects } from '../../utils/audio';
import { Sun, Sparkles, Flame, Eye, Layers, ChevronUp, ChevronDown, Volume2, VolumeX } from 'lucide-react';

interface ControlDockProps {
  exploded: boolean;
  onToggleExploded: () => void;
  lightingPreset: LightingPreset;
  onChangeLighting: (preset: LightingPreset) => void;
  zenMode: boolean;
  onToggleZenMode: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isDockCollapsed: boolean;
  onToggleDockCollapse: () => void;
}

export const ControlDock: React.FC<ControlDockProps> = ({
  exploded,
  onToggleExploded,
  lightingPreset,
  onChangeLighting,
  zenMode,
  onToggleZenMode,
  soundEnabled,
  onToggleSound,
  isDockCollapsed,
  onToggleDockCollapse,
}) => {
  const lightingOptions: { id: LightingPreset; label: string; icon: React.ReactNode }[] = [
    { id: 'studio', label: 'Estudio Clásico', icon: <Sun className="w-3.5 h-3.5" /> },
    { id: 'neon', label: 'Ciberpunk Neón', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'golden', label: 'Hora Dorada', icon: <Flame className="w-3.5 h-3.5" /> },
    { id: 'monochrome', label: 'Monocromo', icon: <Layers className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-[min(940px,94vw)] w-full flex flex-col items-center pointer-events-none transition-all duration-300">
      {/* Drawer Toggle Tab */}
      <button
        onClick={() => {
          soundEffects.playHoverClick();
          onToggleDockCollapse();
        }}
        className="pointer-events-auto mb-1.5 flex items-center gap-1.5 px-3 py-1 bg-[#0d111a]/90 text-slate-300 hover:text-white hover:bg-[#161c28] border border-white/10 rounded-full text-xs font-mono transition-colors shadow-lg cursor-pointer"
        title="Ocultar o mostrar barra de herramientas 3D"
      >
        {isDockCollapsed ? <ChevronUp className="w-3 h-3 text-[#FFE600]" /> : <ChevronDown className="w-3 h-3 text-[#FFE600]" />}
        <span>{isDockCollapsed ? 'Mostrar Controles 3D' : 'Ocultar Controles 3D'}</span>
      </button>

      {/* Main Glassmorphic Dock */}
      {!isDockCollapsed && (
        <div className="pointer-events-auto w-full p-2.5 sm:p-3 bg-[#0d111a]/90 border border-white/10 rounded-2xl shadow-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Section 1: Exploded / Assembled state */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider hidden sm:inline">Ensamblaje:</span>
            <button
              onClick={() => {
                soundEffects.playBrickSnap(exploded ? 0.9 : 1.3);
                onToggleExploded();
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                exploded
                  ? 'bg-[#E3000B] text-white shadow-[0_0_15px_rgba(227,0,11,0.4)]'
                  : 'bg-white/10 text-slate-200 hover:bg-white/15'
              }`}
              title="Alternar entre piezas unidas y vista despiezada en 3D"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{exploded ? 'Reensamblar Piezas' : 'Despiece 3D (Exploded)'}</span>
            </button>
          </div>

          {/* Section 2: Lighting Presets */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider hidden md:inline mr-1">Luz 3D:</span>
            {lightingOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  soundEffects.playHoverClick();
                  onChangeLighting(opt.id);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1.2 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  lightingPreset === opt.id
                    ? 'bg-[#FFE600] text-black font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {opt.icon}
                <span>{opt.label}</span>
              </button>
            ))}
          </div>

          {/* Section 3: Audio & Zen Mode Toggle */}
          <div className="flex items-center gap-1.5 ml-auto">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                onToggleSound();
                soundEffects.playHoverClick();
              }}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                soundEnabled ? 'text-[#FFE600] bg-white/10' : 'text-slate-500 hover:text-slate-300 bg-white/5'
              }`}
              aria-label={soundEnabled ? 'Silenciar sonidos LEGO' : 'Activar efectos de sonido'}
              title={soundEnabled ? 'Silenciar sonidos LEGO' : 'Activar efectos hápticos de sonido'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Zen / 3D Canvas Mode */}
            <button
              onClick={() => {
                soundEffects.playHoverClick();
                onToggleZenMode();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-medium ${
                zenMode
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-white/10 text-slate-200 hover:bg-white/15'
              }`}
              title="Modo pantalla completa para admirar únicamente el escenario 3D sin textos"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{zenMode ? 'Salir de Modo 3D' : 'Modo 3D Zen'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
