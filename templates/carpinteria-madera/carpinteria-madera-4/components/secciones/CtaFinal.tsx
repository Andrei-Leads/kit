import type { SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { horarioLinea } from "@/lib/piezas";

type Props = {
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "horario">;
  mensaje: string;
  /** «Cuéntanos tu pieza» o, en la ficha de servicio, «Pide presupuesto de {servicio}». */
  titulo?: string;
};

/**
 * CTA final (encargo §6.10): bloque negro a sangre, título en condensada enorme, la pareja
 * cta-blanco / cta-contorno-blanco y el horario (sin promesa de tiempo de respuesta).
 */
export function CtaFinal({ contacto, mensaje, titulo = "Cuéntanos tu pieza" }: Props) {
  return (
    <section aria-labelledby="titulo-cta" className="sobre-negro contenedor mt-[clamp(3rem,2rem+4vw,6rem)] flex flex-col gap-[22px] bg-negro py-[clamp(2.5rem,1.5rem+5vw,6rem)] text-sobre-negro">
      <h2 id="titulo-cta" className="ft m-0 text-[clamp(3rem,1.2rem+8vw,9rem)] leading-[0.88] text-balance">
        {titulo}
      </h2>
      <Pareja telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} textoWhatsapp="Escribir por WhatsApp" tono="negro" />
      <p className="pie-ficha m-0 text-sm text-gris-claro">{horarioLinea(contacto.horario)}</p>
    </section>
  );
}
