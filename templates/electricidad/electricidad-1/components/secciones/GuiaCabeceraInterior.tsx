import { Migas } from "@/components/Migas";
import { h1Interior } from "@/lib/estilos";

type Props = {
  /** h1 de la página («Servicios»). */
  titulo: string;
  /** Migas hasta la página actual (el último elemento va sin `href`). */
  migas: { href?: string; texto: string }[];
};

/**
 * Cabecera de página interior (mockup «Páginas»): migas, h1 en mono y regla de 1 px debajo.
 * Sin fondo ni botones: el contenido empieza justo debajo.
 */
export function GuiaCabeceraInterior({ titulo, migas }: Props) {
  return (
    <div className="border-b border-regla">
      <div className="contenedor flex flex-col gap-3.5 pt-3 pb-7 md:pt-6 md:pb-11">
        <Migas items={migas} />
        <h1 className={h1Interior}>{titulo}</h1>
      </div>
    </div>
  );
}
