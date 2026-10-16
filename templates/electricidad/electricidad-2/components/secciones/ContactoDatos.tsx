import type { LineaHorario, SiteConfig } from "@andrei-leads/core";

import { urlComoLlegar } from "@/lib/formato";
import { textos } from "@/lib/textos";

const h2 = "m-0 mb-1.5 font-serif text-2xl leading-[1.2] font-semibold";
/** Enlace externo en tinta, en negrita y con subrayado; ≥ 44 px de alto. */
const enlaceExterno =
  "inline-flex min-h-11 items-center gap-1 font-bold text-tinta underline decoration-primario decoration-2 underline-offset-4 hover:decoration-4";

type Props = {
  contacto: Pick<SiteConfig["contacto"], "direccion" | "coordenadas" | "fichaGoogle" | "urgencias24h">;
  /** Líneas de `horarioVisible` (incluyen «Urgencias: 24 h» al final solo con `urgencias24h`). */
  horario: LineaHorario[];
  zonas: string[];
};

/**
 * Tres bloques de /contacto (mockup 2g/2k), bajo un filete: HORARIO (`horarioVisible`; la fila de urgencias en
 * negrita), DIRECCIÓN con «Cómo llegar ↗» (un enlace a Google Maps: nunca un mapa ni un iframe) y «Ver ficha en
 * Google ↗» (solo con `fichaGoogle`) y DÓNDE TRABAJAMOS (zonas en dos columnas). Cada bloque sale solo con datos.
 */
export function ContactoDatos({ contacto, horario, zonas }: Props) {
  const { direccion } = contacto;
  return (
    <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-x-12 gap-y-10 border-t border-linea pt-8">
      {horario.length > 0 && (
        <section aria-labelledby="titulo-horario-contacto" className="min-w-0">
          <h2 id="titulo-horario-contacto" className={h2}>
            {textos.horario}
          </h2>
          <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
            {horario.map((h, i) => (
              <li key={`${i}-${h.dias}`} className={contacto.urgencias24h && i === horario.length - 1 ? "font-bold" : undefined}>
                {h.dias}: {h.horas}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="titulo-direccion-contacto" className="min-w-0">
        <h2 id="titulo-direccion-contacto" className={h2}>
          {textos.direccion}
        </h2>
        <p className="m-0">{direccion.calle}</p>
        <p className="m-0">
          {direccion.cp} {direccion.ciudad}
        </p>
        <div className="mt-1 flex flex-col items-start">
          <a href={urlComoLlegar(contacto)} target="_blank" rel="noopener noreferrer" className={enlaceExterno}>
            {textos.comoLlegar} <span aria-hidden="true">↗</span>
            <span className="sr-only">(se abre en otra pestaña)</span>
          </a>
          {contacto.fichaGoogle && (
            <a href={contacto.fichaGoogle} target="_blank" rel="noopener noreferrer" className={enlaceExterno}>
              {textos.verFichaGoogle} <span aria-hidden="true">↗</span>
              <span className="sr-only">(se abre en otra pestaña)</span>
            </a>
          )}
        </div>
      </section>

      {zonas.length > 0 && (
        <section aria-labelledby="titulo-zonas-contacto" className="min-w-0">
          <h2 id="titulo-zonas-contacto" className={h2}>
            {textos.dondeTrabajamos}
          </h2>
          <ul className="m-0 grid list-none grid-cols-2 gap-x-5 p-0">
            {zonas.map((zona, i) => (
              <li key={`${i}-${zona}`} className="border-b border-linea py-2">
                {zona}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
