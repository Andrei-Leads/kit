import type { Metadata } from "next";
import { BotonLlamada, BotonWhatsApp, direccionLinea, formatearHorario, metadatosPagina, telefonoVisible, urlComoLlegar } from "@andrei-leads/core";

import { Marco } from "@/components/Marco";
import { Pareja } from "@/components/Pareja";
import { Rotulo } from "@/components/Rotulo";
import { CabeceraPagina } from "@/components/secciones/CabeceraPagina";
import { ZonasPreguntas } from "@/components/secciones/ZonasPreguntas";
import { mensajeDiario } from "@/lib/mensajes";
import { numerar, numeroDe } from "@/lib/navegacion";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

/**
 * /contacto (encargo §7): la pareja arriba del todo y un parte con Teléfono, WhatsApp, Email, Dirección
 * + «Cómo llegar» (enlace a Google Maps, nunca iframe), el horario (formatearHorario) y las zonas.
 */
export default function Page() {
  const { contacto, zonas } = config;
  const ciudad = contacto.direccion.ciudad;
  const mensaje = mensajeDiario(contacto);
  const secciones = numerar([
    { id: "datos", texto: "Contacto" },
    { id: "horario", texto: "Horario" },
    zonas.length > 0 && { id: "zonas", texto: "Zonas" },
  ]);
  const n = (id: string) => numeroDe(secciones, id);
  const fila = "flex flex-wrap gap-x-6 gap-y-1 border-b border-borde py-[18px]";
  const clave = "mono flex-[0_0_140px] pt-[3px] text-xs tracking-[0.06em] text-texto-suave uppercase";
  const valor = "m-0 grid flex-[1_1_240px] gap-1 text-lg leading-normal text-texto";
  const enlace = "inline-flex min-h-11 items-center justify-self-start lg:min-h-8 underline underline-offset-4 [overflow-wrap:anywhere]";

  return (
    <Marco config={config} pagina="contacto" secciones={secciones}>
      <CabeceraPagina
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/contacto", texto: "Contacto" },
        ]}
        cinta={`Contacto · ${ciudad}`}
        titulo="Contacto"
        entradilla={
          contacto.whatsapp
            ? "Escríbenos por WhatsApp o llama. Vamos a ver la obra y te damos el presupuesto por escrito."
            : "Llámanos. Vamos a ver la obra y te damos el presupuesto por escrito."
        }
      >
        <Pareja contacto={contacto} mensaje={mensaje} className="mt-1" />
      </CabeceraPagina>

      <section id="datos" aria-labelledby="h2-datos" className="px-(--pad) py-[clamp(56px,3rem+3vw,104px)]">
        <div className="max-w-[880px]">
          <Rotulo n={n("datos")}>Parte de contacto</Rotulo>
          <h2 id="h2-datos" className="h2-diario mb-6">
            Datos de la empresa
          </h2>
          <dl className="border-t border-cota">
            <div className={fila}>
              <dt className={clave}>Teléfono</dt>
              <dd className={valor}>
                <BotonLlamada telefono={contacto.telefono} className={enlace}>
                  {telefonoVisible(contacto.telefono)}
                </BotonLlamada>
              </dd>
            </div>
            {contacto.whatsapp && (
              <div className={fila}>
                <dt className={clave}>WhatsApp</dt>
                <dd className={valor}>
                  <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensaje} className={enlace}>
                    {telefonoVisible(contacto.whatsapp)}
                  </BotonWhatsApp>
                </dd>
              </div>
            )}
            <div className={fila}>
              <dt className={clave}>Email</dt>
              <dd className={valor}>
                <a href={`mailto:${contacto.email}`} className={enlace}>
                  {contacto.email}
                </a>
              </dd>
            </div>
            <div className={fila}>
              <dt className={clave}>Dirección</dt>
              <dd className={valor}>
                <span>{direccionLinea(contacto.direccion, { provincia: true })}</span>
                <a href={urlComoLlegar(contacto)} target="_blank" rel="noopener" className="mono inline-flex min-h-11 items-center justify-self-start text-[13px] underline lg:min-h-8 underline-offset-4">
                  Cómo llegar →
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section id="horario" aria-labelledby="h2-horario" className="px-(--pad) pb-[clamp(56px,3rem+3vw,104px)]">
        <div className="max-w-[880px]">
          <Rotulo n={n("horario")}>Horario</Rotulo>
          <h2 id="h2-horario" className="sr-only">
            Horario
          </h2>
          <ul className="border-t border-cota">
            {formatearHorario(contacto.horario).map((h) => (
              <li key={h.dias} className="mono flex flex-wrap gap-x-6 gap-y-1 border-b border-borde py-4 text-sm">
                <span className="flex-[0_0_200px] text-texto-suave">{h.dias}</span>
                <span className="text-texto">{h.horas}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {zonas.length > 0 && <ZonasPreguntas n={n("zonas")} zonas={zonas} />}
    </Marco>
  );
}
