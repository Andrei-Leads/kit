import type { SiteConfig } from "@andrei-leads/core";
import { Zap } from "lucide-react";

import { horarioVisible } from "@/lib/formato";

/**
 * Horario de /contacto (Pantalla): tarjeta superficie con las líneas de `formatearHorario` (siempre vía
 * `horarioVisible`, nunca las franjas a mano) y, con `urgencias24h`, la fila «⚡ Urgencias: 24 h» al final.
 * Sin horario ni urgencias, no se pinta.
 */
export function ContactoHorario({ contacto }: { contacto: Pick<SiteConfig["contacto"], "horario" | "urgencias24h"> }) {
  const lineas = horarioVisible(contacto);
  if (lineas.length === 0) return null;
  // `horarioVisible` añade la fila de urgencias al final cuando `urgencias24h` es true.
  const urgencias = contacto.urgencias24h ? lineas[lineas.length - 1] : undefined;
  const filas = urgencias ? lineas.slice(0, -1) : lineas;

  return (
    <section aria-labelledby="titulo-horario" className="rounded-tarjeta bg-superficie px-5 pt-4 pb-2">
      <h2 id="titulo-horario" className="m-0 mb-1.5 text-xl font-bold">
        Horario
      </h2>
      {filas.length > 0 && (
        <dl className="m-0">
          {filas.map((h) => (
            <div
              key={h.dias}
              className="flex min-h-11 items-center justify-between gap-3 border-b border-linea text-base last:border-b-0"
            >
              <dt>{h.dias}</dt>
              <dd className="m-0 text-right font-semibold tabular-nums">{h.horas}</dd>
            </div>
          ))}
        </dl>
      )}
      {urgencias && (
        <p
          className={
            "m-0 flex min-h-11 items-center gap-2 text-base font-semibold" + (filas.length > 0 ? " border-t border-linea" : "")
          }
        >
          <Zap aria-hidden="true" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-[15px] flex-none" />
          {urgencias.dias}: {urgencias.horas}
        </p>
      )}
    </section>
  );
}
