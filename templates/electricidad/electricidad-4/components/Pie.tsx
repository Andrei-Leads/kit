import Link from "next/link";
import { BotonLlamada, direccionLinea, enlacesLegales, listaRedes, telefonoVisible } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";
import { paginasMenu } from "@/lib/navegacion";
import config from "@/site.config";

/** Pie en gris alterno: datos, menú, legales (enlacesLegales de core) y redes; © con el año de lib/anio.ts. */
export async function Pie() {
  const { negocio, contacto, redes } = config;
  const anio = await anioActual();
  const enlace = "inline-flex min-h-11 items-center text-[15px] no-underline hover:underline";
  return (
    <footer className="border-t border-carril bg-alterna">
      <div className="contenedor grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-6 pt-8 pb-7">
        <div className="flex flex-col gap-1.5">
          <p className="text-lg font-semibold [overflow-wrap:anywhere]">{negocio.nombre}</p>
          <p className="text-[15px] text-texto-suave">{direccionLinea(contacto.direccion)}</p>
          <BotonLlamada telefono={contacto.telefono} className="cifras inline-flex min-h-11 items-center self-start font-semibold underline underline-offset-3">
            {telefonoVisible(contacto.telefono)}
          </BotonLlamada>
          <a href={`mailto:${contacto.email}`} className="inline-flex min-h-11 items-center self-start text-[15px] underline [overflow-wrap:anywhere]">
            {contacto.email}
          </a>
        </div>
        <nav aria-label="Pie">
          <ul className="flex flex-col gap-0.5">
            {paginasMenu(config).map((p) => (
              <li key={p.href}>
                <Link href={p.href} className={enlace}>
                  {p.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex flex-col gap-0.5">
          {enlacesLegales.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={enlace}>
                {l.texto}
              </Link>
            </li>
          ))}
          {listaRedes(redes).map((r) => (
            <li key={r.href}>
              <a href={r.href} target="_blank" rel="noopener" className={enlace}>
                {r.texto}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="contenedor border-t border-carril pt-3 pb-5 text-[13px] text-texto-suave">
        © {anio} {negocio.nombreLegal} · NIF {negocio.nif}
      </p>
    </footer>
  );
}
