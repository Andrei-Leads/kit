import Link from "next/link";
import { minusculaInicial, type Servicio } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { ArcoTesela } from "@/components/secciones/ArcoTesela";
import { cn } from "@/lib/utils";

type Props = {
  servicios: readonly Servicio[];
  /** Con título «Por estancias» (inicio). En /servicios el título es el h1 de la página. */
  conTitulo?: boolean;
  /** Nivel de los títulos de cada estancia. */
  nivel?: "h2" | "h3";
  className?: string;
};

const VER = "text-[15px] font-semibold underline decoration-primario decoration-2 underline-offset-4";

function TituloEstancia({ as: Titulo, children, className }: { as: "h2" | "h3"; children: React.ReactNode; className?: string }) {
  return <Titulo className={cn("remate m-0 text-xl leading-tight", className)}>{children}</Titulo>;
}

/**
 * Sección estrella: estancias en arcos 3:4 con su «desde» (encargo §6.3). Sin foto, un arco
 * de arcilla con la tesela y el título dentro. Sin `precioDesde`, sin píldora ni hueco. Con
 * 1 servicio, ficha ancha (arco 4:5 a la izquierda). Con 10, 2 columnas en móvil y 4 en
 * escritorio, sin carrusel; en escritorio las columnas pares bajan 24 px.
 */
export function EstanciasDesde({ servicios, conTitulo = true, nivel = "h3", className }: Props) {
  const hayPrecios = servicios.some((s) => s.precioDesde);
  const unico = servicios.length === 1 ? servicios[0] : undefined;
  return (
    <section aria-labelledby={conTitulo ? "titulo-estancias" : undefined} aria-label={conTitulo ? undefined : "Estancias"} className={cn("seccion", className)}>
      <div className="contenedor">
        {conTitulo && (
          <div className="mb-11 max-w-[640px]">
            <h2 id="titulo-estancias" className="titulo-seccion">
              Por estancias
            </h2>
            {hayPrecios && <p className="m-0 mt-3 text-texto-suave">Cada estancia con su precio orientativo de partida.</p>}
          </div>
        )}
        {unico ? (
          <Link
            href={`/servicios/${unico.slug}`}
            className="tarjeta-arco grid items-center gap-x-14 gap-y-7 text-texto no-underline lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]"
          >
            {unico.imagenes[0] ? (
              <Foto imagen={unico.imagenes[0]} sizes="(min-width: 1024px) 40vw, 100vw" proporcion="4/5" arco decorativa />
            ) : (
              <ArcoTesela proporcion="4/5" />
            )}
            <div className="flex flex-col items-start gap-3.5">
              <TituloEstancia as={nivel} className="text-(length:--text-h2) leading-[1.1]">
                {unico.titulo}
              </TituloEstancia>
              {unico.precioDesde && <span className="pildora">{unico.precioDesde}</span>}
              <p className="m-0 max-w-[44ch] text-texto-suave">{unico.descripcion}</p>
              <span className={cn(VER, "text-base")}>Ver {minusculaInicial(unico.titulo)}</span>
            </div>
          </Link>
        ) : (
          <ul className="rejilla-estancias m-0 grid list-none grid-cols-2 gap-x-4 gap-y-9 p-0 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14">
            {servicios.map((s, i) => (
              <li key={s.slug} data-aparecer style={{ "--i": i % 4 } as React.CSSProperties}>
                <Link href={`/servicios/${s.slug}`} className="tarjeta-arco flex flex-col gap-2.5 text-texto no-underline">
                  {s.imagenes[0] ? (
                    <>
                      <Foto imagen={s.imagenes[0]} sizes="(min-width: 1024px) 25vw, 50vw" arco decorativa calidad={60} />
                      <TituloEstancia as={nivel} className="mt-1">
                        {s.titulo}
                      </TituloEstancia>
                    </>
                  ) : (
                    <ArcoTesela>
                      <TituloEstancia
                        as={nivel}
                        className="w-full bg-[linear-gradient(to_top,var(--color-alterna)_55%,transparent)] p-4 pt-10 leading-[1.2]"
                      >
                        {s.titulo}
                      </TituloEstancia>
                    </ArcoTesela>
                  )}
                  {s.precioDesde && <span className="pildora">{s.precioDesde}</span>}
                  <p className="m-0 line-clamp-2 text-[15px] leading-normal text-texto-suave">{s.descripcion}</p>
                  <span className={VER}>Ver {minusculaInicial(s.titulo)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
