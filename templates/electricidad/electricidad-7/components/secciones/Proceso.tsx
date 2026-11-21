import { pasosProceso, type SiteConfig } from "@andrei-leads/core";

/**
 * «Cómo trabajamos» como un hilo de mensajes salientes y entrantes alternos, con el número en un
 * círculo primario. `proceso` de los datos o los pasos por defecto de urgencias de core.
 */
export function Proceso({ proceso }: { proceso: SiteConfig["proceso"] }) {
  const pasos = pasosProceso(proceso, "urgencias");
  return (
    <section aria-labelledby="h-proceso" className="bg-alterna py-[clamp(56px,3rem+3vw,104px)]">
      <div className="contenedor flex flex-wrap items-start gap-x-[clamp(32px,6vw,96px)] gap-y-7">
        <h2 id="h-proceso" className="m-0 flex-[1_1_260px] text-h2 leading-[1.1] font-black tracking-[-0.01em]">
          Cómo trabajamos
        </h2>
        <ol className="m-0 flex flex-[2_1_340px] list-none flex-col gap-3 p-0">
          {pasos.map((p, i) => (
            <li
              key={p.titulo}
              data-aparecer
              className={`flex max-w-[88%] items-start gap-3.5 px-5 py-4 ${
                i % 2 === 0 ? "self-end rounded-[24px_24px_6px_24px] bg-burbuja-sale" : "self-start rounded-[24px_24px_24px_6px] bg-superficie"
              }`}
            >
              <span aria-hidden="true" className="grid size-9 flex-none place-items-center rounded-full bg-primario text-[17px] font-black text-sobre-primario">
                {i + 1}
              </span>
              <span>
                <strong className="block text-[19px] leading-tight font-black">{p.titulo}</strong>
                <span className="block leading-snug text-texto-suave">{p.texto}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
