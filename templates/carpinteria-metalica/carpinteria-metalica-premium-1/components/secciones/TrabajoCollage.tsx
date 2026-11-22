import Link from "next/link";
import type { Trabajo } from "@andrei-leads/core";

import { EnlaceFlecha } from "@/components/EnlaceFlecha";
import { Foto } from "@/components/base/Foto";
import { fichaCorta, lugarAnio, pieOrigen } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  trabajo: Trabajo;
  /** Impar: la foto grande a la derecha y el texto a la izquierda. */
  invertido?: boolean;
  nivel?: "h2" | "h3";
};

/**
 * Un trabajo como collage a dos escalas (encargo §6.4 y §7): `imagenes[0]` grande y, si
 * existe, `imagenes[1]` (o `antes`) en miniatura desplazada con parallax suave; al lado,
 * «{UBICACIÓN} · {AÑO}», el título enlazado, la descripción, la ficha y «Ver el trabajo →».
 */
export function TrabajoCollage({ trabajo: t, invertido, nivel = "h3" }: Props) {
  const Titulo = nivel;
  const grande = t.imagenes[0];
  const mini = t.imagenes[1] ?? t.antes;
  const pie = pieOrigen([grande, mini]);
  const lugar = lugarAnio(t);
  const ficha = fichaCorta(t);
  return (
    <article className="rejilla items-center gap-y-8">
      <div className={cn("lg:row-start-1", invertido ? "lg:col-[6/13]" : "lg:col-[1/8]")}>
        <div className={cn("relative", mini && "pb-10 lg:pb-16")}>
          <div className={cn("w-[80%] lg:w-[82%]", invertido && "ml-auto")}>
            <Foto imagen={grande} sizes="(min-width: 1024px) 45vw, 80vw" etiqueta="no" transicion={`trabajo-${t.slug}`} />
          </div>
          {mini && (
            <div className={cn("absolute bottom-0 z-[2] w-[40%] lg:w-[36%]", invertido ? "left-0" : "right-0")}>
              <div className="px-mini">
                <Foto imagen={mini} sizes="(min-width: 1024px) 20vw, 40vw" etiqueta="no" />
              </div>
            </div>
          )}
        </div>
        {pie && <p className={cn("m-0 mt-2 text-xs text-texto-suave", invertido ? "text-right" : "text-left")}>{pie}</p>}
      </div>
      <div className={cn("lg:row-start-1", invertido ? "lg:col-[1/5]" : "lg:col-[9/13]")} data-aparecer>
        {lugar && <p className="etiqueta">{lugar}</p>}
        <Titulo className="fino m-0 mt-3 text-[26px] leading-[1.12] lg:text-[34px]">
          <Link href={`/trabajos/${t.slug}`} className="no-underline hover:underline hover:decoration-1 hover:underline-offset-[6px]">
            {t.titulo}
          </Link>
        </Titulo>
        <p className="m-0 mt-4 text-texto-suave">{t.descripcion}</p>
        {ficha && <p className="m-0 mt-5 border-t border-borde pt-4 text-sm">{ficha}</p>}
        <EnlaceFlecha href={`/trabajos/${t.slug}`} className="mt-3">
          Ver el trabajo
        </EnlaceFlecha>
      </div>
    </article>
  );
}
