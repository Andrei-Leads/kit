import type { Trabajo } from "@andrei-leads/core";

import { etiquetaCampo } from "@/lib/estilos";
import { anchosRejilla, camposFicha } from "@/lib/trabajos";
import { cn } from "@/lib/utils";

/**
 * Ficha del trabajo (Specs §2): campos de documento ubicación · superficie · duración · año · precio,
 * solo los que existan (2 columnas en móvil, 4 en escritorio). Sin ningún dato, no se pinta.
 */
export function TrabajoFicha({ trabajo }: { trabajo: Trabajo }) {
  const campos = camposFicha(trabajo);
  if (campos.length === 0) return null;
  const anchos = anchosRejilla(campos.length);
  return (
    <dl className="m-0 grid grid-cols-2 gap-px border border-regla bg-regla md:grid-cols-4">
      {campos.map((c, i) => (
        <div key={c.etiqueta} className={cn("flex min-w-0 flex-col gap-0.5 bg-papel-2 px-3.5 py-3", anchos[i])}>
          <dt className={etiquetaCampo}>{c.etiqueta}</dt>
          <dd className="m-0 font-mono text-[17px] leading-[1.3] font-bold [overflow-wrap:anywhere]">{c.valor}</dd>
        </div>
      ))}
    </dl>
  );
}
