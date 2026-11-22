import type { ReactNode } from "react";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, telefonoVisible, type SiteConfig } from "@andrei-leads/core";

import { MenuPopover } from "@/components/base/MenuPopover";
import { IconoTelefono, IconoWhatsApp } from "@/components/Iconos";
import { NombreNegocio } from "@/components/NombreNegocio";
import { Pie } from "@/components/Pie";
import { valoracionTexto } from "@/lib/formato";
import { mensajeTaller } from "@/lib/mensajes";
import { paginasMenu, type IdPagina, type Seccion, type SeccionNumerada } from "@/lib/navegacion";
import { cn } from "@/lib/utils";

type ConfigMarco = Pick<SiteConfig, "negocio" | "contacto" | "redes" | "trabajos" | "galeria" | "valoracion">;

type Props = {
  config: ConfigMarco;
  /** Página actual del menú (sin valor en legales y 404). */
  pagina?: IdPagina;
  /** En una ficha `[slug]`: el padre lleva `aria-current="true"`. */
  ficha?: boolean;
  /** Rótulo del índice lateral («Índice de la hoja», «Pieza A · índice», «Hoja de piezas»…). */
  rotulo: string;
  /** Secciones de la página, ya numeradas (`numerar`). */
  secciones?: readonly SeccionNumerada[];
  children: ReactNode;
};

/** Solo caracteres seguros para meter un id en el CSS generado. */
const seguro = (id: string) => /^[a-z0-9-]+$/i.test(id);

/**
 * CSS del índice activo SIN JavaScript (encargo §5): cada sección declara `view-timeline-name`, el
 * marco hace `timeline-scope` y el guion de cada enlace pasa de 0 a 1 mientras su sección está en
 * pantalla. Sin soporte o con «reducir movimiento», el índice funciona igual sin marca.
 */
function cssIndice(secciones: readonly Seccion[]): string {
  const lista = secciones.filter((s) => seguro(s.id));
  if (lista.length === 0) return "";
  const reglas = lista
    .map(
      ({ id }) =>
        `#${id}{view-timeline-name:--s-${id}}` +
        `[data-indice="${id}"] .indice-guion{animation:marca linear both;animation-timeline:--s-${id}}`,
    )
    .join("");
  const scope = lista.map((s) => `--s-${s.id}`).join(",");
  return `@supports (animation-timeline: view()) and (timeline-scope: --a){@media (prefers-reduced-motion: no-preference){.marco{timeline-scope:${scope}}${reglas}}}`;
}

/**
 * Marco de cada página (encargo §5): cabecera de 64 px fija arriba (nombre en mono, páginas y la pareja
 * en escritorio; «Llamar» y «Menú» en móvil), la retícula de 12 columnas visible en escritorio, el
 * índice lateral pegajoso de 3 columnas con las secciones numeradas de la página y el pie. Va en cada
 * página y no en el layout porque la página actual (`aria-current`) y el índice se ponen en el
 * servidor, sin JavaScript (precedente: reformas-4).
 */
