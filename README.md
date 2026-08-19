# Stox Website

Marketing/showcase landing page for Stox — a multi-tenant inventory, POS,
and business-management platform. Built with [Astro](https://astro.build)
and React, deployed to Netlify.

## Commands

| Command           | Action                                       |
| :----------------- | :-------------------------------------------- |
| `npm install`       | Install dependencies                          |
| `npm run dev`       | Start local dev server at `localhost:4321`    |
| `npm run build`     | Build production site to `./dist/`            |
| `npm run preview`   | Preview the build locally before deploying    |

## Structure

- `src/pages/index.astro` — the single landing page
- `src/components/` — page sections (hero, modules, contact form, etc.)
- `src/components/ContactForm.tsx` — React island wired to Netlify Forms

## Deployment

Deployed on Netlify's free tier. Connect this repo in the Netlify dashboard
for auto-deploy on push (build command `npm run build`, publish directory
`dist`), or drag-and-drop the `dist/` folder to
[netlify.com/drop](https://app.netlify.com/drop) for a quick first version.

The contact form uses [Netlify Forms](https://docs.netlify.com/forms/setup/)
— no backend needed. Submissions show up in the Netlify dashboard under
Forms once the site is deployed there.
