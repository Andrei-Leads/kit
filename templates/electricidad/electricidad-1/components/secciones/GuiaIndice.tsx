import { cn } from "@/lib/utils";

export type EntradaIndice = { id: string; etiqueta: string; numero: string };

/**
 * «En esta guía» (Specs §6): índice de anclas con las mismas partes numeradas que la página, ni una
 * más. Caja de 1 px tinta; una columna en móvil y dos en escritorio, con reglas de 1 px entre
 * celdas. Cada enlace mide ≥ 48 px.
 */
export function GuiaIndice({ entradas, className }: { entradas: EntradaIndice[]; className?: string }) {
  return (
    <nav aria-labelledby="indice-guia" className={cn("contenedor", className)}>
      <div className="max-w-[720px] border border-tinta">
        <p
          id="indice-guia"
          className="m-0 border-b border-tinta px-4 py-2.5 font-mono text-xs font-bold tracking-[0.14em] uppercase"
        >
          En esta guía
        </p>
        <ol className="m-0 grid list-none grid-cols-1 p-0 md:grid-cols-2">
          {entradas.map((e, i) => (
            <li
              key={e.id}
              className={cn(
                "border-regla",
                i > 0 && "border-t",
                i < 2 && "md:border-t-0",
                i % 2 === 1 && "md:border-l"
              )}
            >
              <a
                href={`#${e.id}`}
                className="flex min-h-12 items-center gap-3 px-4 py-3 font-medium text-tinta no-underline hover:bg-papel-2"
              >
                <span className="font-mono text-[13px] font-bold text-primario">{e.numero}</span>
                <span>{e.etiqueta}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
