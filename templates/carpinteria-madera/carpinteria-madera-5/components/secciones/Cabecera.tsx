import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, telefonoVisible, type Ancla, type Imagen } from "@andrei-leads/core";

import { contorno, relleno } from "@/components/Botones";
import { IconoTelefono, IconoWhatsapp } from "@/components/Iconos";
import { NOMBRE_LARGO, NombreNegocio } from "@/components/NombreNegocio";
import { MenuPopover } from "@/components/base/MenuPopover";
import { cn } from "@/lib/utils";

type Props = {
  nombre: string;
  logo?: Imagen;
  telefono: string;
  whatsapp?: string;
  mensaje: string;
  enlaces: readonly Ancla[];
  enlacesMovil: readonly Ancla[];
};

/** cabecera-compacto (entrega): 48 px; Llamar con contorno crema sobre un velo nogal del 35 %. */
const COMPACTO = "min-h-12 px-3.5 text-[15px] lg:px-5 lg:text-base";

/**
 * Cabecera fija de «Restauración» (encargo §5 y entrega): 64 px en móvil (nombre, «Llamar» y
 * «Menú» con la hoja inferior) y 84 px en escritorio (nombre, enlaces, WhatsApp y «Llamar ·
 * {teléfono}»). Sólida por defecto; transparente con velo sobre el arco de inicio, servicio y
 * trabajo, y sólida otra vez en los primeros 120 px de scroll, solo con CSS (globals.css).
 */
export function Cabecera({ nombre, logo, telefono, whatsapp, mensaje, enlaces, enlacesMovil }: Props) {
  const largo = nombre.length > NOMBRE_LARGO;
  const numero = telefonoVisible(telefono);
  return (
    <header className="cabecera fixed inset-x-0 top-0 z-30 isolate h-(--alto-cabecera)">
      <div className="contenedor flex h-full items-center gap-2 pr-2.5 lg:gap-8 lg:pr-[clamp(16px,4vw,48px)]">
        <Link href="/" className="flex min-h-12 min-w-0 flex-1 items-center no-underline lg:flex-none">
          <NombreNegocio nombre={nombre} logo={logo} />
        </Link>
        <nav aria-label="Principal" className="hidden gap-1 text-base font-[520] lg:flex">
          {enlaces.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className="inline-flex min-h-12 items-center px-3 text-texto no-underline decoration-primario decoration-2 underline-offset-[6px] hover:underline"
            >
              {e.texto}
            </Link>
          ))}
        </nav>
        <div className="flex flex-none items-center gap-2 lg:ml-auto lg:gap-2.5">
          {whatsapp && (
            <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(relleno, COMPACTO, "max-lg:hidden")}>
              <IconoWhatsapp tamano={18} />
              WhatsApp
            </BotonWhatsApp>
          )}
          <BotonLlamada telefono={telefono} className={cn(contorno, COMPACTO, "gap-1.5 bg-fondo/35 lg:gap-2")}>
            <IconoTelefono tamano={16} />
            <span className="lg:hidden">
              Llamar<span className="sr-only"> al {numero}</span>
            </span>
            <span className="max-lg:hidden">Llamar · {numero}</span>
          </BotonLlamada>
          <div className="lg:hidden">
            <MenuPopover
              enlaces={enlacesMovil}
              claseBoton={cn(
                "inline-flex min-h-12 items-center gap-2 rounded-boton px-3.5 text-[15px] font-semibold text-texto",
                largo && "[&>span]:sr-only",
              )}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
