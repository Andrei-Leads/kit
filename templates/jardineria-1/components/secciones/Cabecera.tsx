import Image from "next/image";
import { BotonLlamada } from "@andrei-leads/core";

import { buttonVariants } from "@/components/ui/button";
import { contenedor } from "@/components/TituloSeccion";
import type { Ancla } from "@/lib/formato";
import { telefonoVisible } from "@/lib/formato";
import { cn } from "@/lib/utils";

type Props = {
  nombre: string;
  logo?: string;
  telefono: string;
  /** Solo secciones con datos (ver anclasMenu). */
  anclas: Ancla[];
};

export function Cabecera({ nombre, logo, telefono, anclas }: Props) {
  return (
    <header className="sticky top-0 z-20 border-b-2 border-tinta bg-papel">
      <div className={cn(contenedor, "flex min-h-16 items-center justify-between gap-4 py-2")}>
        <a
          href="#inicio"
          className="flex min-h-11 min-w-0 items-center gap-3 text-[22px] leading-none font-extrabold tracking-[0.01em] text-balance text-tinta uppercase no-underline font-stretch-68%"
        >
          {logo && (
            <Image src={logo} alt="" width={160} height={40} className="h-10 w-auto flex-none" />
          )}
          <span>{nombre}</span>
        </a>

        <nav aria-label="Secciones" className="ml-auto hidden items-center gap-1 lg:flex">
          {anclas.map((a) => (
            <a
              key={a.href}
              href={a.href}
              className="flex min-h-11 items-center px-3 text-[15px] font-semibold text-tinta no-underline underline-offset-4 hover:underline"
            >
              {a.texto}
            </a>
          ))}
        </nav>

        <BotonLlamada
          telefono={telefono}
          className={cn(buttonVariants({ variant: "primario", size: "sm" }), "flex-none text-base font-bold")}
        >
          <span>Llamar</span>
          <span className="hidden text-[19px] font-extrabold tracking-[0.02em] font-stretch-75% lg:inline">
            {telefonoVisible(telefono)}
          </span>
        </BotonLlamada>
      </div>
    </header>
  );
}
