import type { FC } from 'react';

export const NoiseOverlay: FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[999] overflow-hidden select-none"
      style={{ opacity: 0.035 }}
    >
      <svg
        className="w-full h-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <filter id="fellowtown-plaster-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#fellowtown-plaster-noise)"
          fill="#1E2426"
        />
      </svg>
    </div>
  );
};
