<script lang="ts">
	/** Visible marker for content that still needs the real thing. */
	let { label = 'Placeholder' }: { label?: string } = $props();
</script>

<span
	class="inline-block rounded-ui border border-dashed border-current bg-accent/10 px-2 py-0.5 font-display text-[0.78rem] font-bold uppercase tracking-[0.1em] text-accent-ink on-dark:text-accent-on-dark"
>
	{label}
</span>
