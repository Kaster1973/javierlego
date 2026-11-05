import React, { useEffect } from 'react';
import { Project } from '../../types/portfolio';
import { soundEffects } from '../../utils/audio';
import { X, Box, Wrench, Layers, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      {/* Click outside to close backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl bg-[#0c1017] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto text-left flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-[#0a0d14] border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-[#FFE600] font-semibold">{project.year}</span>
            <span>·</span>
            <span>{project.categoryLabel}</span>
            {project.client && (
              <>
                <span>·</span>
                <span className="text-slate-300">{project.client}</span>
              </>
            )}
          </div>
          <button
            onClick={() => {
              soundEffects.playHoverClick();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8">
          {/* Hero Image Showcase */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black/40 border border-white/10">
            <img
              src={project.coverImage}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {project.pieces && project.pieces > 0 && (
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/80 border border-white/20 backdrop-blur-md text-xs font-mono text-white flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5 text-[#FFE600]" />
                <span>{project.pieces.toLocaleString()} Piezas LEGO</span>
              </div>
            )}
          </div>

          {/* Title and Subtitle */}
          <div>
            <h2 id="project-modal-title" className="font-['Outfit'] font-black text-2xl sm:text-3xl text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-base text-[#FFE600] mt-1 font-medium">
              {project.subtitle}
            </p>
            <p className="mt-4 text-slate-300 text-sm leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          {/* Key Metrics Grid */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10">
              {project.metrics.map((m, idx) => (
                <div key={idx}>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">{m.label}</div>
                  <div className="text-base font-bold text-white mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Technical Challenge & Architectural Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-red-950/20 border border-red-500/20">
              <div className="flex items-center gap-2 text-xs font-mono text-[#E3000B] uppercase font-semibold mb-2">
                <Layers className="w-4 h-4" />
                <span>Reto de Diseño & Geometría</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {project.challenge}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-blue-950/20 border border-blue-500/20">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase font-semibold mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Solución Técnica & Prototipado</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Tools & Software Stack */}
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-[#FFE600]" />
              <span>Software & Tecnologías Aplicadas</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {project.tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Additional Gallery if available */}
          {project.gallery.length > 1 && (
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FFE600]" />
                <span>Renders de Detalle & Perspectivas</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.gallery.map((imgSrc, idx) => (
                  <div key={idx} className="aspect-video rounded-lg overflow-hidden border border-white/10">
                    <img
                      src={imgSrc}
                      alt={`${project.title} vista ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#0a0d14] border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">Proyecto conceptual editable · Javier Saez</span>
          <button
            onClick={() => {
              soundEffects.playHoverClick();
              onClose();
            }}
            className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
          >
            Cerrar Ficha
          </button>
        </div>
      </div>
    </div>
  );
};
