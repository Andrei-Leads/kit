import { Senal, Titular } from "@/components/Titular";

/**
 * Lema (encargo §6.2): «Bien hecho por dentro.» a --text-display. Texto fijo de
 * interfaz que abre la web y la cierra en el pie. Es un párrafo, no un título.
 */
export function Lema({ className }: { className?: string }) {
  return (
    <Titular
      como="p"
      lineas={[
        <>
          Bien hecho <Senal>por dentro</Senal>.
        </>,
      ]}
      tamano="display"
      className={className}
    />
  );
}
