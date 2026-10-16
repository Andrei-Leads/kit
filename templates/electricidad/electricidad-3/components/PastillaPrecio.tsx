import { precioNoPartido } from "@/lib/formato";
import { cn } from "@/lib/utils";

type Props = {
  /** Texto del precio tal cual viene de los datos («35 €», «38 €/h», «desde 150 € + IVA»). */
  precio: string;
  /** Pastilla grande (cabecera de un servicio, precio de un trabajo). */
  grande?: boolean;
  /**
   * Fila del tablero «Lo que cuesta» a la que pertenece: activa su «encendido» (data-pastilla + --i,
   * Specs §8: scale .94→1 + opacity, 200 ms, 160 ms tras su fila). Solo dentro de un `data-anim="tablero"`.
   */
  indice?: number;
  className?: string;
};

/**
 * Pastilla de precio (Specs §5 y §7): superficie-2, 999 px, 700 con cifras tabulares. Nunca parte la cifra
 * del símbolo: `shrink-0` (no se encoge dentro de una fila flex), espacio duro entre cifra y símbolo
 * (`precioNoPartido`) y `whitespace-nowrap` en lo corto. Solo un precio largo («desde 150 € + IVA») llega
 * al máximo del 46 % de la fila y pasa a 2 líneas con `text-balance`; nunca se corta con «…».
 * Decisión 3: el texto se pinta tal cual (sin etiqueta «desde» añadida).
 * Es un <span>: la pastilla no es un enlace.
 */
export function PastillaPrecio({ precio, grande, indice, className }: Props) {
  return (
    <span
      data-pastilla={indice === undefined ? undefined : ""}
      style={indice === undefined ? undefined : ({ "--i": indice } as React.CSSProperties)}
      className={cn(
        "inline-flex max-w-[46%] shrink-0 items-center justify-center rounded-pastilla bg-superficie-2 text-center leading-[1.25] font-bold tracking-normal text-balance text-texto tabular-nums",
        grande ? "max-w-full px-[18px] py-2 text-[22px]" : "px-3.5 py-1.5 text-base",
        className
      )}
    >
      {precioNoPartido(precio)}
    </span>
  );
}
