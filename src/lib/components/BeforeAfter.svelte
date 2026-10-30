<script lang="ts">
	import type { Img } from '#lib/site.ts';
	import Photo from './Photo.svelte';

	let { before, after, label }: { before: Img; after: Img; label: string } = $props();

	let position = $state(50);

	// Arrow keys move in steps of 5 (Home/End work natively); pointer dragging stays smooth.
	function onKeydown(event: KeyboardEvent) {
		const step = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5 }[event.key];
		if (step === undefined) return;
		event.preventDefault();
		position = Math.min(100, Math.max(0, position + step));
	}

	const chip =
		'pointer-events-none absolute top-4 rounded-[3px] px-2.5 pt-[5px] pb-1 font-display text-[0.85rem] font-extrabold uppercase tracking-[0.14em] transition-opacity duration-200';
</script>

<div
	class="group relative aspect-[16/10] w-full touch-pan-y overflow-hidden rounded-ui bg-deep select-none md:aspect-[2/1]"
	style:--pos="{position}%"
>
	<div class="absolute inset-0">
		<Photo image={after} ratio="auto" rounded={false} align="end" class="h-full" />
	</div>
	<div
		class="absolute inset-0 [clip-path:inset(0_calc(100%-var(--pos))_0_0)]"
		aria-hidden={position === 0 ? 'true' : undefined}
	>
		<Photo image={before} ratio="auto" rounded={false} tone="earth" class="h-full" />
	</div>

	<!-- Labels get out of the way when the handle reaches them. -->
	<span class={[chip, 'left-4 bg-charcoal-deep text-on-dark', position < 14 && 'opacity-0']} aria-hidden="true">Before</span>
	<span class={[chip, 'right-4 bg-accent text-ink', position > 86 && 'opacity-0']} aria-hidden="true">After</span>

	<div class="pointer-events-none absolute inset-y-0 left-(--pos) -ml-[1.5px] w-[3px] bg-paper" aria-hidden="true">
		<span
			class="absolute top-1/2 left-1/2 grid size-[52px] -translate-1/2 place-items-center rounded-full border-3 border-paper bg-brand text-on-brand shadow-[0_4px_14px_rgb(0_0_0/0.35)] group-has-[input:focus-visible]:outline-3 group-has-[input:focus-visible]:outline-offset-3 group-has-[input:focus-visible]:outline-accent"
		>
			<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M9 6 3 12l6 6M15 6l6 6-6 6" />
			</svg>
		</span>
	</div>

	<!-- A tall, wide thumb so touch users can grab the handle anywhere along the line. -->
	<input
		class="absolute inset-0 m-0 size-full cursor-ew-resize appearance-none bg-transparent opacity-0 [&::-moz-range-thumb]:h-[100vh] [&::-moz-range-thumb]:w-14 [&::-moz-range-thumb]:border-0 [&::-webkit-slider-thumb]:h-[100vh] [&::-webkit-slider-thumb]:w-14 [&::-webkit-slider-thumb]:appearance-none"
		type="range"
		min="0"
		max="100"
		step="1"
		bind:value={position}
		onkeydown={onKeydown}
		aria-label="{label}: slide to compare before and after"
		aria-valuetext="{position}% before"
	/>
</div>
