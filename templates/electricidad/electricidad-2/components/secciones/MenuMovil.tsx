"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { SheetContent, SheetTitle } from "@/components/ui/sheet";
import type { Ancla } from "@/lib/formato";
import { textos } from "@/lib/textos";
import { actual } from "./NavEscritorio";

type Props = {
  items: Ancla[];
  /** `BotonLlamada` «Llámanos: …», renderizado por el servidor (ver BarraMovil). */
  llamada: ReactNode;
  email: string;
  /** Líneas de `horarioVisible` (formatearHorario + «Urgencias: 24 h» si procede). */
  horario: { dias: string; horas: string }[];
  /** Se llama al navegar con un enlace de la hoja: el foco no debe volver al botón Menú. */
  alNavegar: () => void;
  alCerrarFoco: (e: Event) => void;
};

/**
 * Hoja del menú (Sheet inferior, Specs §6): corte arriba, botón «Cerrar» primero (recibe el foco), rutas
 * en serif de 24 px a ≥ 56 px de alto, `llamada-acento` con el número, horario con `formatearHorario` y email.
 * Radix da foco atrapado, Esc y devolución del foco al botón Menú (aria-expanded en el disparador).
 */
export function MenuMovil({ items, llamada, email, horario, alNavegar, alCerrarFoco }: Props) {
  const pathname = usePathname();
  return (
    <SheetContent aria-describedby={undefined} onCloseAutoFocus={alCerrarFoco}>
      <SheetTitle>{textos.menu}</SheetTitle>
      <nav aria-label="Menú móvil">
        <ul className="m-0 mb-5 list-none p-0">
          {items.map((item) => (
            <li key={item.href} className="border-b border-linea-suave">
              <Link
                href={item.href}
                onClick={alNavegar}
                aria-current={actual(pathname, item.href)}
                className="flex min-h-14 items-center justify-between font-serif text-2xl text-tinta no-underline aria-[current]:font-semibold"
              >
                <span>{item.texto}</span>
                <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-5 flex-none text-tinta-suave" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {llamada}
      <div className="mt-5 flex flex-col text-base text-tinta-suave">
        {horario.map((h) => (
          <span key={h.dias} className="py-0.5">
            {h.dias}: {h.horas}
          </span>
        ))}
        <a
          href={`mailto:${email}`}
          className="mt-1 flex min-h-11 items-center font-semibold text-tinta underline underline-offset-4 [overflow-wrap:anywhere]"
        >
          {email}
        </a>
      </div>
    </SheetContent>
  );
}
