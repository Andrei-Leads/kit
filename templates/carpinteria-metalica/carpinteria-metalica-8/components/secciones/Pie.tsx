import Link from "next/link";
import { BotonLlamada, direccionLinea, enlacesLegales, formatearHorario, listaRedes, telefonoVisible, type Ancla, type SiteConfig } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";

type Props = {
  negocio: Pick<SiteConfig["negocio"], "nombre" | "nombreLegal" | "anioFundacion">;
  contacto: Pick<SiteConfig["contacto"], "telefono" | "email" | "direccion" | "horario">;
  redes: SiteConfig["redes"];
  enlaces: readonly Ancla[];
};

const TITULO = "mb-1.5 text-[13px] font-semibold tracking-[0.08em] text-texto-suave uppercase";

/**
 * Pie (encargo §6): sobre `alterna` con radios grandes arriba. Sello «{nombre} · desde {año}» (sin
 * año, solo el nombre), páginas, contacto, horario de `formatearHorario`, legales y redes.
 */
export async function Pie({ negocio, contacto, redes, enlaces }: Props) {
  const anio = await anioActual();
  const listaRedesPie = listaRedes(redes);
  const d = contacto.direccion;
  return (
    <footer className="rounded-t-[clamp(36px,6vw,80px)_clamp(48px,8vw,110px)] bg-alterna px-[clamp(20px,5vw,56px)] pt-[clamp(56px,7vw,96px)] pb-8">
      <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-x-8 gap-y-10">
        <div>
          <p className="inline-flex aspect-[1.15] max-w-[260px] min-w-[180px] -rotate-3 flex-col items-center justify-center gap-0.5 rounded-guijarro-1 bg-superficie p-6 text-center outline-[1.5px] -outline-offset-[9px] outline-acento outline-dashed motion-reduce:rotate-0">
            <strong className="font-titulo text-xl leading-[1.15] font-medium [overflow-wrap:anywhere]">{negocio.nombre}</strong>
            {negocio.anioFundacion && <span className="text-sm text-texto-suave">desde {negocio.anioFundacion}</span>}
          </p>
        </div>
        <nav aria-label="Pie" className="flex flex-col gap-1">
          <h2 className={TITULO}>Páginas</h2>
          <ul className="flex flex-col">
            {[{ href: "/", texto: "Inicio" }, ...enlaces].map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="flex min-h-11 items-center no-underline hover:underline">
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-1.5 text-base">
          <h2 className={TITULO}>Contacto</h2>
          <BotonLlamada telefono={contacto.telefono} className="flex min-h-11 items-center font-semibold no-underline hover:underline">
            {telefonoVisible(contacto.telefono)}
          </BotonLlamada>
          <a href={`mailto:${contacto.email}`} className="flex min-h-11 items-center underline [overflow-wrap:anywhere]">
            {contacto.email}
          </a>
          <p>{direccionLinea(d)}</p>
        </div>
        <div className="flex flex-col gap-1.5 text-base">
          <h2 className={TITULO}>Horario</h2>
          <ul className="flex flex-col gap-1.5">
            {formatearHorario(contacto.horario).map((l) => (
              <li key={l.dias}>
                <strong className="font-semibold">{l.dias}</strong>
                <br />
                {l.horas}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-[1180px] flex-wrap justify-between gap-x-6 gap-y-3 border-t-[1.5px] border-dashed border-borde pt-5 text-sm text-texto-suave">
        <p>
          © {anio} {negocio.nombreLegal}
        </p>
        <ul aria-label="Legal y redes" className="flex flex-wrap gap-x-5 gap-y-1">
          {[...enlacesLegales, ...listaRedesPie].map((e) => (
            <li key={e.href}>
              <Link href={e.href} className="inline-flex min-h-11 items-center underline underline-offset-3">
                {e.texto}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
