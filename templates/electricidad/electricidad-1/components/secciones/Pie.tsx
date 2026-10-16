import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, enlacesLegales, type SiteConfig } from "@andrei-leads/core";

import { Campo } from "@/components/Campo";
import { anioActual } from "@/lib/anio";
import { etiquetaCampo } from "@/lib/estilos";
import { campoAcreditacion, listaRedes, telefonoVisible, type Ancla } from "@/lib/formato";
import { mensajeGeneral } from "@/lib/mensajes";

type Props = {
  negocio: SiteConfig["negocio"];
  contacto: SiteConfig["contacto"];
  acreditaciones: SiteConfig["acreditaciones"];
  redes: SiteConfig["redes"];
  items: Ancla[];
};

/** Todo enlace del pie: ≥ 44 px de alto (zona táctil). */
const enlace = "flex min-h-11 items-center text-tinta no-underline hover:underline hover:underline-offset-4";

/**
 * Pie sobre papel-2 con regla superior de 2 px: nombre y acreditaciones (campos), PÁGINAS, CONTACTO
 * (teléfono en mono, WhatsApp, email, redes) y, debajo, «© año nombreLegal · NIF» con
 * `enlacesLegales` de core (obligatorios).
 */
export async function Pie({ negocio, contacto, acreditaciones, redes, items }: Props) {
  const anio = await anioActual();
  const listaDeRedes = listaRedes(redes);

  return (
    <footer className="border-t-2 border-tinta bg-papel-2">
      <div className="contenedor grid grid-cols-1 gap-x-12 gap-y-8 pt-10 pb-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex min-w-0 flex-col gap-4">
          <strong className="text-lg leading-[1.3] font-bold">{negocio.nombre}</strong>
          {acreditaciones.map((a) => {
            const campo = campoAcreditacion(a);
            return (
              <Campo key={`${a.nombre}-${a.numero ?? ""}`} etiqueta={campo.etiqueta} detalle={campo.detalle} fondo="papel">
                <span className="text-[15px]">{campo.valor}</span>
              </Campo>
            );
          })}
        </div>

        <nav aria-label="Pie" className="flex flex-col">
          <p className={`${etiquetaCampo} m-0 mb-1`}>Páginas</p>
          {items.map((item) => (
            <Link key={item.href} href={item.href} className={`${enlace} font-medium`}>
              {item.texto}
            </Link>
          ))}
        </nav>

        <div className="flex min-w-0 flex-col">
          <p className={`${etiquetaCampo} m-0 mb-1`}>Contacto</p>
          <BotonLlamada telefono={contacto.telefono} className={`${enlace} font-mono text-xl font-bold`}>
            {telefonoVisible(contacto.telefono)}
          </BotonLlamada>
          {contacto.whatsapp && (
            <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensajeGeneral(contacto)} className={enlace}>
              WhatsApp
            </BotonWhatsApp>
          )}
          <a href={`mailto:${contacto.email}`} className={`${enlace} [overflow-wrap:anywhere]`}>
            {contacto.email}
          </a>
          {listaDeRedes.map((red) => (
            <a key={red.href} href={red.href} target="_blank" rel="noopener noreferrer" className={enlace}>
              {red.texto}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-regla">
        <div className="contenedor flex flex-wrap justify-between gap-x-6 gap-y-1 pt-2 pb-4 text-[13px] text-tinta-suave md:pb-6">
          <p className="m-0 flex min-h-11 items-center">
            © {anio} {negocio.nombreLegal} · NIF {negocio.nif}
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-4">
            {enlacesLegales.map((l) => (
              <Link key={l.href} href={l.href} className="flex min-h-11 items-center text-tinta-suave underline underline-offset-4 hover:text-tinta">
                {l.texto}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
