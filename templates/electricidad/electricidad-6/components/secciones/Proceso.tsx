import { pasosProceso, type SiteConfig } from "@andrei-leads/core";

/**
 * Proceso (encargo §6.3): `proceso` o los pasos por defecto de urgencias de core (Llamas → Vamos → Lo
 * arreglamos), en paralelogramos encadenados con el número a 56 px. Las fotos de paso (0.7.0) no se
 * pintan: el inicio de «Apagón» no lleva fotos.
 */
export function Proceso({ proceso }: { proceso: SiteConfig["proceso"] }) {
  const pasos = pasosProceso(proceso, "urgencias");
  return (
    <section aria-labelledby="titulo-proceso" className="bg-fondo">
      <div className="contenedor flex flex-col gap-6 py-9 lg:py-13">
        <h2 id="titulo-proceso" className="titulo-h2 m-0">
          Cómo trabajamos
        </h2>
        <ol className="m-0 grid list-none gap-3 p-0 lg:grid-cols-3 lg:gap-4">
          {pasos.map((p, i) => (
            <li key={p.titulo} data-aparecer className="losa flex items-start gap-4 px-7 py-5 lg:px-8">
              <span aria-hidden="true" className="condensada text-[3.5rem] leading-[0.85]">
                {i + 1}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="condensada m-0 text-[1.5rem] leading-none uppercase">{p.titulo}</h3>
                <p className="m-0 text-texto-suave">{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
