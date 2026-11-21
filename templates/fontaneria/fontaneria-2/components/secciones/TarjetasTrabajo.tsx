import Link from "next/link";
import type { Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { elevar, tarjeta } from "@/lib/estilos";
import { cn } from "@/lib/utils";

type Props = {
  trabajos: readonly Trabajo[];
  nivel: "h2" | "h3";
  /** En /trabajos: `data-servicio` para el filtro sin JavaScript. */
  conFiltro?: boolean;
  /** Precarga la primera foto (solo en /trabajos, donde es la LCP). */
  preloadPrimera?: boolean;
  className?: string;
};

/** «Chamberí (Madrid) · 2026 · 2 horas»: solo los datos que existen. */
export function metaTrabajo(t: Pick<Trabajo, "ubicacion" | "anio" | "duracion">): string {
  return [t.ubicacion, t.anio, t.duracion].filter(Boolean).join(" · ");
}

/**
 * Tarjetas de trabajo (encargo §7): radio 24 px, foto 4:3, título, ubicación, año y duración y, si
 * existe, el `precio` en una píldora («Coste aproximado: …»).
 */
export function TarjetasTrabajo({ trabajos, nivel, conFiltro, preloadPrimera, className }: Props) {
  const Titulo = nivel;
  return (
    <ul className={cn("rejilla-trabajos m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-4 p-0", className)}>
      {trabajos.map((t, i) => {
        const meta = metaTrabajo(t);
        return (
          <li key={t.slug} className="flex" {...(conFiltro ? { "data-servicio": t.servicio ?? "" } : {})}>
            <Link
              href={`/trabajos/${t.slug}`}
              className={cn(tarjeta, elevar, "foco flex w-full flex-col p-2 text-texto no-underline")}
            >
              <Foto imagen={t.imagenes[0]} decorativa preload={preloadPrimera && i === 0} proporcion="4/3" sizes="(min-width: 960px) 380px, 100vw" />
              <div className="flex flex-1 flex-col gap-2 px-4 pt-4 pb-3">
                <Titulo className="m-0 text-[1.1875rem] leading-[1.3] font-bold">{t.titulo}</Titulo>
                {meta && <span className="text-[.9375rem] text-texto-suave">{meta}</span>}
                {t.precio && (
                  <span className="mt-auto self-start rounded-full bg-primario-suave px-3 py-1.5 text-[.9375rem] font-bold tabular-nums">
                    Coste aproximado: {t.precio}
                  </span>
                )}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
