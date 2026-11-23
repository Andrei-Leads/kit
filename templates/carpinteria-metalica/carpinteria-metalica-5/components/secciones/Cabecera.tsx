import Image from "next/image";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, telefonoVisible, type Ancla, type Imagen, type LineaHorario } from "@andrei-leads/core";

import { IconoWhatsapp } from "@/components/Iconos";
import { MenuPopover } from "@/components/base/MenuPopover";
import { llamarLargo } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  nombre: string;
  logo?: Imagen;
  telefono: string;
  whatsapp?: string;
  mensaje: string;
  enlaces: readonly Ancla[];
  horario: readonly LineaHorario[];
};

const COMPACTO = "boton min-h-11 px-4 lg:px-[18px] whitespace-nowrap";

/**
 * Cabecera (encargo §6.1 y ENTREGA): 56 px en móvil y 64 en escritorio, `sticky`, siempre en el
 * mismo estado (negro al 80 % con filete inferior). Nombre en versalitas a la izquierda (con
 * logo de 32 px y `alt=""`); en móvil [Llamar] [Menú]; en escritorio [WhatsApp] [Llamar · tel]
 * [Menú]. Con un nombre largo (más de 24 caracteres), la letra baja a 11 px y, por debajo de
 * 400 px, el [Llamar] de la cabecera se oculta (la barra móvil ya lo lleva) para que el nombre
 * quepa entero en los 56 px sin cortarse.
 */
export function Cabecera({ nombre, logo, telefono, whatsapp, mensaje, enlaces, horario }: Props) {
  const largo = nombre.length > 24;
  return (
    <header className="cabecera sticky top-0 z-30 border-b border-borde">
      <div className="mx-auto flex h-(--alto-cabecera) max-w-[1440px] items-center justify-between gap-3 pr-2 pl-5 lg:gap-6 lg:pr-10 lg:pl-16">
        <Link href="/" className="flex min-h-11 min-w-0 items-center gap-2 text-texto no-underline">
          {logo && <Image src={logo.src} alt="" width={32} height={32} className="size-8 flex-none object-contain" />}
          <span
            className={cn(
              "font-semibold uppercase",
              // El interlineado va pegado al tamaño (`/[1.15]`): cn() quita un `leading-*` suelto
              // cuando después viene un `text-[…]`.
              largo ? "text-[11px]/[1.15] tracking-[0.06em] lg:max-w-[40ch] lg:text-sm/[1.15] lg:tracking-[0.1em]" : "max-w-[16ch] text-sm/[1.15] tracking-[0.14em] lg:max-w-[28ch] lg:text-[15px]/[1.15] lg:tracking-[0.16em]",
            )}
          >
            {nombre}
          </span>
        </Link>
        <div className="flex flex-none items-center gap-1 lg:gap-3">
          {whatsapp && (
            <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(COMPACTO, "boton-anodizado hidden gap-2 lg:inline-flex")}>
              <IconoWhatsapp tamano={16} />
              WhatsApp
            </BotonWhatsApp>
          )}
          <BotonLlamada telefono={telefono} className={cn(COMPACTO, "boton-contorno", largo && "max-[399px]:hidden")}>
            <span className="lg:hidden">
              Llamar<span className="sr-only"> al {telefonoVisible(telefono)}</span>
            </span>
            <span className="hidden lg:inline">{llamarLargo(telefono)}</span>
          </BotonLlamada>
          <MenuPopover enlaces={enlaces} nombre={nombre} telefono={telefono} whatsapp={whatsapp} mensaje={mensaje} horario={horario} />
        </div>
      </div>
    </header>
  );
}
