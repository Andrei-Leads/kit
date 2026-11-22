import { hayTrabajos, type Servicio, type SiteConfig } from "@andrei-leads/core";

import { ParejaCta } from "@/components/Botones";
import { EnlaceFlecha } from "@/components/EnlaceFlecha";
import { Destacada, TituloLineas } from "@/components/Titulo";
import { Collage } from "@/components/secciones/Collage";
import { etiquetaObra, fichaObra, masRecientes, type DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  trabajos: SiteConfig["trabajos"];
  galeria: SiteConfig["galeria"];
  servicios: readonly Servicio[];
  ciudad: string;
  cta: DatosCta;
  confianza?: string;
};

/**
 * Obras (encargo §6.3, estrella 2.ª parte): los 3 trabajos más recientes en collage
 * 4:5 alternando lados, con su columna de ≤ 380 px. Sin trabajos, la galería en el
 * mismo collage. Sin nada, desaparece.
 */
export function Obras({ trabajos, galeria, servicios, ciudad, cta, confianza }: Props) {
  if (!hayTrabajos({ trabajos, galeria })) return null;
  const items =
    trabajos.length > 0
      ? masRecientes(trabajos).map((t) => ({
          clave: t.slug,
          href: `/trabajos/${t.slug}`,
          titulo: t.titulo,
          descripcion: t.descripcion,
          etiqueta: etiquetaObra(t, servicios.find((s) => s.slug === t.servicio)?.titulo),
          ficha: fichaObra(t),
          grande: t.imagenes[0],
          mini: t.imagenes[1],
        }))
      : galeria.slice(0, 3).map((g) => ({ clave: g.src, href: undefined, titulo: g.titulo, descripcion: undefined, etiqueta: "", ficha: "", grande: g, mini: undefined }));

  return (
    <section id="obras" data-tono="claro" aria-labelledby="titulo-obras" className="pb-(--espacio-seccion)" style={{ viewTimelineName: "--sec-obras" }}>
      <div className="contenedor">
        <p className="etiqueta m-0 border-t border-borde pt-7 text-texto-suave">{trabajos.length > 0 ? "Obras" : "Galería"}</p>
        <TituloLineas id="titulo-obras" lineas={["Piezas que ya viven", <>en <Destacada>{ciudad}</Destacada></>]} className="mt-4 max-w-[16ch] text-h2" />
        <div className="mt-[clamp(48px,6vw,96px)] flex flex-col gap-[clamp(72px,8vw,140px)]">
          {items.map((o, i) => (
            <article key={o.clave} className={cn("flex flex-wrap items-center gap-x-[clamp(32px,6vw,96px)] gap-y-9", i % 2 === 1 && "lg:flex-row-reverse")}>
              <Collage
                grande={o.grande}
                mini={o.mini}
                invertido={i % 2 === 1}
                transicion={o.href ? `obra-${o.clave}` : undefined}
                className="min-w-0 flex-[1_1_480px]"
              />
              <div data-aparecer className="max-w-[380px] flex-[1_1_300px]">
                {o.etiqueta && <p className="etiqueta m-0 text-texto-suave">{o.etiqueta}</p>}
                {o.titulo && <h3 className="titulo mt-3.5 text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] leading-[1.05]">{o.titulo}</h3>}
                {o.descripcion && <p className="mt-4 text-cuerpo text-texto-suave">{o.descripcion}</p>}
                {o.ficha && <p className="mt-4 border-y border-borde py-3 text-sm tabular-nums">{o.ficha}</p>}
                {o.href && (
                  <EnlaceFlecha href={o.href} className="mt-5">
                    Ver obra<span className="sr-only">: {o.titulo}</span>
                  </EnlaceFlecha>
                )}
              </div>
            </article>
          ))}
        </div>
        <div className="mt-[clamp(56px,6vw,96px)] flex flex-wrap items-end justify-between gap-8 border-t border-borde pt-8">
          <EnlaceFlecha href="/trabajos">Ver todas las obras</EnlaceFlecha>
          <ParejaCta cta={cta} tono="claro" confianza={confianza} className="flex-[1_1_520px]" />
        </div>
      </div>
    </section>
  );
}
