<script lang="ts">
	/** Section label: a short accent rule and condensed caps. */
	let { text, class: className = '' }: { text: string; class?: string } = $props();
</script>

{#if text}
	<p
		class={[
			'inline-flex items-center gap-3 font-display text-[0.95rem] font-bold uppercase tracking-[0.14em] text-accent-ink on-dark:text-accent-on-dark',
			"before:h-[3px] before:w-7 before:shrink-0 before:bg-accent before:content-['']",
			className
		]}
	>
		{text}
	</p>
{/if}
