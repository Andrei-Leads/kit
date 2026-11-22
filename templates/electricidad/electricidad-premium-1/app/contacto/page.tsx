import type { Metadata } from "next";
import { horarioVisible, mediaVisible, metadatosPagina, telefonoVisible, urlComoLlegar } from "@andrei-leads/core";

import config from "@/site.config";
import { AsistenteInstalacion } from "@/components/secciones/AsistenteInstalacion";
import { HeroInterior } from "@/components/secciones/HeroInterior";
import { EnlaceFlecha, Senal } from "@/components/Titular";
import { NumeroTrama, TramaDin } from "@/components/TramaDin";
import { mensajeInicio } from "@/lib/mensajes";
import { datosCta, lineaHorario } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

/**
 * /contacto (encargo §7): arriba del todo, en el hero, las dos píldoras de
 * 56 px antes que cualquier dato; debajo, teléfono (texto) y email; después
 * horario, dirección con «Cómo llegar», zonas y ficha de Google; el asistente
 * al final. `urgencias24h`, si llega, solo se pinta aquí como una fila más.
 */
export default function Page() {
  const { contacto, zonas, valoracion } = config;
  const mensaje = mensajeInicio(contacto);
  const cta = datosCta(contacto, mensaje);
  const horario = horarioVisible(contacto);
  const { calle, cp, ciudad } = contacto.direccion;
  return (
    <>
      <span data-pagina="contacto" hidden />
      <HeroInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/contacto", texto: "Contacto" },
        ]}
        titulo={
          <>
            Hablemos de tu <Senal>obra</Senal>.
          </>
        }
        frase={
          contacto.whatsapp
            ? "Escríbenos por WhatsApp con el plano o unas fotos, o llámanos en horario de oficina."
            : "Llámanos en horario de oficina y te contamos cómo lo haríamos."
        }
        cta={cta}
        confianza={lineaHorario(contacto)}
        numeroPagina="05"
        aparte={
          <TramaDin className="ms-auto hidden max-w-[440px] lg:flex">
            <NumeroTrama numero="05" />
          </TramaDin>
        }
      />

      <section aria-label="Datos de contacto" className="pb-[clamp(72px,3.5rem+4vw,128px)]">
        <div className="contenedor flex flex-col gap-14">
          <div className="flex flex-col gap-4 border-t border-[var(--color-linea)] pt-6">
            <h2 className="etiqueta m-0 text-acento">Teléfono y email</h2>
            <p className="m-0 font-texto text-[clamp(2.75rem,1.8rem+4vw,5rem)] leading-none font-extralight tracking-[-0.02em] tabular-nums">
              {telefonoVisible(contacto.telefono)}
            </p>
            <a href={`mailto:${contacto.email}`} className="inline-flex min-h-11 items-center self-start text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] break-all underline">
              {contacto.email}
            </a>
          </div>

          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {horario.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-[var(--color-linea)] pt-4">
                <h2 className="etiqueta m-0 text-acento">Horario</h2>
                <dl className="m-0 flex flex-col gap-3">
                  {horario.map((f) => (
                    <div key={f.dias}>
                      <dt>{f.dias}</dt>
                      <dd className="m-0 text-texto-suave tabular-nums">{f.horas}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            <div className="flex flex-col gap-3 border-t border-[var(--color-linea)] pt-4">
              <h2 className="etiqueta m-0 text-acento">Dirección</h2>
              <address className="not-italic">
                {calle}
                <br />
                {cp} {ciudad}
              </address>
              <EnlaceFlecha href={urlComoLlegar(contacto)} externo>
                Cómo llegar
              </EnlaceFlecha>
            </div>
            {zonas.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-[var(--color-linea)] pt-4">
                <h2 className="etiqueta m-0 text-acento">Zonas</h2>
                <p className="m-0 text-texto-suave">{zonas.join(" · ")}</p>
              </div>
            )}
            {(valoracion || contacto.fichaGoogle) && (
              <div className="flex flex-col gap-3 border-t border-[var(--color-linea)] pt-4">
                <h2 className="etiqueta m-0 text-acento">Google</h2>
                {valoracion && (
                  <p className="m-0 flex items-baseline gap-2">
                    <span className="font-texto text-[40px] leading-none font-extralight tabular-nums">{mediaVisible(valoracion.media)}</span>
                    <span className="text-texto-suave">{valoracion.total} reseñas</span>
                  </p>
                )}
                {contacto.fichaGoogle && (
                  <EnlaceFlecha href={contacto.fichaGoogle} externo>
                    Ver la ficha
                  </EnlaceFlecha>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <AsistenteInstalacion servicios={config.servicios.map((s) => s.titulo)} whatsapp={contacto.whatsapp} mensajeBase={mensaje} />
    </>
  );
}
