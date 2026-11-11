/**
 * The one look for a page's main heading (h1), taken from "Pojazdy". Every page uses it, so headings have the
 * same size on every page.
 */
export const pageTitle = "font-display text-[clamp(36px,5.6vw,80px)] leading-[1.02] font-extrabold tracking-tight";

/**
 * Top padding of a page's first section, so its eyebrow and h1 start at the same height on every page, the
 * same as under the breadcrumbs of `PageHeader` (188 px on phones, 220 px from md up).
 */
export const pageTop = "pt-[188px] md:pt-[220px]";

/** Breadcrumbs laid over a page's first section, at the same height as in `PageHeader`. */
export const crumbsOverlay = "absolute inset-x-0 top-0 z-10 pt-32 md:pt-40";
