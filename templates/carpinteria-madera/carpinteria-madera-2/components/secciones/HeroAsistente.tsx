import Link from "next/link";
import { BotonLlamada, telefonoVisible } from "@andrei-leads/core";

import { AsistenteServidor } from "@/components/secciones/AsistenteServidor";
import { Cifras } from "@/components/secciones/Cifras";
import { FotoHeroEscritorio } from "@/components/secciones/FotoHeroEscritorio";
import { IconoTelefono } from "@/components/Iconos";
import { mensajeInicio } from "@/lib/mensajes";
import { cifras, lineaValoracion } from "@/lib/textos";
import { cn } from "@/lib/utils";
import config from "@/site.config";

/**
 * Hero (sección estrella, encargo §5–6): el asistente es la portada, sobre el campo pleno. A la
 * izquierda, h1 «{sector} en {ciudad}», la valoración y «o llámanos al {teléfono}» (entre el h1 y la
 * tarjeta: nada animado entre los dos); en escritorio, las cifras debajo. A la derecha, la tarjeta
 * del asistente y, detrás asomando, la foto ancla (solo escritorio). En móvil, las cifras van bajo
 * la tarjeta (rejilla con áreas, sin duplicar HTML). Sin WhatsApp: «¿Qué necesitas?» con los
 * servicios como enlaces y una llamada grande. Nada de esto se anima.
 */
export function HeroAsistente() {
  const { negocio, contacto, servicios, valoracion, imagenesHero } = config;
  const tel = telefonoVisible(contacto.telefono);
  const foto = imagenesHero[0];
  const lista = cifras(config);

  return (
    <section
      aria-labelledby="h1-inicio"
      // Con un nombre de más de 28 caracteres la cápsula móvil ocupa tres líneas: el h1 baja 24 px.
      className={cn("campo-pleno px-[clamp(20px,4vw,40px)] pt-[92px] pb-[clamp(48px,7vw,96px)]", negocio.nombre.length > 28 && "max-lg:pt-[116px]")}
    >
      <div
        className="mx-auto grid max-w-[1200px] gap-x-[clamp(20px,4vw,56px)] gap-y-6 [grid-template-areas:'texto'_'tarjeta'_'cifras'] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:[grid-template-areas:'texto_tarjeta'_'cifras_tarjeta'] lg:[grid-template-rows:auto_1fr]"
      >
        <div className="flex min-w-0 flex-col gap-3.5 [grid-area:texto] lg:pt-12">
          <h1 id="h1-inicio" className="font-titulo text-h1-inicio leading-[1.04] font-bold tracking-[-0.03em]">
            {negocio.sector} en {contacto.direccion.ciudad}
          </h1>
          {valoracion && (
            <p className="flex items-center gap-2 text-[15px] font-semibold">
              <span aria-hidden="true" className="tracking-[1px] text-acento">
                ★★★★★
              </span>
              {lineaValoracion(valoracion)}
            </p>
          )}
          <BotonLlamada telefono={contacto.telefono} className="boton boton-compacto boton-contorno-pleno mt-1 self-start px-[22px] text-base">
            o llámanos al&nbsp;{tel}
          </BotonLlamada>
        </div>

        <div className={cn("relative min-w-0 [grid-area:tarjeta]", foto && "lg:pt-14")}>
          {foto && <FotoHeroEscritorio imagen={foto} />}
          <div className={cn("relative z-[1]", foto && "lg:mr-24")}>
            {contacto.whatsapp ? (
              <AsistenteServidor servicios={servicios} whatsapp={contacto.whatsapp} mensajeBase={mensajeInicio(contacto)} />
            ) : (
              <div className="tarjeta-clara rounded-tarjeta bg-superficie px-5 pt-[22px] pb-5 shadow-tarjeta">
                <h2 className="mb-3.5 font-titulo text-[clamp(1.375rem,1.2rem+0.6vw,1.75rem)] font-bold tracking-[-0.015em]">¿Qué necesitas?</h2>
                <ul className="mb-4 grid grid-cols-[repeat(auto-fill,minmax(min(100%,220px),1fr))] gap-2.5">
                  {servicios.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/servicios/${s.slug}`}
                        className="flex min-h-14 items-center justify-between gap-2.5 rounded-full border-2 border-borde px-5 py-2 font-semibold no-underline hover:border-texto"
                      >
                        {s.titulo}
                        <span aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <BotonLlamada telefono={contacto.telefono} className="boton boton-primario w-full text-lg">
                  <IconoTelefono />
                  Llamar al&nbsp;{tel}
                </BotonLlamada>
              </div>
            )}
          </div>
        </div>

        <Cifras cifras={lista} className="mt-6 [grid-area:cifras] lg:mt-[clamp(24px,3vw,40px)] lg:self-start" />
      </div>
    </section>
  );
}
