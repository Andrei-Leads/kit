import type { Imagen, Video } from "@andrei-leads/core";

import { ParejaCta } from "@/components/Botones";
import { EnlaceFlecha } from "@/components/EnlaceFlecha";
import { Destacada } from "@/components/Titulo";
import { Veta } from "@/components/Veta";
import { MedioHero } from "@/components/base/MedioHero";
import type { DatosCta } from "@/lib/textos";

type Props = {
  videoPano?: Video;
  videoHero?: Video;
  imagen?: Imagen;
  ciudad: string;
  cta: DatosCta;
};

function Frase() {
  return (
    <span className="titulo pr-[0.3em] text-pano">
      Hecho <Destacada>a medida</Destacada> · Hecho <Destacada>a medida</Destacada> ·
    </span>
  );
}

/**
 * Pano (recurso 4, encargo §5.4): el taller que crece con el scroll hasta pantalla
 * completa, con la marquesina «Hecho a medida» encima y la pareja de CTAs antes de
 * soltar el scroll. Medio: `videoPano` → `videoHero` (desde el segundo 4) →
 * `imagenesHero[0]` quieta → versión tipográfica en tinta con veta. Todo CSS
 * (globals.css, `.pano*`); sin soporte o con «reducir movimiento», medio quieto a
 * ancho completo y la pareja debajo.
 */
export function Pano({ videoPano, videoHero, imagen, ciudad, cta }: Props) {
  const video = videoPano ?? (videoHero ? { ...videoHero, src: `${videoHero.src}#t=4`, srcAv1: videoHero.srcAv1 && `${videoHero.srcAv1}#t=4` } : undefined);
  const hayMedio = Boolean(video || imagen);
  return (
    <section id="taller" data-tono="oscuro" aria-labelledby="titulo-pano" className="pano sobre-oscuro">
      <div className="pano-escena">
        <div className="pano-medio bg-tinta-suave">
          {hayMedio ? (
            <MedioHero video={video} imagen={imagen} sizes="100vw" diferido className="absolute inset-0" claseControles="top-[72px] right-(--margen)">
              <div aria-hidden="true" className="absolute inset-0 bg-tinta/35" />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-t from-tinta/85 to-tinta/0" />
            </MedioHero>
          ) : (
            <Veta />
          )}
          <div className="pano-marquesina z-[3]">
            <div className="pano-pista">
              <Frase />
              <span aria-hidden="true">
                <Frase />
              </span>
            </div>
          </div>
        </div>
        <div className="contenedor pointer-events-none absolute inset-x-0 top-[clamp(80px,10vh,120px)] z-[3]">
          <h2 id="titulo-pano" className="etiqueta m-0 text-papel-suave">
            El taller
          </h2>
        </div>
        <div className="pano-pie z-[3]">
          <div className="contenedor flex flex-wrap items-end justify-between gap-x-12 gap-y-5">
            <div className="pano-frase max-w-[420px] flex-[1_1_320px]">
              <p className="m-0 text-[clamp(16px,15px+0.3vw,18px)] leading-normal">Cada pieza sale de nuestro banco, en {ciudad}.</p>
              <EnlaceFlecha href="/empresa" className="mt-3">
                Conoce el taller
              </EnlaceFlecha>
            </div>
            <ParejaCta cta={cta} tono="oscuro" className="pano-cta flex-[1_1_440px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
