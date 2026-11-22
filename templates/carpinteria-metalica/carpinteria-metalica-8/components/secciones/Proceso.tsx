import type { CSSProperties } from "react";
import type { Paso } from "@andrei-leads/core";

type Props = { pasos: readonly Paso[] };

/**
 * Proceso (encargo §6.6): un camino curvo SVG de trazos que une círculos numerados; en móvil, en
 * vertical. Sobre `alterna`, con radios grandes arriba (empalma con las garantías).
 */
export function Proceso({ pasos }: Props) {
  if (pasos.length === 0) return null;
  return (
    <section aria-labelledby="titulo-proceso" className="seccion rounded-t-[clamp(36px,6vw,80px)] bg-alterna">
      <div className="contenedor">
        <div className="mb-[clamp(36px,5vw,64px)] flex flex-col gap-3">
          <p className="antetitulo">Cómo trabajamos</p>
          <h2 id="titulo-proceso" className="h2">
            Así trabajamos, paso a paso
          </h2>
        </div>
        <div className="relative">
          <svg aria-hidden="true" viewBox="0 0 1000 60" preserveAspectRatio="none" className="absolute inset-x-0 top-1 hidden h-14 w-full lg:block">
            <path d="M30 30 C 130 -15, 230 75, 330 30 S 530 -15, 630 30 S 830 75, 970 30" fill="none" stroke="var(--color-acento)" strokeWidth="2" strokeDasharray="6 8" vectorEffect="non-scaling-stroke" />
          </svg>
          <svg aria-hidden="true" viewBox="0 0 40 1000" preserveAspectRatio="none" className="absolute top-7 bottom-7 left-2 h-[calc(100%-56px)] w-10 lg:hidden">
            <path d="M20 0 C 2 125, 38 250, 20 375 S 2 625, 20 750 S 38 875, 20 1000" fill="none" stroke="var(--color-acento)" strokeWidth="2" strokeDasharray="6 8" vectorEffect="non-scaling-stroke" />
          </svg>
          <ol
            style={{ "--pasos": pasos.length } as CSSProperties}
            className="relative flex flex-col gap-7 lg:grid lg:grid-cols-[repeat(var(--pasos),minmax(0,1fr))] lg:gap-6"
          >
            {pasos.map((p, i) => (
              <li key={p.titulo} className="flex items-start gap-[18px] lg:flex-col lg:gap-3.5">
                <span
                  aria-hidden="true"
                  className="flex size-14 flex-none items-center justify-center rounded-full bg-primario font-titulo text-[22px] font-medium text-sobre-primario shadow-[0_0_0_6px_var(--color-alterna)] lg:size-16 lg:text-[26px]"
                >
                  {i + 1}
                </span>
                <div className="flex flex-col gap-1 pt-1.5 lg:gap-3.5 lg:pt-0">
                  <h3 className="font-titulo text-[21px] leading-[1.2] font-medium lg:text-[22px] lg:leading-[1.15]">
                    <span className="sr-only">Paso {i + 1}: </span>
                    {p.titulo}
                  </h3>
                  <p className="text-base leading-[1.5] text-texto-suave lg:leading-[1.55]">{p.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
