import { mediaVisible, type SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Collage } from "@/components/Collage";
import { TramaDin } from "@/components/TramaDin";
import type { DatosCta } from "@/lib/textos";

type Props = {
  negocio: Pick<SiteConfig["negocio"], "sector" | "descripcionCorta">;
  ciudad: string;
  imagenes: SiteConfig["imagenesHero"];
  valoracion: SiteConfig["valoracion"];
  cta: DatosCta;
  confianza?: string;
};

/**
 * HeroTension (encargo §5): antetítulo, h1 fino y gigante con la ciudad en
 * señal, descripción, la pareja de 56 px y la línea de confianza; el collage va
 * después (debajo en móvil). Todo quieto y completo desde el primer pintado:
 * el parallax del collage empieza en 0 con el primer scroll.
 * Sin fotos: trama DIN 4:5 con la valoración grande dentro.
 */
export function HeroTension({ negocio, ciudad, imagenes, valoracion, cta, confianza }: Props) {
  const fotos = imagenes.slice(0, 3);
  return (
    <section aria-labelledby="titulo-hero" className="pt-[clamp(20px,-2px+6vw,72px)] pb-[clamp(80px,4rem+5vw,144px)]">
      <div className="contenedor flex flex-wrap items-start gap-x-[clamp(32px,4vw,64px)] gap-y-14">
        <div className="flex min-w-0 flex-[7_1_560px] flex-col gap-[clamp(18px,1rem+1vw,32px)]">
          <p className="etiqueta m-0 text-acento">
            {negocio.sector} · {ciudad}
          </p>
          <h1 id="titulo-hero" className="titulo-display">
            {negocio.sector} en <span className="text-acento">{ciudad}</span>
          </h1>
          <p className="m-0 line-clamp-4 max-w-[520px] text-[17px] leading-[1.55] text-texto-suave sm:line-clamp-none">{negocio.descripcionCorta}</p>
          <Pareja cta={cta} confianza={confianza} className="pt-[clamp(4px,1vw,12px)]" />
        </div>
        <div className="w-full min-w-0 flex-[5_1_320px] lg:max-w-[470px]">
          {fotos.length > 0 ? (
            <Collage imagenes={fotos} modo="hero" preload sizes="(min-width: 1024px) 400px, 78vw" />
          ) : (
            <TramaDin className="ms-auto max-w-[470px]">
              {valoracion && (
                <div className="self-start border border-[var(--color-linea)] bg-fondo px-[18px] pt-4 pb-[18px]">
                  <p className="cifra m-0">{mediaVisible(valoracion.media)}</p>
                  <p className="etiqueta m-0 mt-2.5 text-acento">{valoracion.total} reseñas en Google</p>
                </div>
              )}
            </TramaDin>
          )}
        </div>
      </div>
    </section>
  );
}
