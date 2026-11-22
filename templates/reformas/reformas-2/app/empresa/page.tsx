import type { Metadata } from "next";
import Image from "next/image";
import { etiquetaOrigen, iniciales, metadatosPagina } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Marco } from "@/components/Marco";
import { BandaInterior } from "@/components/secciones/BandaInterior";
import { Cifras } from "@/components/secciones/Cifras";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Garantias } from "@/components/secciones/Garantias";
import { Zonas } from "@/components/secciones/Zonas";
import { mensajeInicio } from "@/lib/mensajes";
import { cifras } from "@/lib/textos";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "Quiénes somos" });

/**
 * /empresa (encargo §7): cifras grandes en la banda, historia, fotos en tarjetas, equipo (iniciales
 * si no hay foto; nunca una cara de IA), marcas en píldoras, garantías y acreditaciones, zonas y CTA.
 * Todo vacío: cifras, zonas y CTA.
 */
export default function Page() {
  const { negocio, empresa, marcas, contacto } = config;
  const cuerpo = empresa.historia.length > 0 || empresa.imagenes.length > 0 || marcas.length > 0 || empresa.equipo.length > 0;
  return (
    <Marco actual="empresa">
      <BandaInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/empresa", texto: "Empresa" },
        ]}
        titulo="Quiénes somos"
        entradilla={negocio.descripcionCorta}
        debajo={<Cifras cifras={cifras(config)} className="mt-6 grid-cols-[repeat(auto-fit,minmax(130px,1fr))]" />}
      />

      {cuerpo && (
        <section aria-label="La empresa" className="pt-[clamp(48px,2rem+4vw,96px)]">
          <div className="contenedor grid grid-cols-1 items-start gap-x-[clamp(32px,5vw,72px)] gap-y-8 lg:grid-cols-2">
            {empresa.historia.length > 0 && (
              <div className="flex max-w-[62ch] flex-col gap-4">
                <h2 className="h2">Nuestra historia</h2>
                {empresa.historia.map((p) => (
                  <p key={p} className="text-pretty">
                    {p}
                  </p>
                ))}
              </div>
            )}
            {empresa.imagenes.length > 0 && (
              <ul className="grid grid-cols-2 gap-3">
                {empresa.imagenes.map((img) => (
                  <li key={img.src} className="min-w-0">
                    <Foto imagen={img} proporcion="3/2" sizes="(min-width: 1024px) 270px, calc(50vw - 22px)" />
                  </li>
                ))}
              </ul>
            )}
            {empresa.equipo.length > 0 && (
              <div className="col-span-full flex flex-col gap-3.5">
                <h2 className="font-titulo text-[clamp(1.375rem,1.1rem+1vw,2rem)] font-semibold">El equipo</h2>
                <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,220px),1fr))] gap-3">
                  {empresa.equipo.map((p) => (
                    <li key={p.nombre} className="flex items-center gap-3.5 rounded-tarjeta border border-borde bg-superficie p-3">
                      {p.foto ? (
                        <Image src={p.foto.src} alt={p.foto.alt} width={64} height={64} sizes="64px" className="size-16 flex-none rounded-full object-cover" />
                      ) : (
                        <span aria-hidden="true" className="grid size-16 flex-none place-items-center rounded-full bg-alterna font-titulo text-xl font-semibold">
                          {iniciales(p.nombre)}
                        </span>
                      )}
                      <span className="flex min-w-0 flex-col">
                        <strong className="font-titulo text-lg font-semibold">{p.nombre}</strong>
                        {p.cargo && <span className="text-sm text-texto-suave">{p.cargo}</span>}
                        {/* La foto de 64 px no admite la píldora de Foto: la etiqueta de origen va en texto (AI Act, art. 50.4). */}
                        {p.foto && etiquetaOrigen(p.foto) && <span className="text-xs text-texto-suave">{etiquetaOrigen(p.foto)}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {marcas.length > 0 && (
              <div className="col-span-full flex flex-col gap-3.5">
                <h2 className="font-titulo text-[clamp(1.375rem,1.1rem+1vw,2rem)] font-semibold">Marcas con las que trabajamos</h2>
                <ul className="flex flex-wrap gap-2">
                  {marcas.map((m) => (
                    <li key={m} className="rounded-full border border-borde bg-superficie px-[18px] py-2.5 font-semibold">
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      <Garantias garantias={config.garantias} acreditaciones={config.acreditaciones} />
      <Zonas zonas={config.zonas} />
      <CtaFinal contacto={contacto} mensaje={mensajeInicio(contacto)} />
    </Marco>
  );
}
