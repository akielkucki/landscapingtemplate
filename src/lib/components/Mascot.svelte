<script lang="ts">
	import { imageUrl } from '#lib/images.ts';
	import { site } from '#lib/site.ts';

	/** Pass a width class (e.g. "w-32") to size it. Renders nothing if the site has no mascot. */
	let { class: className = 'w-[120px]' }: { class?: string } = $props();

	const { mascot } = site.business;
	const src = imageUrl(mascot.file);
</script>

{#if src}
	<img
		class={['h-auto', className]}
		{src}
		alt={mascot.alt}
		width={mascot.width}
		height={mascot.height}
		loading="lazy"
		decoding="async"
	/>
{/if}
