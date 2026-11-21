import type { ReactNode } from "react";

/** Encabezado numerado de sección: filete, «03 · Rótulo» en mono y el h2. */
export function Encabezado({ n, rotulo, titulo, id }: { n?: string; rotulo: string; titulo?: ReactNode; id?: string }) {
  return (
    <>
      <div className="campo">
        {n && <b>{n}</b>}
        <span>{rotulo}</span>
      </div>
      {titulo && (
        <h2 id={id} className="h2-parte mb-6">
          {titulo}
        </h2>
      )}
    </>
  );
}
