"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BotonLlamada } from "@andrei-leads/core";
import { Menu, Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { telefonoVisible, type Ancla } from "@/lib/formato";

/** "page" si es la ruta exacta, "true" si estamos dentro de la sección (p. ej. /servicios/x). */
function actual(pathname: string, href: string): "page" | "true" | undefined {
  if (pathname === href) return "page";
  return pathname.startsWith(href + "/") ? "true" : undefined;
}

/** Enlaces del menú en escritorio (desde 1024 px). Texto suave; el activo, en --color-texto y subrayado. */
export function NavEscritorio({ items }: { items: Ancla[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Principal" className="mr-3 hidden gap-7 lg:flex">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={actual(pathname, item.href)}
          className="flex min-h-11 items-center text-base font-semibold text-texto-suave no-underline hover:text-texto aria-[current]:text-texto aria-[current]:underline aria-[current]:decoration-2 aria-[current]:underline-offset-8"
        >
          {item.texto}
        </Link>
      ))}
    </nav>
  );
}

type Props = {
  items: Ancla[];
  telefono: string;
};

/**
 * Menú móvil (hasta 1023 px): botón de 44 px + Sheet a la derecha con los enlaces y la llamada.
 * Accesible: el disparador lleva aria-expanded (Radix), el foco queda atrapado y vuelve al botón,
 * Esc cierra. El nombre accesible del botón es el texto «Abrir menú» (sr-only), no un aria-label.
 */
export function MenuMovil({ items, telefono }: Props) {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);
  // Si el panel se cierra al navegar, el foco no debe volver al botón del menú.
  const navegando = useRef(false);

  function navegar() {
    navegando.current = true;
    setAbierto(false);
  }

  return (
    <Sheet open={abierto} onOpenChange={setAbierto}>
      <SheetTrigger asChild>
        <button type="button" className={buttonVariants({ variant: "menu" }) + " lg:hidden"}>
          <Menu aria-hidden="true" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-[22px]" />
          <span className="sr-only">Abrir menú</span>
        </button>
      </SheetTrigger>
      <SheetContent
        aria-describedby={undefined}
        onCloseAutoFocus={(e) => {
          if (navegando.current) {
            e.preventDefault();
            navegando.current = false;
          }
        }}
      >
        <SheetHeader>
          <SheetTitle>Menú</SheetTitle>
        </SheetHeader>
        <nav aria-label="Menú móvil" className="flex flex-col">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={navegar}
              aria-current={actual(pathname, item.href)}
              className="flex min-h-14 items-center border-b border-linea text-xl font-semibold text-texto no-underline aria-[current]:border-l-[3px] aria-[current]:border-l-texto aria-[current]:pl-3"
            >
              {item.texto}
            </Link>
          ))}
        </nav>
        <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "llamadaMenu" }) + " mt-5 tabular-nums"}>
          <Phone aria-hidden="true" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-6 flex-none" />
          <span>{telefonoVisible(telefono)}</span>
        </BotonLlamada>
      </SheetContent>
    </Sheet>
  );
}
