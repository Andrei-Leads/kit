import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";
import { CabeceraInterior } from "@/components/secciones/CabeceraInterior";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { EmpresaConfianza, hayEmpresaConfianza } from "@/components/secciones/EmpresaConfianza";
import { EmpresaEquipo } from "@/components/secciones/EmpresaEquipo";
import { Zonas } from "@/components/secciones/Zonas";
import config from "@/site.config";
import { anioActual } from "@/lib/anio";
import { aniosEnElBarrio } from "@/lib/formato";
import { textos } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: textos.quienesSomos });

/**
 * /empresa (mockups 2f y 3e), corta: h1 «Quiénes somos» con la primera línea de `historia` como entrada
 * (20 px) y el resto de párrafos debajo; fotos de `empresa.imagenes`; «El equipo»; banda piedra-2 con
 * años, acreditaciones, garantías y marcas; CTA. Cada bloque sale solo con datos. Con todo vacío: la
 * `descripcionCorta` como entrada, «Dónde trabajamos» (zonas) y el CTA.
 */
export default async function Page() {
  const { negocio, empresa, acreditaciones, garantias, marcas, zonas, contacto } = config;
  const anio = await anioActual();
  const anios = aniosEnElBarrio(negocio.anioFundacion, anio);
  const confianza = { anios, acreditaciones, garantias, marcas };
  const hayConfianza = hayEmpresaConfianza(confianza);
  const [entrada, ...resto] = empresa.historia;
  const hayCuerpo = resto.length > 0 || empresa.imagenes.length > 0 || empresa.equipo.length > 0;
  const vacia = entrada === undefined && !hayCuerpo && !hayConfianza;

  return (
    <>
      <CabeceraInterior
        titulo={textos.quienesSomos}
        migas={[{ href: "/", texto: textos.inicio }, { texto: "Empresa" }]}
        intro={vacia ? negocio.descripcionCorta : entrada}
      />

      {vacia && zonas.length > 0 && (
        <div className="contenedor pb-16 lg:pb-[104px]">
          <div className="max-w-[640px]">
            <Zonas zonas={zonas} />
          </div>
        </div>
      )}

      {hayCuerpo && (
        <div className="contenedor flex flex-col gap-14 pb-16 lg:pb-24">
          {resto.length > 0 && (
            <div className="flex max-w-[66ch] flex-col gap-4">
              {resto.map((p, i) => (
                <p key={i} className="m-0 text-lg leading-[1.6] text-tinta-suave text-pretty">
                  {p}
                </p>
              ))}
            </div>
          )}

          {empresa.imagenes.length > 0 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
              {empresa.imagenes.map((imagen, i) => (
                <Foto
                  key={`${imagen.src}-${i}`}
                  imagen={imagen}
                  sizes="(min-width: 1200px) 582px, (min-width: 768px) 46vw, 100vw"
                />
              ))}
            </div>
          )}

          <EmpresaEquipo equipo={empresa.equipo} />
        </div>
      )}

      {hayConfianza && <EmpresaConfianza {...confianza} />}

      <CtaFinal contacto={contacto} desde={hayConfianza ? "piedra-2" : "piedra"} />
    </>
  );
}
