import { pasosProceso, type SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Antetitulo, Senal, Titular } from "@/components/Titular";
import { numero, type DatosCta } from "@/lib/textos";

/**
 * Proceso (encargo §6.7, tramo claro): `proceso` o los 4 pasos por defecto de core.
 * Rejilla 3 × 2 en escritorio y lista en móvil; número en Inter Tight 200 a
 * 64 px. Tipográfico: `proceso[].imagen` no se usa (encargo §8).
 */
export function Proceso({ proceso, cta }: { proceso: SiteConfig["proceso"]; cta: DatosCta }) {
  const pasos = pasosProceso(proceso, "proyecto");
  return (
    <section data-tono="claro" aria-labelledby="titulo-proceso" className="tramo-claro seccion">
      <div className="contenedor flex flex-col gap-[clamp(40px,2rem+2vw,64px)]">
        <div className="flex flex-col gap-6">
          <Antetitulo>Cómo trabajamos</Antetitulo>
          <Titular
            id="titulo-proceso"
            lineas={[
              <>
                De la visita a la <Senal>entrega</Senal>.
              </>,
            ]}
          />
        </div>
        <ol className="m-0 grid list-none gap-x-12 gap-y-4 p-0 md:grid-cols-2 lg:grid-cols-3">
          {pasos.map((p, i) => (
            <li key={p.titulo} data-aparecer className="flex flex-col gap-3 border-t border-[var(--color-linea)] pt-5 pb-8">
              <span aria-hidden="true" className="font-texto text-[64px] leading-none font-extralight tracking-[-0.03em] text-acento tabular-nums">
                {numero(i)}
              </span>
              <h3 className="titulo-pequeno">
                <span className="sr-only">Paso {i + 1}: </span>
                {p.titulo}
              </h3>
              <p className="m-0 max-w-[36ch] text-texto-suave">{p.texto}</p>
            </li>
          ))}
        </ol>
        <Pareja cta={cta} tamano="cierre" />
      </div>
    </section>
  );
}
