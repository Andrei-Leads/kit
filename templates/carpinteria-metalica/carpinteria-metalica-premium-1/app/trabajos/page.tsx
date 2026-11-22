import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { hayTrabajos, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { ParejaCta } from "@/components/ParejaCta";
import { Foto } from "@/components/base/Foto";
import { CtaFinal, lineasFoto } from "@/components/secciones/CtaFinal";
import { HeroInterior } from "@/components/secciones/HeroInterior";
import { TrabajoCollage } from "@/components/secciones/TrabajoCollage";
import { mensajeInicio, RESPUESTA, TEXTO_WA } from "@/lib/mensajes";
import { confianzaHorario, porAnio } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Trabajos" });

/**
 * /trabajos (encargo §7): «Obras *terminadas*», los trabajos como collages alternos con su
 * ficha, una franja con pareja cada 3 trabajos y CTA final. Sin filtro. Solo con
 * `galeria`: rejilla 4:5 de 2 columnas (1 en móvil). Sin trabajos ni galería, 404.
 */
export default function Page() {
  const c = config;
  if (!hayTrabajos(c)) notFound();
  const cta = { telefono: c.contacto.telefono, whatsapp: c.contacto.whatsapp, mensaje: mensajeInicio(c.contacto) };
  const lista = porAnio(c.trabajos);
  const fotosHero = lista.length > 0 ? [lista[0]?.imagenes[0], lista[1]?.imagenes[0]] : [c.galeria[0], c.galeria[1]];
  return (
    <>
      <HeroInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Trabajos" },
        ]}
        antetitulo="Trabajos"
        titulo={
          <>
            Obras <em>terminadas</em>
          </>
        }
        frase={lista.length > 0 ? "Cada obra con su lugar, su superficie y su plazo." : undefined}
        cta={cta}
        textoWhatsapp={TEXTO_WA}
        confianza={{ texto: RESPUESTA }}
        fotos={fotosHero}
      />
      <section data-tono="claro" aria-label="Obras" className="bg-fondo pt-[calc(var(--seccion)/2)] pb-(--seccion)">
        <div className="contenedor">
          {lista.length > 0 ? (
            <div className="flex flex-col gap-[72px] lg:gap-[120px]">
              {lista.map((t, i) => (
                <Fragment key={t.slug}>
                  <TrabajoCollage trabajo={t} invertido={i % 2 === 1} nivel="h2" />
                  {i % 3 === 2 && i < lista.length - 1 && (
                    <div data-tono="oscuro" className="flex flex-col gap-6 bg-tinta px-5 py-8 text-sobre-tinta lg:flex-row lg:items-center lg:justify-between lg:px-10">
                      <p className="fino m-0 text-[26px] leading-tight">
                        ¿Una obra <em>parecida</em> en tu casa?
                      </p>
                      <ParejaCta cta={cta} textoWhatsapp={TEXTO_WA} tono="oscuro" confianza={{ texto: RESPUESTA }} className="lg:w-auto" />
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          ) : (
            <ul className="m-0 grid list-none grid-cols-1 gap-x-6 gap-y-12 p-0 sm:grid-cols-2">
              {c.galeria.map((f) => (
                <li key={f.src}>
                  <Foto imagen={f} sizes="(min-width: 640px) 45vw, 100vw" />
                  {f.titulo && <h2 className="fino m-0 mt-3 text-2xl leading-tight">{f.titulo}</h2>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <CtaFinal
        cta={cta}
        lineas={lineasFoto(cta.whatsapp)}
        textoWhatsapp={TEXTO_WA}
        confianza={confianzaHorario(c.contacto.horario)}
      />
    </>
  );
}
