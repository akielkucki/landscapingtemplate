<script lang="ts">
	import { site } from '#lib/site.ts';
	import Logo from './Logo.svelte';
	import PhTag from './PhTag.svelte';
	import TrustLine from './TrustLine.svelte';

	const { business, licenses, services, serviceArea, sections } = site;
	const year = new Date().getFullYear();

	const heading = 'mb-4 text-[0.95rem] uppercase tracking-[0.14em] text-on-dark';
	const link = 'no-underline hover:text-on-dark hover:underline hover:underline-offset-4';
</script>

<footer class="on-dark bg-charcoal-deep pt-[72px] pb-8 text-[0.98rem] text-on-dark-soft">
	<div class="wrap">
		<div
			class="grid grid-cols-1 gap-x-10 gap-y-12 border-b border-rule-dark pb-12 xs:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]"
		>
			<div class="xs:col-span-2 lg:col-span-1">
				<Logo tone="dark" class="h-[104px]" />
				<p class="mt-[18px] max-w-[22ch] font-display text-[1.35rem] leading-[1.15] font-semibold text-on-dark italic">
					{business.slogan}
				</p>
				<a
					class="mt-[18px] inline-block font-display text-[1.7rem] font-bold text-accent-on-dark no-underline hover:underline hover:underline-offset-[5px]"
					href={business.phoneHref}>{business.phone}</a
				>
				<p class="mt-1.5 flex flex-wrap items-center gap-2">
					<a class={link} href="mailto:{business.email.value}">{business.email.value}</a>
					{#if business.email.placeholder}<PhTag />{/if}
				</p>
				<p class="mt-1.5 flex flex-wrap items-center gap-2">
					{business.hours.value}
					{#if business.hours.placeholder}<PhTag label="Confirm" />{/if}
				</p>
			</div>

			{#if sections.services}
				<nav aria-label="Services">
					<h2 class={heading}>Services</h2>
					<ul class="grid gap-2">
						{#each services.items as item (item.name)}
							<li><a class={link} href="/#services">{item.name}</a></li>
						{/each}
					</ul>
				</nav>
			{/if}

			<nav aria-label="Company">
				<h2 class={heading}>Company</h2>
				<ul class="grid gap-2">
					{#if sections.story}<li><a class={link} href="/#story">{site.story.eyebrow}</a></li>{/if}
					{#if sections.crew}<li><a class={link} href="/#crew">{site.crew.eyebrow}</a></li>{/if}
					{#if sections.reviews}<li><a class={link} href="/#reviews">Reviews</a></li>{/if}
					{#if sections.careers}<li><a class={link} href="/careers">Careers</a></li>{/if}
					<li><a class={link} href={business.quoteHref}>Get a quote</a></li>
				</ul>
			</nav>

			<div>
				<h2 class={heading}>Service area</h2>
				<p class="mb-2.5 leading-[1.75]">{serviceArea.towns.join(' · ')}</p>
				{#if serviceArea.placeholder}<PhTag label="Confirm towns" />{/if}
			</div>
		</div>

		<div class="flex flex-wrap items-center justify-between gap-7 border-b border-rule-dark py-8">
			<TrustLine tone="dark" />
			<dl class="m-0 flex flex-wrap gap-x-8 gap-y-3">
				{#each licenses as license (license.label)}
					<div>
						<dt class="text-[0.82rem] uppercase tracking-[0.08em]">{license.label}</dt>
						<dd class="m-0 mt-0.5 flex flex-wrap items-center gap-2 text-on-dark">
							{license.value}
							{#if license.placeholder}<PhTag />{/if}
						</dd>
					</div>
				{/each}
			</dl>
		</div>

		<div class="flex flex-wrap justify-between gap-x-6 gap-y-3 pt-6 text-[0.9rem]">
			<p>© {year} {business.legalName}. {business.footerLine}</p>
			<ul class="flex gap-5">
				<li><a class={link} href="/privacy">Privacy</a></li>
				{#each business.social as social (social.label)}
					<li><a class={link} href={social.href} rel="noopener">{social.label}</a></li>
				{/each}
			</ul>
		</div>
	</div>
</footer>
