export interface ReviewAuthor {
  name: string;
  avatar: string;
  badge?: string; // e.g. "Verified Solo Traveler • Level 4 Explorer"
  isVerified?: boolean;
  avatarInitials?: string;
}

export interface ReviewLocation {
  name: string;
  tag: string; // e.g. "Gyoza / Craft Beer" or "Scenic Hike"
  category: 'restaurant' | 'sight' | 'bar' | 'cultural' | 'cafe';
  isCashOnly?: boolean;
  district?: string;
}

export interface ReviewItem {
  id: string;
  author: ReviewAuthor;
  rating: number; // e.g. 5.0
  timeAgo: string;
  timestamp: number;
  location: ReviewLocation;
  text: string;
  insightHighlight?: string; // e.g. Key Local Insight
  images: string[];
  imageCaptions?: string[];
  tags: string[];
  helpfulCount: number;
  isHelpfulVoted?: boolean;
  isBookmarked?: boolean;
  isGpsVerified?: boolean;
}

export type FeedCategory =
  | 'Recent'
  | 'Solo Travelers'
  | 'Food & Cafes'
  | 'Cultural Etiquette'
  | 'Hidden Gems'
  | 'Saved';

export type NavTab = 'home' | 'explore' | 'itinerary' | 'translate' | 'profile';

export interface KyotoMetrics {
  overallScore: number;
  checkInCount: number;
  safetyScore: number;
  englishFriendlyScore: number;
  soloDiningScore: number;
}

export interface CommunityNotification {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  unread: boolean;
  type: 'upvote' | 'alert' | 'review' | 'tip';
}

export interface JapanesePhrase {
  id: string;
  english: string;
  japanese: string;
  romaji: string;
  category: 'dining' | 'navigation' | 'payment' | 'polite';
  audioText?: string;
}
