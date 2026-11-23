import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { TarjetaObra } from "@/components/secciones/TarjetaObra";
import { mensajeInicio, TEXTO_WA } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Obras" });

const SIZES = "(min-width: 1024px) 45vw, 100vw";

/**
 * /trabajos (encargo §7): «Obras», rejilla de 2 columnas (1 en móvil) de fotos 4:5 con su pie.
 * Sin filtro. Solo con `galeria`, sus fotos. Sin trabajos ni galería, 404.
 */
export default function Page() {
  const c = config;
  if (!hayTrabajos(c)) notFound();
  const cta = { telefono: c.contacto.telefono, whatsapp: c.contacto.whatsapp, mensaje: mensajeInicio(c.contacto) };
  const n = c.trabajos.length;
  return (
    <>
      <section aria-labelledby="titulo-obras" className="contenedor pt-[clamp(40px,6vw,96px)]">
        <h1 id="titulo-obras" className="titulo-display">
          Obras
        </h1>
        {n > 0 && (
          <p className="versalitas mt-4">
            {n} {n === 1 ? "obra" : "obras"} · {c.contacto.direccion.provincia}
          </p>
        )}
        <div className="mt-[clamp(40px,6vw,88px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] gap-x-[clamp(24px,4vw,64px)] gap-y-16">
          {n > 0
            ? c.trabajos.map((t) => <TarjetaObra key={t.slug} trabajo={t} proporcion="4/5" sizes={SIZES} nivel="h2" />)
            : c.galeria.map((f) => (
                <figure key={f.src} className="m-0">
                  <Foto imagen={f} sizes={SIZES} proporcion="4/5" />
                  {f.titulo && <figcaption className="mt-5 font-titulo text-2xl leading-[1.25] italic">{f.titulo}</figcaption>}
                </figure>
              ))}
        </div>
      </section>
      <CtaFinal cta={cta} textoWhatsapp={TEXTO_WA} />
    </>
  );
}
