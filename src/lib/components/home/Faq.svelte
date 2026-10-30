<script lang="ts">
	import { site } from '#lib/site.ts';
	import { lede, sectionTitle } from '#lib/ui.ts';
	import Eyebrow from '../Eyebrow.svelte';
	import PhTag from '../PhTag.svelte';

	const { business, faq } = site;
	const bar = 'absolute top-1/2 left-0 -mt-[1.5px] h-[3px] w-full bg-accent transition-transform duration-200';
</script>

<section id="faq" class="py-section" aria-labelledby="faq-title">
	<div class="wrap grid grid-cols-1 items-start gap-x-[clamp(40px,6vw,96px)] gap-y-10 lg:grid-cols-[5fr_7fr]">
		<div class="grid gap-6">
			<Eyebrow text={faq.eyebrow} />
			<h2 id="faq-title" class={sectionTitle}>{faq.headline}</h2>
			<p class={lede}>
				Still wondering about something? Call
				<a class="font-semibold whitespace-nowrap text-brand" href={business.phoneHref}>{business.phone}</a>
				and ask.
			</p>
		</div>

		<div class="border-t-2 border-ink">
			{#each faq.items as item, i (item.q)}
				<details class="group border-b border-sand" open={i === 0}>
					<summary
						class="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-[clamp(1.45rem,2.2vw,1.8rem)] leading-[1.15] font-bold [&::-webkit-details-marker]:hidden"
					>
						<span class="hover:text-brand">{item.q}</span>
						<!-- Plus that turns into a minus. -->
						<span class="relative size-[18px] shrink-0" aria-hidden="true">
							<span class={bar}></span>
							<span class={[bar, 'rotate-90 group-open:rotate-0']}></span>
						</span>
					</summary>
					<div class="grid max-w-[40em] justify-items-start gap-2.5 pb-[26px] text-ink-soft">
						{#if item.placeholder}<PhTag label="Answer needed" />{/if}
						<p>{item.a}</p>
					</div>
				</details>
			{/each}
		</div>
	</div>
</section>
