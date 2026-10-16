import type { Trabajo } from "@andrei-leads/core";

import { camposFicha } from "@/lib/trabajos";

/**
 * Descripción (20 px), `contenido` (un `<p>` por párrafo, 18 px) y, si existen, superficie y precio (no caben
 * en la línea de datos bajo el h1): una lista de definiciones con filete superior. Cada bloque sale solo con dato.
 */
export function TrabajoTexto({ trabajo }: { trabajo: Pick<Trabajo, "descripcion" | "contenido" | "superficie" | "precio"> }) {
  const campos = camposFicha(trabajo);
  return (
    <div className="flex max-w-[66ch] flex-col gap-4">
      <p className="m-0 text-xl leading-normal text-pretty">{trabajo.descripcion}</p>
      {trabajo.contenido.map((p, i) => (
        <p key={i} className="m-0 text-lg leading-[1.6] text-tinta-suave text-pretty">
          {p}
        </p>
      ))}
      {campos.length > 0 && (
        <dl className="m-0 mt-2 flex flex-wrap gap-x-12 gap-y-4 border-t border-linea pt-5">
          {campos.map((c) => (
            <div key={c.etiqueta} className="flex flex-col gap-0.5">
              <dt className="text-base text-tinta-suave">{c.etiqueta}</dt>
              <dd className="m-0 font-serif text-2xl leading-[1.2] font-semibold">{c.valor}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
