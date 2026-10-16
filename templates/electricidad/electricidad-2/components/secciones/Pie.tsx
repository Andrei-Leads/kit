import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, enlacesLegales, type SiteConfig } from "@andrei-leads/core";

import { Corte } from "@/components/Corte";
import { anioActual } from "@/lib/anio";
import { enlaceLista } from "@/lib/estilos";
import { horarioVisible, listaRedes, telefonoVisible, direccionLinea, type Ancla } from "@/lib/formato";
import { mensajeGeneral } from "@/lib/mensajes";
import { textos } from "@/lib/textos";

type Props = {
  negocio: SiteConfig["negocio"];
  contacto: SiteConfig["contacto"];
  redes: SiteConfig["redes"];
  items: Ancla[];
};

/** Título de columna: texto blanco en negrita (no es un encabezado de la página). */
const tituloColumna = "mb-1 font-bold text-white";

/**
 * Pie sobre tinta con corte diagonal arriba (el corte desaparece si la página termina en el CTA final,
 * también tinta: ver `.corte-pie` en globals.css). Columnas: nombre + descripción, CONTACTO (teléfono y
 * WhatsApp por core, email, dirección), HORARIO (`formatearHorario`; «Urgencias: 24 h» solo si
 * `urgencias24h`), PÁGINAS (rutas + Instagram y Facebook si existen). Debajo, `enlacesLegales` de core
 * (obligatorios) y «© año nombreLegal · NIF». Todo enlace mide ≥ 44 px. Sin hueco extra para la barra:
 * la barra móvil es sticky y va después del pie en el flujo.
 */
export async function Pie({ negocio, contacto, redes, items }: Props) {
  const anio = await anioActual();
  const listaDeRedes = listaRedes(redes);
  const horario = horarioVisible(contacto);

  return (
    <footer className="sobre-tinta">
      <Corte de="piedra" a="tinta" className="corte-pie" />
      <div className="contenedor">
        <div className="pie-contenido grid grid-cols-1 gap-8 text-base text-linea sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex min-w-0 flex-col gap-2.5">
            <strong className="font-serif text-[23px] leading-[1.2] font-semibold text-white">{negocio.nombre}</strong>
            <p className="m-0 max-w-[36ch]">{negocio.descripcionCorta}</p>
          </div>

          <div className="flex min-w-0 flex-col">
            <p className={`${tituloColumna} m-0`}>{textos.contacto}</p>
            <BotonLlamada telefono={contacto.telefono} className={`${enlaceLista} text-lg font-bold text-white`}>
              {telefonoVisible(contacto.telefono)}
            </BotonLlamada>
            {contacto.whatsapp && (
              <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensajeGeneral(contacto)} className={enlaceLista}>
                {textos.whatsapp}
              </BotonWhatsApp>
            )}
            <a href={`mailto:${contacto.email}`} className={`${enlaceLista} [overflow-wrap:anywhere]`}>
              {contacto.email}
            </a>
            <p className="m-0 py-1">{direccionLinea(contacto.direccion)}</p>
          </div>

          <div className="flex min-w-0 flex-col gap-1">
            <p className={`${tituloColumna} m-0`}>{textos.horario}</p>
            {horario.map((h) => (
              <span key={h.dias}>
                {h.dias}: {h.horas}
              </span>
            ))}
          </div>

          <nav aria-label="Pie" className="flex min-w-0 flex-col">
            <p className={`${tituloColumna} m-0`}>{textos.paginas}</p>
            {items.map((item) => (
              <Link key={item.href} href={item.href} className={enlaceLista}>
                {item.texto}
              </Link>
            ))}
            {listaDeRedes.map((red) => (
              <a key={red.href} href={red.href} target="_blank" rel="noopener noreferrer" className={enlaceLista}>
                {red.texto} ↗
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-6 flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-white/16 pt-3 pb-4 text-base text-linea lg:pb-6">
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5">
            {enlacesLegales.map((l) => (
              <Link key={l.href} href={l.href} className="flex min-h-11 items-center underline underline-offset-4 hover:text-white">
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
