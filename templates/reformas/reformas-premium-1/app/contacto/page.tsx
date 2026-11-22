import type { Metadata } from "next";
import { BotonLlamada, direccionLinea, formatearHorario, listaY, metadatosPagina, telefonoVisible, urlComoLlegar } from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { Destacada, Pareja } from "@/components/Botones";
import { HeroInterior } from "@/components/secciones/HeroInterior";
import { mensajeInicio } from "@/lib/mensajes";
import { datosCta, TEXTOS } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

const COLUMNA = "border-t border-borde pt-6";
const ENLACE_EXTERNO = "enlace";

/**
 * /contacto (encargo §7): hero «Hablemos de *tu casa*» sin collage; arriba del todo, la
 * pareja de 56 px y el teléfono a tamaño de titular como `BotonLlamada`. Después, horario
 * (`formatearHorario`) en filetes, estudio con «Cómo llegar →» (enlace a Google Maps, sin
 * mapa incrustado), zonas y ficha de Google; banda 4:1 con `empresa.imagenes[1]` si existe.
 */
export default function Page() {
  const { contacto, zonas, empresa } = config;
  const datos = datosCta(contacto, mensajeInicio(contacto));
  const horario = formatearHorario(contacto.horario);
  const banda = empresa.imagenes[1];
  return (
    <>
      <HeroInterior
        pagina="contacto"
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/contacto", texto: "Contacto" },
        ]}
        etiqueta="Contacto"
        titulo={
          <>
            Hablemos de <Destacada>tu casa</Destacada>
          </>
        }
        frase="Mándanos fotos y medidas por WhatsApp o llámanos, y quedamos para ir a verla."
        franja={false}
      >
        <Pareja datos={datos} fondo="claro" textoWa={TEXTOS.whatsappContacto} className="max-w-[620px]" />
        <BotonLlamada
          telefono={contacto.telefono}
          className="mt-8 inline-block text-[clamp(2.25rem,1rem+5vw,5rem)] leading-none tracking-[-0.02em] no-underline hover:underline"
        >
          {telefonoVisible(contacto.telefono)}
        </BotonLlamada>
      </HeroInterior>

      <section data-tono="claro" aria-label="Horario, dirección y zonas" className="bg-fondo pb-[clamp(80px,3rem+6vw,160px)]">
        <div className="contenedor grid gap-x-12 gap-y-12 md:grid-cols-3">
          {horario.length > 0 && (
            <div className={COLUMNA}>
              <h2 className="etiqueta text-texto-suave">Horario</h2>
              <dl className="m-0 mt-4">
                {horario.map((h) => (
                  <div key={h.dias} className="border-b border-borde py-3">
                    <dt>{h.dias}</dt>
                    <dd className="m-0 text-texto-suave">{h.horas}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          <div className={COLUMNA}>
            <h2 className="etiqueta text-texto-suave">Estudio</h2>
            <p className="m-0 mt-4">{direccionLinea(contacto.direccion)}</p>
            <a href={`mailto:${contacto.email}`} className="mt-2 inline-flex min-h-11 items-center break-all underline">
              {contacto.email}
            </a>
            <div>
              <a href={urlComoLlegar(contacto)} target="_blank" rel="noopener" className={ENLACE_EXTERNO}>
                <span>
                  Cómo llegar<span className="sr-only"> (se abre Google Maps)</span>
                </span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          {(zonas.length > 0 || contacto.fichaGoogle) && (
            <div className={COLUMNA}>
              <h2 className="etiqueta text-texto-suave">Zonas</h2>
              {zonas.length > 0 && <p className="m-0 mt-4">{listaY(zonas)}.</p>}
              {contacto.fichaGoogle && (
                <a href={contacto.fichaGoogle} target="_blank" rel="noopener" className={`${ENLACE_EXTERNO} mt-2`}>
                  <span>
                    Nuestra ficha de Google<span className="sr-only"> (se abre en otra pestaña)</span>
                  </span>
                  <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          )}
        </div>
        {banda && (
          <div className="contenedor mt-[clamp(56px,5vw,96px)]">
            <Foto imagen={banda} sizes="(min-width: 1280px) 1120px, 100vw" proporcion="4/1" paralaje />
          </div>
        )}
      </section>
    </>
  );
}
