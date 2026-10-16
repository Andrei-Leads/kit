import Image from "next/image";
import Link from "next/link";
import { BotonLlamada, type Imagen, type SiteConfig } from "@andrei-leads/core";
import { Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { telefonoVisible, type Ancla } from "@/lib/formato";
import { cn } from "@/lib/utils";
import { MenuMovil, NavEscritorio } from "./MenuMovil";

type Props = {
  nombre: string;
  logo?: Imagen;
  contacto: SiteConfig["contacto"];
  items: Ancla[];
};

/*
 * Tamaño del nombre según su longitud, para no romper la cabecera a 375 px (decisión 1 de Ysst: el
 * nombre se muestra SIEMPRE escrito, en 2 líneas como máximo y nunca cortado con «…»; el logo, si hay, va a la
 * izquierda a 32 px con alt="" y nunca sustituye al nombre; no hay variante «solo logo»).
 *   corto  (≤ 20 caracteres): 17 px (el del diseño).
 *   medio  (21–32):           15 px.
 *   largo  (33–44):           14 px y la llamada de la cabecera pasa a solo icono (< 640 px),
 *                             con «Llamar» como texto para lectores de pantalla.
 *   muy largo (> 44):         además 12 px (13 desde 640 px) y huecos de 8 px en la cabecera móvil, para que un
 *                             nombre de unos 55 caracteres quepa en 2 líneas junto al logo.
 * No hay `line-clamp`: si aun así no cupiera, la cabecera crece (min-h) en lugar de cortar el nombre.
 */
function claseNombre(nombre: string): { texto: string; largo: boolean; muyLargo: boolean } {
  if (nombre.length <= 20) return { texto: "text-[17px] leading-[1.2]", largo: false, muyLargo: false };
  if (nombre.length <= 32) return { texto: "text-[15px] leading-[1.2]", largo: false, muyLargo: false };
  if (nombre.length <= 44) return { texto: "text-sm leading-[1.15]", largo: true, muyLargo: false };
  return { texto: "text-[12px] leading-[1.15] tracking-[-0.01em] sm:text-[13px]", largo: true, muyLargo: true };
}

/**
 * Cabecera sticky de 64 px sobre noche, con línea inferior. Un único enlace a «/» con el logo (opcional)
 * y el nombre. Hasta 1023 px: nombre + Llamar (llamada-cabecera) + Menú (Sheet). Escritorio (lg):
 * nombre + enlaces + número en 700 + Llamar. Todo `tel:` sale de BotonLlamada.
 */
export function Cabecera({ nombre, logo, contacto, items }: Props) {
  const { texto, largo, muyLargo } = claseNombre(nombre);
  return (
    <header className="sticky top-0 z-30 border-b border-linea bg-noche">
      <div className={cn("contenedor flex min-h-16 items-center gap-3 py-2", muyLargo && "max-sm:gap-2")}>
        <Link href="/" className="flex min-h-11 min-w-0 flex-1 items-center gap-2 text-texto no-underline">
          {logo && (
            // Pastilla clara: un logo oscuro (lo habitual) se ve sobre la noche (Specs §2, Cabecera).
            <span className="flex flex-none rounded-lg bg-luz px-1.5 py-1">
              <Image
                src={logo.src}
                alt=""
                width={48}
                height={32}
                className="h-8 w-auto max-w-12 flex-none object-contain object-left"
              />
            </span>
          )}
          <span className={cn("min-w-0 font-bold text-balance [overflow-wrap:anywhere]", texto)}>{nombre}</span>
        </Link>

        <NavEscritorio items={items} />

        <BotonLlamada
          telefono={contacto.telefono}
          className="hidden min-h-11 items-center text-lg font-bold text-texto no-underline tabular-nums hover:underline hover:underline-offset-4 lg:flex"
        >
          {telefonoVisible(contacto.telefono)}
        </BotonLlamada>
        <BotonLlamada
          telefono={contacto.telefono}
          className={cn(
            buttonVariants({ variant: "llamadaCabecera" }),
            largo && "max-sm:w-11 max-sm:justify-center max-sm:px-0"
          )}
        >
          <Phone aria-hidden="true" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-[18px] flex-none" />
          <span className={largo ? "sr-only sm:not-sr-only" : undefined}>Llamar</span>
        </BotonLlamada>

        <MenuMovil
          items={items}
          llamada={
            <BotonLlamada telefono={contacto.telefono} className={buttonVariants({ variant: "llamadaMenu" }) + " mt-5 tabular-nums"}>
              <Phone aria-hidden="true" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-6 flex-none" />
              <span>{telefonoVisible(contacto.telefono)}</span>
            </BotonLlamada>
          }
        />
      </div>
    </header>
  );
}
