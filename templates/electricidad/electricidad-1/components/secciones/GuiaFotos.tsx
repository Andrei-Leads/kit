import type { Imagen } from "@andrei-leads/core";

import { Foto } from "@/components/Foto";
import { seccionPlana } from "@/lib/estilos";

/**
 * Fotos del servicio (`imagenes`, 4:3): una columna en móvil y dos en escritorio. Sin título ni
 * número (el diseño no las numera); `alt` siempre de los datos. La página solo la llama con fotos.
 */
export function GuiaFotos({ imagenes }: { imagenes: Imagen[] }) {
  return (
    <div className={seccionPlana}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {imagenes.map((imagen) => (
          <Foto
            key={imagen.src}
            imagen={imagen}
            sizes="(min-width: 1200px) 552px, (min-width: 768px) 44vw, 100vw"
            className="m-0"
          />
        ))}
      </div>
    </div>
  );
}
