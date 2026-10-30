<script lang="ts">
	import { site, type Review } from '#lib/site.ts';
	import { sectionTitle } from '#lib/ui.ts';
	import CtaRow from '../CtaRow.svelte';
	import Eyebrow from '../Eyebrow.svelte';
	import Icon from '../Icon.svelte';
	import PhTag from '../PhTag.svelte';

	const { business, reviews, trust } = site;
	const [featured, ...rest] = reviews.items;
</script>

{#snippet stars(count: number)}
	<span class="inline-flex gap-0.5 text-accent" role="img" aria-label="{count} out of 5 stars">
		{#each { length: count } as _}<Icon name="star" size={18} />{/each}
	</span>
{/snippet}

{#snippet card(review: Review, big: boolean)}
	<article class="grid justify-items-start gap-4 rounded-card border border-sand bg-card p-[clamp(24px,3vw,36px)]">
		{#if review.placeholder}<PhTag label="Placeholder, paste the real review" />{/if}
		{@render stars(review.rating)}
		<blockquote class="m-0">
			<p
				class={big
					? 'font-display text-[clamp(1.6rem,2.6vw,2.1rem)] leading-[1.2] font-semibold'
					: 'text-[1.05rem] leading-[1.6]'}
			>
				“{review.text}”
			</p>
		</blockquote>
		<p class="flex flex-wrap gap-x-3 gap-y-1 text-[0.95rem] text-ink-soft">
			<strong class="text-ink">{review.author}</strong>
			<span>{review.town} · {review.date}</span>
		</p>
		{#if review.reply}
			<div class="w-full rounded-ui bg-cream px-[18px] py-4 text-[0.98rem]">
				<p class="mb-1.5 flex items-center gap-2 font-display font-bold uppercase tracking-[0.08em] text-brand">
					<Icon name="reply" size={18} />
					{reviews.replyLabel}
				</p>
				<p>{review.reply}</p>
			</div>
		{/if}
	</article>
{/snippet}

<section id="reviews" class="py-section" aria-labelledby="reviews-title">
	<div class="wrap">
		<div class="mb-14 grid grid-cols-1 items-end gap-x-16 gap-y-8 lg:grid-cols-[7fr_5fr]">
			<div class="grid gap-6">
				<Eyebrow text={reviews.eyebrow} />
				<h2 id="reviews-title" class={sectionTitle}>{reviews.headline}</h2>
			</div>
			<div class="flex items-center gap-5 border-t-2 border-b border-t-ink border-b-sand py-5">
				{#if trust.googleRating}
					<p class="font-display text-[5rem] leading-[0.8] font-extrabold">{trust.googleRating}</p>
				{/if}
				<div>
					{#if trust.googleRating}{@render stars(5)}{/if}
					<p class="mt-1 flex flex-wrap items-center gap-1.5 text-ink-soft">
						Google reviews · {trust.googleReviewCount.value}
						{#if trust.googleReviewCount.placeholder}<PhTag label="Count" />{/if}
					</p>
					<a
						class="mt-1.5 inline-flex items-center gap-1.5 font-semibold text-brand underline-offset-4"
						href={business.googleReviewsHref.value}
						rel="noopener"
					>
						Read every review on Google <Icon name="arrow" size={16} />
					</a>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-[7fr_5fr]">
			{#if featured}{@render card(featured, true)}{/if}
			<div class="grid gap-6">
				{#each rest as review, i (i)}{@render card(review, false)}{/each}
			</div>
		</div>

		<CtaRow text={reviews.ctaText} />
	</div>
</section>
