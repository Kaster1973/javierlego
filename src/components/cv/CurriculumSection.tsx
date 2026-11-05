import React, { useState } from 'react';
import { CV_EXPERIENCE, CV_EDUCATION, CV_SKILL_CATEGORIES, DESIGNER_PROFILE } from '../../data/portfolioData';
import { soundEffects } from '../../utils/audio';
import { Briefcase, GraduationCap, Wrench, Download, Printer, Check, Copy, AlertCircle, Award } from 'lucide-react';

export const CurriculumSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    soundEffects.playHoverClick();
    navigator.clipboard.writeText(DESIGNER_PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handlePrint = () => {
    soundEffects.playHoverClick();
    window.print();
  };

  return (
    <section id="curriculum" className="relative py-28 px-6 bg-[#07090e] border-t border-white/10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FFE600] uppercase tracking-wider mb-2">
              <span>04. Perfil Profesional</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">Curriculum Vitae</span>
            </div>
            <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              TRAYECTORIA & COMPETENCIAS TÉCNICAS
            </h2>
          </div>

          {/* Action Buttons: Print & Copy Email */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 text-xs font-semibold tracking-wider transition-colors cursor-pointer"
              title="Imprimir o guardar como PDF"
            >
              <Printer className="w-4 h-4 text-[#FFE600]" />
              <span>IMPRIMIR / PDF</span>
            </button>
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFE600] hover:bg-[#ffea33] text-black text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
            >
              {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedEmail ? 'EMAIL COPIADO' : 'COPIAR EMAIL'}</span>
            </button>
          </div>
        </div>

        {/* Demo Editable Indicator Notice (As explicitly requested by user) */}
        <div className="mb-12 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-xs text-amber-300">
          <AlertCircle className="w-4 h-4 text-[#FFE600] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold text-white uppercase tracking-wider">Aviso de Demostración Editable:</span> Toda la información profesional de esta sección es una propuesta conceptual ficticia para ilustrar las capacidades técnicas y estéticas del portfolio de Javier Saez. Todos los campos, roles y experiencias son 100% editables para ajustarse a los requisitos reales de selección.
          </div>
        </div>

        {/* CV Card Container (Print-friendly) */}
        <div className="rounded-2xl bg-[#0c1017] border border-white/10 p-6 sm:p-10 shadow-2xl space-y-12">
          {/* Header CV Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <h3 className="font-['Outfit'] font-black text-2xl sm:text-3xl text-white">
                JAVIER SAEZ
              </h3>
              <p className="text-sm font-semibold text-[#FFE600] mt-1 font-mono">
                {DESIGNER_PROFILE.title}
              </p>
              <p className="text-xs text-slate-400 mt-2 max-w-xl font-light">
                {DESIGNER_PROFILE.bio}
              </p>
            </div>
            <div className="text-xs font-mono text-slate-400 space-y-1 shrink-0 bg-white/[0.02] p-4 rounded-xl border border-white/5">
              <div><strong className="text-white">Ubicación:</strong> Barcelona, España</div>
              <div><strong className="text-white">Email:</strong> {DESIGNER_PROFILE.email}</div>
              <div><strong className="text-white">Idiomas:</strong> Español (Nativo), Inglés (C2 Fluido)</div>
              <div><strong className="text-white">Especialidad:</strong> Sets 18+, Technic & 3D Render</div>
            </div>
          </div>

          {/* Experience Section */}
          <div>
            <div className="flex items-center gap-2.5 text-sm font-bold text-white uppercase tracking-wider mb-6">
              <Briefcase className="w-4 h-4 text-[#FFE600]" />
              <span>Experiencia Profesional</span>
            </div>

            <div className="space-y-8">
              {CV_EXPERIENCE.map((exp, idx) => (
                <div key={idx} className="relative pl-6 sm:pl-8 border-l border-white/15">
                  <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#FFE600] shadow-[0_0_8px_#FFE600]" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                    <h4 className="text-base font-bold text-white font-['Outfit']">
                      {exp.role}
                    </h4>
                    <span className="text-xs font-mono text-[#FFE600]">{exp.period}</span>
                  </div>

                  <div className="text-xs font-mono text-slate-400 mb-3">
                    {exp.company} <span className="text-slate-600">·</span> {exp.location}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-3">
                    {exp.description}
                  </p>

                  <ul className="space-y-1.5 text-xs text-slate-400">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2">
                        <span className="text-[#FFE600] leading-none mt-1">▸</span>
                        <span className="leading-relaxed">{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="pt-6 border-t border-white/10">
            <div className="flex items-center gap-2.5 text-sm font-bold text-white uppercase tracking-wider mb-6">
              <GraduationCap className="w-4 h-4 text-[#0055BF]" />
              <span>Formación Académica & Grados</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CV_EDUCATION.map((edu, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-xs font-mono text-[#FFE600]">{edu.period}</span>
                  <h4 className="text-sm font-bold text-white mt-1 font-['Outfit']">
                    {edu.degree}
                  </h4>
                  <div className="text-xs font-mono text-slate-400 mt-1 mb-2">
                    {edu.institution}
                  </div>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills & Specialized LEGO Knowledge */}
          <div className="pt-6 border-t border-white/10">
            <div className="flex items-center gap-2.5 text-sm font-bold text-white uppercase tracking-wider mb-6">
              <Wrench className="w-4 h-4 text-[#E3000B]" />
              <span>Competencias & Herramientas de Diseño</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {CV_SKILL_CATEGORIES.map((cat, cIdx) => (
                <div key={cIdx} className="space-y-4">
                  <h4 className="text-xs font-mono text-slate-300 uppercase tracking-wider border-b border-white/10 pb-2">
                    {cat.name}
                  </h4>
                  <div className="space-y-3">
                    {cat.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-slate-200">{skill.name}</span>
                          <span className="font-mono text-slate-400 tabular-nums">{skill.level}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#FFE600] to-[#E3000B] rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">{skill.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Honors & Awards */}
          <div className="pt-6 border-t border-white/10">
            <div className="flex items-center gap-2.5 text-sm font-bold text-white uppercase tracking-wider mb-4">
              <Award className="w-4 h-4 text-[#FFE600]" />
              <span>Premios & Reconocimientos Internacionales</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs font-mono text-[#FFE600]">2024</div>
                <div className="text-xs font-bold text-white mt-1">LEGO Ideas 10K Reviewer</div>
                <div className="text-[11px] text-slate-400 mt-1">Proyecto seleccionado con 10.000 votos de la comunidad global.</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs font-mono text-[#FFE600]">2023</div>
                <div className="text-xs font-bold text-white mt-1">A' Design Award Platinum</div>
                <div className="text-[11px] text-slate-400 mt-1">Categoría Toy & Play Design por sistema modular kinético.</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs font-mono text-[#FFE600]">2021</div>
                <div className="text-xs font-bold text-white mt-1">Global Toy Design Excellence</div>
                <div className="text-[11px] text-slate-400 mt-1">Premio al mejor concepto de packaging sostenible.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
