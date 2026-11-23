import type { Metadata } from "next";
import { BotonLlamada, formatearHorario, metadatosPagina, telefonoVisible, urlComoLlegar } from "@andrei-leads/core";

import { CabeceraPagina } from "@/components/CabeceraPagina";
import { Marco } from "@/components/Marco";
import { Pareja } from "@/components/Pareja";
import { ListaZonas } from "@/components/secciones/Zonas";
import { notaHorario } from "@/lib/formato";
import { mensajeTaller } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

const CASILLA = "flex flex-col gap-2.5 border-b border-borde p-6";

/**
 * /contacto (encargo §7): la pareja arriba del todo y el teléfono a tamaño display; debajo, una ficha
 * con recuadro de tinta: horario (formatearHorario), dirección del taller con «Cómo llegar» (enlace,
 * nunca mapa), email y la ficha de Google. Cierra con «Dónde montamos».
 */
export default function Page() {
  const { contacto, zonas } = config;
  const { direccion } = contacto;
  const horario = formatearHorario(contacto.horario);

  return (
    <Marco config={config} pagina="contacto" rotulo="Contacto">
      <CabeceraPagina
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/contacto", texto: "Contacto" },
        ]}
        titulo="Contacto con el taller"
        tamano="ficha"
      >
        <div className="max-w-[720px]">
          <Pareja contacto={contacto} mensaje={mensajeTaller(contacto)} nota={notaHorario(contacto)} />
        </div>
        <div className="mt-3 flex flex-col gap-0.5">
          <span className="etiqueta text-texto-suave">Teléfono del taller</span>
          <BotonLlamada
            telefono={contacto.telefono}
            className="titulo inline-flex min-h-14 items-center self-start text-display leading-[1.1] text-texto no-underline hover:text-primario"
          >
            {telefonoVisible(contacto.telefono)}
          </BotonLlamada>
        </div>
      </CabeceraPagina>

      <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] border border-tinta">
        {horario.length > 0 && (
          <div className={CASILLA}>
            <h2 className="etiqueta font-normal text-texto-suave">Horario</h2>
            <table className="border-collapse font-titulo text-[13.5px]">
              <tbody>
                {horario.map((h) => (
                  <tr key={h.dias}>
                    <th scope="row" className="py-1 pr-4 text-left align-top font-normal">
                      {h.dias}
                    </th>
                    <td className="py-1">{h.horas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className={CASILLA}>
          <h2 className="etiqueta font-normal text-texto-suave">Taller</h2>
          <address className="flex flex-col gap-1 not-italic">
            <span>{direccion.calle}</span>
            <span>
              {direccion.cp} {direccion.ciudad} ({direccion.provincia})
            </span>
          </address>
          <a href={urlComoLlegar(contacto)} target="_blank" rel="noopener" className="enlace-mono min-h-11 self-start">
            Cómo llegar →
          </a>
        </div>
        <div className={CASILLA}>
          <h2 className="etiqueta font-normal text-texto-suave">Email</h2>
          <a href={`mailto:${contacto.email}`} className="min-h-11 content-center wrap-anywhere">
            {contacto.email}
          </a>
          {contacto.fichaGoogle && (
            <a href={contacto.fichaGoogle} target="_blank" rel="noopener" className="enlace-mono min-h-11 self-start">
              Ficha de Google →
            </a>
          )}
        </div>
      </div>

      {zonas.length > 0 && (
        <section aria-labelledby="h2-zonas" className="pt-12">
          <h2 id="h2-zonas" className="titulo mb-4 text-2xl tracking-normal">
            Dónde montamos
          </h2>
          <ListaZonas zonas={zonas} />
        </section>
      )}
    </Marco>
  );
}
