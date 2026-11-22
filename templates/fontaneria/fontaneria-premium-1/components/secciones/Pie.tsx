import Link from "next/link";
import { enlacesLegales, formatearHorario, listaRedes, telefonoVisible, type Ancla, type SiteConfig } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";

import { Nombre } from "./Nombre";

type Props = {
  negocio: SiteConfig["negocio"];
  contacto: SiteConfig["contacto"];
  redes: SiteConfig["redes"];
  enlaces: Ancla[];
};

/**
 * Pie de «Caudal» (encargo §6.11): el lema otra vez en grande y, debajo,
 * nombre, páginas, contacto, horario con `formatearHorario`, `enlacesLegales`
 * y redes. El teléfono va como texto: llamar es siempre un botón (barra,
 * cabecera y pareja flotante).
 */
export async function Pie({ negocio, contacto, redes, enlaces }: Props) {
  const anio = await anioActual();
  const horario = formatearHorario(contacto.horario);
  const { calle, cp, ciudad } = contacto.direccion;
  return (
    <footer data-tono="oscuro" className="sobre-tinta bg-tinta pb-16 text-white lg:pb-12">
      <div className="contenedor">
        <p aria-hidden="true" className="titulo m-0 border-t border-white/16 pt-14 text-[min(var(--text-pano),7.4vw)] leading-none max-lg:text-[64px]">
          El agua, <em>bien llevada</em>.
        </p>
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 text-[15px] lg:mt-16 lg:grid-cols-[1.5fr_1fr_1.2fr_1fr] lg:gap-x-10">
          <div className="flex flex-col gap-3 max-lg:hidden">
            <Nombre nombre={negocio.nombre} logo={negocio.logo} className="text-white [--cab-suave:var(--color-sobre-tinta-suave)]" />
            <p className="m-0 max-w-[34ch] text-sobre-tinta-suave">{negocio.descripcionCorta}</p>
          </div>
          <nav aria-label="Páginas" className="flex flex-col gap-1">
            <p className="etiqueta !text-sobre-tinta-suave">Páginas</p>
            <ul className="m-0 flex list-none flex-col p-0">
              {enlaces.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="inline-flex min-h-11 items-center no-underline hover:underline lg:min-h-[31px]">
                    {e.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex min-w-0 flex-col gap-3">
            <p className="etiqueta !text-sobre-tinta-suave">Contacto</p>
            <p className="m-0">{telefonoVisible(contacto.telefono)}</p>
            <a href={`mailto:${contacto.email}`} className="inline-flex min-h-11 items-center no-underline [overflow-wrap:anywhere] hover:underline lg:min-h-0">
              {contacto.email}
            </a>
            <p className="m-0 leading-normal text-sobre-tinta-suave">
              {calle}
              <br />
              {cp} {ciudad}
            </p>
          </div>
          {horario.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="etiqueta !text-sobre-tinta-suave">Horario</p>
              {horario.map((l) => (
                <p key={l.dias} className="m-0 leading-normal text-sobre-tinta-suave">
                  {l.dias}
                  <br />
                  {l.horas}
                </p>
              ))}
            </div>
          )}
        </div>
        <div className="mt-12 flex flex-col gap-3.5 border-t border-white/16 pt-6 text-[13px] text-sobre-tinta-suave lg:flex-row-reverse lg:items-center lg:justify-between">
          <ul className="m-0 flex list-none flex-wrap gap-x-[18px] gap-y-1 p-0">
            {[...enlacesLegales, ...listaRedes(redes)].map((e) => (
              <li key={e.href}>
                {e.href.startsWith("/") ? (
                  <Link href={e.href} className="inline-flex min-h-11 items-center underline lg:min-h-8">
                    {e.texto}
                  </Link>
                ) : (
                  <a href={e.href} className="inline-flex min-h-11 items-center underline lg:min-h-8">
                    {e.texto}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <p className="m-0">
            © {anio} {negocio.nombreLegal}
          </p>
        </div>
      </div>
    </footer>
  );
}
