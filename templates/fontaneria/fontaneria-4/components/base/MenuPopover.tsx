import Link from "next/link";

import type { Campo, IdPagina, PaginaMenu } from "@/lib/navegacion";
import { cn } from "@/lib/utils";

type Props = {
  paginas: readonly PaginaMenu[];
  /** Página actual: `aria-current="page"` puesto en el servidor. */
  actual?: IdPagina;
  /** En una ficha `[slug]`, el padre lleva `aria-current="true"`. */
  ficha?: boolean;
  /** Secciones de la página actual, como anclas. */
  campos: readonly (Campo & { n: string })[];
  /** `id` del panel; el botón que lo abre lleva `popoverTarget={id}`. */
  id?: string;
  className?: string;
  claseBoton?: string;
};

/**
 * Pieza base del registro (kit/registry/base/MenuPopover.tsx), reestilada como «hoja de índice»
 * (encargo §5 y §8): API `popover` nativa (sin JavaScript, Esc y toque fuera cierran), entra desde la
 * izquierda con `@starting-style` (globals.css, `.indice-hoja`) y lista las páginas y los campos de la
 * página actual. En móvil sustituye al índice lateral.
 */
export function MenuPopover({ paginas, actual, ficha = false, campos, id = "indice", className, claseBoton }: Props) {
  return (
    <>
      <button
        type="button"
        popoverTarget={id}
        className={cn(
          "inline-flex min-h-12 flex-none items-center rounded-boton border border-texto px-3 font-titulo text-xs tracking-[0.04em] text-texto uppercase",
          claseBoton,
        )}
      >
        Índice
      </button>
      <nav
        id={id}
        popover="auto"
        aria-label="Índice"
        className={cn(
          "indice-hoja m-0 h-dvh max-h-none w-[min(320px,calc(100vw-40px))] overflow-y-auto border-r border-texto bg-fondo p-4 text-texto",
          className,
        )}
      >
        <div className="flex items-center justify-between gap-3 border-b border-texto pb-3">
          <span className="font-titulo text-xs font-bold tracking-[0.06em] text-primario uppercase">Índice del parte</span>
          <button
            type="button"
            popoverTarget={id}
            popoverTargetAction="hide"
            className="min-h-11 min-w-11 rounded-boton border border-texto px-2 font-titulo text-xs uppercase"
          >
            Cerrar
          </button>
        </div>
        <ul className="mt-3">
          {paginas.map((p, i) => {
            const es = p.id === actual;
            return (
              <li key={p.href} className="border-b border-borde">
                <Link
                  href={p.href}
                  aria-current={es ? (ficha ? "true" : "page") : undefined}
                  className={cn("flex min-h-12 items-center gap-3 font-titulo text-[0.9375rem]", es && "font-bold text-primario")}
                >
                  <span className="text-[0.6875rem] text-texto-suave">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1">{p.texto}</span>
                  {es && <span aria-hidden="true">●</span>}
                </Link>
              </li>
            );
          })}
        </ul>
        {campos.length > 0 && (
          <>
            <p className="rotulo mt-5 mb-1">En esta página</p>
            <ul className="border-t border-texto">
              {campos.map((c) => (
                <li key={c.id} className="border-b border-dashed border-borde">
                  <a href={`#${c.id}`} data-campo={c.id} className="flex min-h-11 items-center gap-2.5 font-titulo text-[0.8125rem]">
                    <span className="text-texto-suave">{c.n}</span>
                    <span>{c.texto}</span>
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </nav>
    </>
  );
}
