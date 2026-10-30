<script lang="ts">
	import { enhance } from '$app/forms';
	import type { FormState } from '#lib/forms.ts';
	import { site } from '#lib/site.ts';
	import Icon from './Icon.svelte';

	let {
		full = false,
		quick = false,
		stacked = false,
		initial = null,
		service = ''
	}: {
		/** The /quote page asks a few more questions than the homepage form. */
		full?: boolean;
		/** Four fields only (name, phone, town, service), for the hero panel. */
		quick?: boolean;
		/** One field per row, for tall narrow panels. */
		stacked?: boolean;
		/** Result of a no-JS submission, from the page's `form` prop. */
		initial?: FormState;
		/** Pre-selected service, e.g. from ?service= on /quote. */
		service?: string;
	} = $props();

	const { business, serviceArea, services, quote } = site;

	// Seeded once from the server result; after that the form manages its own state.
	// svelte-ignore state_referenced_locally
	let result = $state<FormState>(initial);
	let submitting = $state(false);

	const errors = $derived(result?.errors ?? {});
	const values = $derived(result?.values ?? {});
	const uid = $props.id();
	const id = (name: string) => `${uid}-${name}`;
	const describedBy = (name: string) => (errors[name] ? id(`${name}-error`) : undefined);

	const field = 'grid min-w-0 gap-1.5';
	const label = 'text-[0.95rem] font-semibold';
	const optional = 'font-normal text-ink-soft';
	const error = 'text-[0.9rem] font-semibold text-alert';
	const wide = 'col-span-full';
</script>

