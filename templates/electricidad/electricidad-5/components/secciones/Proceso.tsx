import type { CSSProperties } from "react";
import { pasosProceso, type SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Pareja } from "@/components/Botones";
import type { DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

/** Banda de color pleno con tarjetas numeradas «1 · 2 · 3» y la pareja Llamar + WhatsApp. */
export function Proceso({ proceso, cta }: { proceso: SiteConfig["proceso"]; cta: DatosCta }) {
  const pasos = pasosProceso(proceso, "urgencias");
  return (
    <section aria-labelledby="titulo-proceso" className="sobre-pleno seccion bg-pleno text-sobre-primario">
      <div className="contenedor">
        <h2 id="titulo-proceso" className="titulo-seccion">
          Cómo trabajamos
        </h2>
        <ol className={cn("m-0 mt-7 grid list-none gap-(--hueco-bento) p-0", pasos.length % 3 === 0 ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4")}>
          {pasos.map((p, i) => (
            <li key={p.titulo} data-aparecer style={{ "--i": i } as CSSProperties} className="sobre-claro flex flex-col rounded-tarjeta bg-superficie p-6 text-texto lg:p-7">
              {p.imagen && <Foto imagen={p.imagen} sizes="(min-width: 768px) 30vw, 100vw" proporcion="4/3" className="mb-5" />}
              <span aria-hidden="true" className="font-titulo text-5xl leading-none font-[750] tracking-[-0.04em] tabular-nums">
                {i + 1}
              </span>
              <span aria-hidden="true" className="raya-acento mt-2" />
              <h3 className="m-0 mt-5 text-[1.375rem] leading-tight font-bold tracking-[-0.02em]">
                <span className="sr-only">Paso {i + 1}: </span>
                {p.titulo}
              </h3>
              <p className="m-0 mt-2.5 text-texto-suave">{p.texto}</p>
            </li>
          ))}
        </ol>
        <Pareja cta={cta} tono="pleno" className="mt-7" />
      </div>
    </section>
  );
}
