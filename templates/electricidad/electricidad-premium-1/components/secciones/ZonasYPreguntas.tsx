import type { Pregunta } from "@andrei-leads/core";

import { Preguntas } from "@/components/base/Preguntas";
import { Antetitulo, Senal, Titular } from "@/components/Titular";
import { cn } from "@/lib/utils";

type Props = { zonas: readonly string[]; ciudad: string; preguntas: readonly Pregunta[]; grupo?: string };

/**
 * ZonasYPreguntas (encargo §6.10): `zonas` como texto separado por «·» (nunca
 * enlaces: sin páginas por municipio) y `preguntas` con la pieza base. Cada
 * mitad se oculta sin datos.
 */
export function ZonasYPreguntas({ zonas, ciudad, preguntas, grupo = "preguntas" }: Props) {
  if (zonas.length === 0 && preguntas.length === 0) return null;
  const dos = zonas.length > 0 && preguntas.length > 0;
  return (
    <section data-tono="oscuro" aria-label="Zonas y preguntas" className="seccion">
      <div className={cn("contenedor grid gap-x-[clamp(32px,5vw,96px)] gap-y-16", dos && "lg:grid-cols-2")}>
        {zonas.length > 0 && (
          <div className="flex flex-col gap-6">
            <Antetitulo>Zonas</Antetitulo>
            <Titular
              id="titulo-zonas"
              lineas={[
                <>
                  {ciudad} y su <Senal>área</Senal>.
                </>,
              ]}
            />
            <p className="m-0 max-w-[52ch] text-texto-suave">{zonas.join(" · ")}</p>
          </div>
        )}
        {preguntas.length > 0 && (
          <div className="flex flex-col gap-6">
            <Antetitulo>Preguntas</Antetitulo>
            <h2 className="sr-only">Preguntas frecuentes</h2>
            <Preguntas preguntas={preguntas} grupo={grupo} />
          </div>
        )}
      </div>
    </section>
  );
}
