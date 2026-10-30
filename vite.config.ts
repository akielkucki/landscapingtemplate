import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// The business to build: SITE env var, otherwise site.config.json (set it with `npm run site <slug>`).
const site = process.env.SITE || JSON.parse(readFileSync('site.config.json', 'utf8')).site;
if (!existsSync(`sites/${site}/site.json`)) {
	throw new Error(`No sites/${site}/site.json. Run \`npm run site <slug>\` with a folder name from sites/.`);
}

export default defineConfig({
	// `$site` points at the active business folder (site.json + images/). tsconfig.json mirrors it for types.
	resolve: {
		alias: { $site: resolve(`sites/${site}`) }
	},
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Deployed to Cloudflare Workers; settings live in wrangler.jsonc.
			adapter: adapter()
		})
	]
});
