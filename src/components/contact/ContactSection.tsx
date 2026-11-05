import React, { useState } from 'react';
import { DESIGNER_PROFILE } from '../../data/portfolioData';
import { soundEffects } from '../../utils/audio';
import { Mail, MapPin, Send, CheckCircle2, MessageSquare, Sparkles, Copy, Check } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'desarrollo-set',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundEffects.playBrickSnap(1.3);
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xrppjvpq', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
          subject: formData.subject || `Propuesta de ${formData.projectType}`,
          message: formData.message,
        }),
      });
      if (!response.ok) throw new Error('No se pudo enviar el formulario');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error enviando el formulario de contacto:', error);
      window.alert('No se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = () => {
    soundEffects.playHoverClick();
    navigator.clipboard.writeText(DESIGNER_PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contacto" className="relative py-28 px-6 bg-[#090c13] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FFE600] uppercase tracking-wider mb-2">
              <span>05. Contacto & Propuestas</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">Inicia una conversación</span>
            </div>
            <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              CONSTRUYAMOS ALGO EXTRAORDINARIO
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md font-light leading-relaxed">
            Disponible para empresas de diseño, estudios de animación, agencias y departamentos de desarrollo de producto interesados en colaboraciones o contratación.
          </p>
        </div>

        {/* 2-Column Split: Direct Contact Card & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Info Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-2xl bg-[#0c1017] border border-white/10 space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Disponible para proyectos 2026</span>
              </div>

              <h3 className="font-['Outfit'] font-bold text-2xl text-white">
                ¿Tienes una idea en mente o buscas un perfil especializado?
              </h3>

              <p className="text-sm text-slate-300 font-light leading-relaxed">
                Ya sea para liderar la dirección visual de un set de coleccionista, modelar prototipos fotorrealistas en 3D o desarrollar conceptos de packaging exclusivo, responderé en menos de 24 horas.
              </p>

              {/* Coordinates List */}
              <div className="space-y-4 pt-4 border-t border-white/10 text-xs font-mono">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#FFE600]" />
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">Correo Directo</div>
                      <div className="text-white text-xs">{DESIGNER_PROFILE.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleCopy}
                    aria-label="Copiar email"
                    className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-lg transition-colors cursor-pointer"
                    title="Copiar email"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <MapPin className="w-4 h-4 text-[#E3000B]" />
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Ubicación & Modalidad</div>
                    <div className="text-white text-xs">Barcelona, España · Trabajo Remoto Global</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Spec Badge */}
            <div className="p-4 rounded-xl bg-[#FFE600]/5 border border-[#FFE600]/15 text-xs text-slate-300">
              <span className="font-bold text-[#FFE600] uppercase font-mono">Respuesta Garantizada:</span> Para propuestas formales de selección, adjunta el dossier o la descripción del rol para una respuesta técnica inmediata.
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 p-8 rounded-2xl bg-[#0c1017] border border-white/10">
            {isSubmitted ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FFE600] flex items-center justify-center text-black shadow-[0_0_30px_rgba(255,230,0,0.4)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-['Outfit'] font-black text-2xl text-white">
                  ¡Mensaje Recibido con Éxito!
                </h3>
                <p className="text-sm text-slate-300 max-w-md font-light leading-relaxed">
                  Gracias por tu propuesta, <strong className="text-white">{formData.name}</strong>. He recibido los detalles de tu consulta sobre <span className="text-[#FFE600]">{formData.subject || 'tu proyecto'}</span> y me pondré en contacto contigo en breve a <strong className="text-white">{formData.email}</strong>.
                </p>
                <button
                  onClick={() => {
                    soundEffects.playHoverClick();
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      projectType: 'desarrollo-set',
                      subject: '',
                      message: '',
                    });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                      Nombre & Empresa *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Helena Gómez · Art Director"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#FFE600] text-sm text-white placeholder-slate-600 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="tu.email@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#FFE600] text-sm text-white placeholder-slate-600 outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Project Type Selector */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Tipo de Colaboración o Asunto
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#111622] border border-white/10 focus:border-[#FFE600] text-sm text-white outline-none transition-colors cursor-pointer"
                  >
                    <option value="desarrollo-set">Diseño & Modelado de Nuevos Sets LEGO</option>
                    <option value="arquitectura-escultura">Construcción Escultórica o Arquitectónica</option>
                    <option value="packaging-campana">Packaging Premium / Campaña Publicitaria 3D</option>
                    <option value="seleccion-laboral">Oportunidad Laboral / Contratación de Equipo</option>
                    <option value="consultoria">Consultoría Técnica de Clutch-Power & CAD</option>
                  </select>
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Asunto Específico
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Propuesta de set conceptual 18+ para Q3"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#FFE600] text-sm text-white placeholder-slate-600 outline-none transition-colors"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Mensaje & Detalles del Proyecto *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Cuéntame sobre los objetivos, plazos estimados, requisitos de piezas o la visión de la marca..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-[#FFE600] text-sm text-white placeholder-slate-600 outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#FFE600] hover:bg-[#ffea33] disabled:opacity-50 text-black font-bold text-sm rounded-xl tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(255,230,0,0.3)] hover:shadow-[0_6px_28px_rgba(255,230,0,0.45)] hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>ENVIANDO PROPUESTA...</span>
                  ) : (
                    <>
                      <span>ENVIAR MENSAJE A JAVIER SAEZ</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
