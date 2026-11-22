import { minusculaInicial, type SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Pareja";

type Props = {
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp">;
  /** Primer paso del proceso: «Próximo paso · 01 Visita y medición». */
  primerPaso: string;
  /** Horario en una línea («Lunes a viernes, 7:30–15:30 · Sábado, 9:00–13:00»). */
  horario: string;
  mensaje: string;
  titulo?: string;
  textoWhatsapp?: string;
};

/** CTA final «Abre tu obra» (encargo §6.8): sobre la retícula, h2 a tamaño display y la pareja. */
export function CtaFinal({ contacto, primerPaso, horario, mensaje, titulo = "Abre tu obra", textoWhatsapp = "Abre tu obra" }: Props) {
  return (
    <section aria-labelledby="h2-cta" className="reticula border-t border-borde px-(--pad) py-[clamp(64px,3rem+5vw,144px)]">
      <div className="grid max-w-[1040px] justify-items-start gap-5">
        <span className="mono text-xs tracking-[0.08em] text-texto-suave uppercase">Próximo paso · 01 {primerPaso}</span>
        <h2 id="h2-cta" className="mono text-display leading-[1.04] font-medium tracking-[-0.03em]">
          {titulo}
        </h2>
        {horario && <p className="max-w-[52ch] text-cuerpo leading-[1.6] text-texto-suave">Te contestamos en horario de obra: {minusculaInicial(horario)}.</p>}
        <Pareja contacto={contacto} mensaje={mensaje} textoWhatsapp={textoWhatsapp} className="mt-2" />
      </div>
    </section>
  );
}
