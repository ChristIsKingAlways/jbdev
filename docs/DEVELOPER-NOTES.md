# Developer notes

This document describes how the portfolio is structured, how CSS is named, and what each part of the codebase is responsible for. It is maintained for anyone working on or reviewing the project.

---

## Naming: CSS Modules + globals

**Component styles** live in `*.module.css` next to each component. Class names are short **camelCase** strings scoped by the build (no repeated file prefix). In JSX use dot notation: `styles.section`, `styles.mobileCta`.

**Global utilities** in `app/globals.css` use kebab-case where conventional (e.g. `site-skip-link`, `visually-hidden`). Frosted panels combine a base class with a context class:

- `glass` — shared blur, border, shadow
- `glassHero`, `glassAbout`, `glassForm`, `glassFooter` — padding and tone per section

### Where styles live

| Area | Location |
|------|-----------|
| Section / widget layout | `components/*.module.css` — camelCase, one file per component |
| Shared glass material | `app/globals.css` — `glass` + `glassHero` / `glassAbout` / `glassForm` / `glassFooter` |
| Skip link | `app/globals.css` — `site-skip-link` |
| Screen-reader utility | `app/globals.css` — `visually-hidden` |

---

## Project map

### App shell

| File | Role |
|------|------|
| `app/layout.jsx` | HTML shell, Inter font, imports `globals.css`, SEO metadata |
| `app/page.jsx` | Composes all sections and global widgets (progress bar, particle canvas, markup inspector) |
| `app/globals.css` | Reset, design tokens (`:root`), body background, glass utilities |

### API

| File | Role |
|------|------|
| `app/api/contact/route.js` | `POST` handler: validates `name`, `email`, `message`; ready for a real mail provider |

### Hooks (`hooks/`)

| File | Role |
|------|------|
| `useInView.js` | `IntersectionObserver` → reveal animations when sections enter the viewport |
| `useScrollProgress.js` | Scroll fraction `0–1` via `useSyncExternalStore` for the top progress bar |
| `useReducedMotion.js` | `prefers-reduced-motion` for particle field and motion fallbacks |

### Components (`components/`)

| Component | Notes |
|-----------|--------|
| `SkipLink` | Global `site-skip-link`; first tab stop → `#main-content`; `data-no-markup-inspector` |
| `Navigation` | Fixed bar; `barScrolled` / `barExpanded` for glass intensity |
| `Hero` | Full-height intro; copy `glass glassHero` |
| `Projects` | Pinterest-style dense grid; `next/image` for screenshots |
| `About` | Two columns; bio `glass glassAbout`; skill chips with local glass styling |
| `Contact` | Mailto + form; form `glass glassForm`; client + server validation |
| `Footer` | Centered pill row `glass glassFooter` |
| `ScrollProgress` | Gradient `bar` scaled on scroll |
| `ParticleField` | Canvas animation; static dots when reduced motion |
| `HoverCodeTooltip` | After 1.5s hover, shows truncated `outerHTML`; `data-markup-inspector` on root |
| `ErrorBoundary` | Catches render errors inside `<main>` |

---

## Features (behaviour notes)

1. **Smooth scrolling** — In-page links use `scrollIntoView` / `scrollTo`; `scroll-padding-top` accounts for the fixed header.
2. **Glass UI** — Backdrop blur + saturation + hairline borders; fallbacks when `backdrop-filter` is unsupported or when `prefers-reduced-transparency` is set.
3. **Accessibility** — Landmarks, labels, `aria-live` on form status, focus styles, skip link.
4. **Markup inspector** — Development-style aid: long hover shows DOM snippet. Opt out with `data-no-markup-inspector="true"` on any element or ancestor.
5. **Contact** — Form posts JSON to `/api/contact`; integrate your provider in the route file.

---

## Commands

```bash
npm install
npm run dev    # local dev
npm run build  # production build
npm run lint   # ESLint
```

---

## License

MIT (see repository root).
