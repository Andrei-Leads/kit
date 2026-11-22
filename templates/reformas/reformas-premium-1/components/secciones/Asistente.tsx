import { minusculaInicial, type SiteConfig } from "@andrei-leads/core";

import { Titular } from "@/components/Botones";

import { AsistenteEstancia } from "./AsistenteEstancia";

/**
 * Sección del asistente sobre `--color-tinta-suave` con la espiga (encargo §6.9).
 * Sin WhatsApp, no existe.
 */
export function Asistente({ servicios, contacto }: Pick<SiteConfig, "servicios" | "contacto">) {
  if (!contacto.whatsapp) return null;
  return (
    <section data-tono="oscuro" aria-labelledby="titulo-asistente" className="seccion bg-tinta-suave text-fondo [background-image:var(--textura-espiga)]">
      <div className="contenedor grid gap-x-12 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="etiqueta mb-4 text-texto-claro">Tu reforma en tres preguntas</p>
          <Titular id="titulo-asistente" antes="Cuéntanos tu" destacada="casa" />
          <p className="m-0 mt-5 max-w-[36ch] text-texto-claro">Elige tres respuestas y te dejamos el mensaje escrito. No guardamos nada: se envía desde tu WhatsApp.</p>
        </div>
        <div className="lg:col-span-7">
          <AsistenteEstancia
            servicios={servicios.map((s) => ({ titulo: s.titulo, enFrase: minusculaInicial(s.titulo) }))}
            numero={contacto.whatsapp}
            telefono={contacto.telefono}
          />
        </div>
      </div>
    </section>
  );
}
