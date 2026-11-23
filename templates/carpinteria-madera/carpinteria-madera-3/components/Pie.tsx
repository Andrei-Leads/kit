import Link from "next/link";
import { BotonLlamada, enlacesLegales, listaRedes, telefonoVisible, type SiteConfig } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";
import { paginasMenu } from "@/lib/navegacion";

type Props = { config: Pick<SiteConfig, "negocio" | "contacto" | "redes" | "trabajos" | "galeria"> };

/**
 * Pie del diseño: el nombre completo como «sello» rectangular de 1 px (encargo §5) con «Taller desde
 * 1987 · Mairena del Aljarafe», la descripción, las páginas, los datos del taller, las legales
 * (`enlacesLegales` de core) y las redes. Abajo, «© año razón social · NIF».
 */
export async function Pie({ config }: Props) {
  const { negocio, contacto, redes } = config;
  const anio = await anioActual();
  const { direccion } = contacto;
  const sello = [negocio.anioFundacion && `Taller desde ${negocio.anioFundacion}`, direccion.ciudad].filter(Boolean).join(" · ");
  const enlace = "inline-flex min-h-11 items-center font-titulo text-[13px] tracking-[0.04em] lg:min-h-10";
  return (
    <footer className="mt-(--sec) border-t border-borde bg-pie">
      <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-8 px-(--gutter) pt-12 pb-8">
        <div className="flex flex-col gap-3.5">
          <div className="flex max-w-[280px] flex-col gap-1 self-start border border-tinta px-[18px] py-3.5">
            <span className="font-titulo text-[13px] leading-[1.35] font-semibold tracking-[0.1em] uppercase [overflow-wrap:anywhere]">{negocio.nombre}</span>
            <span className="font-titulo text-[11.5px] tracking-[0.04em] text-texto-suave">{sello}</span>
          </div>
          <p className="max-w-[34ch] text-[0.9375rem] text-texto-suave">{negocio.descripcionCorta}</p>
        </div>
        <nav aria-label="Páginas del pie" className="flex flex-col">
          {paginasMenu(config).map((p) => (
            <Link key={p.href} href={p.href} className={enlace}>
              {p.texto}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-1 text-[0.9375rem]">
          <span className="etiqueta text-texto-suave">Taller</span>
          <BotonLlamada telefono={contacto.telefono} className="inline-flex min-h-11 items-center self-start lg:min-h-8">
            {telefonoVisible(contacto.telefono)}
          </BotonLlamada>
          <a href={`mailto:${contacto.email}`} className="inline-flex min-h-11 items-center self-start [overflow-wrap:anywhere] lg:min-h-8">
            {contacto.email}
          </a>
          <span>{direccion.calle}</span>
          <span>
            {direccion.cp} {direccion.ciudad} ({direccion.provincia})
          </span>
        </div>
        <div className="flex flex-col">
          {enlacesLegales.map((l) => (
            <Link key={l.href} href={l.href} className={enlace}>
              {l.texto}
            </Link>
          ))}
          {listaRedes(redes).map((r) => (
            <a key={r.href} href={r.href} target="_blank" rel="noopener" className={enlace}>
              {r.texto}
            </a>
          ))}
        </div>
      </div>
      <p className="mx-auto max-w-[1280px] border-t border-borde px-(--gutter) pt-4 pb-6 font-titulo text-xs tracking-[0.03em] text-texto-suave">
        © {anio} {negocio.nombreLegal} · NIF {negocio.nif}
      </p>
    </footer>
  );
}
