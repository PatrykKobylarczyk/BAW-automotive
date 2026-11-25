"use client";

import { useEffect } from "react";
import { INTRO_DONE_EVENT, introPlaying } from "@/lib/intro";

/** Ile pełne, czerwone logo zostaje na ekranie po skończeniu rysowania, zanim ekran zacznie znikać. */
const HOLD_MS = 600;
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
 * Koniec rysowania logo, liczony z zegara samych animacji CSS (kontur, potem wypełnienie). Nie liczymy od startu
 * nawigacji: na prawdziwym łączu animacja rusza dopiero po pobraniu HTML i CSS, więc stały czas od wejścia
 * na stronę ucinał rysowanie.
 */
function logoDrawn(root: HTMLElement) {
  const fills = root
    .getAnimations({ subtree: true })
    .filter((a) => a instanceof CSSAnimation && a.animationName === "baw-intro-fill");
  if (!fills.length) return wait(2600);
  return Promise.all(fills.map((a) => a.finished.catch(() => undefined))).then(() => undefined);
}

/**
 * Steruje końcem ekranu startowego: czeka, aż logo się narysuje do końca ORAZ film w Hero (video[data-intro-wait])
 * będzie gotowy. Na film czeka najwyżej MAX_MS, rysowania logo nie skraca nigdy. Potem przełącza html[data-intro] na "out" (CSS robi wyjście) i wysyła
 * INTRO_DONE_EVENT, na który czekają animacje tekstu w Hero.
 */
export default function IntroController() {
  useEffect(() => {
    if (!introPlaying()) return;
    const root = document.getElementById("baw-intro");
    const video = document.querySelector<HTMLVideoElement>("video[data-intro-wait]");
    let cancelled = false;
    const now = performance.now();
    Promise.all([
      // Logo zawsze rysuje się do końca i chwilę stoi pełne.
      (root ? logoDrawn(root) : Promise.resolve()).then(() => wait(HOLD_MS)),
      // Na film czekamy najwyżej do MAX_MS od wejścia na stronę.
      Promise.race([videoReady(video), wait(MAX_MS - now)]),
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
