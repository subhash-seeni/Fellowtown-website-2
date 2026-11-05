import type { FC } from 'react';

interface StudioFloorplanSVGProps {
  activeStage: number; // 0: Kitchen, 1: Work Desk, 2: Smart Entry, 3: Deep Rest
  onSelectStage?: (stage: number) => void;
}

export const StudioFloorplanSVG: FC<StudioFloorplanSVGProps> = ({
  activeStage,
  onSelectStage,
}) => {
  const zones = [
    { id: 0, label: 'FULL INDUCTION KITCHEN', time: '08:00 AM' },
    { id: 1, label: 'WORK ATELIER & ACOUSTICS', time: '11:30 AM' },
    { id: 2, label: 'SMART DIGITAL ENTRY', time: '04:00 PM' },
    { id: 3, label: 'DEEP REST SANCTUARY', time: '09:30 PM' },
  ];

  return (
    <div className="bg-[#FAF8F5] border-2 border-[#1E2426] p-4 shadow-sun-cast w-full max-w-[280px] sm:max-w-[320px]">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[rgba(30,36,38,0.12)] mb-3">
        <span className="mono-label text-[9.5px] font-bold text-[#8C3B1A]">
          1:50 STUDIO ARCHITECTURAL PLAN
        </span>
        <span className="mono-label text-[9px] text-[#1E2426]/60">480 SQ FT</span>
      </div>

      {/* SVG Floorplan Graphic */}
      <svg
        viewBox="0 0 240 180"
        className="w-full h-auto select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Exterior Building Perimeter Wall (Thick Modernist Concrete) */}
        <rect
          x="10"
          y="10"
          width="220"
          height="160"
          stroke="#1E2426"
          strokeWidth="3.5"
          fill="#F6F3EC"
        />

        {/* 45° Solar Aperture Window on Left/Top */}
        <line x1="10" y1="50" x2="10" y2="130" stroke="#8C3B1A" strokeWidth="4" />
        <rect x="5" y="60" width="4" height="60" fill="#8C3B1A" />
        <text x="2" y="55" fill="#8C3B1A" fontSize="6" fontFamily="JetBrains Mono" transform="rotate(-90 2 55)">
          45° SUN APERTURE
        </text>

        {/* ZONE 3: Entry Vestibule (Right Bottom) */}
        <g
          onClick={() => onSelectStage && onSelectStage(2)}
          className="cursor-pointer transition-opacity"
        >
          <rect
            x="160"
            y="110"
            width="68"
            height="58"
            fill={activeStage === 2 ? 'rgba(140, 59, 26, 0.22)' : 'rgba(30, 36, 38, 0.04)'}
            stroke={activeStage === 2 ? '#8C3B1A' : '#1E2426'}
            strokeWidth={activeStage === 2 ? '2' : '1'}
            strokeDasharray={activeStage === 2 ? undefined : '2 2'}
          />
          {/* Main Entry Door Swing Arc */}
          <path d="M 228 145 A 25 25 0 0 0 203 168" stroke="#1E2426" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="228" y1="145" x2="228" y2="168" stroke="#1E2426" strokeWidth="2" />
          {/* Smart lock dot */}
          <circle cx="228" cy="145" r="2.5" fill={activeStage === 2 ? '#8C3B1A' : '#1E2426'} />
          <text x="195" y="135" fill="#1E2426" fontSize="6.5" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">
            03. ENTRY
          </text>
        </g>

        {/* ZONE 1: Full Kitchen (Top Right) */}
        <g
          onClick={() => onSelectStage && onSelectStage(0)}
          className="cursor-pointer transition-opacity"
        >
          <rect
            x="140"
            y="12"
            width="88"
            height="85"
            fill={activeStage === 0 ? 'rgba(140, 59, 26, 0.22)' : 'rgba(30, 36, 38, 0.04)'}
            stroke={activeStage === 0 ? '#8C3B1A' : '#1E2426'}
            strokeWidth={activeStage === 0 ? '2' : '1'}
          />
          {/* Kitchen Counter L-Shape */}
          <rect x="145" y="16" width="78" height="20" fill="#EFECE4" stroke="#1E2426" strokeWidth="1" />
          <rect x="203" y="16" width="20" height="60" fill="#EFECE4" stroke="#1E2426" strokeWidth="1" />
          {/* Induction cooktop */}
          <circle cx="165" cy="26" r="4" stroke="#8C3B1A" strokeWidth="1" />
          <circle cx="178" cy="26" r="3" stroke="#8C3B1A" strokeWidth="1" />
          <text x="175" y="60" fill="#1E2426" fontSize="6.5" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">
            01. KITCHEN
          </text>
        </g>

        {/* ZONE 2: Work Atelier Desk (Center Bottom / Window Side) */}
        <g
          onClick={() => onSelectStage && onSelectStage(1)}
          className="cursor-pointer transition-opacity"
        >
          <rect
            x="70"
            y="95"
            width="85"
            height="73"
            fill={activeStage === 1 ? 'rgba(140, 59, 26, 0.22)' : 'rgba(30, 36, 38, 0.04)'}
            stroke={activeStage === 1 ? '#8C3B1A' : '#1E2426'}
            strokeWidth={activeStage === 1 ? '2' : '1'}
          />
          {/* Ergonomic Oak Desk */}
          <rect x="75" y="142" width="55" height="24" fill="#DCA358" stroke="#1E2426" strokeWidth="1" />
          {/* Chair */}
          <circle cx="102" cy="130" r="5" fill="#FAF8F5" stroke="#1E2426" strokeWidth="1" />
          <text x="112" y="118" fill="#1E2426" fontSize="6.5" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">
            02. WORK DESK
          </text>
        </g>

        {/* ZONE 4: Deep Rest Bed Sanctuary (Top Left) */}
        <g
          onClick={() => onSelectStage && onSelectStage(3)}
          className="cursor-pointer transition-opacity"
        >
          <rect
            x="12"
            y="12"
            width="120"
            height="78"
            fill={activeStage === 3 ? 'rgba(140, 59, 26, 0.22)' : 'rgba(30, 36, 38, 0.04)'}
            stroke={activeStage === 3 ? '#8C3B1A' : '#1E2426'}
            strokeWidth={activeStage === 3 ? '2' : '1'}
          />
          {/* King Platform Bed with Pillows */}
          <rect x="25" y="18" width="65" height="60" fill="#FAF8F5" stroke="#1E2426" strokeWidth="1.2" />
          <rect x="28" y="22" width="25" height="15" fill="#EFECE4" stroke="#1E2426" strokeWidth="0.8" />
          <rect x="62" y="22" width="25" height="15" fill="#EFECE4" stroke="#1E2426" strokeWidth="0.8" />
          {/* Terracotta blanket strip */}
          <rect x="25" y="60" width="65" height="18" fill="#8C3B1A" opacity="0.85" />
          <text x="100" y="48" fill="#1E2426" fontSize="6.5" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">
            04. BEDROOM
          </text>
        </g>
      </svg>

      {/* Active Room Readout */}
      <div className="mt-2.5 pt-2 border-t border-[rgba(30,36,38,0.1)] flex items-center justify-between text-[9px] mono-label">
        <span className="text-[#8C3B1A] font-bold">
          ACTIVE: {zones[activeStage].label}
        </span>
        <span className="text-[#1E2426]/60">{zones[activeStage].time}</span>
      </div>
    </div>
  );
};
