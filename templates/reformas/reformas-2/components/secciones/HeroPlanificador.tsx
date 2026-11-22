import Link from "next/link";
import { BotonLlamada, telefonoVisible } from "@andrei-leads/core";

import { IconoTelefono } from "@/components/Iconos";
import { Cifras } from "@/components/secciones/Cifras";
import { PlanificadorServidor } from "@/components/secciones/PlanificadorServidor";
import { mensajeInicio } from "@/lib/mensajes";
import { cifras, lineaHorario, lineaValoracion } from "@/lib/textos";
import config from "@/site.config";

/**
 * Hero (sección estrella, encargo §5–6): sin foto, sobre el primario a sangre. h1 «{sector} en
 * {ciudad}», la frase y, a la derecha (debajo en móvil), la tarjeta del planificador con su línea
 * de valoración. Las cifras van bajo el texto en escritorio y bajo la tarjeta en móvil (rejilla con
 * áreas, sin duplicar HTML). Sin WhatsApp: llamada grande y los servicios en píldoras. Nada se
 * anima.
 */
export function HeroPlanificador() {
  const { negocio, contacto, servicios, valoracion } = config;
  const conWa = !!contacto.whatsapp;
  const lista = cifras(config);
  const confianza = valoracion ? lineaValoracion(valoracion) : lineaHorario(contacto);

  return (
    <section
      id="planificador"
      data-sobre-primario=""
      aria-labelledby="h1-inicio"
      className="bg-(--color-fondo-hero) px-[clamp(16px,4vw,40px)] pt-[clamp(76px,3rem+6vw,140px)] pb-[clamp(28px,0.5rem+6vw,96px)] text-sobre-primario"
    >
      <div
        className={
          conWa
            ? "mx-auto grid max-w-[1200px] items-center gap-x-[clamp(32px,5vw,80px)] gap-y-3 [grid-template-areas:'texto'_'tarjeta'_'cifras'] lg:grid-cols-[minmax(0,1fr)_minmax(340px,560px)] lg:[grid-template-areas:'texto_tarjeta'_'cifras_tarjeta']"
            : "mx-auto grid max-w-[1200px] gap-y-3 [grid-template-areas:'texto'_'cifras']"
        }
      >
        <div className="flex min-w-0 flex-col gap-2 [grid-area:texto] lg:self-end">
          <h1 id="h1-inicio" className="font-titulo text-display leading-[1.04] font-semibold tracking-[-0.02em] text-balance">
            {negocio.sector} en {contacto.direccion.ciudad}
          </h1>
          <p className="text-[clamp(1rem,0.9rem+0.5vw,1.375rem)] leading-[1.35] text-pretty">
            {conWa ? "Elige y te dejamos el WhatsApp escrito." : "Cuéntanos tu reforma por teléfono."}
          </p>
          {!conWa && (
            <>
              <div className="mt-4 flex max-w-[480px] flex-col gap-2.5">
                <BotonLlamada
                  telefono={contacto.telefono}
                  className="boton boton-claro min-h-16 font-titulo text-[clamp(1.25rem,1.1rem+0.8vw,1.625rem)] font-semibold shadow-tarjeta"
                >
                  <IconoTelefono />
                  <span>Llamar ·&nbsp;{telefonoVisible(contacto.telefono)}</span>
                </BotonLlamada>
                <p className="text-sm leading-[1.4]">{confianza}</p>
              </div>
              <ul aria-label="Servicios" className="mt-3 flex flex-wrap gap-2">
                {servicios.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/servicios/${s.slug}`}
                      className="flex min-h-11 items-center rounded-full border-[1.5px] border-sobre-primario px-4 text-[15px] font-semibold no-underline"
                    >
                      {s.titulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {conWa && (
          <div className="flex min-w-0 flex-col gap-3 [grid-area:tarjeta]">
            <PlanificadorServidor servicios={servicios} contacto={contacto} mensajeBase={mensajeInicio(contacto)} />
            <p className="flex flex-wrap justify-center gap-x-2 gap-y-0.5 text-center text-sm leading-5">
              {valoracion && (
                <span aria-hidden="true" className="tracking-[1px]">
                  ★★★★★
                </span>
              )}
              <span>{confianza}</span>
            </p>
          </div>
        )}

        <Cifras cifras={lista} className={conWa ? "mt-5 mb-2 [grid-area:cifras] lg:mt-6 lg:mb-0 lg:self-start" : "mt-9 [grid-area:cifras]"} />
      </div>
    </section>
  );
}
