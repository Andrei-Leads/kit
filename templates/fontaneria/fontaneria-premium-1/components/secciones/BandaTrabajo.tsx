import Link from "next/link";
import type { Imagen } from "@andrei-leads/core";

import { EnlaceFlecha } from "@/components/Botones";
import { Transicion } from "@/components/Transicion";
import { Foto } from "@/components/base/Foto";

export type DatosBanda = {
  clave: string;
  imagen?: Imagen;
  etiqueta?: string;
  titulo?: string;
  descripcion?: string;
  /** «6 m² · 16 días · 8.000–9.000 €». */
  contexto?: string;
  href?: string;
};

/**
 * Banda de trabajo (encargo §7): foto 4:1 a ancho de contenedor (4:3 en
 * móvil) y, debajo, etiqueta lugar · año, título, contexto y «Ver el trabajo».
 * Sin foto, banda tinta con la textura y la etiqueta. La foto lleva el nombre
 * de transición `foto-{slug}` hacia su ficha.
 */
export function BandaTrabajo({ banda, nivel = "h3" }: { banda: DatosBanda; nivel?: "h2" | "h3" }) {
  const Titulo = nivel;
  const { imagen, etiqueta, titulo, descripcion, contexto, href } = banda;
  const foto = imagen ? (
    <Transicion nombre={href ? `foto-${banda.clave}` : undefined}>
      <Foto imagen={imagen} sizes="(min-width: 1280px) 1120px, calc(100vw - 2 * var(--margen))" proporcion="4/1" decorativa={Boolean(href)} className="max-lg:!aspect-[4/3]" />
    </Transicion>
  ) : (
    <div aria-hidden="true" className="textura flex aspect-[4/3] items-end rounded-foto bg-tinta p-5 lg:aspect-[4/1]">
      {etiqueta && <span className="etiqueta !text-sobre-tinta-suave">{etiqueta}</span>}
    </div>
  );
  return (
    <article data-aparecer className="flex flex-col gap-5">
      {href ? (
        <Link href={href} tabIndex={-1} aria-hidden="true" className="block">
          {foto}
        </Link>
      ) : (
        foto
      )}
      <div className="grid gap-3 lg:grid-cols-[minmax(0,400px)_minmax(0,360px)_1fr] lg:items-start lg:gap-10">
        <div className="flex flex-col gap-2.5">
          {etiqueta && <p className="etiqueta !text-texto-suave">{etiqueta}</p>}
          {titulo && <Titulo className="titulo m-0 text-[28px] leading-[1.1] lg:text-[34px]">{titulo}</Titulo>}
        </div>
        <p className="m-0 text-texto-suave lg:pt-6">{descripcion ?? contexto}</p>
        <div className="flex flex-col items-start gap-3 lg:pt-6">
          {descripcion && contexto && <p className="m-0 text-sm">{contexto}</p>}
          {href && <EnlaceFlecha href={href}>Ver el trabajo</EnlaceFlecha>}
        </div>
      </div>
    </article>
  );
}
