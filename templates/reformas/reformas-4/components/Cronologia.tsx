import { dosCifras } from "@/lib/formato";

type Props = {
  /** Títulos de los pasos (de `proceso` o los pasos por defecto). */
  pasos: readonly { titulo: string }[];
  /** Nombre accesible de la lista. */
  etiqueta: string;
};

/**
 * Cronología del hero (encargo §5): la cota «{n} pasos» encima y las marcas unidas por una línea de
 * 1 px, en rejilla de 3×2 a 375 px y en una sola línea en escritorio. No se anima: está junto al h1 y
 * los botones.
 */
export function Cronologia({ pasos, etiqueta }: Props) {
  return (
    <div className="w-full">
      <div aria-hidden="true" className="mono mb-4 flex items-center gap-2.5 text-xs text-texto-suave">
        <span className="h-[11px] w-px bg-cota-marca" />
        <span className="h-px flex-1 bg-borde" />
        <span>{pasos.length} pasos</span>
        <span className="h-px flex-1 bg-borde" />
        <span className="h-[11px] w-px bg-cota-marca" />
      </div>
      <ol aria-label={etiqueta} className="grid grid-cols-[repeat(auto-fit,minmax(96px,1fr))] gap-y-6">
        {pasos.map((p, i) => (
          <li key={p.titulo} className="relative min-w-0 border-t border-cota pt-4 pr-3">
            <span aria-hidden="true" className="rombo absolute -top-[5px] left-0" />
            <span aria-hidden="true" className="absolute -top-1.5 right-0 h-[11px] w-px bg-cota" />
            <span className="mono block text-xs font-semibold text-primario-claro">{dosCifras(i + 1)}</span>
            <span className="mono mt-1 block text-xs leading-[1.45] [overflow-wrap:anywhere] text-texto">{p.titulo}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
