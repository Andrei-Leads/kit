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
 * Tamaño del nombre en la cápsula según su longitud (móvil/escritorio): hasta 10 caracteres
 * («L'Enclusa»), 28/30 px; hasta 16, 20/26 px; hasta 24, 16/22 px; hasta 40, 15/20 px; más,
 * 14/18 px. Con más de 24, «Menú» se queda en icono en móvil (el texto sigue para el lector de
 * pantalla) para dejarle sitio: 54 caracteres caben en 3 líneas. Nunca se corta con «…» (regla de kit; el diseño proponía elipsis a 22).
 */
function claseNombre(nombre: string): string {
  if (nombre.length <= 10) return "text-[28px] lg:text-[30px]";
  if (nombre.length <= 16) return "text-[20px] lg:text-[26px]";
  if (nombre.length <= 24) return "text-[16px] leading-none lg:text-[22px]";
  if (nombre.length <= 40) return "text-[15px] leading-none lg:text-[20px]";
  return "text-[14px] leading-none lg:text-[18px]";
}

/**
 * Cápsula flotante (encargo §6): fija a 12 px del borde, hierro al 94 %, radio total y 52 px de
 * alto; es la única forma redondeada del template. En móvil: nombre, «Menú» (popover con la hoja
 * de hierro) y «Llamar». Desde 1024 px, centrada con los enlaces, «WhatsApp» y «Llamar ·
 * {teléfono}». La página actual se marca en el servidor (cada página pinta su cápsula).
 */
export function Capsula({ actual }: { actual?: IdPagina }) {
  const { negocio, contacto } = config;
  const enlaces = menu(config);
  const mensaje = mensajeInicio(contacto);
  const tel = telefonoVisible(contacto.telefono);
  const nombreLargo = negocio.nombre.length > 24;

  return (
    <header className="pointer-events-none fixed inset-x-4 top-3 z-50 flex justify-center lg:inset-x-10">
      <nav
        aria-label="Principal"
        className="hierro pointer-events-auto flex min-h-[52px] w-full max-w-[1200px] items-center gap-1 rounded-full bg-[rgb(27_23_20/0.94)] py-1 pr-1 pl-5 lg:gap-7 lg:pl-[26px]"
      >
        <Link
          href="/"
          className={cn(
            "mr-auto flex min-h-11 min-w-0 items-center gap-2.5 font-titulo leading-[1.1] font-extrabold tracking-[0.02em] text-balance uppercase no-underline lg:mr-0 lg:max-w-[30ch]",
            claseNombre(negocio.nombre),
          )}
        >
          {negocio.logo && <Image src={negocio.logo.src} alt="" width={32} height={32} className="size-8 flex-none object-contain" />}
          <span className="min-w-0 [overflow-wrap:anywhere]">{negocio.nombre}</span>
        </Link>

        <ul className="hidden flex-1 gap-[22px] lg:flex">
          {enlaces.map((e) => (
            <li key={e.href}>
              <Link
                href={e.href}
                aria-current={e.id === actual ? "page" : undefined}
                className="flex min-h-11 items-center font-titulo text-lg font-bold tracking-[0.06em] uppercase no-underline hover:text-acento aria-[current=page]:text-acento"
              >
                {e.texto}
              </Link>
            </li>
          ))}
        </ul>
        {contacto.whatsapp && (
          <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensaje} className="boton-capsula capsula-primario hidden lg:flex">
            <IconoWhatsApp tamano={18} />
            WhatsApp
          </BotonWhatsApp>
        )}
        <BotonLlamada
          telefono={contacto.telefono}
          className={cn("boton-capsula hidden lg:flex", contacto.whatsapp ? "capsula-contorno" : "capsula-primario")}
        >
          Llamar ·&nbsp;{tel}
        </BotonLlamada>

        <button
          type="button"
          popoverTarget="menu"
          className="flex h-11 flex-none cursor-pointer items-center gap-2 px-3 font-titulo text-lg font-bold tracking-[0.06em] uppercase focus-visible:-outline-offset-2 lg:hidden"
        >
          <span aria-hidden="true" className="grid gap-1">
            <span className="block h-0.5 w-[18px] bg-sobre-hierro" />
            <span className="block h-0.5 w-3 bg-acento" />
          </span>
          <span className={cn("texto-menu", nombreLargo && "sr-only")}>Menú</span>
          <span className={cn("texto-cerrar", nombreLargo && "sr-only")}>Cerrar</span>
        </button>
        <BotonLlamada telefono={contacto.telefono} className="boton-capsula capsula-primario lg:hidden">
          Llamar<span className="sr-only"> al {tel}</span>
        </BotonLlamada>
        <MenuPopover
          enlaces={enlaces}
          actual={actual}
          className="lg:hidden"
          pie={
            contacto.whatsapp && (
              <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensaje} className="boton boton-chispa">
                <IconoWhatsApp />
                Mándanos una foto del sitio
              </BotonWhatsApp>
            )
          }
        />
      </nav>
    </header>
  );
}
