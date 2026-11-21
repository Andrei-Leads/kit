import Link from "next/link";
import type { Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Flecha } from "@/components/Iconos";

/** «Los Bermejales · 2026 · 2 h»: solo los datos que existan. */
export function lineaTrabajo(t: Pick<Trabajo, "ubicacion" | "anio" | "duracion">): string {
  return [t.ubicacion, t.anio, t.duracion].filter(Boolean).join(" · ");
}

/** Lista compacta de trabajos (encargo §7): miniatura en paralelogramo, contexto, título y descripción. */
export function FilasTrabajos({ trabajos, nivel = "h3" }: { trabajos: readonly Trabajo[]; nivel?: "h2" | "h3" }) {
  const Titulo = nivel;
  return (
    <ul className="m-0 list-none border-t border-borde/40 p-0">
      {trabajos.map((t) => {
        const linea = lineaTrabajo(t);
        return (
          <li key={t.slug} className="fila-aparece border-b border-borde/40">
            <Link href={`/trabajos/${t.slug}`} className="fila foco flex items-center gap-4 py-3 text-texto no-underline hover:bg-superficie/60">
              <Foto imagen={t.imagenes[0]} decorativa miniatura proporcion="4/3" sizes="180px" className="w-[clamp(104px,14vw,180px)] flex-none" />
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                {linea && <span className="rotulo">{linea}</span>}
                <Titulo className="condensada m-0 text-[1.375rem] leading-[1.05]">{t.titulo}</Titulo>
                <span className="line-clamp-2 text-[0.9375rem] text-texto-suave">{t.descripcion}</span>
              </span>
              <Flecha className="flecha size-5 flex-none" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
