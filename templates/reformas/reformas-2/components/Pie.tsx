import Link from "next/link";
import { BotonLlamada, direccionLinea, enlacesLegales, formatearHorario, listaRedes, telefonoVisible } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";
import { menu } from "@/lib/navegacion";
import config from "@/site.config";

/** Pie en tinta: nombre completo, descripción y redes · páginas · contacto y horario · © y legales. */
export async function Pie() {
  const { negocio, contacto, redes } = config;
  const anio = await anioActual();
  return (
    <footer className="bg-texto px-[clamp(16px,4vw,40px)] pt-14 pb-10 text-fondo">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-8">
          <div className="flex flex-col gap-2.5">
            <p className="font-titulo text-2xl leading-[1.15] font-semibold tracking-[-0.01em]">{negocio.nombre}</p>
            <p className="text-[15px] text-pretty text-pie-suave">{negocio.descripcionCorta}</p>
            {listaRedes(redes).map((r) => (
              <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center self-start font-semibold underline underline-offset-4">
                {r.texto}
              </a>
            ))}
          </div>
          <nav aria-label="Pie" className="flex flex-col gap-0.5">
            <p className="mb-1.5 text-[13px] font-semibold tracking-[0.08em] text-pie-suave uppercase">Páginas</p>
            {[{ href: "/", texto: "Inicio" }, ...menu(config)].map((e) => (
              <Link key={e.href} href={e.href} className="flex min-h-11 items-center self-start no-underline hover:underline">
                {e.texto}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-1.5 text-[15px]">
            <p className="mb-1.5 text-[13px] font-semibold tracking-[0.08em] text-pie-suave uppercase">Contacto</p>
            <BotonLlamada telefono={contacto.telefono} className="flex min-h-11 items-center self-start font-semibold no-underline hover:underline">
              {telefonoVisible(contacto.telefono)}
            </BotonLlamada>
            <a href={`mailto:${contacto.email}`} className="flex min-h-11 items-center self-start no-underline hover:underline [overflow-wrap:anywhere]">
              {contacto.email}
            </a>
            <p className="text-pie-suave">{direccionLinea(contacto.direccion)}</p>
            {formatearHorario(contacto.horario).map((h) => (
              <p key={h.dias} className="text-pie-suave">
                {h.dias} · {h.horas}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-3 border-t border-pie-linea pt-5 text-sm text-pie-suave">
          <p>
            © {anio} {negocio.nombreLegal} · NIF {negocio.nif}
          </p>
          <ul className="flex flex-wrap gap-x-[18px] gap-y-1">
            {enlacesLegales.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-11 items-center underline underline-offset-[3px] hover:text-fondo">
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
