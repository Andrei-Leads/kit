import Link from "next/link";
import {
  BotonLlamada,
  direccionLinea,
  enlacesLegales,
  horarioVisible,
  listaRedes,
  telefonoVisible,
  type Ancla,
  type SiteConfig,
} from "@andrei-leads/core";

import { partirNombre } from "@/lib/textos";
import { anioActual } from "@/lib/anio";

type Props = {
  negocio: SiteConfig["negocio"];
  contacto: SiteConfig["contacto"];
  redes: SiteConfig["redes"];
  enlaces: readonly Ancla[];
};

const TITULO = "m-0 mb-2 text-sm font-bold tracking-[0.06em] uppercase";

/** Pie en tinta: nombre y descripción, páginas, horario, contacto; abajo, ©, legales y redes. */
export async function Pie({ negocio, contacto, redes, enlaces }: Props) {
  const anio = await anioActual();
  const { prefijo, principal } = partirNombre(negocio.nombre);
  const horario = horarioVisible(contacto);
  const redesLista = listaRedes(redes);
  return (
    <footer className="sobre-tinta bg-tinta pt-[clamp(3rem,2rem+3vw,5rem)] pb-[calc(7.5rem+env(safe-area-inset-bottom))] text-base leading-normal text-sobre-tinta md:pb-[clamp(2rem,1.5rem+2vw,3rem)]">
      <div className="contenedor">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,13rem),1fr))] gap-10">
          <div>
            {prefijo && <p className="m-0 text-sm font-semibold">{prefijo}</p>}
            <p className="m-0 font-titulo text-[1.75rem] leading-[1.1]">{principal}</p>
            <p className="mt-3.5 mb-0 max-w-[28em] text-[0.9375rem]">{negocio.descripcionCorta}</p>
          </div>
          <nav aria-label="Pie de página">
            <h2 className={TITULO}>Páginas</h2>
            <ul className="m-0 list-none p-0">
              {enlaces.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="inline-flex min-h-11 min-w-11 items-center no-underline hover:underline">
                    {e.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className={TITULO}>Horario</h2>
            <dl className="m-0 flex flex-col gap-2">
              {horario.map((h) => (
                <div key={h.dias}>
                  <dt className="font-bold">{h.dias}</dt>
                  <dd className="m-0">{h.horas}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className={TITULO}>Contacto</h2>
            <BotonLlamada telefono={contacto.telefono} className="inline-flex min-h-11 items-center font-bold no-underline hover:underline">
              {telefonoVisible(contacto.telefono)}
            </BotonLlamada>
            <a href={`mailto:${contacto.email}`} className="flex min-h-11 items-center underline underline-offset-4 [overflow-wrap:anywhere]">
              {contacto.email}
            </a>
            <p className="mt-2 mb-0">{direccionLinea(contacto.direccion)}</p>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-sobre-tinta/30 pt-6 text-sm">
          <span>
            © {anio} {negocio.nombreLegal} · NIF {negocio.nif}
          </span>
          {enlacesLegales.map((e) => (
            <Link key={e.href} href={e.href} className="inline-flex min-h-11 items-center underline underline-offset-4">
              {e.texto}
            </Link>
          ))}
          {redesLista.map((r) => (
            <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-4">
              {r.texto}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
