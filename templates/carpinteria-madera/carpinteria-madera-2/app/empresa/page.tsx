import type { Metadata } from "next";
import Image from "next/image";
import { etiquetaOrigen, iniciales, listaY, metadatosPagina } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Pareja } from "@/components/Botones";
import { Marco } from "@/components/Marco";
import { CabeceraPlena } from "@/components/secciones/CabeceraPlena";
import { Cifras } from "@/components/secciones/Cifras";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Garantias } from "@/components/secciones/Garantias";
import { mensajeInicio } from "@/lib/mensajes";
import { cifras } from "@/lib/textos";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "Quiénes somos" });

/**
 * /empresa (encargo §7): cifras grandes en la cabecera, historia con las fotos del taller en carrusel
 * 3:2, equipo (iniciales sin foto; nunca una cara de IA), garantías con marcas y CTA final. Sin
 * historia ni fotos, solo la frase de las zonas (la descripción ya está en la entradilla).
 */
export default function Page() {
  const { negocio, empresa, contacto, zonas } = config;
  const mensaje = mensajeInicio(contacto);
  const conHistoria = empresa.historia.length > 0 || empresa.imagenes.length > 0;
  return (
    <Marco actual="empresa">
      <CabeceraPlena
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/empresa", texto: "Empresa" },
        ]}
        titulo="Quiénes somos"
        entradilla={negocio.descripcionCorta}
      >
        <Cifras cifras={cifras(config)} className="mt-6" />
        <Pareja contacto={contacto} mensaje={mensaje} tono="pleno" className="mt-4" />
      </CabeceraPlena>

      {conHistoria && (
        <section aria-labelledby={empresa.historia.length > 0 ? "h2-historia" : undefined} aria-label={empresa.historia.length > 0 ? undefined : "El taller"} className="seccion">
          <div className="contenedor flex flex-wrap items-start gap-[clamp(28px,5vw,72px)]">
            {empresa.historia.length > 0 && (
              <div className="flex max-w-[62ch] flex-[1_1_360px] flex-col gap-4">
                <h2 id="h2-historia" className="h2">
                  Nuestra historia
                </h2>
                {empresa.historia.map((p) => (
                  <p key={p} className="text-entradilla text-pretty">
                    {p}
                  </p>
                ))}
              </div>
            )}
            {empresa.imagenes.length > 0 && (
              <ul className="carril-ancho min-w-0 flex-[1_1_420px]">
                {empresa.imagenes.map((img) => (
                  <li key={img.src} className="min-w-0">
                    <Foto imagen={img} proporcion="3/2" sizes="(min-width: 1024px) 560px, calc(100vw - 40px)" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {!conHistoria && zonas.length > 0 && (
        <section aria-label="Dónde montamos" className="seccion">
          <p className="contenedor max-w-[62ch] font-titulo text-[clamp(1.15rem,1rem+0.6vw,1.5rem)] leading-[1.35]">Montamos en {listaY(zonas)}.</p>
        </section>
      )}

      {empresa.equipo.length > 0 && (
        <section aria-labelledby="h2-equipo" className="pb-[clamp(56px,8vw,104px)]">
          <div className="contenedor flex flex-col gap-6">
            <h2 id="h2-equipo" className="h3-seccion">
              El equipo
            </h2>
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-3">
              {empresa.equipo.map((p) => (
                <li key={p.nombre} className="flex items-center gap-3.5 rounded-tarjeta bg-superficie p-3.5">
                  {p.foto ? (
                    <Image src={p.foto.src} alt={p.foto.alt} width={64} height={64} sizes="64px" quality={60} className="size-16 flex-none rounded-full object-cover" />
                  ) : (
                    <span aria-hidden="true" className="grid size-16 flex-none place-items-center rounded-full bg-alterna font-titulo text-xl font-bold">
                      {iniciales(p.nombre)}
                    </span>
                  )}
                  <span className="flex min-w-0 flex-col">
                    <strong className="font-titulo text-lg font-bold">{p.nombre}</strong>
                    {p.cargo && <span className="text-sm text-texto-suave">{p.cargo}</span>}
                    {/* La foto de 64 px no admite la píldora de Foto: la etiqueta de origen va en texto (AI Act, art. 50.4). */}
                    {p.foto && etiquetaOrigen(p.foto) && <span className="text-xs text-texto-suave">{etiquetaOrigen(p.foto)}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Garantias garantias={config.garantias} acreditaciones={config.acreditaciones} marcas={config.marcas} />
      <CtaFinal contacto={contacto} mensaje={mensaje} />
    </Marco>
  );
}
