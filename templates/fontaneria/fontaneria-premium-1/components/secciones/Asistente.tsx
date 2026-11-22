import { BotonLlamada, type SiteConfig } from "@andrei-leads/core";

import { ALTURA, llamarBlanco } from "@/components/Botones";
import { mensajeInicio } from "@/lib/mensajes";
import { cn } from "@/lib/utils";

import { AsistentePresupuesto } from "./AsistentePresupuesto";
import { Titular } from "./Titular";

/** Sección del asistente sobre tinta (encargo §6.9). Sin WhatsApp, no existe. */
export function Asistente({ config }: { config: Pick<SiteConfig, "servicios" | "contacto"> }) {
  const { servicios, contacto } = config;
  if (!contacto.whatsapp) return null;
  return (
    <section data-tono="oscuro" aria-labelledby="titulo-asistente" className="sobre-tinta seccion bg-tinta text-white">
      <div className="contenedor grid gap-10 lg:grid-cols-[440px_minmax(0,520px)] lg:gap-10">
        <div className="flex flex-col gap-[18px]">
          <p className="etiqueta">Presupuesto en tres pasos</p>
          <Titular id="titulo-asistente" className="text-[44px] lg:text-h2" lineas={["Cuéntanos", <em key="e">tu obra</em>]} />
          <p className="m-0 mt-2 max-w-[360px] text-lg leading-relaxed text-sobre-tinta-suave max-lg:hidden">
            Elige tres respuestas y te preparamos el mensaje de WhatsApp. Tú lo envías.
          </p>
        </div>
        <AsistentePresupuesto
          servicios={servicios.map((s) => s.titulo)}
          whatsapp={contacto.whatsapp}
          mensajeGeneral={mensajeInicio(contacto)}
          llamar={
            <BotonLlamada telefono={contacto.telefono} className={cn(llamarBlanco, ALTURA.hero, "w-full lg:w-auto")}>
              Llamar
            </BotonLlamada>
          }
        />
      </div>
    </section>
  );
}
