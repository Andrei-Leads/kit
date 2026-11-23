import { pasosProceso, type SiteConfig } from "@andrei-leads/core";

/**
 * Proceso (encargo §6.6): `proceso` o los pasos por defecto de core para «proyecto» (sin
 * promesas). Tarjetas en `primario-suave` con el número en una pastilla primaria; 2 columnas en
 * móvil y una fila en escritorio, sin líneas que las unan. Aparecen escalonadas (globals.css).
 */
export function Proceso({ proceso }: { proceso: SiteConfig["proceso"] }) {
  const pasos = pasosProceso(proceso, "proyecto");
  return (
    <section aria-labelledby="titulo-proceso" className="pt-[clamp(56px,2rem+6vw,112px)]">
      <div className="contenedor">
        <h2 id="titulo-proceso" className="titulo-seccion mb-7">
          Cómo trabajamos
        </h2>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
          {pasos.map((p, i) => (
            <li key={p.titulo} className="aparecer-paso flex flex-col gap-2.5 rounded-tarjeta bg-primario-suave px-[18px] pt-[18px] pb-5">
              <span
                aria-hidden="true"
                className="flex h-[34px] min-w-[34px] items-center justify-center self-start rounded-pastilla bg-primario px-2.5 text-base font-extrabold text-sobre-primario"
              >
                {i + 1}
              </span>
              <h3 className="text-[17px] leading-[1.25] font-extrabold">
                <span className="sr-only">Paso {i + 1}: </span>
                {p.titulo}
              </h3>
              <p className="text-[15px] leading-[1.45] text-texto-suave">{p.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
