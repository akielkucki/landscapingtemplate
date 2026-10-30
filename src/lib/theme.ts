import type { SiteConfig } from './site.ts';

const kebab = (key: string) => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
const quote = (family: string) => `'${family.replace(/'/g, '')}'`;

/**
 * Turns site.json's theme into CSS custom properties. app.css maps these onto
 * Tailwind's colour, font and radius tokens, so `bg-brand`, `font-display`,
 * `rounded-card` etc. follow whichever business is active.
 */
export function themeCss(theme: SiteConfig['theme']): string {
	const vars: string[] = [];
	for (const [name, value] of Object.entries(theme.colors)) vars.push(`--c-${kebab(name)}:${value}`);
	if (theme.texture !== 'stripes') vars.push(`--c-deep-stripe:${theme.colors.deep}`);
	vars.push(`--f-display:${quote(theme.fonts.display)},'Arial Narrow',sans-serif`);
	vars.push(`--f-body:${quote(theme.fonts.body)},system-ui,-apple-system,'Segoe UI',sans-serif`);
	vars.push(`--r-ui:${theme.radius.ui}`, `--r-card:${theme.radius.card}`);
	vars.push(`--headline-case:${theme.headlineCase === 'uppercase' ? 'uppercase' : 'none'}`);
	return `:root{${vars.join(';')}}`;
}
