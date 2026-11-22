"use client";

import { useEffect, useRef, useState } from "react";

type Props = { src: string; srcAv1?: string };

/**
 * Isla del vídeo del pano (encargo §5.2, ≤ 1 KB). Cuando el pano está a una pantalla,
 * y solo sin «reducir movimiento» ni ahorro de datos, monta `<video muted playsinline
 * loop preload="none">` (AV1 y H.264) dentro de `[data-pano-medio]` y pone `data-listo`
 * en la sección: solo entonces corre la marquesina. «Pausar / Reproducir» para el vídeo
 * y la marquesina (WCAG 2.2.2). El vídeo es decorativo (`aria-hidden`).
 */
export function ControlVideo({ src, srcAv1 }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const video = useRef<HTMLVideoElement | null>(null);
  const [listo, setListo] = useState(false);
  const [pausa, setPausa] = useState(false);

  useEffect(() => {
    const s = ref.current?.closest("section");
    const n = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (!s || matchMedia("(prefers-reduced-motion: reduce)").matches || n.connection?.saveData) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const v = document.createElement("video");
        v.muted = v.loop = v.playsInline = v.autoplay = true;
        v.preload = "none";
        v.className = "pano-video";
        v.setAttribute("aria-hidden", "true");
        const fuentes: [string | undefined, string][] = [[srcAv1, 'video/mp4; codecs="av01.0.05M.08"'], [src, "video/mp4"]];
        for (const [u, t] of fuentes) {
          if (!u) continue;
          const f = document.createElement("source");
          f.src = u;
          f.type = t;
          v.append(f);
        }
        s.querySelector("[data-pano-medio]")?.append(v);
        video.current = v;
        v.play().catch(() => {});
        s.dataset.listo = "";
        setListo(true);
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(s);
    return () => io.disconnect();
  }, [src, srcAv1]);

  const alternar = () => {
    const v = video.current;
    const s = ref.current?.closest("section");
    if (!v || !s) return;
    if (pausa) {
      void v.play();
      delete s.dataset.pausa;
    } else {
      v.pause();
      s.dataset.pausa = "";
    }
    setPausa(!pausa);
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={alternar}
      hidden={!listo}
      className="pano-pausa boton boton-llamar sobre-tinta min-h-11 px-4 text-sm"
    >
      {pausa ? "Reproducir" : "Pausar"}
    </button>
  );
}
