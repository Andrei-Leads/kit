"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  srcAv1?: string;
  /** Pano: pide la fuente cuando está a una pantalla de distancia. Hero: después de `load`. */
  diferido?: boolean;
  /** Clases del botón de pausa (posición). */
  clasePausa?: string;
};

/**
 * Control del vídeo (≤ 1 KB, encargo §5.1 y §5.4). El `<video>` sale sin fuente
 * en el HTML: sin JS, con «reducir movimiento» o con ahorro de datos solo se ve
 * el póster que hay debajo. El vídeo se hace visible cuando ya reproduce (el
 * póster es su primer fotograma: sin fundido). Pausa de 44 px: el clip dura más de 5 s.
 */
export function VideoControl({ src, srcAv1, diferido, clasePausa }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [estado, setEstado] = useState(0); // 0 sin vídeo · 1 reproduce · 2 en pausa

  useEffect(() => {
    const v = ref.current;
    const n = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (!v || matchMedia("(prefers-reduced-motion: reduce)").matches || n.connection?.saveData) return;
    const cargar = () => {
      v.muted = true;
      v.src = srcAv1 && v.canPlayType('video/mp4; codecs="av01.0.05M.08"') ? srcAv1 : src;
      v.play().catch(() => {});
    };
    if (diferido) {
      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            io.disconnect();
            cargar();
          }
        },
        { rootMargin: "100% 0px" },
      );
      io.observe(v);
      return () => io.disconnect();
    }
    if (document.readyState === "complete") cargar();
    else {
      addEventListener("load", cargar, { once: true });
      return () => removeEventListener("load", cargar);
    }
  }, [src, srcAv1, diferido]);

  const alternar = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setEstado(1);
    } else {
      v.pause();
      setEstado(2);
    }
  };

  return (
    <>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => setEstado(1)}
        className={estado ? "absolute inset-0 size-full object-cover" : "absolute inset-0 size-full object-cover opacity-0"}
      />
      {estado > 0 && (
        <button
          type="button"
          onClick={alternar}
          className={"grid size-11 place-items-center rounded-full border border-fondo/50 bg-tinta/40 text-fondo " + (clasePausa ?? "")}
        >
          <span aria-hidden="true" className="text-xs">
            {estado === 1 ? "II" : "▶"}
          </span>
          <span className="sr-only">{estado === 1 ? "Pausar vídeo" : "Reproducir vídeo"}</span>
        </button>
      )}
    </>
  );
}
