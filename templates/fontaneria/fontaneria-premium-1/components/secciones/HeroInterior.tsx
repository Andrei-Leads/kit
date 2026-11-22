import type { ReactNode } from "react";
import type { Ancla, Imagen } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Transicion } from "@/components/Transicion";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import type { DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  migas: readonly Ancla[];
  etiqueta?: ReactNode;
  /** Contenido del h1 (con la palabra destacada en `<em>`). */
  titulo: ReactNode;
  frase?: ReactNode;
  /** Línea bajo la frase (p. ej. «Desde 6.900 €»). */
  extra?: ReactNode;
  cta: DatosCta;
  textoWhatsapp?: ReactNode;
  confianza?: string;
  /** Foto grande (4:5, LCP) y miniatura que se solapa abajo a la izquierda. */
  fotos?: [Imagen?, Imagen?];
  /** Nombre de la transición de la foto grande (ficha de trabajo: `foto-{slug}`). */
  transicion?: string;
  /** Contenido propio en lugar de las fotos (p. ej. el antes/después va debajo). */
  sinFotos?: boolean;
};

/**
 * Hero de las páginas interiores (encargo §7), claro: migas, etiqueta, h1 con
 * una palabra destacada, frase, pareja de cierre y línea de confianza. A la
 * derecha, foto grande 4:5 y miniatura solapada, quietas (el parallax nunca va en
 * la primera pantalla). Sin fotos,
 * panel tinta 4:5 con la textura en escritorio y nada en móvil. Nada animado
 * entre el h1 y BotonLlamada.
 */
export function HeroInterior({ migas, etiqueta, titulo, frase, extra, cta, textoWhatsapp, confianza, fotos, transicion, sinFotos }: Props) {
  const [grande, mini] = fotos ?? [];
  return (
    <section data-tono="claro" aria-labelledby="titulo-pagina" className="bg-fondo pt-5 pb-14 lg:pt-14 lg:pb-28">
      <div className={cn("contenedor grid gap-10 lg:items-start", !sinFotos && "lg:grid-cols-[minmax(0,560px)_1fr] lg:gap-16")}>
        <div className="flex flex-col gap-5">
          <Migas migas={migas} className="mb-3 lg:mb-14" />
          {etiqueta && <p className="etiqueta">{etiqueta}</p>}
          <h1 id="titulo-pagina" className="titulo text-[40px] leading-[1.05] lg:text-[clamp(3rem,1.6rem+4vw,5rem)]">
            {titulo}
          </h1>
          {frase && <p className="m-0 max-w-[460px] text-lg leading-relaxed text-texto-suave">{frase}</p>}
          {extra}
          <Pareja cta={cta} textoWhatsapp={textoWhatsapp} className="mt-3 lg:mt-6" />
          {confianza && <p className="m-0 text-sm text-texto-suave">{confianza}</p>}
        </div>
        {!sinFotos &&
          (grande ? (
            <div className={cn("relative lg:mt-0", mini && "pb-[22%] lg:pb-[100px]")}>
              <div className="ml-auto w-[78%] lg:w-[400px]">
                <Transicion nombre={transicion}>
                  <Foto imagen={grande} sizes="(min-width: 1024px) 400px, 78vw" proporcion="4/5" preload />
                </Transicion>
              </div>
              {mini && (
                <div className="absolute bottom-0 left-0 w-[40%] rounded-foto outline-[8px] outline-white lg:right-[320px] lg:left-auto lg:w-[200px]">
                  <Foto imagen={mini} sizes="(min-width: 1024px) 200px, 40vw" proporcion="4/5" />
                </div>
              )}
            </div>
          ) : (
            <div aria-hidden="true" className="textura ml-auto aspect-[4/5] w-[400px] rounded-foto bg-tinta max-lg:hidden" />
          ))}
      </div>
    </section>
  );
}
