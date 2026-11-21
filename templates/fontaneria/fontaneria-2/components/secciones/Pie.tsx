import Link from "next/link";
import { BotonLlamada, enlacesLegales, listaRedes, telefonoVisible, type Ancla, type SiteConfig } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";
import { direccionLinea } from "@andrei-leads/core";
import { horarioVisible } from "@/lib/formato";

type Props = {
  negocio: SiteConfig["negocio"];
  contacto: SiteConfig["contacto"];
  redes: SiteConfig["redes"];
  items: Ancla[];
};

const ENLACE = "foco flex min-h-11 items-center text-texto-suave no-underline hover:text-texto hover:underline";

/**
 * Pie (encargo §6, «Pie»): fondo --color-superficie, cuatro columnas en escritorio: marca, páginas,
 * contacto con el horario de `formatearHorario` (y urgencias si las hay), legales (de core) y redes.
 */
export async function Pie({ negocio, contacto, redes, items }: Props) {
  const anio = await anioActual();
  return (
    <footer className="contenedor flex flex-col gap-8 border-t border-borde bg-superficie pt-[clamp(40px,5vw,72px)] pb-7 text-base">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-2.5">
          <p className="m-0 text-xl font-extrabold tracking-[-0.015em]">{negocio.nombre}</p>
          <p className="m-0 max-w-[36ch] text-texto-suave">{negocio.descripcionCorta}</p>
        </div>
        <nav aria-label="Páginas" className="flex flex-col gap-0.5">
          <p className="m-0 mb-1.5 font-bold">Páginas</p>
          {items.map((i) => (
            <Link key={i.href} href={i.href} className={ENLACE}>
              {i.texto}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-1.5">
          <p className="m-0 mb-0.5 font-bold">Contacto</p>
          <BotonLlamada telefono={contacto.telefono} className="foco inline-flex min-h-11 items-center self-start font-bold tabular-nums no-underline hover:underline">
            {telefonoVisible(contacto.telefono)}
          </BotonLlamada>
          <a href={`mailto:${contacto.email}`} className="foco inline-flex min-h-11 items-center self-start break-all text-texto-suave underline underline-offset-4 hover:text-texto">
            {contacto.email}
          </a>
          <span className="text-texto-suave">{direccionLinea(contacto.direccion)}</span>
          {horarioVisible(contacto).map((h) => (
            <span key={h.dias} className="text-texto-suave tabular-nums">
              {h.dias} · {h.horas}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="m-0 mb-1.5 font-bold">Legal</p>
          {enlacesLegales.map((l) => (
            <Link key={l.href} href={l.href} className={ENLACE}>
              {l.texto}
            </Link>
          ))}
          {listaRedes(redes).map((r) => (
            <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer" className={ENLACE}>
              {r.texto}
            </a>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-borde pt-5 text-[.9375rem] text-texto-suave">
        <span>
          © {anio} {negocio.nombreLegal}
        </span>
        <span>NIF {negocio.nif}</span>
      </div>
    </footer>
  );
}
