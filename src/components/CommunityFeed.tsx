import React from 'react';
import { ReviewItem, FeedCategory } from '../types';

interface CommunityFeedProps {
  reviews: ReviewItem[];
  selectedCategory: FeedCategory;
  onSelectCategory: (category: FeedCategory) => void;
  onToggleHelpful: (reviewId: string) => void;
  onToggleBookmark: (reviewId: string) => void;
  onOpenImage: (url: string, caption?: string) => void;
  totalTipsCount: number;
}

const CATEGORIES: FeedCategory[] = [
  'Recent',
  'Solo Travelers',
  'Food & Cafes',
  'Cultural Etiquette',
  'Hidden Gems',
  'Saved'
];

export const CommunityFeed: React.FC<CommunityFeedProps> = ({
  reviews,
  selectedCategory,
  onSelectCategory,
  onToggleHelpful,
  onToggleBookmark,
  onOpenImage,
  totalTipsCount
}) => {
  return (
    <div className="mb-8">
      {/* Feed Section Title */}
      <div className="mb-2.5 flex items-center justify-between">
        <h2 className="font-heading text-[18px] text-[#0a1a3a] font-bold">
          Traveler Community Feed
        </h2>
        <span className="text-[12px] font-semibold text-[#68778d]">
          Showing {reviews.length} of {totalTipsCount} active tips
        </span>
      </div>

      {/* Filter category pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 -mx-4 px-4 no-scrollbar">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-1.5 rounded-full text-[12px] shrink-0 transition-all cursor-pointer font-bold shadow-xs ${
                isActive
                  ? 'bg-[#006161] text-white shadow-sm'
                  : 'bg-white text-[#3e4948] hover:bg-[#f1f3ff] border border-[#e2e6ec]'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Review List */}
      <div className="flex flex-col gap-4 mt-2">
        {reviews.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-[#e2e6ec] text-[#68778d]">
            <span className="material-symbols-outlined text-[40px] text-[#bdc9c8] mb-2">
              travel_explore
            </span>
            <p className="font-bold text-[#0a1a3a]">No reviews found for this filter.</p>
            <p className="text-[13px] mt-1">Try switching categories or be the first to post!</p>
            <button
              type="button"
              onClick={() => onSelectCategory('Recent')}
              className="mt-3 px-4 py-1.5 bg-[#006161] text-white text-[12px] font-bold rounded-lg"
            >
              Reset to All Recent
            </button>
          </div>
        ) : (
          reviews.map((review) => {
            const hasTwoImages = review.images.length >= 2;
            const hasOneImage = review.images.length === 1;

            return (
              <article
                key={review.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e6ec]/70 relative hover:border-[#006161]/30 transition-all"
              >
                {/* Author Info & Rating */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {review.author.avatar ? (
                      <img
                        src={review.author.avatar}
                        alt={review.author.name}
                        className="w-11 h-11 rounded-full object-cover shrink-0 ring-1 ring-[#e2e6ec]"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-[#006161]/10 flex items-center justify-center text-[#006161] font-heading font-bold text-[14px] shrink-0 border border-[#006161]/20">
                        {review.author.avatarInitials || review.author.name.slice(0, 2)}
                      </div>
                    )}

                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-heading text-[15px] text-[#0a1a3a] font-bold truncate">
                          {review.author.name}
                        </span>
                        {review.author.isVerified && (
                          <span className="material-symbols-outlined text-[#006161] text-[16px]">
                            verified
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#68778d] truncate">
                        {review.author.badge}
                      </span>
                    </div>
                  </div>

                  {/* Rating & Time */}
                  <div className="flex flex-col items-end shrink-0">
                    <div className="flex items-center text-[#fd6a49]">
                      {review.rating === 5 ? (
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <span
                              key={s}
                              className="material-symbols-outlined text-[15px]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              star
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <span
                            className="material-symbols-outlined text-[16px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>
                          <span className="text-[12px] font-bold text-[#0a1a3a]">
                            {review.rating.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="text-[11px] text-[#68778d] mt-0.5">{review.timeAgo}</span>
                  </div>
                </div>

                {/* Location banner */}
                <div className="mb-3 bg-[#f1f3ff] rounded-xl p-2.5 flex items-center justify-between border border-[#e2e6ec]/50">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-[#006161] text-[18px]">
                      {review.location.category === 'restaurant'
                        ? 'storefront'
                        : review.location.category === 'sight'
                        ? 'hiking'
                        : review.location.category === 'bar'
                        ? 'liquor'
                        : 'pin_drop'}
                    </span>
                    <span className="text-[13px] font-bold text-[#0a1a3a] truncate">
                      {review.location.name}
                    </span>
                  </div>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded font-bold shadow-2xs shrink-0 ${
                      review.location.isCashOnly
                        ? 'bg-white text-[#d97706] border border-[#d97706]/30'
                        : 'bg-white text-[#006161] border border-[#006161]/20'
                    }`}
                  >
                    {review.location.tag}
                  </span>
                </div>

                {/* Key Local Insight highlight card (if exists) */}
                {review.insightHighlight && (
                  <div className="bg-[#006161]/6 rounded-xl p-3 mb-3 border-l-3 border-[#006161]">
                    <div className="flex items-center gap-1.5 text-[#006161] mb-1">
                      <span className="material-symbols-outlined text-[17px]">lightbulb</span>
                      <span className="text-[11px] font-bold uppercase tracking-wider">
                        Key Local Insight
                      </span>
                    </div>
                    <p className="text-[13px] text-[#0a1a3a] leading-relaxed font-medium">
                      {review.insightHighlight}
                    </p>
                  </div>
                )}

                {/* Review Text (if not redundant with insightHighlight) */}
                {!review.insightHighlight && (
                  <p className="text-[13px] text-[#0a1a3a] leading-relaxed mb-3 font-normal">
                    {review.text}
                  </p>
                )}

                {/* Images layout */}
                {hasTwoImages && (
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {review.images.slice(0, 2).map((imgUrl, idx) => (
                      <div
                        key={idx}
                        onClick={() =>
                          onOpenImage(
                            imgUrl,
                            review.imageCaptions?.[idx] || `${review.location.name} photo`
                          )
                        }
                        className="relative h-28 rounded-xl overflow-hidden shadow-xs cursor-pointer group border border-[#e2e6ec]/70"
                      >
                        <img
                          src={imgUrl}
                          alt={review.imageCaptions?.[idx] || 'Review attachment'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                      </div>
                    ))}
                  </div>
                )}

                {hasOneImage && (
                  <div
                    onClick={() =>
                      onOpenImage(
                        review.images[0],
                        review.imageCaptions?.[0] || `${review.location.name} scenic spot`
                      )
                    }
                    className="relative rounded-xl overflow-hidden mb-3 shadow-xs cursor-pointer group border border-[#e2e6ec]/70"
                  >
                    <img
                      src={review.images[0]}
                      alt="Travel spot"
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    {review.imageCaptions?.[0] && (
                      <div className="absolute bottom-2 left-2 bg-[#213050]/85 backdrop-blur-xs px-2.5 py-1 rounded-lg text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-sm">
                        <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                        <span>{review.imageCaptions[0]}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Tag Pills */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {review.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-[#f1f3ff] text-[11px] text-[#3e4948] font-semibold border border-[#e2e6ec]/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom Card Actions (Helpful & Bookmark) */}
                <div className="flex items-center justify-between pt-1 border-t border-[#e2e6ec]/50">
                  <button
                    type="button"
                    onClick={() => onToggleHelpful(review.id)}
                    className={`inline-flex items-center gap-1.5 text-[12px] font-semibold transition-all cursor-pointer py-1 px-2 rounded-lg hover:bg-[#f1f3ff] ${
                      review.isHelpfulVoted ? 'text-[#006161]' : 'text-[#68778d]'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{
                        fontVariationSettings: `'FILL' ${review.isHelpfulVoted ? 1 : 0}`
                      }}
                    >
                      thumb_up
                    </span>
                    <span className="font-bold">{review.helpfulCount} found helpful</span>
                  </button>

                  <button
                    type="button"
                    aria-label="Bookmark tip"
                    onClick={() => onToggleBookmark(review.id)}
                    className={`p-1.5 rounded-full hover:bg-[#f1f3ff] transition-colors cursor-pointer ${
                      review.isBookmarked ? 'text-[#006161]' : 'text-[#68778d]'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{
                        fontVariationSettings: `'FILL' ${review.isBookmarked ? 1 : 0}`
                      }}
                    >
                      bookmark
                    </span>
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};
