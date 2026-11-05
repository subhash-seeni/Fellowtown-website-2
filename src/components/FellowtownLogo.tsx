import { useEffect, useRef, useState, type FC } from 'react';
import gsap from 'gsap';

export type StayTier = 'nightly' | 'weekly' | 'monthly' | 'idle';

export interface FellowtownLogoProps {
  /** Explicit state override; if omitted, listens to scroll & custom events */
  state?: StayTier;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show the FELLOWTOWN wordmark */
  showWordmark?: boolean;
  /** Inverted color scheme for dark/charcoal canvas */
  inverted?: boolean;
  /** Allow clicking logo to cycle stay tiers */
  interactive?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Callback when tier is changed via click */
  onTierChange?: (tier: StayTier) => void;
}

// 15 Modules (5 columns x 3 rows)
// Row 0: 0, 1, 2, 3, 4
// Row 1: 5, 6, 7, 8, 9
// Row 2: 10, 11, 12, 13, 14

const COLOR_TOKENS = {
  limestone: '#F6F3EC',
  charcoal: '#1E2426',
  terracotta: '#8C3B1A',
  ochre: '#DCA358',
  slate: '#6C8793',
  pine: '#4E6E58',
  sandMuted: '#D9D4C7',
  sandDark: '#2C3538',
};

// Compute target color for each module based on tier state and inverted mode
function getTargetColors(tier: StayTier, inverted: boolean): string[] {
  const muted = inverted ? COLOR_TOKENS.sandDark : COLOR_TOKENS.sandMuted;

  switch (tier) {
    case 'nightly':
      // 6 modules lit in Terracotta (#8C3B1A), others sand-muted
      return [
        muted, COLOR_TOKENS.terracotta, muted, COLOR_TOKENS.terracotta, muted, // Row 0 (2 lit)
        muted, COLOR_TOKENS.terracotta, muted, COLOR_TOKENS.terracotta, muted, // Row 1 (2 lit)
        COLOR_TOKENS.terracotta, muted, muted, muted, COLOR_TOKENS.terracotta, // Row 2 (2 lit) = 6 total
      ];

    case 'weekly':
      // Middle row (5..9) smoothly fills with Ochre (#DCA358), bottom maintains subtle warmth
      return [
        muted, muted, muted, muted, muted, // Row 0
        COLOR_TOKENS.ochre, COLOR_TOKENS.ochre, COLOR_TOKENS.ochre, COLOR_TOKENS.ochre, COLOR_TOKENS.ochre, // Row 1: ALL Ochre
        muted, COLOR_TOKENS.terracotta, muted, COLOR_TOKENS.terracotta, muted, // Row 2
      ];

    case 'monthly':
      // Top row morphs to Slate (#6C8793) & Pine (#4E6E58)
      // Middle row holds Ochre, bottom holds Terracotta
      return [
        COLOR_TOKENS.slate, COLOR_TOKENS.slate, COLOR_TOKENS.slate, COLOR_TOKENS.pine, COLOR_TOKENS.pine, // Row 0: Slate & Pine
        COLOR_TOKENS.ochre, COLOR_TOKENS.ochre, COLOR_TOKENS.ochre, COLOR_TOKENS.ochre, COLOR_TOKENS.ochre, // Row 1: Ochre
        COLOR_TOKENS.terracotta, muted, COLOR_TOKENS.terracotta, muted, COLOR_TOKENS.terracotta, // Row 2: Terracotta
      ];

    case 'idle':
    default:
      // Subtle architectural default: baseline occupancy
      return [
        muted, muted, COLOR_TOKENS.slate, muted, muted,
        COLOR_TOKENS.ochre, muted, COLOR_TOKENS.ochre, muted, muted,
        muted, COLOR_TOKENS.terracotta, muted, COLOR_TOKENS.terracotta, muted,
      ];
  }
}

