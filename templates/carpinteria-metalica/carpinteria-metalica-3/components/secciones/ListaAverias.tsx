import type { Servicio } from "@andrei-leads/core";

import { FilaAveria } from "./FilaAveria";

type Props = {
  servicios: Servicio[];
  nivelTitulo: "h2" | "h3";
};

/** Lista vertical de filas-placa. 1 servicio → fila `unica`; 8 o más → `compacta`. */
export function ListaAverias({ servicios, nivelTitulo }: Props) {
  if (servicios.length === 0) return null;
  const variante = servicios.length === 1 ? "unica" : servicios.length >= 8 ? "compacta" : "normal";
  return (
    <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
      {servicios.map((s) => (
        <li key={s.slug}>
          <FilaAveria servicio={s} nivelTitulo={nivelTitulo} variante={variante} />
        </li>
      ))}
    </ul>
  );
}
