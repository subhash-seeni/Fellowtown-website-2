import { useEffect, useRef, type FC } from 'react';
import type { StayTier } from './FellowtownLogo';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface StayTiersSectionProps {
  activeTier: StayTier;
  onSelectTier: (tier: StayTier) => void;
  onOpenAvailability: () => void;
}

export const StayTiersSection: FC<StayTiersSectionProps> = ({
  activeTier,
  onSelectTier,
  onOpenAvailability,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const nightlyCardRef = useRef<HTMLDivElement | null>(null);
  const weeklyCardRef = useRef<HTMLDivElement | null>(null);
  const monthlyCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Bind scroll progress of each card to change global tier & logo state
    const cards = [
      { ref: nightlyCardRef, tier: 'nightly' as StayTier },
      { ref: weeklyCardRef, tier: 'weekly' as StayTier },
      { ref: monthlyCardRef, tier: 'monthly' as StayTier },
    ];

    const triggers: ScrollTrigger[] = [];

    cards.forEach(({ ref, tier }) => {
      if (ref.current) {
        const trigger = ScrollTrigger.create({
          trigger: ref.current,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => {
            onSelectTier(tier);
            window.dispatchEvent(
              new CustomEvent('fellowtown:tier', { detail: { tier, state: tier } })
            );
          },
          onEnterBack: () => {
            onSelectTier(tier);
            window.dispatchEvent(
              new CustomEvent('fellowtown:tier', { detail: { tier, state: tier } })
            );
          },
        });
        triggers.push(trigger);
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [onSelectTier]);

  return (
    <section
      id="stay"
      ref={sectionRef}
      className="w-full border-b border-[rgba(30,36,38,0.14)] py-20 bg-[#F6F3EC]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header with Exposed Hairline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[rgba(30,36,38,0.14)]">
          <div className="space-y-2">
            <div className="mono-label text-xs text-[#8C3B1A]">
              01 // THE STAY ARCHITECTURE
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1E2426]">
              A night, a week, or a year.
            </h2>
            <p className="font-sans text-base text-[#1E2426]/70 max-w-xl">
              Hospitality calibrated to the duration of human presence. Three curated tiers with
              distinct architectural accents and tailored service layers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="mono-label text-xs text-[#1E2426]/60">ACTIVE ELEVATION:</span>
            <span
              className={`mono-label px-2.5 py-1 text-xs font-semibold rounded-[2px] transition-colors ${
                activeTier === 'nightly'
                  ? 'bg-[#8C3B1A] text-[#F6F3EC]'
                  : activeTier === 'weekly'
                  ? 'bg-[#DCA358] text-[#1E2426]'
                  : 'bg-[#6C8793] text-[#F6F3EC]'
              }`}
            >
              {activeTier.toUpperCase()}
            </span>
          </div>
        </div>

        {/* 3 Tier Modular Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-12 items-stretch">
          {/* TIER 1: NIGHTLY (1–6 Nights) -> #8C3B1A Terracotta */}
          <div
            ref={nightlyCardRef}
            className={`border transition-all duration-300 flex flex-col justify-between p-8 bg-[#FAF8F5] relative shadow-sun-cast ${
              activeTier === 'nightly'
                ? 'border-[#8C3B1A] ring-2 ring-[#8C3B1A]/40'
                : 'border-[rgba(30,36,38,0.14)]'
            }`}
          >
            {/* Top Indicator */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[rgba(30,36,38,0.1)]">
                <span className="mono-label text-xs text-[#8C3B1A] font-bold">
                  TIER 01 · NIGHTLY
                </span>
                <span className="mono-label text-xs text-[#1E2426]/60">1 – 6 NIGHTS</span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#8C3B1A]" />
                  <span className="mono-label text-[11px] text-[#8C3B1A] font-semibold tracking-wider">
                    TERRACOTTA ACCENT
                  </span>
                </div>
                <h3 className="font-serif text-3xl text-[#1E2426] mt-2">
                  The Transient Pilgrim
                </h3>
                <p className="font-sans text-sm text-[#1E2426]/75 mt-2 leading-relaxed">
                  For architectural visitors, cultural weekenders, and brief urban stopovers who
                  demand full hotel service with apartment spaciousness.
                </p>
              </div>

              {/* Service Matrix */}
              <div className="space-y-3 pt-4 border-t border-[rgba(30,36,38,0.1)]">
                <div className="mono-label text-[10px] text-[#1E2426]/60">SERVICE LEVEL</div>
                <ul className="space-y-2 text-xs text-[#1E2426]/85">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8C3B1A] flex-shrink-0 mt-0.5" />
                    <span>Daily housekeeping & turndown service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8C3B1A] flex-shrink-0 mt-0.5" />
                    <span>Aesop botanic amenities & Belgian linen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8C3B1A] flex-shrink-0 mt-0.5" />
                    <span>Fresh roasted local espresso & breakfast basket</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8C3B1A] flex-shrink-0 mt-0.5" />
                    <span>24/7 lobby concierge & luggage stowage</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Rate & Action */}
            <div className="pt-8 mt-6 border-t border-[rgba(30,36,38,0.1)]">
              <div className="flex items-baseline justify-between mb-4">
                <span className="mono-label text-xs text-[#1E2426]/60">NIGHTLY RATE</span>
                <span className="font-serif text-2xl font-normal text-[#1E2426]">
                  ₹8,500 <span className="text-sm font-sans text-[#1E2426]/60">/ night</span>
                </span>
              </div>
              <button
                onClick={() => {
                  onSelectTier('nightly');
                  onOpenAvailability();
                }}
                className="w-full py-3.5 bg-[#8C3B1A] text-[#F6F3EC] hover:bg-[#1E2426] transition-colors font-sans font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>BOOK NIGHTLY STAY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* TIER 2: WEEKLY (1–4 Weeks) -> #DCA358 Ochre */}
          <div
            ref={weeklyCardRef}
            className={`border transition-all duration-300 flex flex-col justify-between p-8 bg-[#FAF8F5] relative shadow-sun-cast ${
              activeTier === 'weekly'
                ? 'border-[#DCA358] ring-2 ring-[#DCA358]/40'
                : 'border-[rgba(30,36,38,0.14)]'
            }`}
          >
            {/* Top Indicator */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[rgba(30,36,38,0.1)]">
                <span className="mono-label text-xs text-[#DCA358] font-bold">
                  TIER 02 · WEEKLY
                </span>
                <span className="mono-label text-xs text-[#1E2426]/60">1 – 4 WEEKS</span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#DCA358]" />
                  <span className="mono-label text-[11px] text-[#DCA358] font-semibold tracking-wider">
                    OCHRE ACCENT
                  </span>
                </div>
                <h3 className="font-serif text-3xl text-[#1E2426] mt-2">
                  The Project Residency
                </h3>
                <p className="font-sans text-sm text-[#1E2426]/75 mt-2 leading-relaxed">
                  For visiting researchers, design teams, writers, and temporary executives who need
                  deep quiet, productive ergonomic work desks, and pantry provisions.
                </p>
              </div>

              {/* Service Matrix */}
              <div className="space-y-3 pt-4 border-t border-[rgba(30,36,38,0.1)]">
                <div className="mono-label text-[10px] text-[#1E2426]/60">SERVICE LEVEL</div>
                <ul className="space-y-2 text-xs text-[#1E2426]/85">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#DCA358] flex-shrink-0 mt-0.5" />
                    <span>Bi-weekly deep cleaning & linen rotation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#DCA358] flex-shrink-0 mt-0.5" />
                    <span>Stocked dry pantry & artisanal cooking spices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#DCA358] flex-shrink-0 mt-0.5" />
                    <span>Dedicated 1 Gbps fiber line & Herman Miller seating</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#DCA358] flex-shrink-0 mt-0.5" />
                    <span>Weekly laundry wash & press allowance</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Rate & Action */}
            <div className="pt-8 mt-6 border-t border-[rgba(30,36,38,0.1)]">
              <div className="flex items-baseline justify-between mb-4">
                <span className="mono-label text-xs text-[#1E2426]/60">WEEKLY RATE</span>
                <span className="font-serif text-2xl font-normal text-[#1E2426]">
                  ₹42,000 <span className="text-sm font-sans text-[#1E2426]/60">/ week</span>
                </span>
              </div>
              <button
                onClick={() => {
                  onSelectTier('weekly');
                  onOpenAvailability();
                }}
                className="w-full py-3.5 bg-[#DCA358] text-[#1E2426] hover:bg-[#1E2426] hover:text-[#F6F3EC] transition-colors font-sans font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>BOOK WEEKLY RESIDENCY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* TIER 3: MONTHLY & CORPORATE (1+ Months) -> #6C8793 Slate & #4E6E58 Pine */}
          <div
            ref={monthlyCardRef}
            className={`border transition-all duration-300 flex flex-col justify-between p-8 bg-[#FAF8F5] relative shadow-sun-cast ${
              activeTier === 'monthly'
                ? 'border-[#6C8793] ring-2 ring-[#6C8793]/40'
                : 'border-[rgba(30,36,38,0.14)]'
            }`}
          >
            {/* Top Indicator */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[rgba(30,36,38,0.1)]">
                <span className="mono-label text-xs text-[#6C8793] font-bold">
                  TIER 03 · MONTHLY & CORP
                </span>
                <span className="mono-label text-xs text-[#1E2426]/60">1+ MONTHS / BLOCKS</span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#6C8793]" />
                  <span className="w-3 h-3 rounded-full bg-[#4E6E58]" />
                  <span className="mono-label text-[11px] text-[#6C8793] font-semibold tracking-wider">
                    SLATE & PINE ACCENTS
                  </span>
                </div>
                <h3 className="font-serif text-3xl text-[#1E2426] mt-2">
                  The Extended Tenancy
                </h3>
                <p className="font-sans text-sm text-[#1E2426]/75 mt-2 leading-relaxed">
                  For executive relocations, medical sabbaticals, founders, and corporate housing
                  blocks seeking institutional quality with zero lease friction.
                </p>
              </div>

              {/* Service Matrix */}
              <div className="space-y-3 pt-4 border-t border-[rgba(30,36,38,0.1)]">
                <div className="mono-label text-[10px] text-[#1E2426]/60">SERVICE LEVEL</div>
                <ul className="space-y-2 text-xs text-[#1E2426]/85">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4E6E58] flex-shrink-0 mt-0.5" />
                    <span>Residential tenancy agreement with no lock-in bond</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4E6E58] flex-shrink-0 mt-0.5" />
                    <span>Personalized art curation & library additions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4E6E58] flex-shrink-0 mt-0.5" />
                    <span>Dedicated property manager & mail stewardship</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4E6E58] flex-shrink-0 mt-0.5" />
                    <span>Corporate billing, GST invoicing & block discounts</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Rate & Action */}
            <div className="pt-8 mt-6 border-t border-[rgba(30,36,38,0.1)]">
              <div className="flex items-baseline justify-between mb-4">
                <span className="mono-label text-xs text-[#1E2426]/60">MONTHLY RATE</span>
                <span className="font-serif text-2xl font-normal text-[#1E2426]">
                  ₹1,25,000 <span className="text-sm font-sans text-[#1E2426]/60">/ month</span>
                </span>
              </div>
              <button
                onClick={() => {
                  onSelectTier('monthly');
                  onOpenAvailability();
                }}
                className="w-full py-3.5 bg-[#1E2426] text-[#F6F3EC] hover:bg-[#4E6E58] transition-colors font-sans font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>REQUEST LONG-STAY / CORP BLOCK</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
