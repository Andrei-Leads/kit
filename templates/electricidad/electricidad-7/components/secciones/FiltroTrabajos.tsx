import type { ReactNode } from "react";
import type { Servicio } from "@andrei-leads/core";

const ID_TODOS = "todos";
const idFiltro = (slug: string) => `servicio-${slug}`;

/**
 * Filtro por servicio en pastillas, sin JavaScript y con la página estática: cada pastilla es un
 * ancla (`#servicio-<slug>`) y un `<style>` generado de los datos oculta, con `:target`, los
 * trabajos de otros servicios y marca la pastilla activa (relleno texto y «, seleccionado» para el
 * lector de pantalla). Sin ancla, se ven todos. Solo con 2 servicios o más.
 * (El `?servicio=` del encargo obligaría a renderizar la página en cada visita.)
 */
export function FiltroTrabajos({ servicios, children }: { servicios: readonly Pick<Servicio, "slug" | "titulo">[]; children: ReactNode }) {
  if (servicios.length < 2) return <>{children}</>;
  // Los slugs solo llevan [a-z0-9-] (lo valida core): seguros dentro del CSS.
  const activa = "background:var(--color-texto);color:var(--color-fondo);border-color:var(--color-texto)";
  const inactiva = "background:var(--color-superficie);color:var(--color-texto);border-color:var(--color-borde)";
  const css =
    `.filtro .filtro-activo{display:none}.filtro a[href="#${ID_TODOS}"] .filtro-activo{display:inline}` +
    servicios
      .map((s) => {
        const id = idFiltro(s.slug);
        const sel = `.filtro:has(#${id}:target)`;
        return (
          `${sel} .rejilla-trabajos>li:not([data-servicio="${s.slug}"]){display:none}` +
          `${sel} a[href="#${id}"]{${activa}}${sel} a[href="#${id}"] .filtro-activo{display:inline}` +
          `${sel} a[href="#${ID_TODOS}"]{${inactiva}}${sel} a[href="#${ID_TODOS}"] .filtro-activo{display:none}`
        );
      })
      .join("");
  const pastilla = "pulsable inline-flex min-h-11 items-center rounded-boton border-[1.5px] px-4 text-[15px] font-extrabold no-underline";
  return (
    <div className="filtro">
      <style>{css}</style>
      <span id={ID_TODOS} className="block scroll-mt-28" />
      {servicios.map((s) => (
        <span key={s.slug} id={idFiltro(s.slug)} className="block scroll-mt-28" />
      ))}
      <nav aria-label="Filtrar por servicio" className="mb-6">
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          <li>
            <a href={`#${ID_TODOS}`} className={`${pastilla} border-texto bg-texto text-fondo`}>
              Todos
              <span className="filtro-activo sr-only">, seleccionado</span>
            </a>
          </li>
          {servicios.map((s) => (
            <li key={s.slug}>
              <a href={`#${idFiltro(s.slug)}`} className={`${pastilla} border-borde bg-superficie text-texto hover:bg-burbuja-sale`}>
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
