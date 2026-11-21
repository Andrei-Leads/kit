import Image from "next/image";
import { BotonLlamada, iniciales, minusculaInicial, telefonoVisible, type SiteConfig } from "@andrei-leads/core";

import { Asistente } from "@/components/secciones/Asistente";
import { MENSAJE_GENERICO, mensajeInicio } from "@/lib/mensajes";

type Props = {
  negocio: Pick<SiteConfig["negocio"], "nombre" | "logo">;
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "mensajeWhatsapp">;
  servicios: readonly Pick<SiteConfig["servicios"][number], "titulo" | "slug">[];
  /** Versión corta de /servicios/[slug]: empieza en el paso 2 con este servicio. */
  servicioInicial?: string;
  className?: string;
};

/**
 * Envoltorio de servidor del `Asistente`: le pasa props planas (nunca `site.config`) y pinta en el
 * servidor el avatar y el «Llama al {número}». Sin WhatsApp, no pinta nada.
 */
export function ChatWhatsApp({ negocio, contacto, servicios, servicioInicial, className }: Props) {
  if (!contacto.whatsapp) return null;
  const avatar = negocio.logo ? (
    <Image src={negocio.logo.src} alt="" width={42} height={42} className="size-[42px] flex-none rounded-full bg-superficie object-contain" />
  ) : (
    <span aria-hidden="true" className="grid size-[42px] flex-none place-items-center rounded-full bg-primario text-[19px] font-extrabold text-sobre-primario">
      {iniciales(negocio.nombre).charAt(0)}
    </span>
  );
  return (
    <Asistente
      servicios={servicios.map((s) => ({ titulo: s.titulo, slug: s.slug, enFrase: minusculaInicial(s.titulo) }))}
      numero={contacto.whatsapp}
      mensajeBase={MENSAJE_GENERICO}
      mensajeDirecto={mensajeInicio(contacto)}
      nombre={negocio.nombre}
      avatar={avatar}
      llamada={
        <BotonLlamada telefono={contacto.telefono} className="inline-flex min-h-11 items-center font-extrabold text-texto underline underline-offset-[3px]">
          Llama al {telefonoVisible(contacto.telefono)}
        </BotonLlamada>
      }
      servicioInicial={servicioInicial}
      corta={!!servicioInicial}
      className={className}
    />
  );
}
