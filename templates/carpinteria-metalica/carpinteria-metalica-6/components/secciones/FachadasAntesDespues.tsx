import type { SiteConfig } from "@andrei-leads/core";

import { Encabezado } from "@/components/secciones/Encabezado";
import { Galeria } from "@/components/secciones/Galeria";
import { RejillaFachadas } from "@/components/secciones/TarjetaFachada";
import { conAntesPrimero } from "@/lib/textos";

const MAX = 5;

/**
 * Sección estrella (encargo §6.3 y entrega §5): hasta 5 tarjetas, primero las que tienen `antes`;
 * 1 → tarjeta ancha; 3 → 2 + 1 ancha. Con más de 5, «Ver todas las fachadas». Solo `galeria`:
 * rejilla de fotos 4:5. Sin ninguna de las dos, no existe.
 */
export function FachadasAntesDespues({ trabajos, galeria, whatsapp }: Pick<SiteConfig, "trabajos" | "galeria"> & { whatsapp?: string }) {
  if (trabajos.length === 0 && galeria.length === 0) return null;
  const lista = conAntesPrimero(trabajos).slice(0, MAX);
  const conAntes = trabajos.some((t) => t.antes);
  return (
    <section aria-labelledby="titulo-fachadas" className="pt-[clamp(56px,2rem+6vw,112px)] pb-[clamp(40px,1.5rem+3vw,64px)]">
      <div className="contenedor">
        <Encabezado
          id="titulo-fachadas"
          titulo={conAntes ? "Fachadas antes y después" : "Fachadas terminadas"}
          entradilla={conAntes ? "Desliza cada foto para ver el cambio." : undefined}
          enlace={trabajos.length > MAX ? { href: "/trabajos", texto: `Ver las ${trabajos.length} fachadas` } : undefined}
        />
        {lista.length > 0 ? <RejillaFachadas trabajos={lista} whatsapp={whatsapp} /> : <Galeria galeria={galeria} />}
      </div>
    </section>
  );
}
