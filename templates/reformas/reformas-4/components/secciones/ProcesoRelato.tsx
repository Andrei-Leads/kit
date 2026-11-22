import type { Paso, SiteConfig, Video } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Pareja } from "@/components/Pareja";
import { Rotulo } from "@/components/Rotulo";
import { VideoObra } from "@/components/VideoObra";
import { dosCifras, tituloCorto } from "@/lib/formato";

type Props = {
  n: string;
  pasos: readonly Paso[];
  /** `config.videoPano`: el vídeo de esta sección (no va en el hero). */
  video?: Video;
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp">;
  mensaje: string;
};

/**
 * Proceso, la sección estrella (encargo §5 y §6.4): «Así avanza una obra», el vídeo corto si existe y
 * el relato con scroll. En escritorio, panel sticky a la izquierda con el número gigante del paso en
 * contorno y la línea de progreso, y cada paso a ~70 vh a la derecha; en móvil, lista con línea
 * vertical. Todo es CSS (globals.css, `.relato*`): scroll normal, nunca secuestrado. Sin soporte o con
 * «reducir movimiento», números y líneas visibles desde el principio.
 */
export function ProcesoRelato({ n, pasos, video, contacto, mensaje }: Props) {
  const total = dosCifras(pasos.length);
  return (
    <section id="proceso" aria-labelledby="h2-proceso" className="px-(--pad) py-(--sec)">
      <div className="max-w-[1040px]">
        <Rotulo n={n}>Proceso</Rotulo>
        <h2 id="h2-proceso" className="h2-diario mb-4">
          Así avanza una obra
        </h2>
        <p className="mb-10 max-w-[52ch] text-cuerpo leading-[1.6] text-texto-suave">
          {pasos.length} pasos, siempre en el mismo orden. En cada momento sabes en cuál está tu obra.
        </p>

        {video && (
          <div className="relative mb-[clamp(48px,2rem+4vw,96px)] w-full">
            <Foto imagen={video.poster} sizes="(min-width: 1024px) 1040px, calc(100vw - 40px)" proporcion="16/9" etiqueta="Vídeo generado con IA">
              <VideoObra src={video.src} srcAv1={video.srcAv1} />
            </Foto>
          </div>
        )}

        <div className="relato flex items-start gap-14">
          <div aria-hidden="true" className="sticky top-0 hidden h-dvh flex-[0_0_280px] items-center gap-7 lg:flex">
            <div className="relative h-[56vh] w-px bg-borde">
              <div className="relato-linea absolute inset-0 bg-primario-claro" />
            </div>
            <div className="relative h-44 flex-1">
              <div className="relato-total">
                <span className="contorno block text-relato tracking-[-0.05em]">{total}</span>
                <span className="mono mt-2 block text-xs text-texto-suave">pasos</span>
              </div>
              {pasos.map((p, i) => (
                <span key={p.titulo} className="relato-num contorno absolute top-0 left-0 text-relato tracking-[-0.05em] text-transparent">
                  {dosCifras(i + 1)}
                </span>
              ))}
            </div>
          </div>
          <ol className="relato-pasos relative min-w-0 flex-1 pl-7 lg:pl-0">
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-borde lg:hidden" />
            <span aria-hidden="true" className="relato-linea absolute inset-y-0 left-0 w-px bg-primario-claro lg:hidden" />
            {pasos.map((p, i) => (
              <li key={p.titulo} className="relato-paso relative flex flex-col justify-center gap-3.5 py-9 lg:min-h-[70vh]">
                <span aria-hidden="true" className="rombo absolute top-[52px] -left-8 lg:hidden" />
                <span aria-hidden="true" className="num-anim contorno text-[56px] tracking-[-0.05em] lg:hidden">
                  {dosCifras(i + 1)}
                </span>
                <span className="num-anim mono hidden text-xs font-semibold tracking-[0.08em] text-primario-claro uppercase lg:block">
                  Paso {dosCifras(i + 1)} de {total}
                </span>
                <span className="sr-only lg:hidden">Paso {dosCifras(i + 1)} de {total}: </span>
                <h3 className="mono text-[clamp(1.25rem,1.05rem+0.8vw,1.75rem)] leading-tight font-medium tracking-[-0.015em] text-texto">{p.titulo}</h3>
                <p className="max-w-[52ch] text-cuerpo leading-[1.65] text-texto-suave">{p.texto}</p>
                <span className="mono mt-1 self-start -rotate-1 bg-cinta px-2.5 py-[5px] text-[11px] font-medium tracking-[0.04em] text-sobre-cinta">
                  Nota {dosCifras(i + 1)} · {tituloCorto(p.titulo)}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <Pareja contacto={contacto} mensaje={mensaje} textoWhatsapp="Empezar por el paso 01" className="mt-12" />
      </div>
    </section>
  );
}
