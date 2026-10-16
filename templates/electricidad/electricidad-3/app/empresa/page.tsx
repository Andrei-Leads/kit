import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import { CabeceraInterior } from "@/components/CabeceraInterior";
import { Foto } from "@/components/Foto";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { EmpresaDatos } from "@/components/secciones/EmpresaDatos";
import { EmpresaEquipo } from "@/components/secciones/EmpresaEquipo";
import { EmpresaMarcas } from "@/components/secciones/EmpresaMarcas";
import { Zonas } from "@/components/secciones/Zonas";
import config from "@/site.config";
import { anioActual } from "@/lib/anio";
import { cn } from "@/lib/utils";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "Quiénes somos" });

/**
 * /empresa (urgencias: corta; Pantalla, `empresa`): h1 «Quiénes somos», historia (sin historia, la
 * `descripcionCorta`), fotos de la empresa (contorno orgánico-b), años con contador (año del servidor) y
 * acreditaciones, garantías, equipo (foto o iniciales sobre mancha), marcas en texto y CTA. Cada bloque sale solo
 * con datos. Con todo vacío: descripción + «Dónde trabajamos» + CTA.
 */
export default async function Page() {
  const { negocio, empresa, acreditaciones, garantias, marcas, zonas, contacto } = config;
  const anio = await anioActual();
  const vacia =
    empresa.historia.length === 0 &&
    empresa.imagenes.length === 0 &&
    empresa.equipo.length === 0 &&
    acreditaciones.length === 0 &&
    garantias.length === 0 &&
    marcas.length === 0 &&
    negocio.anioFundacion === undefined;
  const parrafos = empresa.historia.length > 0 ? empresa.historia : [negocio.descripcionCorta];
  const unaFoto = empresa.imagenes.length === 1;

  return (
    <>
      <CabeceraInterior titulo="Quiénes somos" migas={[{ href: "/", texto: "Inicio" }, { texto: "Quiénes somos" }]} />

      <div className="contenedor flex flex-col gap-5 pt-4 lg:gap-6 lg:pt-8">
        <div className="flex max-w-[60ch] flex-col gap-4">
          {parrafos.map((p, i) => (
            <p key={i} className="m-0 text-[18px] leading-[1.6] text-pretty">
              {p}
            </p>
          ))}
        </div>

        {vacia ? (
          <Zonas zonas={zonas} className="pt-3 lg:pt-4" />
        ) : (
          <>
            {empresa.imagenes.length > 0 && (
              <ul
                className={cn(
                  "m-0 grid list-none gap-4 p-0",
                  unaFoto ? "max-w-[560px] grid-cols-1" : "grid-cols-1 md:grid-cols-2"
                )}
              >
                {empresa.imagenes.map((imagen, i) => (
                  <li key={`${imagen.src}-${i}`} className="min-w-0">
                    <Foto
                      imagen={imagen}
                      forma="organica-b"
                      sizes={unaFoto ? "(min-width: 640px) 560px, 100vw" : "(min-width: 1280px) 600px, (min-width: 768px) 46vw, 100vw"}
                    />
                  </li>
                ))}
              </ul>
            )}
            <EmpresaDatos
              anioFundacion={negocio.anioFundacion}
              anio={anio}
              acreditaciones={acreditaciones}
              garantias={garantias}
            />
            <EmpresaEquipo equipo={empresa.equipo} />
            <EmpresaMarcas marcas={marcas} />
          </>
        )}
      </div>

      <CtaFinal contacto={contacto} />
    </>
  );
}
