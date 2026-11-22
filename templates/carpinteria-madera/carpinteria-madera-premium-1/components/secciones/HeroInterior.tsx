import type { ReactNode } from "react";
import type { Ancla, Imagen } from "@andrei-leads/core";

import { ParejaCta } from "@/components/Botones";
import { Veta } from "@/components/Veta";
import { Migas } from "@/components/base/Migas";
import { Foto } from "@/components/base/Foto";
import type { DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  migas: readonly Ancla[];
  etiqueta?: string;
  /** h1 corto con su palabra destacada. */
  titulo: ReactNode;
  frase?: ReactNode;
  /** Bajo la frase (p. ej. el «desde» de un servicio). */
  extra?: ReactNode;
  cta: DatosCta;
  textoWhatsapp?: string;
  confianza?: string;
  /** Grande 4:5 + miniatura desplazada. Sin fotos, el h1 crece y una franja de veta ocupa su sitio. */
  fotos: readonly (Imagen | undefined)[];
};

/**
 * Hero interior común (encargo §7): papel, migas, etiqueta, h1 en Newsreader 300
 * con palabra destacada, una frase, la pareja de 56 px con su línea de confianza
 * y dos fotos a dos escalas. En móvil, las fotos van debajo de los botones (con
 * parallax: ya es la segunda pantalla); en escritorio, quietas (primera pantalla).
 */
export function HeroInterior({ migas, etiqueta, titulo, frase, extra, cta, textoWhatsapp, confianza, fotos }: Props) {
  const [grande, mini] = fotos.filter((f): f is Imagen => Boolean(f));
  return (
    <section data-tono="claro" aria-labelledby="titulo-pagina" className="contenedor pt-[clamp(1.5rem,4vw,4rem)]">
      <div className={cn("grid items-end gap-x-16 gap-y-12", grande ? "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]" : "lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]")}>
        <div className="min-w-0">
          <Migas migas={migas} className="mb-8" />
          {etiqueta && <p className="etiqueta m-0 text-texto-suave">{etiqueta}</p>}
          <h1 id="titulo-pagina" className={cn("titulo mt-3", grande ? "text-h1" : "text-display")}>
            {titulo}
          </h1>
          {frase && <p className="medida mt-6 text-cuerpo text-texto-suave">{frase}</p>}
          {extra}
          <ParejaCta cta={cta} tono="claro" textoWhatsapp={textoWhatsapp} confianza={confianza} className="mt-8" />
        </div>
        {grande ? (
          <div className={cn("relative", mini && "pb-[14%]")}>
            <div className={cn("parallax-movil", mini ? "ml-auto w-[78%]" : "w-full")}>
              <Foto imagen={grande} sizes="(min-width: 1024px) 420px, 78vw" proporcion="4/5" preload />
            </div>
            {mini && (
              <div className="absolute bottom-0 left-0 w-[40%]">
                <Foto imagen={mini} sizes="(min-width: 1024px) 220px, 40vw" proporcion="4/5" className="rounded-foto" />
              </div>
            )}
          </div>
        ) : (
          <div aria-hidden="true" className="relative h-40 overflow-hidden bg-tinta lg:h-full lg:min-h-[280px]">
            <Veta />
          </div>
        )}
      </div>
    </section>
  );
}
