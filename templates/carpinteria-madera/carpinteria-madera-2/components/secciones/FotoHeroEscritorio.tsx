import { getImageProps } from "next/image";
import { etiquetaOrigen, type Imagen } from "@andrei-leads/core";

/** GIF transparente de 1×1: lo que «descarga» el móvil en lugar de la foto. */
const VACIA = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

/**
 * Foto ancla del hero, SOLO en escritorio (encargo §8, presupuesto): `<picture>` con una
 * `<source media="(min-width: 1024px)">` de `getImageProps` y un `<img>` de respaldo de 1×1 px, así
 * que en móvil no se descarga (un `display: none` no lo evitaría, y un `preload` la bajaría
 * también en móvil). `fetchPriority="high"` porque en escritorio es el LCP. 4:5, radio de 20 px,
 * asomando por detrás de la tarjeta del asistente, con la etiqueta de origen en píldora.
 */
export function FotoHeroEscritorio({ imagen }: { imagen: Imagen }) {
  const {
    props: { srcSet, sizes },
  } = getImageProps({ src: imagen.src, alt: imagen.alt, fill: true, sizes: "(min-width: 1280px) 272px, 22vw", quality: 75 });
  const etiqueta = etiquetaOrigen(imagen);
  return (
    <div className="absolute top-0 right-0 hidden aspect-[4/5] w-[46%] overflow-hidden rounded-foto bg-alterna lg:block">
      {/* <picture> con fuente solo de escritorio: en móvil la foto no se descarga (next/image no lo permite). */}
      <picture>
        <source media="(min-width: 1024px)" srcSet={srcSet} sizes={sizes} />
        <img src={VACIA} alt={imagen.alt} fetchPriority="high" decoding="async" className="absolute inset-0 size-full object-cover" />
      </picture>
      {etiqueta && (
        <span className="absolute top-3 right-3 z-[2] rounded-full bg-superficie px-2.5 py-1 text-[11px] leading-[1.3] font-semibold text-texto">{etiqueta}</span>
      )}
    </div>
  );
}
