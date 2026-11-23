import { BotonLlamada, BotonWhatsApp, mediaVisible, telefonoVisible, type SiteConfig } from "@andrei-leads/core";

import { contorno, grande, Pareja, relleno } from "@/components/Botones";
import { IconoWhatsapp } from "@/components/Iconos";
import { Filete } from "@/components/TituloSeccion";
import { Foto } from "@/components/base/Foto";
import { TEXTO_WHATSAPP } from "@/lib/mensajes";
import { lineaValoracion, totalResenas, type DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  sector: string;
  ciudad: string;
  imagenesHero: SiteConfig["imagenesHero"];
  valoracion: SiteConfig["valoracion"];
  cta: DatosCta;
};

/** «{sector} en *{ciudad}*» (encargo §5): la ciudad en cursiva. */
function Titular({ sector, ciudad }: { sector: string; ciudad: string }) {
  return (
    <>
      {sector} en <em>{ciudad}</em>
    </>
  );
}

/**
 * Hero de «Veta» (encargo §5): foto de detalle a sangre bajo la cabecera, con velo degradado de
 * abajo arriba y el h1 en serif display encima. Móvil: foto de min(78svh, 560px), h1, valoración y
 * WhatsApp relleno dentro de la foto; «Llamar» con contorno justo debajo. Escritorio: foto de
 * clamp(560px, 50vw, 780px), h1 en las 7 columnas de la izquierda y, a su derecha, la valoración y
 * la pareja (Llamar en `claro`, desviación de la entrega). Sin `imagenesHero`, hero tipográfico
 * entre filetes con la valoración en grande. Nada se anima aquí (LCP).
 */
export function Hero({ sector, ciudad, imagenesHero, valoracion, cta }: Props) {
  const [foto] = imagenesHero;
  const { telefono, whatsapp, mensaje } = cta;
  const numero = telefonoVisible(telefono);

  if (!foto) {
    return (
      <section aria-labelledby="titulo-hero" className="marco pt-[clamp(48px,7vw,112px)] pb-[clamp(16px,2vw,32px)]">
        <Filete />
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6 py-[clamp(32px,4vw,56px)]">
          <h1 id="titulo-hero" className="titulo-display min-w-0 flex-[1_1_560px]">
            <Titular sector={sector} ciudad={ciudad} />
          </h1>
          {valoracion && (
            <p className="grid flex-[0_1_auto] gap-0.5">
              <span className="font-titulo text-[clamp(3rem,2rem+3vw,5rem)] leading-none italic">{mediaVisible(valoracion.media)}</span>
              <span className="text-[15px] text-texto-suave">{totalResenas(valoracion.total)} en Google</span>
            </p>
          )}
        </div>
        <Filete className="mb-7" />
        <Pareja cta={cta} />
      </section>
    );
  }

  return (
    <section aria-labelledby="titulo-hero">
      <div className="relative h-[min(78svh,560px)] lg:h-[clamp(560px,50vw,780px)]">
        <Foto
          imagen={foto}
          sizes="100vw"
          proporcion="relleno"
          preload
          calidad={60}
          posicionEtiqueta="arriba-derecha"
          className="absolute inset-0"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,rgb(24_16_10/0.86)_0%,rgb(24_16_10/0.62)_52%,rgb(24_16_10/0)_82%)] lg:bg-[linear-gradient(to_top,rgb(24_16_10/0.82)_0%,rgb(24_16_10/0.6)_45%,rgb(24_16_10/0)_78%)]"
          />
        </Foto>
        <div className="marco absolute inset-x-0 bottom-0 grid items-end gap-3.5 pb-6 text-superficie lg:grid-cols-12 lg:gap-6 lg:pb-[clamp(40px,4.5vw,64px)]">
          <h1 id="titulo-hero" className="titulo-display leading-none tracking-[-0.025em] lg:col-span-7 lg:leading-[0.98] lg:tracking-[-0.03em]">
            <Titular sector={sector} ciudad={ciudad} />
          </h1>
          <div className="grid gap-3.5 lg:col-span-5 lg:col-start-8 lg:pb-1.5">
            {valoracion && <p className="text-[15px]">{lineaValoracion(valoracion)}</p>}
            {/* Móvil: el CTA principal dentro de la foto (sin WhatsApp, la llamada en relleno). */}
            <div className="lg:hidden">
              {whatsapp ? (
                <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(relleno, grande, "w-full")}>
                  <IconoWhatsapp />
                  {TEXTO_WHATSAPP}
                </BotonWhatsApp>
              ) : (
                <BotonLlamada telefono={telefono} className={cn(relleno, grande, "w-full")}>
                  Llamar · {numero}
                </BotonLlamada>
              )}
            </div>
            {/* Escritorio: la pareja con Llamar en `claro` sobre el velo. */}
            <Pareja cta={cta} sobreFoto className="max-lg:hidden" />
          </div>
        </div>
      </div>
      {whatsapp && (
        <div className="marco pt-3 lg:hidden">
          <BotonLlamada telefono={telefono} className={cn(contorno, grande, "w-full")}>
            Llamar · {numero}
          </BotonLlamada>
        </div>
      )}
    </section>
  );
}
