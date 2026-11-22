import { mediaVisible, type SiteConfig } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";
import { cn } from "@/lib/utils";

import { Titular } from "./Titular";

type Props = {
  config: Pick<SiteConfig, "negocio" | "valoracion" | "zonas">;
  /** Inicio: lema + frase + cifras. En /empresa, solo las cifras. */
  conLema?: boolean;
};

/** Cifras clave (encargo §6.2), cada una solo con dato: años de oficio, media de Google y municipios. */
export async function cifrasClave(config: Props["config"]): Promise<{ cifra: string; texto: string }[]> {
  const { negocio, valoracion, zonas } = config;
  const anio = await anioActual();
  const cifras: { cifra: string; texto: string }[] = [];
  if (negocio.anioFundacion && anio > negocio.anioFundacion) cifras.push({ cifra: String(anio - negocio.anioFundacion), texto: "años de oficio" });
  if (valoracion) cifras.push({ cifra: mediaVisible(valoracion.media), texto: `de media en ${valoracion.total} reseñas en Google` });
  if (zonas.length > 1) cifras.push({ cifra: String(zonas.length), texto: "municipios donde trabajamos" });
  return cifras;
}

/** Lema «El agua, bien llevada.» con máscara por líneas y las cifras en Inter Tight 300 (claro). */
export async function LemaCifras({ config, conLema = true }: Props) {
  const cifras = await cifrasClave(config);
  if (!conLema && cifras.length === 0) return null;
  return (
    <section data-tono="claro" aria-label={conLema ? undefined : "En cifras"} aria-labelledby={conLema ? "titulo-lema" : undefined} className={cn("bg-fondo", conLema ? "pt-[88px] pb-20 lg:pt-36 lg:pb-32" : "pb-20 lg:pb-32")}>
      <div className="contenedor flex flex-col gap-14 lg:gap-24">
        {conLema && (
          <div className="grid gap-[18px] lg:grid-cols-[1fr_minmax(0,360px)] lg:items-center lg:gap-16 libre-flotante">
            <div className="flex flex-col gap-[18px]">
              <p className="etiqueta lg:hidden">{config.negocio.nombre}</p>
              <Titular id="titulo-lema" className="text-display" lineas={["El agua,", <><em>bien llevada</em>.</>]} />
            </div>
            <p className="m-0 text-texto-suave">{config.negocio.descripcionCorta}</p>
          </div>
        )}
        {cifras.length > 0 && (
          <dl className="m-0 flex flex-col border-b border-borde lg:grid lg:grid-cols-3 lg:gap-10 lg:border-b-0 libre-flotante">
            {cifras.map((c, i) => (
              <div
                key={c.texto}
                data-aparecer
                style={{ "--i": i } as React.CSSProperties}
                className="flex flex-row-reverse items-baseline justify-between gap-4 border-t border-borde py-5 lg:flex-col-reverse lg:items-start lg:justify-end lg:gap-4 lg:pt-7"
              >
                <dt className="text-right text-sm text-texto-suave lg:text-left lg:text-[15px]">{c.texto}</dt>
                <dd className="titulo m-0 text-[48px] leading-none lg:text-cifra">{c.cifra}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
