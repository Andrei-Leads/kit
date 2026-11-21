import type { CSSProperties } from "react";
import Link from "next/link";
import { listaY, minusculaInicial, type Servicio } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { numeroOrden } from "@/lib/navegacion";

type Props = {
  servicios: readonly Servicio[];
  /** En el inicio lleva su h2 y las fichas son h3; en /servicios (con h1 propio) las fichas son h2. */
  enInicio?: boolean;
};

/**
 * IndiceServicios (estrella, versión ampliada): una ficha por servicio con filete superior de 3 px
 * que se dibuja al entrar. Título, precio, descripción, «Incluye: …» (3 primeros) y «Ver la solución».
 * Con foto, miniatura cuadrada de 96 px (etiqueta «IA» abreviada); sin foto, el número de orden a 4 rem.
 */
export function IndiceServicios({ servicios, enInicio }: Props) {
  const Titulo = enInicio ? "h3" : "h2";
  return (
    <section className={enInicio ? "border-t border-borde" : undefined}>
      <div className="contenedor py-[clamp(40px,6vw,96px)]">
        {enInicio && <h2 className="condensada mb-7 text-h2">Lo que arreglamos</h2>}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] gap-x-12">
          {servicios.map((s, i) => {
            const foto = s.imagenes[0];
            return (
              <article
                key={s.slug}
                data-aparecer
                style={{ "--i": i % 2 } as CSSProperties}
                className="ficha-filete grid grid-cols-[minmax(0,1fr)_96px] gap-5 pt-[18px] pb-8"
              >
                <div className="min-w-0">
                  <Titulo className="condensada text-[clamp(1.625rem,1.3rem+0.9vw,2.25rem)] leading-[1.02]">{s.titulo}</Titulo>
                  {s.precioDesde && <p className="mt-1.5 text-sm font-semibold text-primario-luz">{s.precioDesde}</p>}
                  <p className="mt-2.5">{s.descripcion}</p>
                  {s.incluye.length > 0 && (
                    <p className="mt-2 text-[0.9375rem] text-texto-suave">
                      Incluye: {listaY(s.incluye.slice(0, 3).map(minusculaInicial))}.
                    </p>
                  )}
                  <Link
                    href={`/servicios/${s.slug}`}
                    className="mt-2 inline-flex min-h-11 items-center gap-2 font-bold text-primario-luz underline underline-offset-4"
                  >
                    Ver la solución<span className="sr-only">: {s.titulo}</span> <span aria-hidden="true">→</span>
                  </Link>
                </div>
                {foto ? (
                  <Foto imagen={foto} sizes="96px" proporcion="1/1" etiquetaCorta className="size-24" />
                ) : (
                  <span aria-hidden="true" className="condensada w-24 text-right text-[4rem] leading-[0.8] tracking-normal text-primario-luz tabular-nums">
                    {numeroOrden(i)}
                  </span>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
