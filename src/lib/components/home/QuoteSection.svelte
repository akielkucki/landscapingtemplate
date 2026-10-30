<script lang="ts">
	import { site } from '#lib/site.ts';
	import { sectionTitle } from '#lib/ui.ts';
	import Eyebrow from '../Eyebrow.svelte';
	import Mascot from '../Mascot.svelte';
	import PhTag from '../PhTag.svelte';
	import QuoteForm from '../QuoteForm.svelte';
	import TrustLine from '../TrustLine.svelte';

	const { business, quote } = site;
</script>

<section id="quote" class="on-dark mow-stripes py-section text-on-dark" aria-labelledby="quote-title">
	<div class="wrap grid grid-cols-1 items-start gap-x-[clamp(40px,6vw,96px)] gap-y-[120px] lg:grid-cols-[5fr_6fr] lg:gap-y-12">
		<div class="grid gap-8">
			<Eyebrow text={quote.eyebrow} class="-mb-2" />
			<h2 id="quote-title" class={sectionTitle}>{quote.headline}</h2>

			<ol class="grid gap-[22px]">
				{#each quote.steps as step, i (step.title)}
					<li class="grid grid-cols-[44px_1fr] gap-4">
						<span
							class="grid size-11 place-items-center rounded-full border-2 border-accent-on-dark font-display text-[1.3rem] font-extrabold text-accent-on-dark"
							aria-hidden="true">{i + 1}</span
						>
						<div>
							<h3 class="text-[1.6rem]">{step.title}</h3>
							<p class="mt-1 text-on-dark-soft">{step.body}</p>
						</div>
					</li>
				{/each}
			</ol>

			<div class="grid justify-items-start gap-1 border-t border-rule-dark pt-6">
				<p class="text-on-dark-soft">{quote.callKicker}</p>
				<a
					class="font-display text-[clamp(2.4rem,4vw,3.2rem)] leading-none font-extrabold no-underline hover:text-accent-on-dark"
					href={business.phoneHref}>{business.phone}</a
				>
				<p class="flex flex-wrap items-center gap-2 text-on-dark-soft">
					{business.hours.value}
					{#if business.hours.placeholder}<PhTag label="Confirm hours" />{/if}
				</p>
			</div>

			<TrustLine tone="dark" />
		</div>

		<!-- The mascot stands on the panel's top edge. -->
		<div class="relative rounded-card bg-paper p-[clamp(22px,3.4vw,40px)] text-ink shadow-[0_30px_60px_-30px_rgb(0_0_0/0.55)]">
			<div class="absolute right-[clamp(16px,3vw,36px)] bottom-[calc(100%-2px)] leading-none">
				<Mascot class="w-[104px] xs:w-32" />
			</div>
			<div class="mb-6 xs:pr-[120px]">
				<h3 class="text-[clamp(1.9rem,3vw,2.4rem)]">{quote.panelTitle}</h3>
				<p class="mt-1.5 text-ink-soft">{quote.panelSub}</p>
			</div>
			<QuoteForm />
		</div>
	</div>
</section>
