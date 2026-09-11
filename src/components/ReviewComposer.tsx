import React, { useState, useRef } from 'react';
import { CURRENT_USER, AVAILABLE_LOCATIONS, AVAILABLE_TAGS } from '../data/initialData';
import { ReviewItem, ReviewLocation } from '../types';

interface ReviewComposerProps {
  onAddReview: (review: ReviewItem) => void;
  onOpenImage: (url: string, caption?: string) => void;
}

const RATING_TEXTS: Record<number, string> = {
  1: '1.0 / 5.0 (Disappointing)',
  2: '2.0 / 5.0 (Could Be Better)',
  3: '3.0 / 5.0 (Average Experience)',
  4: '4.0 / 5.0 (Great Experience)',
  5: '5.0 / 5.0 (Exceptional)'
};

const SAMPLE_PHOTO_PRESETS = [
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhTPa3OlVOzVM3dmqc6LlB4UVZEIbDVD6Ng7a724hk9A_WdSg8nBOsP2J_fzwSgs11cBW5ndpHiNKXNiG-rqef6b7jBdAlzfs22qEzuWQxufT_vcKf8uanEelnEucYPtIpIFQMXyNaDgmBpLCUEQyrin66YgeAXnXMyPwQDZxmWVHT8z9YFThmpKD1ji-4lSeC-f2JkqMUGTkJyFtZtPerYbWwS9t3nH_wgp8Qw0fihRXJJaXVHGZpWw',
    caption: 'Seasonal Kyoto Kaiseki tasting course'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYmgEv1Db3m2rEd_fTDQCjFCLvMmhei2iwsDF4u8abUwGXm7b-pFfvR82s4to36VKZ9SlC8cs-sU4Ol-skaAm9ryV_xbEDk70_RHT8vTwkeeB9RkMtrNZZ0z7YColRFGunktfRzs1NC1GvxXf_a4AzIcAH70MuKEy0aeVkeCefIp32BRpFX9crgCQFTxE7cFgn_GYW3sMpXh9H1829hiytiZlR3Az3Gjf5xGAJpjW4nIpjAcVdN8lCRA',
    caption: 'Crispy gyoza with ginger vinegar dip'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDA9TtHsePyFyAWXIVhHJBgj9917v3Zc-Pxh2Motn1AOPtXxIrj2owVTJDsg_ruA97CpiTR3D2DhWwQXitPHKpV3UBkZttHzYeIrjYt7M0Vo5ba9XLDtqxd6w8iX2jOZaKBapuh8pnS896reO6f8lNCd0qZ59IlT6-b2BQXAjIWtAWc628wEeGGnR-8-Mdo2TgWRz_AD-3wrjNcfWR43XGZCbGDvZKSVIEmbGGHUVTdHeaB71LgX99QbA',
    caption: 'Morning Torii gate hike on Mount Inari'
  }
];

