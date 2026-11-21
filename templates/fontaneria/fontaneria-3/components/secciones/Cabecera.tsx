import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, telefonoVisible, type Imagen } from "@andrei-leads/core";
import { MessageCircle, Phone } from "lucide-react";

import { ID_MENU } from "@/components/secciones/MenuPantalla";
import { Nombre } from "@/components/secciones/Nombre";
import { llamadaCabecera, whatsappCabecera } from "@/lib/botones";

type Props = {
  nombre: string;
  logo?: Imagen;
  telefono: string;
  whatsapp?: string;
  mensaje: string;
  urgencias24h: boolean;
};

/**
 * Cabecera: nombre a la izquierda; a la derecha, llamada-cabecera («Llamar» en
 * móvil; «Llamar 24 h · {número}» desde 1024 px), WhatsApp (≥ 1024 px) y el
 * botón «Menú» que abre el menú a pantalla completa. Sólida sobre la arena o
 * transparente sobre una foto a sangre: lo decide globals.css (`.cabecera`).
 */
export function Cabecera({ nombre, logo, telefono, whatsapp, mensaje, urgencias24h }: Props) {
  return (
    <header className="cabecera">
      <div className="contenedor flex items-center justify-between gap-3 py-[clamp(0.875rem,0.6rem+1vw,1.5rem)]">
        <Link href="/" className="inline-flex min-h-12 min-w-0 items-center no-underline">
          <Nombre nombre={nombre} logo={logo} />
        </Link>
        <div className="flex flex-none items-center gap-1.5 sm:gap-2">
          <BotonLlamada telefono={telefono} className={llamadaCabecera}>
            <Phone aria-hidden="true" strokeWidth={2.2} className="-mr-0.5 size-[18px] flex-none" />
            <span className="lg:hidden">Llamar</span>
            <span className="hidden lg:inline">
              {urgencias24h ? "Llamar 24 h" : "Llamar"} · {telefonoVisible(telefono)}
            </span>
          </BotonLlamada>
          {whatsapp && (
            <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={whatsappCabecera}>
              <MessageCircle aria-hidden="true" strokeWidth={2.2} className="size-[18px] flex-none" />
              Escribir por WhatsApp
            </BotonWhatsApp>
          )}
          <button
            type="button"
            popoverTarget={ID_MENU}
            className="boton h-12 min-w-12 rounded-boton border-2 border-current bg-transparent px-3 text-base leading-none font-bold sm:px-3.5"
          >
            Menú
          </button>
        </div>
      </div>
    </header>
  );
}
