import Link from "next/link";
import type { SiteConfig, Trabajo } from "@andrei-leads/core";

import { Cronologia } from "@/components/Cronologia";
import { Pareja } from "@/components/Pareja";
import { valoracionCorta } from "@/lib/formato";

type Props = {
  negocio: Pick<SiteConfig["negocio"], "sector" | "descripcionCorta">;
  contacto: SiteConfig["contacto"];
  valoracion?: SiteConfig["valoracion"];
  pasos: readonly { titulo: string }[];
  /** Primera obra del orden del diario: «Última entrada: …». */
  ultima?: Trabajo;
  mensaje: string;
};

/**
 * Hero tipográfico con cronología (encargo §5 y §6.1). Sin foto ni vídeo: el LCP es el h1 en mono.
 * Nada se anima: cinta, h1, valoración, botones y cronología quietos desde el primer pintado.
 */
export function HeroCronologia({ negocio, contacto, valoracion, pasos, ultima, mensaje }: Props) {
  const ciudad = contacto.direccion.ciudad;
  return (
    <section id="inicio" className="reticula border-b border-borde px-(--pad) pt-[clamp(28px,1rem+4vw,104px)] pb-[clamp(48px,2rem+4vw,104px)]">
      <div className="grid max-w-[1040px] justify-items-start gap-5">
        <span className="cinta">Diario de obra · {ciudad}</span>
        <h1 className="mono max-w-[16ch] text-display leading-[1.04] font-medium tracking-[-0.03em] [overflow-wrap:anywhere] text-texto">
          {negocio.sector} en {ciudad}
        </h1>
        <p className="max-w-[52ch] text-cuerpo leading-[1.6] text-texto-suave">{negocio.descripcionCorta}</p>
        {valoracion && (
          <p className="mono text-[13px] text-texto">
            <span aria-hidden="true" className="text-primario-claro">
              ★★★★★{" "}
            </span>
            {valoracionCorta(valoracion)}
          </p>
        )}
        <Pareja contacto={contacto} mensaje={mensaje} className="mt-1" />
        <div className="mt-8 w-full">
          <Cronologia pasos={pasos} etiqueta="Pasos de una obra" />
        </div>
        {ultima && (
          <Link
            href={`/trabajos/${ultima.slug}`}
            className="mono flex min-h-11 items-center border-b border-borde text-[13px] text-texto-suave no-underline hover:border-primario-claro hover:text-texto"
          >
            Última entrada: {[ultima.titulo, ultima.duracion].filter(Boolean).join(" · ")} →
          </Link>
        )}
      </div>
    </section>
  );
}
