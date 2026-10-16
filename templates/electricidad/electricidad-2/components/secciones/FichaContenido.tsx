import type { Servicio } from "@andrei-leads/core";
import { Check } from "lucide-react";

import { textos } from "@/lib/textos";

type Props = {
  servicio: Pick<Servicio, "contenido" | "incluye">;
};

/**
 * Cuerpo de la ficha (mockup 2b/2i): a la izquierda `contenido` (un `<p>` por párrafo, hasta 68 caracteres de
 * ancho); a la derecha «Qué incluye» (h2) con la lista de `incluye` y un check en primario. Cada bloque
 * sale solo con datos; si falta uno, el otro ocupa la columna sin hueco. Sin ninguno, la página no
 * llama a este componente (la `descripcion` ya está en la cabecera: no se repite).
 */
export function FichaContenido({ servicio }: Props) {
  const { contenido, incluye } = servicio;
  return (
    <div className="contenedor pb-14 lg:pb-16">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-x-14">
        {contenido.length > 0 && (
          <div className="flex max-w-[68ch] flex-col gap-4">
            {contenido.map((p, i) => (
              <p key={`${i}-${p.slice(0, 24)}`} className="m-0 text-pretty">
                {p}
              </p>
            ))}
          </div>
        )}
        {incluye.length > 0 && (
          <div>
            <h2 className="m-0 mb-4 font-serif text-[26px] leading-[1.2] font-semibold">{textos.queIncluye}</h2>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {incluye.map((texto, i) => (
                <li key={`${i}-${texto}`} className="flex items-start gap-3 text-lg">
                  <Check aria-hidden="true" strokeWidth={2.25} className="mt-0.5 size-[22px] flex-none text-primario" />
                  {texto}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
