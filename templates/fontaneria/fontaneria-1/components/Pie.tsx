import Link from "next/link";
import { direccionLinea, enlacesLegales, horarioVisible, listaRedes, type Ancla, type SiteConfig } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";

type Props = {
  negocio: SiteConfig["negocio"];
  contacto: SiteConfig["contacto"];
  redes: SiteConfig["redes"];
  rutas: readonly Ancla[];
};

/** Pie: nombre, descripción y dirección; rutas; horario abreviado; © y legales (enlacesLegales de core) y redes. */
export async function Pie({ negocio, contacto, redes, rutas }: Props) {
  const anio = await anioActual();
  return (
    <footer className="border-t border-borde bg-superficie">
      <div className="contenedor flex flex-wrap gap-x-12 gap-y-8 pt-12 pb-8">
        <div className="min-w-0 flex-[2_1_280px]">
          <p className="condensada flex items-center gap-2.5 text-2xl leading-[1.05] uppercase">
            <span aria-hidden="true" className="size-2.5 flex-none bg-primario" />
            {negocio.nombre}
          </p>
          <p className="mt-2.5 max-w-[46ch] text-[0.9375rem] text-texto-suave">{negocio.descripcionCorta}</p>
          <p className="mt-2.5 text-[0.9375rem] text-texto-suave">{direccionLinea(contacto.direccion)}</p>
        </div>
        <nav aria-label="Pie" className="flex-[1_1_160px]">
          <ul>
            {rutas.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="inline-flex min-h-11 items-center hover:text-primario-luz">
                  {r.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="min-w-0 flex-[1_1_240px] text-[0.9375rem]">
          {horarioVisible(contacto).map((h) =>
            contacto.urgencias24h && h.dias === "Urgencias" ? (
              <p key={h.dias} className="font-bold text-primario-luz">
                {h.dias} {h.horas}
              </p>
            ) : (
              <p key={h.dias} className="mb-1.5">
                <span className="text-texto-suave">{h.dias}</span>
                <br />
                {h.horas}
              </p>
            ),
          )}
        </div>
      </div>
      <div className="contenedor flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-borde pt-4 pb-6 text-[0.8125rem] text-texto-suave">
        <span>
          © {anio} {negocio.nombreLegal}
        </span>
        {enlacesLegales.map((e) => (
          <Link key={e.href} href={e.href} className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-texto">
            {e.texto}
          </Link>
        ))}
        {listaRedes(redes).map((r) => (
          <a key={r.href} href={r.href} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-texto">
            {r.texto}
          </a>
        ))}
      </div>
    </footer>
  );
}
