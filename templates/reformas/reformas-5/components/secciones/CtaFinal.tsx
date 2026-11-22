import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";

import { llamarSobrePrimario, waClaro } from "@/components/Botones";
import { cn } from "@/lib/utils";
import { IconoTelefono, IconoWhatsapp } from "@/components/Iconos";
import { TEXTO_WHATSAPP } from "@/lib/mensajes";
import { textoLlamar, type DatosCta } from "@/lib/textos";

type Props = {
  cta: DatosCta;
  titulo?: string;
  texto?: string;
  textoWhatsapp?: string;
};

/** CTA final dentro de un gran arco primario con sobre-primario (encargo §6.8). */
export function CtaFinal({
  cta,
  titulo = "Cuéntanos tu casa",
  texto = "Mándanos unas fotos y unas medidas por WhatsApp y te decimos por dónde empezar.",
  textoWhatsapp = TEXTO_WHATSAPP,
}: Props) {
  const { telefono, whatsapp, mensaje } = cta;
  return (
    <section aria-labelledby="titulo-cta" className="contenedor pt-[clamp(4.5rem,3rem+6vw,8rem)] pb-[clamp(4.5rem,3rem+6vw,7rem)]">
      <div className="domo sobre-primario flex flex-col items-center gap-4 bg-primario px-[clamp(24px,5vw,72px)] pt-[84px] pb-[clamp(32px,5vw,64px)] text-center text-sobre-primario [--ancho-domo:700px] lg:pt-[150px]">
        <h2 id="titulo-cta" className="titulo-seccion">
          {titulo}
        </h2>
        <p className="m-0 mb-1.5 max-w-[34ch]">{whatsapp ? texto : "Llámanos y te decimos por dónde empezar."}</p>
        <div className="flex w-full max-w-[400px] flex-col gap-2.5">
          {whatsapp && (
            <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(waClaro, "px-6")}>
              <IconoWhatsapp />
              {textoWhatsapp}
            </BotonWhatsApp>
          )}
          <BotonLlamada telefono={telefono} className={whatsapp ? llamarSobrePrimario : cn(waClaro, "px-6")}>
            <IconoTelefono tamano={19} />
            {textoLlamar(telefono)}
          </BotonLlamada>
        </div>
      </div>
    </section>
  );
}
