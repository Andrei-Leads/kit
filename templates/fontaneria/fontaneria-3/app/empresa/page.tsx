import type { Metadata } from "next";
import { iniciales, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Capitular } from "@/components/Capitular";
import { Foto } from "@/components/base/Foto";
import { BentoPiedras } from "@/components/secciones/BentoPiedras";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { FotoSangre } from "@/components/secciones/FotoSangre";
import { MigasPagina } from "@/components/secciones/MigasPagina";
import { Zonas } from "@/components/secciones/Zonas";
import { bento } from "@/lib/bento";
import { datosCta, piedra } from "@/lib/textos";
import { cn } from "@/lib/utils";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "Quiénes somos" });

/**
 * /empresa: foto a sangre si hay (`empresa.imagenes[0]`), h1, descripción,
 * historia con capitular, equipo en piedras (sin foto, iniciales en cursiva),
 * bento repetido, zonas y CTA. Con todo vacío: h1, descripción, bento, zonas y CTA.
 */
export default function Page() {
  const { empresa, negocio } = config;
  const foto = empresa.imagenes[0];
  return (
    <>
      <span data-pagina="empresa" hidden />
      {foto && <FotoSangre imagen={foto} />}
      <MigasPagina migas={[{ href: "/", texto: "Inicio" }, { texto: "Empresa" }]} />
      <section className="pt-[clamp(1.5rem,1rem+2vw,3rem)] pb-[clamp(2rem,1.5rem+2vw,4rem)]">
        <div className="contenedor">
          <h1 className="m-0 font-titulo text-display font-medium tracking-[-0.025em] text-balance">Quiénes somos</h1>
          <p className="mt-5 mb-0 max-w-[30em] text-entrada">{negocio.descripcionCorta}</p>
          <Capitular parrafos={empresa.historia} className="mt-[clamp(2.5rem,2rem+2vw,4rem)]" />
          {empresa.equipo.length > 0 && (
            <>
              <h2 className="titulo-seccion mt-[clamp(3rem,2rem+3vw,5rem)]">El equipo</h2>
              <ul className="m-0 mt-[clamp(1.25rem,1rem+1vw,2rem)] grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,17rem),1fr))] gap-[clamp(0.75rem,0.5rem+1vw,1.25rem)] p-0">
                {empresa.equipo.map((e, i) => (
                  <li key={e.nombre} className={cn("flex items-center gap-5 bg-superficie p-[clamp(1.25rem,1rem+1vw,1.75rem)]", piedra(i + 2))}>
                    {e.foto ? (
                      <Foto
                        imagen={e.foto}
                        sizes="112px"
                        proporcion="1/1"
                        className="size-28 flex-none rounded-piedra-2"
                        claseEtiqueta="right-1.5 bottom-1.5 max-w-[calc(100%-0.75rem)] px-1.5 py-0.5 text-[0.6875rem]"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="grid size-28 flex-none place-items-center rounded-piedra-2 bg-primario-suave font-titulo text-4xl text-primario-texto italic"
                      >
                        {iniciales(e.nombre)}
                      </span>
                    )}
                    <div>
                      <h3 className="m-0 font-titulo text-[1.375rem] leading-[1.15] font-medium">{e.nombre}</h3>
                      {e.cargo && <p className="mt-1 mb-0 text-texto-suave">{e.cargo}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
      <BentoPiedras datos={bento(config)} />
      <Zonas zonas={config.zonas} />
      <CtaFinal cta={datosCta(config)} />
    </>
  );
}
