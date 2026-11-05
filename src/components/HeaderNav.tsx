import { useState, useEffect, useRef, type FC } from 'react';
import { FellowtownLogo, type StayTier } from './FellowtownLogo';
import { ArrowUpRight, Calendar, X } from 'lucide-react';
import gsap from 'gsap';

interface HeaderNavProps {
  currentTier?: StayTier;
  onOpenAvailability?: () => void;
  onOpenTokens?: () => void;
}

export const HeaderNav: FC<HeaderNavProps> = ({
  currentTier = 'nightly',
  onOpenAvailability,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Stagger animation when opening full-screen mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(
        '.mobile-nav-item',
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'The Stay', target: 'stay', desc: 'Nightly · Weekly · Monthly' },
    { label: 'Inside a Unit', target: 'units', desc: 'Cross-Section & Inclusions' },
    { label: 'Who Lives Here', target: 'residents', desc: 'Professionals & Corporate Teams' },
    { label: 'For Owners', target: 'owners', desc: 'Asset Yield & Stewardship', external: true },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-[#F6F3EC]/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      {/* Clean Single Main Navigation Bar */}
      <div className="w-full border-b border-[rgba(30,36,38,0.14)] flex items-stretch justify-between">
        {/* Left Column: Living Elevation Logo */}
        <div className="px-4 sm:px-7 py-3.5 flex items-center border-r border-[rgba(30,36,38,0.14)] flex-shrink-0">
          <FellowtownLogo state={currentTier} size="md" />
        </div>

        {/* Center Grid: Desktop Nav Links with exposed 1px vertical borders */}
        <nav className="hidden lg:flex items-stretch flex-grow" aria-label="Main Navigation">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => scrollToSection(item.target)}
              className="group flex-1 px-6 py-4 flex items-center justify-between border-r border-[rgba(30,36,38,0.14)] hover:bg-[#EFECE4]/60 transition-colors duration-150 text-left cursor-pointer"
            >
              <span className="font-sans font-bold text-sm tracking-tight text-[#1E2426] group-hover:text-[#8C3B1A] transition-colors">
                {item.label}
                {item.external && (
                  <ArrowUpRight className="inline-block ml-1 w-3.5 h-3.5 text-[#1E2426]/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                )}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-[#8C3B1A] transition-colors"></span>
            </button>
          ))}
        </nav>

        {/* Right Column: Tactile CTA Button + Mobile Controls */}
        <div className="flex items-center">
          {/* Desktop [CHECK AVAILABILITY] Button */}
          <button
            onClick={onOpenAvailability}
            className="hidden sm:flex btn-tactile-flip px-6 sm:px-8 py-3.5 items-center justify-center gap-2 font-sans font-bold text-xs sm:text-[13px] tracking-wider uppercase cursor-pointer border-l border-[rgba(30,36,38,0.14)] shadow-sm min-h-[44px]"
            aria-label="Check Apartment Availability"
          >
            <Calendar className="w-3.5 h-3.5 text-[#F6F3EC]/80" />
            <span>CHECK AVAILABILITY</span>
          </button>

          {/* Compact Mobile "Book" Pill (< 640px) */}
          <button
            onClick={onOpenAvailability}
            className="sm:hidden mr-2 px-3.5 py-2 min-h-[44px] flex items-center justify-center bg-[#8C3B1A] text-[#F6F3EC] rounded-full font-sans font-bold text-xs tracking-wider uppercase cursor-pointer active:scale-95 transition-transform"
            aria-label="Book Apartment"
          >
            Book
          </button>

          {/* Architectural 2-Line Hamburger Toggle (< 1024px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 border-l border-[rgba(30,36,38,0.14)] text-[#1E2426] hover:bg-[#EFECE4] transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            <span
              className={`w-5 h-[2px] bg-[#1E2426] transition-transform duration-300 origin-center ${
                mobileMenuOpen ? 'rotate-45 translate-y-[4px]' : ''
              }`}
            />
            <span
              className={`w-5 h-[2px] bg-[#1E2426] transition-transform duration-300 origin-center ${
                mobileMenuOpen ? '-rotate-45 -translate-y-[4px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Full-Screen Mobile Architectural Menu Drawer */}
      {mobileMenuOpen && (
        <div
          ref={menuRef}
          className="lg:hidden fixed inset-0 z-50 bg-[#F6F3EC] flex flex-col justify-between animate-fadeIn p-6 sm:p-10 overflow-y-auto"
        >
          {/* Drawer Top Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-[rgba(30,36,38,0.14)]">
            <FellowtownLogo state={currentTier} size="md" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 border border-[rgba(30,36,38,0.2)] rounded-full hover:bg-[#EFECE4] text-[#1E2426] cursor-pointer"
              aria-label="Close Navigation Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Oversized Syne Navigation Links */}
          <div className="my-auto py-8 space-y-6">
            {navItems.map((item, idx) => (
              <div
                key={item.target}
                onClick={() => scrollToSection(item.target)}
                className="mobile-nav-item group cursor-pointer block pb-4 border-b border-[rgba(30,36,38,0.08)]"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#1E2426] tracking-tightest group-hover:text-[#8C3B1A] transition-colors">
                    {item.label}
                  </span>
                  <span className="mono-label text-xs text-[#8C3B1A] font-bold">
                    0{idx + 1}
                  </span>
                </div>
                <div className="font-sans text-xs text-[#1E2426]/60 mt-1">{item.desc}</div>
              </div>
            ))}
          </div>

          {/* Bottom Action Section */}
          <div className="pt-6 border-t border-[rgba(30,36,38,0.14)] space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAvailability) onOpenAvailability();
              }}
              className="btn-tactile-flip w-full py-4 min-h-[48px] flex items-center justify-center gap-2 font-sans font-bold text-xs tracking-wider uppercase cursor-pointer shadow-md rounded-xs"
            >
              <Calendar className="w-4 h-4 text-[#F6F3EC]" />
              <span>Check Availability & Rates</span>
            </button>
            <div className="text-center font-sans text-xs text-[#1E2426]/50">
              Ahmedabad & GIFT City • Fully Serviced Residences
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
