import { h2 } from "@/lib/estilos";
import { cn } from "@/lib/utils";

type Props = {
  zonas: string[];
  /** Id de la sección (índice lateral). Por defecto `zonas`. */
  id?: string;
  className?: string;
};

/** Zonas (Specs §2): municipios en chips compactos (no son enlaces). Solo una lista, nunca páginas por municipio. */
export function Zonas({ zonas, id = "zonas", className }: Props) {
  if (zonas.length === 0) return null;
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className={cn("pt-11 lg:pt-16", className)}>
      <h2 id={`${id}-titulo`} className={cn(h2, "mb-3.5")}>
        Dónde trabajamos
      </h2>
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        {zonas.map((zona) => (
          <li key={zona} className="rounded-pastilla bg-superficie px-3.5 py-[7px] text-[15px] font-semibold">
            {zona}
          </li>
        ))}
      </ul>
    </section>
  );
}
