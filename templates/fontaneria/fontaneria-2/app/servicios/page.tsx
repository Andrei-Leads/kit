import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Migas } from "@/components/base/Migas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Resenas } from "@/components/secciones/Resenas";
import { Servicios } from "@/components/secciones/Servicios";
import { TarifasCerradas } from "@/components/secciones/TarifasCerradas";
import { h1Pagina } from "@/lib/estilos";
import { mensajeBase } from "@/lib/mensajes";
import { hayPrecios, preciosVisibles } from "@/lib/precios";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/** /servicios (encargo §7): rejilla de tarjetas, debajo las tarifas (si hay precios), reseñas y CTA. */
export default function Page() {
  const { contacto } = config;
  return (
    <>
      <Servicios
        servicios={config.servicios}
        nivel="h2"
        preloadPrimera
        className="pt-[clamp(20px,3vw,40px)] pb-[clamp(48px,6vw,88px)]"
        cabecera={
          <div className="flex max-w-180 flex-col gap-3.5">
            <Migas migas={[{ href: "/", texto: "Inicio" }, { href: "/servicios", texto: "Servicios" }]} />
            <h1 className={h1Pagina}>Servicios</h1>
            <p className="m-0 text-texto-suave">Elige lo que necesitas. Cada servicio tiene su página con lo que incluye.</p>
          </div>
        }
      />
      <TarifasCerradas precios={preciosVisibles(config)} nota={config.tarifas?.nota} contacto={contacto} />
      <Resenas resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={contacto.fichaGoogle} />
      <div className="h-[clamp(24px,4vw,48px)]" />
      <CtaFinal contacto={config.contacto} valoracion={config.valoracion} conPrecios={hayPrecios(config)} mensaje={mensajeBase(contacto)} />
    </>
  );
}
