import type { SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { Valoracion } from "@/components/secciones/Valoracion";
import { mensajeInicio } from "@/lib/mensajes";
import { pieObra } from "@/lib/textos";

type Props = { config: SiteConfig };

const SIZES = "(min-width: 1024px) 58vw, 100vw";

/**
 * Hero (encargo §5 y §6.1): «{sector} en *{ciudad}*» y el deslizador del primer trabajo con
 * `antes`. Sin `antes`, una foto 4:3 (la del primer trabajo con su pie, o `imagenesHero[0]` sin
 * pie). Sin fotos, hero tipográfico con filete. Los botones van antes que la foto en móvil.
 * Nada se anima en el hero.
 */
export function HeroAntesDespues({ config }: Props) {
  const { negocio, contacto, trabajos, imagenesHero, valoracion } = config;
  const ciudad = contacto.direccion.ciudad;
  const cta = { telefono: contacto.telefono, whatsapp: contacto.whatsapp, mensaje: mensajeInicio(contacto) };
  const par = trabajos.find((t) => t.antes);
  const obraFoto = par ?? trabajos[0];
  const foto = obraFoto?.imagenes[0] ?? imagenesHero[0];
  const pie = obraFoto ? pieObra(obraFoto) : undefined;

  const antetitulo = (
    <p className="versalitas mb-3.5">
      {negocio.sector} · {ciudad}
    </p>
  );
  const titulo = (
    <h1 className="titulo-display">
      {negocio.sector} en <em className="text-primario-texto">{ciudad}</em>
    </h1>
  );

  if (!foto) {
    return (
      <section className="contenedor pt-[clamp(24px,4vw,64px)] pb-[clamp(36px,5vw,80px)]">
        <div className="max-w-[1040px]">
          {antetitulo}
          {titulo}
          <div className="my-[clamp(24px,3vw,40px)] h-px bg-texto" />
          <p className="max-w-[34ch] font-titulo text-[clamp(1.375rem,1.1rem+1.2vw,2.125rem)] leading-[1.25] text-balance">
            {negocio.descripcionCorta}
          </p>
          <Valoracion valoracion={valoracion} className="mt-6" />
          <Pareja cta={cta} numeroEnLlamar iconos className="mt-6 max-w-[520px]" />
        </div>
      </section>
    );
  }

  return (
    <section className="contenedor grid items-start gap-[clamp(24px,3.5vw,64px)] pt-[clamp(24px,4vw,64px)] pb-[clamp(36px,5vw,80px)] lg:grid-cols-[5fr_7fr]">
      <div>
        {antetitulo}
        {titulo}
        <p className="mt-6 hidden max-w-[40ch] text-texto-suave lg:block">{negocio.descripcionCorta}</p>
        <Valoracion valoracion={valoracion} className="mt-5" />
        <Pareja cta={cta} numeroEnLlamar iconos className="mt-5" />
      </div>
      <div>
        {par?.antes ? (
          <AntesDespues antes={par.antes} despues={par.imagenes[0]} titulo={par.titulo} sizes={SIZES} preload antesInmediata />
        ) : (
          <Foto imagen={foto} sizes={SIZES} preload />
        )}
        {pie && <p className="versalitas mt-3 border-t border-filete pt-3">{pie}</p>}
      </div>
    </section>
  );
}
