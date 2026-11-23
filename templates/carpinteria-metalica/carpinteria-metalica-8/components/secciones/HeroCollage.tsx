import { mediaVisible, type Imagen, type SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Foto } from "@/components/base/Foto";
import { pieConjunto, selloHero, totalResenas } from "@/lib/textos";

type Props = {
  negocio: Pick<SiteConfig["negocio"], "nombre" | "sector" | "descripcionCorta" | "anioFundacion">;
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "direccion">;
  valoracion?: SiteConfig["valoracion"];
  /** A: `imagenesHero[0]` (taller, 4:5, LCP). */
  fotoA?: Imagen;
  /** B: `imagenesHero[1]` o `trabajos[0].imagenes[0]` (obra, 1:1). */
  fotoB?: Imagen;
  mensaje: string;
};

/**
 * Hero «collage taller + obra» (encargo §5). La banda `alterna` de arriba queda bajo la cabecera
 * transparente y el collage la invade. A 375 px: h1, chip de valoración, WhatsApp (56 px, a todo el
 * ancho) y «Llamar al taller» sin scroll; debajo, el collage y la descripción. Desde 1024 px: texto
 * (5/12) y collage (7/12) de 560 px. Nada se anima aquí (h1, fotos, botones y sello C).
 * Sin fotos, el collage es tipográfico: tres guijarros de color con la inicial (decorativo).
 */
export function HeroCollage({ negocio, contacto, valoracion, fotoA, fotoB, mensaje }: Props) {
  const sello = selloHero({ negocio, valoracion });
  const pie = fotoA ? pieConjunto(fotoB ? [fotoA, fotoB] : [fotoA]) : undefined;
  const descripcion = <p className="max-w-[34ch] text-texto-suave text-pretty">{negocio.descripcionCorta}</p>;

  return (
    <section aria-labelledby="titulo-inicio" className="relative -mt-[60px] px-[clamp(20px,5vw,56px)] pt-[76px] pb-[clamp(40px,6vw,88px)] lg:-mt-[76px] lg:pt-[112px]">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[120px] rounded-b-[50%_44px] bg-alterna lg:h-[200px]" />
      <div className="relative mx-auto grid max-w-[1180px] items-center gap-[clamp(28px,5vw,72px)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="flex flex-col gap-3.5 lg:gap-[22px]">
          <h1 id="titulo-inicio" className="font-titulo text-h1-hero leading-[1.02] font-medium tracking-[-0.02em] text-balance">
            {negocio.sector} <em className="font-normal text-acento italic">en {contacto.direccion.ciudad}</em>
          </h1>
          <div className="hidden lg:block">{descripcion}</div>
          {valoracion && (
            <a
              href="#resenas"
              className="relative inline-flex min-h-8 items-center gap-2 self-start rounded-full after:absolute after:-inset-y-1.5 after:inset-x-0 after:content-[''] border border-borde bg-superficie py-1 ps-2.5 pe-3.5 text-[15px] leading-tight no-underline"
            >
              <span aria-hidden="true" className="text-base text-acento">
                ★
              </span>
              <strong className="font-bold">{mediaVisible(valoracion.media)}</strong>
              <span className="text-texto-suave">· {totalResenas(valoracion.total)} en Google</span>
            </a>
          )}
          <Pareja contacto={contacto} mensaje={mensaje} textoLlamar="Llamar al taller" grande className="mt-1 lg:mt-2" />
        </div>

        <div>
          <div className="relative aspect-[1/1.08] w-full lg:aspect-auto lg:h-[560px]">
            {fotoA ? (
              <>
                <Foto
                  imagen={fotoA}
                  sinEtiqueta
                  preload
                  proporcion="4/5"
                  sizes="(min-width: 1024px) 40vw, 74vw"
                  className="!absolute top-0 left-0 w-[74%] rounded-guijarro-1 shadow-suave lg:left-[4%] lg:w-[56%]"
                />
                {fotoB && (
                  <Foto
                    imagen={fotoB}
                    sinEtiqueta
                    eager
                    proporcion="1/1"
                    calidad={60}
                    sizes="(min-width: 1024px) 30vw, 46vw"
                    className="!absolute bottom-0 left-[54%] w-[46%] rounded-guijarro-2 border-[6px] border-fondo shadow-suave lg:left-1/2 lg:w-[44%]"
                  />
                )}
              </>
            ) : (
              <div aria-hidden="true">
                <div className="absolute top-0 left-0 flex aspect-[4/5] w-[74%] items-center justify-center overflow-hidden rounded-guijarro-1 bg-primario-suave lg:left-[4%] lg:w-[56%]">
                  <span className="font-titulo text-[180px] leading-none font-medium text-primario opacity-55 lg:text-[300px]">{negocio.nombre.charAt(0)}</span>
                </div>
                <div className="absolute bottom-0 left-[54%] aspect-square w-[46%] rounded-guijarro-2 border-[6px] border-fondo bg-acento-suave lg:left-1/2 lg:w-[44%]" />
                <div className="absolute bottom-[6%] -left-[2%] aspect-[1.2] w-[30%] rounded-guijarro-2 bg-alterna" />
              </div>
            )}
            {sello && (
              <p className="absolute top-[2%] right-0 flex aspect-square w-[116px] -rotate-[4deg] flex-col items-center justify-center rounded-[52%_48%_46%_54%/50%_54%_46%_50%] bg-superficie p-3 text-center leading-[1.05] shadow-suave outline-[1.5px] -outline-offset-[9px] outline-acento outline-dashed lg:top-[3%] lg:right-[2%] lg:w-[156px]">
                {sello.antes && <span className="text-[13px] font-semibold tracking-[0.06em] text-texto-suave uppercase">{sello.antes}</span>}
                <span className="font-titulo text-[30px] font-medium tracking-[-0.02em] lg:text-[42px]">{sello.cifra}</span>
                {sello.despues && <span className="text-[13px] text-texto-suave">{sello.despues}</span>}
              </p>
            )}
          </div>
          {pie && <p className="pie-foto mt-3.5">{pie}</p>}
          <div className="mt-5 lg:hidden">{descripcion}</div>
        </div>
      </div>
    </section>
  );
}
