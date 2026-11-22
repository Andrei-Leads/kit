import type { SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { IconoEstrella } from "@/components/Iconos";
import { MedioHero } from "@/components/base/MedioHero";
import type { DatosCta } from "@/lib/textos";

type Props = {
  config: Pick<SiteConfig, "negocio" | "contacto" | "videoHero" | "imagenesHero">;
  cta: DatosCta;
  confianza?: string;
  /** La línea de confianza es la valoración (lleva estrella) o el horario. */
  conEstrella: boolean;
};

/**
 * Hero a sangre del inicio (encargo §5.1). `videoHero` si existe; si no,
 * `imagenesHero[0]`; sin ninguno, hero tipográfico en tinta con la textura
 * isométrica. Abajo a la izquierda: etiqueta, `h1` «{sector} en {ciudad}» con la
 * ciudad destacada, la pareja `*-hero` y la línea de confianza.
 * NADA animado entre el h1 y BotonLlamada (ni la foto ni el póster).
 */
export function HeroCaudal({ config, cta, confianza, conEstrella }: Props) {
  const { negocio, contacto, videoHero, imagenesHero } = config;
  const conMedio = Boolean(videoHero || imagenesHero[0]);
  return (
    <section
      data-tono="oscuro"
      data-hero="medio"
      aria-labelledby="titulo-hero"
      className="sobre-tinta relative isolate flex h-[max(560px,88svh)] items-end overflow-hidden bg-tinta text-white lg:h-[92vh] lg:min-h-[640px]"
    >
      {conMedio ? (
        <MedioHero
          video={videoHero}
          imagen={imagenesHero[0]}
          sizes="100vw"
          encuadre="68% center"
          className="!absolute inset-0 -z-10 rounded-none lg:[&_img]:![object-position:center]"
        />
      ) : (
        <div aria-hidden="true" className="textura absolute inset-0 -z-10" />
      )}
      <div aria-hidden="true" className="absolute inset-0 -z-[5] [background:var(--velo-hero)]" />
      <div className="contenedor pb-[22px] lg:pb-20">
        <div className="flex max-w-[640px] flex-col gap-4 lg:gap-5">
        <p className="etiqueta">
          {negocio.nombre}
          {negocio.anioFundacion && <> · desde {negocio.anioFundacion}</>}
        </p>
        <h1 id="titulo-hero" className="titulo text-[clamp(2.25rem,12vw,2.8125rem)] lg:text-display">
          {negocio.sector} en <em>{contacto.direccion.ciudad}</em>
        </h1>
        <p className="m-0 max-w-[480px] text-lg leading-relaxed text-white/90 max-lg:hidden">{negocio.descripcionCorta}</p>
        <Pareja cta={cta} tamano="hero" tono="oscuro" className="mt-1.5 lg:mt-3" />
        {confianza && (
          <p className="m-0 flex items-center gap-2 text-sm text-sobre-tinta-suave">
            {conEstrella && <IconoEstrella />}
            {confianza}
          </p>
        )}
        </div>
      </div>
    </section>
  );
}
