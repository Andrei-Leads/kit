import Image from "next/image";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, telefonoVisible, type Ancla, type SiteConfig } from "@andrei-leads/core";

import { MenuPopover } from "@/components/base/MenuPopover";
import { IconoTelefono, IconoWhatsApp } from "@/components/Iconos";
import { textoLlamar, textoLlamarCorto } from "@/lib/formato";

type Props = {
  negocio: Pick<SiteConfig["negocio"], "nombre" | "logo">;
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "urgencias24h">;
  items: Ancla[];
  mensaje: string;
};

/**
 * Cápsula flotante (cabecera): octógono blanco con borde tinta de 2 px, `position: sticky; top: 12px`
 * (sin JS). Móvil: nombre + «Menú» (popover) + llamada-capsula «Llamar 24 h». Desde 1024 px: nombre,
 * enlaces y «Llamar 24 h»; desde 1280 px, la llamada con el número y WhatsApp en contorno. Con logo, 32 px a la izquierda con alt=""
 * (el nombre escrito se ve siempre; con nombre largo, los botones bajan a una segunda fila).
 * El octógono recorta (clip-path) todo lo que sale de él: el anillo de foco va hacia dentro (en los
 * botones, sobre el <span> interior, porque el recorte del span taparía el del enlace).
 */
export function Capsula({ negocio, contacto, items, mensaje }: Props) {
  const nombre = (
    <Link href="/" className="flex min-h-11 min-w-0 flex-[1_1_auto] items-center gap-2 text-texto no-underline lg:flex-none lg:gap-2.5">
      {negocio.logo && (
        <Image src={negocio.logo.src} alt="" width={32} height={32} className="size-8 flex-none object-contain" />
      )}
      <span className="font-titulo text-[clamp(1rem,0.7rem+1.2vw,1.1875rem)] leading-[1.1] font-bold tracking-[-0.01em] lg:max-w-[240px] lg:text-xl">
        {negocio.nombre}
      </span>
    </Link>
  );
  return (
    <header className="sticky top-3 z-30 mx-3 mt-3 lg:mx-auto lg:flex lg:justify-center [&_:focus-visible]:outline-offset-[-3px]">
      <div className="octogono-10 bg-tinta p-0.5 lg:octogono-12">
        <div className="octogono-9 flex min-h-14 flex-wrap items-center gap-x-2 gap-y-1.5 bg-superficie py-1 pr-1 pl-3.5 lg:octogono-11 lg:min-h-[60px] lg:flex-nowrap lg:gap-4 lg:py-1.5 lg:pr-1.5 lg:pl-5">
          {nombre}
          <nav aria-label="Principal" className="hidden lg:flex">
            {items.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                className="flex min-h-11 items-center px-2.5 font-titulo text-base leading-none font-semibold text-texto no-underline decoration-2 underline-offset-[6px] hover:underline"
              >
                {e.texto}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex gap-1.5 lg:ml-0 lg:gap-2">
            <MenuPopover enlaces={items} id="menu" claseBoton="lg:hidden" />
            <BotonLlamada telefono={contacto.telefono} className="boton group block no-underline focus-visible:outline-none">
              <span className="corte-doble flex h-12 items-center gap-2 bg-primario px-4 font-titulo text-base leading-none font-bold whitespace-nowrap text-sobre-primario tabular-nums hover:bg-primario-hover group-focus-visible:outline-3 group-focus-visible:outline-offset-[-6px] group-focus-visible:outline-sobre-primario lg:px-[18px] lg:text-[17px]">
                <span className="hidden xl:contents">
                  <IconoTelefono />
                  {textoLlamar(contacto)}
                </span>
                <span className="xl:hidden">
                  {textoLlamarCorto(contacto)}
                  <span className="sr-only"> al {telefonoVisible(contacto.telefono)}</span>
                </span>
              </span>
            </BotonLlamada>
            {contacto.whatsapp && (
              <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensaje} className="boton group hidden no-underline focus-visible:outline-none xl:block">
                <span className="flex h-12 items-center gap-2 border-2 border-tinta bg-superficie px-4 font-titulo text-base leading-none font-semibold whitespace-nowrap text-texto hover:bg-primario-suave group-focus-visible:outline-3 group-focus-visible:outline-offset-[-7px] group-focus-visible:outline-foco">
                  <IconoWhatsApp />
                  WhatsApp
                </span>
              </BotonWhatsApp>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
