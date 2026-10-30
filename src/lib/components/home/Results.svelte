<script lang="ts">
	import { site } from '#lib/site.ts';
	import { kicker, lede, sectionTitle } from '#lib/ui.ts';
	import BeforeAfter from '../BeforeAfter.svelte';
	import CtaRow from '../CtaRow.svelte';
	import Eyebrow from '../Eyebrow.svelte';
	import PhTag from '../PhTag.svelte';
	import Photo from '../Photo.svelte';

	const { results } = site;

	let active = $state(0);
	const project = $derived(results.items[active]);
	const anyPlaceholder = results.items.some((r) => r.placeholder);
</script>

<section id="results" class="on-dark bg-charcoal py-section text-on-dark" aria-labelledby="results-title">
	<div class="wrap">
		<div class="mb-12 grid grid-cols-1 items-end gap-x-16 gap-y-6 lg:grid-cols-[7fr_5fr]">
			<div class="grid gap-6">
				<Eyebrow text={results.eyebrow} />
				<h2 id="results-title" class={sectionTitle}>{results.headline}</h2>
			</div>
			<div class="grid justify-items-start gap-3.5">
				<p class={lede}>{results.lede}</p>
				{#if anyPlaceholder}<PhTag label="Placeholder photos, add real job pairs" />{/if}
			</div>
		</div>

		{#if project}
			<div class="grid grid-cols-1 items-start gap-x-[clamp(24px,4vw,56px)] gap-y-8 lg:grid-cols-[8fr_4fr]">
				{#key active}
					<BeforeAfter before={project.before} after={project.after} label={project.title} />
				{/key}

				<div class="grid grid-cols-2 gap-x-4 border-t border-rule-dark lg:grid-cols-1" role="group" aria-label="Choose a job to compare">
					{#each results.items as item, i (item.title)}
						<button
							class="grid cursor-pointer grid-cols-[auto_1fr] gap-x-3.5 gap-y-0.5 border-0 border-b border-l-[3px] border-b-rule-dark border-l-transparent bg-transparent py-[18px] pl-3 text-left text-on-dark-soft transition-colors hover:bg-white/[0.03] hover:text-on-dark aria-pressed:border-l-accent aria-pressed:bg-white/5 aria-pressed:text-on-dark lg:pl-4"
							type="button"
							aria-pressed={i === active}
							onclick={() => (active = i)}
						>
							<span class="row-span-2 pt-0.5 font-display font-bold text-accent-on-dark">{String(i + 1).padStart(2, '0')}</span>
							<span class="font-display text-[1.2rem] leading-[1.1] font-bold lg:text-[1.45rem]">{item.title}</span>
							<span class="text-[0.92rem]">{item.service}{item.town ? ` · ${item.town}` : ''}</span>
						</button>
					{/each}
				</div>
			</div>
		{/if}

		{#if results.gallery.length}
			<h3 class={[kicker, 'mt-[clamp(48px,6vw,72px)] mb-4']}>{results.galleryTitle}</h3>
			<ul class="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-4">
				{#each results.gallery as image (image.alt)}
					<li><Photo {image} ratio="4 / 3" /></li>
				{/each}
			</ul>
		{/if}

		<CtaRow text={results.ctaText} tone="dark" />
	</div>
</section>
