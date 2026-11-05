import { useState, useRef, type FC } from 'react';
import gsap from 'gsap';

interface PersonaItem {
  id: string;
  title: string;
  duration: string;
  line: string;
  colorHex: string;
  imageSrc: string;
  badges: [string, string];
}

const PERSONAS: PersonaItem[] = [
  {
    id: 'builder',
    title: 'The Visiting Builder',
    duration: '2W–6M',
    line: 'Shipped to a new city for a sprint. Walk to work, one company GST bill.',
    colorHex: '#8C3B1A',
    imageSrc:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    badges: ['Single GST Invoice', 'Work Desk Included'],
  },
  {
    id: 'switcher',
    title: 'The City Switcher',
    duration: '1–3M',
    line: 'Moving to Ahmedabad? Land with a suitcase. Skip the 11-month broker trap.',
    colorHex: '#DCA358',
    imageSrc:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    badges: ['Zero Brokerage', 'Flexible Extension'],
  },
  {
    id: 'care-crew',
    title: 'The Care Crew',
    duration: '1–6W',
    line: 'Ground-floor step-free studios with a real kitchen, minutes from top hospitals.',
    colorHex: '#4E6E58',
    imageSrc:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1200&q=80',
    badges: ['Step-Free Access', 'Dedicated Kitchen'],
  },
  {
    id: 'team-block',
    title: 'The Team Block',
    duration: 'YEAR-ROUND',
    line: '5 apartments reserved for your startup. Rotate anyone, anytime.',
    colorHex: '#6C8793',
    imageSrc:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
    badges: ['Corporate Flat Pass', 'Rotate Anyone'],
  },
];

export const PersonaCorporateSection: FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const card3DRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const currentIdx = hoveredIdx !== null ? hoveredIdx : activeIdx;
  const active = PERSONAS[currentIdx];

  const handleSelect = (idx: number) => {
    setActiveIdx(idx);
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0.3, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' }
      );
    }
  };

  // Interactive 3D tilt physics on photo card following cursor
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!card3DRef.current) return;
    const rect = card3DRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card3DRef.current, {
      rotateY: x * -10, // -5 to +5 deg
      rotateX: y * 10,
      duration: 0.4,
      ease: 'power1.out',
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    if (!card3DRef.current) return;
    gsap.to(card3DRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  return (
    <section
      id="residents"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full bg-[#F6F3EC] text-[#1E2426] border-b border-[rgba(30,36,38,0.14)] py-16 sm:py-24 lg:py-32 px-5 sm:px-10 lg:px-16"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Tag */}
        <div className="font-sans font-bold text-xs uppercase tracking-wider text-[#8C3B1A] mb-8">
          WHO LIVES HERE
        </div>

        {/* ======================================================== */}
        {/* MOBILE & TABLET VIEW (< 1024px): Touch Swipe Tabs & Card */}
        {/* ======================================================== */}
        <div className="lg:hidden space-y-6">
          {/* Horizontally swipeable tabs with touch snapping */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-2 scroll-smooth"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
            }}
          >
            {PERSONAS.map((p, idx) => {
              const isSelected = activeIdx === idx;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  style={{ scrollSnapAlign: 'start' }}
                  className={`flex-shrink-0 px-4 py-3 min-h-[44px] rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1E2426] text-[#F6F3EC] shadow-sm'
                      : 'bg-[#FAF8F5] text-[#1E2426]/70 border border-[rgba(30,36,38,0.15)] hover:border-[#1E2426]'
                  }`}
                >
                  {p.title}
                </button>
              );
            })}
          </div>

          {/* Active Portrait Card with bottom overlaid description & badges */}
          <div className="relative w-full max-w-md mx-auto aspect-[4/5] max-h-[52svh] border-2 border-[#1E2426] shadow-sun-cast-lg overflow-hidden bg-[#FAF8F5]">
            <img
              src={active.imageSrc}
              alt={active.title}
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center top' }}
            />

            {/* Overlaid Badges and Quote at Bottom of Card */}
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[#1E2426]/95 via-[#1E2426]/80 to-transparent pt-12 space-y-3">
              <div className="flex flex-wrap gap-2">
                <span className="font-sans text-[11px] px-3 py-1 rounded-full bg-[#F6F3EC] text-[#1E2426] font-semibold">
                  {active.badges[0]}
                </span>
                <span className="font-sans text-[11px] px-3 py-1 rounded-full bg-[#1E2426] text-[#F6F3EC] font-semibold border border-[rgba(246,243,236,0.3)]">
                  {active.badges[1]}
                </span>
              </div>
              <p className="font-sans text-sm text-[#F6F3EC] font-normal leading-snug">
                "{active.line}"
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP VIEW (>= 1024px): 3D Card Tilt + Typography List */}
        {/* ======================================================== */}
        <div className="hidden lg:grid grid-cols-12 gap-16 items-center">
          {/* Left Side: 4 Punchy Archetypes in Bold Syne */}
          <div className="col-span-7 space-y-6">
            {PERSONAS.map((p, idx) => {
              const isSelected = currentIdx === idx;
              return (
                <div
                  key={p.id}
                  onClick={() => handleSelect(idx)}
                  onMouseEnter={() => {
                    setHoveredIdx(idx);
                    handleSelect(idx);
                  }}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`cursor-pointer group select-none transition-transform duration-200 origin-left ${
                    isSelected ? 'scale-x-[1.03]' : ''
                  }`}
                >
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3
                      className={`font-display font-extrabold text-4xl lg:text-5xl tracking-tightest transition-colors duration-200 ${
                        isSelected
                          ? 'text-[#1E2426]'
                          : 'text-[#1E2426]/30 group-hover:text-[#1E2426]/75'
                      }`}
                    >
                      {p.title}
                    </h3>

                    {/* Duration Pill */}
                    <span
                      className={`mono-label text-xs font-bold px-2 py-0.5 rounded-[2px] transition-colors duration-200 ${
                        isSelected
                          ? 'bg-[#8C3B1A] text-[#F6F3EC]'
                          : 'bg-[#EFECE4] text-[#1E2426]/60 group-hover:bg-[#8C3B1A] group-hover:text-[#F6F3EC]'
                      }`}
                    >
                      {p.duration}
                    </span>
                  </div>

                  {/* Punchy Line on Active */}
                  {isSelected && (
                    <p className="font-sans text-base sm:text-lg text-[#1E2426]/85 mt-2.5 font-normal leading-snug animate-fadeIn">
                      "{p.line}"
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Side: Portrait Container in aspect 4/5 (No heads cropped) with 3D Tilt */}
          <div className="col-span-5 flex justify-center">
            <div
              ref={card3DRef}
              className="relative w-full max-w-md aspect-[4/5] border-2 border-[#1E2426] shadow-sun-cast-lg overflow-hidden bg-[#FAF8F5] transition-shadow duration-300"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                ref={imageRef}
                src={active.imageSrc}
                alt={active.title}
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center top' }}
                loading="eager"
              />

              {/* Clean Rounded Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                <span className="font-sans text-[11px] px-3.5 py-1.5 rounded-full bg-[#F6F3EC] text-[#1E2426] border border-[#1E2426] font-semibold shadow-xs">
                  {active.badges[0]}
                </span>
                <span className="font-sans text-[11px] px-3.5 py-1.5 rounded-full bg-[#1E2426] text-[#F6F3EC] font-semibold shadow-xs">
                  {active.badges[1]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
