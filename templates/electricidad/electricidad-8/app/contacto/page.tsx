import type { Metadata } from "next";
import {
  BotonLlamada,
  direccionLinea,
  formatearHorario,
  listaY,
  metadatosPagina,
  telefonoVisible,
  urlComoLlegar,
} from "@andrei-leads/core";

import { ParCta, WhatsappLinea } from "@/components/Botones";
import { CabeceraPagina } from "@/components/CabeceraPagina";
import { Flecha } from "@/components/Iconos";
import { Marco } from "@/components/Marco";
import { mensajeEdificio } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

const ENLACE =
  "inline-flex min-h-11 items-center gap-1.5 font-semibold text-acento underline decoration-1 underline-offset-[5px] hover:decoration-2 focus-visible:outline-2 focus-visible:outline-foco";

/**
 * /contacto (encargo §7): la pareja de botones arriba del todo; después dos columnas (una en móvil)
 * separadas por filetes: teléfono, WhatsApp y email a la izquierda; horario, dirección con «Cómo
 * llegar» (enlace, nunca un mapa incrustado), zonas y ficha de Google a la derecha.
 */
export default function Page() {
  const { contacto, zonas } = config;
  const mensaje = mensajeEdificio(contacto);
  const bloque = "border-b border-linea-plano py-5";
  const rotulo = "versalitas text-texto-suave";
  const { calle, cp, ciudad } = contacto.direccion;

  return (
    <Marco actual="contacto">
      <CabeceraPagina
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/contacto", texto: "Contacto" },
        ]}
        titulo="Contacto"
      >
        <ParCta contacto={contacto} mensaje={mensaje} className="mt-7" />
      </CabeceraPagina>

      <div className="contenedor grid gap-x-16 pb-16 md:grid-cols-2 lg:pb-24">
        <div className="border-t border-texto">
          <div className={bloque}>
            <h2 className={rotulo}>Teléfono</h2>
            <BotonLlamada
              telefono={contacto.telefono}
              className="cifras-antiguas mt-1 inline-flex min-h-11 items-center font-titulo text-[2rem] hover:underline focus-visible:outline-2 focus-visible:outline-foco"
            >
              {telefonoVisible(contacto.telefono)}
            </BotonLlamada>
            {contacto.urgencias24h && <p className="text-[0.9375rem] text-texto-suave">Urgencias las 24 horas</p>}
          </div>
          {contacto.whatsapp && (
            <div className={bloque}>
              <h2 className={rotulo}>WhatsApp</h2>
              <WhatsappLinea numero={contacto.whatsapp} mensaje={mensaje} className="mt-1" />
            </div>
          )}
          <div className={bloque}>
            <h2 className={rotulo}>Email</h2>
            <a href={`mailto:${contacto.email}`} className={`${ENLACE} mt-1 break-all`}>
              {contacto.email}
            </a>
          </div>
        </div>

        <div className="border-t border-texto max-md:mt-10">
          <div className={bloque}>
            <h2 className={rotulo}>Horario de oficina</h2>
            <dl className="mt-2">
              {formatearHorario(contacto.horario).map((l) => (
                <div key={l.dias} className="flex flex-wrap justify-between gap-x-4 py-1 text-[0.9375rem] sm:text-base">
                  <dt>{l.dias}</dt>
                  <dd className="whitespace-nowrap text-texto-suave">{l.horas}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={bloque}>
            <h2 className={rotulo}>Oficina</h2>
            <p className="mt-2">
              {calle}
              <br />
              {cp} {ciudad}
            </p>
            <a href={urlComoLlegar(contacto)} rel="noopener" className={`${ENLACE} mt-1`}>
              Cómo llegar <Flecha />
              <span className="sr-only"> a {direccionLinea(contacto.direccion)} (Google Maps)</span>
            </a>
          </div>
          {zonas.length > 0 && (
            <div className={bloque}>
              <h2 className={rotulo}>Dónde trabajamos</h2>
              <p className="mt-2">{listaY(zonas)}</p>
            </div>
          )}
          {contacto.fichaGoogle && (
            <div className="py-4">
              <a href={contacto.fichaGoogle} rel="noopener" className={ENLACE}>
                Nuestra ficha en Google <Flecha />
              </a>
            </div>
          )}
        </div>
      </div>
    </Marco>
  );
}
