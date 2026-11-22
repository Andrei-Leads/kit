"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Control del vídeo del hero (≤ 1 KB, encargo §8). No pinta nada hasta `load`:
 * el vídeo nunca compite con el póster (LCP). Solo se monta sin «reducir
 * movimiento» ni `Save-Data`. Vídeo decorativo (`aria-hidden`) con botón de
 * pausa de 44 px abajo a la derecha (clip de más de 5 s).
 */
export function VideoHeroControl({ src, srcAv1 }: { src: string; srcAv1?: string }) {
  const [montado, setMontado] = useState(false);
  const [pausado, setPausado] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ahorro = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || ahorro) return;
    const montar = () => setMontado(true);
    if (document.readyState === "complete") {
      const id = setTimeout(montar, 0);
      return () => clearTimeout(id);
    }
    addEventListener("load", montar, { once: true });
    return () => removeEventListener("load", montar);
  }, []);

  if (!montado) return null;

  const alternar = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
    setPausado(!v.paused);
  };

  return (
    <>
      <video ref={ref} className="absolute inset-0 size-full object-cover" autoPlay muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1}>
        {srcAv1 && <source src={srcAv1} type='video/mp4; codecs="av01.0.05M.08"' />}
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={alternar}
        aria-label={pausado ? "Reanudar vídeo" : "Pausar vídeo"}
        className="absolute top-[calc(var(--alto-cabecera)+48px)] right-[var(--margen)] z-[4] grid size-11 place-items-center rounded-full border border-white/60 bg-tinta/40 text-white lg:top-auto lg:right-10 lg:bottom-8"
      >
        <span aria-hidden="true" className="text-sm leading-none">
          {pausado ? "▶" : "❚❚"}
        </span>
      </button>
    </>
  );
}
