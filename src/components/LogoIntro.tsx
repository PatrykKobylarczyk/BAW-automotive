import type React from "react";

import { BAW_LOGO_PATHS } from "./BawLogo";

/**
 * Ekran startowy: kontur logo BAW rysuje się sam, wypełnia kolorem marki, po czym ekran znika i odsłania stronę.
 * Całość to CSS (działa przed hydratacją, bez mignięcia strony). Skrypt inline w <head> decyduje, czy intro gra:
 * raz na sesję karty i nigdy przy prefers-reduced-motion. Gdy nie gra, <html> nie dostaje `data-intro` i ekran jest ukryty.
 */
export const INTRO_SCRIPT = `try{var d=document.documentElement;if(!sessionStorage.getItem("baw-intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.intro="play"}sessionStorage.setItem("baw-intro","1")}catch(e){}`;

export default function LogoIntro() {
  return (
    <div id="baw-intro" aria-hidden className="baw-intro">
      <svg viewBox="56.17 61.52 77.36 16.19" className="baw-intro-logo">
        {BAW_LOGO_PATHS.map((d, i) => (
          <path key={i} d={d} pathLength={1} style={{ "--i": i } as React.CSSProperties} />
        ))}
      </svg>
      <span className="baw-intro-line" />
    </div>
  );
}
