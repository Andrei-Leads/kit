import Link from "next/link";
import { etiquetaOrigen, type SiteConfig, type Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { metaTrabajo, pieConjunto } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  trabajos: readonly Trabajo[];
  /** Sin trabajos, mosaico de la galería (encargo §7). */
  galeria?: SiteConfig["galeria"];
  /** "inicio": tres obras, la primera doble en escritorio. "lista": 2 columnas con superficie. "servicio": las del servicio. */
  modo: "inicio" | "lista" | "servicio";
  antetitulo?: string;
  titulo?: string;
};

/**
 * Obras del barrio (encargo §6 y §7): tarjetas de radio `--radius-tarjeta` con foto 4:3, el pie de
 * origen, el título y «{ubicacion} · {anio} · {duracion}» (cada dato que falta desaparece con su
 * separador). Sin trabajos, la galería en mosaico con radio de 32 px. Sin nada, no se pinta.
 */
export function Obras({ trabajos, galeria = [], modo, antetitulo, titulo }: Props) {
  // Sin título de sección (/trabajos), las tarjetas cuelgan del h1 de la página: h2.
  const Titulo = titulo ? "h3" : "h2";
  const conTrabajos = trabajos.length > 0;
  if (!conTrabajos && galeria.length === 0) return null;
  const lista = modo === "inicio" ? trabajos.slice(0, 3) : trabajos;
  const fotosGaleria = modo === "inicio" ? galeria.slice(0, 3) : galeria;
  const pieGaleria = pieConjunto(fotosGaleria);

  return (
    <section
      id={modo === "inicio" ? "obras" : undefined}
      aria-labelledby={titulo ? "titulo-obras" : undefined}
      aria-label={titulo ? undefined : "Obras"}
      className={cn("contenedor", modo === "inicio" ? "py-[clamp(56px,8vw,112px)]" : "pb-[clamp(56px,7vw,96px)]")}
    >
      {titulo && (
        <div className="mb-[clamp(28px,4vw,48px)] flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="flex flex-col gap-3">
            {antetitulo && <p className="antetitulo">{antetitulo}</p>}
            <h2 id="titulo-obras" className="h2">
              {titulo}
            </h2>
          </div>
          {modo === "inicio" && (
            <Link href="/trabajos" className="enlace">
              {conTrabajos ? "Ver todas las obras" : "Ver todas las fotos"}&nbsp;→
            </Link>
          )}
        </div>
      )}

      {conTrabajos ? (
        <ul
          className={cn(
            "grid gap-[clamp(20px,2.5vw,28px)]",
            modo === "inicio" && lista.length > 1 && "lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]",
            modo === "lista" && "lg:grid-cols-2",
            modo === "servicio" && "grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))]",
          )}
        >
          {lista.map((t, i) => {
            const grande = modo === "inicio" && i === 0 && lista.length > 1;
            const foto = t.imagenes[0];
            const etiqueta = etiquetaOrigen(foto);
            const meta = metaTrabajo(t, modo !== "inicio");
            return (
              <li key={t.slug} data-aparecer className={cn(grande && "lg:row-span-2")}>
                <Link
                  href={`/trabajos/${t.slug}`}
                  className="elevable flex h-full flex-col overflow-hidden rounded-tarjeta bg-superficie text-texto no-underline"
                >
                  <Foto
                    imagen={foto}
                    decorativa
                    sinEtiqueta
                    proporcion={grande ? "relleno" : "4/3"}
                    sizes={grande ? "(min-width: 1024px) 760px, calc(100vw - 40px)" : "(min-width: 1024px) 560px, calc(100vw - 40px)"}
                    className={cn("rounded-none", grande && "aspect-[4/3] lg:aspect-auto lg:min-h-[220px] lg:flex-1")}
                  />
                  <div className="flex flex-col gap-1.5 px-[22px] pt-3.5 pb-[22px]">
                    {etiqueta && <span className="pie-foto">{etiqueta}</span>}
                    <Titulo className={cn("font-titulo font-medium text-balance", grande ? "text-[clamp(1.5rem,1.2rem+1vw,2rem)]" : "text-[21px]", "leading-[1.15]")}>
                      {t.titulo}
                    </Titulo>
                    {meta && <p className="text-[15px] leading-[1.4] text-texto-suave">{meta}</p>}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-5">
            {fotosGaleria.map((g, i) => (
              <li key={g.src} data-aparecer>
                <figure>
                  <Foto
                    imagen={g}
                    sinEtiqueta
                    proporcion={i % 3 === 1 ? "4/5" : "4/3"}
                    sizes="(min-width: 1024px) 400px, calc(100vw - 40px)"
                    className={i % 3 === 1 ? "rounded-guijarro-2" : undefined}
                  />
                  {g.titulo && <figcaption className="mt-2.5 font-titulo text-lg font-medium">{g.titulo}</figcaption>}
                </figure>
              </li>
            ))}
          </ul>
          {pieGaleria && <p className="pie-foto mt-3">{pieGaleria}</p>}
        </>
      )}
    </section>
  );
}
