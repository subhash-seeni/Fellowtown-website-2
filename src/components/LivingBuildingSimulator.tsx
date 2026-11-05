import { useState, useRef, useEffect, type FC } from 'react';
import gsap from 'gsap';

export type SimulatorMode = 'mode-a' | 'mode-b' | 'mode-c';

interface UnitInfo {
  number: number;
  type: string;
  fill: string;
  isDashed?: boolean;
  yieldIndex: string;
}

export const LivingBuildingSimulator: FC = () => {
  const [activeMode, setActiveMode] = useState<SimulatorMode>('mode-a');
  const [hoveredUnit, setHoveredUnit] = useState<UnitInfo | null>(null);
  const unitRectsRef = useRef<(SVGRectElement | null)[]>([]);

  // Compute unit attributes for 25 units based on active mode
  const getUnitData = (mode: SimulatorMode): UnitInfo[] => {
    const list: UnitInfo[] = [];

    for (let row = 0; row < 5; row++) {
      const floorNum = 5 - row;
      for (let col = 0; col < 5; col++) {
        const unitNum = floorNum * 100 + (col + 1);
        const index = row * 5 + col;

        if (mode === 'mode-a') {
          // Whole Building: 8 Pine, 7 Slate, 5 Ochre, 5 Terracotta
          if (index < 8) {
            list.push({ number: unitNum, type: 'Corporate Block • Reserved', fill: '#4E6E58', yieldIndex: '+28% yield' });
          } else if (index < 15) {
            list.push({ number: unitNum, type: 'Monthly Stay • Occupied', fill: '#6C8793', yieldIndex: '+24% yield' });
          } else if (index < 20) {
            list.push({ number: unitNum, type: 'Weekly Stay • Reserved', fill: '#DCA358', yieldIndex: '+35% yield' });
          } else {
            list.push({ number: unitNum, type: 'Nightly Suite • Booked', fill: '#8C3B1A', yieldIndex: '+42% yield' });
          }
        } else if (mode === 'mode-b') {
          // Floor Split: top 3 floors muted grey, bottom 2 floors Terracotta/Ochre
          if (row < 3) {
            list.push({ number: unitNum, type: 'Standard Lease • Tenanted', fill: '#8A867A', yieldIndex: 'Baseline' });
          } else if (row === 3) {
            list.push({ number: unitNum, type: 'Weekly Suite • Reserved', fill: '#DCA358', yieldIndex: '+34% yield' });
          } else {
            list.push({ number: unitNum, type: 'Nightly Suite • Booked', fill: '#8C3B1A', yieldIndex: '+44% yield' });
          }
        } else {
          // Mode C: Unsold Pop-Up: top 14 dashed, bottom 11 lit
          if (index < 14) {
            list.push({ number: unitNum, type: 'Available for Fit-out', fill: '#1E2426', isDashed: true, yieldIndex: 'Immediate Activation' });
          } else if (index < 18) {
            list.push({ number: unitNum, type: 'Pop-up Monthly • Active', fill: '#6C8793', yieldIndex: '+26% yield' });
          } else if (index < 22) {
            list.push({ number: unitNum, type: 'Pop-up Weekly • Active', fill: '#DCA358', yieldIndex: '+33% yield' });
          } else {
            list.push({ number: unitNum, type: 'Pop-up Nightly • Booked', fill: '#8C3B1A', yieldIndex: '+41% yield' });
          }
        }
      }
    }

    return list;
  };

  const units = getUnitData(activeMode);

  useEffect(() => {
    unitRectsRef.current.forEach((rect, idx) => {
      if (rect) {
        gsap.to(rect, {
          fill: units[idx].fill,
          duration: 0.35,
          delay: (idx % 5) * 0.02 + Math.floor(idx / 5) * 0.02,
          ease: 'power2.out',
        });
      }
    });
  }, [activeMode]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* Simulator Card (SVG Grid + Top Mode Toggles) */}
      <div className="lg:col-span-7 bg-[#1E2426] p-4 sm:p-6 border border-[rgba(246,243,236,0.15)] shadow-sun-cast-lg rounded-xs">
        {/* 1. Top: Full-Width 3-Way Segmented Mode Toggles */}
        <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-1.5 sm:gap-2 pb-4 border-b border-[rgba(246,243,236,0.12)] mb-4">
          {[
            { id: 'mode-a' as SimulatorMode, label: 'Whole Building' },
            { id: 'mode-b' as SimulatorMode, label: 'Floor Split' },
            { id: 'mode-c' as SimulatorMode, label: 'Pop-Up' },
          ].map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => setActiveMode(mode.id)}
              className={`min-h-[44px] px-2 sm:px-4 py-2.5 flex items-center justify-center text-center font-sans text-xs font-semibold tracking-wide transition-all cursor-pointer rounded-xs ${
                activeMode === mode.id
                  ? 'bg-[#F6F3EC] text-[#1E2426] font-bold shadow-sm'
                  : 'text-[#F6F3EC]/70 border border-[rgba(246,243,236,0.2)] hover:border-[#F6F3EC]'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {/* 2. Middle: 25-Unit SVG Building Grid */}
        <div className="w-full flex justify-center">
          <svg
            viewBox="0 0 320 250"
            className="w-full h-auto aspect-[5/4] max-h-[50svh] select-none overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {units.map((unit, index) => {
              const row = Math.floor(index / 5);
              const col = index % 5;
              const x = 20 + col * 56;
              const y = 14 + row * 40;

              const isHovered = hoveredUnit?.number === unit.number;

              return (
                <g
                  key={unit.number}
                  onMouseEnter={() => setHoveredUnit(unit)}
                  onMouseLeave={() => setHoveredUnit(null)}
                  onClick={() => setHoveredUnit(unit)}
                  className="cursor-pointer"
                >
                  <rect
                    ref={(el) => {
                      unitRectsRef.current[index] = el;
                    }}
                    x={x}
                    y={y}
                    width="50"
                    height="32"
                    rx="3"
                    fill={unit.fill}
                    stroke={isHovered ? '#F6F3EC' : unit.isDashed ? 'rgba(246,243,236,0.5)' : '#1E2426'}
                    strokeWidth={isHovered ? '2.5' : '1.5'}
                    strokeDasharray={unit.isDashed ? '4 3' : 'none'}
                  />
                  <text
                    x={x + 25}
                    y={y + 19}
                    fill={unit.fill === '#8A867A' ? '#1E2426' : '#F6F3EC'}
                    fontSize="8.5"
                    fontFamily="JetBrains Mono"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {unit.number}
                  </text>
                </g>
              );
            })}

            {/* Lobby Bar */}
            <rect
              x="20"
              y="218"
              width="280"
              height="22"
              rx="2"
              fill="#1E2426"
              stroke="rgba(246,243,236,0.3)"
              strokeWidth="1.2"
            />
            <text
              x="160"
              y="233"
              fill="#F6F3EC"
              fontSize="8"
              fontFamily="Space Grotesk"
              fontWeight="bold"
              letterSpacing="0.1em"
              textAnchor="middle"
            >
              LOBBY & RESIDENT COMMONS
            </text>
          </svg>
        </div>

        {/* Fixed Pill Banner Right Below Grid */}
        <div className="mt-4 p-3 bg-[#242C2E] border border-[rgba(246,243,236,0.15)] rounded-xs text-xs flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[#F6F3EC]">
          {hoveredUnit ? (
            <>
              <span className="text-[#DCA358] font-bold font-sans">
                Apartment {hoveredUnit.number} • {hoveredUnit.type}
              </span>
              <span className="text-[#4E6E58] font-bold font-sans">
                {hoveredUnit.yieldIndex}
              </span>
            </>
          ) : (
            <span className="text-xs text-[#F6F3EC]/60 font-sans text-center w-full sm:w-auto">
              Tap or hover any apartment to view occupancy
            </span>
          )}
        </div>
      </div>

      {/* 3. Bottom Metric Bar on Mobile (< 1024px) / Right Column on Desktop (>= 1024px) */}
      <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-8 pl-0 lg:pl-6 pt-4 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-0 bg-[#242C2E] lg:bg-transparent border lg:border-none border-[rgba(246,243,236,0.1)] rounded-xs">
          <div className="font-display font-extrabold text-4xl sm:text-6xl lg:text-8xl text-[#F6F3EC] leading-none tracking-tightest">
            +25%
          </div>
          <div className="font-sans text-xs sm:text-sm text-[#DCA358] mt-2 font-medium">
            Owner income vs. plain lease
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-0 bg-[#242C2E] lg:bg-transparent border lg:border-none border-[rgba(246,243,236,0.1)] rounded-xs lg:pt-6 lg:border-t lg:border-[rgba(246,243,236,0.12)]">
          <div className="font-display font-extrabold text-4xl sm:text-6xl lg:text-8xl text-[#F6F3EC] leading-none tracking-tightest">
            2.5 YRS
          </div>
          <div className="font-sans text-xs sm:text-sm text-[#DCA358] mt-2 font-medium">
            Fit-out payback
          </div>
        </div>
      </div>
    </div>
  );
};
