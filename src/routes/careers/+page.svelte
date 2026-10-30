<script lang="ts">
	import { enhance } from '$app/forms';
	import type { FormState } from '#lib/forms.ts';
	import { site } from '#lib/site.ts';
	import { arrowLink, lede, sectionTitle } from '#lib/ui.ts';
	import Eyebrow from '#lib/components/Eyebrow.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import PhTag from '#lib/components/PhTag.svelte';
	import Photo from '#lib/components/Photo.svelte';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();

	const { business, careers } = site;

	// svelte-ignore state_referenced_locally
	let result = $state<FormState>(form as FormState);
	let submitting = $state(false);

	const errors = $derived(result?.errors ?? {});
	const values = $derived(result?.values ?? {});
	const describedBy = (name: string) => (errors[name] ? `${name}-error` : undefined);

	const field = 'grid min-w-0 gap-1.5';
	const label = 'text-[0.95rem] font-semibold';
	const optional = 'font-normal text-ink-soft';
	const error = 'text-[0.9rem] font-semibold text-alert';
	const split = 'wrap grid grid-cols-1 items-start gap-x-[clamp(32px,6vw,96px)] gap-y-10 lg:grid-cols-[5fr_7fr]';
</script>

<svelte:head>
	<title>Careers | {business.name}</title>
	<meta name="description" content="Join the crew at {business.name}, {business.region}." />
</svelte:head>

<section class="pt-[clamp(40px,6vw,80px)] pb-section">
	<div class="wrap grid grid-cols-1 items-center gap-x-[clamp(32px,6vw,88px)] gap-y-10 lg:grid-cols-[6fr_5fr]">
		<div class="grid justify-items-start gap-6">
			<Eyebrow text={careers.eyebrow} />
			<h1 class="text-[clamp(2.9rem,5.6vw,4.9rem)] leading-[0.94] font-extrabold">{careers.headline}</h1>
			<p class={lede}>{careers.intro}</p>
			<a class={[arrowLink, 'text-[1.25rem] text-brand']} href="#apply">Apply now <Icon name="arrow" size={20} /></a>
		</div>
		<Photo image={careers.image} ratio="3 / 2" eager />
	</div>
</section>

