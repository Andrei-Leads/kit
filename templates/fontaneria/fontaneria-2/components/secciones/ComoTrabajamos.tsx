import { pasosProceso, type SiteConfig } from "@andrei-leads/core";

import { h2Seccion } from "@/lib/estilos";

/**
 * «Cómo trabajamos» (encargo §6.4): círculos de 56 px con el número en primario, unidos por una línea
 * de 2 px que se dibuja al entrar (vertical en móvil, horizontal desde 960 px). Sin `proceso`, los
 * pasos por defecto de urgencias de core (sin promesas que el negocio no haya dado).
 */
export function ComoTrabajamos({ proceso }: { proceso: SiteConfig["proceso"] }) {
  const pasos = pasosProceso(proceso, "urgencias");
  const n = pasos.length;
  // Posición de la línea en escritorio: del centro del primer círculo al centro del último.
  const margen = `${50 / n}%`;
  return (
    <section aria-labelledby="titulo-como" className="contenedor flex flex-col gap-[clamp(28px,3.5vw,48px)] py-[clamp(48px,6vw,96px)]">
      <h2 id="titulo-como" className={h2Seccion}>
        Cómo trabajamos
      </h2>
      <ol
        className="relative m-0 flex list-none flex-col gap-7 p-0 lg:grid lg:grid-cols-(--columnas) lg:gap-8"
        style={{ "--columnas": `repeat(${n}, minmax(0, 1fr))`, "--margen": margen } as React.CSSProperties}
      >
        <li
          aria-hidden="true"
          className="linea-pasos absolute top-7 bottom-7 left-[27px] w-0.5 origin-top bg-borde lg:top-[27px] lg:right-(--margen) lg:bottom-auto lg:left-(--margen) lg:h-0.5 lg:w-auto lg:origin-left"
        />
        {pasos.map((p, i) => (
          <li key={p.titulo} className="relative flex items-start gap-4.5 lg:flex-col lg:items-center lg:gap-3.5 lg:text-center">
            <span className="flex size-14 flex-none items-center justify-center rounded-full border-2 border-primario bg-fondo text-[1.375rem] font-extrabold text-primario">
              {i + 1}
            </span>
            <div className="flex flex-col gap-1 pt-3 lg:items-center lg:pt-0">
              <h3 className="m-0 text-xl leading-tight font-bold">{p.titulo}</h3>
              <p className="m-0 max-w-[30ch] text-texto-suave">{p.texto}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
