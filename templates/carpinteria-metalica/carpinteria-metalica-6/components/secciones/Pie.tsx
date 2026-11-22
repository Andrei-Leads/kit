import Link from "next/link";
import { enlacesLegales, formatearHorario, listaRedes, type Ancla, type SiteConfig } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";

type Props = {
  negocio: SiteConfig["negocio"];
  contacto: SiteConfig["contacto"];
  redes: SiteConfig["redes"];
  enlaces: readonly Ancla[];
};

const ENLACE = "inline-flex min-h-11 items-center text-[15px] no-underline hover:underline underline-offset-4";
const ROTULO = "mb-2 text-[13px] font-bold tracking-[0.08em] text-texto-suave uppercase";

/**
 * Pie blanco (encargo §6 y Pie.dc.html): nombre, dirección y correo; páginas; horario con
 * `formatearHorario`; abajo el © con el nombre legal y el NIF, y los enlaces legales de core.
 * En móvil reserva la altura de la barra fija.
 */
export async function Pie({ negocio, contacto, redes, enlaces }: Props) {
  const anio = await anioActual();
  const horario = formatearHorario(contacto.horario);
  const redesLista = listaRedes(redes);
  const { direccion } = contacto;
  return (
    <footer className="border-t border-borde bg-superficie pb-[calc(72px+env(safe-area-inset-bottom))] lg:pb-0">
      <div className="contenedor pt-[clamp(40px,5vw,56px)]">
        <div className="grid gap-9 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="mb-2.5 max-w-[24ch] text-lg leading-[1.2] font-extrabold text-balance">{negocio.nombre}</p>
            <p className="mb-2 text-[15px] leading-[1.55] text-texto-suave">
              {direccion.calle} · {direccion.cp} {direccion.ciudad} ({direccion.provincia})
            </p>
            <a href={`mailto:${contacto.email}`} className="inline-flex min-h-11 items-center text-[15px] underline underline-offset-4 [overflow-wrap:anywhere]">
              {contacto.email}
            </a>
            {redesLista.length > 0 && (
              <ul className="mt-1 flex flex-wrap gap-x-5">
                {redesLista.map((r) => (
                  <li key={r.href}>
                    <a href={r.href} className="inline-flex min-h-11 items-center text-[15px] font-bold underline underline-offset-4">
                      {r.texto}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <nav aria-label="Pie">
            <p className={ROTULO}>Páginas</p>
            <ul>
              {enlaces.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className={ENLACE}>
                    {e.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className={ROTULO}>Horario</p>
            <dl className="text-[15px] leading-[1.5]">
              {horario.map((h) => (
                <div key={h.dias} className="mb-2">
                  <dt className="font-bold">{h.dias}</dt>
                  <dd className="text-texto-suave">{h.horas}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-borde py-5 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-[13px] leading-normal text-texto-suave">
            © {anio} {negocio.nombreLegal} · NIF {negocio.nif}
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-5">
              {enlacesLegales.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="inline-flex min-h-11 items-center text-[13px] text-texto-suave underline underline-offset-4">
                    {e.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
