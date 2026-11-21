import type { SiteConfig } from "@andrei-leads/core";

import { LlamadaCierre, LlamadaGrande, WhatsappSobreTinta } from "@/components/Botones";
import { horarioLinea } from "@/lib/formato";

type Props = {
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "urgencias24h" | "tiempoLlegada" | "horario">;
  mensaje: string;
  titulo?: string;
  textoWhatsapp?: string;
  /** "grande": número a tamaño titular (inicio); "cierre": botones de una línea apilados a todo el ancho (fichas). */
  variante?: "grande" | "cierre";
};

/**
 * CTA final: banda tinta cortada en diagonal arriba: «Estamos cerca. Llama.», llamada-cta en primario
 * y WhatsApp en contorno claro, con el horario debajo.
 */
export function CtaFinal({
  contacto,
  mensaje,
  titulo = "Estamos cerca. Llama.",
  textoWhatsapp = "Envíanos una foto por WhatsApp",
  variante = "grande",
}: Props) {
  return (
    <section className="banda-arriba sobre-tinta mt-4 px-5 pt-[calc(10.5vw+32px)] pb-14 lg:mt-6 lg:px-8 lg:pb-24">
      <div className="mx-auto grid max-w-(--container-contenido) items-end gap-5 lg:grid-cols-2 lg:gap-12">
        <h2 className="m-0 font-titulo text-[40px] leading-[1.02] font-bold tracking-[-0.025em] lg:text-display lg:leading-[0.98] lg:tracking-[-0.035em]">
          {titulo}
        </h2>
        <div className="flex flex-col gap-2.5 lg:gap-3.5">
          <div className={variante === "grande" ? "flex flex-col gap-2.5 lg:flex-row lg:flex-wrap lg:items-stretch lg:gap-3" : "flex flex-col gap-2.5 lg:gap-3"}>
            {variante === "grande" ? (
              <LlamadaGrande contacto={contacto} className="focus-visible:shadow-[0_0_0_2px_var(--color-tinta)]" />
            ) : (
              <LlamadaCierre contacto={contacto} alto="min-h-16" className="focus-visible:shadow-[0_0_0_2px_var(--color-tinta)]" />
            )}
            {contacto.whatsapp && (
              <WhatsappSobreTinta numero={contacto.whatsapp} mensaje={mensaje}>
                {textoWhatsapp}
              </WhatsappSobreTinta>
            )}
          </div>
          <p className="m-0 text-sm lg:text-[15px]">{horarioLinea(contacto)}</p>
        </div>
      </div>
    </section>
  );
}
