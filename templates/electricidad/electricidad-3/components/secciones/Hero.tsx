import type { SiteConfig } from "@andrei-leads/core";
import { Star, Zap } from "lucide-react";

import { LlamadaLuz, WhatsApp } from "@/components/BotonesContacto";
import { Foto } from "@/components/Foto";
import { Mancha } from "@/components/Mancha";
import { chip } from "@/lib/estilos";
import { valoracionTexto } from "@/lib/formato";
import { mensajeGeneral } from "@/lib/mensajes";
import { valoracionVisible } from "@/lib/resenas";
import { cn } from "@/lib/utils";

type Props = {
  negocio: Pick<SiteConfig["negocio"], "sector" | "descripcionCorta">;
  contacto: Pick<
    SiteConfig["contacto"],
    "telefono" | "whatsapp" | "mensajeWhatsapp" | "direccion" | "urgencias24h" | "tiempoLlegada" | "fichaGoogle"
  >;
  /** `imagenesHero[0]`: sin foto, el hero es tipográfico. */
  imagen?: SiteConfig["imagenesHero"][number];
  valoracion?: SiteConfig["valoracion"];
};

/** Texto de la valoración: enlace a la ficha de Google (≥ 44 px) o, sin ficha, texto plano. */
function Valoracion({ valoracion, fichaGoogle }: { valoracion: NonNullable<SiteConfig["valoracion"]>; fichaGoogle?: string }) {
  const contenido = (
    <>
      <Star aria-hidden="true" strokeWidth={0} fill="currentColor" className="size-4 flex-none" />
      <span>{valoracionTexto(valoracion)}</span>
    </>
  );
  const clases = "inline-flex min-h-11 items-center gap-1.5 self-start text-[15px] font-semibold text-texto no-underline lg:text-base";
  if (!fichaGoogle) return <p className={cn(clases, "m-0")}>{contenido}</p>;
  return (
    <a href={fichaGoogle} target="_blank" rel="noopener noreferrer" className={cn(clases, "hover:underline hover:underline-offset-4")}>
      {contenido}
      <span className="sr-only">(se abre en otra pestaña)</span>
    </a>
  );
}

/**
 * Hero partido (Specs §2) sobre noche, con una mancha de luz detrás. SIN animación: es lo que pinta el LCP
 * (foto con `priority`, mancha, h1, chips y llamada-luz no llevan data-anim ni transición).
 *
 *  - Móvil con foto: foto 16:9 con contorno orgánico (sin texto encima), chips de estado (solo con dato),
 *    h1 «{sector} en {ciudad}» a 36 px, llamada-luz de 64 px, whatsapp-foto y valoración. A 375×667 el h1
 *    y los dos botones quedan sobre la barra móvil; la valoración «si cabe».
 *    En pantallas bajas (≤ 720 px de alto) la foto pasa a 2:1 para que también quepa la valoración.
 *  - Escritorio con foto: texto a la izquierda y la foto 4:5 (contorno orgánico-b) a la derecha.
 *  - Sin foto: tipográfico (h1 46 → 76 px) con `descripcionCorta` y una mancha grande detrás del h1.
 * La foto va primero en el orden visual del móvil (`order-first`) pero el h1 es lo primero del HTML.
 */
export function Hero({ negocio, contacto, imagen, valoracion }: Props) {
  const conFoto = Boolean(imagen);
  const chips = [
    contacto.urgencias24h ? "Urgencias 24 h" : undefined,
    contacto.tiempoLlegada ? `Llegamos en ${contacto.tiempoLlegada}` : undefined,
  ].filter((c): c is string => Boolean(c));
  const resumen = valoracionVisible(valoracion);

  return (
    <section className="relative flex flex-col pt-4 pb-1 lg:flex-row lg:items-center lg:gap-12 lg:pt-12 lg:pb-2">
      {conFoto ? (
        <Mancha
          forma="a"
          className="top-[118px] -right-[76px] h-[196px] w-[230px] lg:top-[60px] lg:-right-20 lg:h-[380px] lg:w-[440px]"
        />
      ) : (
        <Mancha
          forma="b"
          className="top-1 -left-[96px] h-[330px] w-[400px] lg:top-0 lg:-left-9 lg:h-[460px] lg:w-[720px]"
        />
      )}

      <div
        className={cn(
          "relative z-10 flex min-w-0 flex-col gap-3.5 lg:max-w-[640px] lg:flex-1 lg:basis-0 lg:gap-5",
          !conFoto && "pt-7 lg:pt-10 lg:pb-14"
        )}
      >
        {chips.length > 0 && (
          <ul aria-label="Estado del servicio" className="m-0 flex list-none flex-wrap gap-2 p-0">
            {chips.map((texto) => (
              <li key={texto} className={cn(chip, "lg:min-h-8 lg:pr-3.5")}>
                <Zap aria-hidden="true" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-[15px] flex-none" />
                {texto}
              </li>
            ))}
          </ul>
        )}

        <h1
          className={cn(
            "m-0 leading-[1.05] font-extrabold tracking-[-0.02em] text-balance [overflow-wrap:anywhere] lg:leading-[1.02] lg:tracking-[-0.025em]",
            conFoto ? "text-4xl lg:text-[60px]" : "text-[46px] lg:text-[76px]"
          )}
        >
          {negocio.sector} en {contacto.direccion.ciudad}
        </h1>

        <p
          className={cn(
            "m-0 max-w-[46ch] text-[17px] leading-[1.45] text-pretty text-texto-suave lg:text-[19px]",
            conFoto && "hidden lg:block"
          )}
        >
          {negocio.descripcionCorta}
        </p>

        <div className="flex flex-col gap-2.5 lg:flex-row lg:flex-wrap lg:items-center lg:gap-3">
          <LlamadaLuz telefono={contacto.telefono} />
          {contacto.whatsapp && (
            <WhatsApp numero={contacto.whatsapp} mensaje={mensajeGeneral(contacto)} />
          )}
        </div>

        {resumen && <Valoracion valoracion={resumen} fichaGoogle={contacto.fichaGoogle} />}
      </div>

      {imagen && (
        <div className="relative z-10 order-first mb-3.5 lg:order-last lg:mb-0 lg:flex-none lg:basis-[40%]">
          <Foto
            imagen={imagen}
            proporcion="16/9"
            sizes="(min-width: 1024px) 400px, 100vw"
            priority
            className="max-lg:[@media(max-height:720px)]:aspect-[2/1] lg:aspect-[4/5] lg:rounded-organico-b"
          />
        </div>
      )}
    </section>
  );
}
