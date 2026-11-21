import Image from "next/image";
import Link from "next/link";
import type { Ancla, SiteConfig } from "@andrei-leads/core";

import { LlamadaPlaca, WhatsAppLinea } from "@/components/Botones";
import { cn } from "@/lib/utils";

type Props = {
  negocio: Pick<SiteConfig["negocio"], "nombre" | "logo">;
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "urgencias24h">;
  items: Ancla[];
  mensaje: string;
};

/**
 * Cabecera (encargo §5.1): 56 px, nombre (o logo + nombre) a 18 px en condensada (parte en 2 líneas,
 * nunca se trunca ni compite con el número) y `llamada-placa` «Llamar» a la derecha (la barra lleva «Llamar 24 h»). Por debajo de 1024 px no
 * lleva menú: «Menú» está en la barra combinada. Desde 1024 px: enlaces en línea, «Llamar · número» y
 * WhatsApp con icono. Debajo, la cinta de señalización de 6 px.
 */
export function Cabecera({ negocio, contacto, items, mensaje }: Props) {
  return (
    <header className="bg-fondo">
      <div className="contenedor flex min-h-14 items-center justify-between gap-3 py-1.5 lg:min-h-24 lg:gap-6">
        <Link href="/" className="foco flex min-h-11 min-w-0 items-center gap-2.5 text-texto no-underline">
          {negocio.logo && (
            <Image src={negocio.logo.src} alt="" width={32} height={32} className="size-8 flex-none object-contain" />
          )}
          <span
            className={cn(
              "condensada max-w-[12.5rem] uppercase lg:max-w-[16rem]",
              // Nombres largos («Instalaciones Eléctricas Hermanos…»): 15 px en móvil para no pasar de 2 líneas.
              negocio.nombre.length > 28 ? "text-[0.9375rem] sm:text-lg" : "text-lg",
              "leading-[1.02] lg:text-xl lg:leading-[1.02]",
            )}
          >
            {negocio.nombre}
          </span>
        </Link>
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="foco flex min-h-11 items-center px-2.5 font-semibold text-texto no-underline hover:underline hover:decoration-primario hover:decoration-[3px] hover:underline-offset-8">
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-none items-center gap-4">
          <LlamadaPlaca contacto={contacto} texto="Llamar" className="lg:hidden" />
          <LlamadaPlaca contacto={contacto} conNumero className="hidden min-h-12 px-5 lg:inline-flex" />
          <WhatsAppLinea numero={contacto.whatsapp} mensaje={mensaje} texto="WhatsApp" className="hidden min-h-12 lg:flex" />
        </div>
      </div>
      <div aria-hidden="true" className="cinta" />
    </header>
  );
}
