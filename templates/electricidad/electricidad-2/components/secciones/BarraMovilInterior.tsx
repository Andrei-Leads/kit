"use client";

import { useRef, useState, type ReactNode } from "react";
import { Menu } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import type { Ancla } from "@/lib/formato";
import { textos } from "@/lib/textos";
import { MenuMovil } from "./MenuMovil";

type Props = {
  items: Ancla[];
  /** `BotonLlamada` de la barra, ya renderizado por el servidor (BarraMovil). */
  llamada: ReactNode;
  /** `BotonWhatsApp` de la barra (o nada, si no hay WhatsApp), renderizado por el servidor. */
  whatsapp?: ReactNode;
  /** `BotonLlamada` de la hoja del menú, renderizado por el servidor. */
  llamadaMenu: ReactNode;
  email: string;
  horario: { dias: string; horas: string }[];
};

/**
 * Parte cliente de BarraMovil (estado de la hoja). Los botones de contacto llegan ya renderizados
 * desde el servidor: un archivo "use client" no debe importar valores de `@andrei-leads/core`
 * (arrastraría zod y el contrato al JavaScript de todas las páginas).
 *
 * Barra combinada (solo < 1024 px, Specs §6): [Menú 64 px] [Llamar] [WhatsApp], 64 px + área segura.
 * Sin WhatsApp: [Menú] + Llamar a todo el ancho restante. Sticky y último hijo del body: flota sobre el
 * contenido y, al final, queda debajo del pie sin taparlo. Entra con translateY al cargar (animate-barra:
 * CSS puro; con «reducir movimiento» está visible desde el inicio).
 * «Menú» abre la hoja inferior (MenuMovil, Sheet de shadcn/Radix): aria-expanded y aria-controls en el
 * botón, foco atrapado, Esc cierra y el foco vuelve al botón. Ningún botón lleva aria-label: el nombre
 * accesible es el texto visible.
 */
export function BarraMovilInterior({ items, llamada, whatsapp, llamadaMenu, email, horario }: Props) {
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
        {llamada}
        {whatsapp}
      </nav>
      <MenuMovil
        items={items}
        llamada={llamadaMenu}
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
