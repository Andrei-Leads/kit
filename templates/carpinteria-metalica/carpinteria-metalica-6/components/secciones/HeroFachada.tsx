import Link from "next/link";
import type { SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { DosVentanas } from "@/components/secciones/Dibujos";
import { Valoracion } from "@/components/secciones/Valoracion";
import { mensajeInicio, TEXTO_WA_HERO } from "@/lib/mensajes";
import { pieTrabajo } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = Pick<SiteConfig, "negocio" | "contacto" | "trabajos" | "imagenesHero" | "valoracion">;

const SIZES = "(min-width: 1024px) 58vw, 100vw";

/**
 * Hero (encargo §5 y entrega §4): «{sector} en {ciudad}» y el deslizador del primer trabajo con
 * `antes` (después = LCP, con `preload`; antes eager a calidad 60). Sin `antes`, `imagenesHero[0]`
 * sola en 4:3, sin pastillas. Sin fotos, hero tipográfico sobre `alterna` con el dibujo de dos
 * ventanas. Nada se anima en el hero.
 *
 * Móvil (desviación consciente de la entrega §4): h1 → deslizador → WhatsApp → Llamar → «Desliza
 * para comparar» y el pie → valoración → descripción, para que los dos botones quepan sobre la
 * barra a 375×667. Escritorio: texto 5/12 a la izquierda y deslizador 7/12 a la derecha.
 */
export function HeroFachada({ negocio, contacto, trabajos, imagenesHero, valoracion }: Props) {
  const cta = { telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeInicio(contacto) };
  const par = trabajos.find((t) => t.antes);
  const foto = par ? undefined : imagenesHero[0];
  const tipografico = !par && !foto;
  const h1 = (
    <h1 className="titulo-display">
      {negocio.sector} en {contacto.direccion.ciudad}
    </h1>
  );
  const descripcion = <p className="max-w-[34rem] text-texto-suave">{negocio.descripcionCorta}</p>;
  const botones = <Pareja cta={cta} textoWhatsapp={TEXTO_WA_HERO} alto apilada />;

  return (
    <section aria-label="Presentación" className={cn(tipografico && "bg-alterna")}>
      {/* Un solo juego de botones: el orden cambia con `grid-template-areas`. */}
      <div
        className={cn(
          "contenedor grid gap-x-14 pt-3 pb-7 lg:grid-cols-[5fr_7fr] lg:grid-rows-[1fr_auto_auto_auto_auto_1fr_auto] lg:pt-12 lg:pb-20 lg:[grid-template-areas:'._medio'_'h1_medio'_'descripcion_medio'_'valoracion_medio'_'botones_medio'_'._medio'_'._pie']",
          tipografico
            ? "[grid-template-areas:'h1'_'descripcion'_'botones'_'valoracion'_'dibujo']"
            : "[grid-template-areas:'h1'_'medio'_'botones'_'pie'_'valoracion'_'descripcion']",
        )}
      >
        <div className="[grid-area:h1]">{h1}</div>
        {(par || foto) && (
          <div className="mt-2.5 min-w-0 [grid-area:medio] lg:mt-0 lg:self-center">
            {par?.antes && (
              <AntesDespues antes={par.antes} despues={par.imagenes[0]} titulo={par.titulo} sizes={SIZES} preload antesInmediata />
            )}
            {foto && <Foto imagen={foto} sizes={SIZES} preload />}
          </div>
        )}
        {tipografico && (
          <div className="[grid-area:dibujo] lg:[grid-area:medio] lg:self-center">
            <DosVentanas className="mt-6 h-auto w-full max-w-[300px] text-texto lg:mx-auto lg:mt-0 lg:block lg:max-w-[460px]" />
          </div>
        )}
        <div className="mt-3 [grid-area:botones] lg:mt-5">{botones}</div>
        {par && (
          <div className="mt-3 flex min-w-0 items-center gap-x-4 gap-y-1 text-sm leading-5 text-texto-suave [grid-area:pie] lg:flex-wrap lg:justify-between lg:text-[15px]">
            <span className="flex-none font-bold text-texto lg:order-last lg:font-normal lg:text-texto-suave">
              <span aria-hidden="true">‹› </span>Desliza para comparar
            </span>
            <Link
              href={`/trabajos/${par.slug}`}
              className="min-w-0 flex-1 truncate py-0.5 underline underline-offset-3 lg:flex-initial lg:font-bold lg:text-texto"
            >
              {pieTrabajo(par)}
            </Link>
          </div>
        )}
        <Valoracion valoracion={valoracion} className="mt-2.5 [grid-area:valoracion] lg:mt-5" />
        <div className={cn("[grid-area:descripcion] lg:mt-5", tipografico ? "mt-3.5" : "mt-3")}>{descripcion}</div>
      </div>
    </section>
  );
}
