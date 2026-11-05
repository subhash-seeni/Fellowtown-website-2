import { useRef, useEffect, type FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LivingBuildingSimulator } from './LivingBuildingSimulator';

export const OwnerPartnershipScene: FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // GSAP ScrollTrigger Theme Pivot: Smoothly transitions page to charcoal #1E2426
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 55%',
      end: 'bottom 40%',
      onEnter: () => {
        gsap.to('body', {
          backgroundColor: '#1E2426',
          color: '#F6F3EC',
          duration: 0.7,
          ease: 'power2.out',
        });
      },
      onLeaveBack: () => {
        gsap.to('body', {
          backgroundColor: '#F6F3EC',
          color: '#1E2426',
          duration: 0.7,
          ease: 'power2.out',
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      id="owners"
      ref={sectionRef}
      className="w-full bg-[#1E2426] text-[#F6F3EC] border-b border-[rgba(246,243,236,0.15)] relative overflow-hidden transition-colors duration-700 py-16 sm:py-24 lg:py-32 px-5 sm:px-10 lg:px-16"
    >
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        {/* Simple Headline */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[rgba(246,243,236,0.15)] pb-6 gap-2">
          <h2 className="fluid-section-heading font-display font-extrabold text-[#F6F3EC] tracking-tightest">
            For Building Owners.
          </h2>
          <span className="font-sans font-semibold text-xs tracking-wider uppercase text-[#DCA358]">
            Asset Yield Simulator
          </span>
        </div>

        {/* The Interactive Simulator (Toy with 3 Mode Toggles + 25-Unit Grid + 2 Oversized Numbers) */}
        <LivingBuildingSimulator />
      </div>
    </section>
  );
};
