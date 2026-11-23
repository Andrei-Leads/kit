import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BotonLlamada, BotonWhatsApp, telefonoVisible, type Ancla } from "@andrei-leads/core";

import { MenuPopover } from "@/components/base/MenuPopover";
import { IconoTelefono, IconoWhatsApp } from "@/components/Iconos";
import { Pie } from "@/components/Pie";
import { mensajeInicio } from "@/lib/mensajes";
import { indice, type IdPagina } from "@/lib/navegacion";
import { textoValoracion } from "@/lib/textos";
import { cn } from "@/lib/utils";
import config from "@/site.config";

type Props = {
  /** Página del índice que se marca como actual (sin JavaScript). */
  actual?: IdPagina;
  /** Solo en el inicio: las anclas de sus secciones, numeradas, bajo el índice lateral. */
  anclas?: readonly (Ancla & { n: string })[];
  /** Número de lámina de la página, para el cajetín del pie («00», «02.03»…). */
  lamina?: string;
  children: ReactNode;
};

/**
 * Armazón de cada página (encargo §6.1). Va en cada página, no en el layout, para marcar la página
 * actual y las anclas del inicio en el HTML del servidor (mismo precedente que reformas-2).
 * - Móvil (< 1024 px): cabecera de 56 px con el nombre en mono, `boton-cajetin` «Llamar» y «Menú»
 *   (`MenuPopover` a pantalla completa).
 * - Desde 1024 px: índice lateral fijo de 220 px (`<nav aria-label="Índice">`) con las páginas
 *   numeradas, las anclas del inicio y el teléfono; arriba, una franja con sector, ciudad y
 *   valoración y la pareja WhatsApp + «Llamar · {teléfono}».
 * La barra móvil va en el layout; el pie, aquí (lleva la lámina de la página).
 */
export function Marco({ actual, anclas, lamina = "00", children }: Props) {
  const { negocio, contacto, valoracion } = config;
  const enlaces = indice(config);
  const tel = telefonoVisible(contacto.telefono);
  const mensaje = mensajeInicio(contacto);
  const tira = [negocio.sector, contacto.direccion.ciudad, valoracion && textoValoracion(valoracion)].filter(Boolean).join(" · ").toUpperCase();
  // Nombres largos: más estrechos (wdth) para que quepan en 2 líneas a 375 px sin cortarse.
  const nombreLargo = negocio.nombre.length > 26;
  const logo = negocio.logo && (
    <Image src={negocio.logo.src} alt="" width={32} height={32} className="size-8 flex-none object-contain" />
  );

  return (
    <div className="lg:flex lg:items-start">
      <nav
        aria-label="Índice"
        className="sticky top-0 hidden h-dvh w-[220px] flex-none flex-col gap-7 overflow-y-auto border-r border-texto bg-fondo px-5 pt-5 pb-6 lg:flex"
      >
        <Link href="/" className="flex flex-col gap-1.5 border border-texto bg-superficie px-3 py-2.5 no-underline">
          <span className="etiqueta text-texto-suave">LÁM. 00</span>
          <span className="flex items-center gap-2.5">
            {logo}
            <span className="font-titulo text-sm leading-[1.3] font-semibold text-balance">{negocio.nombre}</span>
          </span>
        </Link>
        <div className="flex flex-col">
          <span className="etiqueta mb-1.5 border-b border-borde pb-2 text-texto-suave">ÍNDICE</span>
          <ul>
            {enlaces.map((e) => (
              <li key={e.href}>
                <Link
                  href={e.href}
                  aria-current={e.id === actual ? "page" : undefined}
                  className="group flex min-h-11 items-center gap-3 font-titulo text-sm no-underline hover:text-primario aria-[current=page]:font-semibold"
                >
                  <span className="w-[22px] text-[13px] text-texto-suave">{e.n}</span>
                  <span className="flex-1">{e.texto}</span>
                  <span aria-hidden="true" className="hidden h-px w-3.5 bg-texto group-aria-[current=page]:block" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {anclas && anclas.length > 0 && (
          <ul aria-label="En esta página" className="ml-2.5 flex flex-col border-l border-borde pl-[34px]">
            {anclas.map((a) => (
              <li key={a.href}>
                <a href={a.href} className="flex min-h-11 items-center gap-2.5 text-sm text-texto-suave no-underline hover:text-texto">
                  <span className="font-titulo text-[13px]">{a.n}</span>
                  <span>{a.texto}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex flex-col gap-1.5 border-t border-borde pt-3">
          <span className="etiqueta text-texto-suave">TELÉFONO</span>
          <BotonLlamada telefono={contacto.telefono} className="inline-flex min-h-11 items-center font-titulo text-base font-semibold no-underline hover:text-primario">
            {tel}
          </BotonLlamada>
        </div>
      </nav>

      <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
        <div className="sticky top-0 z-20 hidden h-[60px] items-center justify-between gap-6 border-b border-texto bg-fondo px-[clamp(20px,4vw,48px)] lg:flex">
          <span className="etiqueta min-w-0 truncate text-texto-suave">{tira}</span>
          <div className="flex flex-none gap-2.5">
            {contacto.whatsapp && (
              <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensaje} className="boton boton-lamina boton-cajetin">
                <IconoWhatsApp />
                WhatsApp
              </BotonWhatsApp>
            )}
            <BotonLlamada telefono={contacto.telefono} className="boton boton-trazo boton-cajetin">
              <IconoTelefono />
              <span>Llamar · {tel}</span>
            </BotonLlamada>
          </div>
        </div>

        <header className="sticky top-0 z-20 flex min-h-14 items-center gap-2 border-b border-texto bg-fondo py-1.5 pr-3 pl-4 lg:hidden">
          <Link href="/" className="flex min-h-11 min-w-0 flex-1 items-center gap-2.5 no-underline">
            {logo}
            <span
              className={cn(
                "min-w-0 font-titulo leading-[1.2] font-semibold text-balance [overflow-wrap:anywhere]",
                nombreLargo ? "text-xs [font-stretch:75%]" : "text-sm",
              )}
            >
              {negocio.nombre}
            </span>
          </Link>
          <BotonLlamada telefono={contacto.telefono} className="boton boton-trazo boton-cajetin flex-none px-3">
            <IconoTelefono />
            Llamar
          </BotonLlamada>
          <button
            type="button"
            popoverTarget="menu"
            className="h-11 flex-none cursor-pointer border border-borde bg-superficie px-3 font-titulo text-[13px]"
          >
            Menú
          </button>
          <MenuPopover
            enlaces={enlaces}
            actual={actual}
            pie={
              <>
                <span className="text-[13px] text-sobre-alterna-suave">TELÉFONO</span>
                <BotonLlamada telefono={contacto.telefono} className="inline-flex min-h-11 items-center text-xl font-semibold text-sobre-alterna no-underline">
                  {tel}
                </BotonLlamada>
              </>
            }
          />
        </header>

        <main className="flex flex-1 flex-col">{children}</main>
        <Pie lamina={lamina} />
      </div>
    </div>
  );
}
