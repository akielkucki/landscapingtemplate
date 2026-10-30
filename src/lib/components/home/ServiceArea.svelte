<script lang="ts">
	import { site } from '#lib/site.ts';
	import { lede, sectionTitle } from '#lib/ui.ts';
	import Cta from '../Cta.svelte';
	import Eyebrow from '../Eyebrow.svelte';
	import Icon from '../Icon.svelte';
	import PhTag from '../PhTag.svelte';
	import Photo from '../Photo.svelte';

	const { serviceArea } = site;
</script>

<section id="area" class="on-dark bg-charcoal py-section text-on-dark" aria-labelledby="area-title">
	<div class="wrap grid grid-cols-1 items-center gap-x-[clamp(40px,7vw,112px)] gap-y-12 lg:grid-cols-[5fr_6fr]">
		<div class="grid justify-items-start gap-6">
			<Eyebrow text={serviceArea.eyebrow} />
			<h2 id="area-title" class={sectionTitle}>{serviceArea.headline}</h2>
			<p class={lede}>{serviceArea.lede}</p>
			<Cta kind="call" tone="dark" label={serviceArea.callLabel} />
		</div>

		<div>
			{#if serviceArea.placeholder}<PhTag label="Town list to confirm" />{/if}
			<!-- A wrapping list on phones (any town name fits), two ruled columns from xs up. -->
			<ul class="mt-4 flex flex-wrap gap-x-6 border-t border-rule-dark pt-3 xs:grid xs:grid-cols-2 xs:gap-x-10 xs:pt-0">
				{#each serviceArea.towns as town (town)}
					<li
						class="flex min-w-0 items-center gap-3 py-1.5 font-display text-[clamp(1.5rem,2.4vw,1.95rem)] leading-[1.1] font-bold xs:border-b xs:border-rule-dark xs:py-3.5"
					>
						<span class="shrink-0 text-accent-on-dark"><Icon name="pin" size={18} /></span>{town}
					</li>
				{/each}
			</ul>
		</div>
	</div>
	{#if serviceArea.image.file}
		<div class="wrap">
			<Photo image={serviceArea.image} ratio="12 / 5" class="mt-[clamp(48px,6vw,80px)]" />
		</div>
	{/if}
</section>
