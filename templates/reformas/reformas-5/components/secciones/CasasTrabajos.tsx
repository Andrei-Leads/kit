import Link from "next/link";
import type { SiteConfig } from "@andrei-leads/core";

import { GaleriaArcos } from "@/components/secciones/GaleriaArcos";
import { TarjetaCasa } from "@/components/secciones/TarjetaCasa";
import { metaCorta } from "@/lib/textos";

/** «Casas que ya se viven»: 3 trabajos en arcos; sin trabajos, la galería; sin nada, no sale. */
export function CasasTrabajos({ trabajos, galeria }: Pick<SiteConfig, "trabajos" | "galeria">) {
  if (trabajos.length === 0 && galeria.length === 0) return null;
  return (
    <section aria-labelledby="titulo-casas" className="seccion">
      <div className="contenedor">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <h2 id="titulo-casas" className="titulo-seccion">
            Casas que ya se viven
          </h2>
          <Link href="/trabajos" className="inline-flex min-h-11 items-center text-base font-semibold underline">
            Ver todas las casas <span aria-hidden="true">&nbsp;→</span>
          </Link>
        </div>
        {trabajos.length > 0 ? (
          <ul className="m-0 grid list-none gap-x-8 gap-y-12 p-0 lg:grid-cols-3">
            {trabajos.slice(0, 3).map((t, i) => (
              <li key={t.slug} className="flex">
                <TarjetaCasa trabajo={t} meta={metaCorta(t)} i={i} className="w-full" />
              </li>
            ))}
          </ul>
        ) : (
          <GaleriaArcos galeria={galeria.slice(0, 6)} />
        )}
      </div>
    </section>
  );
}
