<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `next/node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.
<!-- END:nextjs-agent-rules -->


<!-- BEGIN:project-goal -->
The goal of this project is to migrate this website from Astro to Next.js.

This website is my portfolio site. It's a simple blog to showcase my software projects.

Assets such as SVGs and fonts are cached for optimisation.

SEO optimisations such as OG images, sitemaps, canonical links, and per-page descriptions are used.

Posts are written in .mdx files. 
The structure of these files can be seen in `astro/src/content.config.ts`. 
Ensure this format is identical.

There are two groups of components used:
- Astro components: These are components created by me.
  Most of them are used to replace elements in MDX posts.
- SRCL components: These are sourced from https://www.sacred.computer/.
  You can use the sacred-computer skill to re-source these. They'll need
  to be re-sourced because we need the 'use client' directives now, and the 
  current versions in the project are adapted for Astro.

Ensure all pages are prerendered by utilising cache components.

The site is deployed using cloudflare workers.
The two important files for deployment can be found at `astro/wrangler.jsonc` and `astro/src/worker.js`.
Ensure this configuration is maintained.

That should be all. If you encounter something I haven't mentioned, ask for clarification.
<!-- END:project-goal -->
