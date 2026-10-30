<script lang="ts">
	type Name = 'phone' | 'arrow' | 'star' | 'check' | 'menu' | 'close' | 'pin' | 'reply';

	let { name, size = 20, label }: { name: Name; size?: number; label?: string } = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	role={label ? 'img' : undefined}
	aria-label={label}
	aria-hidden={label ? undefined : 'true'}
	focusable="false"
>
	{#if name === 'phone'}
		<path
			d="M5 3.5h3.2l1.6 4.3-2.1 1.4a11.5 11.5 0 0 0 7.1 7.1l1.4-2.1 4.3 1.6V19a1.9 1.9 0 0 1-2 1.9C10.4 20.4 3.6 13.6 3.1 5.5A1.9 1.9 0 0 1 5 3.5Z"
		/>
	{:else if name === 'arrow'}
		<path d="M4 12h15M13.5 6l6 6-6 6" />
	{:else if name === 'star'}
		<path
			d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8L12 2.8Z"
			fill="currentColor"
			stroke="none"
		/>
	{:else if name === 'check'}
		<path d="m4.5 12.5 4.8 4.8L19.5 7" />
	{:else if name === 'menu'}
		<path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
	{:else if name === 'close'}
		<path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
	{:else if name === 'pin'}
		<path d="M12 21s-6.5-6.1-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.9 12 21 12 21Z" />
		<circle cx="12" cy="9.8" r="2.3" />
	{:else if name === 'reply'}
		<path d="M9.5 6 4 11.5 9.5 17M4.5 11.5H14a6 6 0 0 1 6 6V19" />
	{/if}
</svg>