export function Marco({ config, pagina, ficha = false, rotulo, secciones = [], children }: Props) {
  const { negocio, contacto, valoracion } = config;
  const paginas = paginasMenu(config);
  const css = cssIndice(secciones);
  const mensaje = mensajeTaller(contacto);
  const enlacePagina = (id: IdPagina) => ({
    "aria-current": id === pagina ? (ficha ? ("true" as const) : ("page" as const)) : undefined,
  });

  return (
    <div className="marco">
      {css && <style>{css}</style>}
      <header className="sticky top-0 z-30 border-b border-borde bg-fondo">
        <div className="mx-auto flex min-h-16 max-w-[1280px] items-center gap-3 px-(--gutter) py-2 lg:gap-5">
          <Link
            href="/"
            className={cn(
              "min-w-0 flex-1 font-titulo leading-[1.3] font-semibold uppercase no-underline lg:max-w-[clamp(150px,18vw,300px)] lg:flex-[0_1_auto]",
              // Nombres largos: interletrado y cuerpo menores para que quepan en 2–3 líneas a 375 px.
              negocio.nombre.length > 28 ? "text-[11px] tracking-[0.04em] lg:text-[12px]" : "text-[13px] tracking-[0.1em]",
            )}
          >
            <NombreNegocio nombre={negocio.nombre} logo={negocio.logo} />
          </Link>

          <nav aria-label="Páginas" className="hidden min-w-0 flex-1 justify-center gap-[clamp(10px,1.2vw,22px)] whitespace-nowrap min-[75rem]:flex">
            {paginas.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                {...enlacePagina(p.id)}
                className={cn(
                  "inline-flex min-h-11 items-center font-titulo text-[12.5px] tracking-[0.05em] uppercase underline-offset-[6px]",
                  p.id === pagina ? "underline" : "no-underline",
                )}
              >
                {p.texto}
              </Link>
            ))}
          </nav>
          <div className="hidden flex-1 lg:block min-[75rem]:hidden" />

          <div className="hidden flex-none gap-2.5 lg:flex">
            {contacto.whatsapp && (
              <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensaje} className="btn btn-relleno btn-cabecera">
                <IconoWhatsApp />
                <span>WhatsApp</span>
              </BotonWhatsApp>
            )}
            <BotonLlamada telefono={contacto.telefono} className="btn btn-contorno btn-cabecera whitespace-nowrap">
              <IconoTelefono />
              <span>Llamar · {telefonoVisible(contacto.telefono)}</span>
            </BotonLlamada>
          </div>

          <div className="ml-auto flex flex-none gap-2 lg:hidden">
            <BotonLlamada telefono={contacto.telefono} className="btn btn-contorno btn-cabecera gap-1.5 px-3 text-xs">
              <IconoTelefono />
              <span>Llamar</span>
            </BotonLlamada>
            <MenuPopover paginas={paginas} actual={pagina} ficha={ficha} secciones={secciones} />
          </div>
        </div>
      </header>

      <div className="relative mx-auto max-w-[1280px] px-(--gutter)">
        <div aria-hidden="true" className="reticula-12 pointer-events-none absolute inset-y-0 right-(--gutter) left-(--gutter) hidden lg:grid">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} />
          ))}
        </div>
        <div className="relative flex items-start gap-6">
          <aside className="sticky top-[88px] hidden flex-[0_0_calc(25%-18px)] flex-col gap-3 pt-12 pb-8 lg:flex">
            <nav aria-label="Páginas" className="mb-5 flex flex-col border-t border-tinta min-[75rem]:hidden">
              {paginas.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  {...enlacePagina(p.id)}
                  className={cn(
                    "flex min-h-10 items-center border-b border-borde font-titulo text-[12.5px] tracking-[0.05em] uppercase underline-offset-[5px]",
                    p.id === pagina ? "underline" : "no-underline",
                  )}
                >
                  {p.texto}
                </Link>
              ))}
            </nav>
            <p className="etiqueta text-texto-suave">{rotulo}</p>
            {secciones.length > 0 && (
              <nav aria-label="Índice de la página">
                <ol className="border-t border-tinta">
                  {secciones.map((s) => (
                    <li key={s.id} className="border-b border-borde">
                      <a
                        href={`#${s.id}`}
                        data-indice={s.id}
                        className="flex min-h-[42px] items-center gap-2.5 font-titulo text-[13px] tracking-[0.03em] no-underline"
                      >
                        <span className="min-w-[22px] text-texto-suave">{s.n}</span>
                        <span className="flex-1">{s.texto}</span>
                        <span aria-hidden="true" className="indice-guion h-0.5 w-[22px] bg-lapiz" />
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            {valoracion && <p className="mt-2 font-titulo text-[12.5px] tracking-[0.04em] text-texto-suave">{valoracionTexto(valoracion)}</p>}
          </aside>
          <main className="min-w-0 flex-1 pb-6">{children}</main>
        </div>
      </div>
      <Pie config={config} />
    </div>
  );
}
