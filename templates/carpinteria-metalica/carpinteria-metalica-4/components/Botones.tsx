import type { ReactNode } from "react";
import { BotonLlamada, BotonWhatsApp, telefonoVisible, type SiteConfig } from "@andrei-leads/core";

import { IconoTelefono, IconoWhatsApp } from "@/components/Iconos";
import { cn } from "@/lib/utils";

type Props = {
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp">;
  /** Mensaje precargado de WhatsApp de esta página. */
  mensaje: string;
  /** Texto del botón de WhatsApp (corto: el servicio o el trabajo van en el mensaje). */
  textoWhatsapp?: string;
  /** Texto de Llamar; por defecto «Llamar · {teléfono}». */
  textoLlamar?: ReactNode;
  /** Tamaño: `grande` (hero, 60 px y cota bajo la etiqueta), `normal` (56 px) o `medio` (52 px). */
  tamano?: "grande" | "normal" | "medio";
  /** Iconos en los dos botones. */
  iconos?: boolean;
  /** Uno encima de otro a todo el ancho (cajetín de la ficha de servicio). */
  apilada?: boolean;
  className?: string;
};

/**
 * Pareja de CTAs (encargo §3): `boton-lamina` (WhatsApp, principal) y `boton-trazo` (Llamar, contorno
 * de 2 px), en fila en escritorio y apilados a todo el ancho en móvil. Sin WhatsApp, Llamar ocupa su
 * sitio como `boton-lamina`, sin hueco. Dentro de `[data-alterna]` cambian solos (globals.css).
 */
export function Pareja({ contacto, mensaje, textoWhatsapp = "Envíanos fotos y medidas", textoLlamar, tamano = "normal", iconos = true, apilada, className }: Props) {
  const tam = tamano === "grande" ? "boton-grande" : tamano === "medio" ? "boton-medio" : undefined;
  const conCota = tamano === "grande";
  const ancho = (base: string) => (apilada ? "w-full" : base);
  const llamar = textoLlamar ?? <span>Llamar · {telefonoVisible(contacto.telefono)}</span>;
  return (
    <div className={cn("flex gap-3", apilada ? "flex-col" : "flex-wrap", className)}>
      {contacto.whatsapp ? (
        <>
          <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensaje} className={cn("boton boton-lamina", ancho("flex-[1_1_280px]"), tam, conCota && "flex-col gap-1.5")}>
            <span className="flex items-center gap-2.5">
              {iconos && <IconoWhatsApp tamano={conCota ? 18 : 16} />}
              {textoWhatsapp}
            </span>
            {conCota && (
              <span aria-hidden="true" className="cota-boton">
                <span />
              </span>
            )}
          </BotonWhatsApp>
          <BotonLlamada telefono={contacto.telefono} className={cn("boton boton-trazo", ancho("flex-[1_1_220px]"), tam)}>
            {iconos && <IconoTelefono tamano={conCota ? 18 : 16} />}
            {llamar}
          </BotonLlamada>
        </>
      ) : (
        <BotonLlamada telefono={contacto.telefono} className={cn("boton boton-lamina", ancho("flex-[1_1_280px]"), tam, conCota && "flex-col gap-1.5")}>
          <span className="flex items-center gap-2.5">
            {iconos && <IconoTelefono tamano={conCota ? 18 : 16} />}
            {llamar}
          </span>
          {conCota && (
            <span aria-hidden="true" className="cota-boton">
              <span />
            </span>
          )}
        </BotonLlamada>
      )}
    </div>
  );
}
