import type { CSSProperties } from "react";
import type { Imagen, SiteConfig } from "@andrei-leads/core";

import { EnlaceFlecha, Pareja } from "@/components/Botones";
import { Transicion } from "@/components/Transicion";
import { Foto } from "@/components/base/Foto";
import { contextoTrabajo, lugarAnio, type DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

import { Titular } from "./Titular";

type Elemento = {
  clave: string;
  grande: Imagen;
  mini?: { imagen: Imagen; antes: boolean };
  etiqueta?: string;
  titulo?: string;
  descripcion?: string;
  contexto: { dt: string; dd: string }[];
  href?: string;
};

type Props = {
  trabajos: SiteConfig["trabajos"];
  galeria: SiteConfig["galeria"];
  cta: DatosCta;
};

/**
 * Collage de trabajos (encargo §6.3): los dos primeros trabajos (sin trabajos,
 * la galería) en 4:5 a dos escalas, la grande con parallax y una miniatura
 * (`antes` o `imagenes[1]`) que se solapa un 15 %. Al lado, columna de ≤ 440 px
 * con lugar · año, título, descripción, contexto y «Ver el trabajo».
 * Sin trabajos ni galería, no existe.
 */
export function TrabajosCollage({ trabajos, galeria, cta }: Props) {
  const elementos: Elemento[] =
    trabajos.length > 0
      ? trabajos.slice(0, 2).map((t) => {
          const mini = t.antes ? { imagen: t.antes, antes: true } : t.imagenes[1] ? { imagen: t.imagenes[1], antes: false } : undefined;
          return {
            clave: t.slug,
            grande: t.imagenes[0],
            mini,
            etiqueta: lugarAnio(t) || undefined,
            titulo: t.titulo,
            descripcion: t.descripcion,
            contexto: contextoTrabajo(t),
            href: `/trabajos/${t.slug}`,
          };
        })
      : galeria.slice(0, 2).map((g) => ({ clave: g.src, grande: g, titulo: g.titulo, contexto: [] }));
  if (elementos.length === 0) return null;

  return (
    <section data-tono="claro" aria-labelledby="titulo-trabajos" className="bg-fondo pb-[88px] lg:pb-36">
      <div className="contenedor flex flex-col gap-14 lg:gap-24">
        <div className="flex flex-col gap-[18px]">
          <p className="etiqueta">Trabajos</p>
          <Titular id="titulo-trabajos" className="text-[40px] lg:text-h2" lineas={["Trabajos con", <em key="e">nombre y lugar</em>]} />
        </div>
        {elementos.map((e, i) => (
          <article
            key={e.clave}
            className={cn("grid gap-[22px] lg:grid-cols-2 lg:items-center lg:gap-20", i % 2 === 1 && "lg:[&>.collage]:order-2")}
          >
            <div className={cn("collage relative", e.mini && "pb-16 lg:pb-24")}>
              <div className={cn("parallax-grande w-[82%] lg:w-[min(480px,85%)]", i % 2 === 1 && !e.mini && "ml-auto lg:ml-0 lg:w-full")}>
                <Transicion nombre={e.href ? `foto-${e.clave}` : undefined}>
                  <Foto imagen={e.grande} sizes="(min-width: 1024px) 480px, 82vw" proporcion="4/5" />
                </Transicion>
              </div>
              {e.mini && (
                <div className="parallax-mini absolute right-0 bottom-0 w-[40%] rounded-foto outline-[6px] outline-white lg:right-auto lg:left-[min(400px,70%)] lg:w-[200px]">
                  <Foto imagen={e.mini.imagen} sizes="(min-width: 1024px) 200px, 40vw" proporcion="4/5" posicionEtiqueta={e.mini.antes ? "ninguna" : "abajo-derecha"}>
                    {e.mini.antes && (
                      <span className="absolute bottom-2 left-2 z-[3] text-[11px] font-medium tracking-[0.08em] text-white uppercase">Antes</span>
                    )}
                  </Foto>
                </div>
              )}
            </div>
            <div data-aparecer className="flex max-w-[440px] flex-col gap-[22px] lg:gap-5" style={{ "--i": 0 } as CSSProperties}>
              {e.etiqueta && <p className="etiqueta">{e.etiqueta}</p>}
              {e.titulo && <h3 className="titulo text-[30px] leading-[1.08] lg:text-[40px]">{e.titulo}</h3>}
              {e.descripcion && <p className="m-0 text-texto-suave">{e.descripcion}</p>}
              {e.contexto.length > 0 && (
                <dl className="m-0 grid grid-cols-3 gap-3">
                  {e.contexto.map((c) => (
                    <div key={c.dt} className="border-t border-borde pt-2.5">
                      <dt className="text-xs text-texto-suave">{c.dt}</dt>
                      <dd className="m-0 mt-1 text-[15px]">{c.dd}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {e.href && <EnlaceFlecha href={e.href}>Ver el trabajo</EnlaceFlecha>}
            </div>
          </article>
        ))}
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:border-t lg:border-borde lg:pt-10 libre-flotante">
          <EnlaceFlecha href="/trabajos">Ver todos los trabajos</EnlaceFlecha>
          <Pareja cta={cta} className="border-t border-borde pt-7 lg:border-0 lg:pt-0" />
        </div>
      </div>
    </section>
  );
}
