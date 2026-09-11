import React, { useState } from 'react';
import { CURRENT_USER } from '../data/initialData';
import { ReviewItem } from '../types';

interface ProfileTabProps {
  userReviews: ReviewItem[];
  bookmarkedReviews: ReviewItem[];
  onOpenImage: (url: string, caption?: string) => void;
  onGoToExplore: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  userReviews,
  bookmarkedReviews,
  onOpenImage,
  onGoToExplore
}) => {
  const [profileSubTab, setProfileSubTab] = useState<'tips' | 'saved'>('tips');

  return (
    <div className="flex flex-col gap-4 pb-8 animate-in fade-in duration-200">
      {/* Profile Card */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#e2e6ec] text-center">
        <div className="relative w-20 h-20 mx-auto mb-3">
          <img
            src={CURRENT_USER.avatar}
            alt={CURRENT_USER.name}
            className="w-full h-full rounded-full object-cover ring-4 ring-[#006161]/20 shadow-md"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#006161] text-white flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[14px]">verified</span>
          </div>
        </div>

        <h2 className="font-heading text-[18px] font-bold text-[#0a1a3a]">
          {CURRENT_USER.name}
        </h2>
        <div className="flex items-center justify-center gap-1.5 mt-0.5">
          <span className="text-[12px] font-bold text-[#006161] bg-[#006161]/10 px-2 py-0.5 rounded-full">
            {CURRENT_USER.level}
          </span>
          <span className="text-[12px] text-[#68778d]">• {CURRENT_USER.location}</span>
        </div>

        <p className="text-[13px] text-[#3e4948] mt-2 leading-relaxed max-w-xs mx-auto">
          {CURRENT_USER.bio}
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#e2e6ec]">
          <div className="bg-[#f1f3ff] rounded-xl p-2 text-center">
            <div className="font-heading text-[16px] font-bold text-[#006161]">
              {userReviews.length + 1}
            </div>
            <div className="text-[11px] text-[#68778d]">Kyoto Tips</div>
          </div>
          <div className="bg-[#f1f3ff] rounded-xl p-2 text-center">
            <div className="font-heading text-[16px] font-bold text-[#006161]">
              {CURRENT_USER.helpfulReceived}
            </div>
            <div className="text-[11px] text-[#68778d]">Helpful Votes</div>
          </div>
          <div className="bg-[#f1f3ff] rounded-xl p-2 text-center">
            <div className="font-heading text-[16px] font-bold text-[#059669]">100%</div>
            <div className="text-[11px] text-[#68778d]">GPS Trust</div>
          </div>
        </div>

        {/* Verified Badges */}
        <div className="flex flex-wrap justify-center gap-1.5 mt-3 pt-3 border-t border-[#e2e6ec]">
          {CURRENT_USER.badges.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#f1f3ff] rounded-full text-[11px] font-semibold text-[#006161] border border-[#e2e6ec]"
            >
              <span className="material-symbols-outlined text-[12px]">military_tech</span>
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Subtab navigation */}
      <div className="flex bg-[#f1f3ff] p-1 rounded-2xl">
        <button
          type="button"
          onClick={() => setProfileSubTab('tips')}
          className={`flex-1 py-2 rounded-xl text-[13px] font-bold transition-all ${
            profileSubTab === 'tips' ? 'bg-white text-[#006161] shadow-xs' : 'text-[#68778d]'
          }`}
        >
          My Posted Tips ({userReviews.length})
        </button>
        <button
          type="button"
          onClick={() => setProfileSubTab('saved')}
          className={`flex-1 py-2 rounded-xl text-[13px] font-bold transition-all ${
            profileSubTab === 'saved' ? 'bg-white text-[#006161] shadow-xs' : 'text-[#68778d]'
          }`}
        >
          Saved Bookmarks ({bookmarkedReviews.length})
        </button>
      </div>

      {/* Subtab content */}
      {profileSubTab === 'tips' ? (
        <div className="space-y-3">
          {userReviews.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center border border-[#e2e6ec] text-[#68778d]">
              <span className="material-symbols-outlined text-[36px] text-[#bdc9c8] mb-1">
                rate_review
              </span>
              <p className="font-bold text-[#0a1a3a]">No reviews posted yet this trip</p>
              <p className="text-[12px] mt-1">Use the composer on the Explore tab to share a tip!</p>
              <button
                type="button"
                onClick={onGoToExplore}
                className="mt-3 px-4 py-2 bg-[#006161] text-white text-[12px] font-bold rounded-xl"
              >
                Go to Explore
              </button>
            </div>
          ) : (
            userReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#e2e6ec]"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] font-bold text-[#0a1a3a]">
                    {rev.location.name}
                  </span>
                  <span className="text-[11px] text-[#68778d]">{rev.timeAgo}</span>
                </div>
                <p className="text-[12px] text-[#3e4948] leading-relaxed mb-2">{rev.text}</p>
                {rev.images.length > 0 && (
                  <div
                    onClick={() => onOpenImage(rev.images[0], rev.location.name)}
                    className="w-16 h-16 rounded-xl overflow-hidden cursor-pointer border border-[#e2e6ec]"
                  >
                    <img
                      src={rev.images[0]}
                      alt="Attachment"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {bookmarkedReviews.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center border border-[#e2e6ec] text-[#68778d]">
              <span className="material-symbols-outlined text-[36px] text-[#bdc9c8] mb-1">
                bookmark_border
              </span>
              <p className="font-bold text-[#0a1a3a]">No saved tips yet</p>
              <p className="text-[12px] mt-1">
                Tap the bookmark icon on any community card to save it for your day.
              </p>
            </div>
          ) : (
            bookmarkedReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#e2e6ec]"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[13px] font-bold text-[#0a1a3a]">
                    {rev.location.name}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-[#f1f3ff] text-[#006161] font-bold">
                    {rev.location.tag}
                  </span>
                </div>
                <p className="text-[12px] text-[#3e4948] leading-relaxed">{rev.text}</p>
                <div className="text-[11px] text-[#68778d] mt-2">By {rev.author.name}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
