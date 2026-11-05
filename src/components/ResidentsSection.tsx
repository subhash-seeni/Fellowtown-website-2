import { type FC } from 'react';
import { Quote } from 'lucide-react';

export const ResidentsSection: FC = () => {
  const residents = [
    {
      name: 'Matteo Bellini',
      role: 'Visiting Professor of Architecture, Milan Polytechnic',
      stay: '3-WEEK RESIDENCY (WEEKLY TIER)',
      quote:
        'The deep window jamb cuts the Ahmedabad desert heat like a razor. To sit on raw lime plaster with 1 Gbps fiber and hotel linen is the purest luxury an architect could request.',
      unit: 'BRIS-SOLEIL 1-BED // UNIT 402',
    },
    {
      name: 'Dr. Ananya Sarabhai',
      role: 'Biotech Founder & Global Health Fellow',
      stay: '6-MONTH SABBATICAL (MONTHLY TIER)',
      quote:
        'In traditional apartments, setting up utilities and domestic help consumes months. At Fellowtown, I unpacked my bag, brewed single-origin coffee, and began writing my clinical trial paper on day one.',
      unit: 'DOSHI VAULT // UNIT 601',
    },
    {
      name: 'Kaelen Thorne',
      role: 'Editorial Director & Design Author',
      stay: '5-NIGHT RESEARCH IMMERSION (NIGHTLY TIER)',
      quote:
        'There are no glowing tech gimmicks here—just honest bricks, morning shadow cast, and an evening glass of wine in the courtyard with fellow thinkers.',
      unit: 'ATELIER STUDIO // UNIT 204',
    },
  ];

  const communalSpaces = [
    {
      title: 'The Sunken Amphitheater',
      desc: 'Step-well inspired brick conversation arena for acoustic lectures and sundown discussions.',
      tag: 'ACOUSTIC SHADOW',
    },
    {
      title: 'The Modernist Library',
      desc: 'Over 1,200 monographs on South Asian and Mediterranean architecture with silent reading bays.',
      tag: 'OPEN 24/7',
    },
    {
      title: 'The Courtyard Hearth',
      desc: 'Morning pour-overs from local roasters and evening communal aperitivo every Thursday.',
      tag: 'STEWARDED DAILY',
    },
  ];

  return (
    <section id="community-society" className="w-full border-b border-[rgba(30,36,38,0.14)] py-20 bg-[#F6F3EC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="pb-12 border-b border-[rgba(30,36,38,0.14)] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="mono-label text-xs text-[#8C3B1A]">03 // THE FELLOWTOWN SOCIETY</div>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1E2426]">Who Lives Here</h2>
            <p className="font-sans text-base text-[#1E2426]/70 max-w-xl">
              A self-selecting guild of creators, researchers, and global citizens who value deep
              focus, material authenticity, and quiet camaraderie over commercial hospitality.
            </p>
          </div>

          <div className="mono-label text-xs text-[#1E2426]/60 border border-[rgba(30,36,38,0.2)] px-4 py-2 bg-[#FAF8F5]">
            COMMUNITY CURATION: 100% VETTED RESIDENCY
          </div>
        </div>

        {/* Resident Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
          {residents.map((r, idx) => (
            <div
              key={idx}
              className="p-8 bg-[#FAF8F5] border border-[rgba(30,36,38,0.14)] flex flex-col justify-between shadow-sun-cast relative"
            >
              <Quote className="w-8 h-8 text-[#8C3B1A]/30 mb-4" />

              <div className="space-y-4">
                <p className="font-serif italic text-xl text-[#1E2426] leading-relaxed">
                  "{r.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[rgba(30,36,38,0.1)] space-y-1">
                <div className="font-sans font-semibold text-base text-[#1E2426]">{r.name}</div>
                <div className="text-xs text-[#1E2426]/70 leading-snug">{r.role}</div>
                <div className="mono-label text-[9.5px] text-[#8C3B1A] pt-1 font-bold">
                  {r.stay}
                </div>
                <div className="mono-label text-[9px] text-[#1E2426]/50">{r.unit}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Communal Spaces Grid */}
        <div className="mt-16 pt-12 border-t border-[rgba(30,36,38,0.14)]">
          <div className="mono-label text-xs text-[#8C3B1A] mb-6">
            COMMUNAL COMMONS // SHARED AMENITIES
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {communalSpaces.map((space, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#EFECE4]/60 border border-[rgba(30,36,38,0.12)] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="mono-label text-[10px] text-[#8C3B1A]">0{idx + 1} // COMMONS</span>
                  <span className="mono-label text-[9px] text-[#1E2426]/60 border border-[rgba(30,36,38,0.2)] px-1.5 py-0.5">
                    {space.tag}
                  </span>
                </div>
                <h4 className="font-serif text-2xl text-[#1E2426]">{space.title}</h4>
                <p className="text-xs text-[#1E2426]/75 leading-relaxed">{space.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
