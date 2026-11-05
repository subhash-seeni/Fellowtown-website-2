import { useState, type FC, type FormEvent } from 'react';
import { X, Check, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface OwnerPartnerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerPartnerDrawer: FC<OwnerPartnerDrawerProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({ name: '', details: '', contact: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-stretch justify-center sm:justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1E2426]/60 backdrop-blur-xs cursor-pointer"
      />

      {/* Mobile: Full-width bottom sheet (h-[90svh], rounded-t-[20px]) | Desktop: Slide-over Drawer */}
      <div className="relative w-full sm:max-w-lg bg-[#FAF8F5] text-[#1E2426] h-[90svh] sm:h-full overflow-y-auto rounded-t-[20px] sm:rounded-none border-t sm:border-t-0 sm:border-l-2 border-[#1E2426] shadow-2xl flex flex-col z-10 animate-slideIn">
        {/* Mobile Pull Handle */}
        <div className="sm:hidden w-full pt-3 pb-1 flex justify-center bg-[#1E2426]">
          <div className="w-12 h-1 bg-[#F6F3EC]/40 rounded-full" />
        </div>

        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-[#1E2426] text-[#F6F3EC] flex items-center justify-between border-b border-[rgba(246,243,236,0.2)]">
          <div>
            <div className="mono-label text-[10px] text-[#DCA358] font-bold">
              BUILDING PARTNERSHIP
            </div>
            <h3 className="font-display font-extrabold text-2xl text-[#F6F3EC] tracking-tightest">Partner With Us</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-[rgba(246,243,236,0.2)] rounded hover:bg-[#2C3538] text-[#F6F3EC] cursor-pointer"
            aria-label="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 flex-grow">
          <p className="font-sans text-sm text-[#1E2426]/80 leading-relaxed">
            Turn 20 to 100+ units into high-yield serviced residences with zero management friction.
          </p>

          {submitted ? (
            <div className="p-6 bg-[#4E6E58] text-[#F6F3EC] font-sans text-xs font-semibold flex items-center gap-2">
              <Check className="w-5 h-5" />
              Inquiry Logged • Dispatching Underwriting Team
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-sans font-semibold text-xs text-[#1E2426]/70 block mb-1 uppercase tracking-wider">
                  Your Name or Company
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Arvind Realty"
                  className="w-full p-3 bg-white border border-[rgba(30,36,38,0.2)] text-xs font-sans text-[#1E2426] focus:border-[#8C3B1A] focus:outline-none"
                />
              </div>

              <div>
                <label className="mono-label text-[10px] text-[#1E2426]/70 block mb-1">
                  BUILDING LOCATION & UNIT COUNT
                </label>
                <input
                  type="text"
                  required
                  value={form.details}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                  placeholder="e.g. SG Highway, 48 Studios"
                  className="w-full p-3 bg-white border border-[rgba(30,36,38,0.2)] text-xs font-sans text-[#1E2426] focus:border-[#8C3B1A] focus:outline-none"
                />
              </div>

              <div>
                <label className="mono-label text-[10px] text-[#1E2426]/70 block mb-1">
                  PHONE / EMAIL
                </label>
                <input
                  type="text"
                  required
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  placeholder="owner@entity.com"
                  className="w-full p-3 bg-white border border-[rgba(30,36,38,0.2)] text-xs font-sans text-[#1E2426] focus:border-[#8C3B1A] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="btn-tactile-flip w-full py-4 font-sans font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>REQUEST SITE VISIT & TERM SHEET</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[rgba(30,36,38,0.1)] text-xs mono-label text-[#1E2426]/60 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#8C3B1A]" />
            STANDALONE BUILDINGS · OC REQUIRED
          </div>
        </div>
      </div>
    </div>
  );
};
