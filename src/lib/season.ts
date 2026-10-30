import { site, type Season } from '#lib/site.ts';

const key = (month: number, day: number) => month * 100 + day;

/** The seasonal campaign whose window contains `date`, if any. Windows may wrap past New Year. */
export function activeSeason(date = new Date()): Season | undefined {
	if (!site.sections.seasonBar) return undefined;
	const today = key(date.getMonth() + 1, date.getDate());
	return site.seasons.find(({ from, to }) => {
		const start = key(from[0], from[1]);
		const end = key(to[0], to[1]);
		return start <= end ? today >= start && today <= end : today >= start || today <= end;
	});
}
