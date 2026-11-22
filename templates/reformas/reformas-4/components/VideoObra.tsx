"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  srcAv1?: string;
};

/**
 * Isla del vídeo de la sección «Así avanza una obra» (encargo §5): el `<video>` se monta después de
 * `load`, y no se monta con «reducir movimiento» ni con ahorro de datos (`saveData`), que dejan solo
 * el póster. Sin JavaScript se ve el póster con el enlace «Ver vídeo» al MP4. Con vídeo, el botón
 * «Pausar vídeo / Reanudar vídeo» (obligatorio: dura más de 5 s). El póster lo pinta el servidor.
 */
export function VideoObra({ src, srcAv1 }: Props) {
  const [montado, setMontado] = useState(false);
  const [pausa, setPausa] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ahorro = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (ahorro || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const montar = () => setMontado(true);
    if (document.readyState === "complete") {
      montar();
      return;
    }
    window.addEventListener("load", montar, { once: true });
    return () => window.removeEventListener("load", montar);
  }, []);

  // El texto del botón sigue al estado real del vídeo (también si el navegador bloquea el autoplay).
  const alternar = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  };

  const boton = "mono absolute bottom-3 left-3 z-[3] inline-flex min-h-11 items-center rounded-boton border border-borde bg-fondo px-4 text-xs text-texto no-underline hover:border-primario-claro hover:text-texto";

  if (!montado) {
    return (
      <a href={src} className={boton}>
        Ver vídeo
      </a>
    );
  }
  return (
    <>
      <video ref={ref} className="absolute inset-0 z-[1] size-full object-cover" autoPlay muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} onPlay={() => setPausa(false)} onPause={() => setPausa(true)}>
        {srcAv1 && <source src={srcAv1} type='video/mp4; codecs="av01.0.05M.08"' />}
        <source src={src} type="video/mp4" />
      </video>
      <button type="button" onClick={alternar} className={boton}>
        {pausa ? "Reanudar vídeo" : "Pausar vídeo"}
      </button>
    </>
  );
}
