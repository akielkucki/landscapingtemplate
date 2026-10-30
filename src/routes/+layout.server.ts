import { activeSeason } from '#lib/season.ts';
import type { LayoutServerLoad } from './$types';

// The seasonal banner depends on today's date, so it's worked out per request.
export const load: LayoutServerLoad = () => {
	return { season: activeSeason() };
};
