import { pasosProceso, type SiteConfig } from "@andrei-leads/core";

import { TituloSeccion } from "@/components/TituloSeccion";
import { numero } from "@/lib/textos";

/**
 * «Cómo trabajamos» (encargo §6.4): `proceso` o, sin datos, los 4 pasos por defecto de core para
 * proyecto (sin promesas). Fila en escritorio, lista en móvil; número en cursiva primario.
 */
export function ComoTrabajamos({ proceso }: Pick<SiteConfig, "proceso">) {
  const pasos = pasosProceso(proceso, "proyecto");
  return (
    <section aria-labelledby="titulo-proceso" className="marco seccion">
      <TituloSeccion id="titulo-proceso">Cómo trabajamos</TituloSeccion>
      <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))]">
        {pasos.map((p, i) => (
          <li key={p.titulo} data-aparecer className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 border-b border-filete py-6 pr-5">
            <span aria-hidden="true" className="row-span-2 font-titulo text-[clamp(2.25rem,1.8rem+1.5vw,3.25rem)] leading-none text-primario-texto italic">
              {numero(i)}
            </span>
            <strong className="text-[17px] font-semibold">{p.titulo}</strong>
            <span className="text-base text-texto-suave">{p.texto}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
