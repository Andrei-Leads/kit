import Link from "next/link";
import { direccionLinea, enlacesLegales, formatearHorario, listaRedes, type Ancla, type SiteConfig } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";

type Props = {
  negocio: SiteConfig["negocio"];
  contacto: SiteConfig["contacto"];
  redes: SiteConfig["redes"];
  enlaces: readonly Ancla[];
};

/**
 * Pie (encargo §6): oscuro, abre con el lema «Que entre la *luz*.» a --text-pano (un
 * `<p>`: el lema del vídeo del pano está aquí como texto), nombre y descripción, rutas,
 * dirección, horario y email, legales y redes. 96 px de margen inferior en escritorio
 * para que la pareja flotante no tape los enlaces legales.
 */
export async function Pie({ negocio, contacto, redes, enlaces }: Props) {
  const anio = await anioActual();
  const horario = formatearHorario(contacto.horario);
  const listaR = listaRedes(redes);
  return (
    <footer data-tono="oscuro" className="bg-tinta text-sobre-tinta">
      <div className="contenedor border-t border-borde-tinta pt-[clamp(4rem,3rem+5vw,8rem)] pb-12 lg:pb-24">
        <p className="fino m-0 text-pano leading-[0.95] tracking-[-0.03em]">
          Que entre la <em>luz</em>.
        </p>
        <div className="mt-[clamp(3rem,2rem+3vw,5rem)] grid gap-10 border-t border-borde-tinta pt-8 text-sm lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <p className="fino m-0 text-lg text-sobre-tinta">{negocio.nombre}</p>
            <p className="m-0 mt-3 max-w-[34ch] leading-relaxed text-sobre-tinta-suave">{negocio.descripcionCorta}</p>
          </div>
          <nav aria-label="Pie" className="lg:col-span-2">
            <ul className="m-0 list-none p-0">
              {enlaces.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="inline-flex min-h-9 items-center no-underline hover:underline">
                    {e.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <address className="leading-relaxed text-sobre-tinta-suave not-italic lg:col-span-4">
            <p className="m-0">{direccionLinea(contacto.direccion, { provincia: true })}</p>
            {horario.length > 0 && (
              <ul className="m-0 mt-3 list-none p-0">
                {horario.map((l) => (
                  <li key={l.dias}>
                    {l.dias} · {l.horas}
                  </li>
                ))}
              </ul>
            )}
            <p className="m-0 mt-3">
              <a href={`mailto:${contacto.email}`} className="inline-flex min-h-9 items-center text-sobre-tinta underline decoration-1">
                {contacto.email}
              </a>
            </p>
          </address>
          <div className="lg:col-span-2">
            <ul className="m-0 list-none p-0 text-sobre-tinta-suave">
              {enlacesLegales.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="inline-flex min-h-9 items-center no-underline hover:underline">
                    {e.texto}
                  </Link>
                </li>
              ))}
              {listaR.map((r) => (
                <li key={r.href}>
                  <a href={r.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center underline decoration-1">
                    {r.texto}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="m-0 mt-12 text-xs text-sobre-tinta-suave">
          © {anio} {negocio.nombreLegal}
        </p>
      </div>
    </footer>
  );
}
