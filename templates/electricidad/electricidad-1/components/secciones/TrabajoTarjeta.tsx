import Link from "next/link";
import type { Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";
import { camposTarjeta } from "@/lib/trabajos";

type Props = {
  trabajo: Trabajo;
  /** Ancla del filtro: solo la primera tarjeta de cada servicio la lleva (ids únicos). */
  id?: string;
};

/**
 * Tarjeta de /trabajos (Specs §2): foto 4:3 recta, título subrayado (1 px, offset 3 px) y campos
 * UBICACIÓN / AÑO / DURACIÓN en mono (solo los que existan). Toda la tarjeta es el enlace a
 * `/trabajos/{slug}`. Sin sombras ni radios.
 */
export function TrabajoTarjeta({ trabajo, id }: Props) {
  const campos = camposTarjeta(trabajo);
  return (
    <li id={id} className="min-w-0">
      <Link href={`/trabajos/${trabajo.slug}`} className="group flex flex-col gap-3 text-tinta no-underline">
        <Foto
          imagen={trabajo.imagenes[0]}
          sizes="(min-width: 1200px) 384px, (min-width: 768px) 31vw, 100vw"
        />
        <h2 className="m-0 text-[18px] leading-[1.3] font-bold underline decoration-1 underline-offset-[3px] group-hover:decoration-2">
          {trabajo.titulo}
        </h2>
        {campos.length > 0 && (
          <dl className="m-0 flex flex-wrap gap-px self-start border border-regla bg-regla">
            {campos.map((c) => (
              <div key={c.etiqueta} className="flex flex-col bg-papel-2 px-2.5 py-1.5">
                <dt className="font-mono text-[10px] leading-[1.4] font-medium tracking-[0.14em] text-tinta-suave uppercase">
                  {c.etiqueta}
                </dt>
                <dd className="m-0 font-mono text-sm leading-[1.4] font-bold">{c.valor}</dd>
              </div>
            ))}
          </dl>
        )}
      </Link>
    </li>
  );
}
