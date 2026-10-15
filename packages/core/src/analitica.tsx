/*
 * Analítica del plan Básico: Vercel Web Analytics (sin cookies) y clics en
 * llamada y WhatsApp como eventos propios.
 *
 * Componente de servidor: decide con `config` si se mide y solo entonces
 * monta la parte de cliente (que no recibe `config`, para no enviarlo entero
 * al navegador). Sin `analitica.vercel: true`, no pinta nada.
 */
import type { SiteConfig } from "./site-config";
import { MedicionCliente } from "./analitica-cliente";

export function Analitica({ config }: { config: SiteConfig }) {
  if (!config.analitica.vercel) return null;
  return <MedicionCliente />;
}
