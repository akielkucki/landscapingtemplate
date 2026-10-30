<script lang="ts">
	import { site } from '#lib/site.ts';
	import Icon from './Icon.svelte';

	let {
		kind,
		tone = 'light',
		label,
		full = false,
		compact = false
	}: {
		/** quote: the brand-colour action button. call: click-to-call with the number. */
		kind: 'quote' | 'call';
		/** The background the button sits on. */
		tone?: 'light' | 'dark';
		label?: string;
		full?: boolean;
		/** Smaller size for the header. */
		compact?: boolean;
	} = $props();

	const { business } = site;
	const pressed = 'shadow-[inset_0_-3px_0_rgb(0_0_0/0.18)]';
</script>

{#if kind === 'quote'}
	<!-- Brand body with a darker "tab" carrying the arrow. -->
	<a
		class={[
			'group/cta items-stretch rounded-ui bg-brand font-display font-bold whitespace-nowrap text-on-brand no-underline transition-colors duration-200 hover:bg-brand-press active:translate-y-px',
			pressed,
			full ? 'flex w-full' : 'inline-flex',
			compact ? 'min-h-[46px]' : 'min-h-14'
		]}
		href={business.quoteHref}
	>
		<span
			class={[
				'flex flex-1 items-center uppercase tracking-[0.05em]',
				compact ? 'pr-3.5 pl-4 text-[1.05rem]' : 'pr-5 pl-[22px] text-[1.2rem]'
			]}
		>
			{label ?? 'Get an instant quote'}
		</span>
		<span
			class={[
				'grid place-items-center rounded-r-ui border-l border-white/20 bg-brand-press',
				pressed,
				compact ? 'w-[42px]' : 'w-[54px]'
			]}
		>
			<span class="transition-transform duration-200 group-hover/cta:translate-x-[3px]">
				<Icon name="arrow" size={22} />
			</span>
		</span>
	</a>
{:else}
	<!-- Outlined, phone glyph in an accent tile, number set large. -->
	<a
		class={[
			'items-center gap-3 rounded-ui border-2 pr-5 pl-2 font-display font-bold whitespace-nowrap no-underline transition-colors duration-200 active:translate-y-px',
			full ? 'flex w-full justify-center' : 'inline-flex',
			compact ? 'min-h-[46px]' : 'min-h-14',
			tone === 'dark'
				? 'border-on-dark/70 text-on-dark hover:border-on-dark hover:bg-on-dark hover:text-ink'
				: 'border-ink text-ink hover:bg-ink hover:text-paper'
		]}
		href={business.phoneHref}
	>
		<span class="grid size-[38px] place-items-center rounded-[3px] bg-accent text-ink">
			<Icon name="phone" size={18} />
		</span>
		<span class="grid gap-[3px] leading-none">
			<span class="text-[0.78rem] uppercase tracking-[0.12em] opacity-80">{label ?? 'Call us'}</span>
			<span class="text-[1.3rem] tracking-[0.02em]">{business.phone}</span>
		</span>
	</a>
{/if}
