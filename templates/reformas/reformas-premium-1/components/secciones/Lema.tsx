import { mediaVisible, type SiteConfig } from "@andrei-leads/core";

import { Titular } from "@/components/Botones";
import { TEXTOS } from "@/lib/textos";
import { cn } from "@/lib/utils";

import { Collage } from "./Collage";

type Props = {
  config: Pick<SiteConfig, "negocio" | "valoracion" | "trabajos" | "imagenesHero">;
};

/** Cifras clave: solo con su dato («n obras publicadas» con 3 o más). */
export function cifras({ negocio, valoracion, trabajos }: Pick<SiteConfig, "negocio" | "valoracion" | "trabajos">) {
  return [
    negocio.anioFundacion ? { k: "Reformando casas", v: `Desde ${negocio.anioFundacion}` } : null,
    valoracion ? { k: `${valoracion.total} reseñas en Google`, v: `${mediaVisible(valoracion.media)} de 5` } : null,
    trabajos.length >= 3 ? { k: "obras publicadas", v: String(trabajos.length) } : null,
  ].filter((c): c is { k: string; v: string } => c !== null);
}

/** Fila de cifras entre filetes (lema y /empresa). */
export function Cifras({ lista, className }: { lista: { k: string; v: string }[]; className?: string }) {
  if (lista.length === 0) return null;
  return (
    <dl className={cn("m-0 grid gap-x-10 gap-y-8 sm:grid-cols-3", className)}>
      {lista.map((c, i) => (
        <div key={c.k} data-aparecer style={{ "--i": i } as React.CSSProperties} className="flex flex-col-reverse border-t border-borde pt-5">
          <dd className="m-0 text-[clamp(2.5rem,1.8rem+2.4vw,3.5rem)] leading-none tracking-[-0.02em]">{c.v}</dd>
          <dt className="mb-2 text-sm text-texto-suave">{c.k}</dt>
        </div>
      ))}
    </dl>
  );
}

/**
 * El lema (encargo §5.2): «Reformar es *volver* a casa.» a gran tamaño, con el collage
 * 4:5 de `imagenesHero[1]` y `[2]` (con parallax: ya no es primera pantalla) y las
 * cifras. Sin las fotos 2 y 3, el lema va solo a ancho completo.
 */
export function Lema({ config }: Props) {
  const [, grande, mini] = config.imagenesHero;
  const lista = cifras(config);
  return (
    <section data-tono="claro" className="seccion bg-fondo">
      <div className="contenedor">
        <div className={cn("grid items-center gap-12", grande && "lg:grid-cols-12")}>
          <Titular
            tamano="display"
            antes={TEXTOS.lema.antes}
            destacada={TEXTOS.lema.destacada}
            despues={TEXTOS.lema.despues}
            className={cn(grande ? "lg:col-span-6" : "max-w-[14ch]")}
          />
          {grande && (
            <Collage
              grande={grande}
              mini={mini}
              sizes="(min-width: 1024px) 360px, 70vw"
              paralaje
              className="lg:col-span-5 lg:col-start-8"
            />
          )}
        </div>
        <Cifras lista={lista} className="mt-[clamp(56px,6vw,112px)]" />
      </div>
    </section>
  );
}
