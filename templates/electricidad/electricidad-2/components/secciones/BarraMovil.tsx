"use client";

import { useRef, useState } from "react";
import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";
import { Menu, MessageCircle, Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import type { Ancla } from "@/lib/formato";
import { textos } from "@/lib/textos";
import { MenuMovil } from "./MenuMovil";

type Props = {
  items: Ancla[];
  telefono: string;
  whatsapp?: string;
  /** Mensaje general en todas las páginas (decisión 5 de Ysst). */
  mensaje: string;
  email: string;
  horario: { dias: string; horas: string }[];
};

/**
 * Barra combinada (solo < 1024 px, Specs §6): [Menú 64 px] [Llamar] [WhatsApp], 64 px + área segura.
 * Sin WhatsApp: [Menú] + Llamar a todo el ancho restante. Sticky y último hijo del body: flota sobre el
 * contenido y, al final, queda debajo del pie sin taparlo. Entra con translateY al cargar (animate-barra:
 * CSS puro; con «reducir movimiento» está visible desde el inicio).
 * «Menú» abre la hoja inferior (MenuMovil, Sheet de shadcn/Radix): aria-expanded y aria-controls en el
 * botón, foco atrapado, Esc cierra y el foco vuelve al botón. Ningún botón lleva aria-label: el nombre
 * accesible es el texto visible.
 */
export function BarraMovil({ items, telefono, whatsapp, mensaje, email, horario }: Props) {
  const [abierta, setAbierta] = useState(false);
  // Si la hoja se cierra al navegar, el foco no debe volver al botón Menú.
  const navegando = useRef(false);

  return (
    <Sheet open={abierta} onOpenChange={setAbierta}>
      <nav
        aria-label="Acciones"
        className="animate-barra sticky bottom-0 z-30 flex gap-2 bg-white px-2 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] shadow-barra lg:hidden"
      >
        <SheetTrigger asChild>
          <button type="button" className={buttonVariants({ variant: "barraMenu" })}>
            <Menu aria-hidden="true" strokeWidth={1.75} strokeLinecap="round" className="size-[22px]" />
            <span>{textos.menu}</span>
          </button>
        </SheetTrigger>
        <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "barraLlamar" })}>
          <Phone aria-hidden="true" strokeWidth={2} strokeLinejoin="round" className="size-5 flex-none" />
          <span>{textos.llamar}</span>
        </BotonLlamada>
        {whatsapp && (
          <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={buttonVariants({ variant: "barraWhatsapp" })}>
            <MessageCircle aria-hidden="true" strokeWidth={1.75} strokeLinejoin="round" className="size-5 flex-none" />
            <span>{textos.whatsapp}</span>
          </BotonWhatsApp>
        )}
      </nav>
      <MenuMovil
        items={items}
        telefono={telefono}
        email={email}
        horario={horario}
        alNavegar={() => {
          navegando.current = true;
          setAbierta(false);
        }}
        alCerrarFoco={(e) => {
          if (navegando.current) {
            e.preventDefault();
            navegando.current = false;
          }
        }}
      />
    </Sheet>
  );
}
