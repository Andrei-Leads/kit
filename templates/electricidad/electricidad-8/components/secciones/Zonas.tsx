import { H2, Rotulo } from "@/components/Rotulo";
import { dosCifras } from "@/lib/formato";
import { cn } from "@/lib/utils";

/** `Zonas` (encargo §6.8): índice de plano en 2–4 columnas con filetes. Solo lista, nunca enlaces. */
export function Zonas({ zonas, n }: { zonas: readonly string[]; n: string }) {
  if (zonas.length === 0) return null;
  return (
    <section aria-labelledby="h2-zonas" className="contenedor py-14 lg:py-20">
      <Rotulo n={n} texto="Zonas" />
      <div className="mt-4 grid gap-8 lg:grid-cols-12">
        <h2 id="h2-zonas" className={cn(H2, "lg:col-span-4")}>
          Dónde trabajamos
        </h2>
        <ul className="grid grid-cols-2 gap-x-6 border-t border-texto sm:grid-cols-3 lg:col-span-8 lg:grid-cols-4 lg:gap-x-9">
          {zonas.map((z, i) => (
            <li key={z} className="flex gap-3 border-b border-linea-plano py-3">
              <span aria-hidden="true" className="cifras-antiguas pt-0.5 font-titulo text-[0.9375rem] text-texto-suave">
                {dosCifras(i + 1)}
              </span>
              <span>{z}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
