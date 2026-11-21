import Image from "next/image";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, telefonoVisible, type Ancla, type Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

import { IconoTelefono, IconoWhatsApp } from "./Iconos";

type Props = {
  nombre: string;
  logo?: Imagen;
  telefono: string;
  whatsapp?: string;
  mensaje: string;
  textoLlamar: string;
  rutas: readonly Ancla[];
  /** Ruta de la sección actual («/servicios» también en sus fichas); sin ella, ninguna marcada. */
  actual?: string;
};

/**
 * Cabecera fija: 56 px en móvil (nombre + `llamada-cabecera`; sin menú, que vive en la barra) y 72 px
 * desde 1024 px (menú clásico + llamada con número + `whatsapp-cabecera`). El nombre ocupa 2 líneas
 * como máximo y nunca se corta; con logo, el logo de 32 px va a su izquierda con alt="".
 */
export function Cabecera({ nombre, logo, telefono, whatsapp, mensaje, textoLlamar, rutas, actual }: Props) {
  return (
    <header className="sticky top-0 z-20 border-b border-borde bg-fondo">
      <div className="mx-auto flex min-h-14 max-w-[1200px] items-center gap-3 px-[clamp(16px,4vw,40px)] py-1 lg:min-h-[72px] lg:gap-6">
        <Link href="/" className="flex min-h-11 min-w-0 flex-[1_1_auto] items-center gap-2.5 text-texto">
          {logo ? (
            <Image src={logo.src} alt="" width={32} height={32} className="size-8 flex-none object-contain" />
          ) : (
            <span aria-hidden="true" className="size-2.5 flex-none bg-primario" />
          )}
          {/* Nombres largos (> 28 caracteres) a 13 px en móvil y 16 px hasta 1280: caben en 2 líneas junto al logo, el menú y la llamada. */}
          <span className={cn("condensada tracking-[0.02em] uppercase", nombre.length > 28 ? "text-[0.8125rem] sm:text-base xl:text-xl" : "text-base lg:text-xl", "leading-[1.05]")}>
            {nombre}
          </span>
        </Link>
        <nav aria-label="Principal" className="hidden gap-7 lg:flex">
          {rutas.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              aria-current={r.href === actual ? "page" : undefined}
              className="border-b-3 border-transparent py-3 text-[0.9375rem] font-medium hover:border-primario-luz hover:text-primario-luz aria-[current=page]:border-primario-luz aria-[current=page]:text-primario-luz"
            >
              {r.texto}
            </Link>
          ))}
        </nav>
        <div className="flex flex-none gap-2">
          <BotonLlamada telefono={telefono} className="boton-laton condensada flex h-12 items-center gap-2 px-3 text-[1.1875rem] sm:px-4 leading-none whitespace-nowrap">
            <IconoTelefono tam={18} />
            {textoLlamar}
            {/* El número, desde 640 px; entre 1024 y 1280 se oculta para dejar sitio al menú y al nombre. */}
            <span className="hidden sm:inline lg:hidden xl:inline">· {telefonoVisible(telefono)}</span>
          </BotonLlamada>
          {whatsapp && (
            <BotonWhatsApp
              numero={whatsapp}
              mensaje={mensaje}
              className="boton-contorno hidden h-12 items-center gap-2 px-3.5 text-[0.9375rem] font-bold whitespace-nowrap text-texto lg:flex"
            >
              <IconoWhatsApp tam={18} />
              WhatsApp
            </BotonWhatsApp>
          )}
        </div>
      </div>
    </header>
  );
}
