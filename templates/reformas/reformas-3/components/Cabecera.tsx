import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, telefonoVisible, type Ancla, type Imagen } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { CerrarMenu } from "@/components/CerrarMenu";
import { IconoWhatsapp } from "@/components/Iconos";
import { numeroObra } from "@/lib/obras";
import { cn } from "@/lib/utils";

const ID_MENU = "menu";
/** A partir de aquí el nombre baja a 16 px en dos líneas (aguanta 40 caracteres a 375 px). */
const NOMBRE_LARGO = 24;

type Props = {
  nombre: string;
  logo?: Imagen;
  telefono: string;
  whatsapp?: string;
  mensaje: string;
  enlaces: readonly Ancla[];
};

const BOTON_CAB = "boton min-h-11 px-4 text-[17px]";

function Nombre({ nombre, logo, largo }: { nombre: string; logo?: Imagen; largo: boolean }) {
  const muyLargo = nombre.length > 40;
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      {logo && (
        <Image src={logo.src} alt="" width={36} height={36} className="size-9 flex-none object-contain" />
      )}
      <span
        className={cn(
          "condensada tracking-[-0.01em]",
          largo ? "text-base" : "text-xl lg:text-2xl",
          // Hasta 40 caracteres, 2 líneas; más largo (nombre de 54), 3 líneas en los 56 px de la cabecera.
          muyLargo ? "line-clamp-3 lg:line-clamp-2" : "line-clamp-2",
          "leading-[0.95]",
        )}
      >
        {nombre}
      </span>
    </span>
  );
}

/**
 * Cabecera de todas las páginas: 56 px en móvil y 72 px en escritorio, filete
 * inferior de 2 px. Nombre en condensada a la izquierda; a la derecha, en
 * escritorio, WhatsApp (primario) y «Llamar · número» (contorno); en móvil,
 * «Llamar» compacto (la barra lleva los dos). «Menú» es un cuadrado negro que
 * abre el menú a pantalla completa (popover nativo: sin JS abre, cierra con
 * «Cerrar» y con Esc, y devuelve el foco). La página actual va en blanco
 * (marcador `data-pagina` de cada página + CSS, sin JS).
 */
export function Cabecera({ nombre, logo, telefono, whatsapp, mensaje, enlaces }: Props) {
  const largo = nombre.length > NOMBRE_LARGO;
  return (
    <header className="border-b-2 border-borde bg-fondo">
      <div className="contenedor flex h-14 items-center gap-2 lg:h-[72px]">
        <Link href="/" className={cn("me-auto flex min-h-11 min-w-0 items-center text-texto no-underline", largo ? "flex-1" : "max-w-[60%]")}>
          <Nombre nombre={nombre} logo={logo} largo={largo} />
        </Link>
        {whatsapp && (
          <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(BOTON_CAB, "boton-wa hidden lg:flex")}>
            <IconoWhatsapp className="size-[18px]" />
            WhatsApp
          </BotonWhatsApp>
        )}
        <BotonLlamada telefono={telefono} className={cn(BOTON_CAB, "boton-contorno flex-none px-3 text-base lg:px-4 lg:text-[17px]")}>
          <span>
            Llamar
            <span className="sr-only lg:not-sr-only">
              {" "}
              <span aria-hidden="true">·</span> <span className="tabular-nums">{telefonoVisible(telefono)}</span>
            </span>
          </span>
        </BotonLlamada>
        <button
          type="button"
          popoverTarget={ID_MENU}
          className="etiqueta min-h-11 min-w-11 flex-none cursor-pointer border-2 border-negro bg-negro text-sm text-sobre-negro hover:border-primario hover:bg-primario hover:text-sobre-primario lg:px-4"
        >
          Menú
        </button>
        <div id={ID_MENU} popover="auto" aria-label="Menú" className="menu-pantalla sobre-negro">
          <CerrarMenu idMenu={ID_MENU} />
          <div className="contenedor flex h-14 flex-none items-center justify-between gap-2 border-b-2 border-filete-negro lg:h-[72px]">
            <span className="min-w-0">
              <Nombre nombre={nombre} largo={largo} />
            </span>
            <button
              type="button"
              popoverTarget={ID_MENU}
              popoverTargetAction="hide"
              className="etiqueta min-h-11 min-w-11 flex-none cursor-pointer border-2 border-sobre-negro bg-transparent px-3 text-sm text-sobre-negro"
            >
              Cerrar
            </button>
          </div>
          <nav aria-label="Principal" className="contenedor flex-1 py-2">
            <ul className="m-0 list-none p-0">
              {enlaces.map((e, i) => (
                <li key={e.href} style={{ "--i": i } as CSSProperties} className="border-b-2 border-filete-negro">
                  <Link
                    href={e.href}
                    data-ruta={e.href}
                    className="enlace-menu condensada flex items-baseline gap-3.5 py-2.5 text-[56px] leading-[0.9] tracking-[-0.01em] no-underline"
                  >
                    <span aria-hidden="true" className="w-[22px] flex-none text-base text-[#a8a8a8]">
                      {numeroObra(i)}
                    </span>
                    {e.texto}
                    <span className="actual-sr sr-only">, página actual</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="contenedor flex-none pt-4 pb-5">
            <Pareja telefono={telefono} whatsapp={whatsapp} mensaje={mensaje} tono="negro" className="max-w-none" />
          </div>
        </div>
      </div>
    </header>
  );
}
