import { Encabezado } from "@/components/Encabezado";
import { dosCifras } from "@/lib/textos";

/** `Zonas` (encargo §6.9): lista en dos columnas con número de orden («01 Alboraya…»). Nunca enlaces. */
export function Zonas({ zonas, n }: { zonas: readonly string[]; n?: string }) {
  if (zonas.length === 0) return null;
  return (
    <section id="zonas" aria-labelledby="titulo-zonas" className="gutter seccion">
      <Encabezado n={n} etiqueta="ZONAS" titulo="Dónde montamos" id="titulo-zonas" className="mb-6" />
      <ol className="grid max-w-[720px] grid-cols-2 gap-x-7">
        {zonas.map((z, i) => (
          <li key={z} className="flex gap-3.5 border-b border-borde py-2.5">
            <span className="etiqueta pt-0.5 text-texto-suave">{dosCifras(i + 1)}</span>
            {z}
          </li>
        ))}
      </ol>
    </section>
  );
}
