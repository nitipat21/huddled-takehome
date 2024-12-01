import type { AppDatabase, ArtistInteraction } from '$lib/types';

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
}
