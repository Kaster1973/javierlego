import React, { useState, useEffect } from 'react';
import { LegoCanvas, LightingPreset } from './components/3d/LegoCanvas';
import { ControlDock } from './components/3d/ControlDock';
import { Navbar } from './components/nav/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { AboutSection } from './components/about/AboutSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { ShowreelSection } from './components/showreel/ShowreelSection';
import { CurriculumSection } from './components/cv/CurriculumSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/footer/Footer';
import { soundEffects } from './utils/audio';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  const [exploded, setExploded] = useState<boolean>(false);
  const [lightingPreset, setLightingPreset] = useState<LightingPreset>('studio');
  const [zenMode, setZenMode] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('inicio');

  // Handle active section on scroll
  useEffect(() => {
    const sectionIds = ['inicio', 'sobre-mi', 'proyectos', 'showreel', 'curriculum', 'contacto'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSound = () => {
    const newSoundState = soundEffects.toggleSound();
    setSoundEnabled(newSoundState);
  };

  return (
    <div className="relative min-h-screen bg-[#07090e] text-[#f1f5f9] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#FFE600] selection:text-black">
      {/* 3D WebGL Canvas Layer (Persistent Background) */}
      <ErrorBoundary fallback={<div className="fixed inset-0 -z-10 bg-[#07090e]" />}>
        <LegoCanvas
          exploded={exploded}
          lightingPreset={lightingPreset}
          interactiveMode={true}
        />
      </ErrorBoundary>

      {/* Foreground Content (Hidden when Zen 3D Mode is activated) */}
      <div className={`relative transition-opacity duration-500 ${zenMode ? 'opacity-0 pointer-events-none' : 'opacity-100 z-10'}`}>
        <Navbar
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />

        <main>
          <HeroSection
            onExploreClick={() => handleNavigate('proyectos')}
            onShowreelClick={() => handleNavigate('showreel')}
            exploded={exploded}
            onToggleExploded={() => setExploded(!exploded)}
          />

          <AboutSection />

          <ProjectsSection />

          <ShowreelSection soundEnabled={soundEnabled} onToggleSound={handleToggleSound} />

          <CurriculumSection />

          <ContactSection />
        </main>

        <Footer />
      </div>

      {/* Ergonomic Bottom 3D Control Dock (Collapsible, Zero Viewport Occlusion) */}
      <ControlDock
        exploded={exploded}
        onToggleExploded={() => setExploded(!exploded)}
        lightingPreset={lightingPreset}
        onChangeLighting={setLightingPreset}
        zenMode={zenMode}
        onToggleZenMode={() => setZenMode(!zenMode)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        isDockCollapsed={isDockCollapsed}
        onToggleDockCollapse={() => setIsDockCollapsed(!isDockCollapsed)}
      />
    </div>
  );
}
