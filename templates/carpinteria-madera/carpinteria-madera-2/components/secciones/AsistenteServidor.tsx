import { minusculaInicial, type Servicio } from "@andrei-leads/core";

import { Asistente } from "@/components/Asistente";
import { Foto } from "@/components/base/Foto";
import { mensajeDeServicio } from "@/lib/mensajes";

type Props = {
  servicios: readonly Pick<Servicio, "titulo" | "slug" | "imagenes" | "mensajeWhatsapp">[];
  /** `contacto.whatsapp`. Sin él, no hay asistente (quien lo usa pinta la alternativa con llamada). */
  whatsapp?: string;
  mensajeBase: string;
  /** Ficha de servicio: empieza en el paso 2 con este servicio. */
  servicioInicial?: string;
};

/**
 * Envoltorio de servidor del `Asistente`: le pasa props planas (nunca `site.config`) y pinta aquí
 * las miniaturas 1:1 de 96 px (AVIF, calidad 60, sin precarga) con la etiqueta «IA» reducida.
 */
export function AsistenteServidor({ servicios, whatsapp, mensajeBase, servicioInicial }: Props) {
  if (!whatsapp) return null;
  const opciones = servicios.map((s) => {
    const foto = s.imagenes[0];
    return {
      titulo: s.titulo,
      slug: s.slug,
      frase: minusculaInicial(s.titulo),
      mensaje: mensajeDeServicio(s),
      miniatura: foto ? <Foto imagen={foto} decorativa compacta proporcion="1/1" sizes="(min-width: 768px) 144px, (min-width: 360px) 40vw, 72vw" calidad={60} className="rounded-[14px]" /> : undefined,
    };
  });
  return (
    <Asistente
      opciones={opciones}
      numero={whatsapp}
      mensajeBase={mensajeBase}
      servicioInicial={servicioInicial}
      conMiniaturas={servicios.some((s) => s.imagenes.length > 0)}
    />
  );
}
