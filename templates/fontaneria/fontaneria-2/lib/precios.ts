import { precioDesde, type SiteConfig } from "@andrei-leads/core";

/** Un precio para pintar como tarjeta. */
export type PrecioTarjeta = {
  concepto: string;
  /** Texto completo del dato («59 €», «desde 79 €»). */
  precio: string;
  /** true si el dato empieza por «desde»: se pinta pequeño delante de la cifra. */
  desde: boolean;
  importe: string;
  /** true si el importe es una sola cifra («59 €», «45 € + IVA», «40 €/h»): se pinta en grande. */
  cifra: boolean;
  /** «Precio cerrado» (tarifas), «Precio desde» (precio que empieza por «desde») o nada. */
  etiqueta?: string;
};

/**
 * Precios de la sección estrella (encargo §5, «Variabilidad»): las `tarifas` o, si no hay, los
 * servicios con `precioDesde` (concepto = título). Pastilla solo si el importe es una sola cifra:
 * «Precio desde» si el texto empieza por «desde»; «Precio cerrado» si es una tarifa. Con otro texto
 * («a consultar», «entre 60 y 90 €»), sin pastilla y a menor tamaño. Sin ningún precio, [].
 */
const UNA_CIFRA = /^\d[\d.,]*\s?€(\s?\+\s?IVA)?(\s?\/\s?h(ora)?)?$/i;

/** true si los datos traen algún precio (tarifas o `precioDesde`). */
export function hayPrecios(config: Pick<SiteConfig, "tarifas" | "servicios">): boolean {
  return !!config.tarifas || config.servicios.some((s) => s.precioDesde);
}

export function preciosVisibles(config: Pick<SiteConfig, "tarifas" | "servicios">): PrecioTarjeta[] {
  const deTarifas = !!config.tarifas;
  const lista = config.tarifas
    ? config.tarifas.items.map((i) => ({ concepto: i.concepto, precio: i.precio }))
    : config.servicios.flatMap((s) => (s.precioDesde ? [{ concepto: s.titulo, precio: s.precioDesde }] : []));
  return lista.map((p) => tarjetaPrecio(p.concepto, p.precio, deTarifas));
}

/** Un precio como tarjeta. `cerrado`: es una tarifa (lleva «Precio cerrado» si es una sola cifra). */
export function tarjetaPrecio(concepto: string, precio: string, cerrado: boolean): PrecioTarjeta {
  const { desde, importe } = precioDesde(precio);
  const cifra = UNA_CIFRA.test(importe.trim());
  const etiqueta = !cifra ? undefined : desde ? "Precio desde" : cerrado ? "Precio cerrado" : undefined;
  return { concepto, precio, desde, importe, cifra, etiqueta };
}
