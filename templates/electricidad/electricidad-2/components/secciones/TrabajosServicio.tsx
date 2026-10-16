import Link from "next/link";
import type { Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";
import { h2 } from "@/lib/estilos";
import { metaTrabajo } from "@/lib/servicios";
import { textos } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  /** Trabajos con `servicio === slug` (al menos 1: sin trabajos la ficha no llama a este componente). */
  trabajos: Trabajo[];
  /** id del h2 (único en la página). */
  idTitulo: string;
};

/**
 * «Trabajos de este servicio» (mockup 2b/2i): h2 y tarjetas foto 4:3 (`imagenes[0]`, decorativa: el enlace
 * se nombra con el título) + título en serif (h3) enlazado a `/trabajos/<slug>` + línea «ubicación · año» si
 * hay datos. 1 trabajo, a todo el ancho de su columna; 2 o más, dos columnas desde 640 px.
 */
export function TrabajosServicio({ trabajos, idTitulo }: Props) {
  return (
    <section aria-labelledby={idTitulo} className="min-w-0">
      <h2 id={idTitulo} className={cn(h2, "mb-5")}>
        {textos.trabajosDelServicio}
      </h2>
      <ul className={cn("m-0 grid list-none gap-x-5 gap-y-9 p-0", trabajos.length > 1 && "sm:grid-cols-2")}>
        {trabajos.map((t) => {
          const meta = metaTrabajo(t);
          return (
            <li key={t.slug} className="min-w-0">
              <Link href={`/trabajos/${t.slug}`} className="group flex flex-col gap-2.5 text-tinta no-underline">
                <Foto
                  imagen={t.imagenes[0]}
                  proporcion="4/3"
                  decorativa
                  sizes={
                    trabajos.length > 1
                      ? "(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                      : "(min-width: 1024px) 560px, 100vw"
                  }
                />
                <h3 className="m-0 font-serif text-[22px] leading-tight font-semibold underline decoration-transparent decoration-2 underline-offset-4 group-hover:decoration-primario">
                  {t.titulo}
                </h3>
                {meta && <span className="text-tinta-suave">{meta}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
