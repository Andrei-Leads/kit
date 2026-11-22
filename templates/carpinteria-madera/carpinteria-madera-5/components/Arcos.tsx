import Link from "next/link";
import type { Imagen, Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { fichaTrabajo } from "@/lib/textos";

const SIZES = "(min-width: 1280px) 280px, (min-width: 640px) 33vw, 100vw";
const REJILLA = "grid grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-5";

/**
 * Trabajos sin `antes` en arcos pequeños 4:5 (encargo §6.2 «fila de fotos solas»): foto,
 * título y ficha corta, todo enlace a la ficha del trabajo.
 */
export function ArcosTrabajos({ trabajos, nivel = "h3", ancla }: { trabajos: readonly Trabajo[]; nivel?: "h3" | "h2"; ancla?: (t: Trabajo) => string | undefined }) {
  const Titulo = nivel;
  return (
    <ul className={REJILLA}>
      {trabajos.map((t) => (
        <li key={t.slug} id={ancla?.(t)} data-aparecer className="scroll-mt-[calc(var(--alto-cabecera)+16px)]">
          <Link href={`/trabajos/${t.slug}`} className="group block text-texto no-underline">
            <Foto imagen={t.imagenes[0]} sizes={SIZES} proporcion="4/5" decorativa className="rounded-arco-medio" />
            <Titulo className="mt-3 text-base font-semibold group-hover:underline group-hover:decoration-primario">{t.titulo}</Titulo>
            {fichaTrabajo(t) && <p className="mt-0.5 text-sm text-texto-suave">{fichaTrabajo(t)}</p>}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** La `galeria` en arcos 4:5 (sin trabajos). Con `titulo`, va debajo. */
export function ArcosGaleria({ galeria }: { galeria: readonly (Imagen & { titulo?: string })[] }) {
  return (
    <ul className={REJILLA}>
      {galeria.map((g) => (
        <li key={g.src} data-aparecer>
          <figure className="m-0">
            <Foto imagen={g} sizes={SIZES} proporcion="4/5" className="rounded-arco-medio" />
            {g.titulo && <figcaption className="mt-3 font-semibold">{g.titulo}</figcaption>}
          </figure>
        </li>
      ))}
    </ul>
  );
}
