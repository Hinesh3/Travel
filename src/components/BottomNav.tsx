import React from 'react';
import { NavTab } from '../types';

interface BottomNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 pb-safe bg-white/95 backdrop-blur-xl border-t border-[#e2e6ec] shadow-[0_-4px_16px_rgba(27,42,74,0.06)]"
      data-active-classes="text-[#006161] font-bold"
    >
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-1">
        {/* Home */}
        <button
          type="button"
          data-path="home"
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors cursor-pointer ${
            activeTab === 'home'
              ? 'text-[#006161] font-bold'
              : 'text-[#68778d] hover:text-[#006161]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: activeTab === 'home' ? "'FILL' 1" : "'FILL' 0" }}
          >
            home
          </span>
          <span className="text-[11px] font-semibold mt-0.5">Home</span>
        </button>

        {/* Explore */}
        <button
          type="button"
          data-path="explore"
          aria-current={activeTab === 'explore' ? 'page' : undefined}
          onClick={() => onSelectTab('explore')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors cursor-pointer ${
            activeTab === 'explore'
              ? 'text-[#006161] font-bold'
              : 'text-[#68778d] hover:text-[#006161]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: activeTab === 'explore' ? "'FILL' 1" : "'FILL' 0" }}
          >
            explore
          </span>
          <span className="text-[11px] font-semibold mt-0.5">Explore</span>
        </button>

        {/* Itinerary */}
        <button
          type="button"
          data-path="itinerary"
          onClick={() => onSelectTab('itinerary')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors cursor-pointer ${
            activeTab === 'itinerary'
              ? 'text-[#006161] font-bold'
              : 'text-[#68778d] hover:text-[#006161]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: activeTab === 'itinerary' ? "'FILL' 1" : "'FILL' 0" }}
          >
            calendar_today
          </span>
          <span className="text-[11px] font-semibold mt-0.5">Itinerary</span>
        </button>

        {/* Translate */}
        <button
          type="button"
          data-path="translate"
          onClick={() => onSelectTab('translate')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors cursor-pointer ${
            activeTab === 'translate'
              ? 'text-[#006161] font-bold'
              : 'text-[#68778d] hover:text-[#006161]'
          }`}
        >
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              activeTab === 'translate' ? 'bg-[#006161] text-white shadow-xs' : 'bg-[#0f7c7c]/10 text-[#0f7c7c]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">translate</span>
          </div>
          <span className="text-[11px] font-semibold mt-0.5">Translate</span>
        </button>

        {/* Profile */}
        <button
          type="button"
          data-path="profile"
          onClick={() => onSelectTab('profile')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 transition-colors cursor-pointer ${
            activeTab === 'profile'
              ? 'text-[#006161] font-bold'
              : 'text-[#68778d] hover:text-[#006161]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: activeTab === 'profile' ? "'FILL' 1" : "'FILL' 0" }}
          >
            person
          </span>
          <span className="text-[11px] font-semibold mt-0.5">Profile</span>
        </button>
      </div>
    </nav>
  );
};
