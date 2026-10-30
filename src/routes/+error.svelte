<script lang="ts">
	import { page } from '$app/state';
	import { site } from '#lib/site.ts';
	import Cta from '#lib/components/Cta.svelte';
	import Eyebrow from '#lib/components/Eyebrow.svelte';
	import Mascot from '#lib/components/Mascot.svelte';
</script>

<svelte:head>
	<title>{page.status === 404 ? 'Page not found' : 'Something went wrong'} | {site.business.name}</title>
</svelte:head>

<section class="wrap grid justify-items-start gap-[22px] py-[clamp(56px,9vw,128px)]">
	<Mascot class="w-[120px]" />
	<Eyebrow text={String(page.status)} />
	<h1 class="max-w-[16ch] text-[clamp(2.8rem,6vw,4.8rem)]">
		{page.status === 404 ? 'This page wandered off the property.' : 'Something went wrong on our end.'}
	</h1>
	<p class="max-w-[34em] text-lede text-ink-soft">Head back home, or give us a call and we’ll help you directly.</p>
	<div class="flex flex-wrap items-center gap-5">
		<a class="font-display text-[1.2rem] font-bold uppercase tracking-[0.05em] text-brand" href="/">Back to the homepage</a>
		<Cta kind="call" />
	</div>
</section>
