import { type FC } from 'react';
import { FellowtownLogo } from './FellowtownLogo';
import { ArrowUp, Compass } from 'lucide-react';

interface FooterProps {
  onOpenTokens?: () => void;
}

export const Footer: FC<FooterProps> = ({ onOpenTokens }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#FAF8F5] text-[#1E2426] border-t border-[rgba(30,36,38,0.14)]">
      {/* Top Hairline Grid Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[rgba(30,36,38,0.14)]">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <FellowtownLogo size="lg" />
            <p className="font-sans text-sm text-[#1E2426]/75 max-w-sm mt-3 leading-relaxed">
              Furnished city apartments with hotel service for a night, a week, or a year.
              Honoring Ahmedabad modernist architecture through raw plaster, permanent brick, and
              tactile modularity.
            </p>
            <div className="pt-2">
              <span className="mono-label text-[10px] text-[#8C3B1A] font-semibold block">
                NO GLOWING ORBS · NO NEON GRADIENTS · RAW TACTILE BRICK ONLY
              </span>
            </div>
          </div>

          {/* Quick Nav Columns */}
          <div className="md:col-span-2 space-y-3">
            <span className="mono-label text-xs text-[#8C3B1A] font-bold block">
              01 // THE STAY
            </span>
            <ul className="space-y-2 text-xs font-sans text-[#1E2426]/80">
              <li>
                <a href="#stay" className="hover:text-[#8C3B1A] transition-colors">
                  Nightly (1–6 Nights)
                </a>
              </li>
              <li>
                <a href="#stay" className="hover:text-[#8C3B1A] transition-colors">
                  Weekly (1–4 Weeks)
                </a>
              </li>
              <li>
                <a href="#stay" className="hover:text-[#8C3B1A] transition-colors">
                  Monthly & Long-Stay
                </a>
              </li>
              <li>
                <a href="#stay" className="hover:text-[#8C3B1A] transition-colors">
                  Corporate Blocks
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <span className="mono-label text-xs text-[#8C3B1A] font-bold block">
              02 // ARCHITECTURE
            </span>
            <ul className="space-y-2 text-xs font-sans text-[#1E2426]/80">
              <li>
                <a href="#units" className="hover:text-[#8C3B1A] transition-colors">
                  Atelier Studio
                </a>
              </li>
              <li>
                <a href="#units" className="hover:text-[#8C3B1A] transition-colors">
                  Brise-Soleil 1-Bed
                </a>
              </li>
              <li>
                <a href="#units" className="hover:text-[#8C3B1A] transition-colors">
                  Doshi Vault 2-Bed
                </a>
              </li>
              <li>
                <a href="#units" className="hover:text-[#8C3B1A] transition-colors">
                  Material Palette
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <span className="mono-label text-xs text-[#8C3B1A] font-bold block">
              03 // PRECINCT DATA
            </span>
            <div className="p-3 bg-[#EFECE4] border border-[rgba(30,36,38,0.12)] text-[11px] mono-label space-y-1 text-[#1E2426]/80">
              <div>LAT: 23.0225° N</div>
              <div>LON: 72.5714° E</div>
              <div>AHMEDABAD, GUJARAT, INDIA</div>
              <div className="text-[#8C3B1A] pt-1">DIRECT INQUIRY: STAY@FELLOWTOWN.COM</div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs mono-label text-[#1E2426]/60">
          <div className="flex items-center gap-4">
            <span>© 2026 FELLOWTOWN HOSPITALITY GROUP</span>
            <span>·</span>
            <button
              onClick={onOpenTokens}
              className="text-[#8C3B1A] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Compass className="w-3 h-3" />
              SYSTEM TOKENS SPEC
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#1E2426] transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#8C3B1A]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
