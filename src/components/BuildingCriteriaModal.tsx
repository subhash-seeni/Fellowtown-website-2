import { type FC } from 'react';
import { X, Check, Building2, FileCheck, Zap, MapPin, ArrowUpRight } from 'lucide-react';

interface BuildingCriteriaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOwnerForm?: () => void;
}

export const BuildingCriteriaModal: FC<BuildingCriteriaModalProps> = ({
  isOpen,
  onClose,
  onOpenOwnerForm,
}) => {
  if (!isOpen) return null;

  const criteriaList = [
    {
      num: '01',
      title: 'Whole Building or Dedicated Wing Only',
      desc: 'We operate standalone buildings or private partitioned wings (20 to 100+ units). We do NOT take scattered individual society flats, ensuring 100% security, staff control, and brand integrity.',
      icon: Building2,
      requirement: '20+ Units · Independent Access & Private Entry',
    },
    {
      num: '02',
      title: 'Commercial / Serviced Approvals & OC in Place',
      desc: 'Occupancy Certificate (OC) must be obtained. Valid zoning for serviced apartments, guest hospitality, or corporate long-stay accommodation.',
      icon: FileCheck,
      requirement: 'Full Clear Title · OC Received · Hospitality Compliant',
    },
    {
      num: '03',
      title: 'Dedicated Infrastructure, Power Backup & Fire NOC',
      desc: 'Independent electrical sub-meters per unit, 100% DG power backup for HVAC, high-pressure water supply, and certified Fire Department NOC compliance.',
      icon: Zap,
      requirement: '100% Generator Backup · Individual Meters · Certified Fire NOC',
    },
    {
      num: '04',
      title: 'Prime Corporate / Medical Corridor Proximity',
      desc: 'Located within 15–20 minutes of major commercial employment centers, high-growth corridors (GIFT City, SG Highway, Sanand, Prahlad Nagar), or premier medical campuses.',
      icon: MapPin,
      requirement: 'High Demand Rental Corridors · Seamless Transit Links',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1E2426]/75 backdrop-blur-xs cursor-pointer"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#FAF8F5] text-[#1E2426] border-2 border-[#1E2426] shadow-2xl overflow-y-auto flex flex-col z-10 animate-slideIn">
        {/* Header */}
        <div className="p-6 bg-[#1E2426] text-[#F6F3EC] flex items-center justify-between border-b border-[rgba(246,243,236,0.2)]">
          <div className="space-y-1">
            <div className="font-sans text-xs text-[#DCA358] font-bold uppercase tracking-wider">
              Asset Onboarding Criteria
            </div>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#F6F3EC] tracking-tightest">
              Building Qualification Criteria
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-[rgba(246,243,236,0.2)] rounded hover:bg-[#2C3538] transition-colors cursor-pointer text-[#F6F3EC]"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="font-sans text-sm sm:text-base text-[#1E2426]/80 leading-relaxed">
            Fellowtown only partners with asset owners where we can guarantee institutional-grade
            cleanliness, security, and yield. Review our 4 mandatory onboarding standards below:
          </p>

          {/* 4 Must-Have Cards */}
          <div className="grid grid-cols-1 gap-4">
            {criteriaList.map((crit) => {
              const Icon = crit.icon;
              return (
                <div
                  key={crit.num}
                  className="p-5 bg-white/70 border border-[rgba(30,36,38,0.15)] flex flex-col sm:flex-row sm:items-start gap-4 shadow-sm"
                >
                  <div className="w-10 h-10 rounded bg-[#1E2426] text-[#F6F3EC] flex items-center justify-center flex-shrink-0 font-bold mono-label text-xs">
                    <Icon className="w-5 h-5 text-[#DCA358]" />
                  </div>

                  <div className="space-y-1.5 flex-grow">
                    <div className="flex items-center justify-between">
                      <span className="mono-label text-[10px] text-[#8C3B1A] font-bold">
                        MUST-HAVE {crit.num}
                      </span>
                      <span className="mono-label text-[9px] px-2 py-0.5 bg-[#EFECE4] text-[#1E2426] font-semibold border border-[rgba(30,36,38,0.12)]">
                        MANDATORY
                      </span>
                    </div>

                    <h4 className="font-sans font-bold text-base text-[#1E2426]">
                      {crit.title}
                    </h4>

                    <p className="font-sans text-xs sm:text-sm text-[#1E2426]/75 leading-relaxed">
                      {crit.desc}
                    </p>

                    <div className="pt-2 flex items-center gap-1.5 text-xs mono-label text-[#4E6E58] font-bold">
                      <Check className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{crit.requirement}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Operational Covenant */}
          <div className="p-4 bg-[#EFECE4] border border-[rgba(30,36,38,0.14)] text-xs text-[#1E2426]/80 space-y-1">
            <span className="mono-label text-[10px] text-[#8C3B1A] font-bold block">
              FELLOWTOWN ASSET COVENANT
            </span>
            <p>
              Once qualified, Fellowtown assumes full management: custom modernist interior fit-out,
              24/7 staffing, guest screening, corporate rate contracting, and daily maintenance.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-[#FAF8F5] border-t border-[rgba(30,36,38,0.14)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="mono-label text-xs text-[#1E2426]/60">
            HAVE A QUALIFYING PROPERTY?
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                if (onOpenOwnerForm) onOpenOwnerForm();
              }}
              className="btn-tactile-flip flex-1 sm:flex-none px-6 py-3 font-sans font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>REQUEST TERM SHEET & AUDIT</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="px-4 py-3 border border-[rgba(30,36,38,0.2)] text-xs mono-label text-[#1E2426] hover:bg-[#EFECE4] cursor-pointer"
            >
              DISMISS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
