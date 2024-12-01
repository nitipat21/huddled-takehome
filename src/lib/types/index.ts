export type AppDatabase = App.Locals['db'];

export interface ArtistInteraction {
	artist_id: number;
	artist_name: string;
	total_visit_duration: number;
	total_unique_visitors: number;
}
