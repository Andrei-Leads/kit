import Image from "next/image";
import { BotonLlamada, minusculaInicial, telefonoVisible, type Servicio, type SiteConfig } from "@andrei-leads/core";

import { IconoTelefono } from "@/components/Iconos";
import { Planificador } from "@/components/Planificador";

type Props = {
  servicios: readonly Pick<Servicio, "titulo" | "imagenes">[];
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp">;
  mensajeBase: string;
  /** Ficha de servicio: planificador corto (tamaño y plazo) con este servicio ya elegido. */
  servicioFijo?: Pick<Servicio, "titulo">;
};

/**
 * Envoltorio de servidor del `Planificador`: le pasa props planas (nunca `site.config`) y pinta en
 * el servidor las miniaturas (64 px, calidad 60, sin precarga) y el botón de llamada. Sin
 * WhatsApp, no hay planificador.
 */
export function PlanificadorServidor({ servicios, contacto, mensajeBase, servicioFijo }: Props) {
  if (!contacto.whatsapp) return null;
  const opciones = servicios.map((s) => {
    const foto = s.imagenes[0];
    return {
      titulo: s.titulo,
      frase: minusculaInicial(s.titulo),
      miniatura: foto ? (
        <Image
          src={foto.src}
          alt=""
          width={64}
          height={64}
          sizes="64px"
          quality={60}
          className="aspect-square w-[clamp(40px,0.5rem+4.5vw,64px)] flex-none rounded-[10px] bg-alterna object-cover"
        />
      ) : undefined,
    };
  });
  const notaIa = !servicioFijo && servicios.length > 1 && servicios.some((s) => s.imagenes[0]?.origen === "ia");
  return (
    <Planificador
      opciones={opciones}
      numero={contacto.whatsapp}
      mensajeBase={mensajeBase}
      servicioFijo={servicioFijo && { titulo: servicioFijo.titulo, frase: minusculaInicial(servicioFijo.titulo) }}
      notaIa={notaIa}
      llamada={
        <BotonLlamada telefono={contacto.telefono} className="boton boton-contorno flex-[1_1_100%] px-[18px] @min-[30rem]:flex-[1_1_200px]">
          <IconoTelefono />
          <span>Llamar ·&nbsp;{telefonoVisible(contacto.telefono)}</span>
        </BotonLlamada>
      }
    />
  );
}
