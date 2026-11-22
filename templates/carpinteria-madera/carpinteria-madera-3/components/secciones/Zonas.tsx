import { TituloSeccion } from "@/components/TituloSeccion";

/** «Dónde montamos» (encargo §6.8): lista mono en dos columnas. Solo lista, nunca enlaces. */
export function Zonas({ n, zonas }: { n: string; zonas: readonly string[] }) {
  return (
    <section id="zonas" aria-labelledby="h2-zonas" className="pt-(--sec)">
      <TituloSeccion n={n} id="h2-zonas" className="mb-6">
        Dónde montamos
      </TituloSeccion>
      <ListaZonas zonas={zonas} />
    </section>
  );
}

export function ListaZonas({ zonas }: { zonas: readonly string[] }) {
  return (
    <ul className="max-w-[640px] columns-2 gap-x-6 font-titulo text-sm tracking-[0.02em]">
      {zonas.map((z) => (
        <li key={z} className="break-inside-avoid border-b border-borde py-2.5">
          {z}
        </li>
      ))}
    </ul>
  );
}
