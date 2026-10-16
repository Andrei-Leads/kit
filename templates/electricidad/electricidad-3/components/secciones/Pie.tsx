import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, enlacesLegales, type SiteConfig } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";
import { listaRedes, telefonoVisible, type Ancla } from "@/lib/formato";
import { mensajeGeneral } from "@/lib/mensajes";

type Props = {
  negocio: SiteConfig["negocio"];
  contacto: SiteConfig["contacto"];
  redes: SiteConfig["redes"];
  items: Ancla[];
};

/** Todo enlace del pie: ≥ 44 px de alto (zona táctil). */
const enlace = "flex min-h-11 items-center text-texto no-underline hover:underline hover:underline-offset-4";
const enlaceSubrayado = "flex min-h-11 items-center text-texto underline underline-offset-4";

/**
 * Pie sobre superficie: nombre y descripción corta, navegación, contacto (teléfono en 700, WhatsApp, email,
 * redes) y, debajo, «© año nombreLegal · NIF» con `enlacesLegales` de core (obligatorios). Reserva 104 px
 * abajo hasta 1023 px para que la barra móvil (fija) no tape el final.
 */
export async function Pie({ negocio, contacto, redes, items }: Props) {
  const anio = await anioActual();
  const listaDeRedes = listaRedes(redes);

  return (
    <footer className="bg-superficie">
      <div className="contenedor grid grid-cols-1 gap-x-12 gap-y-6 pt-8 md:grid-cols-[2fr_1fr_1fr]">
        <div className="flex min-w-0 max-w-[44ch] flex-col gap-2">
          <strong className="text-lg leading-[1.25] font-bold">{negocio.nombre}</strong>
          <p className="m-0 text-[15px] leading-normal text-texto-suave">{negocio.descripcionCorta}</p>
        </div>

        <nav aria-label="Pie" className="flex flex-col">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className={`${enlace} font-semibold`}>
              {item.texto}
            </Link>
          ))}
        </nav>

        <div className="flex min-w-0 flex-col">
          <BotonLlamada
            telefono={contacto.telefono}
            className="flex min-h-11 items-center text-xl font-bold text-texto no-underline tabular-nums hover:underline hover:underline-offset-4"
          >
            {telefonoVisible(contacto.telefono)}
          </BotonLlamada>
          {contacto.whatsapp && (
            <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensajeGeneral(contacto)} className={enlaceSubrayado}>
              WhatsApp
            </BotonWhatsApp>
          )}
          <a href={`mailto:${contacto.email}`} className={`${enlaceSubrayado} [overflow-wrap:anywhere]`}>
            {contacto.email}
          </a>
          {listaDeRedes.map((red) => (
            <a key={red.href} href={red.href} target="_blank" rel="noopener noreferrer" className={enlaceSubrayado}>
              {red.texto}
            </a>
          ))}
        </div>
      </div>

      <div className="contenedor pt-4 pb-[104px] lg:pb-8">
        <div className="flex flex-wrap items-center gap-x-[18px] gap-y-0 border-t border-linea pt-2 text-sm text-texto-suave">
          <nav aria-label="Legal" className="flex flex-wrap gap-x-[18px]">
            {enlacesLegales.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex min-h-11 items-center text-texto-suave underline underline-offset-[3px] hover:text-texto"
              >
                {l.texto}
              </Link>
            ))}
          </nav>
          <p className="m-0 flex min-h-11 items-center">
            © {anio} {negocio.nombreLegal} · NIF {negocio.nif}
          </p>
        </div>
      </div>
    </footer>
  );
}
