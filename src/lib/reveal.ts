/**
 * Fades an element up the first time it scrolls into view.
 * Content stays visible without JS and under prefers-reduced-motion.
 * Usage: <li use:reveal={250}> (the number is a delay in ms, for staggering).
 */
export function reveal(node: HTMLElement, delay = 0) {
	if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	const rect = node.getBoundingClientRect();
	if (rect.top < innerHeight && rect.bottom > 0) return; // already on screen: don't hide it

	node.classList.add('reveal', 'reveal-pending');
	node.style.transitionDelay = `${delay}ms`;

	const observer = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) return;
			node.classList.remove('reveal-pending');
			observer.disconnect();
		},
		{ threshold: 0.1 }
	);
	observer.observe(node);

	return {
		destroy: () => observer.disconnect()
	};
}
