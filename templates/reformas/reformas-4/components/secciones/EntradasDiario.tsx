import Link from "next/link";
import type { SiteConfig, Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Entrada } from "@/components/Entrada";
import { Rotulo } from "@/components/Rotulo";

type Props = {
  n: string;
  /** Trabajos ya ordenados (trabajosOrdenados). */
  trabajos: readonly Trabajo[];
  galeria: SiteConfig["galeria"];
};

/**
 * Obras del inicio (encargo §6.2): las 4 entradas más recientes del diario. Sin trabajos, la galería
 * como «Cuaderno de fotos». La página la oculta si no hay ninguna de las dos.
 */
export function EntradasDiario({ n, trabajos, galeria }: Props) {
  const hayTr = trabajos.length > 0;
  return (
    <section id="obras" aria-labelledby="h2-obras" className="px-(--pad) py-(--sec)">
      <div className="max-w-[1040px]">
        <Rotulo n={n}>Obras</Rotulo>
        <h2 id="h2-obras" className="h2-diario mb-6">
          {hayTr ? "Las últimas entradas del diario" : "Cuaderno de fotos"}
        </h2>
        {hayTr ? (
          <>
            {trabajos.slice(0, 4).map((t, i) => (
              <Entrada key={t.slug} trabajo={t} indice={i} />
            ))}
            <Link
              href="/trabajos"
              className="mono mt-6 inline-flex min-h-12 items-center rounded-boton border border-borde px-[18px] text-[13px] text-texto no-underline hover:border-primario-claro hover:text-texto"
            >
              {trabajos.length > 4 ? `Ver el diario completo · ${trabajos.length} obras →` : "Ver el diario completo →"}
            </Link>
          </>
        ) : (
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-4">
            {galeria.map((g) => (
              <li key={g.src} data-aparecer>
                <Foto imagen={g} sizes="(min-width: 1024px) 320px, calc(100vw - 40px)" />
                {g.titulo && <p className="mono mt-2 text-xs text-texto-suave">{g.titulo}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
