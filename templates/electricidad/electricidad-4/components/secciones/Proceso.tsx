import { pasosProceso, type SiteConfig } from "@andrei-leads/core";

import { posicion } from "@/lib/formato";

/**
 * Cómo trabajamos (encargo §6.3): módulos unidos por un peine de conexión (barra con dientes). En
 * móvil, el peine es vertical a la izquierda; desde 768 px, horizontal arriba. El peine se dibuja
 * al entrar en pantalla (CSS view()); con «reducir movimiento», ya dibujado.
 */
export function Proceso({ proceso }: { proceso: SiteConfig["proceso"] }) {
  const pasos = pasosProceso(proceso, "urgencias");
  const columnas = Math.min(pasos.length, 3);
  return (
    <section aria-labelledby="h2-proceso" className="contenedor pt-[clamp(40px,6vw,72px)]">
      <h2 id="h2-proceso" className="h2 mb-[22px]">
        Cómo trabajamos
      </h2>
      <div className="relative pl-[30px] md:pt-[30px] md:pl-0">
        <span aria-hidden="true" className="peine absolute inset-y-0 left-0 w-2 bg-texto md:inset-x-0 md:top-0 md:bottom-auto md:h-2 md:w-auto" />
        <ol
          className="flex flex-col gap-3 md:grid md:gap-4"
          style={{ gridTemplateColumns: `repeat(${columnas}, minmax(0, 1fr))` }}
        >
          {pasos.map((p, i) => (
            <li key={p.titulo} className="relative flex flex-col gap-1.5 border border-borde bg-superficie px-4 py-3.5 md:gap-2 md:px-[18px] md:pt-4 md:pb-[18px]">
              <span aria-hidden="true" className="absolute top-[22px] -left-[23px] h-2 w-[22px] bg-texto md:-top-[23px] md:left-7 md:h-[22px] md:w-2" />
              <span className="flex items-center gap-2.5 md:flex-col md:items-start md:gap-2">
                <span className="cifras border border-borde bg-etiqueta px-1.5 text-[13px] leading-[22px] font-semibold">{posicion(i + 1)}</span>
                <h3 className="text-xl leading-[1.15] font-semibold md:text-[22px]">{p.titulo}</h3>
              </span>
              <p className="text-base text-texto-suave">{p.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
