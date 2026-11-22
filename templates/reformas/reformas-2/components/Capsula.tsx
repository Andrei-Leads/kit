import Image from "next/image";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, telefonoVisible } from "@andrei-leads/core";

import { MenuPopover } from "@/components/base/MenuPopover";
import { IconoTelefono, IconoWhatsApp } from "@/components/Iconos";
import { mensajeInicio } from "@/lib/mensajes";
import { menu, type IdPagina } from "@/lib/navegacion";
import { cn } from "@/lib/utils";
import config from "@/site.config";

const PILDORA = "boton h-12 min-h-12 flex-none gap-2 px-4 text-[15px] whitespace-nowrap";

/**
 * Cápsula flotante (navegación): píldora blanca de 56 px fija arriba, a 10 px de los bordes.
 * Desde 1024 px, los enlaces, «WhatsApp» (relleno) y «Llamar · {teléfono}» (contorno); en móvil,
 * «Llamar» (contorno) y «Menú», que abre el panel `popover` con la pareja completa. La página
 * actual se marca en el servidor (cada página pinta su cápsula). Sin WhatsApp, «Llamar» va relleno.
 */
export function Capsula({ actual }: { actual?: IdPagina }) {
  const { negocio, contacto } = config;
  const enlaces = menu(config);
  const mensaje = mensajeInicio(contacto);
  const tel = telefonoVisible(contacto.telefono);
  const claseLlamar = contacto.whatsapp ? "boton-contorno" : "boton-primario";

  return (
    <header className="pointer-events-none fixed inset-x-2.5 top-2.5 z-50 flex justify-center">
      <nav
        aria-label="Principal"
        className="capsula pointer-events-auto relative flex h-14 w-full max-w-[1120px] items-center gap-1 rounded-full bg-superficie py-1 pr-1 pl-[18px] text-texto shadow-tarjeta"
      >
        <Link
          href="/"
          title={negocio.nombre}
          className="mr-auto flex min-h-11 min-w-0 flex-[0_1_auto] items-center font-titulo text-base font-semibold tracking-[-0.01em] no-underline"
        >
          {negocio.logo ? (
            <Image src={negocio.logo.src} alt={negocio.nombre} width={112} height={28} className="h-7 w-auto" />
          ) : (
            <span className="max-w-[22ch] truncate">{negocio.nombre}</span>
          )}
        </Link>

        <ul className="mr-2 hidden gap-0.5 lg:flex">
          {enlaces.map((e) => (
            <li key={e.href}>
              <Link
                href={e.href}
                aria-current={e.id === actual ? "page" : undefined}
                className={cn(
                  "flex h-12 items-center rounded-full px-3.5 text-[15px] font-medium no-underline hover:bg-alterna",
                  e.id === actual && "bg-alterna",
                )}
              >
                {e.texto}
              </Link>
            </li>
          ))}
        </ul>
        {contacto.whatsapp && (
          <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensaje} className={cn(PILDORA, "boton-primario hidden lg:flex")}>
            <IconoWhatsApp />
            WhatsApp
          </BotonWhatsApp>
        )}
        <BotonLlamada telefono={contacto.telefono} className={cn(PILDORA, claseLlamar, "hidden lg:flex")}>
          <IconoTelefono />
          <span>Llamar ·&nbsp;{tel}</span>
        </BotonLlamada>

        <BotonLlamada telefono={contacto.telefono} className={cn(PILDORA, claseLlamar, "lg:hidden")}>
          Llamar<span className="sr-only"> al {tel}</span>
        </BotonLlamada>
        <button
          type="button"
          popoverTarget="menu"
          className="h-12 flex-none cursor-pointer rounded-full bg-alterna px-4 text-[15px] font-semibold lg:hidden"
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
              <BotonLlamada telefono={contacto.telefono} className={cn("boton", claseLlamar)}>
                <IconoTelefono />
                <span>Llamar ·&nbsp;{tel}</span>
              </BotonLlamada>
            </>
          }
        />
      </nav>
    </header>
  );
}
