import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Pareja } from "@/components/Botones";
import { Foto } from "@/components/base/Foto";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { HeroInterior } from "@/components/secciones/HeroInterior";
import { Precio } from "@/components/secciones/IndiceServicios";
import { Resenas } from "@/components/secciones/Resenas";
import { EnlaceFlecha, Senal } from "@/components/Titular";
import { NumeroTrama, TramaDin } from "@/components/TramaDin";
import { mensajeDeServicio, mensajeInicio } from "@/lib/mensajes";
import { datosCta, lineaConfianza, lineaHorario, numero } from "@/lib/textos";
import { cn } from "@/lib/utils";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

const EN_LETRA = ["Un", "Dos", "Tres", "Cuatro", "Cinco", "Seis", "Siete", "Ocho", "Nueve", "Diez", "Once", "Doce"];

/**
 * /servicios (encargo §7): hero interior y los bloques que se apilan (recurso
 * 5, 0 KB de JS): uno por servicio, cada uno con su pareja-cierre y el mensaje
 * de ese servicio. Después, reseñas cortas y CTA.
 */
export default function Page() {
  const { servicios, contacto } = config;
  const cta = datosCta(contacto, mensajeInicio(contacto));
  const n = servicios.length;
  const fotos = servicios.flatMap((s) => (s.imagenes[0] ? [s.imagenes[0]] : [])).slice(0, 2);
  const cuantos = n === 1 ? "Un servicio" : `${EN_LETRA[n - 1] ?? n} servicios`;
  return (
    <>
      <span data-pagina="servicios" hidden />
      <HeroInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
        ]}
        titulo={
          <>
            Lo que <Senal>instalamos</Senal>.
          </>
        }
        frase={n === 1 ? "La instalación ordenada, documentada y legalizada." : `${cuantos} con el mismo criterio: la instalación ordenada, documentada y legalizada.`}
        cta={cta}
        confianza={lineaConfianza(config)}
        imagenes={fotos}
        numeroPagina="02"
      />

      <section aria-label="Servicios" className="border-t border-[var(--color-linea)]">
        <ol className="apilado m-0 list-none p-0">
          {servicios.map((s, i) => {
            const foto = s.imagenes[0];
            return (
              <li
                key={s.slug}
                style={{ "--i": Math.min(i, 8) } as CSSProperties}
                className={cn("border-t border-[var(--color-linea)] first:border-t-0", i % 2 ? "bg-alterna" : "bg-fondo")}
              >
                <article
                  aria-labelledby={`servicio-${s.slug}`}
                  className="contenedor grid w-full gap-x-[clamp(32px,4vw,64px)] gap-y-8 py-[clamp(40px,3vw+1rem,64px)] lg:grid-cols-2 lg:items-center"
                >
                  <div className="order-2 flex flex-col gap-4 lg:order-1">
                    <p className="etiqueta m-0 text-acento">
                      {numero(i)} / {numero(n - 1)}
                    </p>
                    <h2 id={`servicio-${s.slug}`} className="titulo-seccion">
                      {s.titulo}
                    </h2>
                    <p className="m-0 max-w-[48ch] text-texto-suave">{s.descripcion}</p>
                    {s.precioDesde && <Precio texto={s.precioDesde} />}
                    {s.incluye.length > 0 && (
                      <ul className="m-0 flex list-none flex-col border-b border-[var(--color-linea)] p-0">
                        {s.incluye.slice(0, 3).map((x) => (
                          <li key={x} className="border-t border-[var(--color-linea)] py-2.5 text-[16px]">
                            {x}
                          </li>
                        ))}
                      </ul>
                    )}
                    <Pareja cta={datosCta(contacto, mensajeDeServicio(s))} tamano="cierre" className="mt-2" />
                    <EnlaceFlecha href={`/servicios/${s.slug}`}>
                      Descubrir<span className="sr-only"> {s.titulo}</span>
                    </EnlaceFlecha>
                  </div>
                  <div className="order-1 lg:order-2">
                    {foto ? (
                      <Foto
                        imagen={foto}
                        proporcion="relleno"
                        sizes="(min-width: 1024px) 560px, 100vw"
                        className="aspect-[3/2] w-full lg:ms-auto lg:aspect-[4/5] lg:h-[min(calc(100svh-var(--alto-cabecera)-128px),700px)] lg:w-auto lg:max-w-full"
                        claseEnvoltorio="lg:flex lg:flex-col lg:items-end"
                      />
                    ) : (
                      <TramaDin proporcion="relleno" className="aspect-[3/2] w-full lg:ms-auto lg:aspect-[4/5] lg:h-[min(calc(100svh-var(--alto-cabecera)-128px),700px)] lg:w-auto lg:max-w-full">
                        <NumeroTrama numero={numero(i)} />
                      </TramaDin>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </section>

      <Resenas resenas={config.resenas} valoracion={config.valoracion} corta />
      <CtaFinal cta={cta} confianza={lineaHorario(contacto)} />
    </>
  );
}
