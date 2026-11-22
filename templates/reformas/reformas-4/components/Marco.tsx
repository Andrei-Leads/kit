import type { ReactNode } from "react";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, telefonoVisible, type SiteConfig } from "@andrei-leads/core";

import { MenuPopover } from "@/components/base/MenuPopover";
import { NombreNegocio } from "@/components/NombreNegocio";
import { Pie } from "@/components/secciones/Pie";
import { mensajeDiario } from "@/lib/mensajes";
import { paginasMenu, type IdPagina, type Seccion, type SeccionNumerada } from "@/lib/navegacion";
import { cn } from "@/lib/utils";

type ConfigMarco = Pick<SiteConfig, "negocio" | "contacto" | "redes" | "trabajos" | "galeria">;

type Props = {
  config: ConfigMarco;
  /** Página actual del menú (sin valor en legales y 404). */
  pagina?: IdPagina;
  /** En una ficha `[slug]`: el padre lleva `aria-current="true"`. */
  ficha?: boolean;
  /** Secciones de la página, ya numeradas (`numerar`). */
  secciones?: readonly SeccionNumerada[];
  children: ReactNode;
};

/** Solo caracteres seguros para meter un id en el CSS generado. */
const seguro = (id: string) => /^[a-z0-9-]+$/i.test(id);

/**
 * CSS del índice activo SIN JavaScript (encargo §5): cada sección declara `view-timeline-name`, el
 * marco hace `timeline-scope` y cada enlace anima `opacity` .5→1 (y su guion) según su sección esté en
 * pantalla. Sin soporte o con «reducir movimiento», todos los enlaces quedan al 100 % y sin guion.
 */
function cssIndice(secciones: readonly Seccion[]): string {
  const lista = secciones.filter((s) => seguro(s.id));
  if (lista.length === 0) return "";
  const reglas = lista
    .map(
      ({ id }) =>
        `#${id}{view-timeline-name:--s-${id}}` +
        `[data-indice="${id}"]{animation:indice-activo linear both;animation-timeline:--s-${id};animation-range:cover 0% cover 100%}` +
        `[data-indice="${id}"] .indice-guion{animation:indice-guion linear both;animation-timeline:--s-${id};animation-range:cover 0% cover 100%}`,
    )
    .join("");
  const scope = lista.map((s) => `--s-${s.id}`).join(",");
  return `@supports (animation-timeline: view()) and (timeline-scope: --a){@media (prefers-reduced-motion: no-preference){.marco{timeline-scope:${scope}}${reglas}}}`;
}

/**
 * Marco de cada página: índice lateral fijo de 15 rem desde 1024 px (nombre, páginas, «En esta
 * página» y los dos botones al pie) o, por debajo, la cabecera de 56 px con el nombre, «Llamar» e
 * «Índice». Va en cada página y no en el layout porque la página actual (`aria-current`) y las
 * secciones del índice se ponen en el servidor, sin JavaScript (como fontaneria-4). El pie va dentro,
 * en la columna del contenido, como en el diseño.
 */
export function Marco({ config, pagina, ficha = false, secciones = [], children }: Props) {
  const { negocio, contacto } = config;
  const paginas = paginasMenu(config);
  const css = cssIndice(secciones);
  const ciudad = contacto.direccion.ciudad;
  const mensaje = mensajeDiario(contacto);

  return (
    <div className="marco flex min-h-dvh items-start overflow-x-clip bg-fondo">
      {css && <style>{css}</style>}

      <aside className="sticky top-0 z-[5] hidden h-dvh w-(--ancho-indice) flex-none flex-col gap-7 overflow-y-auto border-r border-borde bg-fondo px-[22px] pt-7 pb-[22px] lg:flex">
        <Link href="/" className="grid gap-2.5 text-texto no-underline hover:text-texto">
          <span className="mono text-sm leading-[1.35] font-semibold text-balance">
            <NombreNegocio nombre={negocio.nombre} logo={negocio.logo} />
          </span>
          <span className="mono text-[11px] tracking-[0.08em] text-texto-suave uppercase">Diario de obra · {ciudad}</span>
        </Link>
        <nav aria-label="Páginas">
          <ul className="grid gap-0.5">
            {paginas.map((p) => {
              const es = p.id === pagina;
              return (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    aria-current={es ? (ficha ? "true" : "page") : undefined}
                    className={cn("mono flex min-h-8 items-center gap-2.5 text-[13px] no-underline hover:text-texto", es ? "text-texto" : "text-texto-suave")}
                  >
                    <span aria-hidden="true" className="w-2.5 text-primario-claro">
                      {es ? "■" : ""}
                    </span>
                    {p.texto}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {secciones.length > 0 && (
          <nav aria-label="Índice de la página" className="border-t border-borde pt-5">
            <p className="mono mb-3 text-[11px] tracking-[0.08em] text-texto-suave uppercase">En esta página</p>
            <ol className="grid gap-0.5">
              {secciones.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    data-indice={s.id}
                    className="mono flex min-h-[30px] items-baseline gap-2 py-1.5 text-[12.5px] leading-[1.4] text-texto no-underline hover:text-texto"
                  >
                    <span aria-hidden="true" className="indice-guion text-primario-claro">
                      —
                    </span>
                    <span className="text-primario-claro">{s.n}</span>
                    <span>{s.texto}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="mt-auto grid gap-2">
          {contacto.whatsapp && (
            <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensaje} className="btn btn-wa min-h-12 gap-2.5 px-3 text-[13px]">
              <span aria-hidden="true" className="bocadillo size-[13px]" />
              WhatsApp
            </BotonWhatsApp>
          )}
          <BotonLlamada telefono={contacto.telefono} className="btn btn-tel min-h-12 px-2 text-[12.5px] whitespace-nowrap">
            Llamar · {telefonoVisible(contacto.telefono)}
          </BotonLlamada>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex min-h-14 items-center gap-2 border-b border-borde bg-fondo py-1.5 pr-3 pl-4 lg:hidden">
          <Link
            href="/"
            className={cn(
              "mono flex min-h-11 min-w-0 flex-1 items-center leading-[1.3] font-semibold text-texto no-underline hover:text-texto",
              // Nombres largos: un punto y medio menos para que la cabecera de 56 px no crezca de más.
              negocio.nombre.length > 32 ? "text-[11px]" : "text-[13px]",
            )}
          >
            <NombreNegocio nombre={negocio.nombre} logo={negocio.logo} />
          </Link>
          <BotonLlamada telefono={contacto.telefono} className="btn btn-tel min-h-11 flex-none px-3.5 text-xs">
            Llamar
            <span className="hidden sm:inline"> · {telefonoVisible(contacto.telefono)}</span>
          </BotonLlamada>
          <MenuPopover paginas={paginas} actual={pagina} ficha={ficha} secciones={secciones} />
        </header>
        <main>{children}</main>
        <Pie config={config} />
      </div>
    </div>
  );
}
