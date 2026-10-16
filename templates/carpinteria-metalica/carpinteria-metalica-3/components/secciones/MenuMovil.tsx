"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Ancla } from "@/lib/formato";

type Props = {
  items: Ancla[];
  /**
   * El `BotonLlamada` del panel, ya renderizado por el servidor (Cabecera). Este archivo es
   * "use client": si importara un valor de `@andrei-leads/core` (o de `lib/formato`, que lo
   * importa), arrastraría zod y el contrato entero al JavaScript de todas las páginas.
   */
  llamada: ReactNode;
};

/** Menú móvil: botón «Menú» + panel derecho con enlaces y la llamada anclada abajo. */
export function MenuMovil({ items, llamada }: Props) {
  const [abierto, setAbierto] = useState(false);

  return (
    <Sheet open={abierto} onOpenChange={setAbierto}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="inline-flex min-h-11 flex-none cursor-pointer items-center gap-1.5 rounded-md border-2 border-tinta bg-tarjeta px-3 font-bold text-tinta md:hidden"
        >
          <Menu aria-hidden="true" className="size-5" />
          <span>Menú</span>
        </button>
      </SheetTrigger>
      <SheetContent aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle>Menú</SheetTitle>
        </SheetHeader>
        <nav aria-label="Principal" className="flex flex-col px-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setAbierto(false)}
              className="flex min-h-14 items-center justify-between border-b border-linea text-xl font-bold text-tinta no-underline"
            >
              <span>{item.texto}</span>
              <ArrowRight aria-hidden="true" className="size-5" />
            </Link>
          ))}
        </nav>
        <div className="mt-auto p-4">
          {llamada}
        </div>
      </SheetContent>
    </Sheet>
  );
}
