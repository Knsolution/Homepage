# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A single-page profile site for one fictional character. Static HTML/CSS/JS, no build step, no dependencies.

## Commands

There is no build/lint/test tooling. To preview:

- Double-click `index.html` to open it directly in a browser, or
- Run a local static server from the project root (recommended, avoids any browser file:// quirks with images):
  ```
  npx serve .
  ```
  or
  ```
  python -m http.server
  ```

## Architecture

- `js/data.js` — the single source of truth for all content. It defines one global `persona` object (name, tagline, photo, basicInfo, appearance, personality, background, career, goals, gallery). **To change what's on the page, edit only this file.**
- `js/main.js` — pure rendering layer. Reads the `persona` object and writes it into DOM elements by `id`. It has no content of its own — every string on the page originates in `data.js`.
- `index.html` — static skeleton with empty containers (`#hero-name`, `#basic-info-list`, `#personality-traits`, etc.) that `main.js` fills in on load. If you rename or remove an element id here, update the matching `document.getElementById(...)` call in `main.js`.
- Sections with no data auto-hide instead of rendering empty: `persona.gallery` (`renderGallery`), `persona.goals`, and `persona.appearance` (both empty `description` and empty `특징`) all hide their `<section>` when empty. Follow the same pattern for any new optional section.
- This persona is based on a real person's public LinkedIn info (career/education), so don't invent unverified biographical details (relationships, physical description, personal goals) — leave the field empty (which hides the section) rather than fabricating content, unless the user supplies it.
- `persona.photo` failing to load falls back to a placeholder circle showing the character's initial (see `photo.onerror` in `main.js`), so a missing image file never breaks the layout.

Data is embedded directly in `data.js` as a JS object rather than fetched from a JSON file, so the site works when opened directly via `file://` (a `fetch()` of a local JSON file is blocked by CORS in that mode).

Images referenced from `data.js` (`photo`, `gallery[].src`) should be placed under `assets/images/`.

## Design tokens

`css/style.css` is skinned after the Kakao design system (https://www.oppadu.com/tools/design-systems-site/#/kakao): Kakao Yellow (`#FEE500`) primary scale, Kakao Brown (`#4A2D17`) as the text/heading accent (yellow text on white fails contrast, so accent text uses brown instead — yellow is reserved for pill/tag backgrounds and the hero photo border+glow), light surfaces (`--bg-base`/`--bg-subtle`/`--bg-elevated`), 12-18px round corners, and a yellow-tinted glow shadow (`--shadow-xl`). All tokens are declared as CSS variables on `:root` — change the palette by editing those variables rather than hardcoded colors in the rules below them.
