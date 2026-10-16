import Link from "next/link";
import type { Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";
import { h3 } from "@/lib/estilos";
import { metaTrabajo } from "@/lib/trabajos";

type Props = {
  trabajo: Trabajo;
  /** Ancla del filtro: solo la primera tarjeta de cada servicio la lleva (ids únicos). */
  id?: string;
};

/**
 * Tarjeta de /trabajos (mockup 2c): foto 4:3 recta (`imagenes[0]`, decorativa: el enlace se nombra con el
 * título), título en serif de 23 px y, si hay datos, «ubicación · año» en tinta suave. Toda la tarjeta es el
 * enlace a `/trabajos/{slug}`. El `scroll-mt` deja aire sobre la ancla; la cabecera sticky ya la descuenta
 * `scroll-padding-top` de `html` (globals.css).
 */
export function TrabajoTarjeta({ trabajo, id }: Props) {
  const meta = metaTrabajo(trabajo);
  return (
    <li id={id} className="min-w-0 scroll-mt-2">
      <Link href={`/trabajos/${trabajo.slug}`} className="group flex flex-col gap-2.5 text-tinta no-underline">
        <Foto
          imagen={trabajo.imagenes[0]}
          decorativa
          sizes="(min-width: 1200px) 578px, (min-width: 768px) 46vw, 100vw"
        />
        <h2 className={`${h3} text-pretty group-hover:underline group-hover:decoration-primario group-hover:decoration-2 group-hover:underline-offset-4`}>
          {trabajo.titulo}
        </h2>
        {meta && <p className="m-0 text-tinta-suave">{meta}</p>}
      </Link>
    </li>
  );
}
