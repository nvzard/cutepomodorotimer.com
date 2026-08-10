# Cute Timer ❤️

A free, cute Pomodoro timer for studying and deep focus. Pair a kawaii pink pomodoro countdown with gentle lo-fi music, a blushing tomato mascot, and a pastel design — all in your browser with no sign-up.

Live at [cutepomodorotimer.com](https://cutepomodorotimer.com)

![Cute Pomodoro Timer](https://github.com/user-attachments/assets/f430a0a8-f0ab-4407-ad9f-a965d9ce4bb6)

## Features

- Pomodoro focus / short break / long break cycles with progress tracking
- Customizable durations (10, 15, 25, 30, 50, 60 min...) with auto-start breaks
- To-do list — your current task sits right under the countdown
- Built-in lo-fi music player (coffee shop & beats tracks) with volume control
- Zen gong chime and browser notifications when a phase ends
- Blushing tomato mascot, heart-dot progress, and light/dark themes
- Localized in English, Spanish, German, French, Hindi, Japanese, and Portuguese
- Everything stored locally in your browser — no accounts, no tracking

## Tech Stack

- [Astro](https://astro.build) with the Cloudflare adapter
- Tailwind CSS v4
- @astrojs/sitemap + Google Fonts
- Deployed to Cloudflare Workers

## Development

```sh
npm install
npm run dev        # start the dev server at localhost:4321
```

Run the dev server in background mode with `astro dev --background` (manage it via `astro dev stop`, `astro dev status`, `astro dev logs`).

## Commands

| Command           | Action                                  |
| :---------------- | :-------------------------------------- |
| `npm install`     | Install dependencies                    |
| `npm run dev`     | Start local dev server at `localhost:4321` |
| `npm run build`   | Build the production site to `./dist/`  |
| `npm run preview` | Preview the build locally               |
| `npm run deploy`  | Build and deploy to Cloudflare Workers  |
| `npm run generate-types` | Regenerate Wrangler types        |

## Project Structure

```
/
├── public/          # static assets (favicons, audio, manifests)
├── src/
│   ├── components/  # UI components (Timer, Dock, TodoPanel, pages...)
│   ├── layouts/     # page layouts
│   ├── lib/         # app logic + i18n translations
│   ├── pages/       # routes (localized via [lang] dynamic routes)
│   └── styles/      # global styles
├── astro.config.mjs
└── wrangler.jsonc   # Cloudflare Workers config
```

## License

Private project. All rights reserved.
