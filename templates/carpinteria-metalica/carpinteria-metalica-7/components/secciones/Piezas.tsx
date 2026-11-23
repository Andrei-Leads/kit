import Link from "next/link";
import { precioDesde, type Servicio } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { numero } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  servicios: readonly Pick<Servicio, "slug" | "titulo" | "descripcion" | "imagenes" | "precioDesde">[];
  titulo?: string;
};

function Precio({ texto, className }: { texto: string; className?: string }) {
  const p = precioDesde(texto);
  return (
    <span className={cn("block font-titulo font-extrabold text-acento uppercase", className)}>
      {p.desde && <span className="mr-1.5 text-[0.75em] tracking-[0.08em]">Desde</span>}
      {p.importe}
    </span>
  );
}

/**
 * Piezas (los servicios, encargo §6): fichas de hierro con la esquina cortada sobre una sombra
 * dura fija en acento; la ficha se levanta 3 px al pasar o enfocar. En móvil, fila compacta (foto
 * o número de 104 px + texto); desde 1024 px, rejilla de 3 (1 servicio: ficha ancha; 8 o más:
 * lista compacta de 2 columnas). Sin foto, el número de pieza gigante en contorno de acento.
 */
export function Piezas({ servicios, titulo }: Props) {
  const lista = servicios.length >= 8;
  const ancha = servicios.length === 1;
  // Sin título de sección (en /servicios el h1 lo pone la cabecera), cada ficha es un h2.
  const TituloFicha = titulo ? "h3" : "h2";
  return (
    <section aria-labelledby={titulo ? "titulo-piezas" : undefined} aria-label={titulo ? undefined : "Servicios"} className="py-[clamp(32px,5vw,72px)]">
      <div className="contenedor">
        {titulo && (
          <h2 id="titulo-piezas" className="h2 mb-[18px]">
            {titulo}
          </h2>
        )}
        <ul className={cn("grid gap-2.5", lista ? "lg:grid-cols-2 lg:gap-4" : ancha ? "lg:gap-5" : "lg:grid-cols-3 lg:gap-5")}>
          {servicios.map((s, i) => {
            const foto = s.imagenes[0];
            const n = numero(i);
            return (
              <li key={s.slug} className="relative">
                <span aria-hidden="true" className="corte-tarjeta absolute inset-0 bg-acento" />
                <Link
                  href={`/servicios/${s.slug}`}
                  className={cn(
                    "ficha hierro corte-tarjeta relative grid h-full grid-cols-[104px_1fr] gap-3.5 py-2.5 pr-3.5 pl-2.5 no-underline",
                    !lista && "lg:flex lg:flex-col lg:gap-0 lg:p-0",
                    ancha && "lg:grid lg:grid-cols-[minmax(0,5fr)_7fr]",
                  )}
                >
                  {foto ? (
                    <>
                      <Foto imagen={foto} sizes="104px" proporcion="1/1" decorativa etiquetaCompacta className={cn("self-start", !lista && "lg:hidden")} />
                      {!lista && (
                        <Foto
                          imagen={foto}
                          sizes={ancha ? "(min-width: 1024px) 500px" : "(min-width: 1024px) 380px"}
                          proporcion="4/3"
                          decorativa
                          className="hidden lg:block"
                        />
                      )}
                    </>
                  ) : (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "contorno-acento grid aspect-square place-items-center self-start border border-borde font-titulo text-7xl leading-none font-extrabold",
                        !lista && "lg:flex lg:aspect-[4/3] lg:self-stretch lg:items-end lg:justify-end lg:overflow-hidden lg:border-0 lg:border-b lg:pr-[18px] lg:pb-1 lg:text-[220px] lg:leading-[0.8]",
                      )}
                    >
                      {n}
                    </span>
                  )}
                  <div className={cn("flex min-w-0 flex-col self-center", !lista && "lg:flex-1 lg:gap-1.5 lg:self-stretch lg:px-5 lg:pt-[18px] lg:pb-[22px]", ancha && "lg:justify-center")}>
                    <span className="font-titulo text-[13px] font-bold tracking-[0.08em] text-acento uppercase lg:text-sm">Pieza {n}</span>
                    <TituloFicha className="mt-0.5 font-titulo text-[23px] leading-none font-extrabold text-balance uppercase lg:mt-0 lg:text-[30px] lg:leading-[0.95]">
                      {s.titulo}
                    </TituloFicha>
                    <span className="mt-1.5 text-[14.5px] leading-[1.4] text-pretty text-texto-suave lg:mt-0 lg:text-[15.5px] lg:leading-[1.45]">
                      {s.descripcion}
                    </span>
                    {s.precioDesde && <Precio texto={s.precioDesde} className="mt-1.5 text-lg lg:mt-0 lg:text-xl" />}
                    <span className={cn("hidden font-titulo text-[17px] font-extrabold tracking-[0.05em] uppercase", !lista && "lg:mt-auto lg:block lg:pt-2")}>
                      Ver la pieza{" "}
                      <span aria-hidden="true" className="text-acento">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
