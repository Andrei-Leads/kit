import { listaY, type SiteConfig } from "@andrei-leads/core";

import { Preguntas } from "@/components/base/Preguntas";

type Props = Pick<SiteConfig, "zonas" | "preguntas"> & {
  /** /empresa: solo las zonas (las preguntas son del inicio). */
  sinPreguntas?: boolean;
};

/**
 * «Dónde trabajamos» + «Preguntas frecuentes» sobre `alterna` (encargo §6.8): las zonas como una
 * frase (nunca páginas por municipio) y las preguntas en tarjetas `<details name>`. Cada mitad se
 * oculta sin datos; sin ninguna, no existe.
 */
export function ZonasPreguntas({ zonas, preguntas, sinPreguntas }: Props) {
  const conPreguntas = !sinPreguntas && preguntas.length > 0;
  if (zonas.length === 0 && !conPreguntas) return null;
  return (
    <section aria-label={zonas.length > 0 ? "Dónde trabajamos" : "Preguntas frecuentes"} className="bg-alterna">
      <div className="contenedor seccion flex flex-wrap gap-[clamp(40px,6vw,96px)]">
        {zonas.length > 0 && (
          <div className="min-w-0 flex-[1_1_280px]">
            <h2 className="mb-3 text-h2 font-[640]">Dónde trabajamos</h2>
            <p className="text-texto-suave text-pretty">Trabajamos en {listaY(zonas)}.</p>
          </div>
        )}
        {conPreguntas && (
          <div className="min-w-0 flex-[2_1_420px]">
            <h2 className="mb-5 text-h2 font-[640]">Preguntas frecuentes</h2>
            <Preguntas preguntas={preguntas} grupo="preguntas-inicio" />
          </div>
        )}
      </div>
    </section>
  );
}
