<script lang="ts">
	import { site } from '#lib/site.ts';
	import { lede } from '#lib/ui.ts';
	import Cta from '../Cta.svelte';
	import Eyebrow from '../Eyebrow.svelte';
	import Photo from '../Photo.svelte';
	import QuoteForm from '../QuoteForm.svelte';
	import TrustLine from '../TrustLine.svelte';

	const { hero, sections, theme } = site;

	// The underlined word sits at the end of the second line.
	const word = hero.underlineWord;
	const bottomStart =
		word && hero.headlineBottom.endsWith(word) ? hero.headlineBottom.slice(0, -word.length) : hero.headlineBottom;
	const underlined = bottomStart !== hero.headlineBottom ? word : '';
</script>

<section class="relative z-[1] pt-[clamp(32px,4.4vw,64px)]" aria-labelledby="hero-title">
	<!-- On wide screens the photo bleeds off the right edge of the page. -->
	<div
		class="grid grid-cols-[var(--spacing-gutter)_minmax(0,1fr)_var(--spacing-gutter)] lg:grid-cols-[minmax(var(--spacing-gutter),1fr)_minmax(0,680px)_clamp(32px,4vw,64px)_minmax(0,496px)_minmax(0,1fr)]"
	>
		<div class="col-start-2 flex flex-col items-start gap-[26px] pb-10 lg:pb-[clamp(56px,7vw,104px)]">
			<Eyebrow text={hero.eyebrow} />
			<h1
				id="hero-title"
				class={[
					'text-[clamp(3.3rem,6.3vw,6.1rem)] leading-[0.9] font-extrabold tracking-[-0.01em] text-ink',
					theme.headlineCase === 'uppercase' && 'uppercase'
				]}
			>
				<span class="block">{hero.headlineTop}</span>
				<span class="block text-brand">
					{bottomStart}{#if underlined}<span class="relative inline-block whitespace-nowrap"
							>{underlined}<svg
								class="absolute -bottom-[0.1em] -left-[2%] h-[0.2em] w-[104%] overflow-visible"
								viewBox="0 0 200 18"
								preserveAspectRatio="none"
								aria-hidden="true"
								><path
									class="fill-none stroke-accent stroke-[7] [stroke-linecap:round] [vector-effect:non-scaling-stroke] motion-safe:animate-draw motion-safe:[stroke-dasharray:220] motion-safe:[stroke-dashoffset:220]"
									d="M3 12.5c38-6.8 92-9.6 194-4.2"
								/></svg
							></span
						>{/if}
				</span>
			</h1>
			<p class={[lede, 'max-w-[33em]']}>{hero.lede}</p>
			<div class="flex flex-wrap gap-3 max-xs:grid max-xs:w-full">
				<Cta kind="quote" />
				<Cta kind="call" label={hero.callLabel} />
			</div>
			<TrustLine />
		</div>

		<div class="relative col-span-full aspect-[4/3] lg:col-[4/6] lg:-mb-[88px] lg:aspect-auto lg:min-h-[560px]">
			<Photo image={hero.image} ratio="auto" eager rounded={false} class="h-full lg:rounded-l-ui" />

			{#if sections.heroQuickQuote}
				<!--
					Lead capture above the fold on desktop: a tall panel down the right of the photo,
					lined up with the content edge. Phones get the sticky call / quote bar instead.
				-->
				<div
					class="absolute top-[clamp(20px,2.4vw,32px)] right-[max(28px,calc((100vw-1240px)/2-8px))] hidden w-[min(360px,calc(100%-56px))] rounded-card bg-paper px-[26px] pt-[26px] pb-5 shadow-[0_24px_50px_-24px_rgb(0_0_0/0.55)] lg:block"
				>
					<h2 class="text-[1.9rem] leading-none">{hero.quickQuote.title}</h2>
					<p class="mt-1 mb-4 text-[0.95rem] text-ink-soft">{hero.quickQuote.sub}</p>
					<QuoteForm quick stacked />
				</div>
			{/if}
		</div>
	</div>
</section>
