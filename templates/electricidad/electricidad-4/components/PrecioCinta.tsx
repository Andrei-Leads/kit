import { precioDesde } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

/** Precio en la cinta de rotuladora: «desde» (minúscula, mismo cuerpo, espacio real) solo si el dato empieza por «desde»; si no, tal cual. */
export function PrecioCinta({ precio, className }: { precio: string; className?: string }) {
  const p = precioDesde(precio);
  return (
    <span className={cn("cifras self-start border border-borde bg-etiqueta px-2 py-px text-[15px] font-semibold", className)}>
      {p.desde && <span className="font-medium">desde</span>}
      {p.desde && " "}
      {p.importe}
    </span>
  );
}
