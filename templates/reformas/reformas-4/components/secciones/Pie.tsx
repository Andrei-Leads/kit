import Link from "next/link";
import { BotonLlamada, direccionLinea, enlacesLegales, formatearHorario, listaRedes, telefonoVisible, type SiteConfig } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";
import { paginasMenu } from "@/lib/navegacion";

type Props = { config: Pick<SiteConfig, "negocio" | "contacto" | "redes" | "trabajos" | "galeria"> };

/**
 * Pie del diseño: nombre, razón social con NIF y dirección; páginas; horario, teléfono y email;
 * legales (`enlacesLegales` de core) y redes. Reserva la altura de la barra móvil por debajo de 1024 px.
 */
export async function Pie({ config }: Props) {
  const { negocio, contacto, redes } = config;
  const anio = await anioActual();
  const enlace = "mono inline-flex min-h-11 items-center lg:min-h-8 text-[13px] text-texto-suave no-underline hover:text-texto";
  return (
    <footer className="border-t border-borde bg-pie px-(--pad) pt-14 pb-[104px] lg:pb-10">
      <div className="grid max-w-[1040px] grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))] gap-x-8 gap-y-9">
        <div className="grid content-start gap-2.5">
          <p className="mono text-[15px] leading-[1.35] font-semibold text-balance [overflow-wrap:anywhere]">{negocio.nombre}</p>
          <p className="text-sm leading-relaxed text-texto-suave">
            {negocio.nombreLegal} · NIF {negocio.nif}
          </p>
          <p className="text-sm leading-relaxed text-texto-suave">{direccionLinea(contacto.direccion, { provincia: true })}</p>
        </div>
        <nav aria-label="Pie" className="grid content-start gap-0.5">
          {paginasMenu(config).map((p) => (
            <Link key={p.href} href={p.href} className={enlace}>
              {p.texto}
            </Link>
          ))}
        </nav>
        <div className="mono grid content-start gap-2 text-[13px]">
          {formatearHorario(contacto.horario).map((h) => (
            <p key={h.dias} className="text-texto-suave">
              {h.dias} · <span className="text-texto">{h.horas}</span>
            </p>
          ))}
          <BotonLlamada telefono={contacto.telefono} className="inline-flex min-h-11 items-center justify-self-start text-primario-claro lg:min-h-8 underline hover:text-texto">
            {telefonoVisible(contacto.telefono)}
          </BotonLlamada>
          <a href={`mailto:${contacto.email}`} className="inline-flex min-h-11 items-center underline [overflow-wrap:anywhere] lg:min-h-8">
            {contacto.email}
          </a>
        </div>
        <div className="grid content-start gap-0.5">
          {enlacesLegales.map((l) => (
            <Link key={l.href} href={l.href} className={enlace}>
              {l.texto}
            </Link>
          ))}
          {listaRedes(redes).map((r) => (
            <a key={r.href} href={r.href} target="_blank" rel="noopener" className="mono inline-flex min-h-11 items-center text-[13px] underline lg:min-h-8">
              {r.texto}
            </a>
          ))}
        </div>
      </div>
      <p className="mono mt-10 max-w-[1040px] border-t border-borde pt-5 text-[11px] text-texto-suave">
        © {anio} {negocio.nombreLegal}
      </p>
    </footer>
  );
}
