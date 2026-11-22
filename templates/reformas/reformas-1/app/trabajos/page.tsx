import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Galeria } from "@/components/secciones/Galeria";
import { Obra } from "@/components/secciones/Obra";
import { mensajeInicio } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Trabajos" });

/**
 * /trabajos (encargo §7, tablero Trabajos): rejilla de pares a dos columnas en escritorio, cada
 * uno con su deslizador (o su foto) y la ficha corta. Sin filtro. Sin trabajos, la galería; sin
 * nada, 404.
 */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { contacto, trabajos, galeria } = config;
  const conAntes = trabajos.some((t) => t.antes);
  return (
    <>
      <span data-pagina="trabajos" hidden />
      <section className="contenedor pt-[clamp(32px,5vw,72px)] pb-[clamp(48px,7vw,104px)]">
        <h1 className="titulo-display">Trabajos</h1>
        <p className="mt-5 max-w-[46ch] text-texto-suave">
          Obras reales de {contacto.direccion.ciudad} y alrededores.
          {conAntes && " Arrastra cada foto para ver el cambio."}
        </p>
        <div className="mt-[clamp(32px,5vw,72px)]">
          {trabajos.length > 0 ? (
            <div className="grid gap-x-[clamp(24px,4vw,64px)] gap-y-[clamp(40px,5vw,72px)] lg:grid-cols-2">
              {trabajos.map((t, i) => (
                <Obra key={t.slug} trabajo={t} modo="tarjeta" nivel="h2" preload={i === 0} />
              ))}
            </div>
          ) : (
            <Galeria galeria={galeria} />
          )}
        </div>
      </section>
      <CtaFinal
        compacto
        cta={{ telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeInicio(contacto) }}
        titulo={
          <>
            ¿Quieres algo <em>parecido</em>?
          </>
        }
      />
    </>
  );
}
