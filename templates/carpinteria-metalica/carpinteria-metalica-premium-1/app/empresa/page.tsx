import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { etiquetaOrigen, listaY, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { ParejaCta } from "@/components/ParejaCta";
import { Foto } from "@/components/base/Foto";
import { Cifras } from "@/components/secciones/Cifras";
import { Compromisos } from "@/components/secciones/Compromisos";
import { CtaFinal, lineasFoto } from "@/components/secciones/CtaFinal";
import { HeroInterior } from "@/components/secciones/HeroInterior";
import { mensajeInicio, RESPUESTA, TEXTO_WA } from "@/lib/mensajes";
import { confianzaHorario } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "Empresa" });

/**
 * /empresa (encargo §7): «El *taller*» con dos fotos y pareja, historia en 480 px con
 * pareja al final, banda 4:1 (3:1 en móvil), cifras, equipo (nombre y cargo; la foto solo
 * si no es de IA), compromisos y CTA final. Todo vacío: descripción, zonas y CTA.
 */
export default function Page() {
  const c = config;
  const { historia, imagenes, equipo } = c.empresa;
  const cta = { telefono: c.contacto.telefono, whatsapp: c.contacto.whatsapp, mensaje: mensajeInicio(c.contacto) };
  const banda = imagenes[2];
  const hayCifras = Boolean(c.negocio.anioFundacion || c.valoracion || c.zonas.length > 1);
  const conFoto = equipo.filter((p) => p.foto && p.foto.origen !== "ia");
  const vacio = historia.length === 0 && imagenes.length === 0 && equipo.length === 0;
  return (
    <>
      <HeroInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/empresa", texto: "Empresa" },
        ]}
        antetitulo="Empresa"
        titulo={
          <>
            El <em>taller</em>
          </>
        }
        frase={vacio ? undefined : c.negocio.descripcionCorta}
        cta={cta}
        textoWhatsapp={TEXTO_WA}
        confianza={{ texto: RESPUESTA }}
        fotos={[imagenes[0], imagenes[1]]}
      />

      {historia.length > 0 && (
        <section data-tono="claro" aria-labelledby="titulo-historia" className="seccion bg-superficie">
          <div className="contenedor rejilla gap-y-6">
            <h2 id="titulo-historia" className="etiqueta m-0 lg:col-[1/4]">
              Historia
            </h2>
            <div className="max-w-[480px] lg:col-[5/10]">
              {historia.map((p, i) => (
                <p key={p} data-aparecer style={{ "--i": i } as CSSProperties} className="m-0 mb-5 text-cuerpo leading-[1.7] text-pretty">
                  {p}
                </p>
              ))}
              <ParejaCta cta={cta} textoWhatsapp={TEXTO_WA} confianza={{ texto: RESPUESTA }} className="mt-5" />
            </div>
          </div>
        </section>
      )}

      {banda && (
        <div className="contenedor">
          <div className="aspect-[3/1] lg:aspect-[4/1]">
            <Foto imagen={banda} sizes="(min-width: 1376px) 1280px, 100vw" proporcion="relleno" etiqueta="no" />
          </div>
          {etiquetaOrigen(banda) && <p className="m-0 mt-2 text-right text-xs text-texto-suave">{etiquetaOrigen(banda)}</p>}
        </div>
      )}

      {(hayCifras || equipo.length > 0) && (
        <section data-tono="claro" aria-labelledby={equipo.length > 0 ? "titulo-equipo" : undefined} aria-label={equipo.length > 0 ? undefined : "Cifras"} className="seccion bg-fondo">
          <div className="contenedor">
            <Cifras negocio={c.negocio} valoracion={c.valoracion} zonas={c.zonas} tono="claro" />
            {equipo.length > 0 && (
              <div className={hayCifras ? "mt-16" : undefined}>
                <h2 id="titulo-equipo" className="etiqueta m-0">
                  Equipo
                </h2>
                <ul className="m-0 mt-6 grid list-none gap-x-6 p-0 lg:grid-cols-3">
                  {equipo.map((p) => (
                    <li key={p.nombre} className="border-t border-borde pt-5 pb-7">
                      <p className="fino m-0 text-[28px] leading-tight">{p.nombre}</p>
                      {p.cargo && <p className="m-0 mt-1.5 text-[15px] text-texto-suave">{p.cargo}</p>}
                    </li>
                  ))}
                </ul>
                {conFoto.length > 0 && (
                  <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {conFoto.map((p) => (
                      <Foto key={p.nombre} imagen={p.foto!} sizes="(min-width: 1024px) 20vw, 45vw" />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {vacio && (
        <section data-tono="claro" aria-label="Quiénes somos" className="seccion bg-superficie">
          <div className="mx-auto max-w-[880px] px-[var(--pad)]">
            <p className="fino m-0 text-[28px] leading-[1.3] text-pretty">{c.negocio.descripcionCorta}</p>
            {c.zonas.length > 0 && <p className="m-0 mt-6 text-cuerpo text-texto-suave">Trabajamos en {listaY(c.zonas)}.</p>}
          </div>
        </section>
      )}

      <Compromisos garantias={c.garantias} acreditaciones={c.acreditaciones} marcas={c.marcas} />
      <CtaFinal
        cta={cta}
        lineas={lineasFoto(cta.whatsapp)}
        textoWhatsapp={TEXTO_WA}
        confianza={confianzaHorario(c.contacto.horario)}
      />
    </>
  );
}
