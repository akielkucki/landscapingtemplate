<script lang="ts">
	import { page } from '$app/state';
	import type { FormState } from '#lib/forms.ts';
	import { site } from '#lib/site.ts';
	import { lede } from '#lib/ui.ts';
	import Eyebrow from '#lib/components/Eyebrow.svelte';
	import Mascot from '#lib/components/Mascot.svelte';
	import QuoteForm from '#lib/components/QuoteForm.svelte';
	import TrustLine from '#lib/components/TrustLine.svelte';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();

	const { business, quote, theme } = site;
	const service = $derived(page.url.searchParams.get('service') ?? '');
</script>

<svelte:head>
	<title>Get an instant quote | {business.name}</title>
	<meta name="description" content="Request a quote from {business.name} in about a minute, or call {business.phone}." />
</svelte:head>

<section class="pt-[clamp(40px,6vw,80px)] pb-section">
	<div class="wrap grid grid-cols-1 items-start gap-x-[clamp(32px,5vw,72px)] gap-y-12 lg:grid-cols-[7fr_4fr]">
		<div class="grid gap-[22px]">
			<Eyebrow text={quote.page.eyebrow} />
			<h1
				class={[
					'text-[clamp(3rem,6vw,5.2rem)] leading-[0.92] font-extrabold',
					theme.headlineCase === 'uppercase' && 'uppercase'
				]}
			>
				{quote.page.headline}
			</h1>
			<p class={lede}>{quote.page.lede}</p>
			<div class="mt-3 rounded-card border border-sand bg-card p-[clamp(22px,3.4vw,40px)]">
				<QuoteForm full initial={form as FormState} {service} />
			</div>
		</div>

		<aside>
			<div
				class="on-dark mow-stripes grid gap-6 rounded-card p-[clamp(24px,3vw,36px)] text-on-dark lg:sticky lg:top-[calc(var(--header-h)+24px)]"
			>
				<h2 class="text-[2rem]">What happens next</h2>
				<ol class="grid gap-[18px]">
					{#each quote.steps as step, i (step.title)}
						<li class="grid grid-cols-[36px_1fr] gap-3.5">
							<span
								class="grid size-9 place-items-center rounded-full border-2 border-accent-on-dark font-display font-extrabold text-accent-on-dark"
								aria-hidden="true">{i + 1}</span
							>
							<div>
								<h3 class="text-[1.35rem]">{step.title}</h3>
								<p class="mt-0.5 text-[0.98rem] text-on-dark-soft">{step.body}</p>
							</div>
						</li>
					{/each}
				</ol>
				<div class="border-t border-rule-dark pt-5 text-on-dark-soft">
					<p>{quote.callKicker}</p>
					<a
						class="mt-0.5 inline-block font-display text-[2.3rem] leading-none font-extrabold text-on-dark no-underline hover:text-accent-on-dark"
						href={business.phoneHref}>{business.phone}</a
					>
				</div>
				<TrustLine tone="dark" stack />
				<!-- The mascot sits on the card's bottom edge. -->
				<div class="-mt-24 -mb-[clamp(24px,3vw,36px)] justify-self-end leading-none">
					<Mascot class="w-[130px]" />
				</div>
			</div>
		</aside>
	</div>
</section>