<section class="on-dark bg-deep py-section text-on-dark" aria-labelledby="values-title">
	<div class="wrap">
		<div class="mb-10 flex flex-wrap items-center gap-x-6 gap-y-4">
			<h2 id="values-title" class={sectionTitle}>{careers.valuesTitle}</h2>
			{#if careers.valuesDraft}<PhTag label="Draft copy, confirm with owners" />{/if}
		</div>
		<ol class="grid grid-cols-1 gap-x-[clamp(24px,4vw,56px)] gap-y-8 lg:grid-cols-3">
			{#each careers.values as value, i (value.title)}
				<li class="border-t-2 border-accent pt-5">
					<span class="font-display font-bold text-accent-on-dark" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
					<h3 class="mt-1.5 text-[2rem]">{value.title}</h3>
					<p class="mt-2.5 text-on-dark-soft">{value.body}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<section class="pt-section" aria-labelledby="roles-title">
	<div class={split}>
		<div class="grid gap-[22px]">
			<Eyebrow text="Open roles" />
			<h2 id="roles-title" class={sectionTitle}>{careers.rolesTitle}</h2>
			<p class={lede}>{careers.rolesLede}</p>
		</div>
		<ul class="border-t-2 border-ink">
			{#each careers.roles as role (role.title)}
				<li class="flex flex-wrap items-center justify-between gap-3 border-b border-sand py-6">
					<div>
						<h3 class="text-[2rem]">{role.title}</h3>
						<p class="text-ink-soft">{role.type}</p>
					</div>
					{#if role.placeholder}<PhTag label="Placeholder role" />{/if}
				</li>
			{/each}
		</ul>
	</div>
</section>

<section id="apply" class="py-section" aria-labelledby="apply-title">
	<div class={split}>
		<div class="grid gap-[22px]">
			<Eyebrow text="Apply" />
			<h2 id="apply-title" class={sectionTitle}>{careers.applyTitle}</h2>
			<p class={lede}>
				{careers.applyLede} Questions first? Call
				<a class="font-semibold whitespace-nowrap text-brand" href={business.phoneHref}>{business.phone}</a>.
			</p>
		</div>

		<div class="rounded-card border border-sand bg-card p-[clamp(22px,3.4vw,40px)]">
			{#if result?.success}
				<div class="grid gap-2" role="status">
					<p class="font-display text-[2.4rem] font-extrabold text-brand">Thanks{result.name ? `, ${result.name}` : ''}.</p>
					<p>We’ve got your application and we’ll be in touch.</p>
				</div>
			{:else}
				<form
					class="grid gap-5"
					method="POST"
					novalidate
					use:enhance={() => {
						submitting = true;
						return async ({ result: outcome, update }) => {
							submitting = false;
							if (outcome.type === 'success' || outcome.type === 'failure') {
								result = (outcome.data ?? null) as FormState;
							} else {
								await update();
							}
						};
					}}
				>
					{#if Object.keys(errors).length > 0}
						<p class="rounded-ui bg-alert/10 px-3.5 py-2.5 font-semibold text-alert" role="alert">
							Please check the highlighted fields.
						</p>
					{/if}
					<div class="grid grid-cols-1 gap-x-4 gap-y-[18px] xs:grid-cols-2">
						<div class={field}>
							<label class={label} for="name">Name</label>
							<input
								class="field-input"
								id="name"
								name="name"
								autocomplete="name"
								required
								value={values.name ?? ''}
								aria-invalid={errors.name ? 'true' : undefined}
								aria-describedby={describedBy('name')}
							/>
							{#if errors.name}<p class={error} id="name-error">{errors.name}</p>{/if}
						</div>
						<div class={field}>
							<label class={label} for="phone">Phone</label>
							<input
								class="field-input"
								id="phone"
								name="phone"
								type="tel"
								autocomplete="tel"
								required
								value={values.phone ?? ''}
								aria-invalid={errors.phone ? 'true' : undefined}
								aria-describedby={describedBy('phone')}
							/>
							{#if errors.phone}<p class={error} id="phone-error">{errors.phone}</p>{/if}
						</div>
						<div class={field}>
							<label class={label} for="email">Email <span class={optional}>(optional)</span></label>
							<input
								class="field-input"
								id="email"
								name="email"
								type="email"
								autocomplete="email"
								value={values.email ?? ''}
								aria-invalid={errors.email ? 'true' : undefined}
								aria-describedby={describedBy('email')}
							/>
							{#if errors.email}<p class={error} id="email-error">{errors.email}</p>{/if}
						</div>
						<div class={field}>
							<label class={label} for="role">Interested in</label>
							<select class="field-input" id="role" name="role">
								{#each careers.roles as role (role.title)}
									<option value={role.title} selected={values.role === role.title}>{role.title}</option>
								{/each}
								<option value="Not sure" selected={values.role === 'Not sure'}>Not sure yet</option>
							</select>
						</div>
						<div class={field}>
							<label class={label} for="experience">Experience</label>
							<select class="field-input" id="experience" name="experience">
								{#each careers.experienceOptions as option (option)}
									<option value={option} selected={values.experience === option}>{option}</option>
								{/each}
							</select>
						</div>
						<div class={field}>
							<label class={label} for="license">Valid driver’s license?</label>
							<select class="field-input" id="license" name="license">
								{#each ['Yes', 'No'] as option (option)}
									<option value={option} selected={values.license === option}>{option}</option>
								{/each}
							</select>
						</div>
						<div class={[field, 'col-span-full']}>
							<label class={label} for="about">Anything you’d like us to know? <span class={optional}>(optional)</span></label>
							<textarea class="field-input" id="about" name="about" rows="4">{values.about ?? ''}</textarea>
						</div>
					</div>
					<div class="absolute -left-[9999px] size-px overflow-hidden" aria-hidden="true">
						<label>Company <input name="company" tabindex="-1" autocomplete="off" /></label>
					</div>
					<button
						class="flex min-h-[58px] w-full cursor-pointer items-stretch rounded-ui border-0 bg-brand p-0 font-display text-[1.25rem] font-bold uppercase tracking-[0.05em] text-on-brand shadow-[inset_0_-3px_0_rgb(0_0_0/0.18)] transition-colors hover:bg-brand-press disabled:cursor-progress disabled:opacity-70"
						type="submit"
						disabled={submitting}
					>
						<span class="flex flex-1 items-center justify-center">{submitting ? 'Sending…' : 'Send my application'}</span>
						<span class="grid w-[58px] place-items-center rounded-r-ui border-l border-white/20 bg-brand-press">
							<Icon name="arrow" size={22} />
						</span>
					</button>
				</form>
			{/if}
		</div>
	</div>
</section>
