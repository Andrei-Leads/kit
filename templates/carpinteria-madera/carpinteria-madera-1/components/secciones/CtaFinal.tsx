import type { Imagen } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Foto } from "@/components/base/Foto";
import { TEXTO_WHATSAPP_FOTOS } from "@/lib/mensajes";
import type { DatosCta } from "@/lib/textos";

type Props = { foto?: Imagen; cta: DatosCta; horario: string };

/**
 * CTA final (encargo §6.10): foto de detalle (`imagenesHero[1]` o `galeria[0]`) a sangre con velo y
 * el titular «¿Tienes un hueco que llenar?» con la pareja (Llamar en `claro`). Sin foto, bloque
 * sobre `alterna`. Debajo, el horario en una línea.
 */
export function CtaFinal({ foto, cta, horario }: Props) {
  const titular = (
    <h2 id="titulo-cta" className="titulo-display max-w-[14ch]">
      ¿Tienes un hueco que <em>llenar</em>?
    </h2>
  );
  if (!foto) {
    return (
      <section aria-labelledby="titulo-cta" className="marco mt-[clamp(80px,10vw,160px)] grid gap-6 bg-alterna py-[clamp(64px,8vw,120px)]">
        {titular}
        <Pareja cta={cta} textoWhatsapp={TEXTO_WHATSAPP_FOTOS} />
        <p className="text-[15px] text-texto-suave">{horario}</p>
      </section>
    );
  }
  return (
    <section aria-labelledby="titulo-cta" className="relative mt-[clamp(80px,10vw,160px)] flex min-h-[clamp(520px,44vw,640px)] items-end">
      <Foto imagen={foto} sizes="100vw" proporcion="relleno" posicionEtiqueta="arriba-derecha" className="absolute inset-0">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgb(24_16_10/0.84)_0%,rgb(24_16_10/0.62)_55%,rgb(24_16_10/0.15)_100%)]"
        />
      </Foto>
      <div className="marco relative grid w-full gap-6 py-[clamp(40px,5vw,72px)] text-superficie">
        {titular}
        <Pareja cta={cta} textoWhatsapp={TEXTO_WHATSAPP_FOTOS} sobreFoto />
        <p className="text-[15px]">{horario}</p>
      </div>
    </section>
  );
}
