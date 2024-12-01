import { ArtistService } from '../../services/artistService';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const db = locals.db;
	const artistService = new ArtistService(db);
	const artistInteractions = artistService.getArtistInteractions();

	return { artistInteractions };
};
