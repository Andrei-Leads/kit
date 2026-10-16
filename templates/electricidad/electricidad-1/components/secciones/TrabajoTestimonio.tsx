import type { Trabajo } from "@andrei-leads/core";

import { etiquetaCampo } from "@/lib/estilos";

/** Testimonio del trabajo (Specs §2): regla de 2 px arriba, etiqueta TESTIMONIO en mono y la cita. */
export function TrabajoTestimonio({ testimonio }: { testimonio: NonNullable<Trabajo["testimonio"]> }) {
  return (
    <figure className="m-0 max-w-[720px] border-t-2 border-b border-tinta border-b-regla py-5">
      <div className={etiquetaCampo}>Testimonio</div>
      <blockquote className="m-0 mt-2.5 text-[20px] leading-[1.4] font-medium text-pretty md:text-2xl">
        «{testimonio.texto}»
      </blockquote>
      <figcaption className="mt-3 font-mono text-[13px] font-bold">{testimonio.autor}</figcaption>
    </figure>
  );
}
