import React, { useState } from 'react';

interface FilterByPlaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDistrict: string;
  onSelectDistrict: (district: string) => void;
}

const DISTRICTS = [
  { name: 'All Kyoto', icon: 'map', count: '32 tips' },
  { name: 'Gion & Higashiyama', icon: 'temple_buddhist', count: '11 tips' },
  { name: 'Sanjo / Downtown', icon: 'storefront', count: '8 tips' },
  { name: 'Fushimi Inari', icon: 'hiking', count: '5 tips' },
  { name: 'Nishiki Market', icon: 'restaurant', count: '4 tips' },
  { name: 'Arashiyama', icon: 'forest', count: '3 tips' },
  { name: 'Pontocho', icon: 'liquor', count: '3 tips' }
];

export const FilterByPlaceModal: React.FC<FilterByPlaceModalProps> = ({
  isOpen,
  onClose,
  selectedDistrict,
  onSelectDistrict
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredDistricts = DISTRICTS.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs transition-opacity">
      <div
        className="w-full max-w-md bg-white rounded-t-3xl p-5 shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="w-12 h-1.5 bg-[#e2e6ec] rounded-full mx-auto mb-3 shrink-0" />

        <div className="flex items-center justify-between mb-4 shrink-0">
          <div>
            <h3 className="font-heading text-[18px] font-bold text-[#0a1a3a]">
              Filter by Place
            </h3>
            <p className="text-[12px] text-[#68778d]">
              Browse community insights by Kyoto district
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f1f3ff] text-[#68778d] flex items-center justify-center hover:bg-[#e2e6ec]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative mb-3 shrink-0">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#68778d] text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search neighborhood or shrine..."
            className="w-full bg-[#f1f3ff] pl-9 pr-3 py-2 rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-[#006161]/40"
          />
        </div>

        {/* Districts list */}
        <div className="overflow-y-auto no-scrollbar space-y-1.5 flex-1 pr-1">
          {filteredDistricts.map((d) => {
            const isSelected = selectedDistrict === d.name;
            return (
              <button
                key={d.name}
                type="button"
                onClick={() => {
                  onSelectDistrict(d.name);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-left ${
                  isSelected
                    ? 'bg-[#006161]/10 text-[#006161] font-bold border border-[#006161]/30'
                    : 'bg-[#faf8ff] text-[#0a1a3a] hover:bg-[#f1f3ff] border border-[#e2e6ec]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-[#006161] text-white' : 'bg-white text-[#006161]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{d.icon}</span>
                  </div>
                  <div>
                    <span className="text-[14px] font-semibold block">{d.name}</span>
                    <span className="text-[11px] text-[#68778d]">{d.count}</span>
                  </div>
                </div>

                {isSelected && (
                  <span className="material-symbols-outlined text-[#006161] text-[20px]">
                    check_circle
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Clear filter */}
        {selectedDistrict !== 'All Kyoto' && (
          <div className="pt-3 border-t border-[#e2e6ec] mt-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                onSelectDistrict('All Kyoto');
                onClose();
              }}
              className="w-full py-2.5 rounded-xl bg-[#f1f3ff] text-[#006161] font-bold text-[13px] hover:bg-[#e9edff]"
            >
              Reset to All Kyoto
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
