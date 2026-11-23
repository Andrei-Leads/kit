import Link from "next/link";
import type { Imagen, Servicio, SiteConfig } from "@andrei-leads/core";

import { Despiece } from "@/components/Despiece";
import { Lamina } from "@/components/Lamina";
import { Pareja } from "@/components/Pareja";
import { letra, valoracionTexto } from "@/lib/formato";

type Props = {
  negocio: Pick<SiteConfig["negocio"], "sector" | "descripcionCorta" | "anioFundacion">;
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "direccion">;
  valoracion?: SiteConfig["valoracion"];
  servicios: readonly Pick<Servicio, "titulo" | "slug">[];
  /** `imagenesHero[0]`: la «Lám. 01». Sin foto, la lámina desaparece y el despiece ocupa su sitio. */
  foto?: Imagen;
  mensaje: string;
};

/**
 * Hero tipográfico sobre el despiece (encargo §5 y §6.1). El h1 en mono a tamaño display, delante del
 * despiece (SVG decorativo, sin animar); debajo, la pareja WhatsApp + Llamar sin scroll a 375×667 y la
 * valoración en una etiqueta mono. La leyenda de servicios es la lista de enlaces real del despiece
 * (A–F y «y N más →»). En móvil la lámina 01 va bajo la leyenda; en escritorio, a la derecha.
 * Una sola lámina en el HTML (rejilla con áreas), con `preload`: es el LCP en escritorio.
 */
export function HeroDespiece({ negocio, contacto, valoracion, servicios, foto, mensaje }: Props) {
  const ciudad = contacto.direccion.ciudad;
  const leyenda = servicios.slice(0, 6);
  const mas = servicios.length - leyenda.length;
  return (
    <section aria-labelledby="h1-inicio" className="relative overflow-x-clip pt-7 pb-2 lg:pt-14">
      <div aria-hidden="true" className="pointer-events-none absolute top-0 -right-[58%] w-[125%] lg:top-[150px] lg:right-auto lg:left-[14%] lg:w-[92%]">
        <Despiece n={leyenda.length} />
      </div>
      <div className="relative grid gap-y-[clamp(40px,2rem+3vw,96px)] lg:grid-cols-9 lg:gap-x-6">
        <div className="flex flex-col gap-5 lg:col-span-6 lg:gap-6">
          <p className="etiqueta order-1 font-semibold text-lapiz">
            Hoja 01 · Taller propio{negocio.anioFundacion ? ` desde ${negocio.anioFundacion}` : ""}
          </p>
          <h1 id="h1-inicio" className="titulo order-2 text-display leading-[1.04]">
            {negocio.sector} en {ciudad}
          </h1>
          <p className="order-5 max-w-[60ch] text-texto-suave lg:order-3 lg:max-w-[52ch]">{negocio.descripcionCorta}</p>
          <Pareja contacto={contacto} mensaje={mensaje} className="order-3 lg:order-4" />
          {valoracion && (
            <p className="order-4 self-start border border-borde bg-fondo px-2.5 py-1.5 font-titulo text-[12.5px] tracking-[0.04em] lg:order-5 lg:-mt-3 lg:border-0 lg:bg-transparent lg:p-0 lg:text-texto-suave">
              {valoracionTexto(valoracion)}
            </p>
          )}
        </div>

        <div className="max-w-[560px] lg:col-span-9 lg:row-start-2">
          <p className="etiqueta mb-2.5 text-texto-suave">Despiece · leyenda de piezas</p>
          <ul className="border-t border-tinta bg-fondo">
            {leyenda.map((s, i) => (
              <li key={s.slug} className="border-b border-borde">
                <Link href={`/servicios/${s.slug}`} className="group flex min-h-13 items-center gap-3.5 no-underline">
                  <span className="letra">{letra(i)}</span>
                  <span className="flex-1 group-hover:text-lapiz">{s.titulo}</span>
                  <span aria-hidden="true" className="font-titulo text-texto-suave">
                    →
                  </span>
                </Link>
              </li>
            ))}
            {mas > 0 && (
              <li className="border-b border-borde">
                <Link href="/servicios" className="flex min-h-13 items-center pl-[46px] font-titulo text-[13px] tracking-[0.04em]">
                  y {mas} más →
                </Link>
              </li>
            )}
          </ul>
        </div>

        {foto && (
          <div className="lg:col-span-3 lg:col-start-7 lg:row-start-1 lg:pt-7">
            <Lamina imagen={foto} numero={1} preload sizes="(min-width: 1024px) 30vw, 100vw" />
          </div>
        )}
      </div>
    </section>
  );
}
