import Link from "next/link";
import type { Servicio, SiteConfig } from "@andrei-leads/core";

import { Lamina } from "@/components/Lamina";
import { Pareja } from "@/components/Pareja";
import { TituloSeccion } from "@/components/TituloSeccion";
import { letra } from "@/lib/formato";

type Props = {
  n: string;
  servicios: readonly Servicio[];
  /** Número de lámina de cada servicio con foto (undefined: sin foto, la fila queda solo de texto). */
  laminas: readonly (number | undefined)[];
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp">;
  mensaje: string;
};

/**
 * «Las piezas que hacemos» (encargo §6.3): lista editorial con la letra de cada pieza, título en mono,
 * descripción, «desde» en mono si existe y «Ver pieza A →». Miniatura 4:3 a la derecha solo si hay foto
 * (sin hueco). Cierra con la pareja de botones.
 */
export function Piezas({ n, servicios, laminas, contacto, mensaje }: Props) {
  return (
    <section id="piezas" aria-labelledby="h2-piezas" className="pt-(--sec)">
      <TituloSeccion n={n} id="h2-piezas">
        Las piezas que hacemos
      </TituloSeccion>
      <ol className="border-t border-tinta">
        {servicios.map((s, i) => {
          const foto = s.imagenes[0];
          const num = laminas[i];
          return (
            <li key={s.slug} className="flex items-start gap-[clamp(14px,0.5rem+1.5vw,28px)] border-b border-borde py-6">
              <span aria-hidden="true" className="letra size-11 text-lg">
                {letra(i)}
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <h3 className="titulo text-[clamp(1.1875rem,1rem+0.8vw,1.625rem)] leading-[1.2] tracking-normal">
                  <span className="sr-only">Pieza {letra(i)}: </span>
                  {s.titulo}
                </h3>
                <p className="max-w-[56ch] text-texto-suave">{s.descripcion}</p>
                {s.precioDesde && <p className="font-titulo text-[13px] tracking-[0.04em]">{s.precioDesde}</p>}
                <Link href={`/servicios/${s.slug}`} className="enlace-mono min-h-11 self-start text-[12.5px]">
                  Ver pieza {letra(i)} →
                </Link>
              </div>
              {foto && num !== undefined && (
                <div className="flex-[0_0_clamp(104px,22vw,220px)]">
                  <Lamina imagen={foto} numero={num} sizes="(min-width: 1024px) 220px, 22vw" />
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <div className="mt-8 max-w-[720px]">
        <Pareja contacto={contacto} mensaje={mensaje} />
      </div>
    </section>
  );
}
