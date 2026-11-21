import Image from "next/image";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, telefonoVisible, type Ancla, type SiteConfig } from "@andrei-leads/core";

import { MenuPopover } from "@/components/base/MenuPopover";
import { PASTILLA } from "@/components/Botones";
import { NavEscritorio } from "@/components/secciones/NavEscritorio";
import { IconoCamara, IconoTelefono } from "@/components/Iconos";
import { llamarConNumero, llamarCorto } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  negocio: Pick<SiteConfig["negocio"], "nombre" | "logo">;
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "urgencias24h">;
  items: Ancla[];
  mensaje: string;
};

/**
 * Cápsula flotante (sticky, sin JS). Móvil: nombre (o logo + nombre) · llamada-capsula (icono +
 * «Llamar» a 14 px) · «Menú» (popover que cae bajo la cápsula). Desde 1024 px: nombre, enlaces,
 * WhatsApp con cámara y «Llamar · número». El nombre se ve siempre entero (hasta 2 líneas); por
 * eso la cápsula usa radio de 28 px y no 999 px. Al bajar, se encoge a 0,96 (scroll-timeline).
 */
export function Cabecera({ negocio, contacto, items, mensaje }: Props) {
  // Nombre largo: en móvil ocupa la primera fila entera (hasta 2 líneas) y los botones bajan a la segunda.
  const largo = negocio.nombre.length > 26;
  return (
    <header className="sticky top-0 z-30 px-3 pt-2.5 lg:px-[clamp(16px,4vw,48px)] lg:pt-4">
      <div className="capsula mx-auto flex max-w-(--container-contenido) flex-wrap items-center gap-x-1.5 gap-y-1 rounded-[28px] border border-linea bg-superficie py-1.5 pr-1.5 pl-[18px] shadow-capsula lg:flex-nowrap lg:gap-5 lg:rounded-boton lg:py-2 lg:pr-2 lg:pl-[26px]">
        <Link href="/" className={cn("flex min-h-11 min-w-0 flex-1 items-center gap-2 text-texto no-underline lg:max-w-[320px] lg:flex-none", largo && "basis-full lg:basis-auto")}>
          {negocio.logo && <Image src={negocio.logo.src} alt="" width={32} height={32} className="size-8 flex-none object-contain" />}
          <span className="text-[15px] leading-[1.15] font-black break-words hyphens-auto lg:text-[19px]">{negocio.nombre}</span>
        </Link>
        <NavEscritorio items={items} />
        {largo && <span aria-hidden="true" className="flex-1 lg:hidden" />}
        {contacto.whatsapp && (
          <BotonWhatsApp
            numero={contacto.whatsapp}
            mensaje={mensaje}
            className={cn(PASTILLA, "hidden min-h-11 flex-none border-[1.5px] border-borde bg-superficie px-[18px] text-[15px] hover:bg-burbuja-sale lg:inline-flex")}
          >
            <IconoCamara tamano={17} />
            WhatsApp
          </BotonWhatsApp>
        )}
        <BotonLlamada
          telefono={contacto.telefono}
          className={cn(PASTILLA, "min-h-11 flex-none gap-1.5 bg-primario px-[15px] text-sm whitespace-nowrap text-sobre-primario hover:bg-primario-hover lg:min-h-12 lg:gap-2 lg:px-[22px] lg:text-base")}
        >
          <IconoTelefono tamano={16} />
          <span className="lg:hidden">
            {llamarCorto(contacto)}
            <span className="sr-only"> al {telefonoVisible(contacto.telefono)}</span>
          </span>
          <span className="hidden lg:inline">{llamarConNumero(contacto)}</span>
        </BotonLlamada>
        <MenuPopover enlaces={[{ href: "/", texto: "Inicio" }, ...items]} claseBoton="lg:hidden" className={cn("lg:hidden", largo && "top-[8.5rem]")} />
      </div>
    </header>
  );
}
