export function saludo(nombre: string) {
  return `Hola, ${nombre}. Esto viene de core. Sí manin, como lo has escuchado`;
}

export { BotonLlamada } from "./boton-llamada";
export { defineSiteConfig, siteConfigSchema } from "./site-config";
export type { SiteConfig, SiteConfigInput } from "./site-config";