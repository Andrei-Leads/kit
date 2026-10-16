import type { SiteConfig } from "@andrei-leads/core";
import { ArrowUpRight, Star } from "lucide-react";

import { TextoResena } from "@/components/TextoResena";
import { buttonVariants } from "@/components/ui/button";
import { h2 } from "@/lib/estilos";
import { fechaResena, valoracionTexto } from "@/lib/formato";
import { resenasRecientes, UMBRAL_RESENA_LARGA, valoracionVisible } from "@/lib/resenas";
import { cn } from "@/lib/utils";

type Props = {
  resenas: SiteConfig["resenas"];
  valoracion?: SiteConfig["valoracion"];
  fichaGoogle?: string;
  /** Cuántas reseñas se pintan (las más recientes). */
  max?: number;
  /** Id de la sección (índice lateral). Por defecto `opiniones`. */
  id?: string;
  className?: string;
};

/** Cinco estrellas rellenas hasta `puntuacion`; las vacías, apagadas. Decorativas: la nota va en el `aria-label`. */
function Estrellas({ puntuacion }: { puntuacion: number }) {
  return (
    <span role="img" aria-label={`${puntuacion} de 5 estrellas`} className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          aria-hidden="true"
          strokeWidth={0}
          fill="currentColor"
          className={cn("size-4", n <= puntuacion ? "text-texto" : "text-texto/20")}
        />
      ))}
    </span>
  );
}

/** Columnas en escritorio según cuántas tarjetas hay (1 sola: una tarjeta, no un tercio vacío). */
const COLUMNAS: Record<number, string> = {
  1: "lg:grid-cols-1 lg:max-w-[560px]",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
};

/**
 * Reseñas (Specs §2): resumen (solo con `valoracion`) y las 3 más recientes (sin fecha, al final) en tarjetas
 * compactas con el texto a 4 líneas y «Leer más» (`TextoResena`; sin JS se lee entera). Móvil con 3: desplazamiento
 * horizontal con scroll-snap (la lista recibe foco de teclado); con 1–2, apiladas. Escritorio: rejilla.
 * «Ver todas en Google ↗» solo con `fichaGoogle`. Sin reseñas, la página no la llama.
 */
export function Resenas({ resenas, valoracion, fichaGoogle, max = 3, id = "opiniones", className }: Props) {
  const lista = resenasRecientes(resenas, max);
  if (lista.length === 0) return null;
  const resumen = valoracionVisible(valoracion);
  const carrusel = lista.length >= 3;

  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className={cn("pt-11 lg:pt-16", className)}>
      <h2 id={`${id}-titulo`} className={cn(h2, resumen ? "mb-2.5" : "mb-4")}>
        Lo que dicen nuestros clientes
      </h2>
      {resumen && (
        <p className="m-0 mb-4 flex items-center gap-1.5 text-base font-semibold">
          <Star aria-hidden="true" strokeWidth={0} fill="currentColor" className="size-4 flex-none" />
          {valoracionTexto(resumen)}
        </p>
      )}

      <ul
        tabIndex={carrusel ? 0 : undefined}
        aria-label={carrusel ? "Reseñas de clientes" : undefined}
        className={cn(
          "m-0 list-none gap-2.5 p-0",
          carrusel
            ? "-mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 pb-0.5 [scroll-padding-inline:16px] [scrollbar-width:none] md:-mx-10 md:px-10 md:[scroll-padding-inline:40px] lg:mx-0 lg:grid lg:overflow-visible lg:px-0"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1",
          COLUMNAS[lista.length]
        )}
      >
        {lista.map((r, i) => (
          <li
            key={`${i}-${r.autor}-${r.texto.slice(0, 20)}`}
            className={cn("flex", carrusel && "flex-none basis-[84%] snap-start md:basis-[46%] lg:basis-auto")}
          >
            <figure className="m-0 flex w-full flex-col gap-2.5 rounded-tarjeta bg-superficie px-[18px] py-4">
              <Estrellas puntuacion={r.puntuacion} />
              <TextoResena texto={r.texto} largo={r.texto.length > UMBRAL_RESENA_LARGA} />
              <figcaption className="mt-auto text-[15px] text-texto-suave">
                {r.autor}
                {r.fecha && ` · ${fechaResena(r.fecha)}`}
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
          className={cn(buttonVariants({ variant: "enlaceFlecha" }), "mt-2 gap-1")}
        >
          Ver todas en Google
          <ArrowUpRight aria-hidden="true" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4 flex-none" />
          <span className="sr-only">(se abre en otra pestaña)</span>
        </a>
      )}
    </section>
  );
}
