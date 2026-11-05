import { useState, type FC } from 'react';
import { X, Copy, Check, Layers, Type, Palette } from 'lucide-react';
import { FellowtownLogo, type StayTier } from './FellowtownLogo';

interface DesignTokensModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTierChange: (tier: StayTier) => void;
  activeTier: StayTier;
}

export const DesignTokensModal: FC<DesignTokensModalProps> = ({
  isOpen,
  onClose,
  onTierChange,
  activeTier,
}) => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [previewInverted, setPreviewInverted] = useState(false);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, tokenName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(tokenName);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const colorTokens = [
    {
      name: '--bg-limestone',
      hex: '#F6F3EC',
      usage: 'Primary Guest canvas, plaster background',
      role: 'Canvas',
      textColor: '#1E2426',
    },
    {
      name: '--bg-charcoal',
      hex: '#1E2426',
      usage: 'Owner section canvas & primary structural ink',
      role: 'Structural Ink',
      textColor: '#F6F3EC',
    },
    {
      name: '--accent-terracotta',
      hex: '#8C3B1A',
      usage: 'Nightly stays: 1–6 nights, primary CTA button',
      role: 'Nightly Accent',
      textColor: '#F6F3EC',
    },
    {
      name: '--accent-ochre',
      hex: '#DCA358',
      usage: 'Weekly stays: 1–4 weeks residency',
      role: 'Weekly Accent',
      textColor: '#1E2426',
    },
    {
      name: '--accent-slate',
      hex: '#6C8793',
      usage: 'Monthly stays: 1+ months residential tenure',
      role: 'Monthly Accent',
      textColor: '#F6F3EC',
    },
    {
      name: '--accent-pine',
      hex: '#4E6E58',
      usage: 'Corporate reserved blocks & institutional units',
      role: 'Corporate Accent',
      textColor: '#F6F3EC',
    },
    {
      name: '--border-hairline',
      hex: 'rgba(30, 36, 38, 0.14)',
      usage: 'Exposed 1px architectural grid divisions',
      role: 'Hairline Grid',
      textColor: '#1E2426',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1E2426]/60 backdrop-blur-xs cursor-pointer"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#F6F3EC] text-[#1E2426] overflow-y-auto border border-[rgba(30,36,38,0.2)] shadow-2xl flex flex-col z-10">
        {/* Header */}
        <div className="p-6 border-b border-[rgba(30,36,38,0.14)] bg-[#EFECE4]/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#8C3B1A] flex items-center justify-center text-[#F6F3EC]">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <div className="mono-label text-[10px] text-[#8C3B1A]">FELLOWTOWN DESIGN SYSTEM</div>
              <h2 className="font-display font-extrabold text-2xl text-[#1E2426] tracking-tightest mt-0.5">Kinetic Neo-Brutalist Hospitality</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-[rgba(30,36,38,0.15)] rounded hover:bg-[#FAF8F5] transition-colors cursor-pointer"
            aria-label="Close Inspector"
          >
            <X className="w-5 h-5 text-[#1E2426]" />
          </button>
        </div>

        {/* Anti-AI Manifesto Callout */}
        <div className="p-6 bg-[#FAF8F5] border-b border-[rgba(30,36,38,0.14)]">
          <div className="font-sans text-xs text-[#8C3B1A] font-bold uppercase tracking-wider mb-1">DESIGN PHILOSOPHY</div>
          <p className="text-sm text-[#1E2426]/80 leading-relaxed">
            Inspired by <strong>Ahmedabad modernist architecture</strong> (BV Doshi, raw plaster, burnt brick, deep sun-cast shadows). Strictly <strong>NO</strong> dark-mode neon gradients, glowing orbs, purple/blue AI tropes, or glassmorphic bento grids. All spatial divisions use exposed 1px hairline grids with raw lime plaster texture.
          </p>
        </div>

        {/* Modal Sections */}
        <div className="p-6 space-y-8">
          {/* Section 1: Color Tokens */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#8C3B1A]" />
                <h3 className="mono-label text-xs font-semibold text-[#1E2426]">
                  01. COLOR TOKENS (AHMEDABAD MODERNIST PALETTE)
                </h3>
              </div>
              <span className="mono-label text-[10px] text-[#1E2426]/50">CLICK CARD TO COPY HEX</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {colorTokens.map((token) => (
                <div
                  key={token.name}
                  onClick={() => copyToClipboard(token.hex, token.name)}
                  className="p-3.5 border border-[rgba(30,36,38,0.14)] bg-white/50 hover:bg-white transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="mono-label text-[11px] font-bold text-[#1E2426]">
                      {token.name}
                    </span>
                    {copiedToken === token.name ? (
                      <Check className="w-3.5 h-3.5 text-[#4E6E58]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-[#1E2426]/30 group-hover:text-[#8C3B1A]" />
                    )}
                  </div>

                  <div className="my-2.5 flex items-center gap-3">
                    <div
                      className="w-10 h-10 border border-[rgba(30,36,38,0.15)] flex-shrink-0 flex items-center justify-center text-[10px] font-bold"
                      style={{
                        backgroundColor: token.hex,
                        color: token.textColor,
                      }}
                    >
                      AA
                    </div>
                    <div>
                      <div className="mono-label text-xs font-semibold text-[#1E2426]">{token.hex}</div>
                      <div className="text-[11px] text-[#1E2426]/70 leading-tight">{token.role}</div>
                    </div>
                  </div>

                  <div className="text-[10.5px] text-[#1E2426]/60 border-t border-[rgba(30,36,38,0.08)] pt-2 mt-1">
                    {token.usage}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Typography Stack */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Type className="w-4 h-4 text-[#8C3B1A]" />
              <h3 className="mono-label text-xs font-semibold text-[#1E2426]">
                02. TYPOGRAPHY (GOOGLE FONTS SUITE)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Syne Display */}
              <div className="p-4 border border-[rgba(30,36,38,0.14)] bg-white/50">
                <span className="mono-label text-[10px] text-[#8C3B1A] block">DISPLAY HEADINGS</span>
                <span className="font-sans font-semibold text-sm text-[#1E2426] block mt-1">
                  Syne (700 Bold, 800 ExtraBold)
                </span>
                <div className="mt-3 p-3 bg-[#FAF8F5] border border-[rgba(30,36,38,0.1)]">
                  <p className="font-display font-extrabold text-2xl text-[#1E2426] tracking-tightest leading-tight">
                    Ahmedabad Kinetic Form
                  </p>
                  <p className="font-display font-bold text-xl text-[#8C3B1A] tracking-tight mt-1">
                    Teenage Engineering x CitizenM
                  </p>
                </div>
              </div>

              {/* Space Grotesk */}
              <div className="p-4 border border-[rgba(30,36,38,0.14)] bg-white/50">
                <span className="mono-label text-[10px] text-[#8C3B1A] block">STRUCTURAL UI & BODY</span>
                <span className="font-sans font-semibold text-sm text-[#1E2426] block mt-1">
                  Space Grotesk (400, 500, 600)
                </span>
                <div className="mt-3 p-3 bg-[#FAF8F5] border border-[rgba(30,36,38,0.1)] space-y-1">
                  <p className="font-sans font-semibold text-sm tracking-wide">
                    FELLOWTOWN MODULAR HOSPITALITY
                  </p>
                  <p className="font-sans font-normal text-xs text-[#1E2426]/80 leading-relaxed">
                    Furnished city apartments with daily hotel service for a night, a week, or a year.
                  </p>
                </div>
              </div>

              {/* JetBrains Mono */}
              <div className="p-4 border border-[rgba(30,36,38,0.14)] bg-white/50">
                <span className="mono-label text-[10px] text-[#8C3B1A] block">TECHNICAL DATA & COORDINATES</span>
                <span className="font-sans font-semibold text-sm text-[#1E2426] block mt-1">
                  JetBrains Mono (0.08em tracking)
                </span>
                <div className="mt-3 p-3 bg-[#FAF8F5] border border-[rgba(30,36,38,0.1)] space-y-1.5">
                  <p className="mono-label text-[11px] text-[#1E2426]">
                    LAT 23.0225° N · LON 72.5714° E
                  </p>
                  <p className="mono-label text-[10px] text-[#8C3B1A]">
                    STUDIO 304 • SOLAR SUN-DIAL
                  </p>
                  <p className="mono-label text-[10px] text-[#1E2426]/60">
                    MODULE STATUS: RESERVED (WEEKLY)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Concept A Logo "The Living Elevation" Interactive Tester */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#8C3B1A]" />
                <h3 className="mono-label text-xs font-semibold text-[#1E2426]">
                  03. CONCEPT A LOGO: "THE LIVING ELEVATION" VECTOR TESTER
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <label className="mono-label text-[10px] text-[#1E2426]/70 flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={previewInverted}
                    onChange={(e) => setPreviewInverted(e.target.checked)}
                    className="accent-[#8C3B1A]"
                  />
                  INVERTED (OWNER CANVAS)
                </label>
              </div>
            </div>

            <div
              className={`p-6 border transition-colors duration-300 flex flex-col md:flex-row items-center justify-between gap-6 ${
                previewInverted
                  ? 'bg-[#1E2426] border-[#343D40] text-[#F6F3EC]'
                  : 'bg-[#FAF8F5] border-[rgba(30,36,38,0.15)] text-[#1E2426]'
              }`}
            >
              {/* Live Rendered Logo */}
              <div className="p-4 border border-dashed border-[rgba(30,36,38,0.2)] rounded">
                <FellowtownLogo
                  state={activeTier}
                  inverted={previewInverted}
                  size="lg"
                  interactive={false}
                />
              </div>

              {/* State Transition Controls */}
              <div className="flex flex-col gap-2">
                <span className="mono-label text-[10px] text-current/60">
                  TRIGGER VECTOR MORPH (GSAP ANIMATION):
                </span>
                <div className="flex flex-wrap gap-2">
                  {(['nightly', 'weekly', 'monthly'] as StayTier[]).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => onTierChange(tier)}
                      className={`px-3 py-1.5 mono-label text-xs border transition-all cursor-pointer ${
                        activeTier === tier
                          ? 'border-current font-bold bg-current/10 shadow-xs'
                          : 'border-current/30 hover:border-current opacity-70'
                      }`}
                    >
                      {tier.toUpperCase()} TIER
                    </button>
                  ))}
                </div>
                <div className="text-[11px] opacity-70 mt-1 max-w-sm">
                  {activeTier === 'nightly' && 'Nightly: 6 modules fill with #8C3B1A Terracotta, others #D9D4C7.'}
                  {activeTier === 'weekly' && 'Weekly: Middle rows morph fill to #DCA358 Ochre.'}
                  {activeTier === 'monthly' && 'Monthly: Top rows morph to #6C8793 Slate & #4E6E58 Pine.'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#EFECE4]/50 border-t border-[rgba(30,36,38,0.14)] flex items-center justify-between text-xs mono-label">
          <span>FELLOWTOWN SYSTEM SPECIFICATION V2.0</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1E2426] text-[#F6F3EC] hover:bg-[#8C3B1A] transition-colors cursor-pointer"
          >
            DISMISS INSPECTOR
          </button>
        </div>
      </div>
    </div>
  );
};
