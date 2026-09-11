/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavTab, ReviewItem, FeedCategory, KyotoMetrics, CommunityNotification } from './types';
import {
  CURRENT_USER,
  INITIAL_METRICS,
  INITIAL_REVIEWS,
  INITIAL_NOTIFICATIONS
} from './data/initialData';
import { Header } from './components/Header';
import { KyotoScoreCard } from './components/KyotoScoreCard';
import { ReviewComposer } from './components/ReviewComposer';
import { CommunityFeed } from './components/CommunityFeed';
import { BottomNav } from './components/BottomNav';
import { FilterByPlaceModal } from './components/FilterByPlaceModal';
import { ImageModal } from './components/ImageModal';
import { NotificationsModal } from './components/NotificationsModal';
import { HomeTab } from './components/HomeTab';
import { ItineraryTab } from './components/ItineraryTab';
import { TranslateTab } from './components/TranslateTab';
import { ProfileTab } from './components/ProfileTab';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('explore');
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [selectedCategory, setSelectedCategory] = useState<FeedCategory>('Recent');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All Kyoto');
  const [metrics, setMetrics] = useState<KyotoMetrics>(INITIAL_METRICS);
  const [notifications, setNotifications] = useState<CommunityNotification[]>(INITIAL_NOTIFICATIONS);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; caption?: string } | null>(null);

  // Handle adding a new review
  const handleAddReview = (newReview: ReviewItem) => {
    setReviews((prev) => [newReview, ...prev]);
    setMetrics((prev) => ({
      ...prev,
      checkInCount: prev.checkInCount + 1
    }));
    // Add notification
    const newNotif: CommunityNotification = {
      id: `notif-${Date.now()}`,
      title: 'Check-in Verified by Community',
      message: `Your review for ${newReview.location.name} was successfully indexed in the Kyoto feed.`,
      timeAgo: 'Just now',
      unread: true,
      type: 'review'
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Toggle helpful button (+1 / -1)
  const handleToggleHelpful = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id !== reviewId) return r;
        const isVoted = !!r.isHelpfulVoted;
        return {
          ...r,
          isHelpfulVoted: !isVoted,
          helpfulCount: isVoted ? r.helpfulCount - 1 : r.helpfulCount + 1
        };
      })
    );
  };

  // Toggle bookmark
  const handleToggleBookmark = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, isBookmarked: !r.isBookmarked } : r))
    );
  };

  // Mark all notifications read
  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // Filter reviews
  const filteredReviews = reviews.filter((r) => {
    // District filter
    if (selectedDistrict !== 'All Kyoto') {
      const matchDistrict =
        r.location.district === selectedDistrict ||
        r.location.name.toLowerCase().includes(selectedDistrict.toLowerCase());
      if (!matchDistrict) return false;
    }

    // Category filter
    if (selectedCategory === 'Recent') return true;
    if (selectedCategory === 'Saved') return !!r.isBookmarked;
    if (selectedCategory === 'Solo Travelers') {
      return (
        r.tags.some((t) => t.toLowerCase().includes('solo')) ||
        r.author.badge?.toLowerCase().includes('solo') ||
        r.location.category === 'restaurant'
      );
    }
    if (selectedCategory === 'Food & Cafes') {
      return (
        r.location.category === 'restaurant' ||
        r.location.category === 'bar' ||
        r.tags.some((t) => ['#englishmenu', '#cashonly', '#quickbite'].includes(t.toLowerCase()))
      );
    }
    if (selectedCategory === 'Cultural Etiquette') {
      return (
        r.location.category === 'cultural' ||
        r.location.category === 'sight' ||
        !!r.insightHighlight ||
        r.tags.some((t) => ['#earlybird', '#freeadmission', '#kyotoview'].includes(t.toLowerCase()))
      );
    }
    if (selectedCategory === 'Hidden Gems') {
      return r.tags.includes('#HiddenGem') || r.location.isCashOnly;
    }

    return true;
  });

  const unreadCount = notifications.filter((n) => n.unread).length;
  const userReviews = reviews.filter((r) => r.author.name === CURRENT_USER.name);
  const bookmarkedReviews = reviews.filter((r) => r.isBookmarked);

  // Scroll to write review composer
  const scrollToReviewComposer = () => {
    const input = document.getElementById('reviewTextInput');
    if (input) {
      input.focus();
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#0a1a3a] flex flex-col items-center">
      {/* Container simulating high quality mobile screen */}
      <div className="w-full max-w-md bg-[#faf8ff] min-h-screen flex flex-col relative pb-28 pt-16 shadow-[0_0_50px_rgba(0,0,0,0.06)] border-x border-[#e2e6ec]/50">
        {/* Fixed Header */}
        <Header
          activeTab={activeTab}
          unreadNotificationsCount={unreadCount}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenProfile={() => setActiveTab('profile')}
          userAvatar={CURRENT_USER.avatar}
        />

        {/* Main Content Body */}
        <main className="flex-1 w-full px-4 pt-3">
          {activeTab === 'explore' && (
            <div className="flex flex-col">
              {/* Screen Title & Verified Community Intel Header */}
              <div className="pt-2 pb-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#006161]/10 text-[#006161]">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-[#006161] font-bold">
                    Community Intel • Kyoto
                  </span>
                </div>
                <h1 className="font-heading text-[24px] text-[#0a1a3a] tracking-tight font-bold leading-tight">
                  Traveler Reviews & Insights
                </h1>
                <p className="text-[13px] text-[#68778d] mt-1 leading-snug">
                  Verified check-ins & unfiltered tips from the TravelMate community in Kyoto
                </p>

                {/* Selected district filter badge if not All Kyoto */}
                {selectedDistrict !== 'All Kyoto' && (
                  <div className="mt-2.5 inline-flex items-center gap-1.5 bg-[#006161]/10 text-[#006161] px-3 py-1 rounded-full text-[12px] font-bold">
                    <span className="material-symbols-outlined text-[15px]">location_on</span>
                    <span>Filtered by: {selectedDistrict}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedDistrict('All Kyoto')}
                      className="ml-1 text-[#68778d] hover:text-[#006161]"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Overall Kyoto Score Card */}
              <KyotoScoreCard metrics={metrics} onOpenScoreDetails={() => setIsFilterModalOpen(true)} />

              {/* Interactive Check-in & Review Composer Card */}
              <ReviewComposer
                onAddReview={handleAddReview}
                onOpenImage={(url, caption) => setLightboxImage({ url, caption })}
              />

              {/* Community Feed */}
              <CommunityFeed
                reviews={filteredReviews}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                onToggleHelpful={handleToggleHelpful}
                onToggleBookmark={handleToggleBookmark}
                onOpenImage={(url, caption) => setLightboxImage({ url, caption })}
                totalTipsCount={reviews.length}
              />

              {/* Floating Bottom Quick Actions (Filter by Place / Write Review) */}
              <div className="fixed bottom-20 left-0 right-0 z-30 pointer-events-none">
                <div className="max-w-md mx-auto px-4 flex items-center gap-2.5 pointer-events-auto">
                  <button
                    id="filterByPlaceBtn"
                    type="button"
                    onClick={() => setIsFilterModalOpen(true)}
                    className="flex-1 h-12 rounded-xl bg-white text-[#006161] font-heading text-[15px] font-bold flex items-center justify-center gap-2 shadow-lg border border-[#e2e6ec] hover:bg-[#f1f3ff] transition-all active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-[20px]">tune</span>
                    <span>Filter by Place</span>
                  </button>

                  <button
                    id="writeReviewFloatingBtn"
                    type="button"
                    onClick={scrollToReviewComposer}
                    className="flex-1 h-12 rounded-xl bg-[#006161] text-white font-heading text-[15px] font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-[#0f7c7c] transition-all active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-[20px]">rate_review</span>
                    <span>Write Review</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'home' && (
            <HomeTab
              onGoToExplore={() => setActiveTab('explore')}
              onFilterDistrict={(dist) => {
                setSelectedDistrict(dist);
                setActiveTab('explore');
              }}
            />
          )}

          {activeTab === 'itinerary' && <ItineraryTab />}

          {activeTab === 'translate' && <TranslateTab />}

          {activeTab === 'profile' && (
            <ProfileTab
              userReviews={userReviews}
              bookmarkedReviews={bookmarkedReviews}
              onOpenImage={(url, caption) => setLightboxImage({ url, caption })}
              onGoToExplore={() => setActiveTab('explore')}
            />
          )}
        </main>

        {/* Fixed Bottom Navigation Bar */}
        <BottomNav activeTab={activeTab} onSelectTab={setActiveTab} />
      </div>

      {/* Filter by Place Modal */}
      <FilterByPlaceModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        selectedDistrict={selectedDistrict}
        onSelectDistrict={(dist) => {
          setSelectedDistrict(dist);
          setIsFilterModalOpen(false);
        }}
      />

      {/* Notifications Drawer */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllNotificationsRead}
      />

      {/* Full-screen Photo Lightbox */}
      <ImageModal
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
        imageUrl={lightboxImage?.url || null}
        caption={lightboxImage?.caption}
      />
    </div>
  );
}
