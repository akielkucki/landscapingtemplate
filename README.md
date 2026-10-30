# Local service website template

A homepage-led marketing site for lawn care and landscaping businesses (or any local service crew), built with SvelteKit 3, Svelte 5 and Tailwind CSS v4, and deployed to Cloudflare Workers.

Every business lives in its own folder under `sites/`. Swap businesses, copy, colours and fonts by editing JSON; no component changes needed.

## Quick start

```sh
npm install
npm run dev
```

## Businesses

```
sites/
  rds-total-lawn/          real example: RD's Total Lawn (photos, logo, crew)
    site.json
    images/
  greenline-landscaping/   placeholder example from the Figma mockup (no photos, different theme)
    site.json
    images/
```

| Command | What it does |
| --- | --- |
| `npm run site` | List businesses (`*` marks the active one) |
| `npm run site <slug>` | Make a business active (restart `npm run dev` after) |
| `npm run site new <slug>` | Start a new business from the placeholder example and make it active |
| `npm run site new <slug> rds-total-lawn` | Start from a different business instead |
| `SITE=<slug> npm run build` | Build a business without switching |
| `npm run check` | Type-check the active business's `site.json` against the template |
| `npm run deploy` | Build the active business and deploy it to the Worker named in its `site.json` |

## What's in `site.json`

- **`theme`**: every colour (any CSS colour), the display and body fonts plus their Google Fonts link, corner radii (`ui` for buttons and fields, `card` for panels), `headlineCase` (`uppercase` or `none`), `texture` (`stripes` or `flat` for dark sections) and the browser `themeColor`.
- **`sections`**: turn homepage sections, the seasonal bar, the hero quick-quote panel and the careers page on or off.
- **`business`**: name, phone, owners, email, hours, logo, mascot, favicon, socials.
- **`trust`**: Google rating, BBB rating and an award. Leave any of them empty (`""`) to hide it.
- **`seo`** and **`deploy`**: page title and description, schema.org type, live URL and Cloudflare Worker name.
- **One block per section** (`hero`, `promises`, `services`, `results`, `story`, `crew`, `reviews`, `serviceArea`, `faq`, `quote`, `careers`) with its headings and content, plus `seasons` for the dated "last call" campaigns.

Images are file names relative to the business's `images/` folder (for example `"logo.webp"` or `"team/jane-doe.webp"`). An empty `"file"` shows a labelled placeholder that describes the photo needed. Anything with `"placeholder": true` shows a visible tag until the real content is in. Never put in reviews, replies, licence numbers or credentials the business hasn't supplied.

## How theming works

`src/lib/theme.ts` turns `theme` into CSS variables on `:root`, and `src/app.css` maps those onto Tailwind's tokens. So components use normal Tailwind classes (`bg-brand`, `text-ink-soft`, `font-display`, `rounded-card`, `on-dark:text-on-dark-soft`) and pick up whichever business is active.

## Before launch

The quote and careers forms validate and confirm, but they only log submissions (visible in the Worker's logs). Wire them to email or a CRM in `src/routes/quote/+page.server.ts` and `src/routes/careers/+page.server.ts`.
