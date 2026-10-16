import type { SiteConfig } from "@andrei-leads/core";

export type Paso = { titulo: string; texto: string };

/**
 * Pasos por defecto del trámite (Specs §9 / encargo §4) cuando `proceso` está vacío.
 * Nunca llevan plazos ni nombres de organismos o compañías: eso solo puede venir de los datos.
 */
export const PASOS_POR_DEFECTO: Paso[] = [
  {
    titulo: "Nos cuentas qué necesitas",
    texto: "Boletín, más potencia o una avería: por teléfono o con una foto por WhatsApp.",
  },
  {
    titulo: "Revisamos la instalación",
    texto: "Vamos a tu casa y comprobamos el cuadro, la toma de tierra y el cableado.",
  },
  { titulo: "Te decimos el precio", texto: "Antes de empezar, y por escrito si lo necesitas." },
  { titulo: "Lo dejamos en regla", texto: "Hacemos el trabajo o las correcciones que hagan falta." },
  { titulo: "Papeles en mano", texto: "Te entregamos el certificado y la factura con IVA." },
];

/** `proceso` del cliente (≤ 6) o, si está vacío, los pasos por defecto. */
export function pasosProceso(proceso: SiteConfig["proceso"]): Paso[] {
  return proceso.length > 0 ? proceso : PASOS_POR_DEFECTO;
}
