import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Migas } from "@/components/base/Migas";
import { Pareja } from "@/components/Botones";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { FilasServicios } from "@/components/secciones/FilasServicios";
import { Resenas } from "@/components/secciones/Resenas";
import { mensajeBase } from "@/lib/mensajes";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/** /servicios (encargo §7): línea de urgencia (solo con datos), h1, todas las filas, pareja, reseñas y CTA. */
export default function Page() {
  const { contacto } = config;
  const mensaje = mensajeBase(contacto);
  const linea = [contacto.urgencias24h && "Urgencias 24 h", contacto.tiempoLlegada && `Llegamos en ${contacto.tiempoLlegada}`].filter(Boolean).join(" · ");
  return (
    <>
      <section className="bg-fondo [background-image:var(--haz)]">
        <div className="contenedor flex flex-col gap-6 pt-2 pb-10 lg:pb-14">
          <Migas migas={[{ href: "/", texto: "Inicio" }, { href: "/servicios", texto: "Servicios" }]} />
          <div className="flex flex-col gap-3">
            {linea && <p className="rotulo m-0 text-texto">{linea}</p>}
            <h1 className="titulo-h1 m-0">Servicios</h1>
          </div>
          <FilasServicios servicios={config.servicios} nivel="h2" />
          <Pareja contacto={contacto} mensaje={mensaje} className="mt-2" />
        </div>
      </section>
      <Resenas resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={contacto.fichaGoogle} deNoche={contacto.urgencias24h} />
      <CtaFinal contacto={contacto} mensaje={mensaje} />
    </>
  );
}
