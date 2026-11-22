import Link from "next/link";
import { etiquetaOrigen, mediaVisible, type Imagen, type SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Pareja } from "@/components/Botones";
import { bandaObra, metaObra, numeroObra } from "@/lib/obras";
import { cn } from "@/lib/utils";

type Pieza = { imagen: Imagen; banda?: string; href?: string; titulo?: string; meta?: string; numero?: string };

type Props = {
  config: Pick<SiteConfig, "negocio" | "contacto" | "valoracion" | "trabajos" | "imagenesHero" | "galeria" | "servicios">;
  mensaje: string;
};

/** Colocación de cada pieza según cuántas hay (3, 2 o 1). Móvil: 3 columnas; escritorio: 12. */
const COLOCACION: Record<number, { rejilla: string; piezas: string[] }> = {
  3: {
    rejilla: "grid-cols-3 lg:grid-cols-12 lg:grid-rows-[auto_auto_1fr]",
    piezas: [
      "col-span-2 row-span-2 aspect-[4/5] lg:col-span-7 lg:row-span-3",
      "col-start-3 row-start-1 aspect-[4/5] lg:col-start-8 lg:col-span-5 lg:aspect-[3/2]",
      "col-start-3 row-start-2 aspect-[4/5] lg:col-start-8 lg:col-span-5 lg:aspect-[3/2]",
    ],
  },
  2: { rejilla: "grid-cols-2", piezas: ["aspect-[4/5]", "aspect-[4/5]"] },
  1: { rejilla: "grid-cols-1", piezas: ["aspect-[4/5] lg:aspect-[3/2]"] },
};

const SIZES = ["(min-width: 1024px) 58vw, 66vw", "(min-width: 1024px) 42vw, 33vw", "(min-width: 1024px) 42vw, 33vw"];
const SIZES_2 = "50vw";

function Valoracion({ valoracion, className }: { valoracion: SiteConfig["valoracion"]; className?: string }) {
  if (!valoracion) return null;
  return (
    <p className={cn("m-0 text-[15px] leading-[1.3]", className)}>
      <span aria-hidden="true" className="text-primario">
        ★{" "}
      </span>
      {mediaVisible(valoracion.media)} · {valoracion.total} reseñas en Google
    </p>
  );
}

/** Un crédito bajo el conjunto si todas las piezas tienen el mismo origen; si no, uno por obra en la misma línea. */
function creditoCollage(piezas: readonly Pieza[]): string | undefined {
  const etiquetas = piezas.map((p) => etiquetaOrigen(p.imagen));
  if (etiquetas.every((e) => !e)) return undefined;
  if (etiquetas.every((e) => e === etiquetas[0])) {
    if (piezas.length === 1) return etiquetas[0];
    return etiquetas[0] === "Imagen generada con IA" ? "Imágenes generadas con IA" : etiquetas[0];
  }
  return piezas
    .map((p, i) => (etiquetas[i] ? `${p.numero ? `Obra ${p.numero}` : `Foto ${i + 1}`}: ${etiquetas[i]}` : undefined))
    .filter(Boolean)
    .join(" · ");
}

/**
 * Hero «Collage de 3 trabajos». `h1` «{sector} en {ciudad}» en condensada
 * gigante; la valoración y la pareja; y el collage de las 3 primeras obras
 * (la grande en color y LCP, las dos pequeñas en blanco y negro, cada una con
 * su banda negra «01 · Eixample · 2025»). Con 2 o 1 obras se recompone; sin
 * obras, rellenan `imagenesHero` y luego `galeria` (sin banda); sin fotos,
 * índice tipográfico de servicios. Nada se anima.
 *
 * Móvil: los botones van antes del collage (entrega §0.1: con WhatsApp de
 * 56 px a todo el ancho no cabe todo en 375×667 por encima de la barra).
 */
