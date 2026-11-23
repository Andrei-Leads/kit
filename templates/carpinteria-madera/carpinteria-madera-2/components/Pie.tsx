import Link from "next/link";
import { BotonLlamada, direccionLinea, enlacesLegales, listaRedes, telefonoVisible } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";
import { menu } from "@/lib/navegacion";
import config from "@/site.config";

const ENLACE = "inline-flex min-h-11 items-center self-start";

/** Pie claro con línea arriba: nombre, descripción y dirección · páginas · teléfono, email y redes · © y legales. */
export async function Pie() {
  const { negocio, contacto, redes } = config;
  const anio = await anioActual();
  return (
    <footer className="border-t border-borde px-[clamp(20px,4vw,40px)] pt-14 pb-8">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8">
        <div className="flex flex-wrap justify-between gap-x-12 gap-y-8">
          <div className="flex max-w-[44ch] flex-[1_1_280px] flex-col gap-2.5">
            <p className="font-titulo text-xl leading-[1.2] font-bold">{negocio.nombre}</p>
            <p className="text-[15px] text-texto-suave">{negocio.descripcionCorta}</p>
            <p className="text-[15px] text-texto-suave">{direccionLinea(contacto.direccion, { provincia: true })}</p>
          </div>
          <nav aria-label="Pie" className="flex flex-col">
            {[{ href: "/", texto: "Inicio" }, ...menu(config)].map((e) => (
              <Link key={e.href} href={e.href} className={`${ENLACE} text-[15.5px] font-semibold no-underline hover:underline`}>
                {e.texto}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col text-[15.5px]">
            <BotonLlamada telefono={contacto.telefono} className={`${ENLACE} font-bold tabular-nums underline underline-offset-4`}>
              {telefonoVisible(contacto.telefono)}
            </BotonLlamada>
            <a href={`mailto:${contacto.email}`} className={`${ENLACE} underline underline-offset-4 [overflow-wrap:anywhere]`}>
              {contacto.email}
            </a>
            {listaRedes(redes).map((r) => (
              <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer" className={`${ENLACE} underline underline-offset-4`}>
                {r.texto}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-borde pt-5 text-[13.5px] text-texto-suave">
          <p>
            © {anio} {negocio.nombreLegal} · NIF {negocio.nif}
          </p>
          <ul className="flex flex-wrap gap-x-4">
            {enlacesLegales.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-11 items-center underline underline-offset-[3px]">
                  {l.texto}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
