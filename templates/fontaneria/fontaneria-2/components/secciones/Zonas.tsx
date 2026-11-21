import { h2Seccion } from "@/lib/estilos";
import { cn } from "@/lib/utils";

/** Píldoras de 40 px con borde, en fila que se parte. Solo lista: nunca enlaces a páginas por municipio. */
export function ListaZonas({ zonas, className }: { zonas: readonly string[]; className?: string }) {
  return (
    <ul className={cn("m-0 flex list-none flex-wrap gap-2 p-0", className)}>
      {zonas.map((z) => (
        <li key={z} className="flex h-10 items-center rounded-full border border-borde px-4 text-base font-medium">
          {z}
        </li>
      ))}
    </ul>
  );
}

/** «Dónde trabajamos» (encargo §6.7). Sin zonas, no existe. */
export function Zonas({ zonas }: { zonas: readonly string[] }) {
  if (zonas.length === 0) return null;
  return (
    <section aria-labelledby="titulo-zonas" className="contenedor flex flex-col gap-6 py-[clamp(48px,6vw,96px)]">
      <h2 id="titulo-zonas" className={h2Seccion}>
        Dónde trabajamos
      </h2>
      <ListaZonas zonas={zonas} />
    </section>
  );
}
