import { Regla } from "@/components/Regla";
import { h2, seccionPlana } from "@/lib/estilos";
import type { Paso } from "@/lib/proceso";
import { cn } from "@/lib/utils";

type Props = {
  /** «01», «02»… ya recalculado según las secciones visibles de la página. */
  numero: string;
  /** Los mismos pasos que el inicio (`pasosProceso`). */
  pasos: Paso[];
  /** Ancla de la sección (la guía enlaza a `#tramite` desde su índice). */
  id?: string;
  className?: string;
};

/** Columnas en escritorio: una por paso, hasta 5. */
const COLUMNAS: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
};

/**
 * Trámite resumido (/servicios y guías): lista numerada compacta, sin la regla animada del inicio.
 * Móvil: una columna con el número a la izquierda. Escritorio: una columna por paso (máx. 5; con 6,
 * dos filas de 3). Una sola `<ol>`; los títulos de paso son texto, no encabezados (el h2 es
 * «Cómo es el trámite»).
 */
export function TramiteResumido({ numero, pasos, id = "tramite", className }: Props) {
  const columnas = pasos.length > 5 ? "md:grid-cols-3" : (COLUMNAS[pasos.length] ?? COLUMNAS[5]);

  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className={cn(seccionPlana, className)}>
      <Regla numero={numero} etiqueta="El trámite" />
      <h2 id={`${id}-titulo`} className={cn(h2, "mt-5")}>
        Cómo es el trámite
      </h2>
      <ol className={cn("m-0 mt-6 grid list-none grid-cols-1 gap-x-6 p-0", columnas)}>
        {pasos.map((paso, i) => (
          <li
            key={`${i}-${paso.titulo}`}
            className="flex gap-3 border-t border-regla py-3.5 md:flex-col md:gap-1.5"
          >
            <span
              aria-hidden="true"
              className="w-9 flex-none font-mono text-xl leading-[1.3] font-bold text-primario"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-base leading-[1.35] font-bold">
                <span className="sr-only">{i + 1}. </span>
                {paso.titulo}
              </span>
              <span className="text-[15px] text-tinta-suave text-pretty">{paso.texto}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
