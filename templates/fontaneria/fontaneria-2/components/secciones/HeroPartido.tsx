import { mediaVisible, type SiteConfig } from "@andrei-leads/core";

import { MedioHero } from "@/components/base/MedioHero";
import { Estrellas } from "@/components/Estrellas";
import { Verificado } from "@/components/Iconos";
import { lineaHorario, textoResenas } from "@/lib/formato";
import type { PrecioTarjeta } from "@/lib/precios";
import { cn } from "@/lib/utils";

import { Pareja } from "./Pareja";
import { TarjetaPrecio } from "./TarjetaPrecio";

type Props = {
  negocio: Pick<SiteConfig["negocio"], "sector">;
  contacto: SiteConfig["contacto"];
  valoracion: SiteConfig["valoracion"];
  imagenesHero: SiteConfig["imagenesHero"];
  garantias: SiteConfig["garantias"];
  /** La primera tarifa (o el primer servicio con `precioDesde`); sin precios, no hay tarjeta. */
  precio?: PrecioTarjeta;
  mensaje: string;
};

/**
 * Hero partido foto/texto (encargo §5 y §6.1). Móvil: h1 «{sector} en {ciudad}», valoración, chips,
 * «Llamar · número» y «Escribir por WhatsApp» apilados, horario y la tarjeta de la primera tarifa
 * solapada 24 px sobre la foto 4:3. Escritorio (≥ 960 px): dos columnas iguales, foto 4:5 a la derecha.
 * Sin foto: bloque en primario suave con la valoración en grande y hasta 3 garantías (si hay alguna).
 * Nada se anima aquí (LCP).
 */
export function HeroPartido({ negocio, contacto, valoracion, imagenesHero, garantias, precio, mensaje }: Props) {
  const foto = imagenesHero[0];
  const chips = [contacto.urgencias24h ? "Urgencias 24 h" : "", contacto.tiempoLlegada ? `Llegamos en ${contacto.tiempoLlegada}` : ""].filter(Boolean);
  const bloque = !foto && (valoracion || garantias.length > 0);
  const dosColumnas = !!foto || !!bloque;

  return (
    <section aria-labelledby="titulo-hero" className="contenedor pt-[clamp(24px,3.5vw,56px)] pb-[clamp(48px,6vw,88px)]">
      <div className={cn("grid grid-cols-1 items-center gap-[clamp(28px,5vw,64px)]", dosColumnas && "lg:grid-cols-2")}>
        <div className="flex min-w-0 flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h1 id="titulo-hero" className="m-0 font-titulo text-display font-extrabold">
              {negocio.sector} en {contacto.direccion.ciudad}
            </h1>
            {valoracion && (
              <p className="m-0 flex flex-wrap items-center gap-2 text-base">
                <Estrellas valor={valoracion.media} />
                <strong className="font-extrabold tabular-nums">{mediaVisible(valoracion.media)}</strong>
                <span className="text-texto-suave">· {textoResenas(valoracion.total)}</span>
              </p>
            )}
            {chips.length > 0 && (
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {chips.map((c) => (
                  <li
                    key={c}
                    className="inline-flex h-8.5 items-center gap-2 rounded-full border border-borde bg-superficie px-3.5 text-[.9375rem] font-semibold"
                  >
                    <span aria-hidden="true" className="size-2 rounded-full bg-acento" />
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Pareja contacto={contacto} mensaje={mensaje} linea={lineaHorario(contacto)} />
          {precio && (
            // Solapada 24 px sobre la foto en móvil (52 px = 24 + el hueco de la rejilla).
            <TarjetaPrecio precio={precio} variante="hero" className={cn("relative z-[1]", foto && "-mb-13 lg:mb-0")} />
          )}
        </div>
        {foto && (
          <MedioHero
            imagen={foto}
            sizes="(min-width: 1280px) 560px, (min-width: 960px) 46vw, 100vw"
            className="aspect-[4/3] lg:aspect-[4/5] lg:rounded-tarjeta [&_img]:object-[center_40%]"
          />
        )}
        {bloque && (
          <div className="flex flex-col gap-5 rounded-tarjeta bg-primario-suave p-[clamp(24px,4vw,48px)]">
            {valoracion && (
              <div className="flex flex-col gap-1">
                <span className="text-[clamp(4rem,3rem+4vw,6.5rem)] leading-[.95] font-extrabold tracking-[-0.04em] tabular-nums">
                  {mediaVisible(valoracion.media)}
                </span>
                <Estrellas valor={valoracion.media} className="text-2xl tracking-[2px]" />
                <span className="font-semibold">{textoResenas(valoracion.total)}</span>
              </div>
            )}
            {garantias.length > 0 && (
              <ul className="m-0 flex list-none flex-col gap-3 p-0">
                {garantias.slice(0, 3).map((g) => (
                  <li key={g} className="flex items-center gap-3 leading-[1.35] font-semibold">
                    <Verificado />
                    {g}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
