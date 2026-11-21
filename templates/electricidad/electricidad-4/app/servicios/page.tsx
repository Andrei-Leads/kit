import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import { Pulsador, WhatsAppEtiqueta } from "@/components/Botones";
import { Migas } from "@/components/base/Migas";
import { Cuadro } from "@/components/Cuadro";
import { Marco } from "@/components/Marco";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { MarcoHero } from "@/components/secciones/HeroCuadro";
import { Leyenda } from "@/components/secciones/Leyenda";
import { Resenas } from "@/components/secciones/Resenas";
import { mensajeCuadro } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/** /servicios (encargo §7): el cuadro completo arriba, la Leyenda completa, reseñas y CTA. */
export default function Page() {
  const { contacto, negocio, servicios } = config;
  const mensaje = mensajeCuadro(contacto);
  return (
    <Marco actual="servicios">
      <Migas
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
        ]}
        className="contenedor pt-2"
      />
      <MarcoHero cuadro={<Cuadro servicios={servicios} nombre={negocio.nombre} acreditacion={config.acreditaciones[0]} aparecer />}>
        <h1 className="text-display leading-[1.02] font-semibold tracking-[-0.01em]">Servicios</h1>
        <p className="max-w-[40ch] text-[17px] text-texto-suave">Cada módulo del cuadro es un servicio. Toca el que se parezca a lo que te pasa.</p>
        <div className="flex flex-wrap gap-2.5">
          <Pulsador contacto={contacto} compacto icono={false} />
          <WhatsAppEtiqueta numero={contacto.whatsapp} mensaje={mensaje} compacto icono={false} />
        </div>
      </MarcoHero>
      <Leyenda servicios={servicios} telefono={contacto.telefono} titulo="Qué arreglamos" />
      <Resenas resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={contacto.fichaGoogle} />
      <CtaFinal contacto={contacto} mensaje={mensaje} />
    </Marco>
  );
}
