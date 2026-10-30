<script lang="ts">
	import { onMount } from 'svelte';
	import { site, type Season } from '#lib/site.ts';
	import Icon from './Icon.svelte';

	let { season }: { season: Season } = $props();

	let dismissed = $state(false);
	const storageKey = $derived(`season-bar-dismissed:${season.id}`);

	onMount(() => {
		try {
			dismissed = sessionStorage.getItem(storageKey) === '1';
		} catch {
			// Storage can be unavailable (private mode); the bar just stays visible.
		}
	});

	function dismiss() {
		dismissed = true;
		try {
			sessionStorage.setItem(storageKey, '1');
		} catch {
			// Ignore: dismissal only lasts for this page view.
		}
	}
</script>

{#if !dismissed}
	<aside class="bg-charcoal-deep text-[0.95rem] text-on-dark" aria-label="Seasonal booking notice">
		<div class="wrap flex min-h-11 items-center gap-3">
			<a
				class="group flex flex-1 flex-wrap items-center gap-x-2.5 gap-y-1 py-2 text-[0.9rem] no-underline md:gap-x-3.5 md:text-[0.95rem]"
				href={site.business.quoteHref}
			>
				<span
					class={[
						'rounded-[3px] px-2 pt-[3px] pb-0.5 font-display text-[0.82rem] font-extrabold uppercase tracking-[0.12em]',
						season.urgent ? 'bg-alert text-on-brand' : 'bg-accent text-ink'
					]}>{season.tag}</span
				>
				<span class="font-semibold">{season.headline}</span>
				<span class="text-accent-on-dark">{season.deadline}</span>
				<span
					class="ml-auto hidden items-center gap-1.5 font-display font-bold uppercase tracking-[0.06em] group-hover:underline group-hover:underline-offset-4 md:inline-flex"
				>
					Book now <Icon name="arrow" size={16} />
				</span>
			</a>
			<button
				class="grid size-9 cursor-pointer place-items-center rounded-ui text-on-dark-soft hover:bg-white/10 hover:text-on-dark"
				type="button"
				onclick={dismiss}
				aria-label="Dismiss notice"
			>
				<Icon name="close" size={16} />
			</button>
		</div>
	</aside>
{/if}
