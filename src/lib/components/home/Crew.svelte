<script lang="ts">
	import { imageUrl } from '#lib/images.ts';
	import { site } from '#lib/site.ts';
	import { kicker, lede, sectionTitle } from '#lib/ui.ts';
	import Eyebrow from '../Eyebrow.svelte';
	import Icon from '../Icon.svelte';
	import PhTag from '../PhTag.svelte';
	import Photo from '../Photo.svelte';

	const { crew, sections } = site;
</script>

<section id="crew" class="on-dark bg-deep py-section text-on-dark" aria-labelledby="crew-title">
	<div class="wrap">
		<div class="mb-12 grid grid-cols-1 items-end gap-x-16 gap-y-6 lg:grid-cols-[7fr_5fr]">
			<div class="grid gap-6">
				<Eyebrow text={crew.eyebrow} />
				<h2 id="crew-title" class={sectionTitle}>{crew.headline}</h2>
			</div>
			<p class={lede}>{crew.body}</p>
		</div>

		<Photo image={crew.image} ratio="21 / 9" class="bg-charcoal max-sm:aspect-[16/10]!" />

		{#if crew.members.length}
			<div class="mt-14 flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-rule-dark pb-3.5">
				<h3 class={kicker}>On the crew</h3>
				{#if crew.rolesPlaceholder}<PhTag label="Add roles" />{/if}
			</div>
			<!-- A team sheet: portraits with names, six across on desktop. -->
			<ul class="grid grid-cols-3 gap-x-3 gap-y-5 pt-7 sm:gap-x-5 sm:gap-y-7 md:grid-cols-4 lg:grid-cols-6">
				{#each crew.members as member (member.name)}
					{@const src = imageUrl(member.photo)}
					<li class="grid content-start gap-2.5">
						{#if src}
							<img
								class="aspect-[380/418] w-full rounded-ui bg-paper object-cover"
								{src}
								alt=""
								width="380"
								height="418"
								loading="lazy"
								decoding="async"
							/>
						{:else}
							<span
								class="grid aspect-[380/418] w-full place-items-center rounded-ui bg-charcoal font-display text-[2.4rem] font-extrabold text-on-dark-soft"
								aria-hidden="true">{member.name.charAt(0)}</span
							>
						{/if}
						<span class={['font-display text-[1.05rem] leading-[1.05] font-bold sm:text-[1.3rem]', !crew.showNames && 'sr-only']}>
							{member.name}
						</span>
						{#if member.role}<span class="-mt-1.5 text-[0.9rem] text-on-dark-soft">{member.role}</span>{/if}
					</li>
				{/each}
			</ul>
		{/if}

		{#if sections.careers}
			<a
				class="group mt-16 flex flex-wrap items-center justify-between gap-x-10 gap-y-5 rounded-card bg-paper p-[clamp(24px,4vw,40px)] text-ink no-underline transition-colors hover:bg-card"
				href="/careers"
			>
				<span class="grid max-w-[44em] gap-2">
					<span class="font-display text-[clamp(2.2rem,4vw,3rem)] leading-none font-extrabold text-brand">{crew.teaser.headline}</span>
					<span class="text-ink-soft">{crew.teaser.body}</span>
				</span>
				<span
					class="inline-flex items-center gap-2.5 font-display text-[1.3rem] font-bold whitespace-nowrap uppercase tracking-[0.05em]"
				>
					{crew.teaser.cta}
					<span class="text-accent-ink transition-transform duration-200 group-hover:translate-x-1"><Icon name="arrow" size={22} /></span>
				</span>
			</a>
		{/if}
	</div>
</section>
