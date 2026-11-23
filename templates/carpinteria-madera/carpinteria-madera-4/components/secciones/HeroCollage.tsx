import Link from "next/link";
import { mediaVisible, type Imagen, type SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Pareja } from "@/components/Botones";
import { MarcaPagina } from "@/components/CabeceraPagina";
import { SinFoto } from "@/components/secciones/RejillaPiezas";
import { numeroPieza, pieCollage, recientes } from "@/lib/piezas";
import { cn } from "@/lib/utils";

type Pieza = { imagen: Imagen; pie: string; href?: string; numero?: string; titulo?: string };

type Props = {
  config: Pick<SiteConfig, "negocio" | "contacto" | "valoracion" | "trabajos" | "imagenesHero" | "galeria">;
  mensaje: string;
};

function Valoracion({ valoracion }: { valoracion: SiteConfig["valoracion"] }) {
  if (!valoracion) return null;
  return (
    <p className="pie-ficha m-0 text-[0.9375rem] lg:text-base">
      <span aria-hidden="true">★ </span>
      {mediaVisible(valoracion.media)} · {valoracion.total} reseñas en Google
    </p>
  );
}

/** Fotos del collage (encargo §5): `imagenes[0]` de los 3 trabajos más recientes; si faltan, `galeria` y luego `imagenesHero`. */
function piezasCollage(config: Props["config"]): Pieza[] {
  const deTrabajos: Pieza[] = recientes(config.trabajos).map(({ trabajo: t, indice }) => ({
    imagen: t.imagenes[0],
    pie: pieCollage(t, indice),
    href: `/trabajos/${t.slug}`,
    numero: numeroPieza(indice),
    titulo: t.titulo,
  }));
  const deFotos: Pieza[] = [...config.galeria.map((g) => ({ imagen: g, pie: g.titulo ?? g.alt })), ...config.imagenesHero.map((g) => ({ imagen: g, pie: g.alt }))];
  return [...deTrabajos, ...deFotos].slice(0, 3);
}

/** Una pieza del collage: foto y, debajo de la línea negra, su pie (nunca encima de la foto). */
function PiezaCollage({ pieza, i, total, className }: { pieza: Pieza; i: number; total: number; className?: string }) {
  const grande = i === 0;
  const foto = (
    <Foto
      imagen={pieza.imagen}
      // La pequeña es 1:1 en móvil con 3 fotos; con 2, 3:2. En escritorio, 3:2 siempre.
      proporcion={grande ? "4/5" : total === 3 ? "1/1" : "3/2"}
      className={grande ? undefined : "lg:aspect-[3/2]"}
      sizes={grande ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 40vw, 50vw"}
      preload={grande}
      eager={!grande}
      gris={!grande}
      decorativa
      respaldo={pieza.numero ? <SinFoto numero={pieza.numero} titulo={pieza.titulo} grande={grande} /> : undefined}
    />
  );
  const pie = <span className="pie-ficha block border-t-2 border-borde pt-1.5 lg:pt-2">{pieza.pie}</span>;
  const clase = cn("flex min-w-0 flex-col text-texto no-underline", className);
  return pieza.href ? (
    <Link href={pieza.href} className={cn(clase, "tarjeta-enlace")}>
      {foto}
      {pie}
    </Link>
  ) : (
    <figure className={cn(clase, "m-0")}>
      {foto}
      <figcaption>{pie}</figcaption>
    </figure>
  );
}

/**
 * Hero «Collage de trabajos» (encargo §5 y entrega §01/§05). Móvil: `h1` display, valoración, la
 * pareja a todo el ancho (los dos CTA sin scroll a 375×667) y debajo la pieza grande 4:5 y dos
 * cuadradas en fila. Escritorio: rejilla de 12 columnas, la pieza grande en 7 con el bloque del `h1`
 * montado sobre su esquina superior izquierda, y dos piezas 3:2 apiladas en 5. Las piezas 2 y 3, en
 * blanco y negro estático. Con 2 o 1 fotos se recompone; sin fotos, hero tipográfico «N.º 00».
 * Nada se anima: ni el `h1`, ni las fotos, ni los botones.
 */
export function HeroCollage({ config, mensaje }: Props) {
  const { negocio, contacto, valoracion } = config;
  const titulo = `${negocio.sector} en ${contacto.direccion.ciudad}`;
  const piezas = piezasCollage(config);

  if (piezas.length === 0) {
    return (
      <section className="contenedor flex flex-col gap-[18px] border-b-2 border-borde pt-[clamp(1.5rem,1rem+3vw,4.5rem)] pb-[clamp(1.5rem,1rem+2vw,3rem)]">
        <MarcaPagina pagina="inicio" />
        <span aria-hidden="true" className="ft numero text-[clamp(2rem,1.4rem+2.4vw,4.5rem)] leading-none">
          N.º 00
        </span>
        <h1 className="ft m-0 text-[clamp(3.25rem,1rem+9.5vw,10rem)] leading-[0.9] text-balance">{titulo}</h1>
        <Valoracion valoracion={valoracion} />
        <Pareja telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} tamano="hero" />
      </section>
    );
  }

  const [grande, ...resto] = piezas;
  return (
    <section className="contenedor flex flex-col gap-3.5 pt-5 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-(--calle-rejilla) lg:pt-7">
      <MarcaPagina pagina="inicio" />
      <div className={cn("relative flex flex-col gap-3.5", resto.length === 0 ? "lg:col-span-8" : "lg:col-span-7")}>
        <div className="flex flex-col gap-3.5 lg:absolute lg:top-0 lg:left-0 lg:z-[3] lg:w-[76%] lg:gap-[18px] lg:bg-fondo lg:pr-7 lg:pb-7">
          <h1 className="ft m-0 text-(length:--text-display) leading-[0.92] text-balance lg:text-[clamp(2.75rem,1.5rem+4.4vw,5.75rem)]">{titulo}</h1>
          <Valoracion valoracion={valoracion} />
          <Pareja telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} tamano="hero" />
        </div>
        <PiezaCollage pieza={grande} i={0} total={piezas.length} className="mt-2.5 lg:mt-[250px] lg:ml-[12%]" />
      </div>
      {resto.length > 0 && (
        <div className="flex gap-(--calle-rejilla) lg:col-span-5 lg:col-start-8 lg:flex-col lg:gap-7">
          {resto.map((p, k) => (
            <PiezaCollage key={p.imagen.src + k} pieza={p} i={k + 1} total={piezas.length} className="flex-1" />
          ))}
        </div>
      )}
    </section>
  );
}