export function HeroCollage({ config, mensaje }: Props) {
  const { negocio, contacto, valoracion, trabajos, servicios } = config;
  const piezas: Pieza[] =
    trabajos.length > 0
      ? trabajos.slice(0, 3).map((t, i) => ({
          imagen: t.imagenes[0],
          banda: bandaObra(t, i),
          href: `/trabajos/${t.slug}`,
          titulo: t.titulo,
          meta: metaObra(t),
          numero: numeroObra(i),
        }))
      : [...config.imagenesHero, ...config.galeria].slice(0, 3).map((imagen) => ({ imagen }));
  const titulo = `${negocio.sector} en ${contacto.direccion.ciudad}`;
  const pareja = <Pareja telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} />;

  if (piezas.length === 0) {
    // Índice tipográfico: servicios numerados con filetes; los botones tras el tercero.
    const fila = (s: (typeof servicios)[number], i: number) => (
      <li key={s.slug} className="border-b-2 border-borde">
        <Link href={`/servicios/${s.slug}`} className="condensada flex items-baseline gap-3.5 py-3 text-[32px] leading-[0.95] text-texto no-underline hover:text-primario">
          <span className="text-lg text-texto-suave">{numeroObra(i)}</span>
          {s.titulo}
        </Link>
      </li>
    );
    return (
      <section className="contenedor pt-5">
        <span data-pagina="inicio" hidden />
        <h1 className="titulo-display m-0">{titulo}</h1>
        <Valoracion valoracion={valoracion} className="mt-3.5" />
        <nav aria-label="Servicios">
          <ol className="m-0 mt-5 list-none border-t-2 border-borde p-0">{servicios.slice(0, 3).map(fila)}</ol>
          <div className="mt-4">{pareja}</div>
          {servicios.length > 3 && <ol className="m-0 mt-4 list-none border-t-2 border-borde p-0">{servicios.slice(3).map((s, i) => fila(s, i + 3))}</ol>}
        </nav>
      </section>
    );
  }

  const n = piezas.length;
  const colocacion = COLOCACION[n];
  const credito = creditoCollage(piezas);
  const conLista = n === 3 && piezas[0].href;
  return (
    <section className="contenedor pt-5">
      <span data-pagina="inicio" hidden />
      <h1 className="titulo-display m-0">{titulo}</h1>
      <div className="mt-4 flex flex-col items-stretch justify-end gap-x-6 gap-y-3 lg:flex-row lg:items-center">
        <Valoracion valoracion={valoracion} />
        <div className="w-full lg:w-[600px]">{pareja}</div>
      </div>
      <div className={cn("mt-5 grid gap-1", colocacion.rejilla)}>
        {piezas.map((p, i) => {
          const foto = (
            <Foto
              imagen={p.imagen}
              sizes={n === 2 ? SIZES_2 : n === 1 ? "100vw" : SIZES[i]}
              proporcion="relleno"
              className="absolute inset-0"
              archivo={i > 0}
              preload={i === 0}
              eager={i > 0}
              decorativa={Boolean(p.href)}
              credito={false}
            >
              {p.banda && (
                <span aria-hidden="true" className="etiqueta absolute bottom-0 left-0 max-w-full bg-negro px-[7px] py-[5px] text-xs leading-[1.15] text-sobre-negro">
                  {p.banda}
                </span>
              )}
            </Foto>
          );
          const clase = cn("relative block min-h-0 overflow-hidden", colocacion.piezas[i]);
          return p.href ? (
            <Link key={p.href} href={p.href} className={clase}>
              <span className="sr-only">
                Obra {p.numero}: {p.titulo}
              </span>
              {foto}
            </Link>
          ) : (
            <div key={p.imagen.src} className={clase}>
              {foto}
            </div>
          );
        })}
        {conLista && (
          // Escritorio, 3 obras: bajo las dos piezas pequeñas queda hueco; lo ocupa el índice de las tres (entrega §0.4).
          <ol className="col-span-5 col-start-8 row-start-3 m-0 hidden list-none self-end border-t-2 border-borde p-0 lg:block">
            {piezas.map((p) => (
              <li key={p.href} className="flex items-baseline gap-3 border-b-2 border-borde py-2.5">
                <span className="condensada text-[15px] text-texto-suave">{p.numero}</span>
                <Link
                  href={p.href!}
                  className="condensada text-xl leading-none text-texto no-underline hover:underline hover:decoration-primario hover:decoration-2 hover:underline-offset-4"
                >
                  {p.titulo}
                </Link>
                <span className="ms-auto text-[13px] whitespace-nowrap text-texto-suave">{p.meta}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
      {credito && <p className="m-0 mt-1.5 text-right text-[11px] leading-[1.3] text-texto-suave">{credito}</p>}
    </section>
  );
}
