import type { CSSProperties } from "react";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, telefonoVisible, type Ancla, type Imagen } from "@andrei-leads/core";

import { ContenidoLlamadaPleno, llamadaPleno, whatsappPleno } from "@/components/Botones";
import { CerrarMenuAlSalir } from "@/components/CerrarMenuAlSalir";
import { IconoCerrar, IconoMenu, IconoTelefono, IconoWhatsapp } from "@/components/Iconos";
import { Nombre } from "@/components/Nombre";
import { cn } from "@/lib/utils";

const ID_MENU = "menu";
/** A partir de aquí el nombre no cabe en 2 líneas junto a los botones a 375 px. */
const NOMBRE_LARGO = 24;

type Props = {
  nombre: string;
  logo?: Imagen;
  telefono: string;
  whatsapp?: string;
  mensaje: string;
  textoLlamada: string;
  enlaces: readonly Ancla[];
};

const pastilla = "boton inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-boton font-semibold no-underline";

/**
 * Cabecera sobre el pleno (todas las páginas). Nombre a la izquierda; a la
 * derecha, llamada-cabecera (pastilla de 44 px en superficie: en móvil icono +
 * «Llamar», desde 768 px «Llamar 24 h · {número}»), whatsapp-cabecera (desde
 * 768 px) y «Menú». El panel del menú a pantalla completa (popover nativo) va
 * en el DOM justo después del botón «Menú», con «Cerrar» como primer elemento
 * enfocable: un popover no atrapa el foco.
 */
export function Cabecera({ nombre, logo, telefono, whatsapp, mensaje, textoLlamada, enlaces }: Props) {
  // Nombre largo: en móvil va en su propia fila (a todo el ancho, 2 líneas) y los botones debajo.
  const largo = nombre.length > NOMBRE_LARGO;
  return (
    <header className="sobre-pleno relative z-30 bg-pleno text-sobre-primario">
      <div className={cn("contenedor flex items-center justify-between gap-3 py-3.5", largo && "max-sm:flex-wrap max-sm:gap-y-2")}>
        <Link href="/" className={cn("inline-flex min-h-11 min-w-0 items-center no-underline", largo && "max-sm:basis-full")}>
          <Nombre nombre={nombre} logo={logo} ancho={largo} />
        </Link>
        <div className="ms-auto flex flex-none items-center gap-2">
          <BotonLlamada telefono={telefono} className={cn(pastilla, "bg-superficie py-1 pr-4 pl-1 text-texto hover:bg-alterna")}>
            <span aria-hidden="true" className="grid size-9 flex-none place-items-center rounded-full bg-primario text-sobre-primario">
              <IconoTelefono className="size-[18px]" />
            </span>
            {/* «Llamar 24 h» si cabe (desde 360 px); en pantallas más estrechas, «Llamar». */}
            <span className="min-[360px]:hidden">Llamar</span>
            <span className="hidden min-[360px]:inline md:hidden">{textoLlamada}</span>
            <span className="hidden md:inline">
              {textoLlamada} <span aria-hidden="true">·</span> <span className="tabular-nums">{telefonoVisible(telefono)}</span>
            </span>
          </BotonLlamada>
          {whatsapp && (
            <BotonWhatsApp
              numero={whatsapp}
              mensaje={mensaje}
              className={cn(pastilla, "hidden border-2 border-sobre-primario px-[18px] text-sobre-primario hover:bg-sobre-primario/12 md:inline-flex")}
            >
              <IconoWhatsapp className="size-[18px]" />
              WhatsApp
            </BotonWhatsApp>
          )}
          <button
            type="button"
            popoverTarget={ID_MENU}
            className={cn(pastilla, "min-w-11 justify-center border-2 border-sobre-primario bg-transparent text-sobre-primario hover:bg-sobre-primario/12 md:px-4")}
          >
            <IconoMenu />
            <span className="sr-only md:not-sr-only">Menú</span>
          </button>
          <div id={ID_MENU} popover="auto" className="menu-pantalla sobre-pleno">
            <CerrarMenuAlSalir idMenu={ID_MENU} />
            <div className="contenedor flex items-center justify-between gap-3 py-3.5">
              <span className="min-w-0">
                <Nombre nombre={nombre} logo={logo} />
              </span>
              <button
                type="button"
                popoverTarget={ID_MENU}
                popoverTargetAction="hide"
                className={cn(pastilla, "flex-none border-2 border-sobre-primario px-4 text-sobre-primario hover:bg-sobre-primario/12")}
              >
                <IconoCerrar />
                Cerrar
              </button>
            </div>
            <nav aria-label="Principal" className="contenedor flex flex-1 flex-col justify-center py-8">
              <ul className="m-0 flex list-none flex-col gap-1 p-0">
                {enlaces.map((e, i) => (
                  <li key={e.href} style={{ "--i": i } as CSSProperties}>
                    <Link
                      href={e.href}
                      data-ruta={e.href}
                      className="inline-flex min-h-14 items-center gap-3 font-titulo text-[clamp(2.25rem,1.9rem+1.5vw,2.75rem)] leading-none font-bold tracking-[-0.03em] no-underline hover:underline"
                    >
                      {e.texto}
                      {/* Solo se ve en la página actual (globals.css): punto lima + texto para el lector. */}
                      <span className="punto-actual relative size-3 rounded-full bg-acento">
                        <span className="sr-only">, página actual</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="contenedor flex flex-col gap-3 pb-8 sm:flex-row">
              <BotonLlamada telefono={telefono} className={llamadaPleno}>
                <ContenidoLlamadaPleno texto={textoLlamada} telefono={telefono} />
              </BotonLlamada>
              {whatsapp && (
                <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={whatsappPleno}>
                  <IconoWhatsapp />
                  WhatsApp
                </BotonWhatsApp>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
