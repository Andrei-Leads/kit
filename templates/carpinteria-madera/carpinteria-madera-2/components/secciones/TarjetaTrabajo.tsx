import Link from "next/link";
import type { Imagen, Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { metaTrabajo } from "@/lib/textos";

type Props = {
  trabajo: Trabajo;
  sizes: string;
  /** Rejilla de 2 columnas en móvil: etiqueta de origen reducida a «IA». */
  compacta?: boolean;
  nivel?: "h2" | "h3";
};

/** Tarjeta de trabajo (encargo §6.3): foto 4:5 redondeada, título y «{ubicación} · {superficie} · {duración}». */
export function TarjetaTrabajo({ trabajo, sizes, compacta, nivel = "h3" }: Props) {
  const Titulo = nivel;
  const meta = metaTrabajo(trabajo);
  return (
    <Link href={`/trabajos/${trabajo.slug}`} className="group flex flex-col gap-3 text-texto no-underline">
      <Foto imagen={trabajo.imagenes[0]} sizes={sizes} decorativa compacta={compacta} />
      <span className="flex flex-col gap-1 px-1">
        <Titulo className="font-titulo text-[clamp(17px,0.95rem+0.3vw,19px)] leading-[1.2] font-bold tracking-[-0.01em] group-hover:underline">
          {trabajo.titulo}
        </Titulo>
        {meta && <span className="text-[15px] text-texto-suave">{meta}</span>}
      </span>
    </Link>
  );
}

/** Sin trabajos: una foto de la galería con su `titulo`. */
export function TarjetaGaleria({ imagen, sizes, compacta, nivel = "h3" }: { imagen: Imagen & { titulo?: string }; sizes: string; compacta?: boolean; nivel?: "h2" | "h3" }) {
  const Titulo = nivel;
  return (
    <figure className="flex flex-col gap-3">
      <Foto imagen={imagen} sizes={sizes} compacta={compacta} />
      {imagen.titulo && (
        <figcaption className="px-1">
          <Titulo className="font-titulo text-[clamp(17px,0.95rem+0.3vw,19px)] leading-[1.2] font-bold tracking-[-0.01em]">{imagen.titulo}</Titulo>
        </figcaption>
      )}
    </figure>
  );
}
