import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { metadatosPagina } from "@andrei-leads/core";

import { LlamadaDossier, PresupuestoJunta } from "@/components/Botones";
import { CabeceraPagina } from "@/components/CabeceraPagina";
import { Marco } from "@/components/Marco";
import { H2, Rotulo } from "@/components/Rotulo";
import { PuntosComunidades } from "@/components/secciones/BloqueComunidades";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Dossier } from "@/components/secciones/Dossier";
import { FichaCaso } from "@/components/secciones/FichaCaso";
import { numerar, resumen } from "@/lib/formato";
import { MENSAJE_JUNTA } from "@/lib/mensajes";
import { cn } from "@/lib/utils";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, {
  ruta: "/comunidades",
  titulo: "Comunidades de vecinos",
  descripcion: config.comunidades ? resumen(config.comunidades.texto[0]) : undefined,
});

/**
 * /comunidades (encargo §7; excepción explícita del encargo §4: el brief la reserva a obra técnica).
 * Solo existe con el bloque `comunidades`; sin él, 404 y fuera del menú y del sitemap (core).
 * Texto y puntos con `presupuesto-junta`, habilitación y seguro (apartado 1 del Dossier), trabajos
 * y CTA con el mensaje para la junta.
 */
export default function Page() {
  const c = config;
  if (!c.comunidades) notFound();
  const comunidades = c.comunidades;
  const n = numerar([c.acreditaciones.length > 0 && "dossier", c.trabajos.length > 0 && "trabajos", "cta"]);

  return (
    <Marco actual="comunidades">
      <CabeceraPagina
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/comunidades", texto: "Comunidades" },
        ]}
        titulo="Electricidad para comunidades de vecinos"
      >
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex max-w-[62ch] flex-col gap-4 text-[1.0625rem] lg:col-span-6">
            {comunidades.texto.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <PuntosComunidades comunidades={comunidades} />
            <div className="mt-6">
              {c.contacto.whatsapp ? <PresupuestoJunta numero={c.contacto.whatsapp} /> : <LlamadaDossier contacto={c.contacto} />}
            </div>
          </div>
        </div>
      </CabeceraPagina>

      <Dossier
        acreditaciones={c.acreditaciones}
        garantias={c.garantias}
        negocio={c.negocio}
        contacto={c.contacto}
        comunidades
        modo="habilitacion"
        n={n("dossier")}
        className={c.trabajos.length > 0 ? undefined : "mb-14 lg:mb-20"}
      />

      {c.trabajos.length > 0 && (
        <section aria-labelledby="h2-trabajos-comunidades" className="contenedor py-14 lg:py-24">
          <Rotulo n={n("trabajos")} texto="Trabajos" />
          <h2 id="h2-trabajos-comunidades" className={cn(H2, "mt-4")}>
            Trabajos en edificios
          </h2>
          <div className="mt-8 grid gap-x-10 gap-y-14 md:grid-cols-2">
            {c.trabajos.slice(0, 4).map((t) => (
              <FichaCaso key={t.slug} trabajo={t} nivel="h3" />
            ))}
          </div>
        </section>
      )}

      <CtaFinal
        contacto={c.contacto}
        mensaje={MENSAJE_JUNTA}
        textoWhatsapp="Pedir presupuesto para la junta"
        titulo="Pide el presupuesto para la próxima junta"
        rotulo="Presupuesto"
        n={n("cta")}
      />
    </Marco>
  );
}
