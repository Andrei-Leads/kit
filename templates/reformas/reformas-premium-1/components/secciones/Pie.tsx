import Link from "next/link";
import {
  BotonLlamada,
  direccionLinea,
  enlacesLegales,
  formatearHorario,
  listaRedes,
  telefonoVisible,
  urlComoLlegar,
  type Ancla,
  type SiteConfig,
} from "@andrei-leads/core";

import { Destacada } from "@/components/Botones";
import { anioActual } from "@/lib/anio";
import { TEXTOS } from "@/lib/textos";

type Props = {
  negocio: SiteConfig["negocio"];
  contacto: SiteConfig["contacto"];
  redes: SiteConfig["redes"];
  enlaces: readonly Ancla[];
};

const PEQUENO = "etiqueta mb-3 text-texto-claro/80";

/**
 * Pie en tinta (encargo §6.10): el lema a `--text-pano`, columnas de nombre y páginas,
 * contacto con «Cómo llegar», horario corto y redes; abajo, © y `enlacesLegales`.
 * Deja 80 px libres sobre la barra en móvil y 96 px abajo a la derecha en escritorio
 * para la pareja flotante.
 */
export async function Pie({ negocio, contacto, redes, enlaces }: Props) {
  const anio = await anioActual();
  const horario = formatearHorario(contacto.horario);
  const sociales = listaRedes(redes);
  return (
    <footer data-tono="oscuro" className="bg-tinta pt-[clamp(80px,3rem+6vw,140px)] pb-[calc(80px+72px+env(safe-area-inset-bottom))] text-fondo lg:pb-[96px]">
      <div className="contenedor">
        <p className="m-0 text-[length:var(--text-pano)] leading-none tracking-[-0.03em] [text-wrap:balance]">
          {TEXTOS.lema.antes} <Destacada>{TEXTOS.lema.destacada}</Destacada> {TEXTOS.lema.despues}
        </p>
        <div className="mt-[clamp(56px,4vw,96px)] grid gap-x-10 gap-y-10 border-t border-borde-oscuro pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label="Pie">
            <p className="m-0 mb-3 text-[17px]">{negocio.nombre}</p>
            <ul className="m-0 list-none p-0">
              {[{ href: "/", texto: "Inicio" }, ...enlaces].map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="inline-flex min-h-11 items-center text-texto-claro no-underline hover:underline">
                    {e.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className={PEQUENO}>Contacto</p>
            <ul className="m-0 list-none p-0 text-texto-claro">
              <li>
                <BotonLlamada telefono={contacto.telefono} className="inline-flex min-h-11 items-center text-fondo underline">
                  {telefonoVisible(contacto.telefono)}
                </BotonLlamada>
              </li>
              <li>
                <a href={`mailto:${contacto.email}`} className="inline-flex min-h-11 items-center break-all text-fondo underline">
                  {contacto.email}
                </a>
              </li>
              <li className="py-2">{direccionLinea(contacto.direccion)}</li>
              <li>
                <a href={urlComoLlegar(contacto)} className="inline-flex min-h-11 items-center underline" rel="noopener" target="_blank">
                  Cómo llegar<span className="sr-only"> (se abre en Google Maps)</span>
                </a>
              </li>
            </ul>
          </div>
          {horario.length > 0 && (
            <div>
              <p className={PEQUENO}>Horario</p>
              <dl className="m-0">
                {horario.map((h) => (
                  <div key={h.dias} className="mb-3">
                    <dt>{h.dias}</dt>
                    <dd className="m-0 text-texto-claro">{h.horas}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          {sociales.length > 0 && (
            <div>
              <p className={PEQUENO}>Síguenos</p>
              <ul className="m-0 list-none p-0">
                {sociales.map((r) => (
                  <li key={r.href}>
                    <a href={r.href} rel="noopener" target="_blank" className="inline-flex min-h-11 items-center text-fondo underline">
                      {r.texto}
                      <span className="sr-only"> (se abre en otra pestaña)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-borde-oscuro pt-5 text-sm text-texto-claro lg:pr-[440px]">
          <span className="py-3">
            © {anio} {negocio.nombreLegal} · NIF {negocio.nif}
          </span>
          <ul className="m-0 flex list-none flex-wrap gap-x-5 p-0">
            {enlacesLegales.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="inline-flex min-h-11 items-center text-texto-claro underline">
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
