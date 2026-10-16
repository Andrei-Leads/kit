import { h2 } from "@/lib/estilos";
import { textos } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  zonas: string[];
};

/**
 * Zonas (Specs §2): «Dónde trabajamos», una lista en dos columnas con línea fina entre filas. Solo una lista,
 * nunca páginas por municipio. Sin padding propio: la página la coloca en la banda piedra que comparte con
 * las preguntas (lado a lado en escritorio; sin preguntas, ocupa la banda).
 */
export function Zonas({ zonas }: Props) {
  return (
    <section aria-labelledby="titulo-zonas" className="min-w-0">
      <h2 id="titulo-zonas" className={cn(h2, "mb-5")}>
        {textos.dondeTrabajamos}
      </h2>
      <ul className="m-0 grid list-none grid-cols-2 gap-x-6 p-0">
        {zonas.map((zona, i) => (
          <li key={`${i}-${zona}`} className="border-b border-linea py-2.5 text-lg">
            {zona}
          </li>
        ))}
      </ul>
    </section>
  );
}
