import type { Imagen, Video } from "@andrei-leads/core";

import { ControlVideo } from "@/components/cliente/ControlVideo";
import { Luz } from "@/components/Luz";
import { ParejaCta, type DatosCta } from "@/components/ParejaCta";
import { MedioHero } from "@/components/base/MedioHero";
import { RESPUESTA, TEXTO_WA } from "@/lib/mensajes";

type Props = {
  /** `config.videoPano` (core 0.7.0). Este template no usa `videoHero`. */
  video?: Video;
  /** Respaldo: `galeria[0]` y, si no, `trabajos[0].imagenes[0]`. */
  respaldo?: Imagen;
  cta: DatosCta;
};

const LEMA = "Que entre la luz";

/**
 * PanoLuz (encargo §5.2, recurso 4): sección alta (220 svh en móvil, 260 en escritorio)
 * con un hijo `sticky` de 100 svh. El medio (póster del vídeo, foto de respaldo o `Luz`)
 * se recorta con `clip-path` como una ventana 4:5 que se abre a pantalla completa; en el
 * último tercio entran el velo y la marquesina. La pareja de CTAs está abajo a la
 * izquierda en todas las fases, sin animación. Todo es CSS (globals.css, `.pano*`); el
 * vídeo lo monta `ControlVideo`. Con «reducir movimiento» o sin soporte: foto quieta a
 * ancho completo, una copia quieta del lema y la pareja debajo.
 */
export function PanoLuz({ video, respaldo, cta }: Props) {
  const hayMedio = Boolean(video ?? respaldo);
  return (
    <section data-tono="oscuro" aria-label="Que entre la luz" className="pano seccion bg-tinta text-sobre-tinta">
      <div className="pano-fijo contenedor">
        <div className="pano-marco">
          <div className="pano-medio">
            <div className="pano-escala">
              {hayMedio ? <MedioHero video={video} imagen={respaldo} className="h-full" /> : <Luz tono="oscuro" cristales={4} proporcion="relleno" parallax fondo="var(--color-tinta)" />}
            </div>
            <div aria-hidden="true" className="pano-capa pano-velo" />
            <div aria-hidden="true" className="pano-capa pano-marquesina">
              <div className="pano-pista">
                {Array.from({ length: 8 }, (_, i) => (
                  <span key={i}>
                    {LEMA}
                    <span className="punto"> ·</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
          {video && <ControlVideo src={video.src} srcAv1={video.srcAv1} />}
        </div>
        <ParejaCta cta={cta} textoWhatsapp={TEXTO_WA} tono="oscuro" confianza={{ texto: RESPUESTA }} className="pano-pareja" />
      </div>
    </section>
  );
}
