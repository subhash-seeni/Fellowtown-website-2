import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { HeaderNav } from './components/HeaderNav';
import { BreathingFacadeHero } from './components/BreathingFacadeHero';
import { SpatialWalkthroughSection } from './components/SpatialWalkthroughSection';
import { PersonaCorporateSection } from './components/PersonaCorporateSection';
import { OwnerPartnershipScene } from './components/OwnerPartnershipScene';
import { DualPortalFooter } from './components/DualPortalFooter';
import { NoiseOverlay } from './components/NoiseOverlay';
import { AvailabilityDrawer } from './components/AvailabilityDrawer';
import { OwnerPartnerDrawer } from './components/OwnerPartnerDrawer';
import { DesignTokensModal } from './components/DesignTokensModal';
import type { StayTier } from './components/FellowtownLogo';

export function App() {
  const [activeTier, setActiveTier] = useState<StayTier>('nightly');
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);
  const [isOwnerDrawerOpen, setIsOwnerDrawerOpen] = useState(false);
  const [isTokensOpen, setIsTokensOpen] = useState(false);

  // Initialize Lenis smooth scroll synced with GSAP ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    const handleTierEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ tier?: StayTier; state?: StayTier }>;
      const tier = customEvent.detail?.tier || customEvent.detail?.state;
      if (tier && ['nightly', 'weekly', 'monthly', 'idle'].includes(tier)) {
        setActiveTier(tier);
      }
    };

    window.addEventListener('fellowtown:tier', handleTierEvent);
    window.addEventListener('fellowtown:state-change', handleTierEvent);

    return () => {
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      window.removeEventListener('fellowtown:tier', handleTierEvent);
      window.removeEventListener('fellowtown:state-change', handleTierEvent);
    };
  }, []);

  const handleSelectTier = (tier: StayTier) => {
    setActiveTier(tier);
    window.dispatchEvent(
      new CustomEvent('fellowtown:tier', { detail: { tier, state: tier } })
    );
  };

  return (
    <div className="min-h-screen bg-[#F6F3EC] text-[#1E2426] relative selection:bg-[#8C3B1A] selection:text-[#F6F3EC]">
      {/* 1. Raw Plaster SVG Noise Grain Overlay (Fixed across viewport, opacity 0.035) */}
      <NoiseOverlay />

      {/* 2. Sticky Architectural Top Bar Navigation with Exposed 1px Hairlines */}
      <HeaderNav
        currentTier={activeTier}
        onOpenAvailability={() => setIsAvailabilityOpen(true)}
        onOpenTokens={() => setIsTokensOpen(true)}
      />

      {/* 3. Main Architectural Canvas (Radical Editorial De-Clutter: 5 Pure Scenes) */}
      <main>
        {/* SCENE 01: WebGL "Breathing Facade" Hero with 3D Orthographic Elevation & 1-Word Scrubber */}
        <BreathingFacadeHero
          activeTier={activeTier}
          onTierChange={handleSelectTier}
          onOpenAvailability={() => setIsAvailabilityOpen(true)}
        />

        {/* SCENE 02: "Inside the Unit" — Horizontal Pinned Cross-Section (75% Viewport Media) */}
        <SpatialWalkthroughSection />

        {/* SCENE 03: "Who Lives Here" — Consolidated 4 Typographic Titles & Image Reveal */}
        <PersonaCorporateSection />

        {/* SCENE 04: "For Building Owners" — Dark Mode Pivot, 3 Mode Toggles & 2 Oversized Numbers */}
        <OwnerPartnershipScene />
      </main>

      {/* SCENE 05: Dual-Portal Architectural Blueprint Footer (2 Clean Interactive Rows) */}
      <DualPortalFooter
        onOpenAvailability={() => setIsAvailabilityOpen(true)}
        onOpenOwnerDrawer={() => setIsOwnerDrawerOpen(true)}
        onOpenTokens={() => setIsTokensOpen(true)}
      />

      {/* Direct Guest & Corporate Reservation Drawer */}
      <AvailabilityDrawer
        isOpen={isAvailabilityOpen}
        onClose={() => setIsAvailabilityOpen(false)}
        onSelectTier={handleSelectTier}
        currentTier={activeTier}
      />

      {/* Owner Partnership Slide-over Drawer (From Row 2 in Footer) */}
      <OwnerPartnerDrawer
        isOpen={isOwnerDrawerOpen}
        onClose={() => setIsOwnerDrawerOpen(false)}
      />

      {/* Design System Tokens & Anti-AI Inspector Modal */}
      <DesignTokensModal
        isOpen={isTokensOpen}
        onClose={() => setIsTokensOpen(false)}
        onTierChange={handleSelectTier}
        activeTier={activeTier}
      />
    </div>
  );
}

export default App;
