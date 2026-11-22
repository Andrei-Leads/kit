import { BotonLlamada, BotonWhatsApp, telefonoVisible, type SiteConfig } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

type Props = {
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp">;
  /** Mensaje precargado de WhatsApp de esta página. */
  mensaje: string;
  /** Texto del botón de WhatsApp (por defecto, el CTA principal del encargo). */
  textoWhatsapp?: string;
  className?: string;
};

/**
 * Pareja de botones del diseño (ParCta): WhatsApp relleno latón con `--color-sobre-primario` (el
 * principal, 56 px) y «Llamar · {teléfono}» con contorno de 2 px en `--color-primario-claro`. A todo el
 * ancho en móvil y en fila en escritorio. Sin WhatsApp, Llamar ocupa su sitio sin dejar hueco.
 */
export function Pareja({ contacto, mensaje, textoWhatsapp = "Pide visita y presupuesto", className }: Props) {
  const { telefono, whatsapp } = contacto;
  return (
    <div className={cn("flex w-full flex-wrap gap-3", className)}>
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className="btn btn-wa max-w-[400px] flex-[1_1_260px]">
          <span aria-hidden="true" className="bocadillo" />
          <span>{textoWhatsapp}</span>
        </BotonWhatsApp>
      )}
      <BotonLlamada telefono={telefono} className="btn btn-tel max-w-[400px] flex-[1_1_260px]">
        Llamar · {telefonoVisible(telefono)}
      </BotonLlamada>
    </div>
  );
}
