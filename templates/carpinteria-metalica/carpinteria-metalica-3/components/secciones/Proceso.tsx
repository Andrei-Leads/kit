import type { SiteConfig } from "@andrei-leads/core";

import { h2Seccion, seccion } from "@/lib/estilos";

type Props = {
  proceso: SiteConfig["proceso"];
};

const POR_DEFECTO: SiteConfig["proceso"] = [
  { titulo: "Llamas", texto: "Nos cuentas qué se ha roto. Si puedes, envíanos una foto." },
  { titulo: "Vamos", texto: "Lo vemos en el sitio y te decimos el precio antes de empezar." },
  { titulo: "Lo arreglamos", texto: "Lo dejamos funcionando y cerrado, y te explicamos qué ha fallado." },
];

/** «Cómo trabajamos»: hasta 6 pasos; sin datos, los tres de siempre. */
export function Proceso({ proceso }: Props) {
  const pasos = (proceso.length > 0 ? proceso : POR_DEFECTO).slice(0, 6);
  return (
    <section className={seccion}>
      <div className="contenedor flex flex-col gap-5">
        <h2 className={h2Seccion}>Cómo trabajamos</h2>
        <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-5 p-0">
          {pasos.map((p, i) => (
            <li key={`${p.titulo}-${i}`} className="flex items-start gap-3.5">
              <span
                aria-hidden="true"
                className="grid size-10 flex-none place-items-center rounded-md bg-tinta text-xl font-extrabold text-white"
              >
                {i + 1}
              </span>
              <div className="flex flex-col gap-0.5">
                <h3 className="m-0 text-xl leading-tight font-bold">{p.titulo}</h3>
                <p className="m-0 text-tinta-suave">{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
