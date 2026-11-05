import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../../data/portfolioData';
import { Project } from '../../types/portfolio';
import { ProjectModal } from './ProjectModal';
import { soundEffects } from '../../utils/audio';
import { ArrowUpRight, Box, Sparkles, Filter } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filterCategories = [
    { id: 'all', label: 'Todos los Proyectos' },
    { id: 'sets', label: 'Sets & Conceptos' },
    { id: 'architecture', label: 'Arquitectura & Esculturas' },
    { id: 'packaging', label: 'Packaging & Campañas' },
    { id: 'technic', label: 'Technic & Mecánica' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => {
        if (selectedCategory === 'sets') return p.category === 'sets';
        if (selectedCategory === 'architecture') return p.category === 'architecture';
        if (selectedCategory === 'packaging') return p.category === 'packaging' || p.category === 'campaigns';
        if (selectedCategory === 'technic') return p.category === 'technic';
        return true;
      });

  const handleCardClick = (project: Project) => {
    soundEffects.playBrickSnap(1.2);
    setActiveProject(project);
  };

  return (
    <section id="proyectos" className="relative py-28 px-6 bg-[#07090e] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FFE600] uppercase tracking-wider mb-2">
              <span>02. Obras Seleccionadas</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">Universo LEGO</span>
            </div>
            <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              PROYECTOS & EXPLORACIONES CONCEPTUALES
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md font-light leading-relaxed">
            Una selección de prototipos 3D, sets modulares para coleccionistas, ingeniería Technic y diseño de packaging de vanguardia.
          </p>
        </div>

        {/* Interactive Filter Segmented Control */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#0d111a] border border-white/10 rounded-xl mb-12 overflow-x-auto">
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundEffects.playHoverClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-[#FFE600] text-black font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Bento Grid Projects Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const isFeatured = idx === 0 || idx === 1;
            return (
              <div
                key={project.id}
                onClick={() => handleCardClick(project)}
                className={`group relative rounded-2xl bg-[#0c1017] border border-white/10 hover:border-[#FFE600]/40 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.6)] flex flex-col ${
                  isFeatured && selectedCategory === 'all' ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Media Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1017] via-transparent to-transparent opacity-90" />

                  {/* Corner Piece Counter / Scale Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    {project.pieces && project.pieces > 0 && (
                      <span className="px-2.5 py-1 rounded-md bg-black/75 border border-white/15 text-[11px] font-mono text-[#FFE600] backdrop-blur-md flex items-center gap-1">
                        <Box className="w-3 h-3" />
                        <span>{project.pieces.toLocaleString()} pcs</span>
                      </span>
                    )}
                  </div>

                  {/* Category Pill Over Media */}
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-black/75 border border-white/15 text-[11px] font-mono text-slate-300 backdrop-blur-md">
                    {project.categoryLabel}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    {/* Unboxed Metadata Line */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-2">
                      <span className="text-[#FFE600]">{project.year}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.scale || 'Escala Conceptual'}</span>
                    </div>

                    <h3 className="font-['Outfit'] font-black text-xl sm:text-2xl text-white group-hover:text-[#FFE600] transition-colors flex items-center justify-between gap-2">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-[#FFE600] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                    </h3>

                    <p className="mt-2 text-slate-400 text-xs sm:text-sm font-light line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-500">
                    <span className="truncate max-w-[220px]">
                      {project.tools.slice(0, 3).join(' · ')}
                    </span>
                    <span className="text-[#FFE600] group-hover:underline shrink-0">
                      Ver Ficha 3D →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
