import Link from "next/link";
import type { SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";

import { TarjetaObra } from "./TarjetaObra";

type Props = Pick<SiteConfig, "trabajos" | "galeria">;

const SIZES = "(min-width: 1024px) 45vw, 100vw";

/**
 * «Obras *recientes*» (encargo §6.3): dos obras grandes 3:2 (la segunda baja 160 px en
 * escritorio), sin carrusel, y «Ver las {n} obras». Solo con `galeria`, sus dos primeras fotos.
 * Sin datos, la sección no existe.
 */
export function Obras({ trabajos, galeria }: Props) {
  if (trabajos.length === 0 && galeria.length === 0) return null;
  const n = trabajos.length || galeria.length;
  return (
    <section aria-labelledby="titulo-obras" className="contenedor seccion">
      <div className="mb-[clamp(32px,5vw,64px)] flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 id="titulo-obras" className="titulo-h2">
          Obras <em>recientes</em>
        </h2>
        <Link href="/trabajos" className="enlace">
          {trabajos.length > 0 ? `Ver las ${n} obras` : "Ver todas las fotos"}
        </Link>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-x-[clamp(24px,4vw,64px)] gap-y-14">
        {trabajos.length > 0
          ? trabajos.slice(0, 2).map((t, i) => <TarjetaObra key={t.slug} trabajo={t} sizes={SIZES} className={i === 1 ? "lg:mt-40" : undefined} />)
          : galeria.slice(0, 2).map((f, i) => (
              <figure key={f.src} className={i === 1 ? "m-0 lg:mt-40" : "m-0"}>
                <Foto imagen={f} sizes={SIZES} />
                {f.titulo && <figcaption className="mt-5 font-titulo text-2xl leading-[1.25] italic">{f.titulo}</figcaption>}
              </figure>
            ))}
      </div>
    </section>
  );
}
