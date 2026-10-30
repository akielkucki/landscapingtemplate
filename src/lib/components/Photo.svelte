<script lang="ts">
	import { imageUrl } from '#lib/images.ts';
	import type { Img } from '#lib/site.ts';

	let {
		image,
		ratio = '4 / 3',
		eager = false,
		rounded = true,
		tone = 'deep',
		align = 'start',
		class: className = ''
	}: {
		image: Img;
		/** CSS aspect-ratio for the frame. The photo is cropped to fill it. */
		ratio?: string;
		eager?: boolean;
		rounded?: boolean;
		/** Placeholder colour: "deep" (default) or "earth" (used for "before" photos). */
		tone?: 'deep' | 'earth';
		/** Placeholder label alignment. */
		align?: 'start' | 'end';
		class?: string;
	} = $props();

	const src = $derived(imageUrl(image.file));
	const crop = $derived(image.crop === 'top' || image.crop === 'bottom' ? image.crop : undefined);
</script>

<div class={['relative overflow-hidden bg-deep', rounded && 'rounded-ui', className]} style:aspect-ratio={ratio}>
	{#if src}
		<!--
			Stacked before/after composites: the image box is twice the frame's height so
			each half fills the frame, nudged in slightly to hide the collage's borders.
		-->
		<img
			class={[
				'w-full object-cover',
				crop ? 'absolute left-0 h-[200%] scale-[1.05]' : 'h-full',
				crop === 'top' && 'top-0 origin-[50%_25%]',
				crop === 'bottom' && '-top-full origin-[50%_75%]'
			]}
			{src}
			alt={image.alt}
			width={image.width}
			height={image.height}
			style:object-position={image.position}
			loading={eager ? 'eager' : 'lazy'}
			fetchpriority={eager ? 'high' : undefined}
			decoding="async"
		/>
	{:else}
		<div
			class={[
				'absolute inset-0 flex flex-col justify-end gap-1 p-[clamp(14px,3%,24px)] text-on-dark ring-1 ring-inset ring-accent-on-dark/40',
				tone === 'earth' ? 'earth-stripes' : 'mow-stripes-sm',
				align === 'end' && 'items-end text-right'
			]}
		>
			<span
				class="self-start rounded-ui border border-dashed border-accent-on-dark px-2 py-0.5 font-display text-[0.78rem] font-bold uppercase tracking-[0.1em] text-accent-on-dark"
				class:self-end={align === 'end'}
			>
				Photo needed
			</span>
			<span class="max-w-[min(30ch,42%)] text-[0.9rem] leading-[1.35] text-on-dark-soft">{image.brief}</span>
		</div>
	{/if}
</div>
