import Link from "next/link";
import { BotonLlamada, direccionLinea, enlacesLegales, listaRedes, telefonoVisible, type Ancla, type SiteConfig } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";

type Props = Pick<SiteConfig, "negocio" | "contacto" | "redes"> & { enlaces: readonly Ancla[] };

/** Pie (entrega §12): nombre y descripción, navegación, contacto y redes; © con NIF y las legales de core. */
export async function Pie({ negocio, contacto, redes, enlaces }: Props) {
  const anio = await anioActual();
  return (
    <footer className="mt-12 border-t-2 border-borde">
      <div className="contenedor flex flex-col gap-[22px] pt-6 pb-7">
        <div className="flex flex-wrap justify-between gap-x-12 gap-y-6">
          <div className="flex flex-[1_1_260px] flex-col gap-2">
            <p className="ft m-0 text-[clamp(2rem,1.4rem+2vw,3.5rem)] leading-[0.9] text-balance">{negocio.nombre}</p>
            <p className="m-0 max-w-[44ch] text-[0.9375rem] text-texto-suave">{negocio.descripcionCorta}</p>
          </div>
          <nav aria-label="Pie" className="flex flex-[1_1_160px] flex-col">
            {enlaces.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                className="ft flex min-h-11 items-center text-xl text-texto no-underline [@media(hover:hover)]:hover:text-texto-suave"
              >
                {e.texto}
              </Link>
            ))}
          </nav>
          <div className="flex flex-[1_1_220px] flex-col gap-1.5 text-[0.9375rem]">
            <span>{direccionLinea(contacto.direccion)}</span>
            <BotonLlamada telefono={contacto.telefono} className="inline-flex min-h-11 items-center self-start text-texto underline lg:min-h-6">
              {telefonoVisible(contacto.telefono)}
            </BotonLlamada>
            <a href={`mailto:${contacto.email}`} className="inline-flex min-h-11 items-center self-start break-all text-texto underline lg:min-h-6">
              {contacto.email}
            </a>
            {listaRedes(redes).map((r) => (
              <a key={r.href} href={r.href} rel="noopener" className="inline-flex min-h-11 items-center self-start text-texto underline lg:min-h-6">
                {r.texto}
              </a>
            ))}
          </div>
        </div>
        <div className="pie-ficha flex flex-wrap items-center gap-x-5 gap-y-1.5 border-t-2 border-borde pt-3 text-texto-suave">
          <span>
            © {anio} {negocio.nombreLegal} · NIF {negocio.nif}
          </span>
          {enlacesLegales.map((e) => (
            <a key={e.href} href={e.href} className="inline-flex min-h-11 items-center text-texto-suave underline lg:min-h-6">
              {e.texto}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
