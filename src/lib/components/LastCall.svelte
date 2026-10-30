<script lang="ts">
	import { site, type Season } from '#lib/site.ts';
	import Icon from './Icon.svelte';

	let { season }: { season: Season } = $props();

	const href = $derived(`${site.business.quoteHref}?service=${encodeURIComponent(season.service)}`);
</script>

<!-- A ticket-style seasonal booking card: tag and deadline on the stub, details on the body. -->
<aside
	class="mt-12 grid grid-cols-1 overflow-hidden rounded-card bg-charcoal text-on-dark xs:grid-cols-[minmax(200px,0.34fr)_1fr]"
	aria-label="{season.tag}: {season.headline}"
>
	<div
		class={[
			'relative flex items-baseline justify-between gap-6 bg-accent px-5 py-4 text-ink xs:grid xs:content-between xs:p-6',
			// Perforated tear line between stub and ticket (along the bottom on phones).
			"after:absolute after:content-[''] after:inset-x-2.5 after:-bottom-px after:h-0.5 after:bg-[linear-gradient(90deg,var(--c-charcoal)_50%,transparent_50%)] after:bg-[length:10px_2px]",
			'xs:after:inset-x-auto xs:after:inset-y-2.5 xs:after:-right-px xs:after:bottom-2.5 xs:after:h-auto xs:after:w-0.5 xs:after:bg-[linear-gradient(var(--c-charcoal)_50%,transparent_50%)] xs:after:bg-[length:2px_10px]'
		]}
	>
		<span class="font-display text-[1.4rem] leading-none font-extrabold whitespace-nowrap uppercase tracking-[0.08em]">
			{#if season.urgent}
				<span
					class="mr-[9px] inline-block size-2.5 rounded-full bg-alert align-[0.12em] shadow-[0_0_0_3px_rgb(255_255_255/0.55)]"
					aria-hidden="true"
				></span>
			{/if}
			{season.tag}
		</span>
		<span class="font-display text-[1.15rem] leading-[1.1] font-bold">{season.deadline}</span>
	</div>
	<div class="grid justify-items-start gap-2.5 px-5 py-[22px] xs:px-[30px] xs:py-7">
		<h3 class="text-[clamp(1.8rem,2.6vw,2.3rem)]">{season.headline}</h3>
		<p class="max-w-[36em] text-on-dark-soft">{season.detail}</p>
		<a
			class="mt-2 inline-flex items-center gap-2 font-display text-[1.15rem] font-bold uppercase tracking-[0.05em] text-accent-on-dark no-underline hover:underline hover:underline-offset-[5px]"
			{href}
		>
			Get on the list <Icon name="arrow" size={18} />
		</a>
	</div>
</aside>
