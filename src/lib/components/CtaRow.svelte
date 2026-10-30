<script lang="ts">
	import Cta from './Cta.svelte';

	/** A closing call-to-action line for the end of a section. */
	let { text, tone = 'light' }: { text: string; tone?: 'light' | 'dark' } = $props();
</script>

<div
	class={[
		'mt-[clamp(40px,5vw,64px)] flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t pt-[clamp(24px,3vw,32px)]',
		tone === 'dark' ? 'border-rule-dark' : 'border-sand'
	]}
>
	<p class="max-w-[22ch] font-display text-[clamp(1.6rem,2.6vw,2.1rem)] leading-[1.05] font-bold">{text}</p>
	<div class="flex flex-wrap gap-3 max-xs:grid max-xs:w-full">
		<Cta kind="quote" />
		<Cta kind="call" {tone} />
	</div>
</div>
