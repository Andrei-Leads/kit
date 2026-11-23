import { pasosProceso, type SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { VideoTaller } from "@/components/VideoTaller";
import { Foto } from "@/components/base/Foto";
import { mensajeInicio } from "@/lib/mensajes";

type Props = Pick<SiteConfig, "proceso" | "videoPano" | "empresa" | "contacto"> & {
  /** Pareja de CTA al cierre (solo en el inicio). */
  conCta?: boolean;
  /** /empresa: las fotos del taller ya salen arriba; sin vídeo, los pasos van solos. */
  sinFoto?: boolean;
};

/**
 * «En el taller» (encargo §5 y §6.4): los pasos de `proceso` (o los 4 de core para proyecto) en
 * lista numerada junto al vídeo del lijado (`videoPano`) en un arco 4:5 en móvil y 16:9 en
 * escritorio, con su póster (sin JS, con «reducir movimiento» o ahorro de datos, solo el póster).
 * Sin vídeo, la primera foto de `empresa.imagenes` en un arco 4:5; sin ella, los pasos solos.
 */
export function EnElTaller({ proceso, videoPano, empresa, contacto, conCta, sinFoto }: Props) {
  const pasos = pasosProceso(proceso, "proyecto");
  const foto = !videoPano && !sinFoto ? empresa.imagenes[0] : undefined;
  return (
    <section aria-labelledby="titulo-taller">
      <div className="contenedor seccion">
        <p className="antetitulo">En el taller</p>
        <h2 id="titulo-taller" className="titulo-seccion mb-[clamp(28px,4vw,48px)]">
          Así trabajamos
        </h2>
        <div className="flex flex-wrap items-center gap-[clamp(32px,5vw,72px)]">
          {videoPano && (
            <div className="min-w-0 flex-[1.4_1_340px]">
              <Foto
                imagen={videoPano.poster}
                sizes="(min-width: 1280px) 660px, (min-width: 1024px) 55vw, 100vw"
                proporcion="4/5"
                posicionEtiqueta="ninguna"
                className="lg:aspect-video"
              >
                <VideoTaller src={videoPano.src} srcAv1={videoPano.srcAv1} />
                {videoPano.poster.origen === "ia" && (
                  <span className="pointer-events-none absolute right-4 bottom-[22px] z-[2] rounded-boton bg-etiqueta px-[9px] py-1 text-[11px] font-medium text-texto">
                    Vídeo generado con IA
                  </span>
                )}
              </Foto>
            </div>
          )}
          {foto && (
            <div className="min-w-0 max-w-[460px] flex-[1_1_300px]">
              <Foto imagen={foto} sizes="(min-width: 1024px) 460px, 100vw" proporcion="4/5" />
            </div>
          )}
          <ol className="flex min-w-0 flex-[1_1_320px] flex-col gap-[22px]">
            {pasos.map((p, i) => (
              <li key={p.titulo} className="grid grid-cols-[44px_minmax(0,1fr)] items-start gap-4">
                <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-full border-[1.5px] border-borde text-[17px] font-[640] text-acento">
                  {i + 1}
                </span>
                <div>
                  <h3 className="mt-2 leading-[1.3] font-[620]">{p.titulo}</h3>
                  <p className="mt-1 text-base leading-[1.55] text-texto-suave">{p.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        {conCta && (
          <Pareja
            cta={{ telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeInicio(contacto) }}
            numeroEnLlamar
            className="mt-[clamp(40px,6vw,64px)] max-w-[620px]"
          />
        )}
      </div>
    </section>
  );
}
