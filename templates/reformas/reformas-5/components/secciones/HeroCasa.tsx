import { BotonLlamada, BotonWhatsApp, type SiteConfig } from "@andrei-leads/core";

import { llamarBlanco, llamarContorno, waClaro, waPrimario } from "@/components/Botones";
import { IconoTelefono, IconoWhatsapp } from "@/components/Iconos";
import { MedioHero } from "@/components/base/MedioHero";
import { Valoracion } from "@/components/secciones/Valoracion";
import { TEXTO_WHATSAPP } from "@/lib/mensajes";
import { textoLlamar } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  config: SiteConfig;
  mensaje: string;
};

/**
 * Hero de «Tu casa» (encargo §5 y §6.1). Con `videoHero` o `imagenesHero[0]`: medio a
 * sangre bajo la cabecera, velo, curva inferior y `data-hero="medio"` (la cabecera se
 * vuelve transparente). Sin fotos: hero tipográfico dentro de un gran arco de arcilla.
 * El h1 es «{sector} en {ciudad}»; el h1, la valoración, los botones y el póster no se animan.
 */
export function HeroCasa({ config, mensaje }: Props) {
  const { negocio, contacto, valoracion, videoHero, imagenesHero } = config;
  const ciudad = contacto.direccion.ciudad;
  const { telefono, whatsapp } = contacto;
  const medio = videoHero ?? imagenesHero[0];

  if (medio) {
    return (
      <section data-hero="medio" aria-labelledby="titulo-hero" className="hero-curva sobre-oscuro relative h-[min(calc(100svh-64px),680px)] min-h-[560px] overflow-hidden bg-[#5a4535] text-white lg:h-[min(88vh,800px)] lg:min-h-[600px]">
        <MedioHero video={videoHero} imagen={imagenesHero[0]} sizes="100vw" className="absolute inset-0 rounded-none">
          <div aria-hidden="true" className="absolute inset-0 bg-(image:--velo-hero)" />
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[140px] bg-(image:--velo-cabecera)" />
        </MedioHero>
        <div className="contenedor absolute inset-x-0 bottom-0 z-[3] pb-[52px] lg:pb-[84px]">
          <div className="flex flex-col gap-3.5 lg:max-w-[620px]">
            <p className="m-0 text-[15px] font-semibold tracking-[0.02em]">
              {negocio.sector} · {ciudad}
            </p>
            <h1 id="titulo-hero" className="titulo-display">
              {negocio.sector} en {ciudad}
            </h1>
            {valoracion && <Valoracion valoracion={valoracion} claras />}
            <div className="mt-1.5 flex flex-col gap-3 lg:flex-row">
              {whatsapp ? (
                <>
                  <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={cn(waClaro, "w-full lg:w-auto")}>
                    <IconoWhatsapp />
                    {TEXTO_WHATSAPP}
                  </BotonWhatsApp>
                  <BotonLlamada telefono={telefono} className={cn(llamarBlanco, "w-full lg:w-auto")}>
                    <IconoTelefono tamano={19} />
                    {textoLlamar(telefono)}
                  </BotonLlamada>
                </>
              ) : (
                <BotonLlamada telefono={telefono} className={cn(waClaro, "w-full lg:w-auto")}>
                  <IconoTelefono tamano={19} />
                  {textoLlamar(telefono)}
                </BotonLlamada>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="titulo-hero" className="contenedor pt-4 pb-10">
      <div className="domo flex flex-col items-center gap-3 bg-alterna px-[clamp(20px,4vw,64px)] pt-14 pb-[clamp(24px,4vw,56px)] text-center [--ancho-domo:640px] lg:pt-32">
        <p className="m-0 text-sm font-semibold tracking-[0.02em] text-texto-suave">
          {negocio.sector} · {ciudad}
        </p>
        <h1 id="titulo-hero" className="titulo-display">
          {negocio.sector} en {ciudad}
        </h1>
        {negocio.descripcionCorta && <p className="m-0 max-w-[36ch] text-base leading-normal text-texto-suave">{negocio.descripcionCorta}</p>}
        {valoracion && <Valoracion valoracion={valoracion} className="justify-center text-[15px]" />}
        <div className="mt-1.5 flex w-full flex-col gap-2.5 lg:w-auto lg:flex-row">
          {whatsapp ? (
            <>
              <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={waPrimario}>
                <IconoWhatsapp />
                {TEXTO_WHATSAPP}
              </BotonWhatsApp>
              <BotonLlamada telefono={telefono} className={llamarContorno}>
                {textoLlamar(telefono)}
              </BotonLlamada>
            </>
          ) : (
            <BotonLlamada telefono={telefono} className={waPrimario}>
              {textoLlamar(telefono)}
            </BotonLlamada>
          )}
        </div>
      </div>
    </section>
  );
}
