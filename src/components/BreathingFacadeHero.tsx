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
    <section id="stay" className="relative w-full min-h-[90vh] lg:h-[calc(100vh-65px)] lg:max-h-[850px] bg-[#F6F3EC] text-[#1E2426] border-b border-[rgba(30,36,38,0.14)] flex flex-col justify-between overflow-hidden">
      {/* Responsive Grid: Vertical Stack on Mobile (< 1024px) | 55/45 Split on Desktop */}
      <div className="w-full h-full flex-grow grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Column (Desktop 55% / Mobile Top 50%): Minimalist Editorial Hero */}
        <div className="lg:col-span-7 px-6 sm:px-10 lg:px-14 xl:px-16 py-6 sm:py-8 lg:py-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[rgba(30,36,38,0.14)] bg-[#F6F3EC]">
          {/* Top Eyebrow */}
          <div className="flex items-center gap-2.5">
            <span
              className="w-2 h-2 rounded-full transition-colors duration-300"
              style={{ backgroundColor: currentPill.colorHex }}
            />
            <span className="font-sans font-bold text-xs tracking-wider uppercase text-[#1E2426]/70">
              AHMEDABAD & GIFT CITY
            </span>
          </div>

          {/* Main Headline & Compressed Dynamic Sub-line (Perfect viewport fit) */}
          <div className="my-auto py-3 sm:py-4 space-y-4 sm:space-y-5 max-w-xl">
            <h1 className="fluid-hero-headline font-display font-extrabold tracking-tightest text-[#1E2426]">
              A home with hotel service.{' '}
              <span className="font-extrabold inline-block" style={{ color: currentPill.colorHex }}>
                For a night or a year.
              </span>
            </h1>

            {/* Scrubber Pills */}
            <div className="pt-1 space-y-3">
              <div className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex p-1 bg-[#FAF8F5] border border-[#1E2426] gap-1 shadow-xs">
                {SCRUBBER_PILLS.map((pill, idx) => {
                  const isSelected = currentIndex === idx;
                  return (
                    <button
                      key={pill.id}
                      type="button"
                      onClick={() => handleSelectIndex(idx)}
                      className={`px-3 sm:px-5 py-2.5 min-h-[42px] flex items-center justify-center mono-label text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
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
              <div className="h-6 sm:h-7 flex items-center">
                <p
                  ref={sublineRef}
                  className="font-sans text-sm sm:text-base text-[#1E2426]/80 font-normal leading-tight"
                >
                  {currentPill.subline}
                </p>
              </div>
            </div>

            {/* Single Focal Point CTA */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={onOpenAvailability}
                className="btn-tactile-flip w-full sm:w-auto px-7 sm:px-8 py-3.5 min-h-[44px] flex items-center justify-center font-sans font-semibold text-xs tracking-wider uppercase cursor-pointer shadow-sun-cast"
              >
                CHECK AVAILABILITY
              </button>

              <button
                type="button"
                onClick={scrollToNext}
                className="hidden sm:flex p-3.5 border border-[rgba(30,36,38,0.2)] hover:bg-[#FAF8F5] transition-colors text-[#1E2426] cursor-pointer items-center justify-center"
                title="Scroll to Inside a Unit"
                aria-label="Scroll to Inside the Unit"
              >
                <ArrowDown className="w-4 h-4 text-[#8C3B1A]" />
              </button>
            </div>
          </div>

          {/* Subtle Location Caption */}
          <div className="font-sans text-xs text-[#1E2426]/60 pt-2 border-t border-[rgba(30,36,38,0.08)] lg:border-t-0 lg:pt-0">
            Ahmedabad & GIFT City • Fully Serviced Residences
          </div>
        </div>

        {/* Right Column (Desktop 45% / Mobile Bottom 50%): Three.js WebGL Breathing Facade */}
        <div className="lg:col-span-5 relative h-[45svh] sm:h-[50svh] lg:h-full min-h-[350px] bg-[#F6F3EC]">
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
