import type { Metadata } from "next";
import { listaY, metadatosPagina } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { CabeceraPagina } from "@/components/CabeceraPagina";
import { Marco } from "@/components/Marco";
import { H2, Rotulo } from "@/components/Rotulo";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Dossier } from "@/components/secciones/Dossier";
import { numerar } from "@/lib/formato";
import { mensajeEdificio } from "@/lib/mensajes";
import { cn } from "@/lib/utils";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "La empresa" });

/**
 * /empresa (encargo §7): el Dossier completo, `historia` a dos columnas en escritorio, `imagenes`
 * con pie, `equipo` (nombre y cargo, sin foto: solo texto), `marcas` y `zonas` en línea. Con todo
 * vacío queda una página corta: descripción, Dossier («Empresa»), zonas y CTA.
 */
export default function Page() {
  const c = config;
  const { historia, imagenes, equipo } = c.empresa;
  const n = numerar(["dossier", (historia.length > 0 || imagenes.length > 0) && "historia", equipo.length > 0 && "equipo", "cta"]);

  return (
    <Marco actual="empresa">
      <CabeceraPagina
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/empresa", texto: "Empresa" },
        ]}
        titulo="La empresa"
        entradilla={c.negocio.descripcionCorta}
      />
      <Dossier
        acreditaciones={c.acreditaciones}
        garantias={c.garantias}
        negocio={c.negocio}
        contacto={c.contacto}
        comunidades={Boolean(c.comunidades)}
        n={n("dossier")}
      />

      <div className="contenedor flex flex-col gap-14 py-14 lg:gap-20 lg:py-24">
        {(historia.length > 0 || imagenes.length > 0) && (
          <section aria-labelledby="h2-historia">
            <Rotulo n={n("historia")} texto="Historia" />
            <h2 id="h2-historia" className={cn(H2, "mt-4")}>
              Nuestra historia
            </h2>
            {historia.length > 0 && (
              <div className="mt-6 gap-12 lg:columns-2">
                {historia.map((p) => (
                  <p key={p} className="mb-4 break-inside-avoid">
                    {p}
                  </p>
                ))}
              </div>
            )}
            {imagenes.length > 0 && (
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                {imagenes.map((img) => (
                  <Foto key={img.src} imagen={img} sizes="(min-width: 1024px) 560px, (min-width: 640px) 45vw, 100vw" marco="lamina" />
                ))}
              </div>
            )}
          </section>
        )}

        {equipo.length > 0 && (
          <section aria-labelledby="h2-equipo" className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Rotulo n={n("equipo")} texto="Equipo" />
              <h2 id="h2-equipo" className={cn(H2, "mt-4")}>
                Equipo
              </h2>
            </div>
            <ul className="border-t border-texto lg:col-span-8 lg:mt-12">
              {equipo.map((p) => (
                <li key={p.nombre} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-linea-plano py-4">
                  <span className="font-titulo text-[1.375rem]">{p.nombre}</span>
                  {p.cargo && <span className="versalitas text-texto-suave">{p.cargo}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {(c.marcas.length > 0 || c.zonas.length > 0) && (
          <dl className="border-t border-linea-plano">
            {c.marcas.length > 0 && (
              <div className="flex flex-col gap-1 border-b border-linea-plano py-4 sm:flex-row sm:items-baseline sm:gap-6">
                <dt className="versalitas w-44 shrink-0 text-texto-suave">Trabajamos con</dt>
                <dd className="font-titulo text-[1.25rem]">{listaY(c.marcas)}</dd>
              </div>
            )}
            {c.zonas.length > 0 && (
              <div className="flex flex-col gap-1 border-b border-linea-plano py-4 sm:flex-row sm:items-baseline sm:gap-6">
                <dt className="versalitas w-44 shrink-0 text-texto-suave">Dónde trabajamos</dt>
                <dd className="font-titulo text-[1.25rem]">{listaY(c.zonas)}</dd>
              </div>
            )}
          </dl>
        )}
      </div>

      <CtaFinal contacto={c.contacto} mensaje={mensajeEdificio(c.contacto)} n={n("cta")} />
    </Marco>
  );
}
