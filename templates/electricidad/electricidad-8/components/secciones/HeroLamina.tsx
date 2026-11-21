import { mediaVisible, type Imagen, type SiteConfig } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { ParCta } from "@/components/Botones";
import { Rombo } from "@/components/Iconos";
import { Rotulo } from "@/components/Rotulo";
import { cifrasCredibilidad, type Cifra } from "@/lib/formato";
import { cn } from "@/lib/utils";

type Props = {
  negocio: Pick<SiteConfig["negocio"], "sector" | "descripcionCorta" | "anioFundacion">;
  contacto: SiteConfig["contacto"];
  imagen?: Imagen;
  valoracion?: SiteConfig["valoracion"];
  zonas: readonly string[];
  mensaje: string;
  n: string;
};

/**
 * `HeroLamina` (encargo §6.1): texto a la izquierda y, en escritorio, la foto 4:5 enmarcada a la
 * derecha con una cota vertical del año de fundación. En móvil, la foto va **después** de la pareja
 * de botones (3:2) con una cota «Desde 2004 ─── 12 municipios». Sin foto, hero tipográfico sobre la
 * retícula de plano. Nada animado: el h1, la foto y la llamada son la primera pintura.
 */
export function HeroLamina({ negocio, contacto, imagen, valoracion, zonas, mensaje, n }: Props) {
  const chips = [contacto.urgencias24h && "Urgencias 24 h", contacto.tiempoLlegada && `Llegamos en ${contacto.tiempoLlegada}`].filter(
    (x): x is string => Boolean(x),
  );
  const desde = negocio.anioFundacion ? `Desde ${negocio.anioFundacion}` : undefined;
  const municipios = zonas.length > 0 ? `${zonas.length} ${zonas.length === 1 ? "municipio" : "municipios"}` : undefined;
  const cifras = cifrasCredibilidad({ negocio, valoracion, zonas, contacto });

  return (
    <section aria-labelledby="h1-inicio" className={cn(!imagen && "reticula-papel")}>
      <div className={cn("contenedor grid gap-x-12 pt-6 pb-10 lg:grid-cols-12 lg:pt-7 lg:pb-10", !imagen && "lg:pb-16")}>
        <div className={cn("min-w-0", imagen ? "lg:col-span-7 xl:col-span-6" : "lg:col-span-8")}>
          <Rotulo n={n} texto="Presentación" />
          <h1 id="h1-inicio" className="mt-3 font-titulo text-display leading-[1.04] font-normal tracking-[-0.02em]">
            {negocio.sector} en {contacto.direccion.ciudad}
          </h1>
          <p className="mt-4 max-w-[52ch] text-texto-suave lg:mt-5">{negocio.descripcionCorta}</p>
          {chips.length > 0 && (
            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-linea-plano py-2.5 text-[0.9375rem] font-semibold">
              {chips.map((c, i) => (
                <span key={c} className="flex items-center gap-3">
                  {i > 0 && <Rombo />}
                  {c}
                </span>
              ))}
            </p>
          )}
          <ParCta contacto={contacto} mensaje={mensaje} compacta className="mt-6" />
          {valoracion && (
            <p className="mt-4 flex flex-wrap items-baseline gap-x-3 text-[0.9375rem] text-texto-suave">
              <span className="cifras-antiguas font-titulo text-[1.375rem] text-texto">{mediaVisible(valoracion.media)}</span>
              <span aria-hidden="true" className="tracking-[0.12em] text-texto">
                {"★".repeat(Math.floor(valoracion.media))}
                {"☆".repeat(5 - Math.floor(valoracion.media))}
              </span>
              <span>
                <span className="sr-only">de 5, </span>
                {valoracion.total} reseñas en Google
              </span>
            </p>
          )}
        </div>

        {imagen && (
          <div className="mt-10 lg:col-span-5 lg:col-start-8 lg:mt-0 xl:col-span-5 xl:col-start-8">
            <div className="flex gap-4 xl:gap-6">
              <Foto
                imagen={imagen}
                sizes="(min-width: 1024px) 40vw, 100vw"
                proporcion="relleno"
                preload
                marco="lamina"
                className="min-w-0 flex-1"
                claseFoto="aspect-[3/2] lg:aspect-[4/5]"
                claseImagen="object-[center_40%]"
              />
              {desde && (
                <div aria-hidden="true" className="hidden w-4 flex-col items-center text-acento lg:flex">
                  <span data-dibujar="vertical" className="cota-vertical flex-1" />
                  <span className="cifras-antiguas shrink-0 py-3 font-titulo text-[0.9375rem] whitespace-nowrap [writing-mode:vertical-rl] rotate-180">
                    {desde}
                  </span>
                  <span data-dibujar="vertical" className="cota-vertical flex-1" />
                </div>
              )}
            </div>
            {(desde || municipios) && (
              <p className="cifras-antiguas mt-3 flex items-center gap-3 font-titulo text-[0.9375rem] text-acento lg:hidden">
                {desde && <span>{desde}</span>}
                {desde && municipios && <span aria-hidden="true" data-dibujar="" className="cota flex-1" />}
                {municipios && <span>{municipios}</span>}
              </p>
            )}
          </div>
        )}
      </div>
      {cifras.length > 0 && <FilaCifras cifras={cifras} />}
    </section>
  );
}

/** Fila de cifras de credibilidad (se recompone: 4, 3, 2 o 1), separadas por filetes. */
function FilaCifras({ cifras }: { cifras: Cifra[] }) {
  const columnas = ["", "lg:grid-cols-1", "lg:grid-cols-2", "lg:grid-cols-3", "lg:grid-cols-4"][cifras.length];
  return (
    <div className="contenedor">
      <ul
        className={cn(
          "grid grid-cols-2 gap-px border-y border-linea-plano bg-linea-plano [&>li:last-child:nth-child(odd)]:col-span-2 lg:[&>li:last-child:nth-child(odd)]:col-span-1",
          columnas,
        )}
      >
        {cifras.map((c) => (
          <li key={c.rotulo} data-aparecer="" className="bg-fondo px-3 py-5 sm:px-6 lg:px-7 lg:py-7">
            <p className="cifras-antiguas font-titulo text-cifra leading-none">{c.valor}</p>
            <p className="versalitas mt-3 text-texto-suave">{c.rotulo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
