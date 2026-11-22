"use client";

import { useEffect, useRef, useState } from "react";

type Props = { src: string; srcAv1?: string };

/**
 * Isla del vídeo del pano (≤ 1 KB; encargo §8). No pinta el vídeo hasta que el
 * pano se acerca a la pantalla (nunca se precarga) y nunca con «reducir
 * movimiento» o ahorro de datos: entonces se queda el póster. Botón «Pausar»
 * de 44 px (el clip dura más de 5 s). El vídeo es decorativo (`aria-hidden`).
 */
export function ControlVideo({ src, srcAv1 }: Props) {
  const ancla = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [activo, setActivo] = useState(false);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    const ahorro = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (ahorro || matchMedia("(prefers-reduced-motion: reduce)").matches || !ancla.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActivo(true);
          io.disconnect();
        }
      },
      { rootMargin: "50% 0px" },
    );
    io.observe(ancla.current);
    return () => io.disconnect();
  }, []);

  const alternar = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
    setPausado(!v.paused);
  };

  return (
    <div ref={ancla} className="absolute inset-0">
      {activo && (
        <>
          <video ref={video} className="absolute inset-0 size-full object-cover" autoPlay muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1}>
            {srcAv1 && <source src={srcAv1} type='video/mp4; codecs="av01.0.05M.08"' />}
            <source src={src} type="video/mp4" />
          </video>
          <button
            type="button"
            onClick={alternar}
            aria-pressed={pausado}
            className="absolute top-[calc(var(--alto-cabecera)+16px)] right-[clamp(20px,4vw,48px)] z-[5] min-h-11 rounded-boton border border-[var(--color-linea)] bg-[var(--color-velo)] px-4 text-sm font-medium text-texto backdrop-blur-[6px]"
          >
            Pausar
          </button>
        </>
      )}
    </div>
  );
}
