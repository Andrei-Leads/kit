import Link from "next/link";
import {
  BotonLlamada,
  enlacesLegales,
  formatearHorario,
  listaRedes,
  telefonoVisible,
  type Ancla,
  type SiteConfig,
} from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";

type Props = {
  negocio: SiteConfig["negocio"];
  contacto: SiteConfig["contacto"];
  redes: SiteConfig["redes"];
  enlaces: readonly Ancla[];
};

const ENLACE = "inline-flex min-h-11 items-center no-underline hover:underline";

/** Pie sobre `alterna` (tablero Pie): nombre y descripción, navegación, contacto con horario y legal. */
export async function Pie({ negocio, contacto, redes, enlaces }: Props) {
  const anio = await anioActual();
  const horario = formatearHorario(contacto.horario);
  const redesLista = listaRedes(redes);
  return (
    <footer className="border-t border-filete bg-alterna pb-[calc(72px+env(safe-area-inset-bottom))] lg:pb-0">
      <div className="contenedor pt-[clamp(40px,6vw,72px)] pb-7">
        <div className="grid gap-9 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p className="mb-3 font-titulo text-[28px] leading-[1.1] font-medium">{negocio.nombre}</p>
            <p className="mb-2 max-w-[34ch] text-[15px] leading-[1.55] text-texto-suave">{negocio.descripcionCorta}</p>
            {redesLista.map((r) => (
              <a key={r.href} href={r.href} className="enlace mr-5 inline-flex min-h-11 items-center text-[15px]">
                {r.texto}
              </a>
            ))}
          </div>
          <nav aria-label="Pie">
            <p className="versalitas mb-2">Navegación</p>
            <ul className="text-[15px]">
              {enlaces.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className={ENLACE}>
                    {e.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-[15px] leading-[1.7]">
            <p className="versalitas mb-2">Contacto</p>
            <div>
              <BotonLlamada telefono={contacto.telefono} className={ENLACE}>
                {telefonoVisible(contacto.telefono)}
              </BotonLlamada>
            </div>
            <div>
              <a href={`mailto:${contacto.email}`} className={`${ENLACE} [overflow-wrap:anywhere]`}>
                {contacto.email}
              </a>
            </div>
            <p className="mt-2 text-texto-suave">
              {contacto.direccion.calle}
              <br />
              {contacto.direccion.cp} {contacto.direccion.ciudad}
            </p>
            {horario.map((h) => (
              <p key={h.dias} className="mt-2 text-texto-suave">
                {h.dias}: {h.horas}
              </p>
            ))}
          </div>
          <nav aria-label="Legal">
            <p className="versalitas mb-2">Legal</p>
            <ul className="text-[15px]">
              {enlacesLegales.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className={ENLACE}>
                    {e.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-9 border-t border-filete pt-[18px] text-[13px] leading-normal text-texto-suave">
          © {anio} {negocio.nombreLegal} · NIF {negocio.nif}
        </p>
      </div>
    </footer>
  );
}
