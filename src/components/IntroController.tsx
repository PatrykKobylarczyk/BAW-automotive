"use client";

import { useEffect } from "react";
import { INTRO_DONE_EVENT, introPlaying } from "@/lib/intro";

/** Logo musi się narysować i wypełnić, zanim ekran zniknie (liczone od startu nawigacji). */
const MIN_MS = 1850;
/** Najdłużej czekamy na film. Po tym czasie ekran znika, nawet jeśli film jeszcze się ładuje. */
const MAX_MS = 6000;

/** Gotowy do grania: ma klatki na teraz i na chwilę do przodu (HAVE_FUTURE_DATA). */
function videoReady(video: HTMLVideoElement | null) {
  return new Promise<void>((resolve) => {
    if (!video || video.readyState >= 3) return resolve();
    const done = () => resolve();
    video.addEventListener("canplay", done, { once: true });
    video.addEventListener("playing", done, { once: true });
    video.addEventListener("error", done, { once: true });
  });
}

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, Math.max(0, ms)));

/**
 * Steruje końcem ekranu startowego: czeka, aż logo się narysuje ORAZ film w Hero (video[data-intro-wait]) będzie
 * gotowy, ale nie dłużej niż MAX_MS. Potem przełącza html[data-intro] na "out" (CSS robi wyjście) i wysyła
 * INTRO_DONE_EVENT, na który czekają animacje tekstu w Hero.
 */
export default function IntroController() {
  useEffect(() => {
    if (!introPlaying()) return;
    const video = document.querySelector<HTMLVideoElement>("video[data-intro-wait]");
    let cancelled = false;
    const now = performance.now();
    Promise.race([
      Promise.all([wait(MIN_MS - now), videoReady(video)]),
      wait(MAX_MS - now),
    ]).then(() => {
      if (cancelled) return;
      // Film grał już pod ekranem; puszczamy go od początku, żeby ujęcie zaczynało się razem z odsłonięciem.
      if (video && video.readyState >= 3) video.currentTime = 0;
      document.documentElement.dataset.intro = "out";
      window.dispatchEvent(new Event(INTRO_DONE_EVENT));
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return null;
}
