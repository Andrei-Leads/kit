import type { CSSProperties } from "react";
import type { Imagen, Video } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { MedioHero } from "@/components/base/MedioHero";
import { Senal } from "@/components/Titular";
import type { DatosCta } from "@/lib/textos";

import type { Cifra } from "@/lib/cifras";

type Props = {
  /** `videoPano` o, si falta, `videoHero` (el hero de este template nunca lleva vídeo). */
  video?: Video;
  /** Respaldo sin vídeo: `imagenesHero[3]`. Sin nada: trama DIN. */
  imagen?: Imagen;
  cifras: readonly Cifra[];
  /** Títulos de los servicios para la marquesina (decorativa). */
  servicios: readonly string[];
  cta: DatosCta;
};

/**
 * Pano (encargo §6.4 y §12, recurso 4): un macro del cuadro que crece con el
 * scroll hasta pantalla completa, se queda fijo con las cifras encima y termina
 * con la pareja de CTA antes de soltar el scroll. Todo con CSS
 * (`view-timeline: --pano`, rango `contain`); el JS solo es ControlVideo.
 * Sin soporte, sin JS o con «reducir movimiento»: foto a ancho completo quieta,
 * con velo, cifras finales y una sola copia de la marquesina.
 */
export function Pano({ video, imagen, cifras, servicios, cta }: Props) {
  const poster = video?.poster ?? imagen;
  const marquesina = servicios.join(" · ") + " · ";
  return (
    <section data-tono="oscuro" aria-labelledby="titulo-pano" className="pano">
      <div className="pano-escena">
        <div className="pano-marco">
          <MedioHero video={video} imagen={imagen} sizes="100vw" className="pano-medio" />
          <div aria-hidden="true" className="pano-velo" />
        </div>

        <h2 id="titulo-pano" className="sr-only">
          {cifras.length > 0 ? "La empresa en cifras" : "La instalación, por dentro"}
        </h2>
        <p aria-hidden="true" className="pano-lema absolute inset-x-0 top-[32%] lg:top-[46%] m-0 -translate-y-1/2 px-6 text-center font-titulo text-[clamp(2rem,1.4rem+2.4vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-balance">
          La instalación, <Senal>por dentro</Senal>.
        </p>

        {marquesina.trim() !== "·" && (
          <div aria-hidden="true" className="marquesina relative mt-[clamp(128px,20vh,200px)] opacity-[0.14]">
            <div className="marquesina-pista">
              <span className="marquesina-copia pe-[0.3em] text-pano font-light">{marquesina}</span>
              <span className="marquesina-copia pe-[0.3em] text-pano font-light">{marquesina}</span>
            </div>
          </div>
        )}

        <div className="contenedor relative mt-auto flex flex-col gap-[clamp(20px,3vw,40px)] pt-16 pb-[calc(var(--alto-barra)+20px)] md:pb-[clamp(32px,6vh,72px)]">
          {cifras.length > 0 && (
            <dl className="pano-cifras m-0 grid max-w-[960px] grid-cols-2 gap-x-8 gap-y-5 lg:grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
              {cifras.map((c) => (
                <div key={c.dt} className="flex flex-col-reverse gap-2 border-t border-[var(--color-linea)] pt-3">
                  <dd className="cifra relative m-0 text-[clamp(3.25rem,2rem+6vw,7.5rem)]">
                    <span className="cifra-texto">{c.dd}</span>
                    <Odometro valor={c.dd} />
                  </dd>
                  <dt className="etiqueta text-acento">{c.dt}</dt>
                </div>
              ))}
            </dl>
          )}
          <Pareja cta={cta} velo />
        </div>
      </div>
    </section>
  );
}

/**
 * Contador de CSS (encargo §12): duplicado `aria-hidden` donde cada dígito es
 * una columna 0…9 que se desplaza con `translate` hasta su dígito. La cifra
 * real está en el HTML (`.cifra-texto`): es lo que se lee y lo que se ve sin
 * soporte.
 */
function Odometro({ valor }: { valor: string }) {
  let k = 0;
  return (
    <span aria-hidden="true" className="odometro">
      {[...valor].map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} className="odometro-columna">
            <span style={{ "--d": Number(ch), "--k": k++ } as CSSProperties}>
              {Array.from({ length: 10 }, (_, n) => (
                <span key={n}>{n}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i}>{ch}</span>
        ),
      )}
    </span>
  );
}
