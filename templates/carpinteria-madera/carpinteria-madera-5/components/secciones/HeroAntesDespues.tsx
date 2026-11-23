import type { SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { Valoracion } from "@/components/secciones/Valoracion";
import { mensajeInicio } from "@/lib/mensajes";
import { trabajoDelHero } from "@/lib/textos";

type Props = Pick<SiteConfig, "negocio" | "contacto" | "trabajos" | "imagenesHero" | "valoracion">;

const SIZES = "(min-width: 1280px) 650px, (min-width: 1024px) 54vw, 100vw";

/**
 * Hero (encargo §5 y §6.1): el arco con el antes/después del primer trabajo con `antes`, el h1
 * «{sector} en {ciudad}», la valoración y los dos botones. Sin `antes`, `imagenesHero[0]` sola en
 * el arco (o la primera foto del primer trabajo). Sin fotos, hero tipográfico con el arco vacío
 * dibujado en primario (crema si el primario del cliente no llega a 3:1). En móvil, el arco sube
 * bajo la cabecera transparente; en escritorio, va a la izquierda (7 columnas). Nada se anima.
 * En móvil el arco no pasa de 45svh de alto (se achata, sin estrecharse): en pantallas bajas (375×667) el «Llamar» del hero quedaba
 * pegado a la barra móvil; en las altas sigue siendo cuadrado.
 */
export function HeroAntesDespues({ negocio, contacto, trabajos, imagenesHero, valoracion }: Props) {
  const cta = { telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeInicio(contacto) };
  const par = trabajoDelHero(trabajos);
  const foto = imagenesHero[0] ?? trabajos[0]?.imagenes[0];
  const conMedio = Boolean(par || foto);

  const linea = par && (
    <p className="mb-[18px] hidden items-center gap-2.5 text-[15px] text-texto-suave lg:flex">
      <span aria-hidden="true" className="punto" />
      {[par.titulo, par.anio].filter(Boolean).join(" · ")}
    </p>
  );

  return (
    <section data-cabecera={conMedio ? "transparente" : undefined} className={conMedio ? "bajo-cabecera" : undefined}>
      <div
        className={
          conMedio
            ? "contenedor grid items-end gap-x-14 pb-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:pt-[108px] lg:pb-14"
            : "contenedor grid items-end gap-x-14 pt-2 pb-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:pt-6 lg:pb-14"
        }
      >
        <div>
          {par?.antes ? (
            <AntesDespues
              antes={par.antes}
              despues={par.imagenes[0]}
              titulo={par.titulo}
              sizes={SIZES}
              forma="cuadrada"
              preload
              antesInmediata
              className="arco-hero max-lg:[@media(scripting:none)]:pt-[calc(var(--alto-cabecera)+8px)]"
            />
          ) : foto ? (
            <Foto imagen={foto} sizes={SIZES} proporcion="1/1" preload posicionEtiqueta="arco" className="w-full max-lg:max-h-[45svh] lg:aspect-[3/2]" />
          ) : (
            <div className="flex aspect-square w-full flex-col justify-end rounded-foto border border-arco px-5 pb-7 max-lg:max-h-[45svh] lg:aspect-[3/2] lg:px-10 lg:pb-9">
              <p className="max-w-[36ch] text-[15px] text-texto-suave lg:text-cuerpo">{negocio.descripcionCorta}</p>
            </div>
          )}
        </div>
        <div className="lg:pb-2">
          {linea}
          <h1 className="mt-4 text-display leading-[1.04] font-[660] tracking-[-0.025em] text-balance lg:mt-0 lg:leading-[1.02] lg:tracking-[-0.03em]">
            {negocio.sector} en {contacto.direccion.ciudad}
          </h1>
          <Valoracion valoracion={valoracion} className="mt-2 lg:mt-[18px] lg:text-base" />
          <Pareja cta={cta} hero tamano="grande" iconoLlamar className="mt-3.5 lg:mt-7" />
        </div>
      </div>
    </section>
  );
}
