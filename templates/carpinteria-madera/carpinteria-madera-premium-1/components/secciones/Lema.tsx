import type { Imagen } from "@andrei-leads/core";

import { Destacada, TituloLineas } from "@/components/Titulo";
import { Foto } from "@/components/base/Foto";

/** Lema (encargo §6.2): «Hecho a medida. Hecho aquí.» con la descripción corta y, si hay, la viruta en 4:5 con parallax. */
export function Lema({ descripcion, imagen }: { descripcion: string; imagen?: Imagen }) {
  return (
    <section data-tono="claro" aria-label="Lema" className="seccion">
      <div className="contenedor flex flex-wrap items-end justify-between gap-12">
        <div className="max-w-[760px] flex-[1_1_520px]">
          <TituloLineas lineas={[<>Hecho <Destacada>a medida.</Destacada></>, "Hecho aquí."]} className="text-h2" />
          <p className="medida mt-7 text-cuerpo text-texto-suave">{descripcion}</p>
        </div>
        {imagen && (
          <div className="parallax-mini w-full max-w-[62%] min-w-[200px] flex-[0_1_300px]">
            <Foto imagen={imagen} sizes="(min-width: 1024px) 300px, 62vw" proporcion="4/5" className="rounded-foto" />
          </div>
        )}
      </div>
    </section>
  );
}
