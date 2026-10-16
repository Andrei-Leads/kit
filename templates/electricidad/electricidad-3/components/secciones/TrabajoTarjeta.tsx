import Link from "next/link";
import type { Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";
import { metaTrabajo } from "@/lib/trabajos";
import { cn } from "@/lib/utils";

type Props = {
  trabajo: Trabajo;
  /** Ancla del filtro: solo la primera tarjeta de cada servicio la lleva (ids únicos). */
  id?: string;
  className?: string;
};

/**
 * Tarjeta de trabajo (/trabajos y «Otros trabajos»; Pantalla, `trabajosGrid`): foto 4:3 recta de 16 px con la
 * pastilla «Antes y después» si hay `antes`, título en 600 y «ubicación · año» en texto suave (solo lo que exista).
 * Toda la tarjeta es el enlace a `/trabajos/{slug}`; la foto es decorativa (el enlace ya se nombra con el título).
 * `scroll-mt` para que la cabecera sticky no tape el ancla del filtro.
 */
export function TrabajoTarjeta({ trabajo, id, className }: Props) {
  const meta = metaTrabajo(trabajo);
  return (
    <li id={id} className={cn("min-w-0 scroll-mt-20", className)}>
      <Link
        href={`/trabajos/${trabajo.slug}`}
        className="group flex flex-col gap-2 text-texto no-underline"
      >
        <Foto
          imagen={trabajo.imagenes[0]}
          forma="recta"
          decorativa
          compacta
          sizes="(min-width: 1280px) 400px, (min-width: 1024px) 31vw, 50vw"
        >
          {trabajo.antes && (
            <span
              aria-hidden="true"
              className="absolute top-2 left-2 rounded-pastilla border border-borde-claro bg-noche px-[9px] py-1.5 text-xs leading-none font-semibold"
            >
              Antes y después
            </span>
          )}
        </Foto>
        <span className="text-base leading-[1.3] font-semibold text-pretty underline-offset-4 group-hover:underline">
          {trabajo.titulo}
          {trabajo.antes && <span className="sr-only"> (antes y después)</span>}
        </span>
        {meta && <span className="-mt-1 text-sm text-texto-suave">{meta}</span>}
      </Link>
    </li>
  );
}
