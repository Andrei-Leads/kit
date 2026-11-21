import type { Metadata } from "next";
import { direccionLinea, formatearHorario, listaY, metadatosPagina, urlComoLlegar } from "@andrei-leads/core";

import config from "@/site.config";
import { Migas } from "@/components/base/Migas";
import { TelefonoGigante } from "@/components/Botones";
import { mensajeBase } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

const ENLACE = "foco inline-flex min-h-11 items-center gap-1 font-bold text-texto underline underline-offset-4";

/** /contacto (encargo §7): el telefono-gigante primero; después email, horario, dirección con «Cómo llegar» y zonas. */
export default function Page() {
  const { contacto, zonas } = config;
  const lineas = formatearHorario(contacto.horario);
  return (
    <section className="flex-1 bg-fondo [background-image:var(--haz)]">
      <div className="contenedor flex flex-col gap-8 pt-2 pb-12 lg:pb-16">
        <Migas migas={[{ href: "/", texto: "Inicio" }, { href: "/contacto", texto: "Contacto" }]} />
        <h1 className="titulo-h1 m-0">Llámanos</h1>
        <TelefonoGigante contacto={contacto} mensaje={mensajeBase(contacto)} />

        <div className="grid gap-8 border-t border-borde/40 pt-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <h2 className="rotulo m-0 text-texto">Email</h2>
            <p className="m-0">
              <a href={`mailto:${contacto.email}`} className={`${ENLACE} break-all`}>
                {contacto.email}
              </a>
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="rotulo m-0 text-texto">{contacto.urgencias24h ? "Horario de oficina" : "Horario"}</h2>
            <dl className="m-0 divide-y divide-borde/40">
              {lineas.map((l) => (
                <div key={l.dias} className="flex flex-wrap justify-between gap-x-4 py-2">
                  <dt className="text-texto-suave">{l.dias}</dt>
                  <dd className="m-0 font-bold tabular-nums">{l.horas}</dd>
                </div>
              ))}
            </dl>
            {contacto.urgencias24h && (
              <p className="m-0 flex items-center gap-2 text-[0.9375rem] font-bold text-acento">
                <span aria-hidden="true" className="size-2 rounded-full bg-acento" />
                Urgencias, las 24 horas por teléfono.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="rotulo m-0 text-texto">Dirección</h2>
            <p className="m-0">{direccionLinea(contacto.direccion)}</p>
            <p className="m-0">
              <a href={urlComoLlegar(contacto)} rel="noopener noreferrer" target="_blank" className={ENLACE}>
                Cómo llegar <span aria-hidden="true">›</span>
              </a>
            </p>
          </div>
          {(zonas.length > 0 || contacto.fichaGoogle) && (
            <div className="flex flex-col gap-2">
              {zonas.length > 0 && (
                <>
                  <h2 className="rotulo m-0 text-texto">Llegamos a</h2>
                  <p className="m-0">{listaY(zonas)}</p>
                </>
              )}
              {contacto.fichaGoogle && (
                <p className="m-0">
                  <a href={contacto.fichaGoogle} rel="noopener noreferrer" target="_blank" className={ENLACE}>
                    Nuestra ficha en Google <span aria-hidden="true">›</span>
                  </a>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
