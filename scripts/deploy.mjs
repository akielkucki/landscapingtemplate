// Build and deploy the active business to Cloudflare Workers: `npm run deploy`.
// The Worker name comes from deploy.workerName in the site's site.json.
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const site = process.env.SITE || JSON.parse(readFileSync('site.config.json', 'utf8')).site;
const { deploy } = JSON.parse(readFileSync(`sites/${site}/site.json`, 'utf8'));

if (!/^[a-z0-9-]+$/.test(deploy?.workerName ?? '')) {
	console.error(`sites/${site}/site.json needs deploy.workerName (lowercase letters, numbers and dashes).`);
	process.exit(1);
}

const env = { ...process.env, SITE: site };
console.log(`Deploying ${site} to Worker "${deploy.workerName}"…`);
execSync('npm run build', { stdio: 'inherit', env });
execSync(`npx wrangler deploy --name ${deploy.workerName}`, { stdio: 'inherit', env });
