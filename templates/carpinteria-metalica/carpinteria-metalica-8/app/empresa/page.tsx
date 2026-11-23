import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { CabeceraPagina } from "@/components/secciones/CabeceraPagina";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { ElTaller } from "@/components/secciones/ElTaller";
import { Garantias } from "@/components/secciones/Garantias";
import { Zonas } from "@/components/secciones/ZonasPreguntas";
import { anioActual } from "@/lib/anio";
import { mensajeInicio } from "@/lib/mensajes";
import { pieConjunto } from "@/lib/textos";
import { cn } from "@/lib/utils";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "El taller" });

const PROPORCIONES = ["3/2", "4/5", "3/2"] as const;

/**
 * /empresa («El taller», encargo §7): sellos, historia completa, equipo, marcas y acreditaciones;
 * la línea de tiempo solo con `anioFundacion` y el año actual (sin hitos inventados); la galería
 * del taller en collage orgánico; garantías, zonas y CTA. Con todo vacío: descripción, zonas y CTA.
 */
export default async function Page() {
  const { negocio, contacto, empresa } = config;
  const mensaje = mensajeInicio(contacto);
  const anio = await anioActual();
  const desde = negocio.anioFundacion;
  const anios = desde ? anio - desde : 0;
  const pieGaleria = pieConjunto(empresa.imagenes);

  return (
    <>
      <CabeceraPagina
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/empresa", texto: "El taller" },
        ]}
        titulo="El taller"
        entradilla={negocio.descripcionCorta}
      />
      <ElTaller config={config} anioActual={anio} mensaje={mensaje} modo="empresa" />

      {(anios > 0 || empresa.imagenes.length > 0) && (
        <div className="contenedor flex flex-col gap-[clamp(48px,7vw,88px)] pt-[clamp(64px,9vw,120px)]">
          {desde && anios > 0 && (
            <section aria-labelledby="titulo-anios" className="flex flex-col gap-[22px]">
              <h2 id="titulo-anios" className="h2">
                {anios} {anios === 1 ? "año" : "años"} en el mismo oficio
              </h2>
              <div className="relative flex items-start justify-between gap-4 pt-3">
                <svg aria-hidden="true" viewBox="0 0 1000 60" preserveAspectRatio="none" className="absolute inset-x-7 top-5 h-12 w-[calc(100%-56px)]">
                  <path d="M0 30 C 160 -10, 340 70, 500 30 S 840 -10, 1000 30" fill="none" stroke="var(--color-acento)" strokeWidth="2" strokeDasharray="6 8" vectorEffect="non-scaling-stroke" />
                </svg>
                <p className="relative flex flex-col items-start gap-2.5">
                  <span aria-hidden="true" className="h-[52px] w-14 rounded-guijarro-1 bg-primario" />
                  <strong className="font-titulo text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] leading-none font-medium">{desde}</strong>
                  <span className="text-base text-texto-suave">Se abre el taller</span>
                </p>
                <p className="relative flex flex-col items-end gap-2.5 text-right">
                  <span aria-hidden="true" className="h-[52px] w-14 rounded-guijarro-2 bg-acento" />
                  <strong className="font-titulo text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] leading-none font-medium">{anio}</strong>
                  <span className="text-base text-texto-suave">Hoy</span>
                </p>
              </div>
            </section>
          )}
          {empresa.imagenes.length > 0 && (
            <section aria-label="Fotos del taller">
              <ul className="grid items-end gap-5 lg:grid-cols-[1.2fr_0.8fr_1.2fr]">
                {empresa.imagenes.map((f, i) => (
                  <li key={f.src} data-aparecer>
                    <Foto
                      imagen={f}
                      sinEtiqueta
                      proporcion={PROPORCIONES[i % 3]}
                      sizes="(min-width: 1024px) 440px, calc(100vw - 40px)"
                      className={cn(i % 3 === 1 && "rounded-guijarro-2")}
                    />
                  </li>
                ))}
              </ul>
              {pieGaleria && <p className="pie-foto mt-3">{pieGaleria}</p>}
            </section>
          )}
        </div>
      )}

      <Garantias garantias={config.garantias} contacto={contacto} mensaje={mensaje} />
      <Zonas zonas={config.zonas} />
      <CtaFinal contacto={contacto} mensaje={mensaje} />
    </>
  );
}
