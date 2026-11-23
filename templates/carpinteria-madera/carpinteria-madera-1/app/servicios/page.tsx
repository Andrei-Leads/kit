import type { Metadata } from "next";
import Link from "next/link";
import { metadatosPagina } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Filete } from "@/components/TituloSeccion";
import { Foto } from "@/components/base/Foto";
import { lineaValoracion, numero, resenasRecientes } from "@/lib/textos";
import { mensajeInicio } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/**
 * /servicios (encargo §7): h1 en serif gigante y una frase; lista editorial de todos los servicios
 * con foto 4:5 alternando izquierda y derecha en escritorio (sin foto, el número en cursiva); la
 * reseña más reciente y la pareja.
 */
export default function Page() {
  const { servicios, contacto, valoracion } = config;
  const [resena] = resenasRecientes(config.resenas);
  const cta = { telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeInicio(contacto) };
  return (
    <div data-pagina="servicios">
      <section className="marco pt-[clamp(56px,8vw,128px)]">
        <h1 className="titulo-display">
          Lo que hacemos <em>a medida</em>
        </h1>
        <p className="mt-5 max-w-[52ch] text-texto-suave">Todo se fabrica en nuestro taller y lo montamos nosotros en tu casa.</p>
        <Filete className="mt-8" />
      </section>
      <ul>
        {servicios.map((s, i) => (
          <li key={s.slug} className="border-b border-filete">
            <Link
              href={`/servicios/${s.slug}`}
              className={`con-flecha marco flex flex-wrap items-center gap-x-[clamp(32px,5vw,80px)] gap-y-6 py-[clamp(32px,5vw,64px)] text-texto no-underline ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              {s.imagenes[0] ? (
                <Foto
                  imagen={s.imagenes[0]}
                  sizes="(min-width: 1024px) 520px, 100vw"
                  proporcion="4/5"
                  decorativa
                  className="max-w-[520px] flex-[1_1_300px]"
                />
              ) : (
                <span aria-hidden="true" className="max-w-[520px] flex-[1_1_300px] font-titulo text-[clamp(5rem,3rem+6vw,9rem)] leading-none text-primario-texto italic">
                  {numero(i)}
                </span>
              )}
              <div className="grid flex-[1_1_300px] gap-3">
                <h2 className="titulo-h2">{s.titulo}</h2>
                <span className="max-w-[44ch] text-texto-suave">{s.descripcion}</span>
                <span className="text-[15px] underline underline-offset-4">
                  Ver el servicio <span aria-hidden="true" className="flecha">→</span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <section aria-label="Opinión de un cliente y contacto" className="marco py-[clamp(56px,7vw,96px)]">
        {resena && (
          <figure className="mb-10">
            <blockquote className="font-titulo text-[clamp(1.75rem,1.3rem+2vw,3rem)] leading-[1.15] text-balance italic">«{resena.texto}»</blockquote>
            <figcaption className="mt-3 text-[15px] text-texto-suave">
              {resena.autor}
              {valoracion && <> · {lineaValoracion(valoracion)}</>}
            </figcaption>
          </figure>
        )}
        <Pareja cta={cta} />
      </section>
    </div>
  );
}
