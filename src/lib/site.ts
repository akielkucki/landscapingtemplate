/**
 * The active business, loaded from sites/<slug>/site.json.
 *
 * Which business is active: the SITE environment variable, otherwise
 * "site" in site.config.json (see vite.config.ts). The type below is the
 * contract every site.json must meet; `npm run check` reports anything missing.
 */
import raw from '$site/site.json';

export type Img = {
	/** File name inside the site's images/ folder. Leave empty to show a labelled placeholder. */
	file?: string;
	alt: string;
	/** What the photo should show. Used as the placeholder label. */
	brief: string;
	width?: number;
	height?: number;
	/** CSS object-position, to choose which part of the photo stays in frame. */
	position?: string;
	/** For stacked before/after composites: "top" or "bottom" half. */
	crop?: string;
};

type Flagged = { value: string; placeholder?: boolean };
type Copy = { eyebrow: string; headline: string };

export type Season = {
	id: string;
	/** Inclusive window as [month, day] pairs (1-based months). */
	from: number[];
	to: number[];
	tag: string;
	headline: string;
	detail: string;
	deadline: string;
	/** Must match a service name so the quote form can pre-select it. */
	service: string;
	urgent: boolean;
	placeholder?: boolean;
};

export type Review = {
	author: string;
	town: string;
	date: string;
	rating: number;
	text: string;
	reply?: string;
	placeholder?: boolean;
};

export type Faq = { q: string; a: string; placeholder?: boolean };

export type SiteConfig = {
	deploy: { workerName: string; siteUrl: string };
	seo: { title: string; description: string; schemaType: string; telephone: string };
	theme: {
		colors: Record<string, string>;
		fonts: { display: string; body: string; googleFontsHref: string };
		radius: { ui: string; card: string };
		/** "uppercase" or "none" for the hero headline. */
		headlineCase: string;
		/** "stripes" or "flat" for dark sections. */
		texture: string;
		themeColor: string;
	};
	sections: Record<
		| 'seasonBar'
		| 'heroQuickQuote'
		| 'promises'
		| 'services'
		| 'results'
		| 'story'
		| 'crew'
		| 'reviews'
		| 'serviceArea'
		| 'faq'
		| 'quote'
		| 'careers',
		boolean
	>;
	business: {
		name: string;
		legalName: string;
		slogan: string;
		owners: string;
		founders: string[];
		founded: number;
		region: string;
		/** Short line after the copyright, e.g. "Family-owned in Lower Bucks County, PA." */
		footerLine: string;
		phone: string;
		phoneHref: string;
		email: Flagged;
		hours: Flagged;
		quoteHref: string;
		googleReviewsHref: Flagged;
		social: { label: string; href: string; placeholder?: boolean }[];
		logo: Img;
		mascot: Img;
		favicon: string;
		touchIcon: string;
	};
	trust: {
		googleRating: string;
		googleReviewCount: Flagged;
		bbb: string;
		award: string;
		/** Optional badge artwork; typographic marks are shown when there's no file. */
		badges: { bbb: Img; award: Img };
	};
	nav: { label: string; href: string }[];
	seasons: Season[];
	hero: {
		eyebrow: string;
		headlineTop: string;
		headlineBottom: string;
		/** Word at the end of headlineBottom that gets the hand-drawn underline. */
		underlineWord: string;
		lede: string;
		callLabel: string;
		image: Img;
		quickQuote: { title: string; sub: string };
	};
	promises: Copy & {
		lede: string;
		signoff: string;
		items: { usual: string; title: string; body: string }[];
	};
	services: Copy & {
		lede: string;
		placeholder?: boolean;
		items: { name: string; body: string; season: string }[];
		image: Img;
	};
	results: Copy & {
		lede: string;
		galleryTitle: string;
		ctaText: string;
		items: { title: string; service: string; town?: string; placeholder?: boolean; before: Img; after: Img }[];
		gallery: Img[];
	};
	story: Copy & {
		paragraphs: string[];
		faith: string;
		signoff: string;
		image: Img;
		caption: string;
		facts: { value: string; label: string }[];
	};
	crew: Copy & {
		body: string;
		image: Img;
		rolesPlaceholder?: boolean;
		/** Show names under the photos (turn off when names are printed on the photos). */
		showNames: boolean;
		members: { name: string; photo: string; role?: string }[];
		teaser: { headline: string; body: string; cta: string };
	};
	reviews: Copy & { replyLabel: string; ctaText: string; items: Review[] };
	serviceArea: Copy & {
		lede: string;
		callLabel: string;
		placeholder?: boolean;
		towns: string[];
		image: Img;
	};
	faq: Copy & { items: Faq[] };
	quote: Copy & {
		panelTitle: string;
		panelSub: string;
		callKicker: string;
		steps: { title: string; body: string }[];
		page: Copy & { lede: string };
		detailsPlaceholder: string;
		sizes: string[];
	};
	licenses: { label: string; value: string; placeholder?: boolean }[];
	careers: {
		eyebrow: string;
		headline: string;
		intro: string;
		image: Img;
		valuesDraft?: boolean;
		valuesTitle: string;
		values: { title: string; body: string }[];
		rolesTitle: string;
		rolesLede: string;
		roles: { title: string; type: string; placeholder?: boolean }[];
		applyTitle: string;
		applyLede: string;
		experienceOptions: string[];
	};
};

// Assigning (not casting) makes `npm run check` flag missing or mistyped fields in site.json.
export const site: SiteConfig = raw;
