import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BotonLlamada, BotonWhatsApp, telefonoVisible, type Ancla, type Imagen } from "@andrei-leads/core";

import { CabeceraScroll } from "@/components/cliente/CabeceraScroll";
import { IconoWhatsapp } from "@/components/Iconos";
import { MenuPopover } from "@/components/base/MenuPopover";
import { TEXTO_WA_CORTO } from "@/lib/mensajes";
import { textoLlamar } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  nombre: string;
  logo?: Imagen;
  telefono: string;
  whatsapp?: string;
  mensaje: string;
  enlaces: readonly Ancla[];
  /** Pareja de CTAs del menú abierto. */
  pieMenu: ReactNode;
};

const COMPACTO = "boton min-h-12 px-4 lg:px-5 whitespace-nowrap";

/**
 * Cabecera inteligente (encargo §6 y §12): 56 px en móvil (nombre, «Llamar» y «Menú») y
 * 72 px en escritorio («Escribir por WhatsApp», «Llamar al …» y «Menú»). Transparente
 * sobre el hero y con fondo al pasar 200 px (CSS); se esconde al bajar solo desde
 * 1024 px. Los botones cambian de variante con el tono y nunca bajan de 48 px.
 */
export function Cabecera({ nombre, logo, telefono, whatsapp, mensaje, enlaces, pieMenu }: Props) {
  const largo = nombre.length > 26;
  return (
    <header className="cabecera fixed inset-x-0 top-0 z-30 isolate">
      <div aria-hidden="true" className="cabecera-fondo" />
      <div className="cabecera-fila contenedor flex h-full items-center justify-between gap-3 lg:gap-4">
        <Link href="/" className="cabecera-nombre flex min-h-11 min-w-0 items-center gap-2.5 text-current no-underline">
          {logo && <Image src={logo.src} alt="" width={32} height={32} className="size-8 flex-none object-contain" />}
          <span className={cn("fino line-clamp-2 text-[17px] leading-[1.15] tracking-[-0.01em] lg:text-xl", largo && "max-lg:text-[15px]")}>{nombre}</span>
        </Link>
        <div className="flex flex-none items-center gap-1 lg:gap-3">
          {whatsapp && (
            <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(COMPACTO, "cab-wa hidden lg:inline-flex")}>
              <IconoWhatsapp tamano={18} />
              {TEXTO_WA_CORTO}
            </BotonWhatsApp>
          )}
          <BotonLlamada telefono={telefono} className={cn(COMPACTO, "cab-llamar")}>
            <span className="lg:hidden">
              Llamar<span className="sr-only"> al {telefonoVisible(telefono)}</span>
            </span>
            <span className="hidden lg:inline">{textoLlamar(telefono)}</span>
          </BotonLlamada>
          <MenuPopover enlaces={enlaces} nombre={nombre} pie={pieMenu} />
        </div>
      </div>
      <CabeceraScroll />
    </header>
  );
}
