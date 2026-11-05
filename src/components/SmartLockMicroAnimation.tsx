import { useState, useEffect, useRef, type FC } from 'react';
import gsap from 'gsap';
import { Lock, Check } from 'lucide-react';

interface SmartLockMicroAnimationProps {
  isActive?: boolean;
}

export const SmartLockMicroAnimation: FC<SmartLockMicroAnimationProps> = ({
  isActive = false,
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [phoneOffset, setPhoneOffset] = useState(0); // -100 to 0 (closer)

  const containerRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<SVGGElement | null>(null);
  const lockRef = useRef<SVGGElement | null>(null);
  const wave1Ref = useRef<SVGCircleElement | null>(null);
  const wave2Ref = useRef<SVGCircleElement | null>(null);
  const wave3Ref = useRef<SVGCircleElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);

  // Trigger unlocking sequence with GSAP elastic spring bounce
  const triggerUnlock = () => {
    setIsUnlocked(true);

    // Haptic vibration feedback if supported
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([40, 60, 40]);
      } catch {
        // Ignore
      }
    }

    // Phone slide forward & lock bounce
    if (phoneRef.current && lockRef.current) {
      gsap.to(phoneRef.current, {
        x: 160,
        duration: 0.6,
        ease: 'power2.out',
      });

      gsap.fromTo(
        lockRef.current,
        { scale: 0.94 },
        { scale: 1, duration: 0.7, ease: 'elastic.out(1.2, 0.4)' }
      );
    }

    // Large radial screen-filling sonic waves in Terracotta & Pine
    const waves = [wave1Ref.current, wave2Ref.current, wave3Ref.current];
    waves.forEach((wave, i) => {
      if (wave) {
        gsap.fromTo(
          wave,
          { r: 20, opacity: 0.9 },
          {
            r: 160 + i * 50,
            opacity: 0,
            duration: 1.2,
            delay: i * 0.15,
            ease: 'power2.out',
          }
        );
      }
    });

    // Badge pop animation
    if (badgeRef.current) {
      gsap.fromTo(
        badgeRef.current,
        { scale: 0.85, y: -6 },
        { scale: 1, y: 0, duration: 0.45, ease: 'back.out(2)' }
      );
    }
  };

  const resetLock = () => {
    setIsUnlocked(false);
    if (phoneRef.current) {
      gsap.to(phoneRef.current, {
        x: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  // Auto-trigger when slide becomes active
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isActive) {
      timer = setTimeout(() => {
        triggerUnlock();
      }, 350);
    } else {
      resetLock();
    }
    return () => clearTimeout(timer);
  }, [isActive]);

  // Magnetic cursor interaction: mouse moving horizontally pulls the phone
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isUnlocked) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (e.clientX - rect.left) / rect.width; // 0 to 1
    const pullX = Math.max(0, Math.min(130, relX * 180));
    setPhoneOffset(pullX);

    if (pullX > 110 && !isUnlocked) {
      triggerUnlock();
    }
  };

  // Touch interaction: dragging finger horizontally pulls the phone
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isUnlocked || e.touches.length === 0) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const touch = e.touches[0];
    const relX = (touch.clientX - rect.left) / rect.width;
    const pullX = Math.max(0, Math.min(130, relX * 180));
    setPhoneOffset(pullX);
    if (pullX > 90 && !isUnlocked) {
      triggerUnlock();
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onClick={() => {
        if (!isUnlocked) triggerUnlock();
        else {
          resetLock();
          setTimeout(triggerUnlock, 250);
        }
      }}
      className="relative w-full h-[45svh] lg:h-[65vh] flex flex-col items-center justify-center select-none cursor-pointer active:cursor-grabbing"
      title="Move phone toward the lock or click to test door access"
    >
      {/* Status Badge */}
      <div
        ref={badgeRef}
        className={`mb-6 px-6 py-2.5 font-sans text-xs sm:text-sm font-semibold tracking-wide rounded-full border-2 transition-all duration-300 shadow-md ${
          isUnlocked
            ? 'bg-[#4E6E58] text-[#F6F3EC] border-[#4E6E58]'
            : 'bg-[#1E2426] text-[#F6F3EC] border-[#1E2426]'
        }`}
      >
        {isUnlocked ? (
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#F6F3EC]" />
            Door Unlocked • Welcome In
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#DCA358]" />
            Tap Phone to Unlock
          </span>
        )}
      </div>

      {/* Massive Unboxed SVG Canvas (Occupying 65% Viewport Height Directly on Canvas) */}
      <svg
        viewBox="0 0 700 420"
        className="w-full h-full max-h-[56vh] overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Radial Sonic Waves (Screen-Filling) */}
        <circle
          ref={wave1Ref}
          cx="480"
          cy="210"
          r="0"
          stroke="#8C3B1A"
          strokeWidth="3.5"
          opacity="0"
        />
        <circle
          ref={wave2Ref}
          cx="480"
          cy="210"
          r="0"
          stroke="#DCA358"
          strokeWidth="2.5"
          opacity="0"
        />
        <circle
          ref={wave3Ref}
          cx="480"
          cy="210"
          r="0"
          stroke="#4E6E58"
          strokeWidth="2"
          opacity="0"
        />

        {/* Minimalist Architectural Wall Axis Line */}
        <line
          x1="50"
          y1="210"
          x2="650"
          y2="210"
          stroke="rgba(30, 36, 38, 0.12)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* ======================================================== */}
        {/* SMARTPHONE (Left Side, Slides Horizontally toward Lock) */}
        {/* ======================================================== */}
        <g
          ref={phoneRef}
          transform={`translate(${isUnlocked ? 160 : phoneOffset}, 0)`}
          className="transition-transform duration-100"
        >
          {/* Phone Shadow */}
          <rect
            x="85"
            y="65"
            width="145"
            height="290"
            rx="24"
            fill="rgba(30,36,38,0.12)"
          />

          {/* Phone Hardware Body (Brutalist Minimalist Edge) */}
          <rect
            x="80"
            y="60"
            width="145"
            height="290"
            rx="24"
            fill="#FAF8F5"
            stroke="#1E2426"
            strokeWidth="3"
          />

          {/* Phone Screen Canvas (Charcoal Black OLED) */}
          <rect
            x="90"
            y="75"
            width="125"
            height="260"
            rx="16"
            fill="#1E2426"
          />

          {/* Screen Content: Digital Key Interface */}
          {/* Top Notch bar */}
          <rect x="135" y="82" width="35" height="5" rx="2.5" fill="#FAF8F5" opacity="0.3" />

          {/* App Brand Header */}
          <text
            x="152"
            y="112"
            fill="#F6F3EC"
            fontSize="10"
            fontFamily="Space Grotesk"
            fontWeight="bold"
            letterSpacing="0.14em"
            textAnchor="middle"
          >
            FELLOWTOWN
          </text>
          <text
            x="152"
            y="126"
            fill="#DCA358"
            fontSize="8"
            fontFamily="Space Grotesk"
            textAnchor="middle"
          >
            DIGITAL KEY
          </text>

          {/* Keyless Card Graphic inside Phone Screen */}
          <rect
            x="102"
            y="145"
            width="101"
            height="140"
            rx="10"
            fill={isUnlocked ? '#4E6E58' : '#2A3336'}
            stroke={isUnlocked ? '#F6F3EC' : 'rgba(255,255,255,0.2)'}
            strokeWidth="1.5"
            className="transition-colors duration-300"
          />

          {/* Room Number on Screen Card */}
          <text
            x="152"
            y="178"
            fill="#F6F3EC"
            fontSize="18"
            fontFamily="Syne"
            fontWeight="800"
            textAnchor="middle"
          >
            304
          </text>
          <text
            x="152"
            y="196"
            fill={isUnlocked ? '#F6F3EC' : '#DCA358'}
            fontSize="7.5"
            fontFamily="Space Grotesk"
            textAnchor="middle"
          >
            {isUnlocked ? 'UNLOCKED' : 'HOLD NEAR LOCK'}
          </text>

          {/* Dynamic Wave Icon on Phone Screen */}
          <circle cx="152" cy="235" r="18" stroke="#F6F3EC" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="152" cy="235" r="10" stroke="#F6F3EC" strokeWidth="1.5" />
          <circle cx="152" cy="235" r="4" fill={isUnlocked ? '#F6F3EC' : '#8C3B1A'} />
        </g>

        {/* ======================================================== */}
        {/* MATTE-BLACK MODERNIST SMART LOCK (Right Side)           */}
        {/* ======================================================== */}
        <g ref={lockRef} transform="translate(0, 0)">
          {/* Lock Shadow */}
          <rect
            x="425"
            y="45"
            width="120"
            height="330"
            rx="14"
            fill="rgba(30,36,38,0.15)"
          />

          {/* Lock Escutcheon Plate (Matte Charcoal Brutalist Hardware) */}
          <rect
            x="420"
            y="40"
            width="120"
            height="330"
            rx="14"
            fill="#1E2426"
            stroke="#1E2426"
            strokeWidth="3.5"
          />

          {/* Brushed Metal Bevel Accent */}
          <rect
            x="426"
            y="46"
            width="108"
            height="318"
            rx="10"
            stroke="rgba(246, 243, 236, 0.12)"
            strokeWidth="1.5"
          />

          {/* Smart Lock LED Circular Sensor Area */}
          <circle
            cx="480"
            cy="125"
            r="38"
            fill={isUnlocked ? '#4E6E58' : '#262D30'}
            stroke={isUnlocked ? '#F6F3EC' : 'rgba(255,255,255,0.2)'}
            strokeWidth="2.5"
            className="transition-colors duration-300"
          />

          {/* Lock / Unlock Icon Morph */}
          {isUnlocked ? (
            <g transform="translate(464, 108)">
              <path
                d="M6 18L13 25L28 9"
                stroke="#F6F3EC"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          ) : (
            <g transform="translate(468, 110)">
              <rect x="2" y="11" width="20" height="15" rx="3" stroke="#DCA358" strokeWidth="2.5" />
              <path d="M6 11V7C6 4.79 7.79 3 10 3C12.21 3 14 4.79 14 7V11" stroke="#DCA358" strokeWidth="2.5" />
            </g>
          )}

          {/* Modernist Geometric Keypad Points */}
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => (
              <circle
                key={`${r}-${c}`}
                cx={456 + c * 24}
                cy={188 + r * 20}
                r="3"
                fill={isUnlocked ? '#4E6E58' : 'rgba(246,243,236,0.3)'}
                className="transition-colors duration-300"
              />
            ))
          )}

          {/* Solid Brutalist Door Lever Handle */}
          <g
            transform={isUnlocked ? 'rotate(16 480 285)' : 'rotate(0 480 285)'}
            className="transition-transform duration-300"
          >
            {/* Handle Pivot */}
            <circle cx="480" cy="285" r="18" fill="#2C3538" stroke="#1E2426" strokeWidth="2" />
            {/* Heavy Horizontal Lever */}
            <rect
              x="360"
              y="273"
              width="120"
              height="24"
              rx="5"
              fill="#1E2426"
              stroke="rgba(246,243,236,0.2)"
              strokeWidth="1.5"
            />
            {/* Grip Grooves */}
            <line x1="380" y1="279" x2="380" y2="291" stroke="rgba(246,243,236,0.3)" strokeWidth="2" />
            <line x1="390" y1="279" x2="390" y2="291" stroke="rgba(246,243,236,0.3)" strokeWidth="2" />
            <line x1="400" y1="279" x2="400" y2="291" stroke="rgba(246,243,236,0.3)" strokeWidth="2" />
          </g>
        </g>
      </svg>

      {/* Micro-Guidance */}
      <div className="mt-4 text-xs font-sans text-[#1E2426]/60">
        Move phone or click lock to test keyless access
      </div>
    </div>
  );
};
