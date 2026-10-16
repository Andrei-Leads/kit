import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";
import { Migas } from "@/components/Migas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { EmpresaDatos } from "@/components/secciones/EmpresaDatos";
import { EmpresaEquipo } from "@/components/secciones/EmpresaEquipo";
import { EmpresaSello } from "@/components/secciones/EmpresaSello";
import config from "@/site.config";
import { etiquetaCampo, h1Interior } from "@/lib/estilos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "La empresa" });

/**
 * /empresa (urgencias: corta). Sello y acreditaciones primero; después historia, fotos, equipo y
 * AÑOS / GARANTÍAS (+ marcas en texto). Cada bloque sale solo con datos. Con todo vacío: la
 * `descripcionCorta`, «Dónde trabajamos» (zonas) y el CTA.
 */
export default function Page() {
  const { negocio, empresa, acreditaciones, garantias, marcas, zonas, contacto } = config;
  const vacia =
    acreditaciones.length === 0 &&
    empresa.historia.length === 0 &&
    empresa.imagenes.length === 0 &&
    empresa.equipo.length === 0 &&
    garantias.length === 0 &&
    marcas.length === 0 &&
    negocio.anioFundacion === undefined;

  return (
    <>
      <header className="border-b border-regla">
        <div className="contenedor flex flex-col gap-2 pt-1 pb-6 md:pb-11">
          <Migas items={[{ href: "/", texto: "Inicio" }, { texto: "La empresa" }]} />
          <h1 className={h1Interior}>La empresa</h1>
        </div>
      </header>

      <div className="contenedor pt-7 md:pt-10">
        {vacia ? (
          <>
            <p className="m-0 max-w-[60ch] text-[18px] leading-[1.6] text-pretty">{negocio.descripcionCorta}</p>
            {zonas.length > 0 && (
              <section aria-labelledby="titulo-zonas-empresa" className="mt-8">
                <h2 id="titulo-zonas-empresa" className={`${etiquetaCampo} m-0`}>
                  Dónde trabajamos
                </h2>
                <p className="m-0 mt-1.5 max-w-[60ch] font-mono text-base leading-[1.75] font-medium">
                  {zonas.join(" / ")}
                </p>
              </section>
            )}
          </>
        ) : (
          <div className="flex flex-col gap-8 md:gap-10 [&>:first-child]:mt-0">
            <EmpresaSello acreditaciones={acreditaciones} />

            {empresa.historia.length > 0 && (
              <div className="flex max-w-[66ch] flex-col gap-[18px]">
                {empresa.historia.map((p, i) => (
                  <p key={i} className="m-0 text-[18px] leading-[1.6] text-pretty">
                    {p}
                  </p>
                ))}
              </div>
            )}

            {empresa.imagenes.length > 0 && (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {empresa.imagenes.map((imagen, i) => (
                  <Foto
                    key={`${imagen.src}-${i}`}
                    imagen={imagen}
                    sizes="(min-width: 1200px) 552px, (min-width: 768px) 46vw, 100vw"
                  />
                ))}
              </div>
            )}

            <EmpresaEquipo equipo={empresa.equipo} />
            <EmpresaDatos negocio={negocio} garantias={garantias} marcas={marcas} />
          </div>
        )}
      </div>

      <CtaFinal contacto={contacto} />
    </>
  );
}
