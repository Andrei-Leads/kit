import Link from "next/link";
import type { Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";

/** «Gràcia · 2026 · 1 día»: solo los datos que hay. */
export function pieTrabajo(t: Pick<Trabajo, "ubicacion" | "anio" | "duracion">): string {
  return [t.ubicacion?.split(",")[0], t.anio, t.duracion].filter(Boolean).join(" · ");
}

/** Foto vertical 3:4 con su título y pie, todo en un enlace. */
export function TarjetaTrabajo({ trabajo, sizes, preload }: { trabajo: Trabajo; sizes: string; preload?: boolean }) {
  const pie = pieTrabajo(trabajo);
  return (
    <Link href={`/trabajos/${trabajo.slug}`} className="flex flex-col gap-2 no-underline [&:hover_.titulo]:underline">
      <Foto imagen={trabajo.imagenes[0]} proporcion="3/4" sizes={sizes} preload={preload} decorativa />
      <span className="titulo text-[clamp(1rem,0.95rem+0.3vw,1.2rem)] leading-tight font-black">{trabajo.titulo}</span>
      {pie && <span className="text-sm text-texto-suave">{pie}</span>}
    </Link>
  );
}
