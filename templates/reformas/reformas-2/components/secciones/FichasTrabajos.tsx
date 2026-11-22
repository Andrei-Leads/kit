import Link from "next/link";
import { servicioDelTrabajo, type Servicio, type SiteConfig, type Trabajo } from "@andrei-leads/core";

import { TarjetaGaleria, TarjetaTrabajo } from "@/components/secciones/TarjetaTrabajo";
import { cn } from "@/lib/utils";

type Props = {
  trabajos: readonly Trabajo[];
  servicios: readonly Servicio[];
  galeria?: SiteConfig["galeria"];
  titulo?: string;
  verTodos?: boolean;
  /** Fila con scroll-snap en móvil (inicio y ficha de servicio); si no, rejilla. */
  fila?: boolean;
};

/**
 * Fichas de trabajos (encargo §6.2): en móvil, una fila horizontal con `scroll-snap` (manual) que
 * deja ver la siguiente; en escritorio, rejilla de 3. Sin trabajos, la galería en la misma tarjeta.
 * Sin nada, no pinta nada.
 */
export function FichasTrabajos({ trabajos, servicios, galeria = [], titulo, verTodos, fila = true }: Props) {
  const usarGaleria = trabajos.length === 0;
  if (usarGaleria && galeria.length === 0) return null;
  const nivel = titulo ? "h3" : "h2";
  const lista = cn(
    fila && (usarGaleria ? galeria.length : trabajos.length) > 1
      ? "fila-fichas"
      : "grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-x-4 gap-y-8 pb-[26px]",
  );
  return (
    <section aria-label={titulo ? undefined : "Trabajos"} aria-labelledby={titulo ? "h2-trabajos" : undefined} className="seccion overflow-hidden">
      <div className="contenedor flex flex-col gap-6">
        {titulo && (
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
            <h2 id="h2-trabajos" className="h2">
              {titulo}
            </h2>
            {verTodos && (
              <Link href="/trabajos" className="enlace">
                Ver todos los trabajos →
              </Link>
            )}
          </div>
        )}
        <ul className={lista}>
          {usarGaleria
            ? galeria.slice(0, fila ? 6 : undefined).map((g) => (
                <li key={g.src} className="min-w-0">
                  <TarjetaGaleria imagen={g} nivel={nivel} />
                </li>
              ))
            : trabajos.slice(0, fila ? 6 : undefined).map((t) => (
                <li key={t.slug} className="min-w-0" data-aparecer="">
                  <TarjetaTrabajo trabajo={t} servicio={servicioDelTrabajo(servicios, t)} nivel={nivel} />
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
}
