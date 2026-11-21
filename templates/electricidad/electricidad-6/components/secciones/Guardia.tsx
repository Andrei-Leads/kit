import type { ReactNode } from "react";
import { formatearHorario, listaY, type SiteConfig } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";
import { anios, textosValoracion } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  contacto: SiteConfig["contacto"];
  zonas: SiteConfig["zonas"];
  anioFundacion?: number;
  valoracion?: SiteConfig["valoracion"];
  acreditaciones: SiteConfig["acreditaciones"];
  garantias: SiteConfig["garantias"];
};

type Cifra = { etiqueta: string; valor: ReactNode; nota?: string };

/**
 * Guardia, la sección estrella (encargo §6.2). Siempre existe (el horario es obligatorio).
 * - Con `urgencias24h` y/o `tiempoLlegada`: «De guardia», cinta arriba y hasta tres cifras gigantes:
 *   «24 h» (solo si es verdad), «30 min» (llegada) y la tercera «Desde {año}» o, sin año, la
 *   valoración; si tampoco, ninguna. Debajo, «Llegamos a» + zonas y el horario de oficina.
 * - Sin ninguno de los dos: «Cuándo llamarnos», con el horario en grande y las zonas.
 * Al pie, acreditaciones y garantías separadas por «·». Excepción del encargo: las zonas viven aquí.
 */
export async function Guardia({ contacto, zonas, anioFundacion, valoracion, acreditaciones, garantias }: Props) {
  const { urgencias24h, tiempoLlegada, horario, direccion } = contacto;
  const deGuardia = urgencias24h || Boolean(tiempoLlegada);
  const lineas = formatearHorario(horario);

  const cifras: Cifra[] = [];
  if (deGuardia) {
    if (urgencias24h) cifras.push({ etiqueta: "Urgencias", valor: "24 h", nota: "También de madrugada" });
    if (tiempoLlegada) cifras.push({ etiqueta: "Llegamos en", valor: tiempoLlegada });
    if (anioFundacion) {
      const n = (await anioActual()) - anioFundacion;
      cifras.push({ etiqueta: "Desde", valor: String(anioFundacion), nota: n > 0 ? `${anios(n)} en ${direccion.ciudad}` : undefined });
    } else if (valoracion) {
      const v = textosValoracion(valoracion);
      cifras.push({
        etiqueta: "Valoración",
        valor: (
          <>
            {v.media}
            <span aria-hidden="true"> ★</span>
            <span className="sr-only"> de 5</span>
          </>
        ),
        nota: v.total,
      });
    }
  }

  const pie = [
    ...acreditaciones.map((a) => (a.numero ? `${a.nombre} n.º ${a.numero}` : a.nombre)),
    ...garantias,
  ];

  return (
    <section aria-labelledby="titulo-guardia" className="bg-alterna">
      <div aria-hidden="true" className="cinta cinta-dibujada" />
      <div className="contenedor flex flex-col gap-8 py-9 lg:py-13">
        <h2 id="titulo-guardia" className="titulo-h2 m-0">
          {deGuardia ? "De guardia" : "Cuándo llamarnos"}
        </h2>

        {cifras.length > 0 && (
          <dl className={cn("m-0 grid gap-6", cifras.length > 1 && "lg:grid-cols-3", cifras.length === 2 && "lg:grid-cols-2")}>
            {cifras.map((c) => (
              <div key={c.etiqueta} className="cifra flex flex-col border-t-2 border-borde/60 pt-4">
                <dt className="rotulo">{c.etiqueta}</dt>
                <dd className="m-0 flex flex-col">
                  <span className="block overflow-hidden">
                    <span className="cifra-valor condensada block text-cifra leading-[1] whitespace-nowrap">{c.valor}</span>
                  </span>
                  {c.nota && <span className="mt-1 text-[0.9375rem] text-texto-suave">{c.nota}</span>}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className={cn("grid gap-8", zonas.length > 0 && "lg:grid-cols-2 lg:gap-14")}>
          {zonas.length > 0 && (
            <div className="flex flex-col gap-2">
              <h3 className="rotulo m-0 text-texto">Llegamos a</h3>
              <p className={cn("m-0", !deGuardia && "text-xl")}>{listaY(zonas)}</p>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <h3 className="rotulo m-0 text-texto">{deGuardia ? "Horario de oficina" : "Horario"}</h3>
            <dl className="m-0 divide-y divide-borde/40">
              {lineas.map((l) => (
                <div key={l.dias} className={cn("flex flex-wrap items-baseline justify-between gap-x-4 py-2", !deGuardia && "py-3")}>
                  <dt className="text-texto-suave">{l.dias}</dt>
                  <dd className={cn("m-0 font-bold tabular-nums", !deGuardia && "condensada text-[1.75rem] leading-none")}>{l.horas}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {pie.length > 0 && <p className="m-0 text-sm text-texto-suave">{pie.join(" · ")}</p>}
      </div>
    </section>
  );
}
