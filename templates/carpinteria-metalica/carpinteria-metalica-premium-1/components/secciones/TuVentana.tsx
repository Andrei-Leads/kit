import { BotonLlamada, type SiteConfig } from "@andrei-leads/core";

import { AsistenteVentana } from "@/components/cliente/AsistenteVentana";
import { ParejaCta } from "@/components/ParejaCta";
import { TituloLineas } from "@/components/TituloLineas";
import { mensajeInicio, RESPUESTA } from "@/lib/mensajes";

type Props = { contacto: SiteConfig["contacto"]; soluciones: readonly string[] };

/**
 * «Tu ventana» (encargo §5.4): sección oscura con el asistente. Sin `whatsapp`, se
 * sustituye por una franja CTA de llamada.
 */
export function TuVentana({ contacto, soluciones }: Props) {
  return (
    <section data-tono="oscuro" aria-labelledby="titulo-tu-ventana" className="seccion bg-tinta text-sobre-tinta">
      <div className="contenedor">
        <p className="etiqueta">Tu ventana</p>
        {contacto.whatsapp ? (
          <>
            <TituloLineas id="titulo-tu-ventana" lineas={["Cuéntanos qué", <><em>necesitas</em>.</>]} className="titulo-h2 mt-3" />
            <p className="m-0 mt-5 col-texto text-sobre-tinta-suave">Tres preguntas y te dejamos el mensaje escrito. No pedimos ningún dato.</p>
            <div className="mt-10 lg:mt-14">
              <AsistenteVentana
                soluciones={soluciones}
                whatsapp={contacto.whatsapp}
                mensajeVacio={mensajeInicio(contacto)}
                confianza={RESPUESTA}
                llamada={
                  <BotonLlamada telefono={contacto.telefono} className="boton boton-llamar sobre-tinta min-h-14 flex-[1_1_auto] px-[26px] lg:flex-none">
                    Prefiero llamar
                  </BotonLlamada>
                }
              />
            </div>
          </>
        ) : (
          <>
            <TituloLineas id="titulo-tu-ventana" lineas={["Cuéntanos tu", <><em>ventana</em>.</>]} className="titulo-h2 mt-3" />
            <p className="m-0 mt-5 col-texto text-sobre-tinta-suave">Llámanos y te decimos cuándo podemos ir a medir.</p>
            <ParejaCta cta={{ telefono: contacto.telefono, mensaje: "" }} textoWhatsapp="" tono="oscuro" tamano={56} className="mt-8 max-w-[560px]" />
          </>
        )}
      </div>
    </section>
  );
}
