import Image from "next/image";
import Link from "next/link";
import { BotonLlamada, type Imagen } from "@andrei-leads/core";
import { Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { telefonoVisible, type Ancla } from "@/lib/formato";
import { MenuMovil } from "./MenuMovil";

type Props = {
  nombre: string;
  logo?: Imagen;
  telefono: string;
  items: Ancla[];
};

/** Cabecera fija. Un único bloque nombre (+ logo opcional a su izquierda) enlaza a «/». */
export function Cabecera({ nombre, logo, telefono, items }: Props) {
  return (
    <header className="sticky top-0 z-20 border-b border-linea bg-tarjeta">
      <div className="contenedor flex min-h-16 items-center gap-2.5 py-2">
        <Link
          href="/"
          className="flex min-h-11 min-w-0 flex-1 items-center gap-2.5 text-tinta no-underline"
        >
          {logo && (
            <Image
              src={logo.src}
              alt=""
              width={160}
              height={44}
              className="h-9 w-auto max-w-24 flex-none object-contain md:h-11 md:max-w-40"
            />
          )}
          <span className="min-w-0 text-[18px] leading-[1.15] font-extrabold text-balance">
            {nombre}
          </span>
        </Link>
        <nav aria-label="Principal" className="hidden gap-1 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-11 items-center px-3.5 font-semibold text-tinta no-underline hover:underline hover:underline-offset-4"
            >
              {item.texto}
            </Link>
          ))}
        </nav>
        <BotonLlamada
          telefono={telefono}
          className={buttonVariants({ variant: "llamadaCabecera" })}
        >
          <Phone aria-hidden="true" className="size-5 flex-none" />
          <span className="md:hidden">Llamar</span>
          <span className="hidden md:inline">{telefonoVisible(telefono)}</span>
        </BotonLlamada>
        <MenuMovil
          items={items}
          llamada={
            <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "llamadaSheet" })}>
              <Phone aria-hidden="true" className="size-6" />
              <span>{telefonoVisible(telefono)}</span>
            </BotonLlamada>
          }
        />
      </div>
    </header>
  );
}
