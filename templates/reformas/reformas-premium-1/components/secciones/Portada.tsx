import type { SiteConfig } from "@andrei-leads/core";

import { MedioHero } from "@/components/base/MedioHero";
import { Destacada, Pareja } from "@/components/Botones";
import { lineaConfianza, obrasEn, TEXTOS, textoValoracion, type DatosCta } from "@/lib/textos";

type Props = {
  config: Pick<SiteConfig, "negocio" | "contacto" | "valoracion" | "videoHero" | "imagenesHero" | "zonas">;
  datos: DatosCta;
};

/**
 * Portada (encargo §5.1). Con vídeo o foto: medio a sangre con la línea de portada y,
 * abajo sobre el velo, antetítulo, `h1` «{sector} en *{ciudad}*» y la pareja de 56 px
 * (apilada en móvil, en fila en escritorio). Sin fotos: portada tipográfica en tinta con
 * la espiga y `descripcionCorta`. **Nada se anima aquí.**
 */
export function Portada({ config, datos }: Props) {
  const { negocio, contacto, valoracion, videoHero, imagenesHero, zonas } = config;
  const ciudad = contacto.direccion.ciudad;
  const conMedio = Boolean(videoHero || imagenesHero[0]);
  const zonasTexto = obrasEn(zonas);

  const titulo = (
    <>
      <p className="etiqueta mb-4 text-fondo/90">
        {negocio.sector} · {ciudad}
      </p>
      <h1 className="titulo-display max-w-[15ch] text-fondo">
        {negocio.sector} en <Destacada>{ciudad}</Destacada>
      </h1>
    </>
  );

  if (!conMedio) {
    return (
      <section data-hero="tipografica" data-tono="oscuro" data-pagina="inicio" className="espiga text-fondo">
        <div className="contenedor pt-[calc(var(--alto-cabecera)+clamp(56px,8vw,128px))] pb-[clamp(56px,8vw,120px)]">
          {titulo}
          <p className="m-0 mt-6 max-w-[34ch] text-[22px] leading-[1.4] text-texto-claro">{negocio.descripcionCorta}</p>
          <Pareja datos={datos} textoWa={TEXTOS.whatsappPortada} fondo="oscuro" className="mt-10 flex-col sm:max-w-[620px] sm:flex-row" />
          <p className="m-0 mt-3 text-sm text-texto-claro">{lineaConfianza(config)}</p>
        </div>
      </section>
    );
  }

  return (
    <section
      data-hero="medio"
      data-tono="oscuro"
      data-pagina="inicio"
      className="relative isolate flex h-[clamp(560px,calc(100svh-64px),760px)] flex-col justify-end overflow-hidden bg-tinta text-fondo lg:h-[min(92vh,960px)] lg:min-h-[640px]"
    >
      <MedioHero video={videoHero} imagen={imagenesHero[0]} />
      <div className="contenedor relative z-[1] grid items-end gap-6 pb-7 lg:grid-cols-12 lg:pb-14">
        <div className="lg:col-span-8">
          {titulo}
          <Pareja datos={datos} textoWa={TEXTOS.whatsappPortada} fondo="oscuro" className="mt-7 flex-col lg:mt-9 lg:max-w-[620px] lg:flex-row lg:flex-nowrap" />
          {valoracion && <p className="m-0 mt-3 text-sm text-fondo/90 lg:hidden">★ {textoValoracion(valoracion)}</p>}
        </div>
        <div className="hidden text-right text-sm leading-relaxed text-fondo/90 lg:col-span-4 lg:block">
          {valoracion && <p className="m-0">★ {textoValoracion(valoracion)}</p>}
          {zonasTexto && <p className="m-0 mt-1 ml-auto max-w-[32ch]">{zonasTexto}</p>}
        </div>
      </div>
    </section>
  );
}
