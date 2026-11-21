import { cn } from "@/lib/utils";

/** «★★★★☆» con nombre accesible «4 de 5 estrellas». Las vacías, en el color del borde. */
export function Estrellas({ puntuacion, etiqueta, className, claseVacias = "text-borde" }: {
  puntuacion: number;
  /** Texto accesible; por defecto «{n} de 5 estrellas». */
  etiqueta?: string;
  className?: string;
  claseVacias?: string;
}) {
  const llenas = Math.max(0, Math.min(5, Math.round(puntuacion)));
  return (
    <span role="img" aria-label={etiqueta ?? `${llenas} de 5 estrellas`} className={cn("tracking-[0.08em]", className)}>
      <span>{"★".repeat(llenas)}</span>
      {llenas < 5 && <span className={claseVacias}>{"★".repeat(5 - llenas)}</span>}
    </span>
  );
}
