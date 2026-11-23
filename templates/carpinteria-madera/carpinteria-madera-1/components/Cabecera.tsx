import Image from "next/image";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, telefonoVisible, type Imagen } from "@andrei-leads/core";

import { compacto, contorno, relleno } from "@/components/Botones";
import { IconoWhatsapp } from "@/components/Iconos";
import { MenuPopover } from "@/components/base/MenuPopover";
import type { EnlaceMenu } from "@/lib/navegacion";
import { cn } from "@/lib/utils";

/** Nombre largo: a partir de aquí la cabecera móvil baja el cuerpo del nombre (como -2 y -5). */
const NOMBRE_LARGO = 28;

type Props = {
  nombre: string;
  logo?: Imagen;
  telefono: string;
  whatsapp?: string;
  mensaje: string;
  enlaces: readonly EnlaceMenu[];
  enlacesMovil: readonly EnlaceMenu[];
};

/**
 * Cabecera de «Veta» (encargo §5, barra clásica): 64 px, fondo de papel sólido, pegada arriba y
 * con filete abajo. Nombre en serif a la izquierda (con logo de 32 px y `alt=""`), nunca cortado (la
 * cabecera crece): 2 líneas como máximo hasta unos 40 caracteres; un nombre largo (más de 28) baja de
 * 19 a 15 px en móvil y «Llamar» y «Menú» estrechan su relleno, para no pasar de 3 líneas a 375 px
 * con logo y 54 caracteres. Escritorio: enlaces de 15 px (la página actual con
 * filete de tinta, globals.css), WhatsApp relleno y «Llamar · {teléfono}» con contorno. Móvil:
 * «Llamar» con contorno (siempre visible) y «Menú» (panel bajo la cabecera).
 */
export function Cabecera({ nombre, logo, telefono, whatsapp, mensaje, enlaces, enlacesMovil }: Props) {
  const numero = telefonoVisible(telefono);
  const largo = nombre.length > NOMBRE_LARGO;
  return (
    <header className="cabecera sticky top-0 z-30 border-b border-filete bg-fondo">
      <div className="marco flex min-h-16 items-center gap-3 py-2 lg:gap-5">
        <Link href="/" className="flex min-h-11 min-w-0 flex-1 items-center gap-2.5 text-texto no-underline">
          {logo && <Image src={logo.src} alt="" width={32} height={32} className="h-8 w-auto max-w-16 flex-none object-contain" />}
          <span
            className={cn(
              // El cuerpo antes que `leading-*`: tailwind-merge quita el interlineado si un tamaño va detrás.
              largo ? "text-[15px] lg:text-[19px]" : "text-[19px]",
              "min-w-0 font-titulo leading-[1.15] font-[450] tracking-[-0.01em] text-balance",
            )}
          >
            {nombre}
          </span>
        </Link>
        <nav aria-label="Principal" className="hidden gap-7 text-[15px] lg:flex">
          {enlaces.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              data-nav={e.id}
              className="inline-flex min-h-11 items-center border-b border-transparent text-texto no-underline hover:border-texto"
            >
              {e.texto}
            </Link>
          ))}
        </nav>
        <div className="hidden flex-none gap-2.5 lg:flex">
          {whatsapp && (
            <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(relleno, compacto, "gap-2")}>
              <IconoWhatsapp tamano={18} />
              WhatsApp
            </BotonWhatsApp>
          )}
          <BotonLlamada telefono={telefono} className={cn(whatsapp ? contorno : relleno, compacto, "whitespace-nowrap")}>
            Llamar · {numero}
          </BotonLlamada>
        </div>
        <div className="flex flex-none items-center gap-2 lg:hidden">
          <BotonLlamada telefono={telefono} className={cn(contorno, "min-h-11 text-[15px]", largo ? "px-2.5" : "px-3.5")}>
            Llamar<span className="sr-only"> al {numero}</span>
          </BotonLlamada>
          <MenuPopover enlaces={enlacesMovil} claseBoton={largo ? "px-2" : undefined} />
        </div>
      </div>
    </header>
  );
}
