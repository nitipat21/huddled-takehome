import { DAYS_OF_WEEK, HOURS } from '$lib/constants';
import { ArtistService } from '../../services/artistService';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const db = locals.db;
	const artistService = new ArtistService(db);
	const artistPositiveEngagements = artistService.getArtistPositiveEngagements();

	const artistIds = new Set<number>();
	const artistNames: Record<number, string> = {};
	const engagementsByHour: Record<string, number> = {};
	const engagementsByDay: Record<string, number> = {};
	const heatmapDataByHour: Array<{
		hour: number;
		artist_id: number;
		artist_name: string;
		total_engagements: number;
	}> = [];
	const heatmapDataByDay: Array<{
		day: number;
		artist_id: number;
		artist_name: string;
		total_engagements: number;
	}> = [];

	for (const {
		artist_id,
		artist_name,
		hour_of_day,
		day_of_week,
		engagement_points
	} of artistPositiveEngagements) {
		artistIds.add(artist_id);

		if (!artistNames[artist_id]) {
			artistNames[artist_id] = artist_name;
		}

		const hourKey = `${artist_id}_${hour_of_day}`;
		engagementsByHour[hourKey] = (engagementsByHour[hourKey] || 0) + engagement_points;

		const dayKey = `${artist_id}_${day_of_week}`;
		engagementsByDay[dayKey] = (engagementsByDay[dayKey] || 0) + engagement_points;
	}

	const sortedArtistIds = Array.from(artistIds).sort((a, b) => a - b);

	for (const artistId of sortedArtistIds) {
		for (const hour of HOURS) {
			heatmapDataByHour.push({
				hour,
				artist_id: artistId,
				artist_name: artistNames[artistId],
				total_engagements: engagementsByHour[`${artistId}_${hour}`] || 0
			});
		}

		for (const day of DAYS_OF_WEEK) {
			heatmapDataByDay.push({
				day,
				artist_id: artistId,
				artist_name: artistNames[artistId],
				total_engagements: engagementsByDay[`${artistId}_${day}`] || 0
			});
		}
	}

	return {
		heatmapDataByHour,
		heatmapDataByDay
	};
};
