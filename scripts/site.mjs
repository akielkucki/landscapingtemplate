// Manage businesses in sites/.
//   npm run site                     list sites (* = active)
//   npm run site <slug>              make <slug> the active site
//   npm run site new <slug> [from]   copy a site's site.json (default: greenline-landscaping) to start a new one
// Switching updates site.config.json (used by Vite) and the $site path in tsconfig.json (used for type checks).
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';

const [command, ...args] = process.argv.slice(2);
const sites = readdirSync('sites', { withFileTypes: true })
	.filter((entry) => entry.isDirectory() && existsSync(`sites/${entry.name}/site.json`))
	.map((entry) => entry.name);
const config = JSON.parse(readFileSync('site.config.json', 'utf8'));

function use(slug) {
	writeFileSync('site.config.json', JSON.stringify({ ...config, site: slug }, null, '\t') + '\n');
	const tsconfig = JSON.parse(readFileSync('tsconfig.json', 'utf8'));
	tsconfig.compilerOptions.paths = { '$site/*': [`./sites/${slug}/*`] };
	writeFileSync('tsconfig.json', JSON.stringify(tsconfig, null, '\t') + '\n');
	console.log(`Active site: ${slug}. Restart the dev server to pick it up.`);
}

if (!command) {
	console.log(sites.map((name) => `${name === config.site ? '*' : ' '} ${name}`).join('\n'));
} else if (command === 'new') {
	const [slug, from = 'greenline-landscaping'] = args;
	if (!/^[a-z0-9-]+$/.test(slug ?? '')) {
		console.error('Usage: npm run site new <slug> [from]  (slug: lowercase letters, numbers, dashes)');
		process.exit(1);
	}
	if (existsSync(`sites/${slug}`)) {
		console.error(`sites/${slug} already exists.`);
		process.exit(1);
	}
	if (!sites.includes(from)) {
		console.error(`No sites/${from}/site.json to copy. Available: ${sites.join(', ')}`);
		process.exit(1);
	}
	mkdirSync(`sites/${slug}/images`, { recursive: true });
	cpSync(`sites/${from}/site.json`, `sites/${slug}/site.json`);
	const site = JSON.parse(readFileSync(`sites/${slug}/site.json`, 'utf8'));
	site.deploy.workerName = slug;
	writeFileSync(`sites/${slug}/site.json`, JSON.stringify(site, null, '\t') + '\n');
	console.log(`Created sites/${slug} from ${from}. Edit sites/${slug}/site.json and add photos to sites/${slug}/images/.`);
	use(slug);
} else if (sites.includes(command)) {
	use(command);
} else {
	console.error(`No sites/${command}/site.json. Available: ${sites.join(', ')}`);
	process.exit(1);
}
