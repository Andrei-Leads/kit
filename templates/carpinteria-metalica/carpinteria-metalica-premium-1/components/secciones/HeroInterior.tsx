import type { ReactNode } from "react";
import type { Ancla, Imagen } from "@andrei-leads/core";

import { Luz } from "@/components/Luz";
import { ParejaCta, type DatosCta } from "@/components/ParejaCta";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { pieOrigen, type Confianza } from "@/lib/textos";

type Props = {
  migas: readonly Ancla[];
  antetitulo: string;
  /** `h1` corto; la palabra destacada (cursiva) solo en los textos fijos. */
  titulo: ReactNode;
  frase?: string;
  /** Etiqueta de precio («desde 420 €»), solo con datos. */
  precio?: string;
  cta: DatosCta;
  textoWhatsapp: ReactNode;
  confianza: Confianza;
  /** Dos fotos 4:5 a dos escalas (grande + miniatura desplazada). Sin ninguna, `Luz`. */
  fotos?: readonly (Imagen | undefined)[];
  /** Nombre de View Transition de la foto grande (la miniatura del bloque pasa al hero). */
  transicion?: string;
  /** Sustituye a las fotos (ficha de trabajo). */
  lateral?: ReactNode;
};

/**
 * Hero interior común (encargo §7): migas, antetítulo, `h1` en Hanken 300, una frase, la
 * pareja de 56 px (a todo el ancho en móvil, visible sin scroll a 375×667) y dos fotos 4:5
 * a dos escalas debajo (móvil) o a la derecha (escritorio), con el mismo parallax del hero
 * de inicio, que empieza al hacer scroll. Sin fotos, `Luz`.
 */
export function HeroInterior({ migas, antetitulo, titulo, frase, precio, cta, textoWhatsapp, confianza, fotos = [], transicion, lateral }: Props) {
  const [grande, mini] = fotos;
  const pie = pieOrigen([grande, mini]);
  return (
    <section data-tono="claro" aria-labelledby="titulo-pagina" className="bg-fondo">
      <div className="contenedor rejilla items-end gap-y-10 pt-[88px] pb-12 lg:pt-36 lg:pb-[72px]">
        <div className="lg:col-[1/7] lg:row-start-1">
          <Migas migas={migas} className="mb-7" />
          <p className="etiqueta">{antetitulo}</p>
          <h1 id="titulo-pagina" className="titulo-h1 mt-3 max-w-[16ch]">
            {titulo}
          </h1>
          {frase && <p className="m-0 mt-5 col-texto text-texto-suave">{frase}</p>}
          {precio && <p className="m-0 mt-4 inline-block border border-borde px-3 py-1.5 text-[13px] tracking-[0.06em]">{precio}</p>}
          <ParejaCta cta={cta} textoWhatsapp={textoWhatsapp} tamano={56} apilar confianza={confianza} className="mt-7 lg:max-w-[620px]" />
        </div>
        <div className="w-full lg:col-[8/13] lg:row-start-1">
          {lateral ??
            (grande ? (
              <div className="relative ml-auto max-w-[560px] lg:max-w-none">
                <div className={mini ? "pb-12 lg:pb-16" : undefined}>
                  <div className="ml-auto w-[72%]">
                    <div className="px px-grande">
                      <Foto imagen={grande} sizes="(min-width: 1024px) 28vw, 72vw" preload etiqueta="no" transicion={transicion} />
                    </div>
                  </div>
                </div>
                {mini && (
                  <div className="absolute bottom-7 left-0 z-[2] w-[40%]">
                    <div className="px px-mediana">
                      <Foto imagen={mini} sizes="(min-width: 1024px) 16vw, 40vw" etiqueta="no" />
                    </div>
                  </div>
                )}
                {pie && <p className="m-0 mt-2 text-right text-xs text-texto-suave">{pie}</p>}
              </div>
            ) : (
              <div className="ml-auto w-[72%] max-w-[420px]">
                <Luz cristales={4} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