{#if result?.success}
	<div class="grid gap-2.5 py-2" role="status">
		<p class="font-display font-bold uppercase tracking-[0.12em] text-brand">Request received</p>
		<p class={['font-display leading-none font-bold', quick ? 'text-[1.7rem]' : 'text-[2.2rem]']}>
			Thanks{result.name ? `, ${result.name}` : ''}. We’ve got it.
		</p>
		<p>
			Someone from our team will get back to you about your quote. If it’s urgent, call us at
			<a class="font-semibold text-brand" href={business.phoneHref}>{business.phone}</a>.
		</p>
	</div>
{:else}
	<form
		class={['grid', quick ? 'gap-3.5' : 'gap-5']}
		method="POST"
		action="/quote"
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

		<div
			class={[
				'grid grid-cols-1',
				!stacked && 'xs:grid-cols-2',
				quick ? 'gap-x-3 gap-y-3.5' : 'gap-x-4 gap-y-[18px]'
			]}
		>
			<div class={field}>
				<label class={label} for={id('name')}>Name</label>
				<input
					class="field-input"
					id={id('name')}
					name="name"
					autocomplete="name"
					required
					value={values.name ?? ''}
					aria-invalid={errors.name ? 'true' : undefined}
					aria-describedby={describedBy('name')}
				/>
				{#if errors.name}<p class={error} id={id('name-error')}>{errors.name}</p>{/if}
			</div>

			<div class={field}>
				<label class={label} for={id('phone')}>Phone</label>
				<input
					class="field-input"
					id={id('phone')}
					name="phone"
					type="tel"
					autocomplete="tel"
					inputmode="tel"
					required
					value={values.phone ?? ''}
					aria-invalid={errors.phone ? 'true' : undefined}
					aria-describedby={describedBy('phone')}
				/>
				{#if errors.phone}<p class={error} id={id('phone-error')}>{errors.phone}</p>{/if}
			</div>

			{#if !quick}
				<div class={field}>
					<label class={label} for={id('email')}>Email <span class={optional}>(optional)</span></label>
					<input
						class="field-input"
						id={id('email')}
						name="email"
						type="email"
						autocomplete="email"
						value={values.email ?? ''}
						aria-invalid={errors.email ? 'true' : undefined}
						aria-describedby={describedBy('email')}
					/>
					{#if errors.email}<p class={error} id={id('email-error')}>{errors.email}</p>{/if}
				</div>
			{/if}

			<div class={field}>
				<label class={label} for={id('town')}>Town</label>
				<input
					class="field-input"
					id={id('town')}
					name="town"
					list={id('towns')}
					autocomplete="address-level2"
					required
					value={values.town ?? ''}
					aria-invalid={errors.town ? 'true' : undefined}
					aria-describedby={describedBy('town')}
				/>
				<datalist id={id('towns')}>
					{#each serviceArea.towns as town (town)}<option value={town}></option>{/each}
				</datalist>
				{#if errors.town}<p class={error} id={id('town-error')}>{errors.town}</p>{/if}
			</div>

			<div class={[field, !full && !quick && wide]}>
				<label class={label} for={id('service')}>{quick ? 'Service' : 'What do you need?'}</label>
				<select class="field-input" id={id('service')} name="service">
					<option value="" selected={!(values.service || service)}>Not sure yet</option>
					{#each services.items as item (item.name)}
						<option value={item.name} selected={(values.service || service) === item.name}>{item.name}</option>
					{/each}
				</select>
			</div>

			{#if full}
				<div class={field}>
					<label class={label} for={id('size')}>Property size</label>
					<select class="field-input" id={id('size')} name="size">
						{#each quote.sizes as size (size)}
							<option value={size} selected={values.size === size}>{size}</option>
						{/each}
					</select>
				</div>

				<fieldset class={[field, 'm-0 border-0 p-0']}>
					<legend class={[label, 'mb-1.5 p-0']}>Best way to reach you</legend>
					<div class="flex flex-wrap gap-2.5">
						{#each ['Call', 'Text', 'Email'] as option (option)}
							<label class="relative cursor-pointer">
								<input
									class="peer absolute inset-0 m-0 cursor-pointer opacity-0"
									type="radio"
									name="contact"
									value={option}
									checked={(values.contact || 'Call') === option}
								/>
								<span
									class="block min-w-[76px] rounded-ui border border-field bg-card px-3.5 py-[11px] text-center font-semibold peer-checked:border-brand peer-checked:bg-brand peer-checked:text-on-brand peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent"
									>{option}</span
								>
							</label>
						{/each}
					</div>
				</fieldset>

				<div class={field}>
					<label class={label} for={id('time')}>Best time to reach you</label>
					<select class="field-input" id={id('time')} name="time">
						{#each ['Any time', 'Morning', 'Afternoon', 'Evening'] as time (time)}
							<option value={time} selected={values.time === time}>{time}</option>
						{/each}
					</select>
				</div>
			{/if}

			{#if !quick}
				<div class={[field, wide]}>
					<label class={label} for={id('details')}>Anything we should know? <span class={optional}>(optional)</span></label>
					<textarea
						class="field-input"
						id={id('details')}
						name="details"
						rows={full ? 5 : 3}
						placeholder={quote.detailsPlaceholder}>{values.details ?? ''}</textarea
					>
				</div>
			{/if}
		</div>

		<!-- Spam trap: kept off-screen so people never see or fill it. -->
		<div class="absolute -left-[9999px] size-px overflow-hidden" aria-hidden="true">
			<label>Company <input name="company" tabindex="-1" autocomplete="off" /></label>
		</div>

		<button
			class="flex min-h-[58px] w-full cursor-pointer items-stretch rounded-ui border-0 bg-brand p-0 font-display text-[1.25rem] font-bold uppercase tracking-[0.05em] text-on-brand shadow-[inset_0_-3px_0_rgb(0_0_0/0.18)] transition-colors hover:bg-brand-press disabled:cursor-progress disabled:opacity-70"
			type="submit"
			disabled={submitting}
		>
			<span class="flex flex-1 items-center justify-center px-4">
				{submitting ? 'Sending…' : quick ? 'Get my quote' : 'Send my quote request'}
			</span>
			<span
				class="grid w-[58px] place-items-center rounded-r-ui border-l border-white/20 bg-brand-press shadow-[inset_0_-3px_0_rgb(0_0_0/0.18)]"
			>
				<Icon name="arrow" size={22} />
			</span>
		</button>
		<p class="text-sm text-ink-soft">
			{quick
				? 'No obligation. We’ll call you back.'
				: 'No obligation. We only use your details to get back to you about this quote.'}
		</p>
	</form>
{/if}
