import { ENGAGEMENT_POINTS } from '$lib/constants';
import type {
	AppDatabase,
	ArtistEngagement,
	ArtistInteraction,
	PositiveEventType,
	UserEventWithArtist
} from '$lib/types';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export class ArtistService {
	private readonly db: AppDatabase;

	constructor(db: AppDatabase) {
		this.db = db;
	}

	public getArtistInteractions() {
		const query = `
            SELECT 
                a.id AS artist_id,
                a.name AS artist_name,
                SUM(v.end_time - v.start_time) AS total_visit_duration,
                COUNT(DISTINCT s.user_id) AS total_unique_visitors
            FROM 
                artists a
            JOIN 
                visits v ON a.id = v.artist_id
            JOIN 
                sessions s ON v.session_id = s.id
            GROUP BY 
                a.id
            ORDER BY 
                total_visit_duration DESC;
        `;

		const statement = this.db.prepare<ArtistInteraction, []>(query);
		const result = statement.all();
		return result;
	}

	public getArtistPositiveEngagements(): ArtistEngagement[] {
		const positiveEvents: readonly PositiveEventType[] = [
			'play_track',
			'share_track',
			'add_track_to_playlist',
			'like_track',
			'follow_artist',
			'share_artist'
		];

		const positiveEventsStr = positiveEvents.map((event) => `'${event}'`).join(', ');

		const query = `
            SELECT 
                a.name AS artist_name,
                ue.artist_id,
                ue.event_type,
                ue.created_at AS event_created_at,
                u.timezone AS user_timezone
            FROM 
                user_events ue
            JOIN 
                artists a ON ue.artist_id = a.id
            JOIN 
                users u ON ue.user_id = u.id
            WHERE
                ue.event_type IN (${positiveEventsStr});
        `;

		const statement = this.db.prepare<UserEventWithArtist, []>(query);
		const result = statement.all();

		const formattedResult = result.map(
			({ artist_id, artist_name, event_type, event_created_at, user_timezone }) => {
				const localDateTime = dayjs(event_created_at).tz(user_timezone);
				const hourOfDay = localDateTime.hour();
				const dayofWeek = localDateTime.day();
				const engagementPoints = ENGAGEMENT_POINTS[event_type];

				return {
					artist_id,
					artist_name,
					engagement_points: engagementPoints,
					hour_of_day: hourOfDay,
					day_of_week: dayofWeek
				};
			}
		);

		return formattedResult;
	}
}
