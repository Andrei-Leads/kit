import type { Metadata } from "next";
import { BotonLlamada, metadatosPagina, telefonoVisible } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Marco } from "@/components/Marco";
import { AsistenteServidor } from "@/components/secciones/AsistenteServidor";
import { CabeceraPlena } from "@/components/secciones/CabeceraPlena";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Resenas } from "@/components/secciones/Resenas";
import { ServiciosTarjetas } from "@/components/secciones/ServiciosTarjetas";
import { mensajeInicio } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/**
 * /servicios (encargo §7): cabecera plena con la pareja, rejilla de tarjetas y, debajo, el asistente
 * completo (solo con WhatsApp); reseñas y CTA. «Configurar» usa el asistente de esta misma página.
 */
export default function Page() {
  const { contacto } = config;
  const mensaje = mensajeInicio(contacto);
  return (
    <Marco actual="servicios">
      <CabeceraPlena
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
        ]}
        titulo="Servicios"
        entradilla={
          contacto.whatsapp
            ? "Todo se fabrica a la medida de tu hueco. Elige la pieza y configúrala en tres pasos."
            : "Todo se fabrica a la medida de tu hueco. Elige la pieza y llámanos para contárnoslo."
        }
      >
        <Pareja contacto={contacto} mensaje={mensaje} tono="pleno" textoWhatsapp="Pedir presupuesto por WhatsApp" className="mt-3" />
      </CabeceraPlena>
      <ServiciosTarjetas servicios={config.servicios} titulo="Elige la pieza" conAsistente={Boolean(contacto.whatsapp)} baseConfigurar="#asistente-" />
      {contacto.whatsapp && (
        <section aria-labelledby="h2-configura" className="campo-pleno px-[clamp(20px,4vw,40px)] py-[clamp(56px,8vw,104px)]">
          <div className="mx-auto flex max-w-[1200px] flex-wrap items-start gap-[clamp(24px,4vw,56px)]">
            <div className="flex flex-[1_1_380px] flex-col gap-3.5">
              <h2 id="h2-configura" className="h2">
                Configúralo en 3 pasos
              </h2>
              <p className="max-w-[44ch]">Pieza, tamaño del hueco y acabado. Te sale el mensaje escrito; solo tienes que añadir la foto.</p>
              <BotonLlamada telefono={contacto.telefono} className="boton boton-compacto boton-contorno-pleno self-start px-[22px] text-base">
                o llámanos:&nbsp;{telefonoVisible(contacto.telefono)}
              </BotonLlamada>
            </div>
            <div className="min-w-0 flex-[1_1_480px]">
              <AsistenteServidor servicios={config.servicios} whatsapp={contacto.whatsapp} mensajeBase={mensaje} />
            </div>
          </div>
        </section>
      )}
      <Resenas resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={contacto.fichaGoogle} />
      <CtaFinal contacto={contacto} mensaje={mensaje} asistente="#asistente" />
    </Marco>
  );
}
