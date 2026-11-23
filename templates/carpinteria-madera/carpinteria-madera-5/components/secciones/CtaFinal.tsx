import type { SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Foto } from "@/components/base/Foto";
import { mensajeInicio } from "@/lib/mensajes";
import { lineaHorario } from "@/lib/textos";

type Props = Pick<SiteConfig, "galeria" | "empresa" | "contacto">;

/**
 * CTA final (encargo §6.9): una pieza terminada en arco 4:5 (la primera de `galeria`; si no, la
 * primera foto del taller) junto al titular grande, la pareja de botones y la línea de horario.
 * Sin foto, un arco dibujado con borde de primario. Sin WhatsApp, la frase pide una llamada en vez de una foto.
 */
export function CtaFinal({ galeria, empresa, contacto }: Props) {
  const foto = galeria[0] ?? empresa.imagenes[0];
  const horario = lineaHorario(contacto.horario);
  return (
    <section aria-labelledby="titulo-cta" className="contenedor seccion">
      <div className="flex flex-wrap items-center gap-[clamp(32px,5vw,80px)]">
        <div className="w-full max-w-[440px] min-w-0 flex-[1_1_280px]">
          {foto ? (
            <Foto imagen={foto} sizes="(min-width: 768px) 440px, 100vw" proporcion="4/5" posicionEtiqueta="arco" />
          ) : (
            <div aria-hidden="true" className="aspect-[4/5] rounded-foto border border-arco" />
          )}
        </div>
        <div className="min-w-0 flex-[1_1_340px]">
          <h2 id="titulo-cta" className="titulo-display">
            ¿Qué pieza quieres recuperar?
          </h2>
          <p className="mt-4 max-w-[40ch] text-texto-suave text-pretty">
            {contacto.whatsapp ? "Mándanos una foto y te decimos qué se puede hacer con ella." : "Llámanos y te decimos qué se puede hacer con ella."}
          </p>
          <Pareja
            cta={{ telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeInicio(contacto) }}
            numeroEnLlamar
            tamano="grande"
            className="mt-7"
          />
          {horario && <p className="mt-3.5 text-[15px] text-texto-suave">{horario}</p>}
        </div>
      </div>
    </section>
  );
}
