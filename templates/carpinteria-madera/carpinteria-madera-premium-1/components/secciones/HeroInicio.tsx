import { mediaVisible, type Imagen, type SiteConfig, type Video } from "@andrei-leads/core";

import { ParejaCta } from "@/components/Botones";
import { Destacada } from "@/components/Titulo";
import { Veta } from "@/components/Veta";
import { MedioHero } from "@/components/base/MedioHero";
import type { DatosCta } from "@/lib/textos";

type Props = {
  video?: Video;
  imagen?: Imagen;
  sector: string;
  ciudad: string;
  anioFundacion?: number;
  valoracion?: SiteConfig["valoracion"];
  cta: DatosCta;
  confianza?: string;
};

/**
 * Hero (encargo §5.1): vídeo a sangre con su póster (LCP), `imagenesHero[0]` sin
 * vídeo, o tipográfico sobre tinta con veta. Abajo a la izquierda: etiqueta, h1
 * «{sector} en {ciudad}» y la pareja de 56 px con la línea de confianza. Nada se
 * anima aquí.
 */
export function HeroInicio({ video, imagen, sector, ciudad, anioFundacion, valoracion, cta, confianza }: Props) {
  const hayMedio = Boolean(video || imagen);
  return (
    <section data-tono="oscuro" data-hero="medio" className="hero sobre-oscuro relative flex flex-col justify-end overflow-hidden bg-tinta text-fondo">
      {hayMedio ? (
        <MedioHero
          video={video}
          imagen={imagen}
          sizes="100vw"
          preload
          className="absolute inset-0"
          claseControles="top-[72px] right-(--margen)"
        >
          <div aria-hidden="true" className="velo-hero" />
        </MedioHero>
      ) : (
        <Veta />
      )}
      <div className="contenedor relative z-[2] flex flex-wrap items-end gap-x-8 gap-y-5 pb-[calc(88px+env(safe-area-inset-bottom))] lg:pb-16">
        <div className="min-w-0 flex-[1_1_430px]">
          <p className="etiqueta m-0 text-papel-suave">Taller de ebanistería{anioFundacion ? ` · desde ${anioFundacion}` : ""}</p>
          <h1 className="titulo mt-3 text-display">
            {sector} en <Destacada>{ciudad}</Destacada>
          </h1>
        </div>
        <div className="flex max-w-[600px] min-w-0 flex-[1_1_600px] flex-col gap-3">
          {!hayMedio && valoracion && (
            <p className="m-0 mb-3 hidden items-baseline gap-3 lg:flex">
              <span className="titulo text-[clamp(3rem,2rem+3vw,5rem)] leading-none">{mediaVisible(valoracion.media)}</span>
              <span className="text-sm text-papel-suave">de 5 · {valoracion.total} reseñas en Google</span>
            </p>
          )}
          <ParejaCta cta={cta} tono="oscuro" confianza={confianza} className="lg:whitespace-nowrap" />
        </div>
      </div>
    </section>
  );
}
