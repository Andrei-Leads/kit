/** Cinco estrellas de texto (decorativas); la puntuación va en texto para el lector de pantalla. */
export function Estrellas({ puntuacion }: { puntuacion: number }) {
  const llenas = Math.round(puntuacion);
  return (
    <p className="m-0 text-lg tracking-[0.15em]">
      <span aria-hidden="true">{"★".repeat(llenas) + "☆".repeat(5 - llenas)}</span>
      <span className="sr-only">{puntuacion} de 5</span>
    </p>
  );
}
