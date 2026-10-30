<script lang="ts">
	import { site, type Season } from '#lib/site.ts';
	import { arrowLink, lede, sectionTitle } from '#lib/ui.ts';
	import Cta from '../Cta.svelte';
	import Eyebrow from '../Eyebrow.svelte';
	import Icon from '../Icon.svelte';
	import LastCall from '../LastCall.svelte';
	import PhTag from '../PhTag.svelte';
	import Photo from '../Photo.svelte';

	let { season }: { season?: Season } = $props();

	const { business, services } = site;
	const quoteFor = (name: string) => `${business.quoteHref}?service=${encodeURIComponent(name)}`;
</script>

<section id="services" class="pt-[calc(var(--spacing-section)+24px)] pb-section" aria-labelledby="services-title">
	<!-- On narrow screens the list follows the heading; the photo and button come after it. -->
	<div class="wrap flex flex-col gap-6 lg:grid lg:grid-cols-[5fr_7fr] lg:gap-x-[clamp(40px,6vw,96px)] lg:gap-y-14">
		<div class="contents lg:block">
			<div class="contents lg:sticky lg:top-[calc(var(--header-h)+32px)] lg:grid lg:justify-items-start lg:gap-6">
				<Eyebrow text={services.eyebrow} class="self-start" />
				<h2 id="services-title" class={sectionTitle}>{services.headline}</h2>
				<p class={lede}>{services.lede}</p>
				{#if services.placeholder}<span class="self-start"><PhTag label="Draft list, confirm services" /></span>{/if}
				<Photo image={services.image} ratio="3 / 2" class="order-2 mt-6 w-full lg:order-none lg:mt-0" />
				<div class="order-3 self-start lg:order-none"><Cta kind="quote" /></div>
			</div>
		</div>

		<div class="order-1 mt-2 lg:order-none lg:mt-0">
			<ol class="border-t-2 border-ink">
				{#each services.items as item, i (item.name)}
					<li
						class="grid grid-cols-[36px_minmax(0,1fr)] gap-x-6 gap-y-2 border-b border-sand py-[30px] sm:grid-cols-[52px_minmax(0,1fr)_auto]"
					>
						<span class="pt-2 font-display text-[1.05rem] font-bold tracking-[0.08em] text-accent-ink" aria-hidden="true">
							{String(i + 1).padStart(2, '0')}
						</span>
						<div>
							<h3 class="text-[clamp(1.9rem,2.8vw,2.4rem)]">{item.name}</h3>
							<p class="mt-2.5 max-w-[34em] text-ink-soft">{item.body}</p>
						</div>
						<div
							class="col-start-2 flex flex-wrap items-center justify-between gap-3 sm:col-start-auto sm:grid sm:content-between sm:justify-items-end sm:text-right"
						>
							<span class="font-display text-[0.9rem] font-bold whitespace-nowrap uppercase tracking-[0.1em] text-ink-soft">
								{item.season}
							</span>
							<a class={[arrowLink, 'text-[1.1rem] text-brand']} href={quoteFor(item.name)}>
								Quote this <span class="sr-only">: {item.name}</span>
								<Icon name="arrow" size={18} />
							</a>
						</div>
					</li>
				{/each}
			</ol>

			{#if season}<LastCall {season} />{/if}
		</div>
	</div>
</section>
