import Link from "next/link";
import type { SiteConfig } from "@andrei-leads/core";

import { Galeria } from "@/components/secciones/Galeria";
import { Obra } from "@/components/secciones/Obra";

/**
 * Sección estrella (encargo §6.2): hasta 4 obras como dobles páginas (primero las que tienen
 * `antes`), alternando el lado de la foto. Sin trabajos, la galería. Sin ninguna, nada.
 */
export function ParesAntesDespues({ config }: { config: Pick<SiteConfig, "trabajos" | "galeria"> }) {
  const { trabajos, galeria } = config;
  if (trabajos.length === 0 && galeria.length === 0) return null;
  const obras = [...trabajos.filter((t) => t.antes), ...trabajos.filter((t) => !t.antes)].slice(0, 4);
  return (
    <section aria-labelledby="titulo-trabajos" className="border-t border-filete">
      <div className="contenedor seccion">
        <p className="versalitas mb-3.5">Trabajos</p>
        <h2 id="titulo-trabajos" className="titulo-seccion filete-h2 max-w-[20ch]">
          {trabajos.some((t) => t.antes) ? "Obras reales, antes y después." : "Obras reales."}
        </h2>
        {obras.length > 0 ? (
          <>
            <div className="mt-[clamp(32px,5vw,64px)] flex flex-col gap-[clamp(48px,7vw,96px)]">
              {obras.map((t, i) => (
                <Obra key={t.slug} trabajo={t} modo="doble" invertir={i % 2 === 1} />
              ))}
            </div>
            {trabajos.length > obras.length && (
              <Link href="/trabajos" className="enlace mt-8 inline-flex min-h-11 items-center text-[17px]">
                Ver las {trabajos.length} obras
              </Link>
            )}
          </>
        ) : (
          <div className="mt-[clamp(32px,5vw,64px)]">
            <Galeria galeria={galeria} />
          </div>
        )}
      </div>
    </section>
  );
}
