import Image from "next/image";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, telefonoVisible, type Ancla, type Imagen } from "@andrei-leads/core";

import { IconoTelefono, IconoWhatsapp } from "@/components/Iconos";
import { MenuPopover } from "@/components/base/MenuPopover";
import { cn } from "@/lib/utils";

type Props = {
  nombre: string;
  logo?: Imagen;
  telefono: string;
  whatsapp?: string;
  email: string;
  mensaje: string;
  enlaces: readonly Ancla[];
  enlacesMenu: readonly Ancla[];
};

const PILDORA =
  "boton min-h-11 flex-none items-center gap-2 rounded-boton text-[15px] font-semibold whitespace-nowrap no-underline";

/**
 * Cabecera fija (encargo §5): 56 px en móvil (nombre, «Llamar» con contorno blanco y
 * «Menú») y 72 px desde `lg` (enlaces, WhatsApp en píldora clara y «Llamar · número»).
 * Texto siempre claro. Es sólida por defecto; en la home con vídeo o foto, el fondo
 * (`::before`, globals.css) pasa de transparente a sólido con el scroll, solo con CSS.
 */
export function Cabecera({ nombre, logo, telefono, whatsapp, email, mensaje, enlaces, enlacesMenu }: Props) {
  // Nombre largo en móvil: 14 px y hasta 3 líneas, para que se lea entero junto al logo y los botones.
  const largo = nombre.length > 28;
  return (
    <header className="cabecera sobre-oscuro fixed inset-x-0 top-0 z-30 isolate h-(--alto-cabecera) text-white">
      <div className="contenedor flex h-full items-center gap-[clamp(10px,2vw,28px)]">
        <Link href="/" className="flex min-h-11 min-w-0 flex-1 items-center gap-2.5 text-white no-underline">
          {logo && (
            <Image src={logo.src} alt="" width={36} height={36} className="size-9 flex-none rounded-full bg-superficie object-contain" />
          )}
          <span className={cn("remate line-clamp-2 text-[17px] leading-[1.15]", largo && "max-lg:line-clamp-3 max-lg:text-sm")}>{nombre}</span>
        </Link>
        <nav aria-label="Principal" className="nav-principal hidden gap-7 lg:flex">
          {enlaces.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              data-ruta={e.href}
              className="border-b-2 border-transparent py-2.5 text-base font-medium text-white no-underline hover:border-white/60"
            >
              {e.texto}
            </Link>
          ))}
        </nav>
        {whatsapp && (
          <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={`${PILDORA} hidden bg-superficie px-[18px] text-texto hover:bg-white lg:inline-flex`}>
            <IconoWhatsapp tamano={18} />
            WhatsApp
          </BotonWhatsApp>
        )}
        <BotonLlamada telefono={telefono} className={`${PILDORA} inline-flex border-2 border-white px-4 text-white hover:bg-white/14`}>
          <IconoTelefono tamano={17} />
          <span className="lg:hidden">
            Llamar<span className="sr-only"> al {telefonoVisible(telefono)}</span>
          </span>
          <span className="hidden lg:inline">Llamar · {telefonoVisible(telefono)}</span>
        </BotonLlamada>
        <div className="lg:hidden">
          <MenuPopover
            enlaces={enlacesMenu}
            pie={
              <>
                {telefonoVisible(telefono)} · {email}
              </>
            }
          />
        </div>
      </div>
    </header>
  );
}
