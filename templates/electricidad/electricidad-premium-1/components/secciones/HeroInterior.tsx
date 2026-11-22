import type { ReactNode } from "react";
import type { Ancla, Imagen } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Collage } from "@/components/Collage";
import { Migas } from "@/components/base/Migas";
import { NumeroTrama, TramaDin } from "@/components/TramaDin";
import type { DatosCta } from "@/lib/textos";

type Props = {
  migas: readonly Ancla[];
  /** h1 corto con su palabra destacada. */
  titulo: ReactNode;
  frase: string;
  cta: DatosCta;
  textoWhatsapp?: ReactNode;
  confianza?: string;
  /** Dos fotos a dos escalas; sin fotos, trama DIN con el número de página. */
  imagenes?: readonly Imagen[];
  numeroPagina: string;
  /** Sustituye a las fotos (p. ej. la trama de /contacto con su contenido). */
  aparte?: ReactNode;
  /** Sin columna de medio (la ficha de trabajo lleva su escenográfico debajo). */
  sinMedio?: boolean;
};

/**
 * HeroInterior (encargo §7): migas, h1 corto con palabra destacada, una frase,
 * la pareja de 56 px con el mensaje de la página y la línea de confianza, sin
 * scroll a 375×667; dos fotos a dos escalas a la derecha (debajo en móvil,
 * después de los botones). Quieto desde el primer pintado.
 */
export function HeroInterior({ migas, titulo, frase, cta, textoWhatsapp, confianza, imagenes = [], numeroPagina, aparte, sinMedio }: Props) {
  return (
    <section aria-labelledby="titulo-pagina" className="pt-[clamp(16px,-2px+5vw,64px)] pb-[clamp(72px,3.5rem+4vw,128px)]">
      <div className="contenedor flex flex-wrap items-start gap-x-[clamp(32px,4vw,64px)] gap-y-12">
        <div className="flex min-w-0 flex-[7_1_560px] flex-col gap-[clamp(16px,0.8rem+1vw,28px)]">
          <Migas migas={migas} />
          <h1 id="titulo-pagina" className="titulo-interior">
            {titulo}
          </h1>
          <p className="m-0 line-clamp-3 max-w-[520px] text-[17px] leading-[1.55] text-texto-suave sm:line-clamp-none">{frase}</p>
          <Pareja cta={cta} textoWhatsapp={textoWhatsapp} confianza={confianza} className="pt-1" />
        </div>
        {!sinMedio && (<div className="w-full min-w-0 flex-[5_1_320px] lg:max-w-[440px]">
          {aparte ??
            (imagenes.length > 0 ? (
              <Collage imagenes={imagenes.slice(0, 2)} preload sizes="(min-width: 1024px) 340px, 78vw" />
            ) : (
              <TramaDin className="ms-auto max-w-[440px]">
                <NumeroTrama numero={numeroPagina} />
              </TramaDin>
            ))}
        </div>)}
      </div>
    </section>
  );
}
