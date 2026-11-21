import { Onda } from "@/components/Onda";
import { Pareja } from "@/components/Pareja";
import type { DatosCta } from "@/lib/textos";

type Props = {
  cta: DatosCta;
  titulo?: string;
  textoWhatsapp?: string;
};

/** CTA final: bloque tinta con borde superior ondulado, título en Fraunces, llamada-cta y WhatsApp en contorno. */
export function CtaFinal({ cta, titulo = "¿Te lo miramos hoy?", textoWhatsapp }: Props) {
  return (
    <section aria-labelledby="titulo-cta" className="mt-[clamp(1rem,0.5rem+2vw,3rem)]">
      <Onda className="-mb-px text-tinta" />
      <div className="sobre-tinta bg-tinta pt-[clamp(3.5rem,2.5rem+4vw,7rem)] pb-[clamp(2.5rem,2rem+2vw,4rem)] text-sobre-tinta">
        <div className="contenedor">
          <h2 id="titulo-cta" className="m-0 max-w-[14ch] font-titulo text-display font-medium tracking-[-0.025em] text-balance">
            {titulo}
          </h2>
          <Pareja cta={cta} variante="cta" textoWhatsapp={textoWhatsapp} className="mt-[clamp(2rem,1.5rem+2vw,3rem)]" />
        </div>
      </div>
    </section>
  );
}
