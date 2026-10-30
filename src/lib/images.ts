/**
 * Resolves image file names from site.json to bundled URLs.
 *
 * Only the active site's images/ folder is bundled. File names are relative
 * to that folder, e.g. "logo.webp" or "team/jane-doe.webp". Anything missing
 * renders as a labelled placeholder instead of a broken image.
 */
const files = import.meta.glob<string>('$site/images/**/*.{jpg,jpeg,png,webp,avif,svg}', {
	eager: true,
	query: '?url',
	import: 'default'
});

const byName = new Map<string, string>();
for (const [path, url] of Object.entries(files)) {
	const relative = path.slice(path.indexOf('/images/') + '/images/'.length).toLowerCase();
	byName.set(relative, url);
	const base = relative.split('/').pop()!;
	if (!byName.has(base)) byName.set(base, url);
}

export function imageUrl(file: string | undefined): string | undefined {
	if (!file) return undefined;
	return byName.get(file.toLowerCase());
}
