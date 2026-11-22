import Image from "next/image";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, telefonoVisible, type Ancla, type SiteConfig } from "@andrei-leads/core";

import { MenuPopover } from "@/components/base/MenuPopover";
import { Pareja } from "@/components/Botones";
import { IconoWhatsapp } from "@/components/Iconos";
import { llamarPunto, type DatosCta } from "@/lib/textos";

import { CabeceraInteligente } from "./CabeceraInteligente";

type Props = {
  nombre: string;
  logo?: SiteConfig["negocio"]["logo"];
  enlaces: readonly Ancla[];
  datos: DatosCta;
};

/**
 * Cabecera inteligente (encargo §5.5): fija, 64 px. Transparente sobre la portada con
 * medio; se compacta y gana fondo en los primeros 200 px (CSS, `scroll(root)`); se
 * esconde al bajar y vuelve al subir, y cambia de tono según la sección
 * (`CabeceraInteligente`). Sin JS: fija y sin esconderse.
 *
 * Escritorio: Obras, Servicios, Estudio, Contacto y la pareja «WhatsApp» · «Llamar ·
 * {teléfono}». Móvil: «Llamar» y «Menú» (WhatsApp está en la barra).
 */
export function Cabecera({ nombre, logo, enlaces, datos }: Props) {
  return (
    <header className="cabecera fixed inset-x-0 top-0 z-50 h-[var(--alto-cabecera)]">
      <div className="cabecera-velo" />
      <div className="cabecera-fondo" />
      <CabeceraInteligente />
      <div className="contenedor relative flex h-full items-center justify-between gap-4">
        <Link href="/" className="cabecera-nombre flex min-h-11 min-w-0 items-center gap-2.5 no-underline">
          {logo && <Image src={logo.src} alt="" width={28} height={28} className="h-7 w-auto" />}
          <span className="line-clamp-2 text-[15px] leading-tight [text-wrap:balance] min-[360px]:text-[17px]">{nombre}</span>
        </Link>
        <nav aria-label="Principal" className="nav-principal hidden items-center gap-7 lg:flex">
          {enlaces.map((e) => (
            <Link key={e.href} href={e.href} data-ruta={e.href} className="border-b border-transparent py-1 text-[15px] no-underline hover:border-current">
              {e.texto}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Pareja
            datos={datos}
            fondo="oscuro"
            alto={48}
            textoWa="WhatsApp"
            textoLlamar={llamarPunto(datos.telefono)}
            className="flex-nowrap"
          />
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <BotonLlamada telefono={datos.telefono} className="cta cta--48 cta-cabecera px-4">
            Llamar
            <span className="sr-only"> al {telefonoVisible(datos.telefono)}</span>
          </BotonLlamada>
          <MenuPopover enlaces={enlaces} nombre={nombre}>
            {datos.whatsapp && (
              <BotonWhatsApp numero={datos.whatsapp} mensaje={datos.mensaje} className="cta cta-principal">
                <IconoWhatsapp />
                Enséñanos tu casa
              </BotonWhatsApp>
            )}
            <BotonLlamada telefono={datos.telefono} className={datos.whatsapp ? "cta cta-secundario-claro" : "cta cta-principal"}>
              {`Llamar al ${telefonoVisible(datos.telefono)}`}
            </BotonLlamada>
          </MenuPopover>
        </div>
      </div>
    </header>
  );
}
