import { type FC } from 'react';
import type { StayTier } from './FellowtownLogo';
import { Sun, MapPin, Compass } from 'lucide-react';

interface HeroSectionProps {
  activeTier: StayTier;
  onSelectTier: (tier: StayTier) => void;
  onOpenAvailability: () => void;
  onOpenTokens: () => void;
}

export const HeroSection: FC<HeroSectionProps> = ({
  activeTier,
  onSelectTier,
  onOpenAvailability,
  onOpenTokens,
}) => {
  const stayTiers: {
    tier: StayTier;
    label: string;
    duration: string;
    accent: string;
    colorHex: string;
    tag: string;
  }[] = [
    {
      tier: 'nightly',
      label: 'NIGHTLY',
      duration: '1 – 6 Nights',
      accent: 'border-[#8C3B1A]',
      colorHex: '#8C3B1A',
      tag: 'TERRACOTTA ACCENT',
    },
    {
      tier: 'weekly',
      label: 'WEEKLY',
      duration: '1 – 4 Weeks',
      accent: 'border-[#DCA358]',
      colorHex: '#DCA358',
      tag: 'OCHRE ACCENT',
    },
    {
      tier: 'monthly',
      label: 'MONTHLY / CORP',
      duration: '1+ Months',
      accent: 'border-[#6C8793]',
      colorHex: '#6C8793',
      tag: 'SLATE & PINE ACCENT',
    },
  ];

  return (
    <section className="relative w-full border-b border-[rgba(30,36,38,0.14)] overflow-hidden">
      {/* Ahmedabad Architectural Grid Background Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] flex justify-between">
        <div className="w-px h-full bg-[#1E2426] ml-[20%]"></div>
        <div className="w-px h-full bg-[#1E2426] ml-[20%]"></div>
        <div className="w-px h-full bg-[#1E2426] ml-[20%]"></div>
        <div className="w-px h-full bg-[#1E2426] mr-[20%]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-16 pb-20">
        {/* Micro-Meta Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-[rgba(30,36,38,0.14)]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#8C3B1A] rounded-full animate-ping"></span>
            <span className="mono-label text-xs text-[#1E2426] font-semibold">
              AHMEDABAD MODERNIST REPERTOIRE
            </span>
            <span className="text-[rgba(30,36,38,0.25)]">/</span>
            <span className="mono-label text-xs text-[#1E2426]/60">
              BV DOSHI · RAW PLASTER · SUN APERTURES
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="mono-label text-xs text-[#1E2426]/70 flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-[#DCA358]" />
              PASSIVE THERMAL COOLING: 27°C INTERIOR
            </span>
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 items-start">
          {/* Left Column: Editorial Headline & Manifesto */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFECE4] border border-[rgba(30,36,38,0.14)] mono-label text-[11px] text-[#1E2426]">
                <MapPin className="w-3 h-3 text-[#8C3B1A]" />
                FELLOWTOWN APARTMENTS & RESIDENCY // EST. 2026
              </div>

              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-[#1E2426]">
                Dwell with the weight of{' '}
                <span className="italic text-[#8C3B1A] font-normal">raw plaster</span>, sun, and{' '}
                <span className="italic">permanence.</span>
              </h1>
            </div>

            <p className="font-sans text-lg sm:text-xl text-[#1E2426]/80 max-w-2xl font-normal leading-relaxed">
              Furnished city apartments with hotel service for{' '}
              <strong className="font-semibold text-[#1E2426]">a night</strong>,{' '}
              <strong className="font-semibold text-[#1E2426]">a week</strong>, or{' '}
              <strong className="font-semibold text-[#1E2426]">a year</strong>. Built with
              Ahmedabad modernist proportion, deep brise-soleil shadow play, and daily hospitality.
            </p>

            {/* Interactive Stay Tier Switcher */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="mono-label text-xs text-[#1E2426]/70">
                  SELECT DURATION TIER (SYNCS THE LIVING ELEVATION LOGO):
                </span>
                <span className="mono-label text-[10px] text-[#8C3B1A] font-semibold">
                  ACTIVE: {activeTier.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {stayTiers.map((item) => {
                  const isActive = activeTier === item.tier;
                  return (
                    <button
                      key={item.tier}
                      onClick={() => onSelectTier(item.tier)}
                      className={`p-4 border text-left transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'border-[#1E2426] bg-[#FAF8F5] shadow-sun-cast ring-1 ring-[#1E2426]'
                          : 'border-[rgba(30,36,38,0.14)] bg-white/40 hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="mono-label text-[10px] text-[#1E2426]/60">
                          {item.duration}
                        </span>
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: item.colorHex }}
                        />
                      </div>
                      <div className="font-sans font-semibold text-base text-[#1E2426]">
                        {item.label}
                      </div>
                      <div
                        className="mono-label text-[9px] mt-1 font-medium"
                        style={{ color: item.colorHex }}
                      >
                        {item.tag}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA & Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenAvailability}
                className="btn-tactile-flip px-8 py-4 font-sans font-semibold text-sm tracking-[0.1em] uppercase cursor-pointer shadow-sun-cast"
              >
                CHECK AVAILABILITY & RATES
              </button>

              <button
                onClick={onOpenTokens}
                className="px-6 py-4 border border-[rgba(30,36,38,0.2)] bg-white/50 hover:bg-white text-xs mono-label text-[#1E2426] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#8C3B1A]" />
                INSPECT DESIGN TOKENS
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Elevation Diagram & Sun-Cast Card */}
          <div className="lg:col-span-4 space-y-6">
            {/* Architectural Elevation Spec Card with Sun-Cast Shadow */}
            <div className="bg-[#FAF8F5] border border-[rgba(30,36,38,0.16)] p-6 shadow-sun-cast relative">
              {/* Corner crosshairs */}
              <span className="absolute top-2 left-2 mono-label text-[10px] text-[#1E2426]/30">+</span>
              <span className="absolute top-2 right-2 mono-label text-[10px] text-[#1E2426]/30">+</span>
              <span className="absolute bottom-2 left-2 mono-label text-[10px] text-[#1E2426]/30">+</span>
              <span className="absolute bottom-2 right-2 mono-label text-[10px] text-[#1E2426]/30">+</span>

              <div className="border-b border-[rgba(30,36,38,0.12)] pb-4 mb-4">
                <div className="mono-label text-[10px] text-[#8C3B1A]">PRECINCT SPECIFICATION</div>
                <h3 className="font-serif text-2xl text-[#1E2426] mt-0.5">The Living Elevation</h3>
                <p className="text-xs text-[#1E2426]/70 mt-1">
                  Ahmedabad residential modularity where light modulates living tenure.
                </p>
              </div>

              {/* Sun Study Aperture Graphic */}
              <div className="p-4 bg-[#EFECE4] border border-[rgba(30,36,38,0.12)] space-y-3">
                <div className="flex items-center justify-between text-xs mono-label">
                  <span className="text-[#1E2426]/70">SOLAR ANGLE: 45° AZIMUTH</span>
                  <span className="text-[#8C3B1A]">BV DOSHI STUDY</span>
                </div>

                <div className="h-28 relative flex items-center justify-center border border-dashed border-[rgba(30,36,38,0.2)] bg-[#F6F3EC]">
                  {/* Architectural diagram of deep aperture window */}
                  <div className="w-24 h-20 border-2 border-[#1E2426] relative bg-[#FAF8F5] flex items-center justify-center">
                    {/* Shadow cast polygon */}
                    <div className="absolute top-0 right-0 w-12 h-full bg-[#1E2426]/10 transform skew-y-6"></div>
                    <div className="mono-label text-[9px] text-[#1E2426] z-10 text-center font-bold">
                      DEEP JAMB
                      <br />
                      APERTURE
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] mono-label text-[#1E2426]/70 pt-1">
                  <div>PLASTER: RAW KUTCH LIME</div>
                  <div>FLOOR: POLISHED KOTA</div>
                  <div>ACOUSTICS: 48 DB DAMP</div>
                  <div>FACILITY: 24/7 STEWARD</div>
                </div>
              </div>

              {/* Micro specs */}
              <div className="mt-4 pt-4 border-t border-[rgba(30,36,38,0.12)] flex items-center justify-between text-xs">
                <span className="mono-label text-[10px] text-[#1E2426]/60">TENURE RANGE</span>
                <span className="mono-label text-[11px] font-semibold text-[#8C3B1A]">1 NIGHT → 365 DAYS</span>
              </div>
            </div>

            {/* Quick Quote Pill */}
            <div className="p-4 bg-[#EFECE4]/70 border border-[rgba(30,36,38,0.14)] text-xs text-[#1E2426]/80 italic font-serif">
              "Architecture is not merely brick and stone, but the space of living stillness where light casts its slow passage."
              <span className="not-italic block mono-label text-[9px] text-[#1E2426]/60 mt-1">
                — AHMEDABAD MODERNIST PRINCIPLES
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
