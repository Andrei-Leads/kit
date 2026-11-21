/** Estrellas en latón con su texto para lector de pantalla («5 de 5 estrellas»). */
export function Estrellas({ puntuacion, className }: { puntuacion: number; className?: string }) {
  return (
    <span className={className} style={{ letterSpacing: "0.1em" }}>
      <span className="sr-only">{puntuacion} de 5 estrellas</span>
      <span aria-hidden="true">
        <span className="text-primario-luz">{"★".repeat(puntuacion)}</span>
        <span className="text-borde">{"★".repeat(5 - puntuacion)}</span>
      </span>
    </span>
  );
}