export const ReviewComposer: React.FC<ReviewComposerProps> = ({ onAddReview, onOpenImage }) => {
  const [selectedLocation, setSelectedLocation] = useState<ReviewLocation>({
    name: 'Gion Karyo Kaiseki',
    tag: 'Traditional Kaiseki',
    category: 'restaurant',
    district: 'Gion & Higashiyama'
  });
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([
    '#SoloFriendly',
    '#EnglishMenu',
    '#HiddenGem'
  ]);
  const [attachedPhotos, setAttachedPhotos] = useState<string[]>([
    SAMPLE_PHOTO_PRESETS[0].url
  ]);
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [postSuccess, setPostSuccess] = useState<boolean>(false);
  const [customLocationName, setCustomLocationName] = useState<string>('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleAddPhotoPreset = () => {
    // cycle or add from presets
    const nextUnused = SAMPLE_PHOTO_PRESETS.find((p) => !attachedPhotos.includes(p.url));
    if (nextUnused) {
      setAttachedPhotos([...attachedPhotos, nextUnused.url]);
    } else {
      // cycle first one again
      setAttachedPhotos([...attachedPhotos.slice(1), attachedPhotos[0]]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.placeholder = 'Please write a brief tip for travelers before posting...';
      }
      return;
    }

    setIsPosting(true);

    setTimeout(() => {
      const newReview: ReviewItem = {
        id: `user-rev-${Date.now()}`,
        author: {
          name: CURRENT_USER.name,
          avatar: CURRENT_USER.avatar,
          badge: `${CURRENT_USER.role} • ${CURRENT_USER.level}`,
          isVerified: true
        },
        rating: rating,
        timeAgo: 'Just now',
        timestamp: Date.now(),
        location: selectedLocation,
        text: `“${reviewText.trim()}”`,
        images: attachedPhotos.length > 0 ? attachedPhotos : [],
        tags: selectedTags,
        helpfulCount: 0,
        isHelpfulVoted: false,
        isBookmarked: false,
        isGpsVerified: true
      };

      onAddReview(newReview);
      setIsPosting(false);
      setPostSuccess(true);
      setReviewText('');

      setTimeout(() => {
        setPostSuccess(false);
      }, 2500);
    }, 600);
  };

  const effectiveRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div className="mb-6">
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e6ec]/60">
        {/* Author Header with GPS Verification */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              className="w-11 h-11 rounded-full object-cover shrink-0 ring-2 ring-[#006161]/20"
              src={CURRENT_USER.avatar}
              alt={CURRENT_USER.name}
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-heading text-[16px] text-[#0a1a3a] font-bold truncate">
                  {CURRENT_USER.name}
                </span>
                <span
                  className="material-symbols-outlined text-[#006161] text-[16px]"
                  title="Verified Traveler"
                >
                  verified
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#0f7c7c]/10 text-[#0f7c7c] text-[11px] font-bold">
                  {CURRENT_USER.role}
                </span>
                <span className="text-[11px] text-[#68778d]">• {CURRENT_USER.location}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-[#f1f3ff] px-2.5 py-1 rounded-full border border-[#d9e2ff]/60">
            <span className="material-symbols-outlined text-[15px] text-[#d97706]">
              gps_fixed
            </span>
            <span className="text-[11px] text-[#0a1a3a] font-semibold">GPS Verified</span>
          </div>
        </div>

        {/* Check-in Location selector */}
        <div className="bg-[#f1f3ff] rounded-xl p-2.5 mb-3.5 relative">
          <label className="text-[10px] text-[#68778d] uppercase font-bold tracking-wider block mb-1">
            Check-in Location
          </label>
          <button
            type="button"
            onClick={() => setShowLocationPicker(!showLocationPicker)}
            className="w-full flex items-center justify-between bg-white rounded-lg px-3 py-2 cursor-pointer shadow-xs border border-[#e2e6ec]/80 hover:border-[#006161]/40 transition-all text-left"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[#006161] text-[19px]">
                {selectedLocation.category === 'restaurant'
                  ? 'restaurant'
                  : selectedLocation.category === 'sight'
                  ? 'hiking'
                  : selectedLocation.category === 'bar'
                  ? 'liquor'
                  : 'place'}
              </span>
              <span className="text-[13px] text-[#0a1a3a] font-bold truncate">
                {selectedLocation.name}
              </span>
            </div>
            <span className="material-symbols-outlined text-[#68778d] text-[18px]">
              {showLocationPicker ? 'expand_less' : 'expand_more'}
            </span>
          </button>

          {/* Location picker dropdown */}
          {showLocationPicker && (
            <div className="mt-2 bg-white rounded-xl shadow-lg border border-[#e2e6ec] p-2 max-h-56 overflow-y-auto no-scrollbar z-20">
              <div className="text-[11px] font-bold text-[#68778d] uppercase px-2 py-1">
                Select Kyoto Spot
              </div>
              {AVAILABLE_LOCATIONS.map((loc) => (
                <button
                  key={loc.name}
                  type="button"
                  onClick={() => {
                    setSelectedLocation(loc);
                    setShowLocationPicker(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left text-[13px] hover:bg-[#f1f3ff] transition-colors ${
                    selectedLocation.name === loc.name
                      ? 'bg-[#006161]/10 text-[#006161] font-bold'
                      : 'text-[#0a1a3a]'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-[17px] text-[#006161]">
                      {loc.category === 'restaurant'
                        ? 'restaurant'
                        : loc.category === 'sight'
                        ? 'hiking'
                        : 'storefront'}
                    </span>
                    <span className="truncate">{loc.name}</span>
                  </div>
                  <span className="text-[10px] text-[#68778d] px-1.5 py-0.5 bg-[#f1f3ff] rounded">
                    {loc.tag}
                  </span>
                </button>
              ))}

              {/* Custom input */}
              <div className="mt-2 pt-2 border-t border-[#e2e6ec] flex gap-1.5 px-1">
                <input
                  type="text"
                  placeholder="Or enter custom Kyoto spot..."
                  value={customLocationName}
                  onChange={(e) => setCustomLocationName(e.target.value)}
                  className="flex-1 text-[12px] bg-[#f1f3ff] px-2.5 py-1.5 rounded-md focus:outline-none focus:ring-1 focus:ring-[#006161]"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customLocationName.trim()) {
                      setSelectedLocation({
                        name: customLocationName.trim(),
                        tag: 'Verified Spot',
                        category: 'restaurant',
                        district: 'Kyoto'
                      });
                      setCustomLocationName('');
                      setShowLocationPicker(false);
                    }
                  }}
                  className="px-2.5 py-1.5 bg-[#006161] text-white text-[11px] font-bold rounded-md hover:bg-[#0f7c7c]"
                >
                  Set
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Experience Rating */}
        <div className="mb-3.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[13px] text-[#0a1a3a] font-semibold">
              How was your experience today?
            </span>
            <span
              id="starRatingValue"
              className="text-[11px] text-[#fd6a49] font-bold transition-all"
            >
              {RATING_TEXTS[effectiveRating]}
            </span>
          </div>

          <div
            id="starContainer"
            className="flex items-center gap-3 bg-[#f1f3ff] p-2.5 rounded-xl justify-center border border-[#e2e6ec]/50"
          >
            {[1, 2, 3, 4, 5].map((starVal) => {
              const isFilled = starVal <= effectiveRating;
              return (
                <button
                  key={starVal}
                  type="button"
                  aria-label={`Rate ${starVal} star${starVal > 1 ? 's' : ''}`}
                  data-rating={starVal}
                  onClick={() => setRating(starVal)}
                  onMouseEnter={() => setHoverRating(starVal)}
                  onMouseLeave={() => setHoverRating(null)}
                  className={`p-1 transition-transform hover:scale-125 active:scale-95 ${
                    isFilled ? 'text-[#fd6a49]' : 'text-[#bdc9c8]'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[28px]"
                    style={{ fontVariationSettings: `'FILL' ${isFilled ? 1 : 0}` }}
                  >
                    star
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Unfiltered advice Textarea */}
        <div className="mb-3.5">
          <textarea
            ref={textareaRef}
            id="reviewTextInput"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={3}
            placeholder="Share unfiltered advice for fellow travelers (e.g. reservation tricks, dress codes, luggage storage...)"
            className="w-full bg-[#f1f3ff] rounded-xl p-3 text-[13px] text-[#0a1a3a] placeholder:text-[#68778d] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006161]/50 border border-transparent focus:border-[#006161]/30 transition-all resize-none shadow-inner"
          />
        </div>

        {/* Tap quick tags */}
        <div className="mb-3.5">
          <span className="text-[11px] text-[#68778d] block mb-1.5 font-bold uppercase tracking-wider">
            Tap quick tags to add:
          </span>
          <div className="flex flex-wrap gap-1.5" id="tagPills">
            {AVAILABLE_TAGS.slice(0, 5).map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-[12px] transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#006161] text-white font-semibold shadow-xs'
                      : 'bg-[#f1f3ff] text-[#3e4948] font-medium hover:bg-[#e9edff]'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Photo attachments */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            {attachedPhotos.length > 0 && (
              <div
                onClick={() => onOpenImage(attachedPhotos[0], 'Kyoto check-in photo')}
                className="relative w-16 h-16 rounded-xl overflow-hidden shadow-xs shrink-0 cursor-pointer border border-[#e2e6ec] group"
              >
                <img
                  src={attachedPhotos[0]}
                  alt="Kyoto Kaiseki"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-1 right-1 bg-[#213050]/80 text-white rounded px-1 text-[10px] font-bold">
                  {attachedPhotos.length}/3
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={handleAddPhotoPreset}
              className="flex-1 h-16 rounded-xl bg-[#f1f3ff] hover:bg-[#e9edff] transition-colors flex flex-col items-center justify-center gap-1 text-[#68778d] border border-dashed border-[#bdc9c8]"
            >
              <span className="material-symbols-outlined text-[22px] text-[#006161]">
                add_a_photo
              </span>
              <span className="text-[11px] text-[#006161] font-bold">
                {attachedPhotos.length >= 3 ? 'Swap Photos' : 'Add Dish / Scene Photo'}
              </span>
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          id="submitReviewBtn"
          type="button"
          disabled={isPosting}
          onClick={handleSubmit}
          className={`w-full h-12 rounded-xl text-white transition-all flex items-center justify-center gap-2 shadow-sm text-[15px] font-bold active:scale-[0.98] ${
            postSuccess
              ? 'bg-[#059669]'
              : 'bg-[#fd6a49] hover:bg-[#e05637]'
          }`}
        >
          {isPosting ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">
                sync
              </span>
              <span>Publishing to Kyoto Feed...</span>
            </>
          ) : postSuccess ? (
            <>
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              <span>Review Published & Verified!</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">send</span>
              <span>Post Verified Review</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
