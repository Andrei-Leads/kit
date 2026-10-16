import type { Resena } from "@andrei-leads/core";

import { Corte } from "@/components/Corte";
import { Estrellas } from "@/components/Estrellas";
import { firmaResena } from "@/lib/formato";
import { UMBRAL_RESENA_LARGA } from "@/lib/resenas";
import { cn } from "@/lib/utils";

type Props = {
  resena: Resena;
  /** Fondo de la banda de arriba, para el corte (piedra por defecto). */
  desde?: "piedra" | "piedra-2";
};

/**
 * Cita grande de cierre de la ficha (mockup 2b/2i, Specs): corte + banda piedra-2 con comillas « de 120 px
 * en primario (caja de 56 px y `pt-9` en la cita, como `TrabajoCita`: el glifo no pisa la primera línea), la reseña en serif cursiva de 30 px (hasta 30 caracteres de ancho; si es larga, de 24 px:
 * no se recorta) y la firma en etiqueta oblicua blanca («Autor · mes de año»; sin fecha, solo el autor;
 * estrellas solo si la puntuación es < 5). El corte de salida lo dibuja el CTA siguiente. La página
 * solo la llama con al menos 1 reseña.
 */
export function CitaGrande({ resena, desde = "piedra" }: Props) {
  const larga = resena.texto.length > UMBRAL_RESENA_LARGA;
  return (
    <>
      <Corte de={desde} a="piedra-2" />
      <div className="-mt-px bg-piedra-2 pt-2 pb-16">
        <figure className="contenedor m-0">
          <div
            aria-hidden="true"
            className="-ml-1.5 h-[56px] font-serif text-[120px] leading-none text-primario"
          >
            «
          </div>
          <blockquote
            className={cn(
              "m-0 pt-9 font-serif leading-[1.35] text-pretty italic",
              larga ? "max-w-[44ch] text-2xl" : "max-w-[30ch] text-[26px] md:text-[30px]"
            )}
          >
            {resena.texto}
          </blockquote>
          <figcaption className="mt-5 flex flex-wrap items-center gap-x-3.5 gap-y-2.5">
            <span className="etiqueta-oblicua ml-[3px] py-[3px] text-base font-semibold [--etiqueta-fondo:#ffffff]">
              {firmaResena(resena)}
            </span>
            {resena.puntuacion < 5 && <Estrellas valor={resena.puntuacion} tamano={16} />}
          </figcaption>
        </figure>
      </div>
    </>
  );
}
