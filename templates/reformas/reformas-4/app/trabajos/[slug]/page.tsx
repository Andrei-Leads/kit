import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarTrabajo, metadatosTrabajo, parametrosTrabajos, servicioDelTrabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Marco } from "@/components/Marco";
import { Rotulo } from "@/components/Rotulo";
import { CabeceraPagina } from "@/components/secciones/CabeceraPagina";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { dosCifras, horarioLinea, lineaObra, pasosDiario } from "@/lib/formato";
import { mensajeTrabajo } from "@/lib/mensajes";
import { numerar, numeroDe } from "@/lib/navegacion";
import config from "@/site.config";

// Ver app/servicios/[slug]/page.tsx: evita el «falso 404» con partialPrefetching.
export const ensureStatic = "navigation";

// Sin trabajos, core devuelve [{ slug: "_" }], que buscarTrabajo no encuentra: 404.
export function generateStaticParams() {
  return parametrosTrabajos(config);
}

export async function generateMetadata({ params }: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

/**
 * Entrada del diario (encargo §7): h1 y línea mono de contexto; la foto principal 3:2 o, con `antes`,
 * el par estático «Antes / Después» (sin deslizador). Cada párrafo de `contenido` es una entrada
 * numerada (sin fechas inventadas). Después, el resto de fotos, el testimonio, el servicio y el CTA.
 */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = buscarTrabajo(config, slug);
  if (!trabajo) notFound();

  const { contacto } = config;
  const [principal, ...resto] = trabajo.imagenes;
  const servicio = servicioDelTrabajo(config.servicios, trabajo);
  const secciones = numerar([
    trabajo.contenido.length > 0 && { id: "entradas", texto: "Entradas" },
    resto.length > 0 && { id: "fotos", texto: "Fotos" },
    trabajo.testimonio && { id: "testimonio", texto: "Testimonio" },
  ]);
  const n = (id: string) => numeroDe(secciones, id);
  const tamFoto = "(min-width: 1024px) 520px, calc(100vw - 40px)";

  return (
    <Marco config={config} pagina="trabajos" ficha secciones={secciones}>
      <CabeceraPagina
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Obras" },
          { href: `/trabajos/${trabajo.slug}`, texto: trabajo.titulo },
        ]}
        cinta="Entrada del diario"
        titulo={trabajo.titulo}
        meta={lineaObra(trabajo) || undefined}
        entradilla={trabajo.descripcion}
      />

      <section aria-label="Fotos de la obra" className="px-(--pad) pt-[clamp(40px,2rem+3vw,88px)]">
        <div className="max-w-[1040px]">
          {trabajo.antes ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-x-4 gap-y-6">
              <figure className="grid gap-2.5">
                <figcaption className="mono text-xs tracking-[0.08em] text-texto-suave uppercase">Antes</figcaption>
                <Foto imagen={trabajo.antes} sizes={tamFoto} preload />
              </figure>
              <figure className="grid gap-2.5">
                <figcaption className="mono text-xs tracking-[0.08em] text-primario-claro uppercase">Después</figcaption>
                <Foto imagen={principal} sizes={tamFoto} />
              </figure>
            </div>
          ) : (
            <div className="max-w-[880px]">
              <Foto imagen={principal} sizes="(min-width: 1024px) 880px, calc(100vw - 40px)" preload />
            </div>
          )}
        </div>
      </section>

      {trabajo.contenido.length > 0 && (
        <section id="entradas" aria-labelledby="h2-entradas" className="px-(--pad) py-[clamp(56px,3rem+3vw,104px)]">
          <div className="max-w-[1040px]">
            <Rotulo n={n("entradas")}>Entradas</Rotulo>
            <h2 id="h2-entradas" className="h2-diario mb-6">
              Cómo fue la obra
            </h2>
            {trabajo.contenido.map((p, i) => (
              <div key={p} data-aparecer className="filete flex flex-wrap gap-x-12 gap-y-3 pt-7 pb-8">
                <h3 className="mono flex-[1_1_160px] text-[13px] font-semibold text-primario-claro">Entrada {dosCifras(i + 1)}</h3>
                <p className="max-w-[65ch] flex-[999_1_380px] text-cuerpo leading-[1.65] text-texto">{p}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {resto.length > 0 && (
        <section id="fotos" aria-label="Más fotos" className="px-(--pad) pb-[clamp(56px,3rem+3vw,104px)]">
          <div className="grid max-w-[1040px] grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
            {resto.map((img) => (
              <Foto key={img.src} imagen={img} sizes={tamFoto} />
            ))}
          </div>
        </section>
      )}

      {trabajo.testimonio && (
        <section id="testimonio" aria-label="Testimonio" className="border-t border-borde bg-alterna px-(--pad) py-[clamp(56px,3rem+3vw,104px)]">
          <figure className="grid max-w-[820px] gap-5">
            <blockquote className="text-[clamp(1.25rem,1rem+1vw,1.75rem)] leading-[1.45] text-texto">«{trabajo.testimonio.texto}»</blockquote>
            <figcaption className="mono text-[13px] text-texto-suave">— {trabajo.testimonio.autor}</figcaption>
          </figure>
        </section>
      )}

      {servicio && (
        <section aria-label="Servicio" className="border-t border-borde px-(--pad) py-8">
          <Link href={`/servicios/${servicio.slug}`} className="mono inline-flex min-h-11 items-center gap-2.5 text-[13px] text-texto-suave no-underline hover:text-texto">
            Servicio: <span className="border-b border-primario-claro text-primario-claro">{servicio.titulo} →</span>
          </Link>
        </section>
      )}

      <CtaFinal
        contacto={contacto}
        primerPaso={pasosDiario(config.proceso)[0]?.titulo ?? ""}
        horario={horarioLinea(contacto.horario)}
        mensaje={mensajeTrabajo(trabajo)}
        titulo="Quiero una obra así"
        textoWhatsapp="Quiero algo parecido"
      />
    </Marco>
  );
}
