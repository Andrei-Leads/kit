import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import { Marco } from "@/components/Marco";
import { CabeceraPagina } from "@/components/secciones/CabeceraPagina";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Resenas } from "@/components/secciones/Resenas";
import { ServiciosLista } from "@/components/secciones/ServiciosLista";
import { horarioLinea, pasosDiario } from "@/lib/formato";
import { mensajeDiario } from "@/lib/mensajes";
import { numerar, numeroDe } from "@/lib/navegacion";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/** /servicios (encargo §7): el h1, la lista, las reseñas y el CTA. */
export default function Page() {
  const { negocio, contacto, servicios, resenas, valoracion } = config;
  const ciudad = contacto.direccion.ciudad;
  const secciones = numerar([{ id: "servicios", texto: "Servicios" }, resenas.length > 0 && { id: "resenas", texto: "Reseñas" }]);
  const n = (id: string) => numeroDe(secciones, id);
  const mensaje = mensajeDiario(contacto);
  return (
    <Marco config={config} pagina="servicios" secciones={secciones}>
      <CabeceraPagina
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
        ]}
        cinta={`Servicios · ${ciudad}`}
        titulo={`Servicios de reforma en ${ciudad}`}
        entradilla={negocio.descripcionCorta}
      />
      <ServiciosLista n={n("servicios")} servicios={servicios} titulo="Todos los servicios" />
      {resenas.length > 0 && (
        <Resenas
          n={n("resenas")}
          resenas={resenas}
          valoracion={valoracion}
          fichaGoogle={contacto.fichaGoogle}
        />
      )}
      <CtaFinal contacto={contacto} primerPaso={pasosDiario(config.proceso)[0]?.titulo ?? ""} horario={horarioLinea(contacto.horario)} mensaje={mensaje} />
    </Marco>
  );
}
