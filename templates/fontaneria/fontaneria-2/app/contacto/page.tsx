import type { Metadata } from "next";
import { BotonLlamada, direccionLinea, metadatosPagina, telefonoVisible, urlComoLlegar } from "@andrei-leads/core";

import config from "@/site.config";
import { ListaZonas } from "@/components/secciones/Zonas";
import { Pareja } from "@/components/secciones/Pareja";
import { h1Pagina, pildoraEnlace, tarjeta } from "@/lib/estilos";
import { horarioVisible, lineaHorario } from "@/lib/formato";
import { mensajeBase } from "@/lib/mensajes";
import { cn } from "@/lib/utils";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

/**
 * /contacto (encargo §7): tarjeta grande con el teléfono en tamaño titular, la pareja de botones y el
 * email; tarjeta de horario (`formatearHorario` + «Urgencias · 24 h» si `urgencias24h`); tarjeta de
 * dirección con «Cómo llegar» (enlace, nunca mapa incrustado) y la ficha de Google; zonas en píldoras.
 */
export default function Page() {
  const { contacto, zonas } = config;
  return (
    <section className="contenedor flex flex-col gap-6 pt-[clamp(20px,3vw,40px)] pb-[clamp(48px,6vw,88px)]">
      <h1 className={h1Pagina}>Contacto</h1>
      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div className={cn(tarjeta, "flex flex-col gap-5 p-[clamp(24px,3.5vw,44px)] lg:row-span-2")}>
          <p className="m-0 flex flex-col gap-1">
            <span className="font-medium text-texto-suave">Teléfono</span>
            <BotonLlamada
              telefono={contacto.telefono}
              className="foco self-start text-pagina leading-[1.1] font-extrabold tracking-[-0.03em] text-texto tabular-nums no-underline"
            >
              {telefonoVisible(contacto.telefono)}
            </BotonLlamada>
          </p>
          <Pareja contacto={contacto} mensaje={mensajeBase(contacto)} linea={lineaHorario(contacto)} />
          <p className="m-0 flex flex-col gap-0.5 border-t border-borde pt-4">
            <span className="font-medium text-texto-suave">Email</span>
            <a href={`mailto:${contacto.email}`} className="foco flex min-h-11 items-center font-bold break-all underline underline-offset-4">
              {contacto.email}
            </a>
          </p>
        </div>
        <div className="flex flex-col gap-2.5 rounded-tarjeta border border-borde bg-fondo p-6">
          <h2 className="m-0 text-xl font-extrabold">Horario</h2>
          <dl className="m-0 flex flex-col">
            {horarioVisible(contacto).map((h) => (
              <div key={h.dias} className="flex justify-between gap-3 border-b border-borde py-2.5 last:border-b-0">
                <dt>{h.dias}</dt>
                <dd className="m-0 text-right font-bold tabular-nums">{h.horas}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex flex-col gap-2.5 rounded-tarjeta border border-borde bg-fondo p-6">
          <h2 className="m-0 text-xl font-extrabold">Dirección</h2>
          <address className="not-italic">{direccionLinea(contacto.direccion, { provincia: true })}</address>
          <div className="flex flex-wrap gap-2">
            <a href={urlComoLlegar(contacto)} target="_blank" rel="noopener noreferrer" className={cn(pildoraEnlace, "bg-superficie font-bold")}>
              Cómo llegar
            </a>
            {contacto.fichaGoogle && (
              <a href={contacto.fichaGoogle} target="_blank" rel="noopener noreferrer" className={pildoraEnlace}>
                Ficha de Google
              </a>
            )}
          </div>
        </div>
      </div>
      {zonas.length > 0 && (
        <div className="flex flex-col gap-3.5 pt-4">
          <h2 className="m-0 text-xl font-extrabold">Dónde trabajamos</h2>
          <ListaZonas zonas={zonas} />
        </div>
      )}
    </section>
  );
}
