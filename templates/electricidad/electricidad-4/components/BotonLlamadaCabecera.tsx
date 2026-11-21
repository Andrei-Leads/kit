import { BotonLlamada } from "@andrei-leads/core";

import { IconoTelefono } from "@/components/Iconos";
import { cn } from "@/lib/utils";

/**
 * `pulsador-compacto` de la cabecera: icono + «Llamar» en móvil; desde 768 px, «Llamar · teléfono».
 * La versión que no se ve va con `display: none`, así que el nombre accesible es siempre el texto visible.
 */
export function BotonLlamadaCabecera({ telefono, visible, className }: { telefono: string; visible: string; className?: string }) {
  return (
    <BotonLlamada telefono={telefono} className={cn("pulsador-compacto flex-none", className)}>
      <IconoTelefono className="size-[18px]" />
      <span className="md:hidden">Llamar</span>
      <span className="hidden md:inline">Llamar · {visible}</span>
    </BotonLlamada>
  );
}
