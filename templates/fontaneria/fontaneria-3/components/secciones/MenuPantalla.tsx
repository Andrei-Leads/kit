import type { CSSProperties } from "react";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, type Ancla, type Imagen } from "@andrei-leads/core";
import { MessageCircle } from "lucide-react";

import { CerrarMenuAlSalir } from "@/components/CerrarMenuAlSalir";
import { ContenidoLlamada } from "@/components/Pareja";
import { Nombre } from "@/components/secciones/Nombre";
import { llamadaMenu, whatsappPagina } from "@/lib/botones";
import { cn } from "@/lib/utils";

export const ID_MENU = "menu";

type Props = {
  enlaces: readonly Ancla[];
  nombre: string;
  logo?: Imagen;
  telefono: string;
  whatsapp?: string;
  mensaje: string;
  textoLlamada: string;
};

/**
 * Sustituye a la pieza base `MenuPopover` (misma API `popover`): capa a pantalla
 * completa en arena, también en escritorio. Abre y cierra sin JavaScript, Esc
 * cierra y el navegador gestiona el foco. Entra con opacidad y 24 px
 * (globals.css; con «reducir movimiento», solo opacidad). La página actual
 * va en cursiva (marcador `data-pagina` de cada página, solo CSS). Con JS,
 * `CerrarMenuAlSalir` lo cierra si el foco sale de él con Tab (sin JS, igual).
 */
export function MenuPantalla({ enlaces, nombre, logo, telefono, whatsapp, mensaje, textoLlamada }: Props) {
  return (
    <div id={ID_MENU} popover="auto" className="menu-pantalla">
      <CerrarMenuAlSalir idMenu={ID_MENU} />
      <div className="contenedor flex items-center justify-between gap-3 py-[clamp(0.875rem,0.6rem+1vw,1.5rem)]">
        <Nombre nombre={nombre} logo={logo} />
        <button
          type="button"
          popoverTarget={ID_MENU}
          popoverTargetAction="hide"
          className="boton h-12 min-w-12 flex-none rounded-boton border-2 border-texto bg-superficie px-4 text-base leading-none font-bold"
        >
          Cerrar
        </button>
      </div>
      <nav aria-label="Principal" className="contenedor flex flex-1 flex-col justify-center py-[clamp(1rem,0.5rem+3vw,3rem)]">
        <ul className="m-0 flex list-none flex-col gap-[clamp(0rem,-0.2rem+1vw,0.75rem)] p-0">
          {enlaces.map((e, i) => (
            <li key={e.href} className="menu-enlace" style={{ "--i": i } as CSSProperties}>
              <Link
                href={e.href}
                data-ruta={e.href}
                className="inline-flex min-h-12 items-center font-titulo text-[clamp(3rem,2.2rem+4vw,5.5rem)] leading-[1.05] font-medium tracking-[-0.02em] no-underline hover:underline"
              >
                {e.texto}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="contenedor flex flex-wrap gap-3 pb-[clamp(1.25rem,1rem+2vw,3rem)]">
        <BotonLlamada telefono={telefono} className={llamadaMenu}>
          <ContenidoLlamada texto={textoLlamada} telefono={telefono} numeroTitulo />
        </BotonLlamada>
        {whatsapp && (
          <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(whatsappPagina, "max-w-[360px] flex-[1_1_14rem]")}>
            <MessageCircle aria-hidden="true" strokeWidth={2.2} className="size-[22px] flex-none" />
            Escribir por WhatsApp
          </BotonWhatsApp>
        )}
      </div>
    </div>
  );
}
