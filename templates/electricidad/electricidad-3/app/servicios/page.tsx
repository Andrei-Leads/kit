import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { CabeceraInterior } from "@/components/CabeceraInterior";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { IndiceLateral } from "@/components/secciones/IndiceLateral";
import { Precios } from "@/components/secciones/Precios";
import { Resenas } from "@/components/secciones/Resenas";
import { Servicios } from "@/components/secciones/Servicios";
import { indiceServicios } from "@/lib/secciones";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/**
 * /servicios (encargo §5 y decisión 6): h1 → rejilla compacta con todos los servicios → «Lo que cuesta»
 * (sin «Precios por servicio», que repetiría la rejilla) → reseñas → CTA final. Desde 1024 px, índice lateral
 * sticky (Servicios · Precios · Opiniones) junto al contenido; el CTA va fuera, a todo el ancho.
 */
export default function Page() {
  const { contacto, servicios } = config;

  return (
    <>
      <CabeceraInterior titulo="Servicios" migas={[{ href: "/", texto: "Inicio" }, { texto: "Servicios" }]} />
      <div className="contenedor lg:flex lg:gap-4">
        <IndiceLateral secciones={indiceServicios(config)} telefono={contacto.telefono} />
        <div className="min-w-0 flex-1">
          <Servicios servicios={servicios} conTitulo={false} className="pt-5 lg:pt-6" />
          <Precios
            tarifas={config.tarifas}
            servicios={servicios}
            garantias={config.garantias}
            contacto={contacto}
            sinPrecioPorServicio
          />
          {config.resenas.length > 0 && (
            <Resenas resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={contacto.fichaGoogle} />
          )}
        </div>
      </div>
      <CtaFinal contacto={contacto} />
    </>
  );
}
