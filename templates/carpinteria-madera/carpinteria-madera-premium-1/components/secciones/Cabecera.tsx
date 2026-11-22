import Image from "next/image";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, telefonoVisible, type Ancla, type Imagen } from "@andrei-leads/core";

import { pildoraHero, pildoraHeroVelo, textoLlamar } from "@/components/Botones";
import { IconoTelefono, IconoWhatsapp } from "@/components/Iconos";
import { MenuPopover } from "@/components/base/MenuPopover";
import { TEXTO_WA } from "@/lib/mensajes";
import { cn } from "@/lib/utils";

type Props = {
  nombre: string;
  logo?: Imagen;
  telefono: string;
  whatsapp?: string;
  mensaje: string;
  enlaces: readonly Ancla[];
  enlacesMenu: readonly Ancla[];
};

/**
 * Cabecera inteligente (encargo §5.2). 64 px (56 en móvil), nombre en Newsreader 300.
 * Escritorio: enlaces y la pareja «Llamar · número» (contorno) + «WhatsApp» (primario).
 * Móvil: «Llamar» en píldora + «Menú» (pantalla completa en tinta). El fondo, la
 * compactación y el color por sección son CSS (globals.css) + CabeceraInteligente.
 */
export function Cabecera({ nombre, logo, telefono, whatsapp, mensaje, enlaces, enlacesMenu }: Props) {
  return (
    <header className="cabecera">
      <div aria-hidden="true" className="cabecera-fondo" />
      <div className="cabecera-fila contenedor relative flex h-full items-center justify-between gap-4">
        <Link href="/" className="flex min-h-11 min-w-0 items-center gap-2.5">
          {logo && <Image src={logo.src} alt="" width={32} height={32} className="size-8 flex-none object-contain" />}
          <span className={cn("titulo leading-[1.1] lg:max-w-[22ch] lg:text-xl", nombre.length > 28 ? "text-[15px]" : "text-lg")}>{nombre}</span>
        </Link>
        <nav aria-label="Principal" className="hidden gap-7 lg:flex">
          {enlaces.map((e) => (
            <Link key={e.href} href={e.href} data-ruta={e.href} className="cabecera-enlace">
              {e.texto}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <BotonLlamada telefono={telefono} className="boton boton-48 b-contorno">
            Llamar · {telefonoVisible(telefono)}
          </BotonLlamada>
          {whatsapp && (
            <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className="boton boton-48 b-primario">
              <IconoWhatsapp tamano={18} />
              WhatsApp
            </BotonWhatsApp>
          )}
        </div>
        <div className="flex flex-none items-center gap-1 lg:hidden">
          <BotonLlamada telefono={telefono} className="boton cabecera-pildora-movil min-h-11 gap-1.5 px-4 text-[15px]">
            <IconoTelefono tamano={18} />
            Llamar
            <span className="sr-only"> al {telefonoVisible(telefono)}</span>
          </BotonLlamada>
          <MenuPopover
            nombre={nombre}
            enlaces={enlacesMenu}
            botones={
              <>
                {whatsapp && (
                  <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={pildoraHero}>
                    <IconoWhatsapp />
                    {TEXTO_WA}
                  </BotonWhatsApp>
                )}
                <BotonLlamada telefono={telefono} className={whatsapp ? pildoraHeroVelo : pildoraHero}>
                  <IconoTelefono />
                  {textoLlamar(telefono)}
                </BotonLlamada>
              </>
            }
          />
        </div>
      </div>
    </header>
  );
}
