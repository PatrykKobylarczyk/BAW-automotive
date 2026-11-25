/** Ile sekund przesunąć wejściowe animacje strony, gdy gra ekran startowy z logo (LogoIntro). Poza intro: 0. */
export function introDelay() {
  if (typeof document === "undefined") return 0;
  return document.documentElement.dataset.intro === "play" ? 1.75 : 0;
}
