import type { SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { lineaHorario } from "@/lib/textos";

type Props = {
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "horario">;
  mensaje: string;
  titulo?: string;
  /** Ancla de «Empezar de nuevo el configurador ↑»: «#asistente» en el inicio, «/#asistente» fuera. */
  asistente?: string;
};

/**
 * CTA final (encargo §6.11) en el campo pleno: frase grande, la pareja (miel + contorno crema), el
 * horario y, con WhatsApp, «Empezar de nuevo el configurador ↑», que sube al asistente y lo vacía.
 */
export function CtaFinal({ contacto, mensaje, titulo = "Dinos el hueco y te decimos la pieza.", asistente = "/#asistente" }: Props) {
  return (
    <section aria-labelledby="h2-cta" className="campo-pleno px-[clamp(20px,4vw,40px)] py-[clamp(64px,10vw,136px)]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-[22px]">
        <h2 id="h2-cta" className="max-w-[16ch] font-titulo text-display leading-[1.04] font-bold tracking-[-0.03em]">
          {titulo}
        </h2>
        <Pareja contacto={contacto} mensaje={mensaje} tono="pleno" />
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px]">
          <p>{lineaHorario(contacto)}</p>
          {contacto.whatsapp && (
            <a href={asistente} data-asistente="reiniciar" className="enlace">
              Empezar de nuevo el configurador ↑
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
