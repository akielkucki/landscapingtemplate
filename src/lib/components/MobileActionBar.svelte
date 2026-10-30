<script lang="ts">
	import { site } from '#lib/site.ts';
	import Icon from './Icon.svelte';

	const button =
		'flex min-h-[50px] items-center justify-center gap-2 rounded-ui font-display text-[1.15rem] font-bold uppercase tracking-[0.05em] no-underline';
</script>

<!-- Always-reachable call and quote actions on phones. -->
<div
	class="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.6fr] gap-2 bg-charcoal-deep px-3 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] shadow-[0_-8px_20px_-12px_rgb(0_0_0/0.6)] md:hidden"
>
	<a class={[button, 'border-2 border-on-dark/60 text-on-dark']} href={site.business.phoneHref}>
		<span class="text-accent-on-dark"><Icon name="phone" size={18} /></span>
		<span>Call</span>
	</a>
	<a class={[button, 'bg-brand text-on-brand shadow-[inset_0_-3px_0_rgb(0_0_0/0.18)]']} href={site.business.quoteHref}>
		<span>Instant quote</span>
		<Icon name="arrow" size={18} />
	</a>
</div>
