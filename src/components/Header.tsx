import React from 'react';
import { NavTab } from '../types';

interface HeaderProps {
  activeTab: NavTab;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  userAvatar: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  unreadNotificationsCount,
  onOpenNotifications,
  onOpenProfile,
  userAvatar
}) => {
  const getSubtitle = () => {
    switch (activeTab) {
      case 'explore':
        return 'Explore';
      case 'home':
        return 'Kyoto Guide';
      case 'itinerary':
        return 'Itinerary';
      case 'translate':
        return 'Translate';
      case 'profile':
        return 'Profile';
      default:
        return 'Explore';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#faf8ff]/90 backdrop-blur-xl border-b border-[#e2e6ec]/50 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src="https://lh3.googleusercontent.com/aida/AEtjO1UXKhdjU9d-RArsg8IWWiHo-pXr7r1bp-w1Hws_4cm27hk-BSfgRh-amo2vJ4asRBCPlIJjhpx6QFlB9Dj6IYk15zkDo5XQ5vda3D7ee3TfgWgcVEdKZsZlkZnVAshlXc_6XzC4wHjQ20YCIJ7fNgu7JEeIDSawlWoZjW4rag6fph5ZHb74_aPvt7_zkfynm2SfXuULcx8ha2NIHBarb-n3swoNU_pwrjtrr5ANNYECsr3KMH4fffovEYM"
            alt="TravelMate Logo"
            className="h-8 w-auto object-contain shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col truncate">
            <span className="font-heading text-[18px] font-bold text-[#006161] leading-tight tracking-tight">
              TravelMate
            </span>
            <span className="text-[11px] font-semibold text-[#68778d] uppercase tracking-wider leading-none">
              {getSubtitle()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            id="notificationsBtn"
            type="button"
            aria-label="Notifications"
            onClick={onOpenNotifications}
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-[#68778d] hover:text-[#006161] hover:bg-[#f1f3ff] transition-colors"
          >
            <span className="material-symbols-outlined text-[23px]">notifications</span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#fd6a49] rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          <button
            id="profileHeaderBtn"
            type="button"
            aria-label="User Profile"
            onClick={onOpenProfile}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:ring-2 hover:ring-[#006161]/30 transition-all"
          >
            <img
              src={userAvatar}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#006161]/25"
              referrerPolicy="no-referrer"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
