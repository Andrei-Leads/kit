import type { ReactNode } from "react";
import type { Servicio } from "@andrei-leads/core";

const ID_TODOS = "todos";
const idFiltro = (slug: string) => `servicio-${slug}`;

/**
 * Filtro por servicio en enlaces de texto (encargo §7), sin JavaScript y con la
 * página estática: cada enlace es un ancla (`#servicio-<slug>`) y un `<style>`
 * generado de los datos oculta, con `:target`, los trabajos de otros servicios.
 * (El `?servicio=` del encargo obligaría a renderizar la página en cada visita.)
 * Solo con 2 servicios o más.
 */
export function FiltroTrabajos({ servicios, children }: { servicios: readonly Pick<Servicio, "slug" | "titulo">[]; children: ReactNode }) {
  if (servicios.length < 2) return <>{children}</>;
  // Los slugs solo llevan [a-z0-9-] (lo valida core): seguros dentro del CSS.
  const activo = "color:var(--color-acento);text-decoration-line:underline";
  const css =
    `.filtro .filtro-activo{display:none}.filtro:not(:has(:target)) a[href="#${ID_TODOS}"],.filtro:has(#${ID_TODOS}:target) a[href="#${ID_TODOS}"]{${activo}}` +
    `.filtro:not(:has(:target)) a[href="#${ID_TODOS}"] .filtro-activo,.filtro:has(#${ID_TODOS}:target) a[href="#${ID_TODOS}"] .filtro-activo{display:inline}` +
    servicios
      .map((s) => {
        const id = idFiltro(s.slug);
        return (
          `.filtro:has(#${id}:target) .rejilla-trabajos>li:not([data-servicio="${s.slug}"]){display:none}` +
          `.filtro:has(#${id}:target) a[href="#${id}"]{${activo}}` +
          `.filtro:has(#${id}:target) a[href="#${id}"] .filtro-activo{display:inline}`
        );
      })
      .join("");
  const enlace = "inline-flex min-h-11 items-center text-[15px] text-texto-suave no-underline decoration-1 underline-offset-[6px] hover:text-texto";
  return (
    <div className="filtro">
      <style>{css}</style>
      <span id={ID_TODOS} className="block scroll-mt-28" />
      {servicios.map((s) => (
        <span key={s.slug} id={idFiltro(s.slug)} className="block scroll-mt-28" />
      ))}
      <nav aria-label="Filtrar por servicio" className="mb-12 border-t border-[var(--color-linea)] pt-4">
        <ul className="m-0 flex list-none flex-wrap gap-x-6 p-0">
          <li>
            <a href={`#${ID_TODOS}`} className={enlace}>
              Todos
              <span className="filtro-activo sr-only">, seleccionado</span>
            </a>
          </li>
          {servicios.map((s) => (
            <li key={s.slug}>
              <a href={`#${idFiltro(s.slug)}`} className={enlace}>
                {s.titulo}
                <span className="filtro-activo sr-only">, seleccionado</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {children}
    </div>
  );
}
