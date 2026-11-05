import { useState, type FC } from 'react';
import { X, Calendar, Check, ShieldCheck, Key, Clock, Bed, Sparkles } from 'lucide-react';
import type { StayTier } from './FellowtownLogo';

interface AvailabilityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTier: (tier: StayTier) => void;
  currentTier: StayTier;
}

export const AvailabilityDrawer: FC<AvailabilityDrawerProps> = ({
  isOpen,
  onClose,
  onSelectTier,
  currentTier,
}) => {
  const [selectedUnit, setSelectedUnit] = useState<'studio' | 'one-bed' | 'vault'>('studio');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  if (!isOpen) return null;

  const tierOptions: {
    tier: StayTier;
    label: string;
    sub: string;
    colorClass: string;
    accentHex: string;
    rate: string;
    serviceLevel: string;
  }[] = [
    {
      tier: 'nightly',
      label: 'NIGHTLY STAY',
      sub: '1 – 6 Nights',
      colorClass: 'bg-[#8C3B1A] text-[#F6F3EC]',
      accentHex: '#8C3B1A',
      rate: '₹8,500 / night',
      serviceLevel: 'Full 24/7 Hotel Turn-down, Fresh Linens, Aesop Bath Care',
    },
    {
      tier: 'weekly',
      label: 'WEEKLY RESIDENCY',
      sub: '1 – 4 Weeks',
      colorClass: 'bg-[#DCA358] text-[#1E2426]',
      accentHex: '#DCA358',
      rate: '₹42,000 / week',
      serviceLevel: 'Bi-weekly Deep Clean, Stocked Gourmet Pantry, Laundry Valet',
    },
    {
      tier: 'monthly',
      label: 'LONG-STAY & CORPORATE',
      sub: '1+ Months or Corporate Block',
      colorClass: 'bg-[#6C8793] text-[#F6F3EC]',
      accentHex: '#6C8793',
      rate: '₹1,25,000 / month',
      serviceLevel: 'Dedicated Concierge, Resident Parking, Custom Furniture Setup',
    },
  ];

  const handleTierChange = (tier: StayTier) => {
    onSelectTier(tier);
    window.dispatchEvent(
      new CustomEvent('fellowtown:tier', { detail: { tier, state: tier } })
    );
  };

  const handleConfirm = () => {
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      onClose();
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-stretch justify-center sm:justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1E2426]/50 backdrop-blur-xs transition-opacity duration-300 cursor-pointer"
      />

      {/* Mobile: Full-width bottom sheet (h-[90svh], rounded-t-[20px]) | Desktop: Slide-in Drawer */}
      <div className="relative w-full sm:max-w-lg bg-[#F6F3EC] text-[#1E2426] h-[90svh] sm:h-full overflow-y-auto rounded-t-[20px] sm:rounded-none border-t sm:border-t-0 sm:border-l border-[rgba(30,36,38,0.14)] shadow-2xl flex flex-col z-10 animate-slideIn">
        {/* Mobile Pull Handle */}
        <div className="sm:hidden w-full pt-3 pb-1 flex justify-center bg-[#EFECE4]/50">
          <div className="w-12 h-1 bg-[#1E2426]/30 rounded-full" />
        </div>

        {/* Top Architectural Header */}
        <div className="p-5 sm:p-6 border-b border-[rgba(30,36,38,0.14)] flex items-center justify-between bg-[#EFECE4]/50">
          <div>
            <div className="mono-label text-[10px] text-[#8C3B1A]">FELLOWTOWN · DIRECT RESERVATION</div>
            <h3 className="font-display font-extrabold text-2xl text-[#1E2426] tracking-tightest mt-0.5">Check Availability & Rates</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-[rgba(30,36,38,0.15)] rounded hover:bg-[#FAF8F5] transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5 text-[#1E2426]" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-grow">
          {/* Step 1: Select Stay Duration */}
          <div>
            <label className="font-sans font-semibold text-xs block mb-2.5 text-[#1E2426]/70 uppercase tracking-wider">
              Select Stay Duration
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              {tierOptions.map((opt) => {
                const isSelected = currentTier === opt.tier;
                return (
                  <button
                    key={opt.tier}
                    type="button"
                    onClick={() => handleTierChange(opt.tier)}
                    className={`p-4 border text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-[#1E2426] bg-[#FAF8F5] shadow-sm ring-1 ring-[#1E2426]'
                        : 'border-[rgba(30,36,38,0.15)] bg-white/40 hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full`}
                          style={{ backgroundColor: opt.accentHex }}
                        />
                        <span className="font-sans font-semibold text-sm tracking-wide">
                          {opt.label}
                        </span>
                      </div>
                      <span className="mono-label text-xs font-semibold text-[#1E2426]">
                        {opt.rate}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-xs text-[#1E2426]/70">
                      <span>{opt.sub}</span>
                      <span className="mono-label text-[10px]">{opt.serviceLevel.split(',')[0]}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Select Unit Architecture */}
          <div>
            <label className="font-sans font-semibold text-xs block mb-2.5 text-[#1E2426]/70 uppercase tracking-wider">
              Select Apartment Layout
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'studio' as const, name: 'Atelier Studio', area: '480 SQ FT', icon: Key },
                { id: 'one-bed' as const, name: '1-Bed Brise-Soleil', area: '780 SQ FT', icon: Bed },
                { id: 'vault' as const, name: '2-Bed Doshi Vault', area: '1,240 SQ FT', icon: Sparkles },
              ].map((unit) => {
                const isSelected = selectedUnit === unit.id;
                const UnitIcon = unit.icon;
                return (
                  <button
                    key={unit.id}
                    type="button"
                    onClick={() => setSelectedUnit(unit.id)}
                    className={`p-3 border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#8C3B1A] bg-[#8C3B1A]/5 text-[#8C3B1A] ring-1 ring-[#8C3B1A]'
                        : 'border-[rgba(30,36,38,0.15)] bg-white/40 hover:bg-white text-[#1E2426]'
                    }`}
                  >
                    <UnitIcon className="w-4 h-4 mb-2" />
                    <div className="font-sans font-semibold text-xs leading-tight">{unit.name}</div>
                    <div className="mono-label text-[9px] text-[#1E2426]/60 mt-1">{unit.area}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dates & Guests */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 border border-[rgba(30,36,38,0.15)] bg-white/40">
              <span className="mono-label text-[10px] text-[#1E2426]/60 block">CHECK-IN</span>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="w-3.5 h-3.5 text-[#8C3B1A]" />
                <span className="font-sans font-medium text-xs">Tomorrow, 15:00</span>
              </div>
            </div>
            <div className="p-3 border border-[rgba(30,36,38,0.15)] bg-white/40">
              <span className="mono-label text-[10px] text-[#1E2426]/60 block">RESIDENT GUESTS</span>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="w-3.5 h-3.5 text-[#8C3B1A]" />
                <span className="font-sans font-medium text-xs">1–2 Residents</span>
              </div>
            </div>
          </div>

          {/* Guaranteed Hospitality Standards */}
          <div className="p-4 bg-[#EFECE4]/50 border border-[rgba(30,36,38,0.12)] rounded space-y-2">
            <div className="mono-label text-[10px] text-[#1E2426]/70 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8C3B1A]" />
              THE FELLOWTOWN SERVICE ASSURANCE
            </div>
            <ul className="text-xs text-[#1E2426]/80 space-y-1 pl-4 list-disc">
              <li>Raw lime plaster thermal envelope (naturally 4°C cooler)</li>
              <li>Hotel-grade high thread count linens & organic mattress</li>
              <li>Fully equipped chef kitchen & Miele espresso setup</li>
              <li>No lock-in security deposits for vetted corporate stays</li>
            </ul>
          </div>
        </div>

        {/* Bottom Action Footer */}
        <div className="p-6 border-t border-[rgba(30,36,38,0.14)] bg-[#EFECE4]/30">
          {bookingSuccess ? (
            <div className="p-3.5 bg-[#4E6E58] text-[#F6F3EC] flex items-center justify-center gap-2 text-xs font-semibold font-sans">
              <Check className="w-4 h-4" />
              Reservation Requested • Concierge Dispatched
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleConfirm}
                className="btn-tactile-flip w-full py-4 flex items-center justify-center gap-2 font-sans font-semibold text-xs tracking-[0.12em] uppercase cursor-pointer"
              >
                <span>CONFIRM UNIT AVAILABILITY</span>
              </button>
              <div className="text-center font-sans text-xs text-[#1E2426]/60">
                No card charge until physical check-in
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
