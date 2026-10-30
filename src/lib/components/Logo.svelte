<script lang="ts">
	import { imageUrl } from '#lib/images.ts';
	import { site } from '#lib/site.ts';

	/** Pass a height class (e.g. "h-16") to size it. Falls back to a type-only wordmark. */
	let { tone = 'light', class: className = 'h-16' }: { tone?: 'light' | 'dark'; class?: string } = $props();

	const { logo, name } = site.business;
	const src = imageUrl(logo.file);
	const [first, ...rest] = name.split(' ');
</script>

{#if src}
	<img class={['w-auto', className]} {src} alt={logo.alt} width={logo.width} height={logo.height} />
{:else}
	<span
		class={['inline-flex items-center gap-[9px] font-display leading-[0.86]', tone === 'dark' ? 'text-on-dark' : 'text-ink']}
		aria-label={name}
	>
		<span
			class={['text-[1.75rem] font-extrabold tracking-[-0.01em] xs:text-[2.15rem] lg:max-xl:text-[1.85rem]', tone === 'dark' ? 'text-brand-on-dark' : 'text-brand']}
			aria-hidden="true">{first}</span
		>
		<span
			class="w-min border-l-2 border-accent pl-[9px] text-[0.98rem] font-bold uppercase tracking-[0.12em] max-xs:hidden lg:max-xl:text-[0.82rem]"
			aria-hidden="true">{rest.join(' ')}</span
		>
	</span>
{/if}
