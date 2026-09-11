import React from 'react';
import { CommunityNotification } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: CommunityNotification[];
  onMarkAllRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-xs p-4 pt-16 transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl animate-in slide-in-from-top duration-300 max-h-[80vh] flex flex-col border border-[#e2e6ec]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#e2e6ec] shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006161] text-[22px]">
              notifications_active
            </span>
            <h3 className="font-heading text-[17px] font-bold text-[#0a1a3a]">
              Kyoto Community Alerts
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onMarkAllRead}
              className="text-[11px] font-bold text-[#006161] hover:underline"
            >
              Mark read
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-[#f1f3ff] text-[#68778d] flex items-center justify-center hover:bg-[#e2e6ec]"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>

        <div className="overflow-y-auto no-scrollbar py-2 space-y-2.5 flex-1">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-3 rounded-2xl transition-colors border ${
                notif.unread
                  ? 'bg-[#f1f3ff] border-[#006161]/20'
                  : 'bg-white border-[#e2e6ec]'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    notif.type === 'alert'
                      ? 'bg-[#d97706]/15 text-[#d97706]'
                      : notif.type === 'upvote'
                      ? 'bg-[#059669]/15 text-[#059669]'
                      : 'bg-[#006161]/15 text-[#006161]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {notif.type === 'alert'
                      ? 'warning'
                      : notif.type === 'upvote'
                      ? 'thumb_up'
                      : 'place'}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[13px] font-bold text-[#0a1a3a] truncate">
                      {notif.title}
                    </h4>
                    <span className="text-[10px] text-[#68778d] shrink-0 ml-1">
                      {notif.timeAgo}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#3e4948] mt-0.5 leading-snug">
                    {notif.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
