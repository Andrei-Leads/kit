import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { CabeceraPagina } from "@/components/CabeceraPagina";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { RejillaDelCatalogo } from "@/components/secciones/RejillaPiezas";
import { mensajeInicio } from "@/lib/mensajes";
import { numerar, piezasTexto } from "@/lib/piezas";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Piezas" });

/**
 * /trabajos «Piezas» (entrega §07): `h1` display con el total y la rejilla completa con el filtro
 * por servicio, en el orden de la lista (el número de pieza no cambia al filtrar). Sin trabajos, las
 * fotos de `galeria` en la misma rejilla; sin trabajos ni galería, la ruta no existe.
 */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { contacto, trabajos, galeria } = config;
  const total = trabajos.length > 0 ? trabajos.length : galeria.length;
  return (
    <>
      <CabeceraPagina
        pagina="trabajos"
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Piezas" },
        ]}
        titulo="Piezas"
        recuento={piezasTexto(total)}
      />
      <RejillaDelCatalogo config={config} piezas={numerar(trabajos)} precargar id="catalogo" className="pt-[clamp(1.5rem,1rem+2vw,3rem)]" />
      <CtaFinal contacto={contacto} mensaje={mensajeInicio(contacto)} />
    </>
  );
}
