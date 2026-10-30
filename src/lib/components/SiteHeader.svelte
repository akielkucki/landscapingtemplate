<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { site } from '#lib/site.ts';
	import Cta from './Cta.svelte';
	import Icon from './Icon.svelte';
	import Logo from './Logo.svelte';

	const { business, nav } = site;

	let open = $state(false);
	let scrolled = $state(false);
	let header: HTMLElement;
	let menuTop = $state(0);

	function toggle() {
		menuTop = header.getBoundingClientRect().bottom;
		open = !open;
	}

	afterNavigate(() => {
		open = false;
	});

	$effect(() => {
		document.documentElement.style.overflow = open ? 'hidden' : '';
		return () => {
			document.documentElement.style.overflow = '';
		};
	});

	// Scroll spy: highlight the nav link for the homepage section in the middle of the screen.
	let current = $state('');

	$effect(() => {
		if (page.url.pathname !== '/') {
			current = page.url.pathname;
			return;
		}
		current = '';
		const sections = nav
			.map((item) => document.getElementById(item.href.split('#')[1] ?? ''))
			.filter((el): el is HTMLElement => el !== null);
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) if (entry.isIntersecting) current = `/#${entry.target.id}`;
			},
			{ rootMargin: '-45% 0px -50% 0px' }
		);
		for (const section of sections) observer.observe(section);
		return () => observer.disconnect();
	});

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') open = false;
	}

	const iconButton =
		'grid size-[46px] cursor-pointer place-items-center rounded-ui border-2 lg:hidden';
</script>

<svelte:window onscroll={() => (scrolled = window.scrollY > 8)} onkeydown={onKeydown} />

<header
	class={[
		'sticky top-0 z-50 border-b bg-paper transition-[border-color,box-shadow] duration-200',
		scrolled ? 'border-sand shadow-[0_6px_18px_-14px_rgb(28_33_30/0.5)]' : 'border-transparent'
	]}
	bind:this={header}
>
	<div class="wrap flex h-header items-center gap-3 lg:gap-6">
		<a class="inline-flex shrink-0 no-underline" href="/" aria-label="{business.name}, home">
			<Logo class="h-[54px] lg:h-[66px]" />
		</a>

		<nav class="ml-auto hidden lg:block" aria-label="Main">
			<ul class="flex gap-1">
				{#each nav as item (item.href)}
					<li>
						<a
							class="block rounded-ui px-2 py-2 font-display text-[0.98rem] font-semibold whitespace-nowrap uppercase xl:px-3 xl:text-[1.12rem] tracking-[0.04em] text-ink no-underline decoration-2 underline-offset-[6px] hover:text-brand hover:underline aria-[current=true]:text-brand aria-[current=true]:underline aria-[current=true]:decoration-accent"
							href={item.href}
							aria-current={current === item.href ? 'true' : undefined}>{item.label}</a
						>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="ml-auto flex items-center gap-2.5 lg:ml-0 lg:gap-[18px]">
			<a
				class="group hidden items-center gap-2 font-display text-[1.25rem] font-bold whitespace-nowrap text-ink no-underline min-[1180px]:inline-flex"
				href={business.phoneHref}
			>
				<span class="text-accent-ink"><Icon name="phone" size={18} /></span>
				<span class="group-hover:underline group-hover:underline-offset-4">{business.phone}</span>
			</a>
			<div class="hidden lg:block">
				<Cta kind="quote" label="Instant quote" compact />
			</div>
			<a
				class={[iconButton, 'border-accent bg-accent text-ink']}
				href={business.phoneHref}
				aria-label="Call {business.phone}"
			>
				<Icon name="phone" size={20} />
			</a>
			<button
				class={[iconButton, 'border-ink bg-transparent text-ink']}
				type="button"
				aria-expanded={open}
				aria-controls="mobile-menu"
				onclick={toggle}
			>
				<Icon name={open ? 'close' : 'menu'} size={22} />
				<span class="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
			</button>
		</div>
	</div>

	<div
		class="fixed inset-x-0 bottom-0 z-[1] overflow-y-auto border-t border-sand bg-paper lg:hidden"
		id="mobile-menu"
		hidden={!open}
		style:top="{menuTop}px"
	>
		<nav class="wrap" aria-label="Mobile">
			<ul class="py-3">
				{#each nav as item (item.href)}
					<li>
						<a
							class="block border-b border-sand py-3.5 font-display text-[2rem] font-bold no-underline"
							href={item.href}
							onclick={() => (open = false)}>{item.label}</a
						>
					</li>
				{/each}
			</ul>
			<div class="grid gap-3 pt-5 pb-10">
				<Cta kind="quote" full />
				<Cta kind="call" full />
			</div>
		</nav>
	</div>
</header>
