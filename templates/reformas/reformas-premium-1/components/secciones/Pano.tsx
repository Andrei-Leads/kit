import { etiquetaOrigen, type Imagen, type SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Destacada, Enlace, Pareja } from "@/components/Botones";
import { fichaObra, partirTitulo, textoMarquesina, TEXTOS, type DatosCta } from "@/lib/textos";

type Props = {
  trabajos: SiteConfig["trabajos"];
  /** El mensaje es el del trabajo del pano. */
  datos: Omit<DatosCta, "mensaje">;
  mensajeDe: (t: SiteConfig["trabajos"][number]) => string;
};

/** Rótulo «Antes» / «Después» con la etiqueta de origen integrada (la foto no lleva la suya). */
function rotulo(texto: string, imagen: Imagen) {
  const origen = etiquetaOrigen(imagen);
  return (
    <>
      {texto}
      {origen && <span className="font-normal tracking-normal normal-case"> · {origen}</span>}
    </>
  );
}

/**
 * El pano (encargo §5.3): el «antes» del primer trabajo con `antes` crece hasta llenar
 * la pantalla y el «después» lo barre con el scroll. 0 KB de JS: `.pano` es una pista
 * alta con `view-timeline-name: --pano` y la escena es `sticky`; todo está en
 * globals.css dentro de `@supports (animation-timeline: view())`, «sin reducir
 * movimiento» y `(scripting: enabled)`. Solo `clip-path`, `scale`, `translate` y
 * `opacity`.
 *
 * Por defecto (sin soporte, con «reducir movimiento» o sin JS), composición quieta: el
 * «después» en 3:2 y el «antes» en miniatura 4:5 solapada, una sola copia de la
 * marquesina y la pareja debajo. Sin ningún `antes`, usa el primer trabajo y solo crece.
 * Sin trabajos, no existe.
 */
export function Pano({ trabajos, datos, mensajeDe }: Props) {
  const t = trabajos.find((x) => x.antes) ?? trabajos[0];
  if (!t) return null;
  const despues = t.imagenes[0];
  const antes = t.antes;
  const marquesina = textoMarquesina(t);
  const titulo = partirTitulo(t.titulo);
  const ficha = fichaObra(t)
    .filter((f) => f.k !== "Precio aproximado")
    .map((f) => f.v)
    .join(" · ");
  const rot = "pano-rotulo etiqueta absolute top-3 left-3 z-[3] rounded-[2px] bg-tinta/70 px-2 py-1 text-fondo";

  return (
    <section data-tono="oscuro" aria-labelledby="titulo-pano" className="bg-tinta text-fondo">
      <div className="pano">
        <div className="pano-escena contenedor pt-[clamp(80px,3rem+6vw,160px)]">
          <p className="pano-quieto-cabeza etiqueta mb-6 text-texto-claro">{antes ? "Antes y después" : "En portada"}</p>
          <figure className="pano-figura">
            {antes && (
              <div className="pano-antes pano-crece">
                <div className="pano-zoom-capa">
                  <Foto imagen={antes} sizes="100vw" proporcion="relleno" calidad={60} etiqueta="ninguna" className="absolute inset-0 rounded-none" />
                </div>
                <span className={rot}>{rotulo("Antes", antes)}</span>
              </div>
            )}
            <div className={antes ? "pano-despues" : "pano-despues pano-crece"}>
              <div className="pano-zoom-capa">
                <Foto imagen={despues} sizes="100vw" proporcion="relleno" calidad={60} etiqueta="ninguna" className="absolute inset-0 rounded-none" />
              </div>
              <span className={rot}>{rotulo(antes ? "Después" : t.titulo, despues)}</span>
            </div>
            {antes && (
              <>
                <span aria-hidden="true" className={`${rot} pano-rotulo--despues-anim`}>
                  {rotulo("Después", despues)}
                </span>
                <span aria-hidden="true" className="pano-filete" />
              </>
            )}
            <span aria-hidden="true" className="pano-velo" />
            <figcaption className="sr-only">Antes y después: {t.titulo}</figcaption>
          </figure>
          <div className="pano-marquesina">
            <div>
              <span>{marquesina}</span>
              <span aria-hidden="true">{marquesina}</span>
            </div>
          </div>
          <Pareja
            datos={{ ...datos, mensaje: mensajeDe(t) }}
            fondo="oscuro"
            textoWa={TEXTOS.whatsappTrabajo}
            textoLlamar="Llamar"
            className="pano-pareja flex-col sm:flex-row"
          />
        </div>
      </div>
      <div data-aparecer className="pano-pie contenedor pt-10 pb-[clamp(80px,3rem+6vw,160px)]">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5 border-t border-borde-oscuro pt-8">
          <div>
            <h2 id="titulo-pano" className="titulo-h2">
              {titulo.antes}
              {titulo.destacada ? (
                <>
                  {" "}
                  <Destacada>{titulo.destacada}</Destacada>
                </>
              ) : (
                t.ubicacion && (
                  <>
                    {" · "}
                    <Destacada>{t.ubicacion}</Destacada>
                  </>
                )
              )}
            </h2>
            {ficha && <p className="m-0 mt-3 text-texto-claro">{ficha}</p>}
          </div>
          <div className="pano-pie-enlaces flex flex-wrap gap-x-8">
            <Enlace href={`/trabajos/${t.slug}`}>
              Ver la obra<span className="sr-only">: {t.titulo}</span>
            </Enlace>
            {antes && (
              <Enlace href={`/trabajos/${t.slug}`} className="solo-quieto">
                Comparar a tu ritmo
              </Enlace>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
