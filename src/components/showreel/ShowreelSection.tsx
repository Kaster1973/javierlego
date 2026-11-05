import React, { useState, useEffect } from 'react';
import { SHOWREEL_SCENES } from '../../data/portfolioData';
import { soundEffects } from '../../utils/audio';
import { Play, Pause, RotateCcw, Monitor, Cpu, Sparkles, Sliders, Volume2, VolumeX, Maximize2 } from 'lucide-react';

interface ShowreelSectionProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const ShowreelSection: React.FC<ShowreelSectionProps> = ({ soundEnabled, onToggleSound }) => {
  const [selectedSceneIndex, setSelectedSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(24);
  const [renderPass, setRenderPass] = useState<'beauty' | 'clay' | 'wireframe' | 'lighting'>('beauty');

  const activeScene = SHOWREEL_SCENES[selectedSceneIndex];

  // Simulated playback progress
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSceneSelect = (index: number) => {
    soundEffects.playHoverClick();
    setSelectedSceneIndex(index);
    setProgress(0);
  };

  const togglePlay = () => {
    soundEffects.playHoverClick();
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="showreel" className="relative py-28 px-6 bg-[#090c13] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FFE600] uppercase tracking-wider mb-2">
              <span>03. Showreel Cinematográfico</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">Dirección de Arte & Render 3D</span>
            </div>
            <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              DEMO REEL 2026: KINEMATICS & CGI
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md font-light leading-relaxed">
            Una compilación de secuencias animadas, simulaciones físicas y cinemáticas de producto renderizadas con iluminación fotométrica para el universo LEGO.
          </p>
        </div>

        {/* Cinematic Player Container */}
        <div className="rounded-2xl bg-[#0c1017] border border-white/15 overflow-hidden shadow-2xl mb-8">
          {/* Main Visual Viewport */}
          <div className="relative aspect-[16/9] w-full bg-black overflow-hidden group">
            {/* Active Scene Media */}
            <img
              src={activeScene.thumbnail}
              alt={activeScene.title}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-all duration-700 ${
                renderPass === 'clay' ? 'grayscale contrast-125 brightness-95' :
                renderPass === 'wireframe' ? 'invert hue-rotate-180 contrast-200' :
                renderPass === 'lighting' ? 'brightness-125 saturate-150' : ''
              }`}
            />

            {/* Cinematic Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />

            {/* Upper Viewport HUD */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-white/90 pointer-events-none">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#E3000B] animate-pulse" />
                <span className="font-bold tracking-wider">SHOWREEL 4K UHD</span>
                <span className="text-white/40">·</span>
                <span className="text-[#FFE600]">{activeScene.timestamp}</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md">
                <span>PASS: {renderPass.toUpperCase()}</span>
                <span className="text-white/40">·</span>
                <span className="text-cyan-400">60.00 FPS</span>
              </div>
            </div>

            {/* Center Big Play Button (when paused) */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full bg-[#FFE600] flex items-center justify-center text-black shadow-[0_0_30px_rgba(255,230,0,0.5)] transform hover:scale-105 transition-transform">
                  <Play className="w-8 h-8 fill-black translate-x-1" />
                </div>
              </div>
            )}

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3 bg-gradient-to-t from-black/95 to-transparent">
              {/* Scrubbable Progress Line */}
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  setProgress(Math.round((clickX / rect.width) * 100));
                }}
                className="relative w-full h-1.5 bg-white/20 hover:h-2.5 rounded-full cursor-pointer transition-all group/bar"
              >
                <div
                  className="absolute top-0 bottom-0 left-0 bg-[#FFE600] rounded-full shadow-[0_0_8px_#FFE600]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Player Controls Row */}
              <div className="flex items-center justify-between text-white text-xs font-mono">
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                    title={isPlaying ? 'Pausar' : 'Reproducir'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <button
                    onClick={() => setProgress(0)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Reiniciar escena"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <div className="hidden sm:flex items-center gap-2 text-slate-300">
                    <span className="text-white font-semibold">{activeScene.title}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-400">{activeScene.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Sound simulated toggle */}
                  <button
                    onClick={() => {
                      soundEffects.playHoverClick();
                      onToggleSound();
                    }}
                    className={`p-2 rounded-lg transition-colors cursor-pointer ${
                     soundEnabled ? 'text-[#FFE600] bg-white/10' : 'text-slate-400 hover:text-white bg-white/5'
                    }`}
                     aria-label={soundEnabled ? 'Silenciar audio de pista' : 'Activar audio cinemático'}
                     title={soundEnabled ? 'Silenciar audio de pista' : 'Activar audio cinemático'}
                  >
                    {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>

                  {/* Render pass selector buttons */}
                  <div className="hidden md:flex items-center gap-1 p-1 bg-black/60 rounded-lg border border-white/10">
                    {(['beauty', 'clay', 'wireframe', 'lighting'] as const).map((pass) => (
                      <button
                        key={pass}
                        onClick={() => {
                          soundEffects.playHoverClick();
                          setRenderPass(pass);
                        }}
                        className={`px-2.5 py-1 rounded text-[11px] uppercase transition-colors cursor-pointer ${
                          renderPass === pass ? 'bg-[#FFE600] text-black font-bold' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {pass === 'beauty' ? 'Final 4K' : pass}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scene Selectors Grid (Thumbnails) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border-t border-white/10">
            {SHOWREEL_SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => handleSceneSelect(idx)}
                className={`p-4 text-left transition-colors cursor-pointer flex flex-col gap-1.5 ${
                  selectedSceneIndex === idx
                    ? 'bg-[#151b27] border-b-2 border-[#FFE600]'
                    : 'bg-[#0c1017] hover:bg-[#10141e]'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className={selectedSceneIndex === idx ? 'text-[#FFE600] font-bold' : ''}>
                    {scene.timestamp}
                  </span>
                  <span>{scene.category}</span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white truncate">
                  {scene.title}
                </div>
              </button>
            ))}
          </div>

          {/* Technical Specs Breakdown of Active Scene */}
          <div className="p-6 bg-[#0a0d14] border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-mono">
            <div>
              <div className="text-slate-500 uppercase">Motor de Render</div>
              <div className="text-slate-200 font-semibold mt-0.5">{activeScene.technicalSpecs.engine}</div>
            </div>
            <div>
              <div className="text-slate-500 uppercase">Tiempo de Render / Frame</div>
              <div className="text-slate-200 font-semibold mt-0.5">{activeScene.technicalSpecs.renderTime}</div>
            </div>
            <div>
              <div className="text-slate-500 uppercase">Calidad de Muestreo</div>
              <div className="text-slate-200 font-semibold mt-0.5">{activeScene.technicalSpecs.sampleRate}</div>
            </div>
            <div>
              <div className="text-slate-500 uppercase">Esquema de Iluminación</div>
              <div className="text-slate-200 font-semibold mt-0.5">{activeScene.technicalSpecs.lighting}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
