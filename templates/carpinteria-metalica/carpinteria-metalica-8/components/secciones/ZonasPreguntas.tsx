import Link from "next/link";
import { listaY, type Pregunta } from "@andrei-leads/core";

import { Preguntas } from "@/components/base/Preguntas";

/** Zonas (encargo §6.10): texto corrido con `listaY` de core. Sin zonas, fuera. */
export function Zonas({ zonas }: { zonas: readonly string[] }) {
  if (zonas.length === 0) return null;
  return (
    <section aria-labelledby="titulo-zonas" className="contenedor pt-[clamp(56px,7vw,96px)] pb-[clamp(32px,4vw,56px)]">
      <div className="grid items-start gap-[clamp(20px,4vw,72px)] lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <p className="antetitulo">Zonas</p>
          <h2 id="titulo-zonas" className="h2">
            Dónde trabajamos
          </h2>
        </div>
        <p className="font-titulo text-entradilla leading-[1.45] text-pretty">
          Trabajamos en {listaY(zonas)}. Si estás cerca y no ves tu municipio, pregúntanos.
        </p>
      </div>
    </section>
  );
}

/** Preguntas frecuentes (encargo §6.10): título a la izquierda y tarjetas de arcilla. */
export function PreguntasFrecuentes({ preguntas, grupo }: { preguntas: readonly Pregunta[]; grupo: string }) {
  if (preguntas.length === 0) return null;
  return (
    <section aria-labelledby={`titulo-${grupo}`} className="contenedor pt-[clamp(32px,4vw,56px)] pb-[clamp(56px,7vw,96px)]">
      <div className="grid items-start gap-[clamp(20px,4vw,72px)] lg:grid-cols-2">
        <h2 id={`titulo-${grupo}`} className="h2">
          Preguntas frecuentes
        </h2>
        <Preguntas preguntas={preguntas} grupo={grupo} />
      </div>
    </section>
  );
}

/** Recordatorio del taller bajo un servicio (encargo §7): «Desde {año} en {ciudad}», solo con año. */
export function Recordatorio({ anio, ciudad }: { anio?: number; ciudad: string }) {
  if (!anio) return null;
  return (
    <aside aria-label="El taller" className="contenedor pb-[clamp(40px,5vw,64px)]">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <p className="-rotate-2 rounded-guijarro-1 bg-alterna px-6 py-3.5 font-titulo text-[22px] font-medium motion-reduce:rotate-0">
          Desde {anio} en {ciudad}
        </p>
        <Link href="/empresa" className="enlace">
          Conoce el taller&nbsp;→
        </Link>
      </div>
    </aside>
  );
}
