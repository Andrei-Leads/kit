import type { Trabajo } from "@andrei-leads/core";

import { Corte } from "@/components/Corte";
import { cn } from "@/lib/utils";

type Props = {
  testimonio: NonNullable<Trabajo["testimonio"]>;
};

/** Citas de más de 280 caracteres (como las reseñas largas): 24 px y más ancho, sin recortar. */
const UMBRAL_LARGA = 280;

/**
 * Cita grande del `testimonio` (mockup 2e/2j): corte piedra → piedra-2 y banda piedra-2 con comillas « de
 * 120 px en primario (decorativas), la cita en serif cursiva de 30 px (hasta 30 caracteres de ancho) y el
 * autor en etiqueta oblicua blanca. El testimonio no lleva fecha ni puntuación. El corte de salida lo dibuja
 * el CTA que sigue (`desde="piedra-2"`).
 */
export function TrabajoCita({ testimonio }: Props) {
  const larga = testimonio.texto.length > UMBRAL_LARGA;
  return (
    <>
      <Corte de="piedra" a="piedra-2" />
      <section aria-label="Opinión del cliente" className="-mt-px bg-piedra-2 pt-2 pb-16">
        <figure className="contenedor m-0">
          <div aria-hidden="true" className="-ml-1.5 h-[56px] font-serif text-[120px] leading-none text-primario">
            «
          </div>
          <blockquote
            className={cn(
              "m-0 pt-9 font-serif leading-[1.35] text-pretty italic",
              larga ? "max-w-[44ch] text-2xl" : "max-w-[30ch] text-[26px] md:text-[30px]"
            )}
          >
            {testimonio.texto}
          </blockquote>
          <figcaption className="mt-5">
            <span className="etiqueta-oblicua ml-[3px] py-[3px] text-base font-semibold [--etiqueta-fondo:#ffffff]">
              {testimonio.autor}
            </span>
          </figcaption>
        </figure>
      </section>
    </>
  );
}
