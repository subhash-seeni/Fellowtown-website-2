import { useState, type FC } from 'react';
import { Sparkles } from 'lucide-react';

export const InsideUnitSection: FC = () => {
  const [activeUnit, setActiveUnit] = useState<'studio' | 'one-bed' | 'vault'>('one-bed');

  const unitData = {
    studio: {
      name: 'The Atelier Studio',
      area: '480 SQ FT // 44.6 M²',
      ceiling: '3.3M RAW CONCRETE BEAM',
      orientation: 'NORTH-EAST DIFFUSED LIGHT',
      occupancy: '1–2 RESIDENTS',
      features: [
        'Integrated fold-away solid oak workstation',
        'Deep single-aperture daybed window seat',
        'Cast concrete wash basin with brass unlacquered hardware',
        'Miele cooktop and under-counter cold drawer',
      ],
      diagramModules: [
        { label: 'APERTURE DAYBED', coords: 'x: 0, y: 0, w: 100%' },
        { label: 'LIME PLASTER CORE', coords: 'CENTRAL 300MM' },
        { label: 'KOTA STONE BATH', coords: 'SECLUDED REAR' },
      ],
    },
    'one-bed': {
      name: 'The Brise-Soleil 1-Bedroom',
      area: '780 SQ FT // 72.5 M²',
      ceiling: '3.6M EXPOSED BRICK LINTEL',
      orientation: 'DUAL-ASPECT CROSS-VENTILATION',
      occupancy: '1–3 RESIDENTS',
      features: [
        'Separated acoustic bedroom with raw plaster acoustic baffling',
        'Continuous deep sun-cast balcony with 45° louvers',
        'Full 4-person terrazzo dining table and chef prep island',
        'Walk-in dressing atelier and rain-shower wetroom',
      ],
      diagramModules: [
        { label: '45° SOLAR BALCONY', coords: 'FULL SPAN 7.8M' },
        { label: 'SALON & CHEF PREP', coords: 'TERRAZZO HEARTH' },
        { label: 'MASTER VAULT', coords: 'ACOUSTIC RECESSED' },
      ],
    },
    vault: {
      name: 'The Doshi Vault 2-Bedroom',
      area: '1,240 SQ FT // 115.2 M²',
      ceiling: '4.2M VAULTED BRICK ARCH',
      orientation: 'FOUR-POINT CARDINAL ORIENTATION',
      occupancy: '2–5 RESIDENTS / CORP',
      features: [
        'Double brick catenary vault structure inspired by Sangath',
        'Two private master suites with dedicated study apertures',
        'Private sunken lounge courtyard entrance',
        'Custom modular teak shelving system across 12-meter wall',
      ],
      diagramModules: [
        { label: 'CATENARY BRICK VAULT', coords: 'SPAN 11.4M ARCH' },
        { label: 'DUAL APERTURE SUITES', coords: 'WING A & B' },
        { label: 'SUNKEN COURTYARD', coords: 'PRIVATE PATIO' },
      ],
    },
  };

  const current = unitData[activeUnit];

  return (
    <section id="units" className="w-full border-b border-[rgba(30,36,38,0.14)] py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Header */}
        <div className="pb-12 border-b border-[rgba(30,36,38,0.14)] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="mono-label text-xs text-[#8C3B1A]">02 // ARCHITECTURAL MODULARITY</div>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1E2426]">Inside a Unit</h2>
            <p className="font-sans text-base text-[#1E2426]/70 max-w-xl">
              Constructed in accordance with Ahmedabad modernist proportion. Every wall, lintel,
              and window jamb serves a thermal, acoustic, and spatial purpose.
            </p>
          </div>

          {/* Unit Selector Tabs */}
          <div className="flex border border-[rgba(30,36,38,0.2)] bg-[#F6F3EC] p-1">
            {(['studio', 'one-bed', 'vault'] as const).map((unit) => (
              <button
                key={unit}
                onClick={() => setActiveUnit(unit)}
                className={`px-4 py-2 mono-label text-xs font-semibold transition-all cursor-pointer ${
                  activeUnit === unit
                    ? 'bg-[#1E2426] text-[#F6F3EC] shadow-xs'
                    : 'text-[#1E2426]/70 hover:text-[#1E2426]'
                }`}
              >
                {unit.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Tactile Material Palette Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-10 border-b border-[rgba(30,36,38,0.14)]">
          <div className="p-4 bg-[#F6F3EC] border border-[rgba(30,36,38,0.12)] space-y-1">
            <span className="mono-label text-[10px] text-[#8C3B1A]">MATERIAL 01</span>
            <div className="font-serif text-lg text-[#1E2426]">Kutch Lime Plaster</div>
            <p className="text-xs text-[#1E2426]/70 leading-normal">
              Breathable, humidity-absorbing raw wall finish with subtle natural mineral sheen.
            </p>
          </div>

          <div className="p-4 bg-[#F6F3EC] border border-[rgba(30,36,38,0.12)] space-y-1">
            <span className="mono-label text-[10px] text-[#8C3B1A]">MATERIAL 02</span>
            <div className="font-serif text-lg text-[#1E2426]">Burnt Terracotta Brick</div>
            <p className="text-xs text-[#1E2426]/70 leading-normal">
              Kiln-fired alluvial clay bricks offering high thermal mass and acoustic solitude.
            </p>
          </div>

          <div className="p-4 bg-[#F6F3EC] border border-[rgba(30,36,38,0.12)] space-y-1">
            <span className="mono-label text-[10px] text-[#8C3B1A]">MATERIAL 03</span>
            <div className="font-serif text-lg text-[#1E2426]">Kota Limestone Floor</div>
            <p className="text-xs text-[#1E2426]/70 leading-normal">
              Naturally cool under barefoot walking with subtle greenish-grey honed matte surface.
            </p>
          </div>

          <div className="p-4 bg-[#F6F3EC] border border-[rgba(30,36,38,0.12)] space-y-1">
            <span className="mono-label text-[10px] text-[#8C3B1A]">MATERIAL 04</span>
            <div className="font-serif text-lg text-[#1E2426]">Reclaimed Teakwood</div>
            <p className="text-xs text-[#1E2426]/70 leading-normal">
              Dense regional timber finished with organic beeswax; tactile joinery at every touchpoint.
            </p>
          </div>
        </div>

        {/* Unit Modularity Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10 items-stretch">
          {/* Architectural Drawing & Module Schematics */}
          <div className="lg:col-span-7 bg-[#F6F3EC] border border-[rgba(30,36,38,0.15)] p-8 flex flex-col justify-between shadow-sun-cast relative">
            {/* Crosshair accents */}
            <span className="absolute top-2 left-2 mono-label text-[10px] text-[#1E2426]/30">+</span>
            <span className="absolute top-2 right-2 mono-label text-[10px] text-[#1E2426]/30">+</span>

            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(30,36,38,0.1)]">
                <span className="mono-label text-xs text-[#8C3B1A] font-bold">
                  PLAN ELEVATION // {activeUnit.toUpperCase()}
                </span>
                <span className="mono-label text-xs text-[#1E2426]/60">{current.area}</span>
              </div>

              <h3 className="font-serif text-3xl text-[#1E2426]">{current.name}</h3>

              {/* Architectural Plan Rendering */}
              <div className="my-6 p-6 border-2 border-[#1E2426] bg-[#FAF8F5] relative">
                {/* Simulated Floorplan Grid */}
                <div className="space-y-4">
                  <div className="h-16 border border-dashed border-[#1E2426]/40 flex items-center justify-between px-4 bg-[#8C3B1A]/5">
                    <span className="mono-label text-[11px] font-semibold text-[#8C3B1A]">
                      [DEEP BRISE-SOLEIL APERTURE // SOLAR DEFLECTOR]
                    </span>
                    <span className="mono-label text-[10px] text-[#1E2426]/50">45° AZIMUTH</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-28 border border-[#1E2426]/30 p-3 flex flex-col justify-between bg-white/40">
                      <span className="mono-label text-[10px] text-[#1E2426]/70">LIVING & ATELIER</span>
                      <span className="mono-label text-[9px] text-[#1E2426]/40">KOTA STONE FLOOR</span>
                    </div>
                    <div className="h-28 border border-[#1E2426]/30 p-3 flex flex-col justify-between bg-[#EFECE4]/60">
                      <span className="mono-label text-[10px] text-[#1E2426]/70">SANCTUARY BED & STUDY</span>
                      <span className="mono-label text-[9px] text-[#1E2426]/40">RAW LIME ENVELOPE</span>
                    </div>
                  </div>
                </div>

                {/* Dimension label */}
                <div className="mt-4 pt-3 border-t border-[rgba(30,36,38,0.12)] flex items-center justify-between mono-label text-[10px] text-[#1E2426]/60">
                  <span>SCALE 1:50 ARCHITECTURAL GRID</span>
                  <span>ORIENTATION: {current.orientation}</span>
                </div>
              </div>
            </div>

            {/* Micro architectural tags */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[rgba(30,36,38,0.1)] text-center">
              <div className="p-2 bg-[#FAF8F5] border border-[rgba(30,36,38,0.1)]">
                <span className="mono-label text-[9px] text-[#1E2426]/50 block">CEILING HEIGHT</span>
                <span className="mono-label text-[10px] font-bold text-[#1E2426]">{current.ceiling}</span>
              </div>
              <div className="p-2 bg-[#FAF8F5] border border-[rgba(30,36,38,0.1)]">
                <span className="mono-label text-[9px] text-[#1E2426]/50 block">OCCUPANCY</span>
                <span className="mono-label text-[10px] font-bold text-[#1E2426]">{current.occupancy}</span>
              </div>
              <div className="p-2 bg-[#FAF8F5] border border-[rgba(30,36,38,0.1)]">
                <span className="mono-label text-[9px] text-[#1E2426]/50 block">AIRFLOW</span>
                <span className="mono-label text-[10px] font-bold text-[#8C3B1A]">PASSIVE VENT</span>
              </div>
            </div>
          </div>

          {/* Right Spec Sheet */}
          <div className="lg:col-span-5 bg-[#F6F3EC] border border-[rgba(30,36,38,0.15)] p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="pb-3 border-b border-[rgba(30,36,38,0.1)] flex items-center justify-between">
                <span className="mono-label text-xs text-[#1E2426] font-bold">
                  TECHNICAL APARTMENT SPEC SHEET
                </span>
                <span className="mono-label text-[10px] text-[#8C3B1A]">REV. 2026.04</span>
              </div>

              <div>
                <h4 className="font-serif text-2xl text-[#1E2426]">Inclusions & Modularity</h4>
                <p className="text-xs text-[#1E2426]/75 mt-1">
                  Every fixture is selected to age with dignity rather than planned obsolescence.
                </p>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-3 pt-2">
                {current.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white/50 border border-[rgba(30,36,38,0.1)] flex items-start gap-3"
                  >
                    <span className="mono-label text-[10px] text-[#8C3B1A] font-bold mt-0.5">
                      0{idx + 1}.
                    </span>
                    <span className="font-sans text-xs text-[#1E2426] leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Hotel Service Integration */}
              <div className="p-4 bg-[#EFECE4] border border-[rgba(30,36,38,0.14)] space-y-2">
                <div className="mono-label text-[10px] text-[#1E2426] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#8C3B1A]" />
                  HOTEL SERVICE EMBEDDED IN EVERY LEASE
                </div>
                <p className="text-xs text-[#1E2426]/75 leading-relaxed">
                  Unlike traditional leases, our stewards provide on-demand housekeeping, linen replacement, maintenance engineers within 30 minutes, and front-desk parcel handling.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[rgba(30,36,38,0.1)]">
              <div className="mono-label text-[10px] text-[#1E2426]/50">
                COORDINATES: AHMEDABAD CENTRAL PRECINCT // BLOCK 04
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
