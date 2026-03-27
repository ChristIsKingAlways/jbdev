/**
 * Skip link: keyboard-first jump to #main-content. Global BEM block .site-skip-link in globals.css.
 * data-no-markup-inspector: excluded from the hover markup tooltip.
 */

export default function SkipLink() {
  return (
    <a
      className="site-skip-link"
      href="#main-content"
      data-no-markup-inspector="true"
    >
      Skip to main content
    </a>
  )
}
