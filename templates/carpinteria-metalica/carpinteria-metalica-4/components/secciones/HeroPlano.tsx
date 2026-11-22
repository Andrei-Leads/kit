import type { SiteConfig } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { CotaDato } from "@/components/Cota";
import { mensajeInicio } from "@/lib/mensajes";
import { cotasHero, cotaZonas } from "@/lib/textos";

type Props = Pick<SiteConfig, "negocio" | "contacto" | "valoracion" | "zonas">;

/**
 * `HeroPlano` (encargo §6.2): tipográfico sobre la retícula, sin foto (el LCP es el h1). Encima del
 * h1, las cotas con datos (valoración, año); debajo, la de zonas. Pareja `boton-lamina` (WhatsApp,
 * 60 px y a todo el ancho en móvil) + `boton-trazo` (Llamar). A la derecha (debajo en móvil), el
 * cajetín con nombre, dirección y «Lámina 00». Aquí no se anima nada.
 */
export function HeroPlano({ negocio, contacto, valoracion, zonas }: Props) {
  const cotas = cotasHero({ negocio, valoracion });
  const d = contacto.direccion;
  return (
    <section aria-labelledby="titulo-hero" className="reticula gutter border-b border-texto pt-5 pb-[clamp(28px,5vw,56px)]">
      <div className="ancho flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
        <div className="flex min-w-0 flex-[1_1_560px] flex-col gap-[18px] lg:max-w-[820px]">
          <span className="etiqueta text-texto-suave">LÁMINA 00 · ALZADO GENERAL</span>
          {cotas.length > 0 && (
            <div className="flex max-w-[560px] flex-wrap gap-x-5 gap-y-3">
              {cotas.map((c) => (
                <CotaDato key={c} texto={c} className="flex-[1_1_140px]" />
              ))}
            </div>
          )}
          <h1 id="titulo-hero" className="h1-plano">
            {negocio.sector} en {d.ciudad}
          </h1>
          {zonas.length > 0 && <CotaDato texto={cotaZonas(zonas)} etiqueta="debajo" className="max-w-[640px]" />}
          <p className="max-w-[56ch] text-texto-suave text-pretty">{negocio.descripcionCorta}</p>
          <Pareja contacto={contacto} mensaje={mensajeInicio(contacto)} tamano="grande" className="max-w-[720px] pt-1" />
        </div>
        <div className="grid w-full min-w-0 max-w-[400px] flex-[0_1_340px] grid-cols-[minmax(0,1fr)_auto] border border-texto bg-superficie">
          <div className="col-span-2 flex flex-col gap-1 border-b border-texto px-3.5 py-3">
            <span className="etiqueta text-texto-suave">TALLER</span>
            <span className="font-titulo text-lg leading-[1.25] font-semibold text-balance">{negocio.nombre}</span>
          </div>
          <div className="border-r border-texto px-3.5 py-2.5 text-[15px] leading-[1.45]">
            {d.calle}
            <br />
            {d.cp} {d.ciudad}
          </div>
          <div className="flex flex-col justify-center gap-0.5 px-3.5 py-2.5 font-titulo">
            <span className="text-[13px] text-texto-suave">LÁMINA</span>
            <span className="text-[22px] font-semibold">00</span>
          </div>
        </div>
      </div>
    </section>
  );
}
