"use client";

import { useEffect, useRef, useState } from "react";

type Props = { src: string; srcAv1?: string };

/**
 * Isla del vídeo del hero (encargo §5 y §8). No pinta nada hasta `load`: así el
 * vídeo nunca compite con el póster (LCP). Solo se monta sin «reducir movimiento» y
 * sin `saveData`. El vídeo es decorativo (`aria-hidden`); el botón de pausa (44 px)
 * cambia de nombre: «Pausar vídeo» / «Reanudar vídeo».
 */
export function VideoDiferido({ src, srcAv1 }: Props) {
  const [montado, setMontado] = useState(false);
  const [pausado, setPausado] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ahorro = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    if (reducir || ahorro) return;
    const montar = () => setMontado(true);
    if (document.readyState === "complete") {
      const id = window.setTimeout(montar, 0);
      return () => window.clearTimeout(id);
    }
    window.addEventListener("load", montar, { once: true });
    return () => window.removeEventListener("load", montar);
  }, []);

  if (!montado) return null;

  const alternar = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPausado(false);
    } else {
      v.pause();
      setPausado(true);
    }
  };

  return (
    <>
      <video
        ref={ref}
        className="absolute inset-0 size-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
      >
        {srcAv1 && <source src={srcAv1} type='video/mp4; codecs="av01.0.05M.08"' />}
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={alternar}
        aria-label={pausado ? "Reanudar vídeo" : "Pausar vídeo"}
        className="absolute top-[calc(var(--alto-cabecera)+12px)] right-[clamp(16px,5vw,64px)] z-[5] grid size-11 place-items-center rounded-full bg-superficie/92 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-white"
      >
        {pausado ? (
          <span aria-hidden="true" className="ml-[3px] block size-0 border-y-8 border-l-12 border-y-transparent border-l-texto" />
        ) : (
          <span aria-hidden="true" className="flex gap-1">
            <span className="block h-3.5 w-1 rounded-[1px] bg-texto" />
            <span className="block h-3.5 w-1 rounded-[1px] bg-texto" />
          </span>
        )}
      </button>
    </>
  );
}
