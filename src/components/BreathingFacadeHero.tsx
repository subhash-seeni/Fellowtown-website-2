import { useState, useRef, useEffect, type FC } from 'react';
import { BreathingFacadeCanvas } from './BreathingFacadeCanvas';
import type { StayTier } from './FellowtownLogo';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';

interface BreathingFacadeHeroProps {
  onOpenAvailability: () => void;
  onTierChange: (tier: StayTier) => void;
  activeTier: StayTier;
}

interface ScrubberPill {
  id: StayTier;
  label: string;
  colorHex: string;
  subline: string;
}

const SCRUBBER_PILLS: ScrubberPill[] = [
  {
    id: 'nightly',
    label: 'NIGHTLY',
    colorHex: '#8C3B1A',
    subline: 'Instant app check-in. Central city locations.',
  },
  {
    id: 'weekly',
    label: 'WEEKLY',
    colorHex: '#DCA358',
    subline: 'Full kitchen, workspace, and housekeeping.',
  },
  {
    id: 'monthly',
    label: 'MONTHLY',
    colorHex: '#6C8793',
    subline: 'Move in with a suitcase. Zero paperwork.',
  },
];

export const BreathingFacadeHero: FC<BreathingFacadeHeroProps> = ({
  onOpenAvailability,
  onTierChange,
  activeTier,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const sublineRef = useRef<HTMLParagraphElement | null>(null);

  // Sync index with activeTier
  useEffect(() => {
    const idx = SCRUBBER_PILLS.findIndex((p) => p.id === activeTier);
    if (idx !== -1 && idx !== currentIndex) {
      setCurrentIndex(idx);
    }
  }, [activeTier]);

  const handleSelectIndex = (index: number) => {
    setCurrentIndex(index);
    const selected = SCRUBBER_PILLS[index];
    onTierChange(selected.id);

    if (sublineRef.current) {
      gsap.fromTo(
        sublineRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }

    window.dispatchEvent(
      new CustomEvent('fellowtown:tier', { detail: { tier: selected.id, state: selected.id } })
    );
  };

  const currentPill = SCRUBBER_PILLS[currentIndex];

  const scrollToNext = () => {
    const elem = document.getElementById('spatial-walkthrough');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="stay" className="relative w-full min-h-[92vh] bg-[#F6F3EC] text-[#1E2426] border-b border-[rgba(30,36,38,0.14)] flex flex-col justify-between overflow-hidden">
      {/* Responsive Grid: Vertical Stack on Mobile (< 1024px) | 55/45 Split on Desktop */}
      <div className="w-full flex-grow grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Column (Desktop 55% / Mobile Top 50%): Minimalist Editorial Hero */}
        <div className="lg:col-span-7 px-6 sm:px-12 lg:px-20 py-10 sm:py-16 lg:py-24 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[rgba(30,36,38,0.14)] bg-[#F6F3EC]">
          {/* Top Eyebrow */}
          <div className="flex items-center gap-3">
            <span
              className="w-2 h-2 rounded-full transition-colors duration-300"
              style={{ backgroundColor: currentPill.colorHex }}
            />
            <span className="font-sans font-bold text-xs tracking-wider uppercase text-[#1E2426]/70">
              AHMEDABAD & GIFT CITY
            </span>
          </div>

          {/* Main Headline & Compressed Dynamic Sub-line */}
          <div className="my-auto py-8 sm:py-12 space-y-6 sm:space-y-8 max-w-xl">
            <h1 className="fluid-hero-headline font-display font-extrabold tracking-tightest text-[#1E2426]">
              A home with hotel service.{' '}
              <span className="font-extrabold" style={{ color: currentPill.colorHex }}>
                For a night or a year.
              </span>
            </h1>

            {/* Scrubber Pills (Full-width on mobile, min-h-[48px] touch targets) */}
            <div className="pt-2 space-y-4">
              <div className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex p-1 bg-[#FAF8F5] border border-[#1E2426] gap-1 shadow-sm">
                {SCRUBBER_PILLS.map((pill, idx) => {
                  const isSelected = currentIndex === idx;
                  return (
                    <button
                      key={pill.id}
                      type="button"
                      onClick={() => handleSelectIndex(idx)}
                      className={`px-3 sm:px-6 py-3 min-h-[48px] flex items-center justify-center mono-label text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#1E2426] text-[#F6F3EC] shadow-xs'
                          : 'text-[#1E2426]/70 hover:text-[#1E2426] hover:bg-[#EFECE4]'
                      }`}
                    >
                      {pill.label}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Subline */}
              <div className="min-h-8 flex items-center">
                <p
                  ref={sublineRef}
                  className="fluid-subline text-[#1E2426]/80 font-normal leading-tight"
                >
                  {currentPill.subline}
                </p>
              </div>
            </div>

            {/* Single Focal Point CTA */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onOpenAvailability}
                className="btn-tactile-flip w-full sm:w-auto px-8 py-4 min-h-[48px] flex items-center justify-center font-sans font-semibold text-xs tracking-wider uppercase cursor-pointer shadow-sun-cast"
              >
                CHECK AVAILABILITY
              </button>

              <button
                type="button"
                onClick={scrollToNext}
                className="hidden sm:flex p-4 border border-[rgba(30,36,38,0.2)] hover:bg-[#FAF8F5] transition-colors text-[#1E2426] cursor-pointer items-center justify-center"
                title="Scroll to Inside a Unit"
                aria-label="Scroll to Inside the Unit"
              >
                <ArrowDown className="w-4 h-4 text-[#8C3B1A]" />
              </button>
            </div>
          </div>

          {/* Subtle Location Caption */}
          <div className="font-sans text-xs text-[#1E2426]/60 pt-4 border-t border-[rgba(30,36,38,0.08)] lg:border-t-0 lg:pt-0">
            Ahmedabad & GIFT City • Fully Serviced Residences
          </div>
        </div>

        {/* Right Column (Desktop 45% / Mobile Bottom 50%): Three.js WebGL Breathing Facade */}
        <div className="lg:col-span-5 relative h-[45svh] sm:h-[50svh] lg:h-auto min-h-[350px] lg:min-h-[500px] bg-[#F6F3EC]">
          <BreathingFacadeCanvas
            scrubberTier={currentPill.id}
            scrubberProgress={currentIndex}
            onFacadeClick={() => handleSelectIndex((currentIndex + 1) % SCRUBBER_PILLS.length)}
          />
        </div>
      </div>
    </section>
  );
};
