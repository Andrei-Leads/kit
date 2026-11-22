import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { ParejaCta } from "@/components/Botones";
import { EnlaceFlecha } from "@/components/EnlaceFlecha";
import { Destacada } from "@/components/Titulo";
import { Veta } from "@/components/Veta";
import { Foto } from "@/components/base/Foto";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { HeroInterior } from "@/components/secciones/HeroInterior";
import { Opiniones } from "@/components/secciones/Opiniones";
import { mensajeDeServicio, mensajeInicio, TEXTO_WA_SERVICIO } from "@/lib/mensajes";
import { datosCta, dosCifras, lineaConfianza } from "@/lib/textos";
import { cn } from "@/lib/utils";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/**
 * /servicios (encargo §7): hero interior «Lo que hacemos» y, como módulo
 * escenográfico, los servicios en bloques que se apilan (papel / alterna, 80vh),
 * cada uno con su pareja de CTAs y el mensaje de ese servicio. En móvil, lista.
 */
export default function Page() {
  const { contacto, servicios } = config;
  const cta = datosCta(contacto, mensajeInicio(contacto));
  return (
    <>
      <span data-pagina="servicios" hidden />
      <HeroInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
        ]}
        etiqueta="Servicios"
        titulo={
          <>
            Lo que <Destacada>hacemos</Destacada>
          </>
        }
        frase="Cada pieza se dibuja para su hueco y se fabrica en nuestro taller."
        cta={cta}
        confianza={lineaConfianza(config, "valoracion")}
        fotos={[servicios[0]?.imagenes[0], servicios[1]?.imagenes[0]]}
      />
      <section aria-label="Servicios" className="mt-(--espacio-seccion)">
        <ol className="apilado apilado-medio m-0 list-none p-0">
          {servicios.map((s, i) => (
            <li
              key={s.slug}
              data-tono="claro"
              style={{ "--i": i } as CSSProperties}
              className={cn("border-t border-borde", i % 2 ? "bg-alterna" : "bg-fondo")}
            >
              <div className="contenedor flex flex-wrap items-center justify-between gap-x-[clamp(32px,6vw,96px)] gap-y-8 py-[clamp(40px,6vw,72px)]">
                <div className="max-w-[520px] min-w-0 flex-[1_1_380px]">
                  <p className="etiqueta m-0 text-texto-suave">{dosCifras(i + 1)}</p>
                  <h2 className="titulo mt-3 text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] leading-[1.05]">{s.titulo}</h2>
                  <p className="medida mt-4 text-cuerpo text-texto-suave">{s.descripcion}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                    {s.precioDesde && <span className="etiqueta border border-borde px-2.5 py-1.5">{s.precioDesde}</span>}
                    <EnlaceFlecha href={`/servicios/${s.slug}`}>
                      Descubrir<span className="sr-only"> {s.titulo}</span>
                    </EnlaceFlecha>
                  </div>
                  <ParejaCta
                    cta={datosCta(contacto, mensajeDeServicio(s))}
                    tono="claro"
                    textoWhatsapp={TEXTO_WA_SERVICIO}
                    className="mt-8"
                  />
                </div>
                <div className="w-full flex-none lg:w-[min(100%,52vh)]">
                  {s.imagenes[0] ? (
                    <Foto imagen={s.imagenes[0]} sizes="(min-width: 1024px) 52vh, 100vw" proporcion="4/5" claseImagen="asentar" />
                  ) : (
                    <div aria-hidden="true" className="relative flex aspect-[4/5] items-end overflow-hidden bg-tinta p-5">
                      <Veta />
                      <span className="titulo relative text-[clamp(96px,10vw,160px)] leading-[0.8] text-fondo/18">{dosCifras(i + 1)}</span>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <Opiniones
        resenas={config.resenas}
        valoracion={config.valoracion}
        fichaGoogle={contacto.fichaGoogle}
        trabajos={config.trabajos}
        cta={cta}
        conPareja={false}
      />
      <CtaFinal cta={cta} contacto={contacto} confianza={lineaConfianza(config, "horario")} conDireccion={false} />
    </>
  );
}
