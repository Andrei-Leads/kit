import type { Servicio, SiteConfig } from "@andrei-leads/core";

import { LlamadaLuz, WhatsApp } from "@/components/BotonesContacto";
import { Foto } from "@/components/Foto";
import { Mancha } from "@/components/Mancha";
import { PastillaPrecio } from "@/components/PastillaPrecio";
import { claveIcono, ICONOS } from "@/lib/iconos";
import { etiquetaWhatsAppServicio, mensajeServicio } from "@/lib/mensajes";

type Props = {
  servicio: Servicio;
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp">;
};

/**
 * Parte alta de la ficha de servicio (Pantalla, `servTop`): a la izquierda la foto 4:3 con contorno
 * orgánico (sin foto, un icono grande sobre una mancha de servicio) y, a la derecha, la pastilla grande de
 * `precioDesde` (el texto tal cual, decisión 3), `llamada-luz` y whatsapp-servicio (solo con `whatsapp`;
 * etiqueta de la decisión 4 y mensaje precargado del servicio). La foto es lo primero que se ve: `priority`;
 * ni la foto ni la mancha se animan. Apilado en móvil, dos columnas desde 700 px.
 */
export function FichaCabecera({ servicio, contacto }: Props) {
  const foto = servicio.imagenes[0];
  const Icono = ICONOS[claveIcono(servicio.titulo)];

  return (
    <section aria-label="Resumen del servicio" className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-5">
      <div className="relative min-w-0 flex-[1_1_300px]">
        {foto ? (
          <Foto imagen={foto} proporcion="4/3" forma="organica" priority sizes="(min-width: 1280px) 560px, (min-width: 768px) 45vw, 100vw" />
        ) : (
          <div className="relative flex aspect-[4/3] items-center justify-center">
            <Mancha forma="servicio" className="inset-x-[10%] inset-y-[6%]" />
            <Icono
              aria-hidden="true"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative z-10 size-16"
            />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-3">
        {servicio.precioDesde && <PastillaPrecio precio={servicio.precioDesde} grande className="self-start px-[18px] py-[9px] text-2xl" />}
        <LlamadaLuz telefono={contacto.telefono} className="lg:self-start" />
        {contacto.whatsapp && (
          <WhatsApp numero={contacto.whatsapp} mensaje={mensajeServicio(servicio)} variante="servicio" className="lg:self-start">
            {etiquetaWhatsAppServicio(servicio)}
          </WhatsApp>
        )}
      </div>
    </section>
  );
}
