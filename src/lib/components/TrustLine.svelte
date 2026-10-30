<script lang="ts">
	import { imageUrl } from '#lib/images.ts';
	import { site } from '#lib/site.ts';
	import Icon from './Icon.svelte';

	/** stack: one item per line, for narrow sidebars. Items with an empty value in site.json are left out. */
	let { tone = 'light', stack = false }: { tone?: 'light' | 'dark'; stack?: boolean } = $props();

	const { trust } = site;
	const bbbSrc = imageUrl(trust.badges.bbb.file);
	const awardSrc = imageUrl(trust.badges.award.file);
	// "Best of Bucks 2026 nominee" → a "2026" mark beside "Best of Bucks nominee".
	const awardYear = trust.award.match(/\b(?:19|20)\d{2}\b/)?.[0];
	const awardText = awardYear ? trust.award.replace(awardYear, '').replace(/\s+/g, ' ').trim() : trust.award;

	const dark = $derived(tone === 'dark');
	const mark = $derived([
		'inline-grid h-[30px] min-w-[34px] place-items-center rounded-[3px] border-2 border-current px-1.5 font-display text-[1.05rem] font-extrabold',
		dark ? 'text-on-dark' : 'text-ink'
	]);
</script>

{#if trust.googleRating || trust.bbb || trust.award}
	<ul
		class={[
			'flex flex-wrap gap-x-4 gap-y-2.5 text-[0.98rem] xs:gap-x-[26px]',
			stack
				? 'flex-col items-start'
				: 'items-center [&>li+li]:border-l [&>li+li]:pl-4 xs:[&>li+li]:pl-[26px] max-xs:[&>li:nth-child(3)]:border-l-0 max-xs:[&>li:nth-child(3)]:pl-0',
			dark ? 'text-on-dark-soft [&>li]:border-rule-dark' : 'text-ink-soft [&>li]:border-sand'
		]}
		aria-label="Ratings and recognition"
	>
		{#if trust.googleRating}
			<li class="inline-flex items-center gap-[9px]">
				<span class="inline-flex gap-px text-accent" aria-hidden="true">
					{#each { length: 5 } as _}<Icon name="star" size={17} />{/each}
				</span>
				<span><strong class={['font-semibold', dark ? 'text-on-dark' : 'text-ink']}>{trust.googleRating}</strong> on Google</span>
			</li>
		{/if}
		{#if trust.bbb}
			<li class="inline-flex items-center gap-[9px]">
				{#if bbbSrc}
					<img class="h-9 w-auto" src={bbbSrc} alt={trust.badges.bbb.alt} />
				{:else}
					<span class={mark} aria-hidden="true">{trust.bbb}</span>
					<span>BBB rating</span>
				{/if}
			</li>
		{/if}
		{#if trust.award}
			<li class="inline-flex items-center gap-[9px]">
				{#if awardSrc}
					<img class="h-11 w-auto" src={awardSrc} alt={trust.badges.award.alt} />
				{:else}
					{#if awardYear}<span class={mark} aria-hidden="true">{awardYear}</span>{/if}
					<span>{awardText}</span>
				{/if}
			</li>
		{/if}
	</ul>
{/if}
