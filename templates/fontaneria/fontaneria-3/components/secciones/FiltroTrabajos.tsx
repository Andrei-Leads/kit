import type { ReactNode } from "react";
import type { Servicio } from "@andrei-leads/core";

import { piedra } from "@/lib/textos";
import { cn } from "@/lib/utils";

const ID_TODOS = "trabajos";
const idFiltro = (slug: string) => `filtro-${slug}`;

/**
 * Filtro por servicio en piedras pequeñas, sin JavaScript y con la página
 * estática: cada piedra es un ancla (`#filtro-<slug>`) y un `<style>` generado
 * de los datos oculta, con `:target`, las tarjetas de otros servicios y marca la
 * piedra activa (relleno, subrayado y «, seleccionado» para el lector de
 * pantalla: `aria-current` no se puede poner sin JavaScript en una página
 * estática). Sin ancla, se ven todos. Solo con 2 servicios o más.
 * (El `?servicio=` del encargo obligaría a renderizar la página en cada visita.)
 */
export function FiltroTrabajos({ servicios, children }: { servicios: readonly Pick<Servicio, "slug" | "titulo">[]; children: ReactNode }) {
  if (servicios.length < 2) return <>{children}</>;
  // Los slugs solo llevan [a-z0-9-] (lo valida core): seguros dentro del CSS.
  const css =
    `.filtro .filtro-activo{display:none}.filtro a[href="#${ID_TODOS}"] .filtro-activo{display:inline}` +
    servicios
      .map((s) => {
        const id = idFiltro(s.slug);
        return (
          `.filtro:has(#${id}:target) .rejilla-trabajos>li:not([data-servicio="${s.slug}"]){display:none}` +
          `.filtro:has(#${id}:target) a[href="#${id}"]{background:var(--color-texto);color:var(--color-fondo);text-decoration:underline}` +
          `.filtro:has(#${id}:target) a[href="#${id}"] .filtro-activo{display:inline}` +
          `.filtro:has(#${id}:target) a[href="#${ID_TODOS}"]{background:transparent;color:var(--color-texto);text-decoration:none}` +
          `.filtro:has(#${id}:target) a[href="#${ID_TODOS}"] .filtro-activo{display:none}`
        );
      })
      .join("");
  const chip = "inline-flex min-h-11 items-center border-2 border-texto px-4 text-[0.9375rem] font-bold no-underline";
  return (
    <div className="filtro">
      <style>{css}</style>
      <span id={ID_TODOS} className="block scroll-mt-28" />
      {servicios.map((s) => (
        <span key={s.slug} id={idFiltro(s.slug)} className="block scroll-mt-28" />
      ))}
      <nav aria-label="Filtrar por servicio" className="mb-[clamp(1.5rem,1rem+2vw,2.5rem)]">
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          <li>
            <a href={`#${ID_TODOS}`} className={cn(chip, "bg-texto text-fondo underline underline-offset-4", piedra(0))}>
              Todos
              <span className="filtro-activo sr-only">, seleccionado</span>
            </a>
          </li>
          {servicios.map((s, i) => (
            <li key={s.slug}>
              <a href={`#${idFiltro(s.slug)}`} className={cn(chip, "bg-transparent text-texto underline-offset-4", piedra(i + 1))}>
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
