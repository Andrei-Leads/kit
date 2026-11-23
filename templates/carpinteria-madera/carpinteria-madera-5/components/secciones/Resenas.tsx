import Link from "next/link";
import { fechaResena, mediaVisible, type SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Estrellas } from "@/components/Iconos";
import { mensajeInicio } from "@/lib/mensajes";
import { resenasRecientes, totalResenas, trabajoDelHero } from "@/lib/textos";

type Props = Pick<SiteConfig, "resenas" | "valoracion" | "trabajos" | "contacto"> & {
  /** Pareja de CTA al cierre (inicio y /servicios). */
  conCta?: boolean;
};

/**
 * Reseñas (encargo §6.6): título con la valoración grande, el testimonio del trabajo del hero (o
 * del primero que lo tenga) y las reseñas más recientes en un carril con `scroll-snap`, sin
 * auto-avance. Una reseña larga hace crecer su tarjeta. «Ver todas en Google» solo con
 * `fichaGoogle`. Sin reseñas, no existe.
 */
export function Resenas({ resenas, valoracion, trabajos, contacto, conCta }: Props) {
  if (resenas.length === 0) return null;
  const obra = [trabajoDelHero(trabajos), ...trabajos].find((t) => t?.testimonio);
  const lista = resenasRecientes(resenas, 6);
  return (
    <section aria-labelledby="titulo-resenas" className="py-[clamp(56px,9vw,120px)]">
      <div className="contenedor">
        <p className="antetitulo">Reseñas</p>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <h2 id="titulo-resenas" className="titulo-seccion">
            Lo que dicen de nosotros
          </h2>
          {valoracion && (
            <p className="flex items-baseline gap-2.5">
              <strong className="text-[clamp(2.5rem,2rem+2vw,3.5rem)] leading-none font-[660]">{mediaVisible(valoracion.media)}</strong>
              <span className="text-base text-texto-suave">
                <Estrellas puntuacion={valoracion.media} />
                <br />
                {totalResenas(valoracion.total)} en Google
              </span>
            </p>
          )}
        </div>
        {obra?.testimonio && (
          <figure className="mt-[clamp(32px,5vw,56px)] rounded-tarjeta border border-borde bg-superficie p-[clamp(24px,4vw,48px)]">
            <blockquote className="text-[clamp(1.375rem,1.1rem+1.2vw,2.125rem)] leading-[1.25] font-[520] tracking-[-0.01em] text-balance">
              «{obra.testimonio.texto}»
            </blockquote>
            <figcaption className="mt-4 text-base text-texto-suave">
              {obra.testimonio.autor} ·{" "}
              <Link href={`/trabajos/${obra.slug}`} className="py-[13px] text-texto underline decoration-primario underline-offset-4">
                {obra.titulo}
              </Link>
            </figcaption>
          </figure>
        )}
      </div>
      <ul
        tabIndex={0}
        aria-label="Reseñas de clientes"
        className="carril mx-auto flex max-w-[1280px] snap-x snap-mandatory scroll-px-[clamp(16px,4vw,48px)] gap-4 overflow-x-auto px-[clamp(16px,4vw,48px)] pt-6 pb-2"
      >
        {lista.map((r) => (
          <li
            key={r.autor + r.texto.slice(0, 20)}
            data-aparecer
            className="flex flex-[0_0_min(82%,360px)] snap-start flex-col gap-3 rounded-tarjeta border border-borde bg-superficie px-6 pt-6 pb-7"
          >
            <span role="img" aria-label={`${r.puntuacion} de 5 estrellas`}>
              <Estrellas puntuacion={r.puntuacion} />
            </span>
            <p>{r.texto}</p>
            <p className="mt-auto text-sm text-texto-suave">
              <strong className="font-semibold text-texto">{r.autor}</strong>
              {r.fecha && <> · {fechaResena(r.fecha)}</>}
            </p>
          </li>
        ))}
      </ul>
      <div className="contenedor">
        {contacto.fichaGoogle && (
          <a href={contacto.fichaGoogle} className="enlace mt-2 inline-flex min-h-12 items-center">
            Ver todas en Google <span aria-hidden="true">&nbsp;↗</span>
          </a>
        )}
        {conCta && (
          <Pareja
            cta={{ telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeInicio(contacto) }}
            numeroEnLlamar
            className="mt-6 max-w-[620px]"
          />
        )}
      </div>
    </section>
  );
}
