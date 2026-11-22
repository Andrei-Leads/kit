import type { Imagen } from "@andrei-leads/core";

import { Luz } from "@/components/Luz";
import { ParejaCta, type DatosCta } from "@/components/ParejaCta";
import { Foto } from "@/components/base/Foto";
import { TEXTO_WA } from "@/lib/mensajes";
import { pieOrigen, type Confianza } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  sector: string;
  ciudad: string;
  /** `imagenesHero[0..2]`: grande (LCP), mediana y pequeña. */
  fotos: readonly Imagen[];
  cta: DatosCta;
  confianza: Confianza;
};

/**
 * HeroMarco (encargo §5.1): antetítulo, `h1` «{sector} en *{ciudad}*», la pareja de 56 px
 * (apilada a todo el ancho en móvil, visible sin scroll a 375×667) y la confianza; debajo
 * (móvil) o a la derecha (escritorio), el collage 4:5 a tres escalas. Quieto al cargar: el
 * parallax (CSS, `scroll(root)` de 0 a 100svh) empieza en `translate: 0`. Con 1 o 2 fotos,
 * la que falta la ocupa `Luz`; sin fotos, hero tipográfico con un panel de `Luz`.
 */
export function HeroMarco({ sector, ciudad, fotos, cta, confianza }: Props) {
  const [grande, mediana, pequena] = fotos;
  const collage = fotos.length > 0;
  const pie = pieOrigen(fotos.slice(0, 3));
  return (
    <section data-tono="claro" aria-labelledby="titulo-hero" className="bg-fondo">
      <div className="contenedor rejilla items-end pt-[72px] pb-12 lg:min-h-[max(720px,100svh)] lg:pt-28 lg:pb-16">
        <div className={cn("lg:row-start-1 lg:pb-6", collage ? "lg:col-[1/7]" : "lg:col-[1/9]")}>
          <p className="etiqueta">
            {sector} · {ciudad}
          </p>
          <h1
            id="titulo-hero"
            className={cn(
              "titulo-display mt-3",
              collage ? "lg:max-w-[14ch]" : "text-[clamp(2.75rem,1.2rem+6vw,6rem)] lg:max-w-[16ch]",
            )}
          >
            {sector} en <em>{ciudad}</em>
          </h1>
          <ParejaCta cta={cta} textoWhatsapp={TEXTO_WA} tamano={56} apilar confianza={confianza} className="mt-6 lg:max-w-[620px]" />
        </div>

        {collage ? (
          <div className="mt-7 w-full sm:mx-auto sm:max-w-[520px] lg:col-[7/13] lg:row-start-1 lg:mt-0 lg:max-w-none">
            <div className="relative aspect-[100/117] w-full lg:aspect-[580/635]">
              <div className="absolute top-0 right-0 z-[1] w-[76%] lg:top-[6.3%] lg:w-[69%]">
                <div className="px px-grande">
                  {grande ? (
                    <Foto imagen={grande} sizes="(min-width: 1024px) 32vw, 76vw" preload etiqueta="no" />
                  ) : (
                    <Luz cristales={4} />
                  )}
                </div>
              </div>
              <div className="absolute top-[53%] left-0 z-[2] w-[44%] lg:top-[56.7%] lg:left-[12%] lg:w-[38%]">
                <div className="px px-mediana">
                  {mediana ? <Foto imagen={mediana} sizes="(min-width: 1024px) 18vw, 44vw" etiqueta="no" /> : <Luz cristales={2} fondo="#dde0e1" />}
                </div>
              </div>
              <div className="absolute top-[22px] left-0 z-[3] w-[28%] lg:top-[11%] lg:left-[1.7%] lg:w-[24%]">
                <div className="px px-pequena">
                  {pequena ? <Foto imagen={pequena} sizes="(min-width: 1024px) 12vw, 28vw" etiqueta="no" /> : <Luz cristales={1} fondo="#dde0e1" />}
                </div>
              </div>
            </div>
            {pie && <p className="m-0 mt-2 text-right text-xs text-texto-suave">{pie}</p>}
          </div>
        ) : (
          <div className="mt-7 w-full lg:col-[9/13] lg:row-start-1 lg:mt-0 lg:max-w-[440px] lg:justify-self-end">
            <Luz cristales={4} />
          </div>
        )}
      </div>
    </section>
  );
}
