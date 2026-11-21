import Link from "next/link";
import { BotonLlamada, direccionLinea, enlacesLegales, listaRedes, telefonoVisible, type SiteConfig } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";
import { paginasMenu } from "@/lib/formato";

const ENLACE = "inline-flex min-h-11 items-center underline decoration-1 underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-foco";

/**
 * Pie de papel (todas las páginas): nombre, razón social y NIF, dirección; páginas; contacto y
 * redes; © con el año de `lib/anio.ts` y los enlaces legales de core.
 */
export async function Pie({ config }: { config: SiteConfig }) {
  const { negocio, contacto, redes } = config;
  const anio = await anioActual();
  return (
    <footer className="border-t border-texto bg-fondo">
      <div className="contenedor grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-titulo text-[1.375rem] leading-tight">{negocio.nombre}</p>
          <p className="mt-3 text-sm text-texto-suave">
            {negocio.nombreLegal} · NIF {negocio.nif}
            <br />
            {direccionLinea(contacto.direccion)}
          </p>
        </div>
        <nav aria-label="Páginas">
          <h2 className="versalitas text-texto-suave">Páginas</h2>
          <ul className="mt-2">
            {paginasMenu(config).map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="inline-flex min-h-11 items-center font-titulo text-[1.0625rem] hover:underline focus-visible:outline-2 focus-visible:outline-foco">
                  {p.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="versalitas text-texto-suave">Contacto</h2>
          <ul className="mt-2">
            <li>
              <BotonLlamada
                telefono={contacto.telefono}
                className="cifras-antiguas inline-flex min-h-11 items-center font-titulo text-[1.25rem] hover:underline focus-visible:outline-2 focus-visible:outline-foco"
              >
                {telefonoVisible(contacto.telefono)}
              </BotonLlamada>
            </li>
            <li>
              <a href={`mailto:${contacto.email}`} className={`${ENLACE} text-sm break-all text-acento`}>
                {contacto.email}
              </a>
            </li>
            {listaRedes(redes).map((r) => (
              <li key={r.href}>
                <a href={r.href} className={`${ENLACE} text-sm text-acento`} rel="noopener">
                  {r.texto}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="contenedor">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-linea-plano py-5 text-[0.8125rem] text-texto-suave">
          <p>
            © {anio} {negocio.nombreLegal}
          </p>
          <ul className="flex flex-wrap gap-x-5">
            {enlacesLegales.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className={ENLACE}>
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
