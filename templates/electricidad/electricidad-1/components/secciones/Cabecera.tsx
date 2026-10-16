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
 * Tamaño del nombre según su longitud, para no romper la cabecera a 375 px (decisión de Ysst:
 * el nombre se muestra SIEMPRE escrito, en 2 líneas como máximo; el logo, si hay, va a la izquierda
 * a 32 px con alt="" y nunca sustituye al nombre).
 *   corto  (≤ 20 caracteres): 16 px.
 *   medio  (21–32):           14 px.
 *   largo  (> 32):            13 px y la llamada de la cabecera pasa a solo icono (< 640 px),
 *                             con «Llamar» como texto para lectores de pantalla.
 */
function claseNombre(nombre: string): { texto: string; largo: boolean } {
  if (nombre.length <= 20) return { texto: "text-base leading-[1.2]", largo: false };
  if (nombre.length <= 32) return { texto: "text-sm leading-[1.2]", largo: false };
  return { texto: "text-[13px] leading-[1.15]", largo: true };
}

/**
 * Cabecera sticky, blanca, con regla inferior de 1 px. Un único enlace a «/» con el logo
 * (opcional) y el nombre. Hasta 1023 px: nombre + Llamar + Menú (Sheet). Escritorio (lg):
 * nombre + enlaces + número en mono + Llamar.
 */
export function Cabecera({ nombre, logo, contacto, items }: Props) {
  const { texto, largo } = claseNombre(nombre);
  return (
    <header className="sticky top-0 z-30 border-b border-regla bg-papel">
      <div className="mx-auto flex min-h-[60px] w-full max-w-[1200px] items-center gap-3 px-5 py-2 md:px-12 lg:min-h-[72px]">
        <Link href="/" className="flex min-h-11 min-w-0 flex-1 items-center gap-2 text-tinta no-underline">
          {logo && (
            <Image
              src={logo.src}
              alt=""
              width={48}
              height={32}
              className="h-8 w-auto max-w-12 flex-none object-contain object-left"
            />
          )}
          <span className={cn("min-w-0 font-bold text-balance [overflow-wrap:anywhere] line-clamp-2 lg:text-lg", texto)}>
            {nombre}
          </span>
        </Link>

        <NavEscritorio items={items} />

        <BotonLlamada
          telefono={contacto.telefono}
          className="hidden font-mono text-[15px] font-medium text-tinta no-underline hover:underline hover:underline-offset-4 lg:flex lg:min-h-11 lg:items-center"
        >
          {telefonoVisible(contacto.telefono)}
        </BotonLlamada>
        <BotonLlamada
          telefono={contacto.telefono}
          className={cn(buttonVariants({ variant: "llamadaCabecera" }), largo && "max-sm:w-11 max-sm:justify-center max-sm:px-0")}
        >
          <Phone aria-hidden="true" strokeWidth={2} strokeLinejoin="round" className="size-[18px] flex-none" />
          <span className={largo ? "sr-only sm:not-sr-only" : undefined}>Llamar</span>
        </BotonLlamada>

        <MenuMovil items={items} telefono={contacto.telefono} />
      </div>
    </header>
  );
}
