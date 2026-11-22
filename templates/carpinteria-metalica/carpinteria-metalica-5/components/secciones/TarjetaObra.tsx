import Link from "next/link";
import type { Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { metaObra } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  trabajo: Trabajo;
  proporcion?: "3/2" | "4/5";
  sizes: string;
  nivel?: "h2" | "h3";
  className?: string;
};

/**
 * Obra (encargo §6.3 y §7): foto a sangre de columna, el título en serif cursiva de 24 px y
 * `ubicacion · anio · superficie` en versalitas de 13 px (cada dato que falta desaparece con su
 * separador). Toda la tarjeta es el enlace a la ficha.
 */
export function TarjetaObra({ trabajo, proporcion = "3/2", sizes, nivel = "h3", className }: Props) {
  const Titulo = nivel;
  const meta = metaObra(trabajo);
  return (
    <Link href={`/trabajos/${trabajo.slug}`} className={cn("group block text-inherit no-underline", className)}>
      <Foto imagen={trabajo.imagenes[0]} sizes={sizes} proporcion={proporcion} decorativa />
      <Titulo className="m-0 mt-5 mb-1 font-titulo text-2xl leading-[1.25] font-normal italic group-hover:text-foco">{trabajo.titulo}</Titulo>
      {meta && <p className="versalitas">{meta}</p>}
    </Link>
  );
}
