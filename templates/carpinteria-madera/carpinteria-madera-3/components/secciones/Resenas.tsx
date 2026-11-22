import Link from "next/link";
import type { Resena, SiteConfig, Trabajo } from "@andrei-leads/core";

import { Pareja } from "@/components/Pareja";
import { TituloSeccion } from "@/components/TituloSeccion";
import { estrellas, fechaNota, refTrabajo, resenasRecientes, valoracionTexto } from "@/lib/formato";

type Props = {
  n: string;
  resenas: readonly Resena[];
  valoracion?: SiteConfig["valoracion"];
  fichaGoogle?: string;
  /** El primer trabajo con `testimonio`, con su posición en la lista (para la referencia). */
  testimonio?: { trabajo: Trabajo; indice: number };
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp">;
  mensaje: string;
};

/**
 * «Notas de los clientes» (encargo §6.6): las 3–6 reseñas más recientes como notas de libreta (fecha
 * en mono, texto en sans, sin tarjetas) y, al lado, el testimonio del primer trabajo que lo tenga con
 * su referencia. «Ver todas en Google» solo con `fichaGoogle`. Cierra con la pareja.
 */
export function Resenas({ n, resenas, valoracion, fichaGoogle, testimonio, contacto, mensaje }: Props) {
  return (
    <section id="resenas" aria-labelledby="h2-resenas" className="pt-(--sec)">
      <TituloSeccion n={n} id="h2-resenas" className="mb-3">
        Notas de los clientes
      </TituloSeccion>
      {valoracion && <p className="etiqueta mb-6 text-texto-suave">{valoracionTexto(valoracion)}</p>}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-start gap-x-12 gap-y-8">
        <ol className="border-t border-tinta">
          {resenasRecientes(resenas).map((r) => (
            <li key={`${r.autor}-${r.fecha ?? ""}`} className="flex flex-col gap-2 border-b border-dashed border-borde py-5">
              <p className="font-titulo text-[12.5px] tracking-[0.04em] text-texto-suave">
                {r.fecha && <>{fechaNota(r.fecha)} · </>}
                <span aria-hidden="true">{estrellas(r.puntuacion)}</span>
                <span className="sr-only">{r.puntuacion} de 5</span>
              </p>
              <p>{r.texto}</p>
              <p className="text-[0.9375rem] text-texto-suave">— {r.autor}</p>
            </li>
          ))}
        </ol>
        {testimonio?.trabajo.testimonio && (
          <figure className="flex flex-col gap-4 border border-tinta bg-superficie p-[clamp(24px,1rem+1.5vw,40px)]">
            <p className="font-titulo text-[12.5px] tracking-[0.04em] text-lapiz">Testimonio · {refTrabajo(testimonio.indice)}</p>
            <blockquote className="text-[clamp(1.25rem,1.1rem+0.6vw,1.625rem)] leading-[1.4]">«{testimonio.trabajo.testimonio.texto}»</blockquote>
            <figcaption className="text-[0.9375rem] text-texto-suave">
              — {testimonio.trabajo.testimonio.autor}, <Link href={`/trabajos/${testimonio.trabajo.slug}`}>{testimonio.trabajo.titulo}</Link>
            </figcaption>
          </figure>
        )}
      </div>
      {fichaGoogle && (
        <a href={fichaGoogle} target="_blank" rel="noopener" className="enlace-mono mt-4">
          Ver todas en Google →
        </a>
      )}
      <div className="mt-6 max-w-[720px]">
        <Pareja contacto={contacto} mensaje={mensaje} />
      </div>
    </section>
  );
}
