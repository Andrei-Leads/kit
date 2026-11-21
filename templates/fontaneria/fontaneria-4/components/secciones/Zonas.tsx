import { Encabezado } from "./Encabezado";

/** Zonas (encargo §6.7): casilla «ZONA DE SERVICIO» con los municipios en mono separados por «·». Solo lista. */
export function Zonas({ zonas, n }: { zonas: readonly string[]; n: string }) {
  if (zonas.length === 0) return null;
  return (
    <section id="zona" aria-labelledby="h2-zona" className="px-(--pad) pt-(--sec)">
      <Encabezado n={n} rotulo="Zona" titulo="Dónde abrimos avisos" id="h2-zona" />
      <div className="border border-texto bg-superficie p-3">
        <div className="rotulo text-[0.6875rem]">Zona de servicio</div>
        <p className="mt-1.5 font-titulo text-sm leading-[1.7]">{zonas.join(" · ")}</p>
      </div>
    </section>
  );
}
