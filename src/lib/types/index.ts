export type AppDatabase = App.Locals['db'];

export interface ArtistInteraction {
	artist_id: number;
	artist_name: string;
	total_visit_duration: number;
	total_unique_visitors: number;
}

export interface ArtistEngagement {
	artist_id: number;
	artist_name: string;
	engagement_points: number;
	hour_of_day: number;
	day_of_week: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export interface UserEventWithArtist {
	artist_id: number;
	artist_name: string;
	event_type: PositiveEventType;
	event_created_at: number;
	user_timezone: string;
}

export type PositiveEventType =
	| 'play_track'
	| 'share_track'
	| 'add_track_to_playlist'
	| 'like_track'
	| 'follow_artist'
	| 'share_artist';
