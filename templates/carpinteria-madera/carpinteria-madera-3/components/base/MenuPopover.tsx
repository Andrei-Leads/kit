import Link from "next/link";

import type { IdPagina, PaginaMenu, SeccionNumerada } from "@/lib/navegacion";

type Props = {
  paginas: readonly PaginaMenu[];
  /** Página actual: `aria-current` puesto en el servidor. */
  actual?: IdPagina;
  /** En una ficha `[slug]`, el padre lleva `aria-current="true"` (la miga lleva el `page`). */
  ficha?: boolean;
  /** Secciones de la página actual («En esta página»), como anclas. */
  secciones: readonly SeccionNumerada[];
  id?: string;
};

/**
 * Pieza base del registro (kit/registry/base/MenuPopover.tsx), reestilada como el menú móvil del
 * diseño: panel que cae bajo la cabecera con las páginas en mono grande y, debajo, «En esta página»
 * (el índice lateral, que en móvil no existe). API `popover` nativa: abre y cierra sin JavaScript,
 * con Esc o tocando fuera. El botón dice «Cerrar» con el menú abierto (CSS, globals.css).
 */
export function MenuPopover({ paginas, actual, ficha = false, secciones, id = "menu" }: Props) {
  return (
    <>
      <button
        type="button"
        popoverTarget={id}
        className="inline-flex min-h-12 min-w-12 flex-none items-center justify-center rounded-boton border border-texto bg-transparent px-3 font-titulo text-xs font-semibold tracking-[0.05em] text-texto uppercase"
      >
        <span className="menu-abrir">Menú</span>
        <span className="menu-cerrar">Cerrar</span>
      </button>
      <nav
        id={id}
        popover="auto"
        aria-label="Menú"
        className="menu-banco m-0 max-h-[calc(100dvh-140px)] w-full max-w-none overflow-y-auto border-b border-tinta bg-superficie px-(--gutter) pt-4 pb-6 text-texto lg:hidden"
      >
        <ul className="flex flex-col">
          {paginas.map((p) => {
            const es = p.id === actual;
            return (
              <li key={p.href}>
                <Link
                  href={p.href}
                  aria-current={es ? (ficha ? "true" : "page") : undefined}
                  className={`flex min-h-13 items-center border-b border-borde font-titulo text-xl ${es ? "underline" : "no-underline"}`}
                >
                  {p.texto}
                </Link>
              </li>
            );
          })}
        </ul>
        {secciones.length > 0 && (
          <div className="mt-5">
            <p className="etiqueta mb-1.5 text-texto-suave">En esta página</p>
            <ol className="grid grid-cols-2 gap-x-4">
              {secciones.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="flex min-h-11 items-center gap-2 font-titulo text-[13px] no-underline">
                    <span className="text-lapiz">{s.n}</span>
                    <span>{s.texto}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        )}
      </nav>
    </>
  );
}
