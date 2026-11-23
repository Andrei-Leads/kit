import Image from "next/image";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, telefonoVisible, type Ancla, type Imagen } from "@andrei-leads/core";

import { chipClaro, chipRelleno, pastilla, pastillaClara } from "@/components/Botones";
import { IconoTelefono, IconoWhatsapp } from "@/components/Iconos";
import { MenuPopover } from "@/components/base/MenuPopover";
import { cn } from "@/lib/utils";

type Props = {
  nombre: string;
  logo?: Imagen;
  telefono: string;
  whatsapp?: string;
  mensaje: string;
  /** Cabecera de escritorio: Fachadas, Servicios, Empresa, Contacto. */
  enlaces: readonly Ancla[];
  /** Menú móvil: con Inicio delante. */
  enlacesMenu: readonly Ancla[];
};

/**
 * Barra clásica (encargo §6.1 y Cabecera.dc.html): blanca, `sticky`, con un borde inferior de 1 px
 * que no cambia al bajar. Móvil (60 px): nombre (o logo de 32 px + nombre) en 2 líneas como
 * máximo, «Llamar» con contorno y «Menú». Desde 1024 px (76 px): enlaces en pastilla con la página
 * actual marcada sin JS (`data-pagina`, globals.css), «WhatsApp» relleno y «Llamar · {teléfono}».
 *
 * Nombre largo (encargo §5): nunca se corta. A 16 px; con logo o con más de 22 caracteres, a 14 px
 * (con Merriweather Sans, «Aluminios y PVC Hermanos Arjona» a 16 px ocupa 3 líneas a 375 px). Si
 * pasa de 34 caracteres, en móvil «Llamar» y «Menú» se quedan en icono (texto para el lector).
 */
export function Cabecera({ nombre, logo, telefono, whatsapp, mensaje, enlaces, enlacesMenu }: Props) {
  const largo = nombre.length > 34;
  const tel = telefonoVisible(telefono);
  return (
    <header className="sticky top-0 z-30 border-b border-borde bg-superficie">
      <div className="contenedor flex min-h-[60px] items-center gap-2 py-2 lg:min-h-[76px] lg:gap-7">
        <Link href="/" className="flex min-h-11 min-w-0 flex-1 items-center gap-2.5 no-underline lg:max-w-[340px] lg:flex-initial">
          {logo && (
            <Image src={logo.src} alt="" width={32} height={32} className="size-8 flex-none rounded-lg object-contain lg:size-10" />
          )}
          <span
            className={cn(
              "leading-[1.15] font-extrabold text-balance [overflow-wrap:anywhere] lg:text-lg",
              logo || nombre.length > 22 ? "text-sm" : "text-base",
            )}
          >
            {nombre}
          </span>
        </Link>
        <nav aria-label="Principal" className="nav-principal hidden flex-1 justify-end gap-1 lg:flex">
          {enlaces.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              data-ruta={e.href}
              className="flex min-h-11 items-center rounded-boton px-3 text-base font-medium text-texto-suave no-underline hover:text-texto"
            >
              {e.texto}
            </Link>
          ))}
        </nav>
        <div className="flex flex-none items-center gap-2">
          {whatsapp && (
            <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(chipRelleno, "hidden lg:inline-flex")}>
              <IconoWhatsapp tamano={18} />
              WhatsApp
            </BotonWhatsApp>
          )}
          <BotonLlamada telefono={telefono} className={cn(chipClaro, largo && "max-sm:px-2.5")}>
            <IconoTelefono />
            <span className={cn(largo && "max-sm:sr-only")}>
              Llamar
              <span className="max-lg:sr-only"> · {tel}</span>
            </span>
          </BotonLlamada>
          <div className="lg:hidden">
            <MenuPopover
              enlaces={enlacesMenu}
              nombre={nombre}
              compacto={largo}
              pie={
                <div className="flex flex-col gap-2">
                  {whatsapp && (
                    <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={pastilla}>
                      <IconoWhatsapp />
                      Escribir por WhatsApp
                    </BotonWhatsApp>
                  )}
                  <BotonLlamada telefono={telefono} className={whatsapp ? pastillaClara : pastilla}>
                    <IconoTelefono tamano={20} />
                    Llamar · {tel}
                  </BotonLlamada>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </header>
  );
}
