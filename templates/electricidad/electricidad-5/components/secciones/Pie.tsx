import Link from "next/link";
import { BotonLlamada, enlacesLegales, listaRedes, telefonoVisible, direccionLinea, type Ancla, type SiteConfig } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";

type Props = Pick<SiteConfig, "negocio" | "contacto" | "redes"> & { enlaces: readonly Ancla[] };

/** Pie sobre un tinte del primario: nombre y descripción, páginas, contacto y legales. */
export async function Pie({ negocio, contacto, redes, enlaces }: Props) {
  const anio = await anioActual();
  const redesLista = listaRedes(redes);
  return (
    <footer className="bg-pie pt-[clamp(3rem,2rem+3vw,4.5rem)] pb-[calc(6.5rem+env(safe-area-inset-bottom))] text-texto md:pb-8">
      <div className="contenedor">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="m-0 font-titulo text-[1.375rem] leading-tight font-bold tracking-[-0.02em]">{negocio.nombre}</p>
            <p className="mt-3 mb-0 max-w-[42ch] text-[0.9375rem] text-texto-suave">{negocio.descripcionCorta}</p>
            {redesLista.length > 0 && (
              <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
                {redesLista.map((r) => (
                  <li key={r.href}>
                    <a href={r.href} rel="noopener" className="inline-flex min-h-11 items-center rounded-boton bg-superficie px-4 font-semibold no-underline hover:underline">
                      {r.texto}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <nav aria-labelledby="pie-paginas">
            <h2 id="pie-paginas" className="m-0 text-sm font-semibold text-texto-suave">
              Páginas
            </h2>
            <ul className="m-0 mt-2 list-none p-0">
              {enlaces.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="inline-flex min-h-11 items-center text-lg font-semibold no-underline hover:underline">
                    {e.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="m-0 text-sm font-semibold text-texto-suave">Contacto</h2>
            <ul className="m-0 mt-2 list-none p-0">
              <li>
                <BotonLlamada telefono={contacto.telefono} className="inline-flex min-h-11 items-center font-bold underline tabular-nums hover:no-underline">
                  {telefonoVisible(contacto.telefono)}
                </BotonLlamada>
              </li>
              <li>
                <a href={`mailto:${contacto.email}`} className="inline-flex min-h-11 items-center [overflow-wrap:anywhere] underline hover:no-underline">
                  {contacto.email}
                </a>
              </li>
              <li className="py-2">{direccionLinea(contacto.direccion)}</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 text-sm text-texto-suave md:flex-row md:flex-wrap md:items-center md:gap-x-5">
          <ul className="m-0 flex list-none flex-wrap gap-x-5 p-0">
            {enlacesLegales.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="inline-flex min-h-11 items-center text-texto underline hover:no-underline">
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>
          <p className="m-0">
            © {anio} {negocio.nombreLegal} · {negocio.nif}
          </p>
        </div>
      </div>
    </footer>
  );
}
