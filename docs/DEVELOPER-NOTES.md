# Developer notes

This document describes how the portfolio is structured, how CSS is named, and what each part of the codebase is responsible for. It is maintained for anyone working on or reviewing the project.

---

## Naming: BEM and plain language

The site uses **BEM-style** class names so markup stays predictable and easy to extend.

- **Block**: standalone component or pattern (e.g. `hero`, `navigation`, `glass`).
- **Element**: part of a block, written `block__element` (e.g. `hero__lede`, `navigation__link`).
- **Modifier**: variant or state, written `block--modifier` or `block__element--modifier` (e.g. `navigation--scrolled`, `contact__status--success`).

**Words** are common English (navigation, hero, footer, contact, glass) rather than abbreviations, so class names read clearly in DevTools and in JSX.

### Where BEM lives

| Area | Location |
|------|-----------|
| Page sections | `components/*.module.css` — one primary **block** per file (sometimes two related blocks, e.g. `projects` + `project-card`) |
| Shared frosted panels | `app/globals.css` — **block** `glass` with modifiers `glass--hero`, `glass--about`, `glass--form`, `glass--footer` |
| Skip link | `app/globals.css` — **block** `site-skip-link` |
| Screen-reader utility | `app/globals.css` — **utility** `visually-hidden` (common pattern; not tied to one block) |

### CSS Modules

Scoped classes are authored with BEM strings (including hyphens). In JSX, **any class name that contains a hyphen must use bracket notation**—for example `styles['navigation--scrolled']`, `styles['project-card__thumb']`, `styles['navigation__cta-mobile']`. Using dot notation like `styles.navigation__cta-mobile` is parsed as subtraction and will throw at runtime.

---

## Project map

### App shell

| File | Role |
|------|------|
| `app/layout.jsx` | HTML shell, Inter font, imports `globals.css`, SEO metadata |
| `app/page.jsx` | Composes all sections and global widgets (progress bar, particle canvas, markup inspector) |
| `app/globals.css` | Reset, design tokens (`:root`), body background, glass utilities, keyframes |

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

| Component | BEM block(s) | Notes |
|-----------|----------------|-------|
| `SkipLink` | `site-skip-link` (global) | First tab stop → `#main-content`; `data-no-markup-inspector` so the hover inspector ignores it |
| `Navigation` | `navigation` | Fixed bar; modifiers `--scrolled` / `--expanded` for glass intensity |
| `Hero` | `hero` | Full-height intro; copy wrapped in `glass glass--hero` |
| `Projects` | `projects`, `project-card` | Pinterest-style dense grid; `next/image` for screenshots |
| `About` | `about` | Two columns; bio panel `glass glass--about`; skill chips with local glass styling |
| `Contact` | `contact` | Mailto + form; form `glass glass--form`; client + server validation |
| `Footer` | `footer` | Centered pill row `glass glass--footer` |
| `ScrollProgress` | `scroll-progress__bar` | Gradient bar scaled on scroll |
| `ParticleField` | `particle-field__canvas` | Canvas animation; static dots when reduced motion |
| `HoverCodeTooltip` | `hover-code-tooltip` | After 1.5s hover, shows truncated `outerHTML`; `data-markup-inspector` on root |
| `ErrorBoundary` | `error-boundary` | Catches render errors inside `<main>` |

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
