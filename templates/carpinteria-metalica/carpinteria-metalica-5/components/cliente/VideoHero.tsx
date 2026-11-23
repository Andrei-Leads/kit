"use client";

import { useEffect, useRef, useState } from "react";

type Props = { src: string; srcAv1?: string };

/**
 * Isla del vídeo del hero (encargo §5, < 1 KB). En el HTML solo está el póster (LCP). Después
 * del evento `load`, y solo sin «reducir movimiento» ni ahorro de datos, monta
 * `<video muted playsinline loop preload="none">` (AV1 y H.264) encima del póster, sin
 * fundido, y enseña «Pausar / Reproducir» (44 px, `aria-pressed`). Sin JS: póster y sin botón.
 * El vídeo es decorativo (`aria-hidden`): el mensaje está en el `h1`.
 */
export function VideoHero({ src, srcAv1 }: Props) {
  const hueco = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement | null>(null);
  const [listo, setListo] = useState(false);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    const n = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || n.connection?.saveData) return;
    const montar = () => {
      if (!hueco.current || video.current) return;
      const v = document.createElement("video");
      v.muted = v.loop = v.playsInline = v.autoplay = true;
      v.preload = "none";
      v.setAttribute("aria-hidden", "true");
      v.tabIndex = -1;
      v.className = "size-full object-cover";
      const fuentes: [string | undefined, string][] = [
        [srcAv1, 'video/mp4; codecs="av01.0.05M.08"'],
        [src, "video/mp4"],
      ];
      for (const [u, t] of fuentes) {
        if (!u) continue;
        const f = document.createElement("source");
        f.src = u;
        f.type = t;
        v.append(f);
      }
      hueco.current.append(v);
      video.current = v;
      v.play().catch(() => {});
      setListo(true);
    };
    if (document.readyState === "complete") montar();
    else window.addEventListener("load", montar, { once: true });
    return () => window.removeEventListener("load", montar);
  }, [src, srcAv1]);

  const alternar = () => {
    const v = video.current;
    if (!v) return;
    if (pausado) void v.play();
    else v.pause();
    setPausado(!pausado);
  };

  return (
    <>
      <div ref={hueco} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]" />
      <button
        type="button"
        onClick={alternar}
        hidden={!listo}
        aria-pressed={pausado}
        className="absolute right-4 bottom-4 z-[4] flex size-11 cursor-pointer items-center justify-center gap-1 rounded-boton border border-[rgb(236_234_228/0.7)] bg-[rgb(13_14_15/0.5)] text-texto lg:right-5 lg:bottom-5 [&[hidden]]:hidden"
      >
        <span className="sr-only">Pausar el vídeo</span>
        {pausado ? (
          <span aria-hidden="true" className="ml-[3px] size-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-current" />
        ) : (
          <>
            <span aria-hidden="true" className="h-3.5 w-0.5 bg-current" />
            <span aria-hidden="true" className="h-3.5 w-0.5 bg-current" />
          </>
        )}
      </button>
    </>
  );
}
