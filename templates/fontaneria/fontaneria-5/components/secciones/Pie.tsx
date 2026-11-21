import Link from "next/link";
import { enlacesLegales, horarioVisible, listaRedes, type Ancla, type SiteConfig } from "@andrei-leads/core";

type Props = {
  negocio: Pick<SiteConfig["negocio"], "nombre" | "descripcionCorta">;
  contacto: Pick<SiteConfig["contacto"], "horario" | "urgencias24h">;
  redes: SiteConfig["redes"];
  items: Ancla[];
};

/** Pie: fondo tinta; nombre, rutas, horario (formatearHorario + urgencias), redes y legales de core. */
export function Pie({ negocio, contacto, redes, items }: Props) {
  const horario = horarioVisible(contacto);
  const redesLista = listaRedes(redes);
  return (
    <footer className="sobre-tinta border-t border-tinta-2 px-5 pt-9 pb-8 lg:px-8 lg:pt-12 lg:pb-10">
      <div className="mx-auto grid max-w-(--container-contenido) gap-4 lg:grid-cols-[4fr_3fr_5fr] lg:gap-12">
        <div>
          <p className="m-0 font-titulo text-2xl leading-[1.1] font-bold lg:text-[28px]">{negocio.nombre}</p>
          <p className="mt-2.5 mb-0 hidden max-w-[36ch] text-[15px] lg:block">{negocio.descripcionCorta}</p>
          {redesLista.length > 0 && (
            <ul className="m-0 mt-2 flex list-none flex-wrap gap-x-4 p-0">
              {redesLista.map((r) => (
                <li key={r.href}>
                  <a href={r.href} className="flex min-h-11 items-center text-sm text-sobre-tinta underline underline-offset-4">
                    {r.texto}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <nav aria-label="Pie" className="grid grid-cols-2 gap-x-3 lg:flex lg:flex-col">
          {items.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className="flex min-h-11 items-center font-titulo text-base leading-none font-semibold text-sobre-tinta no-underline hover:underline"
            >
              {e.texto}
            </Link>
          ))}
        </nav>
        <div>
          <div aria-hidden="true" className="rayado text-texto-suave lg:hidden" />
          <dl className="m-0 mt-3.5 grid gap-1.5 text-[15px] lg:mt-0 lg:gap-2 lg:text-base">
            {horario.map((h) => (
              <div key={h.dias} className="flex justify-between gap-3 lg:border-b lg:border-texto-suave lg:pb-2">
                <dt>{h.dias}</dt>
                <dd className="m-0 font-semibold tabular-nums">{h.horas}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <ul className="mx-auto mt-[18px] flex max-w-(--container-contenido) list-none flex-wrap gap-x-4 p-0 text-sm lg:mt-8 lg:gap-x-6">
        {enlacesLegales.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="flex min-h-11 items-center text-sobre-tinta underline underline-offset-2">
              {l.texto}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
