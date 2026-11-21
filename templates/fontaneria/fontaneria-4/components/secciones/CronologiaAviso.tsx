import type { CSSProperties } from "react";
import { BotonLlamada, BotonWhatsApp, pasosProceso, telefonoVisible, type Imagen, type SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { IconoWhatsApp } from "@/components/Iconos";
import { dosCifras } from "@/lib/formato";
import { mensajeAviso } from "@/lib/mensajes";

import { Encabezado } from "./Encabezado";

type Props = Pick<SiteConfig, "proceso" | "galeria" | "trabajos" | "contacto"> & { n: string };

/**
 * CronologiaAviso (sección estrella, encargo §5): los pasos de `proceso` (o los de core para urgencias)
 * como entradas de un parte unidas por una línea vertical. Rótulos de tiempo sin horas inventadas:
 * «Minuto 0» en el primero y «Llegada: {tiempoLlegada}» en el segundo solo con dato.
 *
 * Foto del paso N: `galeria[N-1]`, si no `trabajos[N-1].imagenes[0]`, si no una casilla con el número.
 * Relato con scroll solo CSS (globals.css): en escritorio, con `animation-timeline` y sin «reducir
 * movimiento», una columna fija con las polaroids apiladas; cada entrada declara `view-timeline: --paso-N`
 * y la polaroid N anima con `animation-timeline: --paso-N` (el contenedor lleva `timeline-scope`).
 * En móvil, sin soporte o con «reducir movimiento», cada entrada lleva su foto en línea. Cero JS.
 */
export function CronologiaAviso({ proceso, galeria, trabajos, contacto, n }: Props) {
  const pasos = pasosProceso(proceso, "urgencias").map((p, i) => {
    const foto: Imagen | undefined = galeria[i] ?? trabajos[i]?.imagenes[0];
    const tiempo = i === 0 ? "Minuto 0" : i === 1 && contacto.tiempoLlegada ? `Llegada: ${contacto.tiempoLlegada}` : "";
    return { ...p, nn: dosCifras(i + 1), tl: `--paso-${i + 1}`, foto, tiempo, giro: i % 2 ? "giro-der" : "giro-izq" };
  });
  const scope = { timelineScope: pasos.map((p) => p.tl).join(", ") } as CSSProperties;

  return (
    <section id="cronologia" aria-labelledby="h2-crono" className="border-y border-borde bg-superficie px-(--pad) py-(--sec)">
      <Encabezado n={n} rotulo="Cronología del aviso" />
      <h2 id="h2-crono" className="h2-parte mb-8">
        Así va un aviso, de la llamada a la firma
      </h2>

      <div className="crono" style={scope}>
        <div className="crono-fija" aria-hidden="true">
          {pasos.map((p, i) => (
            <div key={p.tl} className="crono-capa" style={{ zIndex: i + 1, animationTimeline: p.tl } as CSSProperties}>
              {p.foto ? (
                <Foto imagen={p.foto} sizes="240px" decorativa pie={p.nn} />
              ) : (
                <div className="flex aspect-[4/5] items-center justify-center border border-texto bg-fondo font-titulo text-8xl font-light">
                  {p.nn}
                </div>
              )}
            </div>
          ))}
        </div>

        <div>
          <ol className="relative">
            <span aria-hidden="true" className="crono-linea absolute top-2.5 bottom-2.5 left-1 w-px bg-texto" />
            {pasos.map((p) => (
              <li key={p.tl} className="crono-paso relative pb-10 pl-8" style={{ viewTimelineName: p.tl, viewTimelineAxis: "block" } as CSSProperties}>
                <span aria-hidden="true" className="absolute top-3.5 left-0 size-[9px] bg-primario" />
                <div className={`crono-inline mb-4.5 ${p.foto ? "w-[min(240px,72%)]" : "w-[120px]"} ${p.giro}`}>
                  {p.foto ? (
                    <Foto imagen={p.foto} sizes="240px" />
                  ) : (
                    <div aria-hidden="true" className="flex aspect-[4/5] items-center justify-center border border-texto bg-fondo font-titulo text-6xl font-light">
                      {p.nn}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-titulo text-[2.75rem] leading-none font-light [font-stretch:75%]">{p.nn}</span>
                  {p.tiempo && (
                    <span className="border border-primario px-2 py-1 font-titulo text-[0.6875rem] font-bold tracking-[0.06em] text-primario uppercase">
                      {p.tiempo}
                    </span>
                  )}
                </div>
                <h3 className="mt-3 mb-1.5 font-titulo text-lg leading-snug font-semibold">{p.titulo}</h3>
                <p className="max-w-[52ch] text-cuerpo leading-[1.65]">{p.texto}</p>
              </li>
            ))}
          </ol>

          {/* Cierre: llamada-sello + whatsapp-cierre */}
          <div className="mt-2 flex flex-wrap items-center gap-6 pl-4">
            <BotonLlamada telefono={contacto.telefono} className="block size-[120px] flex-none -rotate-[8deg] no-underline mix-blend-multiply">
              <span className="sello sello-llamada flex size-[120px] flex-col items-center justify-center gap-1 border-[3px] shadow-[inset_0_0_0_4px_var(--color-superficie),inset_0_0_0_5px_var(--color-primario)] hover:bg-(--primario-tinte)">
                <span className="text-base font-extrabold tracking-[0.06em]">Llamar</span>
                <span className="text-[0.6875rem] font-semibold [font-stretch:75%]">{telefonoVisible(contacto.telefono)}</span>
              </span>
            </BotonLlamada>
            <div className="flex flex-[1_1_240px] flex-col items-start gap-3">
              <p className="max-w-[30ch] font-titulo text-sm leading-normal text-texto-suave">
                Tu aviso empieza con una llamada. El resto queda escrito.
              </p>
              {contacto.whatsapp && (
                <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensajeAviso(contacto)} className="btn btn-tinta min-h-12 px-4.5 text-[0.8125rem]">
                  <IconoWhatsApp className="size-[18px] flex-none" />
                  <span>O envíanos una foto por WhatsApp</span>
                </BotonWhatsApp>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
