import { cn } from "@/lib/utils";
import { mediaVisible } from "@/lib/formato";

type Props = {
  /** Valor de 0 a 5 (puede tener decimales: 4,9). */
  valor: number;
  /** Lado de cada estrella en px. Por defecto 16 (reseñas); 24 en el resumen. */
  tamano?: number;
  /** Anima el relleno del resumen (translateX, 700 ms): pone data-anim="estrellas" en la capa de relleno. */
  animada?: boolean;
  className?: string;
};

const PUNTOS = "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2";

function Fila({ tamano, hueco, llenas }: { tamano: number; hueco: number; llenas: boolean }) {
  return (
    <span className="flex w-max" style={{ gap: hueco }}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width={tamano} height={tamano} viewBox="0 0 24 24" aria-hidden="true" className="flex-none">
          <polygon
            points={PUNTOS}
            strokeLinejoin="round"
            strokeWidth={1.5}
            // Llenas: primario. Vacías: relleno claro y contorno de tinta suave (≥ 3:1 sobre piedra y blanco).
            fill={llenas ? "var(--color-primario)" : "var(--color-linea-suave)"}
            stroke={llenas ? "var(--color-primario)" : "var(--color-tinta-suave)"}
          />
        </svg>
      ))}
    </span>
  );
}

/**
 * Estrellas con `role="img"` y aria-label («4,9 de 5 estrellas»): un `span` con aria-label sin rol lo
 * ignoran muchos lectores. Cinco vacías debajo y una capa de llenas recortada al ancho de la media
 * (la animación mueve esa capa con transform; el recorte lo hace el contenedor, así que solo se
 * animan transform y opacity).
 */
export function Estrellas({ valor, tamano = 16, animada, className }: Props) {
  const v = Math.max(0, Math.min(5, valor));
  const hueco = tamano >= 24 ? 3 : 2;
  const enteras = Math.floor(v);
  const fraccion = v - enteras;
  // Ancho exacto del relleno: n estrellas con sus huecos + la fracción de la siguiente.
  const ancho = enteras * (tamano + hueco) + (fraccion > 0 ? fraccion * tamano : -hueco);
  return (
    <span
      role="img"
      aria-label={`${mediaVisible(v).replace(",0", "")} de 5 estrellas`}
      className={cn("relative inline-flex w-max", className)}
    >
      <Fila tamano={tamano} hueco={hueco} llenas={false} />
      <span aria-hidden="true" className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: Math.max(0, ancho) }}>
        <span data-anim={animada ? "estrellas" : undefined} className="flex w-max">
          <Fila tamano={tamano} hueco={hueco} llenas />
        </span>
      </span>
    </span>
  );
}
