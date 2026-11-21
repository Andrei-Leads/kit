import Link from "next/link";
import { direccionLinea, enlacesLegales, listaRedes, telefonoVisible, type Ancla, type SiteConfig } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";

type Props = {
  negocio: SiteConfig["negocio"];
  contacto: SiteConfig["contacto"];
  acreditaciones: SiteConfig["acreditaciones"];
  redes: SiteConfig["redes"];
  items: Ancla[];
};

const ENLACE = "foco inline-flex min-h-11 items-center text-texto no-underline hover:underline";

/** Pie: nombre, descripción, número, navegación, datos y legales (`enlacesLegales` de core). */
export async function Pie({ negocio, contacto, acreditaciones, redes, items }: Props) {
  const anio = await anioActual();
  const redesLista = listaRedes(redes);
  const conNumero = acreditaciones.filter((a) => a.numero);
  return (
    <footer className="bg-superficie text-[0.9375rem]">
      <div className="contenedor grid gap-8 py-12 lg:grid-cols-[2fr_1fr_1.5fr] lg:gap-12">
        <div className="flex flex-col gap-3">
          <p className="condensada m-0 text-[1.75rem] leading-none uppercase">{negocio.nombre}</p>
          <p className="m-0 max-w-[40ch] text-texto-suave">{negocio.descripcionCorta}</p>
          <p className="condensada m-0 text-[1.75rem] leading-none tabular-nums">{telefonoVisible(contacto.telefono)}</p>
        </div>
        <nav aria-label="Pie">
          <ul className="flex flex-col">
            {items.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className={ENLACE}>
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-1 text-texto-suave">
          <p className="m-0 py-2">{direccionLinea(contacto.direccion)}</p>
          <p className="m-0">
            <a href={`mailto:${contacto.email}`} className={`${ENLACE} underline`}>
              {contacto.email}
            </a>
          </p>
          {conNumero.map((a) => (
            <p key={a.nombre} className="m-0 py-1">
              {a.nombre} n.º {a.numero}
            </p>
          ))}
          {redesLista.length > 0 && (
            <ul className="flex gap-4">
              {redesLista.map((r) => (
                <li key={r.href}>
                  <a href={r.href} className={`${ENLACE} underline`} rel="noopener noreferrer" target="_blank">
                    {r.texto}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="contenedor flex flex-col gap-2 border-t border-borde/40 py-5 text-sm text-texto-suave lg:flex-row lg:items-center lg:justify-between">
        <p className="m-0">
          © {anio} {negocio.nombreLegal} · NIF {negocio.nif}
        </p>
        <ul className="flex flex-wrap gap-x-5">
          {enlacesLegales.map((e) => (
            <li key={e.href}>
              <Link href={e.href} className="foco inline-flex min-h-11 items-center text-texto-suave underline hover:text-texto">
                {e.texto}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
