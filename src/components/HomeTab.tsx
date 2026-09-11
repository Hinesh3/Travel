import React from 'react';

interface HomeTabProps {
  onGoToExplore: () => void;
  onFilterDistrict: (district: string) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ onGoToExplore, onFilterDistrict }) => {
  return (
    <div className="flex flex-col gap-5 pb-8 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-md border border-[#e2e6ec] bg-gradient-to-br from-[#006161] to-[#0f7c7c] text-white p-6">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase mb-2">
            <span className="material-symbols-outlined text-[14px]">explore</span>
            Welcome to Kyoto
          </span>
          <h2 className="font-heading text-[22px] font-bold leading-tight">
            The Ancient Capital Through Fellow Travelers&apos; Eyes
          </h2>
          <p className="text-[13px] text-white/80 mt-1.5 leading-relaxed">
            Real-time local insights, quiet hours, and verified etiquette tips across Kyoto&apos;s 11 historical wards.
          </p>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={onGoToExplore}
              className="px-4 py-2 bg-white text-[#006161] text-[13px] font-bold rounded-xl shadow-xs hover:bg-[#f1f3ff] transition-all"
            >
              Browse Live Tips
            </button>
          </div>
        </div>
      </div>

      {/* Live Conditions Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e6ec]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading text-[15px] font-bold text-[#0a1a3a]">
            Today in Kyoto • Weather & Crowds
          </h3>
          <span className="text-[11px] bg-[#059669]/10 text-[#059669] font-bold px-2 py-0.5 rounded-full">
            Optimal Visiting Conditions
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-[#f1f3ff] rounded-xl p-3 flex items-center gap-3">
            <span className="material-symbols-outlined text-[#d97706] text-[28px]">wb_sunny</span>
            <div>
              <div className="text-[18px] font-bold text-[#0a1a3a]">21°C / 70°F</div>
              <div className="text-[11px] text-[#68778d]">Mild autumn breeze</div>
            </div>
          </div>

          <div className="bg-[#f1f3ff] rounded-xl p-3 flex items-center gap-3">
            <span className="material-symbols-outlined text-[#006161] text-[28px]">groups</span>
            <div>
              <div className="text-[18px] font-bold text-[#006161]">Moderate</div>
              <div className="text-[11px] text-[#68778d]">Arashiyama & Gion peak at 2 PM</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Explore by District */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e6ec]">
        <h3 className="font-heading text-[15px] font-bold text-[#0a1a3a] mb-3">
          Popular Kyoto Districts
        </h3>

        <div className="grid grid-cols-2 gap-2.5">
          {[
            {
              name: 'Gion & Higashiyama',
              desc: 'Teahouses & Geisha culture',
              icon: 'temple_buddhist',
              bg: 'from-amber-500/10 to-orange-500/10'
            },
            {
              name: 'Sanjo / Downtown',
              desc: 'Gyoza, craft beer & shopping',
              icon: 'storefront',
              bg: 'from-teal-500/10 to-emerald-500/10'
            },
            {
              name: 'Fushimi Inari',
              desc: '10,000 Vermilion torii gates',
              icon: 'hiking',
              bg: 'from-red-500/10 to-rose-500/10'
            },
            {
              name: 'Nishiki Market',
              desc: 'Kyoto’s kitchen & street skewers',
              icon: 'restaurant',
              bg: 'from-purple-500/10 to-indigo-500/10'
            }
          ].map((item) => (
            <div
              key={item.name}
              onClick={() => onFilterDistrict(item.name)}
              className="p-3 rounded-xl border border-[#e2e6ec] bg-[#faf8ff] hover:bg-[#f1f3ff] cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="material-symbols-outlined text-[#006161] text-[20px]">
                  {item.icon}
                </span>
                <span className="text-[13px] font-bold text-[#0a1a3a] truncate">{item.name}</span>
              </div>
              <span className="text-[11px] text-[#68778d]">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Solo Traveler Rules of Thumb */}
      <div className="bg-[#006161]/5 rounded-2xl p-4 border border-[#006161]/20">
        <div className="flex items-center gap-2 text-[#006161] font-bold text-[14px] mb-2">
          <span className="material-symbols-outlined text-[18px]">verified_user</span>
          Kyoto Solo Travel Rules of Thumb
        </div>
        <ul className="text-[12px] text-[#0a1a3a] space-y-1.5 pl-4 list-disc marker:text-[#006161]">
          <li>Always carry some cash (many backstreet izakayas and shrines do not take cards).</li>
          <li>Remove your shoes when you see a wooden step or tatami mat in traditional establishments.</li>
          <li>Never walk and eat simultaneously in busy alleys like Nishiki Market or Gion.</li>
          <li>Early mornings (before 7:30 AM) offer peaceful photo walks without large bus groups.</li>
        </ul>
      </div>
    </div>
  );
};
