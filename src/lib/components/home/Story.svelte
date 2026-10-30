<script lang="ts">
	import { site } from '#lib/site.ts';
	import { sectionTitle } from '#lib/ui.ts';
	import Eyebrow from '../Eyebrow.svelte';
	import Photo from '../Photo.svelte';

	const { story } = site;
</script>

<section id="story" class="bg-cream py-section" aria-labelledby="story-title">
	<div class="wrap grid grid-cols-1 items-center gap-x-[clamp(40px,7vw,112px)] gap-y-12 lg:grid-cols-[5fr_6fr]">
		<figure class="m-0 max-w-[460px] lg:max-w-none">
			<Photo image={story.image} ratio="4 / 5" />
			<figcaption class="mt-3 text-[0.95rem] text-ink-soft">{story.caption}</figcaption>
		</figure>

		<div class="grid gap-[22px]">
			<Eyebrow text={story.eyebrow} class="mb-0.5" />
			<h2 id="story-title" class={sectionTitle}>{story.headline}</h2>
			{#each story.paragraphs as paragraph (paragraph)}
				<p class="max-w-[34em] text-ink-soft">{paragraph}</p>
			{/each}

			{#if story.faith}
				<blockquote class="m-0 mt-3 border-t-2 border-ink pt-7">
					<p class="max-w-[26em] font-display text-[clamp(1.55rem,2.4vw,2rem)] leading-[1.2] font-semibold text-ink italic">
						{story.faith}
					</p>
					<footer
						class="mt-3.5 font-display font-bold uppercase tracking-[0.12em] text-accent-ink before:content-['—_']"
					>
						{story.signoff}
					</footer>
				</blockquote>
			{/if}

			<!-- Facts sit in a row on desktop and stack on phones. -->
			<dl class="flex flex-col gap-4 lg:flex-row lg:flex-wrap">
				{#each story.facts as fact (fact.label)}
					<div class="flex flex-col-reverse gap-1 border-t border-field pt-3.5">
						<dt class="text-[0.92rem] leading-[1.3] text-ink-soft">{fact.label}</dt>
						<dd class="m-0 font-display text-[clamp(2.6rem,4.4vw,3.6rem)] leading-[0.9] font-extrabold text-brand">{fact.value}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>
</section>
