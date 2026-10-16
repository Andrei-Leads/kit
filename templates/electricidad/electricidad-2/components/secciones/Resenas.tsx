import { BotonLlamada, type Resena, type SiteConfig } from "@andrei-leads/core";
import { ChevronDown, ExternalLink, Phone } from "lucide-react";

import { ContadorTotal } from "@/components/ContadorTotal";
import { Estrellas } from "@/components/Estrellas";
import { buttonVariants } from "@/components/ui/button";
import { cifraGrande, h2, tarjeta } from "@/lib/estilos";
import { firmaResena, mediaVisible, palabraResenas, telefonoVisible } from "@/lib/formato";
import { RESENAS_VISIBLES, resenasRecientes, UMBRAL_RESENA_LARGA } from "@/lib/resenas";
import { textos } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  /** Todas las reseñas de los datos (al menos 1): la sección elige las más recientes. */
  resenas: Resena[];
  valoracion?: SiteConfig["valoracion"];
  fichaGoogle?: string;
  telefono: string;
};

const REJILLA = "grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5";

/**
 * Una reseña (Specs §5): comillas « en primario (decorativas, con aire respecto a la primera línea), texto en
 * serif cursiva de 20 px, firma en etiqueta oblicua («Autor · mes de año»; sin fecha, solo el autor) y
 * estrellas pequeñas solo si la puntuación es < 5. Si es larga (> 280 caracteres): 6 líneas y un
 * `details/summary` «Leer más» que quita el recorte con `:has(details[open])`: funciona sin JavaScript.
 * `indice` escalona la aparición (`--i`); solo las 3 primeras se animan (`animar`).
 */
function TarjetaResena({ resena, indice, animar }: { resena: Resena; indice: number; animar: boolean }) {
  const larga = resena.texto.length > UMBRAL_RESENA_LARGA;
  return (
    <figure
      data-anim={animar ? "resena" : undefined}
      style={{ "--i": indice } as React.CSSProperties}
      className={cn(tarjeta, "group m-0 flex flex-col gap-3 px-6 pt-5 pb-6")}
    >
      <div
        aria-hidden="true"
        data-anim={animar ? "comillas" : undefined}
        className="-mt-2.5 -ml-1 h-[50px] font-serif text-[76px] leading-none text-primario"
      >
        «
      </div>
      <blockquote
        className={cn(
          "m-0 max-w-[60ch] font-serif text-xl leading-normal text-pretty italic",
          larga && "line-clamp-6 group-has-[details[open]]:line-clamp-none"
        )}
      >
        {resena.texto}
      </blockquote>
      {larga && (
        <details className="group/leer -mt-1.5 self-start">
          <summary className="inline-flex min-h-11 cursor-pointer items-center font-bold text-tinta underline underline-offset-4">
            <span className="group-open/leer:hidden">{textos.leerMas}</span>
            <span className="hidden group-open/leer:inline">{textos.leerMenos}</span>
          </summary>
        </details>
      )}
      <figcaption className="mt-auto flex flex-wrap items-center gap-x-3.5 gap-y-2.5 pt-1.5">
        <span className="etiqueta-oblicua ml-[3px] py-[3px] text-base font-semibold [--etiqueta-fondo:var(--color-piedra-2)]">
          {firmaResena(resena)}
        </span>
        {resena.puntuacion < 5 && <Estrellas valor={resena.puntuacion} tamano={16} />}
      </figcaption>
    </figure>
  );
}

/**
 * Reseñas, la sección estrella del inicio (puesto 2, banda piedra-2). h2 «Lo que dicen tus vecinos»;
 * resumen solo con `valoracion` (nota media de 92 px, estrellas del resumen que se rellenan hasta la media y
 * «{total} reseñas en Google» con contador); las 3 más recientes por fecha (sin fecha, al final); hasta 3 más
 * tras «Ver más opiniones (n)» (`details`); `llamada-acento` y, solo con `fichaGoogle`, «Ver todas en Google».
 * Con 1 o 2 reseñas se ven igual de grandes (`auto-fit`: 1 a todo el ancho, 2 en dos columnas), sin huecos.
 * El corte superior lo pone el hero; el inferior, la página.
 */
export function Resenas({ resenas, valoracion, fichaGoogle, telefono }: Props) {
  const recientes = resenasRecientes(resenas);
  const primeras = recientes.slice(0, RESENAS_VISIBLES);
  const resto = recientes.slice(RESENAS_VISIBLES);

  return (
    <section aria-labelledby="titulo-resenas" className="bg-piedra-2 pt-6 pb-16 lg:pb-[104px]">
      <div className="contenedor">
        <h2 id="titulo-resenas" className={cn(h2, "mb-6")}>
          {textos.tituloResenas}
        </h2>

        {valoracion && (
          <div className="mb-8 flex flex-wrap items-center gap-x-[22px] gap-y-2">
            <div className={cifraGrande}>{mediaVisible(valoracion.media)}</div>
            <div className="flex flex-col gap-1.5">
              <Estrellas valor={valoracion.media} tamano={24} animada />
              <p className="m-0 text-lg font-semibold">
                <ContadorTotal valor={valoracion.total} /> {palabraResenas(valoracion.total)}
              </p>
            </div>
          </div>
        )}

        <div className={REJILLA}>
          {primeras.map((r, i) => (
            <TarjetaResena key={`${r.autor}-${i}`} resena={r} indice={i} animar />
          ))}
        </div>

        {resto.length > 0 && (
          <details className="group/mas mt-5">
            <summary className="inline-flex min-h-12 cursor-pointer items-center gap-2 font-bold text-tinta underline decoration-primario decoration-2 underline-offset-4">
              {textos.verMasOpiniones} ({resto.length})
              <ChevronDown
                aria-hidden="true"
                strokeWidth={2}
                className="size-[18px] flex-none group-open/mas:rotate-180"
              />
            </summary>
            <div className={cn(REJILLA, "mt-3")}>
              {resto.map((r, i) => (
                <TarjetaResena key={`${r.autor}-${i}`} resena={r} indice={i} animar={false} />
              ))}
            </div>
          </details>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3.5">
          <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "llamadaAcento" })}>
            <Phone aria-hidden="true" strokeWidth={2} strokeLinejoin="round" className="size-5 flex-none" />
            <span>
              {textos.llamanos}: {telefonoVisible(telefono)}
            </span>
          </BotonLlamada>
          {fichaGoogle && (
            <a
              href={fichaGoogle}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "enlace" })}
            >
              {textos.verTodasGoogle}
              <ExternalLink aria-hidden="true" strokeWidth={2} className="size-4 flex-none" />
              <span className="sr-only">(se abre en otra pestaña)</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
