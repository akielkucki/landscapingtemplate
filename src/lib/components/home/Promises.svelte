<script lang="ts">
	import { reveal } from '#lib/reveal.ts';
	import { site } from '#lib/site.ts';
	import { lede, sectionTitle } from '#lib/ui.ts';
	import Eyebrow from '../Eyebrow.svelte';

	const { business, promises } = site;
</script>

<section
	class="on-dark mow-stripes pt-[calc(var(--spacing-section)+24px)] pb-section text-on-dark"
	aria-labelledby="promise-title"
>
	<div class="wrap grid grid-cols-1 items-start gap-x-[clamp(40px,7vw,112px)] gap-y-12 lg:grid-cols-[5fr_6fr]">
		<div class="grid gap-6">
			<Eyebrow text={promises.eyebrow} />
			<h2 id="promise-title" class={sectionTitle}>{promises.headline}</h2>
			<p class={lede}>{promises.lede}</p>
		</div>

		<ol class="border-t border-rule-dark">
			{#each promises.items as item, i (item.title)}
				<li class="grid grid-cols-[44px_1fr] gap-2 border-b border-rule-dark py-7 lg:grid-cols-[64px_1fr]" use:reveal={i * 250}>
					<span class="pt-[0.45em] font-display text-[1.15rem] font-bold tracking-[0.08em] text-accent-on-dark" aria-hidden="true">
						{String(i + 1).padStart(2, '0')}
					</span>
					<div>
						<!-- Contrast framing: the usual experience, struck through, above the promise. -->
						{#if item.usual}
							<p class="mb-2 text-[0.98rem] text-on-dark-soft">
								<span class="font-display text-[0.85rem] font-bold uppercase tracking-[0.1em]">The usual:</span>
								<s class="decoration-accent-on-dark decoration-2">{item.usual}</s>
							</p>
						{/if}
						<h3 class="text-[clamp(2rem,3.4vw,2.8rem)] leading-none">{item.title}</h3>
						<p class="mt-2.5 max-w-[36em] text-on-dark-soft">{item.body}</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
	<p class="wrap mt-10 font-display text-[1.5rem] font-semibold text-on-dark-soft">
		{promises.signoff}
		<a
			class="text-on-dark decoration-accent decoration-2 underline-offset-[6px] hover:text-accent-on-dark"
			href={business.phoneHref}>{business.phone}</a
		>
	</p>
</section>
