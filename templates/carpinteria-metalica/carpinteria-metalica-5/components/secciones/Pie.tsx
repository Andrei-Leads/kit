import Link from "next/link";
import { BotonLlamada, direccionLinea, enlacesLegales, formatearHorario, listaRedes, telefonoVisible, type Ancla, type SiteConfig } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";

type Props = {
  negocio: SiteConfig["negocio"];
  contacto: SiteConfig["contacto"];
  redes: SiteConfig["redes"];
  enlaces: readonly Ancla[];
};

const ENLACE = "inline-flex min-h-11 items-center no-underline hover:underline lg:min-h-9";

/**
 * Pie (encargo §6): nombre en serif de 40 a 64 px, rutas, contacto, horario de
 * `formatearHorario`, redes y `enlacesLegales`. © con el año de `lib/anio.ts`.
 */
export async function Pie({ negocio, contacto, redes, enlaces }: Props) {
  const anio = await anioActual();
  const horario = formatearHorario(contacto.horario);
  const listaR = listaRedes(redes);
  return (
    <footer className="mt-[clamp(40px,6vw,80px)] border-t border-borde bg-pie">
      <div className="contenedor pt-[clamp(56px,7vw,96px)] pb-8">
        <p className="m-0 max-w-[16ch] font-titulo text-[clamp(40px,1.6rem+2.6vw,64px)] leading-none font-[350] tracking-[-0.02em] text-balance">{negocio.nombre}</p>
        <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-8 text-[15px]">
          <nav aria-label="Pie" className="flex flex-col">
            {enlaces.map((e) => (
              <Link key={e.href} href={e.href} className={ENLACE}>
                {e.texto}
              </Link>
            ))}
          </nav>
          <address className="flex flex-col gap-1.5 text-texto-suave not-italic">
            <BotonLlamada telefono={contacto.telefono} className={`${ENLACE} text-texto`}>
              {telefonoVisible(contacto.telefono)}
            </BotonLlamada>
            <a href={`mailto:${contacto.email}`} className={`${ENLACE} break-all text-texto`}>
              {contacto.email}
            </a>
            <span>{direccionLinea(contacto.direccion, { provincia: contacto.direccion.provincia !== contacto.direccion.ciudad })}</span>
          </address>
          <div className="flex flex-col gap-1.5 text-texto-suave">
            {horario.map((h) => (
              <span key={h.dias}>
                {h.dias} · {h.horas}
              </span>
            ))}
            {listaR.map((r) => (
              <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer" className={`${ENLACE} text-texto underline decoration-1 underline-offset-4`}>
                {r.texto}
              </a>
            ))}
          </div>
          <nav aria-label="Legal" className="flex flex-col">
            {enlacesLegales.map((e) => (
              <Link key={e.href} href={e.href} className={`${ENLACE} text-texto-suave hover:text-texto`}>
                {e.texto}
              </Link>
            ))}
          </nav>
        </div>
        <p className="m-0 mt-12 text-xs tracking-[0.08em] text-texto-suave">
          © {anio} {negocio.nombreLegal}
        </p>
      </div>
    </footer>
  );
}
