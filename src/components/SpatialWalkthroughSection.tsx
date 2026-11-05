import { useState, useEffect, useRef, type FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SmartLockMicroAnimation } from './SmartLockMicroAnimation';

interface SlideData {
  id: number;
  time: string;
  title: string;
  subline: string;
  pill: string;
  imageSrc: string;
}

const SLIDES: SlideData[] = [
  {
    id: 0,
    time: '8:00 AM',
    title: 'Fully Equipped Kitchen',
    subline: 'Induction setup, pure veg cookware, and full pantry essentials.',
    pill: 'Kitchen Inclusions',
    imageSrc:
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 1,
    time: '11:30 AM',
    title: 'Quiet Work Desk',
    subline: 'Ergonomic oak workstation with high-speed fiber internet.',
    pill: 'High-Speed Wi-Fi',
    imageSrc:
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 2,
    time: '4:00 PM',
    title: 'Effortless Entry',
    subline: 'Smart-lock entry, laundry, and scheduled housekeeping.',
    pill: 'Keyless Access',
    imageSrc: '', // Rendered as massive unboxed SmartLockMicroAnimation
  },
  {
    id: 3,
    time: '9:30 PM',
    title: 'Hotel Quality Linens',
    subline: 'Premium mattress, blackout shades, and 24/7 on-call hospitality.',
    pill: 'Restful Sleep',
    imageSrc:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80',
  },
];

