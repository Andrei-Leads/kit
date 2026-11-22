import { etiquetaOrigen, type Imagen, type SiteConfig } from "@andrei-leads/core";

import { EnlaceFlecha, Pareja } from "@/components/Botones";
import { EtiquetaOrigen, Foto } from "@/components/base/Foto";
import type { DatosCta } from "@/lib/textos";

type Props = {
  config: Pick<SiteConfig, "galeria" | "imagenesHero" | "servicios" | "trabajos">;
  cta: DatosCta;
};

/** Medio del pano (encargo §5.3): galeria[0] → imagenesHero[1] → primera foto de servicio. No reutiliza el vídeo del hero. */
function medioPano(config: Props["config"]): (Imagen & { titulo?: string }) | undefined {
  return config.galeria[0] ?? config.imagenesHero[1] ?? config.servicios.find((s) => s.imagenes[0])?.imagenes[0];
}

/**
 * Pano: la instalación vista que crece (recurso 4, encargo §5.3). Sección alta
 * (260svh / 300vh) con la escena `sticky` de 100svh; la foto pasa de
 * `clip-path: inset(16% 6% 22% 6%)` a pantalla completa, el velo y la
 * marquesina de servicios entran con el scroll y la pareja de CTAs está a la
 * vista en la fase fija, antes de soltar. Todo en CSS (globals.css, `.pano`),
 * 0 KB de JS. Sin soporte, con «reducir movimiento» o sin JS: foto quieta
 * (4:5 / 16:9), una copia de la marquesina partida en líneas y la pareja debajo.
 * Sin fotos: tinta suave con la textura en grande y solo la marquesina.
 */
export function PanoInstalacion({ config, cta }: Props) {
  const medio = medioPano(config);
  const titulos = config.servicios.map((s) => s.titulo);
  const mitad = Math.ceil(titulos.length / 2);
  const fila1 = titulos.join(" · ");
  const fila2 = [...titulos.slice(mitad), ...titulos.slice(0, mitad)].join(" · ");
  const etiqueta = medio ? etiquetaOrigen(medio) : undefined;
  const hayTrabajos = config.trabajos.length > 0 || config.galeria.length > 0;
  return (
    <section data-tono="oscuro" aria-label="Lo que hacemos, en una instalación" className="pano sobre-tinta bg-tinta-suave text-white">
      <div className="pano__escena">
        <div className="pano__medio bg-tinta-suave">
          {medio ? (
            <Foto imagen={medio} sizes="100vw" proporcion="relleno" posicionEtiqueta="ninguna" className="absolute inset-0 rounded-none" />
          ) : (
            <div aria-hidden="true" className="textura absolute inset-0 bg-tinta-suave [background-size:240px_138.56px]" />
          )}
          <div aria-hidden="true" className="pano__velo" />
          <div aria-hidden="true" className="pano__marquesina">
            <p className="pano__pista titulo m-0">
              <span>{fila1}<span className="sep">{"\u00a0·\u00a0"}</span></span>
              <span className="copia">{fila1}<span className="sep">{"\u00a0·\u00a0"}</span></span>
            </p>
            <p className="pano__pista pano__pista--2 titulo m-0">
              <span>{fila2}<span className="sep">{"\u00a0·\u00a0"}</span></span>
              <span className="copia">{fila2}<span className="sep">{"\u00a0·\u00a0"}</span></span>
            </p>
          </div>
          {etiqueta && <EtiquetaOrigen texto={etiqueta} enHero className="!top-[calc(var(--alto-cabecera)+16px)]" />}
        </div>
        <div className="pano__pie">
          <div className="contenedor flex flex-col gap-5 !pl-0 lg:flex-row lg:items-end lg:justify-between libre-flotante">
            <div className="flex flex-col gap-3">
              <p className="etiqueta !text-white">{medio?.titulo ?? `${titulos.length === 1 ? "Un servicio" : `${titulos.length} servicios`}, una forma de trabajar`}</p>
              {hayTrabajos && (
                <EnlaceFlecha href="/trabajos" className="text-white">
                  Ver trabajos
                </EnlaceFlecha>
              )}
            </div>
            <Pareja cta={cta} tono="oscuro" />
          </div>
        </div>
      </div>
    </section>
  );
}
