import Image from "next/image";
import Link from "next/link";
import { BotonLlamada, type Imagen, type SiteConfig } from "@andrei-leads/core";
import { Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { telefonoVisible, type Ancla } from "@/lib/formato";
import { textos } from "@/lib/textos";
import { cn } from "@/lib/utils";
import { NavEscritorio } from "./NavEscritorio";

type Props = {
  nombre: string;
  logo?: Imagen;
  contacto: Pick<SiteConfig["contacto"], "telefono">;
  items: Ancla[];
};

/*
 * Tamaño del nombre según su longitud, para no romper la cabecera a 375 px (decisión 1 de Ysst: el
 * nombre se muestra SIEMPRE escrito, en 2 líneas como máximo; nunca «…»; el logo, si hay, va a la
 * izquierda a 32 px con alt="" y nunca sustituye al nombre; sin variante «solo logo»).
 *   ≤ 30 caracteres:  20 px.
 *   31–44:            16 px y huecos de la cabecera y relleno de «Llamar» de 12 px (Specs §2).
 *   45–58:            14 px y la llamada pasa a solo icono (44 × 44) por debajo de 640 px, con
 *                     «Llamar» como texto para lectores de pantalla.
 *   > 58:             13 px, mismo reparto. Si aun así no cabe en 2 líneas, la cabecera crece
 *                     (min-height, no height): nunca se recorta con «…».
 */
function claseNombre(nombre: string) {
  if (nombre.length <= 30) return { texto: "text-xl leading-[1.15]", compacto: false, soloIcono: false };
  if (nombre.length <= 44) return { texto: "text-base leading-[1.15]", compacto: true, soloIcono: false };
  if (nombre.length <= 58) return { texto: "text-sm leading-[1.15]", compacto: true, soloIcono: true };
  return { texto: "text-[13px] leading-[1.15]", compacto: true, soloIcono: true };
}

/**
 * Cabecera sticky sobre piedra con línea inferior. Móvil (hasta 1023 px): [logo] nombre + `llamada-cabecera`,
 * SIN hamburguesa (el menú vive en la barra combinada del pie, ver BarraMovil). Escritorio (lg): nombre,
 * rutas, número en texto y `llamada-cabecera`. Todo teléfono pasa por BotonLlamada de core.
 */
export function Cabecera({ nombre, logo, contacto, items }: Props) {
  const { texto, compacto, soloIcono } = claseNombre(nombre);
  return (
    <header className="sticky top-0 z-30 border-b border-linea-suave bg-piedra">
      <div
        className={cn(
          "mx-auto flex min-h-16 w-full max-w-[1280px] items-center gap-6 px-5 py-2.5 lg:px-12",
          compacto && "max-lg:gap-3"
        )}
      >
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
          <span className={cn("min-w-0 font-serif font-semibold text-balance [overflow-wrap:anywhere]", texto)}>
            {nombre}
          </span>
        </Link>

        <NavEscritorio items={items} />

        <BotonLlamada
          telefono={contacto.telefono}
          className="hidden min-h-11 items-center text-lg font-bold whitespace-nowrap text-tinta no-underline hover:underline hover:underline-offset-4 lg:flex"
        >
          {telefonoVisible(contacto.telefono)}
        </BotonLlamada>
        <BotonLlamada
          telefono={contacto.telefono}
          className={cn(
            buttonVariants({ variant: "llamadaCabecera" }),
            compacto && "max-lg:px-3",
            soloIcono && "max-sm:w-11 max-sm:justify-center max-sm:px-0"
          )}
        >
          <Phone aria-hidden="true" strokeWidth={2} strokeLinejoin="round" className="size-[18px] flex-none" />
          <span className={soloIcono ? "sr-only sm:not-sr-only" : undefined}>{textos.llamar}</span>
        </BotonLlamada>
      </div>
    </header>
  );
}
