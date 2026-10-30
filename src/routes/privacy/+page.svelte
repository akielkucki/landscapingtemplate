<script lang="ts">
	import { site } from '#lib/site.ts';
	import Eyebrow from '#lib/components/Eyebrow.svelte';
	import PhTag from '#lib/components/PhTag.svelte';

	const { business } = site;
</script>

<svelte:head>
	<title>Privacy | {business.name}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<!-- PLACEHOLDER: plain-language draft. Have the business review it (and a professional if needed) before launch. -->
<article
	class="wrap grid max-w-[calc(760px+var(--spacing-gutter)*2)] justify-items-start gap-[18px] pt-[clamp(48px,7vw,96px)] pb-section [&_h2]:mt-[18px] [&_h2]:text-[1.8rem] [&_p]:text-ink-soft"
>
	<Eyebrow text="Privacy" />
	<h1 class="text-[clamp(2.6rem,5vw,4rem)]">How we handle your details</h1>
	<PhTag label="Draft, needs the owners’ review before launch" />

	<h2>What we collect</h2>
	<p>
		When you request a quote or apply for a job, we collect what you type into the form: your name, phone number,
		email (if you give it), town and anything you tell us about your property or yourself.
	</p>

	<h2>How we use it</h2>
	<p>
		We use it to get back to you about your quote or application and to schedule work you ask for. We don’t sell your
		details or share them with anyone for marketing.
	</p>

	<h2>Questions</h2>
	<p>
		Call <a class="font-semibold text-brand" href={business.phoneHref}>{business.phone}</a> if you’d like us to update
		or delete what we have about you.
	</p>
</article>
