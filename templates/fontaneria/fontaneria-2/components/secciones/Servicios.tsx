import Link from "next/link";
import type { ReactNode } from "react";
import type { Servicio } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { elevar, tarjeta } from "@/lib/estilos";
import { mayusculaInicial } from "@/lib/formato";
import { cn } from "@/lib/utils";

type Props = {
  servicios: readonly Servicio[];
  /** Nivel del título de cada tarjeta: h3 bajo «Nuestros servicios» (inicio), h2 en /servicios. */
  nivel: "h2" | "h3";
  /** Cabecera de la sección (título o migas + h1). */
  cabecera: ReactNode;
  /** Precarga la primera foto (solo en /servicios: en la home ya se precarga el hero). */
  preloadPrimera?: boolean;
  className?: string;
};

/**
 * Tarjetas de servicio (encargo §6.5): radio 24 px, foto 3:2 arriba con radio 20 px o, sin foto, una
 * cabecera de 96 px en primario suave con la inicial a 3 rem. «Desde X €» en píldora (o el texto del
 * precio tal cual). Un solo servicio: tarjeta ancha con la foto a la izquierda en escritorio; varios:
 * 3 columnas en escritorio y 1 en móvil.
 */
export function Servicios({ servicios, nivel, cabecera, preloadPrimera, className }: Props) {
  const uno = servicios.length === 1;
  const Titulo = nivel;
  return (
    <section className={cn("contenedor flex flex-col gap-[clamp(24px,3vw,40px)]", className)}>
      {cabecera}
      <ul className={cn("m-0 grid list-none grid-cols-1 gap-4 p-0", !uno && "lg:grid-cols-3")}>
        {servicios.map((s, i) => {
          const foto = s.imagenes[0];
          return (
            <li key={s.slug} className="flex">
              <Link
                href={`/servicios/${s.slug}`}
                className={cn(tarjeta, elevar, "foco flex w-full flex-col gap-1 p-2 text-texto no-underline", uno && "lg:flex-row")}
              >
                {foto ? (
                  <Foto
                    imagen={foto}
                    decorativa
                    preload={preloadPrimera && i === 0}
                    proporcion="3/2"
                    sizes={uno ? "(min-width: 960px) 46vw, 100vw" : "(min-width: 960px) 30vw, 100vw"}
                    className={cn("flex-none", uno && "lg:basis-[46%]")}
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className={cn(
                      "flex h-24 flex-none items-center rounded-foto bg-primario-suave px-5.5 text-5xl leading-none font-extrabold text-primario",
                      uno && "lg:h-auto lg:basis-[46%]",
                    )}
                  >
                    {s.titulo.charAt(0)}
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-2 px-4 pt-4 pb-3">
                  <Titulo className="m-0 text-xl leading-tight font-bold">{s.titulo}</Titulo>
                  <p className="m-0 text-texto-suave">{s.descripcion}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
                    {s.precioDesde && (
                      <span className="rounded-full bg-primario-suave px-3 py-1.5 text-[.9375rem] font-bold tabular-nums">
                        {mayusculaInicial(s.precioDesde)}
                      </span>
                    )}
                    <span className="ml-auto text-base font-bold">Ver servicio →</span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