export const SpatialWalkthroughSection: FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [mobileNfcActive, setMobileNfcActive] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinTargetRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const mobileNfcCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    // Desktop: Pinned 600vh Horizontal Scroll Walkthrough
    mm.add('(min-width: 1025px)', () => {
      const container = containerRef.current;
      const pinTarget = pinTargetRef.current;
      if (!container || !pinTarget) return;

      const trigger = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinTarget,
        pinSpacing: false,
        scrub: 0.6,
        snap: {
          snapTo: 1 / 3,
          duration: { min: 0.25, max: 0.6 },
          delay: 0.1,
          ease: 'power1.inOut',
        },
        onUpdate: (self) => {
          const p = self.progress;
          let s = 0;
          if (p < 0.25) s = 0;
          else if (p < 0.5) s = 1;
          else if (p < 0.75) s = 2;
          else s = 3;

          setActiveStage(s);
        },
      });

      return () => {
        trigger.kill();
      };
    });

    // Mobile & Tablet: Auto-Trigger NFC when 50% enters viewport
    mm.add('(max-width: 1024px)', () => {
      if (mobileNfcCardRef.current) {
        const trigger = ScrollTrigger.create({
          trigger: mobileNfcCardRef.current,
          start: 'top 60%',
          onEnter: () => setMobileNfcActive(true),
          onLeaveBack: () => setMobileNfcActive(false),
        });

        return () => {
          trigger.kill();
        };
      }
    });

    return () => {
      mm.revert();
    };
  }, []);

  const current = SLIDES[activeStage];

  // Animate text on slide change in desktop view
  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -14 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [activeStage]);

  const handleManualStage = (idx: number) => {
    setActiveStage(idx);
    if (containerRef.current) {
      const top = containerRef.current.offsetTop;
      const h = containerRef.current.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + (idx / 3) * h, behavior: 'smooth' });
    }
  };

  return (
    <section id="units" className="relative w-full bg-[#F6F3EC] border-b border-[rgba(30,36,38,0.14)]">
      <span id="spatial-walkthrough" className="absolute top-0" />

      {/* ======================================================== */}
      {/* DESKTOP VIEW (>= 1025px): Pinned 600vh Scroll Sequence   */}
      {/* ======================================================== */}
      <div ref={containerRef} className="hidden lg:block relative w-full h-[600vh]">
        <div
          ref={pinTargetRef}
          className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between bg-[#F6F3EC] px-8 sm:px-14 py-8 z-20"
        >
          {/* Top Stage Ticker */}
          <div className="w-full flex items-center justify-between pb-4 border-b border-[rgba(30,36,38,0.14)] text-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#8C3B1A]"></span>
              <span className="font-sans font-bold text-xs uppercase tracking-wider text-[#1E2426]">Inside a Unit</span>
              <span className="text-[rgba(30,36,38,0.3)]">|</span>
              <span className="font-sans font-semibold text-xs text-[#8C3B1A]">{current.time}</span>
            </div>

            <div className="flex items-center gap-2">
              {SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => handleManualStage(idx)}
                  className={`px-3 py-1 text-xs font-sans font-bold transition-all cursor-pointer ${
                    activeStage === idx
                      ? 'bg-[#1E2426] text-[#F6F3EC]'
                      : 'text-[#1E2426]/50 hover:text-[#1E2426] hover:bg-[#EFECE4]'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Main Grid: Left 30% Dedicated Title Column | Right 70% Edge-to-Edge Media */}
          <div className="w-full flex-grow grid grid-cols-12 gap-12 items-center py-6">
            <div className="col-span-4 space-y-6 flex flex-col justify-center">
              <div className="space-y-2">
                <span className="font-sans font-bold text-xs uppercase tracking-wider text-[#8C3B1A]">
                  {current.time} — Daily Rhythm
                </span>

                <h2
                  ref={titleRef}
                  className="fluid-section-heading font-display font-extrabold text-[#1E2426] tracking-tightest leading-[1.02]"
                >
                  {current.title}
                </h2>
              </div>

              <p className="fluid-subline text-[#1E2426]/80 font-normal leading-relaxed">
                "{current.subline}"
              </p>

              <div className="pt-2">
                <span className="font-sans text-xs px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#1E2426] font-semibold text-[#1E2426] shadow-xs">
                  {current.pill}
                </span>
              </div>
            </div>

            <div className="col-span-8 h-full flex items-center justify-center">
              {current.id === 2 ? (
                <div className="w-full h-full flex items-center justify-center">
                  <SmartLockMicroAnimation isActive={activeStage === 2} />
                </div>
              ) : (
                <div className="relative w-full h-[65vh] border-2 border-[#1E2426] shadow-sun-cast-lg overflow-hidden bg-[#FAF8F5]">
                  <img
                    src={current.imageSrc}
                    alt={current.title}
                    className="w-full h-full object-cover transition-opacity duration-500"
                    loading="eager"
                  />
                  <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-[#1E2426] text-[#F6F3EC] mono-label text-[10px] font-bold">
                    {current.time}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Pacing Progress Indicator */}
          <div className="w-full pt-4 border-t border-[rgba(30,36,38,0.14)] flex items-center justify-between text-xs">
            <span className="font-sans text-[#1E2426]/60">
              Scroll to explore 24 hours at Fellowtown
            </span>
            <span className="font-sans font-semibold text-xs text-[#1E2426]">
              Step {activeStage + 1} of 4
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MOBILE & TABLET VIEW (< 1025px): Vertical Sticky Stack   */}
      {/* ======================================================== */}
      <div className="lg:hidden px-5 sm:px-10 py-16 space-y-10">
        {/* Section Header */}
        <div className="space-y-2 border-b border-[rgba(30,36,38,0.14)] pb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8C3B1A]"></span>
            <span className="font-sans font-bold text-xs uppercase tracking-wider text-[#8C3B1A]">
              Inside a Unit
            </span>
          </div>
          <h2 className="fluid-section-heading font-display font-extrabold tracking-tightest text-[#1E2426]">
            24 Hours in the Studio.
          </h2>
          <p className="fluid-subline text-[#1E2426]/75">
            Architectural comfort from morning espresso to late night rest.
          </p>
        </div>

        {/* Vertical Sticky Stack Cards */}
        <div className="space-y-8 relative">
          {SLIDES.map((slide, idx) => {
            const isSmartLock = slide.id === 2;
            const topOffset = 76 + idx * 10; // Incremental sticky offset for tactile card stack

            return (
              <div
                key={slide.id}
                ref={isSmartLock ? mobileNfcCardRef : null}
                style={{ top: `${topOffset}px` }}
                className="sticky bg-[#FAF8F5] border-2 border-[#1E2426] shadow-sun-cast-lg rounded-xs overflow-hidden transition-all duration-300"
              >
                {/* Card Header */}
                <div className="p-5 sm:p-6 border-b border-[rgba(30,36,38,0.14)] flex items-center justify-between bg-[#EFECE4]/50">
                  <div className="space-y-1">
                    <span className="font-sans font-bold text-xs uppercase tracking-wider text-[#8C3B1A]">
                      {slide.time}
                    </span>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1E2426] tracking-tightest">
                      {slide.title}
                    </h3>
                  </div>
                  <span className="font-sans text-xs px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#1E2426] font-semibold text-[#1E2426]">
                    {slide.pill}
                  </span>
                </div>

                {/* Card Media Stage */}
                {isSmartLock ? (
                  <div className="p-4 sm:p-6 bg-[#F6F3EC]">
                    <SmartLockMicroAnimation isActive={mobileNfcActive} />
                    <p className="font-sans text-sm text-[#1E2426]/80 text-center mt-2 px-2">
                      "{slide.subline}"
                    </p>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="aspect-[4/3] sm:aspect-[16/9] w-full overflow-hidden bg-[#EFECE4]">
                      <img
                        src={slide.imageSrc}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5 sm:p-6 bg-[#FAF8F5] border-t border-[rgba(30,36,38,0.1)]">
                      <p className="font-sans text-sm sm:text-base text-[#1E2426]/85 leading-relaxed">
                        "{slide.subline}"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
