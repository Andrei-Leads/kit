/** Marcas de corte en las cuatro esquinas de una hoja (decorativas). `inset` en px. */
export function MarcasCorte({ inset = 8 }: { inset?: number }) {
  const b = "corte";
  return (
    <>
      <span aria-hidden="true" className={`${b} border-t border-l`} style={{ top: inset, left: inset }} />
      <span aria-hidden="true" className={`${b} border-t border-r`} style={{ top: inset, right: inset }} />
      <span aria-hidden="true" className={`${b} border-b border-l`} style={{ bottom: inset, left: inset }} />
      <span aria-hidden="true" className={`${b} border-r border-b`} style={{ bottom: inset, right: inset }} />
    </>
  );
}
