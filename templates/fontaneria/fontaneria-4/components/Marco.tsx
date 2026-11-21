import type { ReactNode } from "react";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { MenuPopover } from "@/components/base/MenuPopover";
import { IconoTelefono, IconoWhatsApp } from "@/components/Iconos";
import { NombreNegocio } from "@/components/NombreNegocio";
import { textoLlamar } from "@/lib/formato";
import { mensajeAviso } from "@/lib/mensajes";
import { numerar, type Campo, type DatosMarco, type IdPagina } from "@/lib/navegacion";
import { cn } from "@/lib/utils";

type Props = DatosMarco & {
  /** Página actual del menú (sin valor en legales y 404). */
  pagina?: IdPagina;
  /** Secciones de la página: «campos del parte» numerados del índice (los `false` se quitan). */
  campos?: (Campo | false | undefined | null | 0)[];
  /** Ficha `[slug]` dentro de la página: `aria-current="true"` en su padre (la miga lleva el `page`). */
  ficha?: boolean;
  children: ReactNode;
};

/** Solo caracteres seguros para meter un id en el CSS generado. */
const seguro = (id: string) => /^[a-z0-9-]+$/i.test(id);

/**
 * Marco de cada página: la «hoja» con su cabecera móvil y, desde 1024 px, el índice lateral fijo
 * (encargo §5). Va en cada página y no en el layout porque la página actual (`aria-current`) y los
 * campos del parte dependen de la página y se ponen en el servidor, sin JavaScript. El campo activo
 * se marca en rojo solo tras pulsarlo: `body:has(#id:target) [data-campo="id"]` (sin seguir el scroll).
 */
export function Marco({ negocio, contacto, paginas, confianza, pagina, ficha = false, campos = [], children }: Props) {
  const lista = numerar(campos);
  const llamar = textoLlamar(contacto);
  const nombreLargo = negocio.nombre.length > 24;
  const mensaje = mensajeAviso(contacto);
  const css = lista
    .filter((c) => seguro(c.id))
    .map((c) => `body:has(#${c.id}:target) [data-campo="${c.id}"]{color:var(--color-primario)}`)
    .join("");

  return (
    <div className="bg-alterna lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
      {css && <style>{css}</style>}

      {/* Índice lateral (≥ 1024 px) */}
      <aside className="sticky top-0 z-[5] hidden h-dvh flex-col gap-7 self-start overflow-y-auto border-r border-texto bg-fondo py-6 pr-5 pl-6 lg:flex">
        <div className="flex flex-col gap-1.5">
          <span className="font-titulo text-[0.6875rem] font-bold tracking-[0.06em] text-primario uppercase">Parte de trabajo</span>
          <Link href="/" className="flex min-h-11 items-center font-titulo text-sm leading-tight font-bold uppercase no-underline">
            <NombreNegocio nombre={negocio.nombre} logo={negocio.logo} />
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <BotonLlamada telefono={contacto.telefono} className="btn btn-llamada justify-start px-3 text-[0.8125rem]">
            <IconoTelefono className="size-[18px] flex-none" />
            <span className="flex flex-col leading-tight">
              <span>{llamar} ·</span>
              <span className="text-[0.9375rem]">{telefonoVisible(contacto.telefono)}</span>
            </span>
          </BotonLlamada>
          {contacto.whatsapp && (
            <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensaje} className="btn btn-tinta min-h-12 justify-start px-3 text-[0.8125rem]">
              <IconoWhatsApp className="size-[18px] flex-none" />
              <span>Escribir por WhatsApp</span>
            </BotonWhatsApp>
          )}
          <p className="font-titulo text-[0.6875rem] leading-normal text-texto-suave">{confianza}</p>
        </div>
        <nav aria-label="Páginas" className="flex flex-col gap-2">
          <span className="font-titulo text-[0.6875rem] tracking-[0.06em] text-texto-suave uppercase">Índice</span>
          <ul className="border-t border-texto">
            {paginas.map((p, i) => {
              const es = p.id === pagina;
              return (
                <li key={p.href} className="border-b border-borde">
                  <Link
                    href={p.href}
                    aria-current={es ? (ficha ? "true" : "page") : undefined}
                    className={cn("flex min-h-11 items-center gap-2.5 font-titulo text-[0.8125rem] no-underline", es && "font-bold text-primario")}
                  >
                    <span className="text-[0.6875rem] text-texto-suave">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1">{p.texto}</span>
                    {es && <span aria-hidden="true">●</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {lista.length > 0 && (
          <nav aria-label="En esta página" className="flex flex-col gap-2">
            <span className="font-titulo text-[0.6875rem] tracking-[0.06em] text-texto-suave uppercase">Campos del parte</span>
            <ul className="border-t border-texto">
              {lista.map((c) => (
                <li key={c.id} className="border-b border-dashed border-borde">
                  <a href={`#${c.id}`} data-campo={c.id} className="flex min-h-11 items-center gap-2.5 py-2 font-titulo text-xs leading-snug no-underline">
                    <span className="flex-none">{c.n}</span>
                    <span>{c.texto}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
        {contacto.urgencias24h && (
          <div className="mt-auto border border-texto bg-superficie px-2.5 py-2">
            <div className="font-titulo text-[0.6875rem] tracking-[0.06em] text-texto-suave uppercase">Urgencias</div>
            <div className="text-[0.9375rem] font-semibold">24 h</div>
          </div>
        )}
      </aside>

      <div className="min-w-0 bg-fondo lg:max-w-[976px] lg:border-r lg:border-borde">
        {/* Cabecera móvil (< 1024 px): nombre, Índice (popover) y llamada-cabecera. */}
        <header className="sticky top-0 z-30 flex min-h-14 items-center gap-2 border-b border-texto bg-fondo px-(--pad) py-1.5 lg:hidden">
          <Link
            href="/"
            className={cn(
              "flex min-h-11 min-w-0 flex-1 items-center font-titulo leading-tight font-bold tracking-[0.02em] uppercase no-underline",
              // Nombres largos: un punto menos para que la cabecera de 56 px no crezca de más.
              nombreLargo ? "text-[0.6875rem]" : "text-[0.8125rem]",
            )}
          >
            <NombreNegocio nombre={negocio.nombre} logo={negocio.logo} />
          </Link>
          <MenuPopover paginas={paginas} actual={pagina} ficha={ficha} campos={lista} claseBoton="max-[22.5rem]:px-2" />
          <BotonLlamada telefono={contacto.telefono} className="btn btn-llamada min-h-12 flex-none gap-0 px-3 text-[0.8125rem] whitespace-nowrap">
            Llamar
            {/* «24 h» se cae por debajo de 360 px, o siempre con un nombre largo, para dejar sitio al nombre. */}
            {contacto.urgencias24h && nombreLargo === false && <span className="max-[22.5rem]:hidden">&nbsp;24&nbsp;h</span>}
            <span className="hidden sm:inline"> · {telefonoVisible(contacto.telefono)}</span>
          </BotonLlamada>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
