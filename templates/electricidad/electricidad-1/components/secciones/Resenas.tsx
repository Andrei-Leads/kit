import type { SiteConfig } from "@andrei-leads/core";
import { ArrowUpRight } from "lucide-react";

import { Regla } from "@/components/Regla";
import { TextoResena } from "@/components/TextoResena";
import { buttonVariants } from "@/components/ui/button";
import { h2 } from "@/lib/estilos";
import { estrellas, fechaResena, mediaVisible, totalResenas } from "@/lib/formato";
import { resenasRecientes, UMBRAL_RESENA_LARGA } from "@/lib/resenas";
import { cn } from "@/lib/utils";

type Props = {
  numero: string;
  resenas: SiteConfig["resenas"];
  valoracion?: SiteConfig["valoracion"];
  fichaGoogle?: string;
  /** Cuántas reseñas se pintan (las más recientes). */
  max?: number;
  className?: string;
};

/**
 * Reseñas (Specs §2): resumen (solo con `valoracion`) y las 3 más recientes en tarjetas rectas
 * (apiladas en móvil, 3 columnas en escritorio; sin carrusel). Largas (> 240 caracteres): 5 líneas
 * y «Leer más». «Ver todas en Google ↗» solo con `fichaGoogle`. Sin reseñas, la página no la llama.
 * Las estrellas son decorativas (aria-hidden) salvo el `role="img"` de cada tarjeta con su nota.
 */
export function Resenas({ numero, resenas, valoracion, fichaGoogle, max = 3, className }: Props) {
  const lista = resenasRecientes(resenas, max);
  const resumen = valoracion && valoracion.total > 0 ? valoracion : undefined;

  return (
    <section
      aria-labelledby="titulo-resenas"
      className={cn("mt-14 border-t border-regla bg-papel-2 md:mt-24", className)}
    >
      <div className="contenedor seccion-y">
        <Regla numero={numero} etiqueta="Reseñas" />
        <h2 id="titulo-resenas" className={cn(h2, "mt-5")}>
          Lo que dicen nuestros clientes
        </h2>

        {resumen && (
          <div className="mt-6 flex items-center gap-4">
            <span className="font-mono text-5xl leading-none font-bold">
              {mediaVisible(resumen.media)}
              <span className="sr-only"> de 5</span>
            </span>
            <span className="flex flex-col gap-0.5">
              <span aria-hidden="true" className="text-lg tracking-[2px] text-primario">
                {estrellas(resumen.media)}
              </span>
              <span className="text-[15px] text-tinta-suave">{totalResenas(resumen.total)}</span>
            </span>
          </div>
        )}

        <ul className="m-0 mt-7 grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-3">
          {lista.map((resena) => (
            <li key={`${resena.autor}-${resena.fecha ?? ""}-${resena.texto.slice(0, 24)}`} className="flex">
              <figure className="m-0 flex w-full flex-col gap-3 border border-regla bg-papel p-5">
                <span
                  role="img"
                  aria-label={`Puntuación: ${resena.puntuacion} de 5`}
                  className="text-base tracking-[2px] text-primario"
                >
                  {estrellas(resena.puntuacion)}
                </span>
                <TextoResena texto={resena.texto} largo={resena.texto.length > UMBRAL_RESENA_LARGA} />
                <figcaption className="mt-auto flex justify-between gap-3 border-t border-regla pt-3 font-mono text-xs font-medium tracking-[0.06em] text-tinta-suave">
                  <span className="text-tinta">{resena.autor}</span>
                  {resena.fecha && <span>{fechaResena(resena.fecha)}</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {fichaGoogle && (
          <a
            href={fichaGoogle}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "enlaceFlecha" }), "mt-5")}
          >
            <span>Ver todas en Google</span>
            <ArrowUpRight aria-hidden="true" strokeWidth={2} className="size-4 flex-none" />
            <span className="sr-only">(se abre en otra pestaña)</span>
          </a>
        )}
      </div>
    </section>
  );
}
