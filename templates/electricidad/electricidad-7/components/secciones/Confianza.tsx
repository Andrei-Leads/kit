/** Fila de burbujas-ficha (acreditaciones, años, garantías, valoración). Sin fichas, nada. */
export function Confianza({ fichas, etiqueta = "Por qué fiarte", className }: { fichas: readonly string[]; etiqueta?: string; className?: string }) {
  if (fichas.length === 0) return null;
  return (
    <ul aria-label={etiqueta} className={`m-0 flex list-none flex-wrap gap-2.5 p-0 ${className ?? ""}`}>
      {fichas.map((f) => (
        <li
          key={f}
          className="flex items-center gap-2.5 rounded-[20px_20px_20px_6px] border border-linea bg-superficie px-[18px] py-3 text-base leading-snug font-bold"
        >
          <span aria-hidden="true" className="size-2 flex-none rounded-full bg-acento" />
          {f}
        </li>
      ))}
    </ul>
  );
}
