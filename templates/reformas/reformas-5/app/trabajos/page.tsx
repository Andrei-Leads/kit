import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { CabeceraPagina } from "@/components/secciones/CabeceraPagina";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { GaleriaArcos } from "@/components/secciones/GaleriaArcos";
import { TarjetaCasa } from "@/components/secciones/TarjetaCasa";
import { datosCta } from "@/lib/cta";
import { mensajeInicio } from "@/lib/mensajes";
import { metaLarga } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Casas" });

/** /trabajos («Casas»): rejilla de arcos sin filtro (el filtro es la firma de reformas-3). Sin trabajos, la galería. */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { trabajos, galeria } = config;
  return (
    <>
      <span data-pagina="trabajos" hidden />
      <CabeceraPagina
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Casas" },
        ]}
        titulo="Casas"
        entrada={trabajos.length > 0 ? "Casas terminadas, con lo que hicimos en cada una." : "Algunas casas en las que hemos trabajado."}
      />
      <section aria-label="Casas" className="contenedor pt-12">
        {trabajos.length > 0 ? (
          <ul className="rejilla-casas m-0 grid list-none gap-x-8 gap-y-14 p-0 lg:grid-cols-3">
            {trabajos.map((t, i) => (
              <li key={t.slug} className="flex">
                <TarjetaCasa trabajo={t} meta={metaLarga(t)} nivel="h2" i={i % 3} className="w-full" />
              </li>
            ))}
          </ul>
        ) : (
          <GaleriaArcos galeria={galeria} nivel="h2" />
        )}
      </section>
      <CtaFinal cta={datosCta(config.contacto, mensajeInicio(config.contacto))} />
    </>
  );
}
