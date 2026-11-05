import React from 'react';
import { DESIGNER_PROFILE } from '../../data/portfolioData';
import { Compass, Box, Cpu, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: <Compass className="w-5 h-5 text-[#FFE600]" />,
      title: 'Ingeniería de Clutch-Power',
      desc: 'Cálculo de tolerancias micrométricas (0.002 mm) para asegurar solidez estructural sin someter los polímeros ABS a tensiones excesivas.'
    },
    {
      icon: <Box className="w-5 h-5 text-[#E3000B]" />,
      title: 'Técnicas 100% Legales',
      desc: 'Fidelidad absoluta a la geometría del sistema LEGO. Cero pegamentos, cero cortes artificiales: pura arquitectura modular interconectada.'
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#0055BF]" />,
      title: 'Pipeline CAD & CGI Avanzado',
      desc: 'Modelado directo en Studio 2.0 y Rhino 3D, exportación a mallas limpias para Unreal Engine y sombreado con micro-imperfecciones PBR fotorrealistas.'
    },
    {
      icon: <Award className="w-5 h-5 text-[#FFE600]" />,
      title: 'Experiencia Collector 18+',
      desc: 'Diseño integral de la pieza: desde la cinemática de las sub-unidades mecánicas hasta el unboxing en caja rígida y manuales de coleccionista.'
    }
  ];

  return (
    <section id="sobre-mi" className="relative py-28 px-6 bg-[#07090e]/95 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FFE600] uppercase tracking-wider mb-2">
              <span>01. Trayectoria & Filosofía</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">Sobre Javier Saez</span>
            </div>
            <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              DE LA FÍSICA DEL PLÁSTICO A LA NARRATIVA 3D
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md font-light leading-relaxed">
            Combinando el rigor del diseño industrial con la dirección de arte digital para crear piezas que desafían lo que creemos posible con un bloque de construcción.
          </p>
        </div>

        {/* 2-Column Split: Portrait & Biography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-20">
          {/* Left Column: Portrait & Studio Card */}
          <div className="lg:col-span-5 relative group">
            <div className="relative h-full min-h-[460px] rounded-2xl overflow-hidden border border-white/15 bg-[#0d111a] shadow-2xl">
              <img
                src="/src/assets/images/lego_minifigure_designer_studio_1793784779194.jpg"
                alt="Javier Saez como personaje LEGO en su estudio creativo de diseño 3D con ordenador y piezas"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/30 to-transparent" />
              
              {/* Floating Badge in Portrait */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0a0d14]/90 border border-white/10 backdrop-blur-md">
                <div className="text-xs font-mono text-[#FFE600] uppercase">Javier Saez · Barcelona / Remoto</div>
                <div className="text-sm font-semibold text-white mt-0.5">Senior Creative LEGO Designer</div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                  <span>8+ Años Prototipando</span>
                  <span>·</span>
                  <span>Especialista en Líneas 18+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Prose & Pillars */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-6">
              <blockquote className="border-l-2 border-[#FFE600] pl-6 text-xl sm:text-2xl text-slate-200 font-['Outfit'] font-medium leading-snug italic">
                "{DESIGNER_PROFILE.manifesto}"
              </blockquote>

              <p className="text-slate-300 text-base leading-relaxed font-light">
                {DESIGNER_PROFILE.bio}
              </p>

              <p className="text-slate-400 text-sm leading-relaxed font-light">
                A lo largo de mi carrera en colaboración con creadores de sets, agencias creativas y entusiastas del modelismo avanzado, he investigado la frontera donde el juguete tradicional se convierte en una obra escultórica de coleccionista. Mi metodología fusiona el prototipado físico táctil con herramientas CAD paramétricas y suites de renderizado 3D de estándar cinematográfico.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-colors">
                  <div className="flex items-center gap-2.5 mb-2">
                    {pillar.icon}
                    <h3 className="text-sm font-semibold text-white">{pillar.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full-width Stats Strip (Claim-to-proof adjacency) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-[#0c1017] border border-white/10">
          {DESIGNER_PROFILE.stats.map((stat, idx) => (
            <div key={idx} className="text-center sm:text-left">
              <div className="font-['Outfit'] font-black text-3xl sm:text-4xl text-[#FFE600] tracking-tight tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
