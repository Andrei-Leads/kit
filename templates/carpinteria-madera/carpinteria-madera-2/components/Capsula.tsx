import Image from "next/image";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { MenuPopover } from "@/components/base/MenuPopover";
import { IconoWhatsApp } from "@/components/Iconos";
import { mensajeInicio } from "@/lib/mensajes";
import { menu, type IdPagina } from "@/lib/navegacion";
import { cn } from "@/lib/utils";
import config from "@/site.config";

/**
 * Cápsula flotante (navegación, encargo §5): píldora blanca fija a 12 px de los bordes, con sombra
 * estática. Desde 1024 px, los enlaces, «WhatsApp» (relleno) y «Llamar · {teléfono}» (contorno); en
 * móvil, «Llamar» (`capsula-llamar`) y «Menú», que abre el panel `popover` con la pareja completa.
 * La página actual se marca en el servidor (cada página pinta su cápsula). Sin WhatsApp, «Llamar»
 * va relleno. El nombre se ve siempre: con un nombre largo (más de 28 caracteres), en móvil la cápsula
 * quita su «Llamar» (queda en la barra inferior y en el menú) y el nombre ocupa ese hueco en dos o
 * tres líneas; nunca «…».
 */
export function Capsula({ actual }: { actual?: IdPagina }) {
  const { negocio, contacto } = config;
  const enlaces = menu(config);
  const mensaje = mensajeInicio(contacto);
  const tel = telefonoVisible(contacto.telefono);
  const claseLlamarEscritorio = contacto.whatsapp ? "boton-contorno" : "boton-primario";
  const largo = negocio.nombre.length > 28;

  return (
    <header className="pointer-events-none fixed inset-x-3 top-3 z-50 flex justify-center">
      <nav
        aria-label="Principal"
        className="capsula pointer-events-auto flex min-h-[60px] w-full max-w-[1224px] items-center gap-1.5 rounded-[32px] bg-superficie py-1.5 pr-1.5 pl-5 text-texto shadow-tarjeta"
      >
        <Link
          href="/"
          className={cn(
            "mr-auto flex min-h-11 min-w-0 items-center gap-2 py-1 font-titulo leading-[1.15] font-bold tracking-[-0.01em] text-pretty no-underline [overflow-wrap:anywhere]",
            largo ? "text-[13px] lg:text-sm" : "text-base",
          )}
        >
          {negocio.logo && (
            <Image src={negocio.logo.src} alt="" width={32} height={32} sizes="32px" className="size-8 flex-none rounded-md object-contain" />
          )}
          <span className={largo ? "lg:max-w-[30ch]" : "max-w-[16ch] lg:max-w-[24ch]"}>{negocio.nombre}</span>
        </Link>

        <ul className="mr-auto hidden gap-0.5 lg:flex">
          {enlaces.map((e) => (
            <li key={e.href}>
              <Link
                href={e.href}
                aria-current={e.id === actual ? "page" : undefined}
                className={cn(
                  "flex min-h-12 items-center rounded-full px-4 text-[15.5px] font-semibold no-underline hover:bg-alterna",
                  e.id === actual && "bg-alterna",
                )}
              >
                {e.texto}
              </Link>
            </li>
          ))}
        </ul>
        {contacto.whatsapp && (
          <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensaje} className="boton boton-compacto boton-primario hidden flex-none gap-2 lg:inline-flex">
            <IconoWhatsApp tamano={20} />
            WhatsApp
          </BotonWhatsApp>
        )}
        <BotonLlamada telefono={contacto.telefono} className={cn("boton boton-compacto hidden flex-none whitespace-nowrap lg:inline-flex", claseLlamarEscritorio)}>
          Llamar ·&nbsp;{tel}
        </BotonLlamada>

        {/* Con un nombre largo, en móvil «Llamar» deja su sitio al nombre: sigue en la barra inferior y en el menú. */}
        <BotonLlamada
          telefono={contacto.telefono}
          className={cn("boton boton-compacto boton-primario flex-none px-[18px] text-[15px] lg:hidden", largo && "max-lg:hidden")}
        >
          Llamar<span className="sr-only"> al {tel}</span>
        </BotonLlamada>
        <button
          type="button"
          popoverTarget="menu"
          className="min-h-12 flex-none cursor-pointer rounded-full border-2 border-borde px-[18px] text-[15px] font-bold lg:hidden"
        >
          <span className="texto-menu">Menú</span>
          <span className="texto-cerrar">Cerrar</span>
        </button>
        <MenuPopover
          enlaces={enlaces}
          actual={actual}
          className="lg:hidden"
          pie={
            <>
              {contacto.whatsapp && (
                <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensaje} className="boton boton-primario">
                  <IconoWhatsApp />
                  Escribir por WhatsApp
                </BotonWhatsApp>
              )}
              <BotonLlamada telefono={contacto.telefono} className={cn("boton", contacto.whatsapp ? "boton-contorno" : "boton-primario")}>
                Llamar al&nbsp;{tel}
              </BotonLlamada>
            </>
          }
        />
      </nav>
    </header>
  );
}
