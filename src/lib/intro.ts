"use client";

import { useSyncExternalStore } from "react";

/** Zdarzenie na `window`, gdy ekran startowy z logo zaczyna znikać. */
export const INTRO_DONE_EVENT = "baw-intro-done";

/** Czy ekran startowy z logo właśnie gra (skrypt w <head> ustawia html[data-intro="play"]). */
export function introPlaying() {
  return typeof document !== "undefined" && document.documentElement.dataset.intro === "play";
}

/**
 * true, gdy można odpalić wejściowe animacje strony: od razu, jeśli intro nie gra (druga wizyta w sesji,
 * reduced-motion, przejście między podstronami), albo w chwili, gdy ekran startowy zaczyna znikać.
 * Na serwerze i w pierwszym renderze zawsze false, żeby hydratacja się zgadzała.
 */
export function useIntroDone() {
  return useSyncExternalStore(subscribe, () => !introPlaying(), () => false);
}

function subscribe(onChange: () => void) {
  window.addEventListener(INTRO_DONE_EVENT, onChange);
  return () => window.removeEventListener(INTRO_DONE_EVENT, onChange);
}
