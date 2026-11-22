"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  src: string;
  srcAv1?: string;
  /** `id` de la capa del hero donde va el vídeo (encima del póster, debajo del velo). */
  capa: string;
};

/**
 * Control de vídeo de `MedioHero` (encargo §8, ≤ 1 KB). No pinta nada hasta `load`,
 * así que el vídeo nunca compite con el póster (LCP). No se monta con «reducir
 * movimiento» ni con `saveData`. El `<video>` va a la capa del hero con un portal y
 * es decorativo (`aria-hidden`); aquí queda la pausa circular de 44 px, con nombre
 * cambiante («Pausar vídeo» / «Reanudar vídeo»).
 */
export function ControlVideo({ src, srcAv1, capa }: Props) {
  const [destino, setDestino] = useState<HTMLElement | null>(null);
  const [pausado, setPausado] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reducir = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ahorro = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    if (reducir || ahorro) return;
    const montar = () => setDestino(document.getElementById(capa));
    if (document.readyState === "complete") {
      const id = setTimeout(montar, 0);
      return () => clearTimeout(id);
    }
    addEventListener("load", montar, { once: true });
    return () => removeEventListener("load", montar);
  }, [capa]);

  if (!destino) return null;

  const alternar = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
    setPausado(!v.paused);
  };

  return (
    <>
      {createPortal(
        <video ref={ref} className="absolute inset-0 size-full object-cover" autoPlay muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1}>
          {srcAv1 && <source src={srcAv1} type='video/mp4; codecs="av01.0.05M.08"' />}
          <source src={src} type="video/mp4" />
        </video>,
        destino,
      )}
      <button
        type="button"
        onClick={alternar}
        aria-label={pausado ? "Reanudar vídeo" : "Pausar vídeo"}
        className="grid size-11 shrink-0 place-items-center rounded-full border border-fondo/70 bg-tinta/55 text-fondo backdrop-blur-sm"
      >
        {pausado ? (
          <span aria-hidden="true" className="ml-[3px] block size-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-current" />
        ) : (
          <span aria-hidden="true" className="flex gap-[3px]">
            <span className="block h-3 w-[3px] bg-current" />
            <span className="block h-3 w-[3px] bg-current" />
          </span>
        )}
      </button>
    </>
  );
}
