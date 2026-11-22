import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { CtaFinal, lineasFoto } from "@/components/secciones/CtaFinal";
import { HeroInterior } from "@/components/secciones/HeroInterior";
import { Resenas } from "@/components/secciones/Resenas";
import { SolucionesApiladas } from "@/components/secciones/SolucionesApiladas";
import { mensajeInicio, RESPUESTA, TEXTO_WA } from "@/lib/mensajes";
import { confianzaHorario } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/** /servicios (encargo §7): «Nuestras *soluciones*», el apilado completo (hasta 6), reseñas con pareja y CTA final. */
export default function Page() {
  const c = config;
  const cta = { telefono: c.contacto.telefono, whatsapp: c.contacto.whatsapp, mensaje: mensajeInicio(c.contacto) };
  return (
    <>
      <HeroInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
        ]}
        antetitulo="Servicios"
        titulo={
          <>
            Nuestras <em>soluciones</em>
          </>
        }
        frase={c.negocio.descripcionCorta}
        cta={cta}
        textoWhatsapp={TEXTO_WA}
        confianza={{ texto: RESPUESTA }}
        fotos={[c.imagenesHero[1], c.imagenesHero[2]]}
      />
      <SolucionesApiladas servicios={c.servicios} contacto={c.contacto} mensaje={cta.mensaje} apilados={6} />
      <Resenas resenas={c.resenas} valoracion={c.valoracion} fichaGoogle={c.contacto.fichaGoogle} trabajos={c.trabajos} cta={cta} />
      <CtaFinal
        cta={cta}
        lineas={lineasFoto(cta.whatsapp)}
        textoWhatsapp={TEXTO_WA}
        confianza={confianzaHorario(c.contacto.horario)}
      />
    </>
  );
}
