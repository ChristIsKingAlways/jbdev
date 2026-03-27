# Portfolio Website

A one-page portfolio built with **semantic HTML**, **modern CSS** (layers, custom properties, `color-mix`, container queries, logical properties), **JavaScript**, and **React** (Next.js App Router). Styling is hand-authored with **CSS Modules**—no Tailwind or animation libraries.

## Highlights

- **HTML**: Landmarks, skip link, labeled sections, accessible forms with `aria-*` and live regions
- **CSS**: Design tokens, cascade layers, fluid type (`clamp`), reduced-motion preferences, responsive grid with `@container` plus fallbacks
- **JavaScript**: `IntersectionObserver`, `requestAnimationFrame` canvas field, `FormData` validation, `fetch` to API route
- **React**: Client components where needed, `memo` on project cards, `useSyncExternalStore` for scroll and media queries, class `ErrorBoundary`, `useId` for form wiring

## Tech stack

- [Next.js 14](https://nextjs.org/) — React, App Router, `next/font`, `next/image`
- [React 18](https://react.dev/)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact API

`POST /api/contact` expects JSON `{ name, email, message }`. Wire in SendGrid, Resend, or similar inside `app/api/contact/route.js`.

## License

MIT
