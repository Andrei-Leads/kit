import { fechaResena, mediaVisible, type SiteConfig } from "@andrei-leads/core";

import { ParCta } from "@/components/Botones";

type Props = Pick<SiteConfig, "resenas" | "valoracion"> & {
  contacto: SiteConfig["contacto"];
  /** Pareja Llamar + WhatsApp al final (solo en el inicio). */
  mensajeCta?: string;
};

/**
 * Reseñas como burbujas entrantes (columnas CSS), con autor, fecha y estrellas debajo, como un
 * mensaje. La valoración encima, en grande. Las 6 más recientes. Sin reseñas, nada.
 */
export function Resenas({ resenas, valoracion, contacto, mensajeCta }: Props) {
  if (resenas.length === 0) return null;
  const recientes = [...resenas].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? "")).slice(0, 6);
  return (
    <section aria-labelledby="h-resenas" className="bg-alterna py-[clamp(48px,2.5rem+3vw,104px)]">
      <div className="contenedor flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div>
            <h2 id="h-resenas" className="m-0 mb-2 text-h2 leading-[1.1] font-black">
              Lo que nos escriben
            </h2>
            {valoracion && (
              <p className="m-0 flex flex-wrap items-baseline gap-2.5">
                <span className="text-[clamp(2.75rem,2.2rem+2vw,4rem)] leading-none font-black tracking-[-0.02em]">{mediaVisible(valoracion.media)}</span>
                <span aria-hidden="true" className="text-[22px] tracking-[2px]">
                  {"★".repeat(Math.round(valoracion.media)) + "☆".repeat(5 - Math.round(valoracion.media))}
                </span>
                <span className="font-bold text-texto-suave">
                  <span className="sr-only">de 5, </span>
                  {valoracion.total} reseñas en Google
                </span>
              </p>
            )}
          </div>
          {contacto.fichaGoogle && (
            <a
              href={contacto.fichaGoogle}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center font-extrabold underline underline-offset-[3px]"
            >
              Ver todas en Google <span aria-hidden="true">&nbsp;→</span>
            </a>
          )}
        </div>
        <ul className="m-0 list-none columns-[3_300px] gap-x-4 p-0">
          {recientes.map((r, i) => (
            <li key={`${r.autor}-${i}`} data-aparecer className="mb-[18px] break-inside-avoid">
              <figure className="m-0">
                <blockquote className="m-0 bg-superficie px-[18px] py-3.5 leading-normal burbuja-entra">{r.texto}</blockquote>
                <figcaption className="flex flex-wrap gap-x-2 gap-y-1 px-3 pt-1.5 text-sm text-texto-suave">
                  <strong className="text-texto">{r.autor}</strong>
                  {r.fecha && <span>{fechaResena(r.fecha)}</span>}
                  <span aria-hidden="true">{"★".repeat(Math.round(r.puntuacion)) + "☆".repeat(5 - Math.round(r.puntuacion))}</span>
                  <span className="sr-only">{r.puntuacion} de 5 estrellas</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        {mensajeCta && <ParCta contacto={contacto} mensaje={mensajeCta} className="max-w-[560px]" />}
      </div>
    </section>
  );
}
