import { pasosProceso, type SiteConfig } from "@andrei-leads/core";

import { numeroPieza } from "@/lib/piezas";

/**
 * «Cómo trabajamos» (encargo §6.4): `proceso` o, sin datos, los 4 pasos de proyecto de core (sin
 * promesas: los 6 del prototipo traían «Contrato con fecha» y «Garantía»). Fila de casillas con
 * línea negra entre ellas; en móvil, casillas de 2 en 2.
 */
export function ComoTrabajamos({ proceso }: { proceso: SiteConfig["proceso"] }) {
  const pasos = pasosProceso(proceso, "proyecto");
  return (
    <section aria-labelledby="titulo-proceso" className="contenedor flex flex-col gap-[18px] pt-(--seccion)">
      <h2 id="titulo-proceso" className="titulo-h2 m-0">
        Cómo trabajamos
      </h2>
      <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(150px,1fr))] border-t-2 border-l-2 border-borde p-0">
        {pasos.map((p, i) => (
          <li key={p.titulo} className="flex min-h-28 flex-col gap-1.5 border-r-2 border-b-2 border-borde p-3">
            <span aria-hidden="true" className="ft numero text-xl leading-none [text-decoration-line:none]">
              {numeroPieza(i)}
            </span>
            <h3 className="ft m-0 text-[1.375rem] leading-[0.95]">{p.titulo}</h3>
            <p className="m-0 text-sm leading-[1.35] text-texto-suave">{p.texto}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
