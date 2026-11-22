import Link from "next/link";
import { BotonLlamada, direccionLinea, enlacesLegales, formatearHorario, listaRedes, telefonoVisible, type Ancla, type SiteConfig } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";

type Props = Pick<SiteConfig, "negocio" | "contacto" | "redes"> & { enlaces: readonly Ancla[] };

/** Pie: nombre y descripción, navegación, contacto, legales (de core) y redes; © con NIF. */
export async function Pie({ negocio, contacto, redes, enlaces }: Props) {
  const anio = await anioActual();
  return (
    <footer className="border-t-2 border-borde">
      <div className="contenedor pt-7 pb-5">
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.4fr_1fr]">
          <div>
            <p className="condensada m-0 text-[32px] leading-[0.9]">{negocio.nombre}</p>
            <p className="m-0 mt-2.5 max-w-[40ch] text-sm leading-[1.45] text-texto-suave">{negocio.descripcionCorta}</p>
          </div>
          <nav aria-label="Pie">
            <ul className="m-0 list-none p-0">
              {enlaces.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="condensada inline-flex min-h-11 items-center text-lg text-texto no-underline hover:text-primario lg:min-h-9">
                    {e.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-sm leading-[1.6]">
            <BotonLlamada telefono={contacto.telefono} className="inline-flex min-h-11 items-center font-semibold text-texto underline lg:min-h-0">
              {telefonoVisible(contacto.telefono)}
            </BotonLlamada>
            <a href={`mailto:${contacto.email}`} className="flex min-h-11 items-center break-all text-texto underline lg:min-h-0">
              {contacto.email}
            </a>
            <span className="block text-texto-suave">{direccionLinea(contacto.direccion)}</span>
            {formatearHorario(contacto.horario).map((l) => (
              <span key={l.dias} className="block text-texto-suave">
                {l.dias} · {l.horas}
              </span>
            ))}
          </div>
          <ul className="m-0 list-none p-0 text-sm leading-[1.6]">
            {[...enlacesLegales, ...listaRedes(redes)].map((e) => (
              <li key={e.href}>
                <a href={e.href} className="inline-flex min-h-11 items-center text-texto underline lg:min-h-7" {...(e.href.startsWith("http") ? { rel: "noopener" } : {})}>
                  {e.texto}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="m-0 mt-6 border-t-2 border-borde pt-3 text-xs text-texto-suave">
          © {anio} {negocio.nombreLegal} · NIF {negocio.nif}
        </p>
      </div>
    </footer>
  );
}