export const FellowtownLogo: FC<FellowtownLogoProps> = ({
  state: controlledState,
  size = 'md',
  showWordmark = true,
  inverted = false,
  interactive = true,
  className = '',
  onTierChange,
}) => {
  const [currentTier, setCurrentTier] = useState<StayTier>(controlledState || 'nightly');
  const rectRefs = useRef<(SVGRectElement | null)[]>([]);
  const foundationRef = useRef<SVGRectElement | null>(null);

  // Sync with prop when controlled
  useEffect(() => {
    if (controlledState && controlledState !== currentTier) {
      setCurrentTier(controlledState);
    }
  }, [controlledState]);

  // Listen for custom event 'fellowtown:state-change' or 'fellowtown:tier'
  useEffect(() => {
    const handleCustomState = (e: Event) => {
      const customEvent = e as CustomEvent<{ state?: StayTier; tier?: StayTier }>;
      const nextTier = customEvent.detail?.state || customEvent.detail?.tier;
      if (nextTier && ['nightly', 'weekly', 'monthly', 'idle'].includes(nextTier)) {
        setCurrentTier(nextTier);
      }
    };

    window.addEventListener('fellowtown:state-change', handleCustomState);
    window.addEventListener('fellowtown:tier', handleCustomState);

    return () => {
      window.removeEventListener('fellowtown:state-change', handleCustomState);
      window.removeEventListener('fellowtown:tier', handleCustomState);
    };
  }, []);

  // Animate modules using GSAP whenever tier or inverted changes
  useEffect(() => {
    const targetColors = getTargetColors(currentTier, inverted);

    rectRefs.current.forEach((rect, index) => {
      if (rect) {
        gsap.to(rect, {
          fill: targetColors[index],
          duration: 0.55,
          ease: 'power2.out',
          delay: (index % 5) * 0.025, // Staggered column-wise wave
        });
      }
    });

    if (foundationRef.current) {
      gsap.to(foundationRef.current, {
        fill: inverted ? COLOR_TOKENS.limestone : COLOR_TOKENS.charcoal,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  }, [currentTier, inverted]);

  // Dimensions
  const dimensions = {
    sm: { width: 36, height: 28.5, textSize: 'text-sm', badge: 'text-[9px]' },
    md: { width: 48, height: 38, textSize: 'text-base', badge: 'text-[10px]' },
    lg: { width: 64, height: 50.6, textSize: 'text-xl', badge: 'text-xs' },
  }[size];

  // Module dimensions: 5 columns x 3 rows
  const cols = 5;
  const rows = 3;
  const modWidth = 7.2;
  const modHeight = 7.6;
  const gapX = 3.0;
  const gapY = 3.2;
  const startY = 2.4;

  const cycleTier = () => {
    if (!interactive) return;
    const tiers: StayTier[] = ['nightly', 'weekly', 'monthly'];
    const nextIndex = (tiers.indexOf(currentTier) + 1) % tiers.length;
    const nextTier = tiers[nextIndex];
    setCurrentTier(nextTier);
    if (onTierChange) onTierChange(nextTier);

    // Dispatch custom event to notify all other components & header
    window.dispatchEvent(
      new CustomEvent('fellowtown:tier', { detail: { tier: nextTier, state: nextTier } })
    );
  };

  const foundationFill = inverted ? COLOR_TOKENS.limestone : COLOR_TOKENS.charcoal;
  const textColor = inverted ? 'text-[#F6F3EC]' : 'text-[#1E2426]';

  return (
    <div
      onClick={cycleTier}
      className={`inline-flex items-center gap-3 select-none transition-transform ${
        interactive ? 'cursor-pointer group hover:opacity-95' : ''
      } ${className}`}
      title={interactive ? `Current: ${currentTier.toUpperCase()} tier. Click to cycle.` : undefined}
      role={interactive ? 'button' : undefined}
      aria-label={`Fellowtown Logo - Current stay tier: ${currentTier}`}
    >
      {/* 48x38px Dynamic SVG "The Living Elevation" */}
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 48 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-200 group-hover:scale-[1.03]"
      >
        {/* 15 Rounded Rectangular Window Modules */}
        {Array.from({ length: rows }).map((_, r) => {
          return Array.from({ length: cols }).map((__, c) => {
            const index = r * cols + c;
            const x = c * (modWidth + gapX);
            const y = startY + r * (modHeight + gapY);

            return (
              <rect
                key={index}
                ref={(el) => {
                  rectRefs.current[index] = el;
                }}
                x={x.toFixed(1)}
                y={y.toFixed(1)}
                width={modWidth}
                height={modHeight}
                rx="1.5"
                ry="1.5"
                fill={inverted ? COLOR_TOKENS.sandDark : COLOR_TOKENS.sandMuted}
                className="transition-opacity duration-150"
              />
            );
          });
        })}

        {/* Foundation Bar: height="4px" in #1E2426 (or inverted #F6F3EC) */}
        <rect
          ref={foundationRef}
          x="0"
          y="34"
          width="48"
          height="4"
          rx="0.6"
          fill={foundationFill}
        />
      </svg>

      {/* FELLOWTOWN Wordmark */}
      {showWordmark && (
        <div className="flex items-center">
          <span
            className={`font-sans font-bold tracking-[0.18em] ${dimensions.textSize} ${textColor}`}
          >
            FELLOWTOWN
          </span>
        </div>
      )}
    </div>
  );
};
