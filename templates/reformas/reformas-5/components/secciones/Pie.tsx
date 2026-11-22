import Link from "next/link";
import { BotonLlamada, enlacesLegales, horarioVisible, listaRedes, telefonoVisible, direccionLinea, type Ancla, type SiteConfig } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";

type Props = {
  negocio: SiteConfig["negocio"];
  contacto: SiteConfig["contacto"];
  redes: SiteConfig["redes"];
  enlaces: readonly Ancla[];
};

/** Pie oscuro de cuatro columnas (nombre, páginas, contacto, horario) y la línea legal. */
export async function Pie({ negocio, contacto, redes, enlaces }: Props) {
  const anio = await anioActual();
  const horario = horarioVisible(contacto);
  const pequeno = "m-0 mb-2.5 text-sm font-semibold text-pie-suave";
  return (
    <footer className="sobre-oscuro bg-pie pt-16 pb-[calc(104px+env(safe-area-inset-bottom))] text-fondo lg:pb-10">
      <div className="contenedor">
        <div className="grid gap-x-10 gap-y-9 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p className="remate m-0 mb-2.5 text-[22px] leading-tight">{negocio.nombre}</p>
            <p className="m-0 max-w-[36ch] text-[15px] leading-normal text-pie-suave">{negocio.descripcionCorta}</p>
          </div>
          <nav aria-label="Páginas">
            <p className={pequeno}>Páginas</p>
            <ul className="m-0 list-none p-0">
              {enlaces.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="inline-flex min-h-11 items-center text-base text-fondo no-underline hover:underline">
                    {e.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className={pequeno}>Contacto</p>
            <p className="m-0 text-base leading-[1.9]">
              <BotonLlamada telefono={contacto.telefono} className="text-fondo underline">
                {telefonoVisible(contacto.telefono)}
              </BotonLlamada>
              <br />
              <a href={`mailto:${contacto.email}`} className="break-all text-fondo underline">
                {contacto.email}
              </a>
              <br />
              <span className="text-pie-suave">{direccionLinea(contacto.direccion)}</span>
            </p>
          </div>
          <div>
            <p className={pequeno}>Horario</p>
            {horario.map((h) => (
              <p key={h.dias} className="m-0 mb-2 text-[15px] leading-snug">
                {h.dias}
                <br />
                <span className="text-pie-suave">{h.horas}</span>
              </p>
            ))}
          </div>
        </div>
        <div className="mt-11 flex flex-wrap justify-between gap-x-6 gap-y-3 border-t border-fondo/16 pt-5 text-sm text-pie-suave">
          <span>
            © {anio} {negocio.nombreLegal} · NIF {negocio.nif}
          </span>
          <ul className="m-0 flex list-none flex-wrap gap-x-[18px] gap-y-1 p-0">
            {[...enlacesLegales, ...listaRedes(redes)].map((e) => (
              <li key={e.href}>
                <a href={e.href} className="inline-flex min-h-11 items-center text-pie-suave underline">
                  {e.texto}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
