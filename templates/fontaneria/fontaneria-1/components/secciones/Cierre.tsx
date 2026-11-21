import { ParCta } from "@/components/ParCta";

type Props = {
  frase: string;
  telefono: string;
  whatsapp?: string;
  mensaje: string;
  textoLlamar: string;
  confianza: string;
};

/** Cierre entre secciones (v2): una frase en condensada y la pareja de llamada y WhatsApp. */
export function Cierre({ frase, ...par }: Props) {
  return (
    <section className="border-t border-borde">
      <div className="contenedor flex flex-wrap items-center gap-x-12 gap-y-4 py-7">
        <p className="condensada flex-[1_1_240px] text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-[1.02] text-balance">{frase}</p>
        <div className="min-w-0 max-w-[680px] flex-[3_1_520px]">
          <ParCta {...par} />
        </div>
      </div>
    </section>
  );
}
