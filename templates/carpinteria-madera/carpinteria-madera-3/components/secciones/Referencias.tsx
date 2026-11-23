import Link from "next/link";
import type { SiteConfig } from "@andrei-leads/core";

import { Lamina } from "@/components/Lamina";
import { TituloSeccion } from "@/components/TituloSeccion";
import { metaTrabajo } from "@/lib/formato";

type Props = {
  n: string;
  trabajos: SiteConfig["trabajos"];
  galeria: SiteConfig["galeria"];
  /** Número de la primera lámina de la sección. */
  primeraLamina: number;
};

const TAM = "(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw";

/**
 * Referencias del taller (encargo §6.2): los tres primeros trabajos como fichas (lámina 4:3 con borde,
 * etiqueta mono «Ref. 004 · Triana · 2025 · 2,6 m² · 5 semanas», título y descripción). Sin trabajos,
 * las tres primeras fotos de la galería (sin `titulo`, sin h3: el alt ya lo lee el lector en la foto). Aparecen al hacer scroll (`data-aparecer`, solo CSS).
 */
export function Referencias({ n, trabajos, galeria, primeraLamina }: Props) {
  const fichas =
    trabajos.length > 0
      ? trabajos.slice(0, 3).map((t, i) => ({ key: t.slug, imagen: t.imagenes[0], meta: metaTrabajo(t, i), titulo: t.titulo, desc: t.descripcion, href: `/trabajos/${t.slug}` }))
      : galeria.slice(0, 3).map((g) => ({ key: g.src, imagen: g, meta: "Galería", titulo: g.titulo, desc: "", href: "/trabajos" }));
  return (
    <section id="referencias" aria-labelledby="h2-referencias" className="pt-(--sec)">
      <TituloSeccion n={n} id="h2-referencias">
        Referencias del taller
      </TituloSeccion>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-6 gap-y-10">
        {fichas.map((f, i) => (
          <article key={f.key} data-aparecer className="relative flex flex-col gap-2.5">
            <Lamina imagen={f.imagen} numero={primeraLamina + i} sizes={TAM} />
            <p className="mt-1.5 font-titulo text-[12.5px] tracking-[0.04em] text-lapiz">{f.meta}</p>
            {f.titulo && (
              <h3 className="text-xl leading-[1.3] font-semibold">
                <Link href={f.href} className="no-underline after:absolute after:inset-0">
                  {f.titulo}
                </Link>
              </h3>
            )}
            {f.desc && <p className="text-base text-texto-suave">{f.desc}</p>}
          </article>
        ))}
      </div>
      <Link href="/trabajos" className="enlace-mono mt-6">
        Ver todas las referencias →
      </Link>
    </section>
  );
}
