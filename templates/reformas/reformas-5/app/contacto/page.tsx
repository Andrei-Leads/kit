import type { Metadata } from "next";
import { BotonLlamada, direccionLinea, horarioVisible, listaY, metadatosPagina, telefonoVisible, urlComoLlegar } from "@andrei-leads/core";

import config from "@/site.config";
import { Pareja } from "@/components/Botones";
import { Foto } from "@/components/base/Foto";
import { ArcoTesela } from "@/components/secciones/ArcoTesela";
import { CabeceraPagina } from "@/components/secciones/CabeceraPagina";
import { datosCta } from "@/lib/cta";
import { mensajeInicio } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

const RotuloDato = ({ children }: { children: React.ReactNode }) => <h2 className="m-0 mb-1.5 text-[15px] font-semibold text-texto-suave">{children}</h2>;

/** /contacto: pareja arriba del todo; tarjeta con teléfono, email, horario, dirección y zonas; arco con `empresa.imagenes[0]` o tintado. */
export default function Page() {
  const { contacto, zonas, empresa } = config;
  const foto = empresa.imagenes[0];
  return (
    <>
      <span data-pagina="contacto" hidden />
      <CabeceraPagina
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/contacto", texto: "Contacto" },
        ]}
        titulo="Contacto"
        entrada="Cuéntanos qué quieres cambiar y quedamos para verlo."
      >
        <Pareja cta={datosCta(contacto, mensajeInicio(contacto))} alinear="inicio" className="mt-6" />
      </CabeceraPagina>
      <section aria-label="Datos de contacto" className="contenedor grid items-start gap-x-16 gap-y-8 pt-[clamp(3rem,2.5rem+4vw,5rem)] pb-[clamp(4.5rem,3rem+6vw,8rem)] lg:grid-cols-2">
        <div className="flex flex-col gap-6 rounded-tarjeta bg-superficie p-[clamp(24px,4vw,40px)]">
          <div>
            <RotuloDato>{contacto.whatsapp ? "Teléfono y WhatsApp" : "Teléfono"}</RotuloDato>
            <p className="m-0 text-[22px] font-medium">
              <BotonLlamada telefono={contacto.telefono} className="no-underline">
                {telefonoVisible(contacto.telefono)}
              </BotonLlamada>
            </p>
          </div>
          <div>
            <RotuloDato>Email</RotuloDato>
            <p className="m-0 break-all">
              <a href={`mailto:${contacto.email}`} className="underline">{contacto.email}</a>
            </p>
          </div>
          <div>
            <RotuloDato>Horario</RotuloDato>
            {horarioVisible(contacto).map((h) => (
              <p key={h.dias} className="m-0 flex flex-wrap justify-between gap-x-4">
                <span>{h.dias}</span>
                <span className="text-texto-suave">{h.horas}</span>
              </p>
            ))}
          </div>
          <div>
            <RotuloDato>Dirección</RotuloDato>
            <p className="m-0 mb-1.5">{direccionLinea(contacto.direccion)}</p>
            <a href={urlComoLlegar(contacto)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-semibold underline">
              Cómo llegar <span aria-hidden="true">&nbsp;→</span>
            </a>
          </div>
          {zonas.length > 0 && (
            <div>
              <RotuloDato>Zonas</RotuloDato>
              <p className="m-0">{listaY(zonas)}.</p>
            </div>
          )}
          {contacto.fichaGoogle && (
            <p className="m-0">
              <a href={contacto.fichaGoogle} className="inline-flex min-h-11 items-center font-semibold underline">
                Ver nuestra ficha en Google <span aria-hidden="true">&nbsp;→</span>
              </a>
            </p>
          )}
        </div>
        <div className="w-full lg:max-w-[460px] lg:justify-self-end">
          {foto ? <Foto imagen={foto} sizes="(min-width: 1024px) 460px, 100vw" arco /> : <ArcoTesela />}
        </div>
      </section>
    </>
  );
}
