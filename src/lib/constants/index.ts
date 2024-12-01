import type { PositiveEventType } from '$lib/types';

// Maps positive user actions to their point values (higher = more impactful).
export const ENGAGEMENT_POINTS: Record<PositiveEventType, number> = {
	follow_artist: 6,
	share_artist: 5,
	share_track: 4,
	add_track_to_playlist: 3,
	like_track: 2,
	play_track: 1
} as const;

// Represents hours of the day in 24-hour format (0 = midnight, 23 = 11 PM)
export const HOURS: readonly number[] = Array.from({ length: 24 }, (_, i) => i);

// Represents days of the week starting from Monday (1 = Monday, 2 = Tuesday, ..., 0 = Sunday)
export const DAYS_OF_WEEK: readonly number[] = [1, 2, 3, 4, 5, 6, 0];
