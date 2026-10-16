"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Ancla } from "@/lib/formato";
import { etiquetaCampo } from "@/lib/estilos";

/** "page" si es la ruta exacta, "true" si estamos dentro de la sección (p. ej. /servicios/x). */
function actual(pathname: string, href: string): "page" | "true" | undefined {
  if (pathname === href) return "page";
  return pathname.startsWith(href + "/") ? "true" : undefined;
}

/** Enlaces del menú en escritorio (desde 1024 px). El activo lleva regla inferior de 2 px. */
export function NavEscritorio({ items }: { items: Ancla[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Principal" className="mr-3 hidden gap-7 lg:flex">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={actual(pathname, item.href)}
          className="flex min-h-11 items-center text-[15px] font-medium text-tinta no-underline hover:underline hover:underline-offset-4 aria-[current]:shadow-[inset_0_-2px_0_var(--color-tinta)]"
        >
          {item.texto}
        </Link>
      ))}
    </nav>
  );
}

type Props = {
  items: Ancla[];
  /**
   * El `BotonLlamada` del panel, ya renderizado por el servidor (Cabecera). Este archivo es
   * "use client": si importara un valor de `@andrei-leads/core` (o de `lib/formato`, que lo
   * importa), arrastraría zod y el contrato entero al JavaScript de todas las páginas.
   */
  llamada: ReactNode;
};

/**
 * Menú móvil (hasta 1023 px): cuadrado de 44 px + Sheet a la derecha con los enlaces y la llamada.
 * Accesible: el disparador lleva aria-expanded (Radix), el foco queda atrapado y vuelve al botón,
 * Esc cierra. El nombre accesible del botón es el texto «Menú» (sr-only), no un aria-label.
 */
export function MenuMovil({ items, llamada }: Props) {
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
          <Menu aria-hidden="true" strokeWidth={2} strokeLinecap="square" className="size-5" />
          <span className="sr-only">Menú</span>
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
              className="flex min-h-14 items-center justify-between border-b border-regla font-mono text-[19px] font-bold text-tinta no-underline aria-[current]:shadow-[inset_3px_0_0_var(--color-primario)] aria-[current]:pl-3"
            >
              <span>{item.texto}</span>
              <ArrowRight aria-hidden="true" strokeWidth={2} strokeLinecap="square" className="size-[18px] flex-none" />
            </Link>
          ))}
        </nav>
        <div className="mt-6 flex flex-col gap-1">
          <span className={etiquetaCampo}>Llamar</span>
          {llamada}
        </div>
      </SheetContent>
    </Sheet>
  );
}
