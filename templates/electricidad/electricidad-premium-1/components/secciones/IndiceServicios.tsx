import { precioDesde, type Servicio } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Foto } from "@/components/base/Foto";
import { Antetitulo, EnlaceFlecha, Senal, Titular } from "@/components/Titular";
import { numero, type DatosCta } from "@/lib/textos";

const MAX = 6;

/** Precio «desde»: la palabra en etiqueta y el importe; si no empieza por «desde», tal cual. */
export function Precio({ texto, className }: { texto: string; className?: string }) {
  const { desde, importe } = precioDesde(texto);
  return (
    <p className={`etiqueta m-0 text-acento ${className ?? ""}`}>
      {desde ? `Desde ${importe}` : importe}
    </p>
  );
}

/**
 * IndiceServicios (encargo §6.6): lista numerada con filetes. En escritorio,
 * al pasar o enfocar una fila aparece su foto 4:5 de 240 px (CSS). Más de 6:
 * se ven 6 y «Ver los N servicios». Con 1: una fila grande con `incluye`.
 */
export function IndiceServicios({ servicios, cta }: { servicios: readonly Servicio[]; cta: DatosCta }) {
  const visibles = servicios.slice(0, MAX);
  const uno = servicios.length === 1;
  return (
    <section data-tono="oscuro" aria-labelledby="titulo-servicios" className="seccion">
      <div className="contenedor flex flex-col gap-[clamp(40px,2rem+2vw,64px)]">
        <div className="flex flex-col gap-6">
          <Antetitulo>Servicios</Antetitulo>
          <Titular
            id="titulo-servicios"
            lineas={[
              <>
                Lo que <Senal>instalamos</Senal>.
              </>,
            ]}
          />
        </div>
        <ol className="m-0 list-none border-t border-[var(--color-linea)] p-0">
          {visibles.map((s, i) => (
            <li key={s.slug} data-aparecer className="indice-fila relative border-b focus-within:z-10 hover:z-10 border-[var(--color-linea)] py-8 md:grid md:grid-cols-[clamp(48px,6vw,80px)_1fr] lg:min-h-[180px]">
              <span className="etiqueta mb-3 block text-acento md:mt-3 md:mb-0">{numero(i)}</span>
              <div className="flex max-w-[560px] flex-col gap-3">
                <h3 className={uno ? "titulo-seccion" : "m-0 font-titulo text-[clamp(1.75rem,1.2rem+1.8vw,2.75rem)] leading-[1.1] font-normal tracking-[-0.015em]"}>{s.titulo}</h3>
                <p className="m-0 text-texto-suave">{s.descripcion}</p>
                {uno && s.incluye.length > 0 && (
                  <ul className="m-0 mt-2 flex list-none flex-col p-0">
                    {s.incluye.map((x) => (
                      <li key={x} className="border-t border-[var(--color-linea)] py-3">
                        {x}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-1 flex flex-wrap items-baseline gap-x-6 gap-y-3">
                  {s.precioDesde && <Precio texto={s.precioDesde} />}
                  <EnlaceFlecha href={`/servicios/${s.slug}`}>
                    Descubrir<span className="sr-only"> {s.titulo}</span>
                  </EnlaceFlecha>
                </div>
              </div>
              {s.imagenes[0] && (
                <div aria-hidden="true" className="indice-foto pointer-events-none absolute top-8 right-0 w-[240px]">
                  <Foto imagen={s.imagenes[0]} sizes="240px" decorativa etiqueta="ninguna" />
                </div>
              )}
            </li>
          ))}
        </ol>
        {servicios.length > MAX && <EnlaceFlecha href="/servicios">Ver los {servicios.length} servicios</EnlaceFlecha>}
        <Pareja cta={cta} tamano="cierre" />
      </div>
    </section>
  );
}
