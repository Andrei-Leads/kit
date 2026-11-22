/*
 * Mensajes precargados de WhatsApp (desde 0.6.0). Cada función devuelve el
 * mensaje de los datos si existe y, si no, un texto por defecto. El template
 * puede pasar su propio texto por defecto: así cada diseño puede llevar un
 * mensaje distinto y se sabe de qué template llega el lead.
 */
import { minusculaInicial } from "./formato";
import type { Servicio, SiteConfig, Trabajo } from "./site-config";

/** Mensaje general por defecto (sin `contacto.mensajeWhatsapp`). */
export const MENSAJE_GENERICO = "Hola, os escribo desde vuestra web.";

/** Mensaje de la página 404 (`app/not-found.tsx`). */
export const MENSAJE_NO_ENCONTRADA = "Hola, buscaba una página en vuestra web y no la encontré.";

/** Mensaje general (inicio, cabecera, pie, contacto, barra móvil): el del cliente o el por defecto. */
export function mensajeGeneral(
  contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">,
  porDefecto: string = MENSAJE_GENERICO,
): string {
  return contacto.mensajeWhatsapp ?? porDefecto;
}

/** Ficha de servicio: el `mensajeWhatsapp` del servicio o «Hola, quiero información sobre {titulo}». */
export function mensajeServicio(
  servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">,
  porDefecto: (titulo: string) => string = (titulo) => `Hola, quiero información sobre ${minusculaInicial(titulo)}.`,
): string {
  return servicio.mensajeWhatsapp ?? porDefecto(servicio.titulo);
}

/** Ficha de trabajo: «Hola, he visto el trabajo «{titulo}» y quiero algo parecido.» */
export function mensajeTrabajo(
  trabajo: Pick<Trabajo, "titulo">,
  porDefecto: (titulo: string) => string = (titulo) => `Hola, he visto el trabajo «${titulo}» y quiero algo parecido.`,
): string {
  return porDefecto(trabajo.titulo);
}
