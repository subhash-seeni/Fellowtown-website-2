import { type FC } from 'react';
import { FellowtownLogo } from './FellowtownLogo';
import { ArrowUpRight, ArrowUp, Compass } from 'lucide-react';

interface DualPortalFooterProps {
  onOpenAvailability?: () => void;
  onOpenOwnerDrawer?: () => void;
  onOpenTokens?: () => void;
}

export const DualPortalFooter: FC<DualPortalFooterProps> = ({
  onOpenAvailability,
  onOpenOwnerDrawer,
  onOpenTokens,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="dual-portal-footer"
      className="w-full bg-[#181D1E] text-[#F6F3EC] border-t-2 border-[#1E2426] py-14 sm:py-20 lg:py-28 px-5 sm:px-10 lg:px-16"
    >
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Two Clean Interactive Rows */}
        <div className="divide-y divide-[rgba(246,243,236,0.15)] border-y border-[rgba(246,243,236,0.15)]">
          {/* Row 1: Guests & Corporate Travel */}
          <div
            onClick={onOpenAvailability}
            className="py-10 sm:py-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 cursor-pointer group hover:bg-[#1E2426]/50 px-2 sm:px-4 transition-colors"
          >
            <div className="space-y-1">
              <span className="font-sans font-bold text-xs text-[#8C3B1A] uppercase tracking-wider block">
                GUEST & CORPORATE RESERVATIONS
              </span>
              <h3 className="fluid-section-heading font-display font-extrabold text-[#F6F3EC] tracking-tightest group-hover:text-[#DCA358] transition-colors">
                Need a stay or corporate block?
              </h3>
            </div>

            <div className="w-full sm:w-auto flex items-center justify-center gap-2 font-sans text-xs font-bold text-[#F6F3EC] group-hover:text-[#DCA358] transition-colors border border-[rgba(246,243,236,0.2)] px-8 py-4 min-h-[56px] bg-[#1E2426] group-hover:border-[#DCA358]">
              <span>BOOK A STAY</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Row 2: Building Owners & Real Estate Developers */}
          <div
            onClick={onOpenOwnerDrawer}
            className="py-10 sm:py-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 cursor-pointer group hover:bg-[#1E2426]/50 px-2 sm:px-4 transition-colors"
          >
            <div className="space-y-1">
              <span className="font-sans font-bold text-xs text-[#DCA358] uppercase tracking-wider block">
                ASSET PARTNERSHIP & LEASING
              </span>
              <h3 className="fluid-section-heading font-display font-extrabold text-[#F6F3EC] tracking-tightest group-hover:text-[#DCA358] transition-colors">
                Own a whole building in Ahmedabad?
              </h3>
            </div>

            <div className="w-full sm:w-auto flex items-center justify-center gap-2 font-sans text-xs font-bold text-[#1E2426] bg-[#DCA358] group-hover:bg-[#F6F3EC] px-8 py-4 min-h-[56px] transition-colors">
              <span>PARTNER WITH US</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Minimal Sub-Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 text-xs mono-label text-[#F6F3EC]/50">
          <div className="flex items-center gap-4">
            <FellowtownLogo inverted={true} size="sm" />
            <span>© 2026 FELLOWTOWN</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenTokens}
              className="hover:text-[#DCA358] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>TOKENS</span>
            </button>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="hover:text-[#F6F3EC] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#DCA358]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
