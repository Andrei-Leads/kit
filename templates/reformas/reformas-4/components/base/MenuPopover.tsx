import Link from "next/link";

import type { IdPagina, PaginaMenu, SeccionNumerada } from "@/lib/navegacion";

type Props = {
  paginas: readonly PaginaMenu[];
  /** Página actual: `aria-current` puesto en el servidor. */
  actual?: IdPagina;
  /** En una ficha `[slug]`, el padre lleva `aria-current="true"` (la miga lleva el `page`). */
  ficha?: boolean;
  /** Secciones de la página actual, como anclas. */
  secciones: readonly SeccionNumerada[];
  id?: string;
};

/**
 * Pieza base del registro (kit/registry/base/MenuPopover.tsx), reestilada como el «Índice» móvil
 * (encargo §8): hoja inferior con la lista numerada de páginas y, debajo, «En esta página». API
 * `popover` nativa: abre y cierra sin JavaScript; sube con `@starting-style` (globals.css).
 */
export function MenuPopover({ paginas, actual, ficha = false, secciones, id = "indice" }: Props) {
  return (
    <>
      <button
        type="button"
        popoverTarget={id}
        className="mono inline-flex min-h-11 flex-none items-center rounded-boton border border-borde px-3 text-xs text-texto"
      >
        Índice
      </button>
      <nav
        id={id}
        popover="auto"
        aria-label="Índice"
        className="indice-hoja m-0 max-h-[86dvh] w-full max-w-none overflow-y-auto border-t border-cota bg-superficie px-5 pt-[18px] pb-7 text-texto"
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="mono text-xs tracking-[0.08em] text-texto-suave uppercase">Índice</span>
          <button
            type="button"
            popoverTarget={id}
            popoverTargetAction="hide"
            className="mono min-h-11 rounded-boton border border-borde px-3.5 text-xs text-texto"
          >
            Cerrar
          </button>
        </div>
        <ol className="border-t border-borde">
          {paginas.map((p, i) => {
            const es = p.id === actual;
            return (
              <li key={p.href} className="border-b border-borde">
                <Link
                  href={p.href}
                  aria-current={es ? (ficha ? "true" : "page") : undefined}
                  className={`mono flex min-h-[52px] items-center gap-3.5 text-base no-underline ${es ? "text-texto" : "text-texto-suave"}`}
                >
                  <span className="text-xs text-primario-claro">{String(i + 1).padStart(2, "0")}</span>
                  {p.texto}
                  {es && (
                    <span aria-hidden="true" className="text-primario-claro">
                      ■
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ol>
        {secciones.length > 0 && (
          <>
            <p className="mono mt-6 mb-2 text-[11px] tracking-[0.08em] text-texto-suave uppercase">En esta página</p>
            <ol>
              {secciones.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="mono flex min-h-11 items-center gap-3 text-sm text-texto no-underline">
                    <span className="text-xs text-primario-claro">{s.n}</span>
                    {s.texto}
                  </a>
                </li>
              ))}
            </ol>
          </>
        )}
      </nav>
    </>
  );
}
