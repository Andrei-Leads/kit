import { pasosProceso, type SiteConfig } from "@andrei-leads/core";

/**
 * Cómo trabajamos: número en condensada hueca (contorno de 1,5 px) de 6 rem y el texto al lado.
 * Sin `proceso`, los pasos por defecto de urgencias de core (Llamas → Vamos → Lo arreglamos).
 */
export function ComoTrabajamos({ proceso }: { proceso: SiteConfig["proceso"] }) {
  const pasos = pasosProceso(proceso, "urgencias");
  return (
    <section className="bg-superficie">
      <div className="contenedor seccion-y">
        <h2 className="condensada mb-7 text-h2">Cómo trabajamos</h2>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-x-10 gap-y-7">
          {pasos.map((p, i) => (
            <li key={p.titulo} className="flex items-start gap-[18px]">
              <span
                aria-hidden="true"
                className="condensada flex-none text-8xl leading-[0.78] text-transparent [-webkit-text-stroke:1.5px_var(--color-primario-luz)]"
              >
                {i + 1}
              </span>
              <div className="pt-0.5">
                <h3 className="condensada text-2xl leading-[1.05]">{p.titulo}</h3>
                <p className="mt-1.5 text-texto-suave">{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
