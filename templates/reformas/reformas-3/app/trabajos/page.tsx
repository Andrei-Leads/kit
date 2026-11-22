import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Pareja } from "@/components/Botones";
import { CabeceraPagina } from "@/components/CabeceraPagina";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { RejillaGaleria, RejillaObras, numerar } from "@/components/secciones/RejillaObras";
import { mensajeInicio } from "@/lib/mensajes";
import { numeroObra, obrasTexto } from "@/lib/obras";

// Descripción propia: la de core dice «trabajos reales», y en una demo las fotos son de ejemplo.
export const metadata: Metadata = metadatosPagina(config, {
  ruta: "/trabajos",
  titulo: "Obras",
  descripcion:
    config.trabajos.length > 0
      ? `Obras de ${config.negocio.nombre} en ${config.contacto.direccion.ciudad}: cada una con su barrio, año y superficie.`
      : `Fotos del trabajo de ${config.negocio.nombre} en ${config.contacto.direccion.ciudad}.`,
});

/**
 * /trabajos: `h1` «Obras», recuento y la rejilla completa con filtro por
 * servicio (radios + `:has()`, la página sigue estática) y mosaico 2×2 cada 8.
 * Sin trabajos, la galería; sin nada, 404.
 */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { trabajos, galeria, contacto } = config;
  const mensaje = mensajeInicio(contacto);
  const conObras = trabajos.length > 0;
  return (
    <>
      <CabeceraPagina
        pagina="trabajos"
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Obras" },
        ]}
        titulo="Obras"
        entrada={<p>{conObras ? `${obrasTexto(trabajos.length)} terminadas, cada una con su barrio, año y superficie.` : "Algunas fotos de nuestro trabajo."}</p>}
      />
      {conObras ? (
        <RejillaObras
          obras={numerar(trabajos)}
          servicios={config.servicios}
          conFiltro
          mosaico
          precargar
          cierre={{
            tipo: "cta",
            titulo: `La obra ${numeroObra(trabajos.length)} puede ser la tuya`,
            children: <Pareja telefono={contacto.telefono} whatsapp={contacto.whatsapp} mensaje={mensaje} compacta className="max-w-none" />,
          }}
          className="pt-6"
        />
      ) : (
        <RejillaGaleria galeria={galeria} className="pt-6" />
      )}
      <CtaFinal contacto={contacto} mensaje={mensaje} />
    </>
  );
}
