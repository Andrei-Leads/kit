import type { SiteConfig } from "@andrei-leads/core";

import type { DatosCta } from "@/lib/textos";

/** Datos de una pareja o CTA con el mensaje de la página. */
export function datosCta(contacto: SiteConfig["contacto"], mensaje: string): DatosCta {
  return { telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje };
}
