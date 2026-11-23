"use client";

import { useEffect, useRef, useState } from "react";

type Props = { src: string; srcAv1?: string };

/**
 * Isla del vídeo de «En el taller» (encargo §5 y §8): el `<video>` se monta después de `load`, y
 * no se monta con «reducir movimiento» ni con ahorro de datos (`saveData`): queda el póster, que
 * pinta el servidor. Sin JavaScript, solo el póster. Vídeo decorativo (`aria-hidden`), en bucle y
 * sin sonido, con el botón «Pausar vídeo / Reproducir vídeo» siempre visible (dura más de 5 s).
 */
export function VideoTaller({ src, srcAv1 }: Props) {
  const [montado, setMontado] = useState(false);
  const [pausado, setPausado] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ahorro = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    if (ahorro || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const montar = () => setMontado(true);
    if (document.readyState === "complete") {
      const id = window.setTimeout(montar, 0);
      return () => window.clearTimeout(id);
    }
    window.addEventListener("load", montar, { once: true });
    return () => window.removeEventListener("load", montar);
  }, []);

  if (!montado) return null;

  // El texto del botón sigue al estado real del vídeo (también si el navegador bloquea el autoplay).
  const alternar = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  };

  return (
    <>
      <video
        ref={ref}
        className="absolute inset-0 z-[1] size-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        onPlay={() => setPausado(false)}
        onPause={() => setPausado(true)}
      >
        {srcAv1 && <source src={srcAv1} type='video/mp4; codecs="av01.0.05M.08"' />}
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={alternar}
        className="boton absolute bottom-3.5 left-3.5 z-[3] flex min-h-12 items-center gap-2 rounded-boton bg-texto pr-[18px] pl-3.5 text-[15px] font-semibold text-fondo"
      >
        {pausado ? (
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M3 1l10 6-10 6z" fill="currentColor" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <rect x="2" y="1" width="3.5" height="12" fill="currentColor" />
            <rect x="8.5" y="1" width="3.5" height="12" fill="currentColor" />
          </svg>
        )}
        {pausado ? "Reproducir vídeo" : "Pausar vídeo"}
      </button>
    </>
  );
}
