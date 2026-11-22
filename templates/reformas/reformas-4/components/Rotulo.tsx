/** Rótulo de sección del diseño: «02 SERVICIOS ———» (el número sale del índice de la página). */
export function Rotulo({ n, children }: { n?: string; children: React.ReactNode }) {
  return (
    <div className="rotulo">
      {n && <b>{n}</b>}
      <span>{children}</span>
    </div>
  );
}
