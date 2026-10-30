<script lang="ts">
	import '../app.css';
	import { imageUrl } from '#lib/images.ts';
	import { site } from '#lib/site.ts';
	import { themeCss } from '#lib/theme.ts';
	import MobileActionBar from '#lib/components/MobileActionBar.svelte';
	import SeasonBar from '#lib/components/SeasonBar.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();

	const { business, theme } = site;
	const favicon = imageUrl(business.favicon);
	const touchIcon = imageUrl(business.touchIcon);
	// The active business's colours, fonts and radii (see src/lib/theme.ts and app.css).
	const themeStyle = `<style>${themeCss(theme)}</style>`;
</script>

<svelte:head>
	{@html themeStyle}
	<meta name="theme-color" content={theme.themeColor} />
	<link rel="stylesheet" href={theme.fonts.googleFontsHref} />
	{#if favicon}<link rel="icon" href={favicon} />{/if}
	{#if touchIcon}<link rel="apple-touch-icon" href={touchIcon} />{/if}
</svelte:head>

<a
	class="absolute top-2 left-2 z-[100] -translate-y-[160%] rounded-ui bg-ink px-4 py-2.5 font-semibold text-paper focus:translate-y-0"
	href="#main">Skip to content</a
>

{#if data.season}
	<SeasonBar season={data.season} />
{/if}
<SiteHeader />

<main id="main" tabindex="-1" class="focus:outline-none">
	{@render children()}
</main>

<SiteFooter />
<MobileActionBar />
