import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Pareja } from "@/components/Botones";
import { Foto } from "@/components/base/Foto";
import { Collage } from "@/components/Collage";
import { Credenciales } from "@/components/secciones/Credenciales";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { HeroInterior } from "@/components/secciones/HeroInterior";
import { ZonasYPreguntas } from "@/components/secciones/ZonasYPreguntas";
import { Antetitulo, Senal, Titular } from "@/components/Titular";
import { cifrasClave } from "@/lib/cifras";
import { mensajeInicio } from "@/lib/mensajes";
import { datosCta, lineaConfianza, lineaHorario } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "Empresa" });

/**
 * /empresa (encargo §7): cifras (estáticas, sin contador), historia en 62ch,
 * Credenciales con su pareja, equipo como lista tipográfica (nunca retrato de
 * IA; con foto real del cliente, 4:5) y CTA. Todo vacío: descripcionCorta (en
 * el hero), zonas y CTA.
 */
export default async function Page() {
  const { negocio, contacto, empresa } = config;
  const cta = datosCta(contacto, mensajeInicio(contacto));
  const cifras = await cifrasClave(config);
  const masFotos = empresa.imagenes.slice(2);
  const vacia = empresa.historia.length === 0 && empresa.equipo.length === 0 && empresa.imagenes.length === 0;
  return (
    <>
      <span data-pagina="empresa" hidden />
      <HeroInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/empresa", texto: "Empresa" },
        ]}
        titulo={
          negocio.anioFundacion ? (
            <>
              Instaladores desde <Senal>{negocio.anioFundacion}</Senal>.
            </>
          ) : (
            <>
              Quiénes <Senal>somos</Senal>.
            </>
          )
        }
        frase={negocio.descripcionCorta}
        cta={cta}
        confianza={lineaConfianza(config)}
        imagenes={empresa.imagenes.slice(0, 2)}
        numeroPagina="04"
      />

      {cifras.length > 0 && (
        <section aria-label="La empresa en cifras" className="pb-[clamp(72px,3.5rem+4vw,128px)]">
          <dl className="contenedor m-0 grid grid-cols-2 gap-x-8 gap-y-8 lg:grid-cols-4">
            {cifras.map((c) => (
              <div key={c.dt} className="flex flex-col-reverse gap-2 border-t border-[var(--color-linea)] pt-3">
                <dd className="cifra m-0 text-[clamp(3rem,2rem+4vw,6rem)]">{c.dd}</dd>
                <dt className="etiqueta text-acento">{c.dt}</dt>
              </div>
            ))}
          </dl>
        </section>
      )}

      {empresa.historia.length > 0 && (
        <section aria-labelledby="titulo-historia" className="pb-[clamp(72px,3.5rem+4vw,128px)]">
          <div className="contenedor grid gap-x-[clamp(32px,5vw,96px)] gap-y-8 lg:grid-cols-[5fr_7fr]">
            <div className="flex flex-col gap-6">
              <Antetitulo>Historia</Antetitulo>
              <Titular id="titulo-historia" lineas={[<>Nuestra <Senal>historia</Senal>.</>]} />
            </div>
            <div className="flex flex-col gap-10">
              <div className="flex max-w-[62ch] flex-col gap-4">
                {empresa.historia.map((p) => (
                  <p key={p} className="m-0">
                    {p}
                  </p>
                ))}
              </div>
              {masFotos.length > 0 && <Collage imagenes={masFotos} sizes="(min-width: 1024px) 400px, 78vw" className="max-w-[520px]" />}
            </div>
          </div>
        </section>
      )}

      <Credenciales
        acreditaciones={config.acreditaciones}
        garantias={config.garantias}
        marcas={config.marcas}
        pie={<Pareja cta={cta} tamano="cierre" />}
      />

      {empresa.equipo.length > 0 && (
        <section aria-labelledby="titulo-equipo" className="seccion">
          <div className="contenedor grid gap-x-[clamp(32px,5vw,96px)] gap-y-8 lg:grid-cols-[5fr_7fr]">
            <h2 id="titulo-equipo" className="etiqueta m-0 text-acento">
              Equipo
            </h2>
            <ul className="m-0 list-none border-t border-[var(--color-linea)] p-0">
              {empresa.equipo.map((m) => {
                // Nunca un retrato de IA: la foto solo sale si no está marcada como generada.
                const foto = m.foto && m.foto.origen !== "ia" ? m.foto : undefined;
                return (
                  <li key={m.nombre} className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-[var(--color-linea)] py-5">
                    <div className="flex items-center gap-5">
                      {foto && <Foto imagen={foto} sizes="96px" etiqueta="ninguna" className="w-24" />}
                      <p className="m-0 font-titulo text-[28px] leading-tight">{m.nombre}</p>
                    </div>
                    {m.cargo && <p className="etiqueta m-0 text-texto-suave">{m.cargo}</p>}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {vacia && <ZonasYPreguntas zonas={config.zonas} ciudad={contacto.direccion.ciudad} preguntas={[]} />}

      <CtaFinal cta={cta} confianza={lineaHorario(contacto)} />
    </>
  );
}
