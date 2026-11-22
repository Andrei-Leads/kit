import type { CSSProperties } from "react";
import { mediaVisible, type SiteConfig } from "@andrei-leads/core";

import { anioActual } from "@/lib/anio";
import { cn } from "@/lib/utils";

type Props = Pick<SiteConfig, "negocio" | "valoracion" | "zonas"> & { tono?: "claro" | "oscuro"; className?: string };

/**
 * Cifras clave (encargo §6.3), solo con datos: años desde `anioFundacion`, la valoración
 * de Google y `zonas.length`. Cifra en Hanken 300 a 64 px, sin contadores animados. Sin
 * datos, la fila desaparece.
 */
export async function Cifras({ negocio, valoracion, zonas, tono = "oscuro", className }: Props) {
  const cifras: { n: string; texto: string }[] = [];
  if (negocio.anioFundacion) {
    const anios = (await anioActual()) - negocio.anioFundacion;
    if (anios > 0) cifras.push({ n: String(anios), texto: `años en el oficio, desde ${negocio.anioFundacion}` });
  }
  if (valoracion) cifras.push({ n: mediaVisible(valoracion.media), texto: `de ${valoracion.total} reseñas en Google` });
  if (zonas.length > 1) cifras.push({ n: String(zonas.length), texto: "municipios donde trabajamos" });
  if (cifras.length === 0) return null;
  return (
    <dl
      className={cn(
        "m-0 grid grid-cols-2 gap-x-6 gap-y-10 border-t pt-8 lg:grid-cols-[repeat(var(--n),minmax(0,1fr))]",
        tono === "oscuro" ? "border-borde-tinta" : "border-borde",
        className,
      )}
      style={{ "--n": cifras.length } as CSSProperties}
    >
      {cifras.map((c, i) => (
        <div key={c.texto} data-aparecer style={{ "--i": i } as CSSProperties} className="flex flex-col-reverse">
          <dt className={cn("mt-2 max-w-[20ch] text-sm leading-snug", tono === "oscuro" ? "text-sobre-tinta-suave" : "text-texto-suave")}>{c.texto}</dt>
          <dd className="fino m-0 text-5xl leading-none lg:text-[64px]">{c.n}</dd>
        </div>
      ))}
    </dl>
  );
}
