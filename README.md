# Freyja Community

Static site for the Freyja community hub. Links out to the core
[Freyja repositories](https://github.com/andersen-lab) in the andersen-lab org and
hosts community discussion via [giscus](https://giscus.app), backed by GitHub
Discussions on [freyja-org/discussion](https://github.com/freyja-org/discussion).

Built with [Astro](https://astro.build).

## Project structure

```text
/
├── src/
│   ├── data/repos.ts           # repos listed on the homepage
│   ├── components/Giscus.astro # GitHub Discussions comment widget
│   ├── layouts/Base.astro      # shared page shell/nav
│   └── pages/
│       ├── index.astro         # homepage
│       └── discussions.astro   # discussion page (embeds Giscus)
└── .github/workflows/deploy.yml # builds and deploys to GitHub Pages
```

## Commands

| Command           | Action                                       |
| :----------------- | :------------------------------------------- |
| `npm install`       | Install dependencies                         |
| `npm run dev`       | Start local dev server at `localhost:4321`   |
| `npm run build`     | Build production site to `./dist/`           |
| `npm run preview`   | Preview the build locally                    |

## Setup still needed before this is live

1. Create the `freyja-org/discussion` repo, enable Discussions on it, and install
   the [giscus app](https://github.com/apps/giscus) — see that repo's README.
2. Run the [giscus.app](https://giscus.app) config generator and fill in the real
   `data-repo-id` / `data-category-id` values in `src/components/Giscus.astro`
   (currently placeholders).
3. Push this repo to `freyja-org/freyja-community` (or rename to
   `freyja-org.github.io` for an org root page — the `site` URL in
   `astro.config.mjs` currently assumes the latter).
4. Enable GitHub Pages for the repo with source set to "GitHub Actions" so
   `.github/workflows/deploy.yml` can deploy on push to `main`.
