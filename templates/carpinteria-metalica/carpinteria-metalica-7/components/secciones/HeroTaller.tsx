import { BotonLlamada, BotonWhatsApp, telefonoVisible, type Imagen, type SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { IconoWhatsApp } from "@/components/Iconos";
import { valoracionCorta } from "@/lib/textos";

type Props = {
  titulo: string;
  foto?: Imagen;
  valoracion?: SiteConfig["valoracion"];
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp">;
  mensaje: string;
};

const BOTONES = "mt-4 grid max-w-[640px] grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-3 gap-y-2";

/**
 * HeroTaller (encargo §6): foto a sangre (72 svh en móvil, 92 svh en escritorio) con velo de
 * abajo arriba y corte diagonal; anclados abajo, el h1 «{sector} en {ciudad}», la valoración y
 * los dos botones. Sin foto, la versión «taller cerrado»: h1 gigante sobre el óxido con grano y
 * una banda diagonal de hierro con los botones. Nada se anima (LCP y conversión).
 */
export function HeroTaller({ titulo, foto, valoracion, contacto, mensaje }: Props) {
  const tel = telefonoVisible(contacto.telefono);

  const chip = (clase: string) =>
    valoracion && (
      <p className={`inline-flex h-8 items-center gap-2 px-3 font-titulo text-base font-bold tracking-[0.05em] uppercase ${clase}`}>
        <span aria-hidden="true" className="text-acento">
          ★
        </span>
        {valoracionCorta(valoracion)}
        <span className="sr-only"> en Google</span>
      </p>
    );

  if (!foto) {
    return (
      <header className="pt-[clamp(96px,9vw,150px)]">
        <div className="contenedor">
          <h1 className="max-w-[11ch] font-titulo text-[clamp(3rem,1rem+10vw,9rem)] leading-[0.88] font-extrabold text-balance uppercase [overflow-wrap:anywhere]">
            {titulo}
          </h1>
        </div>
        <div className="hierro banda-arriba mt-6 pt-[calc(var(--diagonal)+18px)] pb-7">
          <div className="contenedor">
            {chip("border border-borde")}
            <div className={BOTONES}>
              {contacto.whatsapp && (
                <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensaje} className="boton boton-chispa">
                  <IconoWhatsApp />
                  Mándanos una foto del sitio
                </BotonWhatsApp>
              )}
              <BotonLlamada
                telefono={contacto.telefono}
                className={contacto.whatsapp ? "boton boton-contorno-claro self-end" : "boton boton-chispa"}
              >
                {contacto.whatsapp ? "Llamar al taller" : <>Llamar al taller ·&nbsp;{tel}</>}
              </BotonLlamada>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="relative h-[max(72svh,480px)] bg-[#15110e] lg:h-[max(92svh,640px)]">
      <div className="banda-abajo absolute inset-0">
        <Foto
          imagen={foto}
          sizes="100vw"
          proporcion="relleno"
          preload
          quality={60}
          className="absolute inset-0"
          claseEtiqueta="top-[76px] left-4 lg:left-10"
        >
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(17_13_11/0.95)_0%,rgb(17_13_11/0.78)_38%,rgb(17_13_11/0.2)_70%,rgb(17_13_11/0)_100%)]" />
        </Foto>
      </div>
      <div className="absolute inset-x-0 bottom-0 pb-[calc(24px+var(--diagonal))]">
        <div className="contenedor text-sobre-hierro">
          <h1 className="display max-w-[12ch] tracking-[0.005em] [overflow-wrap:anywhere]">{titulo}</h1>
          {chip("mt-3 bg-superficie")}
          <div className={BOTONES}>
            {contacto.whatsapp ? (
              <>
                <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensaje} className="boton boton-chispa">
                  <IconoWhatsApp />
                  Mándanos una foto del sitio
                </BotonWhatsApp>
                <BotonLlamada telefono={contacto.telefono} className="boton boton-hierro-contorno self-end">
                  Llamar al taller
                </BotonLlamada>
              </>
            ) : (
              <BotonLlamada telefono={contacto.telefono} className="boton boton-chispa">
                Llamar al taller ·&nbsp;{tel}
              </BotonLlamada>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
