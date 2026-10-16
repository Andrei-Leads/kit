import type { Trabajo } from "@andrei-leads/core";

import { chip } from "@/lib/estilos";
import { pastillasTrabajo } from "@/lib/trabajos";
import { cn } from "@/lib/utils";

/**
 * Pastillas del trabajo (Pantalla, `tr.datos`): ubicación · duración · año · precio, solo las que existan.
 * Cada una lleva su etiqueta solo para lectores de pantalla. Sin ningún dato, no se pinta (sin lista vacía).
 */
export function TrabajoPastillas({ trabajo }: { trabajo: Trabajo }) {
  const pastillas = pastillasTrabajo(trabajo);
  if (pastillas.length === 0) return null;
  return (
    <ul aria-label="Datos del trabajo" className="m-0 flex list-none flex-wrap gap-2 p-0">
      {pastillas.map((p) => (
        <li key={p.etiqueta} className={cn(chip, "min-h-9 px-[13px] tabular-nums")}>
          <span className="sr-only">{p.etiqueta}: </span>
          {p.valor}
        </li>
      ))}
    </ul>
  );
}
