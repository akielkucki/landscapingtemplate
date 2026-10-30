<script lang="ts">
	import { imageUrl } from '#lib/images.ts';
	import { site } from '#lib/site.ts';
	import Crew from '#lib/components/home/Crew.svelte';
	import Faq from '#lib/components/home/Faq.svelte';
	import Hero from '#lib/components/home/Hero.svelte';
	import Promises from '#lib/components/home/Promises.svelte';
	import QuoteSection from '#lib/components/home/QuoteSection.svelte';
	import Results from '#lib/components/home/Results.svelte';
	import Reviews from '#lib/components/home/Reviews.svelte';
	import ServiceArea from '#lib/components/home/ServiceArea.svelte';
	import Services from '#lib/components/home/Services.svelte';
	import Story from '#lib/components/home/Story.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const { business, deploy, sections, seo, serviceArea } = site;

	// Only facts the business has confirmed go into structured data.
	const logo = imageUrl(business.logo.file);
	const jsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': seo.schemaType,
		name: business.legalName,
		slogan: business.slogan,
		url: deploy.siteUrl,
		...(logo && { logo: new URL(logo, deploy.siteUrl).href }),
		telephone: seo.telephone,
		foundingDate: String(business.founded),
		founder: business.founders.map((name) => ({ '@type': 'Person', name })),
		areaServed: serviceArea.placeholder ? business.region : serviceArea.towns.map((town) => `${town}, ${business.region}`)
	});
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<Hero />
{#if sections.promises}<Promises />{/if}
{#if sections.services}<Services season={data.season} />{/if}
{#if sections.results}<Results />{/if}
{#if sections.story}<Story />{/if}
{#if sections.crew}<Crew />{/if}
{#if sections.reviews}<Reviews />{/if}
{#if sections.serviceArea}<ServiceArea />{/if}
{#if sections.faq}<Faq />{/if}
{#if sections.quote}<QuoteSection />{/if}
