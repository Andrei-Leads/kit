import Link from "next/link";
import type { SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { lineaHorario } from "@/lib/textos";

type Props = {
  contacto: SiteConfig["contacto"];
  mensaje: string;
  titulo?: string;
  textoWhatsapp?: string;
  /** «o empieza a planificar ↑» (inicio, servicios, trabajos y empresa; no en las fichas). */
  planificar?: boolean;
};

/** CTA final sobre terracota pleno: WhatsApp (relleno blanco) + Llamar (contorno) y el horario. */
export function CtaFinal({ contacto, mensaje, titulo = "Empieza por lo que quieres cambiar", textoWhatsapp, planificar = true }: Props) {
  return (
    <section
      data-sobre-primario=""
      aria-labelledby="h2-cta"
      className="mt-[clamp(56px,2rem+5vw,112px)] bg-(--color-fondo-hero) px-[clamp(16px,4vw,40px)] py-[clamp(56px,2rem+5vw,120px)] text-sobre-primario"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-6">
        <h2 id="h2-cta" className="max-w-[16ch] font-titulo text-[clamp(2rem,1.3rem+3vw,4rem)] leading-[1.05] font-semibold tracking-[-0.02em] text-balance">
          {titulo}
        </h2>
        <div className="flex w-full max-w-[600px] flex-col gap-2.5">
          <Pareja contacto={contacto} mensaje={mensaje} textoWhatsapp={textoWhatsapp} tono="sobre" nota={lineaHorario(contacto)} className="max-w-none" />
          {planificar && contacto.whatsapp && (
            <Link href="/#planificador" className="inline-flex min-h-11 items-center self-start font-semibold underline underline-offset-4">
              o empieza a planificar ↑
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
