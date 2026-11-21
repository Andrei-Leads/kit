import { h2Seccion } from "@/lib/estilos";

/** Marcas con las que trabaja, como píldoras (solo en /empresa). Sin marcas, no existe. */
export function Marcas({ marcas }: { marcas: readonly string[] }) {
  if (marcas.length === 0) return null;
  return (
    <section aria-labelledby="titulo-marcas" className="contenedor flex flex-col gap-4.5 py-[clamp(48px,6vw,88px)]">
      <h2 id="titulo-marcas" className={h2Seccion}>
        Marcas con las que trabajamos
      </h2>
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        {marcas.map((m) => (
          <li key={m} className="flex h-11 items-center rounded-full border border-borde bg-superficie px-5 font-bold">
            {m}
          </li>
        ))}
      </ul>
    </section>
  );
}
