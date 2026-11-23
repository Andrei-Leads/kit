import Link from "next/link";
import { BotonLlamada, enlacesLegales, formatearHorario, listaRedes, telefonoVisible } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";
import { menu } from "@/lib/navegacion";
import { cn } from "@/lib/utils";
import config from "@/site.config";

const TITULO = "mb-1.5 font-titulo text-sm font-bold tracking-[0.08em] text-acento uppercase";

/**
 * Pie en hierro (encargo §6): el nombre a 48 px (completo, con `text-wrap: balance`), sector y
 * ciudad; páginas, horario (`formatearHorario`), taller (dirección, teléfono y email) y redes; legales y ©.
 */
export async function Pie() {
  const { negocio, contacto, redes } = config;
  const anio = await anioActual();
  const listaDeRedes = listaRedes(redes);
  const { direccion } = contacto;
  return (
    <footer className="hierro border-t border-borde pt-[clamp(36px,4vw,56px)] pb-12">
      <div className="contenedor">
        <p
          className={cn(
            "max-w-[18ch] font-titulo leading-[0.95] font-extrabold text-balance uppercase [overflow-wrap:anywhere]",
            negocio.nombre.length > 24 ? "text-[32px] lg:text-5xl" : "text-5xl",
          )}
        >
          {negocio.nombre}
        </p>
        <p className="mt-1.5 text-[15px] text-texto-suave">
          {negocio.sector} · {direccion.ciudad}
        </p>
        <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-x-8 gap-y-6">
          <nav aria-label="Pie">
            <h2 className={TITULO}>Páginas</h2>
            {[{ href: "/", texto: "Inicio" }, ...menu(config)].map((e) => (
              <Link key={e.href} href={e.href} className="flex min-h-11 items-center self-start no-underline hover:underline">
                {e.texto}
              </Link>
            ))}
          </nav>
          <div>
            <h2 className={TITULO}>Horario</h2>
            {formatearHorario(contacto.horario).map((h) => (
              <p key={h.dias} className="mb-1.5 text-[15px]">
                <span className="block text-texto-suave">{h.dias}</span>
                {h.horas}
              </p>
            ))}
          </div>
          <div>
            <h2 className={TITULO}>Taller</h2>
            <p className="text-[15px]">
              {direccion.calle}
              <br />
              {direccion.cp} {direccion.ciudad} ({direccion.provincia})
            </p>
            <BotonLlamada telefono={contacto.telefono} className="flex min-h-11 items-center self-start font-titulo text-[22px] font-extrabold no-underline hover:underline">
              {telefonoVisible(contacto.telefono)}
            </BotonLlamada>
            <a href={`mailto:${contacto.email}`} className="inline-flex min-h-11 items-center text-[15px] underline underline-offset-[3px] [overflow-wrap:anywhere]">
              {contacto.email}
            </a>
          </div>
          {listaDeRedes.length > 0 && (
            <div>
              <h2 className={TITULO}>Redes</h2>
              {listaDeRedes.map((r) => (
                <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center self-start underline underline-offset-[3px]">
                  {r.texto}
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-borde pt-4 text-sm text-texto-suave">
          <ul className="flex flex-wrap gap-x-5">
            {enlacesLegales.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-11 items-center underline underline-offset-[3px] hover:text-sobre-hierro">
                  {l.texto}
                </Link>
              </li>
            ))}
          </ul>
          <p className="sm:ml-auto">
            © {anio} {negocio.nombreLegal} · NIF {negocio.nif}
          </p>
        </div>
      </div>
    </footer>
  );
}
