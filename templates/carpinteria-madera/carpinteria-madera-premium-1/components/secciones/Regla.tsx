import type { CSSProperties } from "react";

type Item = { id: string; texto: string; timeline: string };

/**
 * Índice lateral (≥ 1200 px, encargo §5.3): una regla fina, como el canto de un
 * metro de carpintero. La pista cubre el contenido desde después del hero con un
 * hijo `sticky`; la marca activa crece y su nombre pasa a primario con la
 * `view-timeline` de cada sección (`timeline-scope` en el contenedor) y la línea
 * se rellena con el progreso de la página. Solo CSS (globals.css, `.regla*`).
 * Sin soporte: enlaces sin marca activa. En móvil y tablet no existe.
 */
export function Regla({ items }: { items: readonly Item[] }) {
  if (items.length < 2) return null;
  return (
    <div className="regla-pista">
      <nav aria-label="Índice de la página" className="regla">
        <span aria-hidden="true" className="regla-linea" />
        <span aria-hidden="true" className="regla-relleno" />
        {items.map((it, i) => (
          <a key={it.id} href={`#${it.id}`} data-marca style={{ top: `${(i / (items.length - 1)) * 100}%`, "--tl": it.timeline } as CSSProperties}>
            <span aria-hidden="true" className="regla-marca" />
            <span className="etiqueta regla-nombre">
              {it.texto}
              <span aria-hidden="true" className="regla-nombre-activo">
                {it.texto}
              </span>
            </span>
          </a>
        ))}
      </nav>
    </div>
  );
}

/** `timeline-scope` para el contenedor que agrupa la regla y sus secciones. */
export function alcanceRegla(items: readonly Item[]): CSSProperties {
  return { timelineScope: items.map((i) => i.timeline).join(", ") } as CSSProperties;
}

/** Marca de la regla: su enlace y la `view-timeline` con nombre de su sección. */
export function itemRegla(id: string, texto: string): Item {
  return { id, texto, timeline: `--sec-${id}` };
}

/** Props de una sección con marca en la regla: `id` del ancla y su `view-timeline`. */
export function seccionRegla(id: string): { id: string; style: CSSProperties } {
  return { id, style: { viewTimelineName: `--sec-${id}` } as CSSProperties };
}
