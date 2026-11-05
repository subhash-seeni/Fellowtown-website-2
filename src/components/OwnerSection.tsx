import { useState, type FC, type FormEvent } from 'react';
import { FellowtownLogo } from './FellowtownLogo';
import { TrendingUp, ShieldCheck, Building, Check, ArrowUpRight } from 'lucide-react';

export const OwnerSection: FC = () => {
  const [inquirySent, setInquirySent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    units: '1-5 Units',
    location: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 3000);
  };

  return (
    <section
      id="owners"
      className="w-full bg-[#1E2426] text-[#F6F3EC] py-24 border-b border-[rgba(246,243,236,0.15)] relative overflow-hidden"
    >
      {/* Background Architectural Grid Hairline */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] flex justify-between">
        <div className="w-px h-full bg-[#F6F3EC] ml-[25%]"></div>
        <div className="w-px h-full bg-[#F6F3EC] ml-[25%]"></div>
        <div className="w-px h-full bg-[#F6F3EC] ml-[25%]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Section Header with Inverted Logo */}
        <div className="pb-12 border-b border-[rgba(246,243,236,0.15)] flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2C3538] border border-[rgba(246,243,236,0.2)] mono-label text-[10px] text-[#DCA358]">
              04 // INSTITUTIONAL REAL ESTATE & STEWARDSHIP
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F6F3EC]">
              For Building Owners & Capital
            </h2>
            <p className="font-sans text-base text-[#F6F3EC]/70 max-w-2xl leading-relaxed">
              We convert high-potential urban residential buildings into premium serviced residences.
              Owners receive predictable institutional net yields, zero tenant-management friction,
              and meticulous architectural preservation.
            </p>
          </div>

          {/* Living Elevation Logo in Inverted Dark Canvas */}
          <div className="p-4 border border-[rgba(246,243,236,0.15)] bg-[#2C3538]/50 flex flex-col gap-2">
            <span className="mono-label text-[9px] text-[#F6F3EC]/50">
              LOGO ADAPTATION // CHARCOAL INK
            </span>
            <FellowtownLogo inverted={true} size="md" />
          </div>
        </div>

        {/* 3 Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 border-b border-[rgba(246,243,236,0.15)]">
          <div className="p-8 border border-[rgba(246,243,236,0.15)] bg-[#262D30] space-y-4">
            <div className="flex items-center justify-between">
              <span className="mono-label text-xs text-[#DCA358]">YIELD PERFORMANCE</span>
              <TrendingUp className="w-5 h-5 text-[#DCA358]" />
            </div>
            <div className="font-serif text-5xl text-[#F6F3EC]">+32.4%</div>
            <div className="font-sans font-medium text-sm text-[#F6F3EC]/90">
              Net Revenue Yield vs Traditional 11-Month Leases
            </div>
            <p className="text-xs text-[#F6F3EC]/60 leading-relaxed">
              By blending high-margin nightly rates with consistent weekly and monthly baselines, we
              maximize RevPAU (Revenue Per Available Unit).
            </p>
          </div>

          <div className="p-8 border border-[rgba(246,243,236,0.15)] bg-[#262D30] space-y-4">
            <div className="flex items-center justify-between">
              <span className="mono-label text-xs text-[#6C8793]">OCCUPANCY BASELINE</span>
              <Building className="w-5 h-5 text-[#6C8793]" />
            </div>
            <div className="font-serif text-5xl text-[#F6F3EC]">94.2%</div>
            <div className="font-sans font-medium text-sm text-[#F6F3EC]/90">
              Annual Average Portfolio Occupancy
            </div>
            <p className="text-xs text-[#F6F3EC]/60 leading-relaxed">
              Underwritten by direct corporate housing relationships, design university faculty,
              and repeat global fellows.
            </p>
          </div>

          <div className="p-8 border border-[rgba(246,243,236,0.15)] bg-[#262D30] space-y-4">
            <div className="flex items-center justify-between">
              <span className="mono-label text-xs text-[#4E6E58]">PRESERVATION</span>
              <ShieldCheck className="w-5 h-5 text-[#4E6E58]" />
            </div>
            <div className="font-serif text-5xl text-[#F6F3EC]">100%</div>
            <div className="font-sans font-medium text-sm text-[#F6F3EC]/90">
              In-House Hospitality Stewards & Maintenance
            </div>
            <p className="text-xs text-[#F6F3EC]/60 leading-relaxed">
              No DIY tenants driving nails into plaster. Daily inspection and regular maintenance
              preserve your physical asset in pristine showroom grade.
            </p>
          </div>
        </div>

        {/* Partnership Models & Owner Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16 items-start">
          <div className="lg:col-span-6 space-y-6">
            <div className="mono-label text-xs text-[#DCA358]">PARTNERSHIP STRUCTURES</div>
            <h3 className="font-serif text-3xl text-[#F6F3EC]">
              How we partner with property owners
            </h3>

            <div className="space-y-4">
              <div className="p-4 border border-[rgba(246,243,236,0.12)] bg-[#262D30]">
                <div className="font-sans font-semibold text-sm text-[#F6F3EC]">
                  A. Master Lease (Guaranteed Fixed Revenue)
                </div>
                <p className="text-xs text-[#F6F3EC]/70 mt-1">
                  Fellowtown leases your entire floorplate or building on a 5–10 year term, paying
                  you guaranteed monthly rent backed by corporate balance sheet covenants.
                </p>
              </div>

              <div className="p-4 border border-[rgba(246,243,236,0.12)] bg-[#262D30]">
                <div className="font-sans font-semibold text-sm text-[#F6F3EC]">
                  B. Management Agreement (Revenue Share)
                </div>
                <p className="text-xs text-[#F6F3EC]/70 mt-1">
                  We furnish, brand, staff, and operate your property under the Fellowtown flag,
                  sharing gross operating profits (typically generating 25–40% premium over fixed leases).
                </p>
              </div>
            </div>
          </div>

          {/* Owner Inquiry Form */}
          <div className="lg:col-span-6 bg-[#262D30] border border-[rgba(246,243,236,0.2)] p-8">
            <div className="mono-label text-xs text-[#DCA358] mb-1">CONNECT WITH OUR ACQUISITION TEAM</div>
            <h4 className="font-serif text-2xl text-[#F6F3EC] mb-6">Submit Your Property</h4>

            {inquirySent ? (
              <div className="p-6 bg-[#4E6E58] text-[#F6F3EC] flex items-center gap-3 mono-label text-xs">
                <Check className="w-5 h-5 flex-shrink-0" />
                <span>INQUIRY LOGGED. AN ACQUISITIONS DIRECTOR WILL CONTACT YOU WITHIN 24 HOURS.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mono-label text-[10px] text-[#F6F3EC]/70 block mb-1">
                    FULL NAME / ENTITY
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarabhai Realty Group"
                    className="w-full p-3 bg-[#1E2426] border border-[rgba(246,243,236,0.2)] text-sm text-[#F6F3EC] focus:border-[#DCA358] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mono-label text-[10px] text-[#F6F3EC]/70 block mb-1">
                      DIRECT EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="owner@domain.com"
                      className="w-full p-3 bg-[#1E2426] border border-[rgba(246,243,236,0.2)] text-sm text-[#F6F3EC] focus:border-[#DCA358] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mono-label text-[10px] text-[#F6F3EC]/70 block mb-1">
                      PORTFOLIO SCALE
                    </label>
                    <select
                      value={formData.units}
                      onChange={(e) => setFormData({ ...formData, units: e.target.value })}
                      className="w-full p-3 bg-[#1E2426] border border-[rgba(246,243,236,0.2)] text-sm text-[#F6F3EC] focus:border-[#DCA358] focus:outline-none"
                    >
                      <option>1–5 Units</option>
                      <option>6–20 Units</option>
                      <option>Entire Building (20+ Units)</option>
                      <option>New Development Land</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mono-label text-[10px] text-[#F6F3EC]/70 block mb-1">
                    PROPERTY LOCATION / CITY
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Ellis Bridge / Bodakdev, Ahmedabad"
                    className="w-full p-3 bg-[#1E2426] border border-[rgba(246,243,236,0.2)] text-sm text-[#F6F3EC] focus:border-[#DCA358] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#8C3B1A] hover:bg-[#DCA358] hover:text-[#1E2426] text-[#F6F3EC] font-sans font-semibold text-xs tracking-[0.1em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span>REQUEST OWNER PROSPECTUS & YIELD AUDIT</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
