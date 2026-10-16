import { Migas } from "@/components/Migas";
import { h1Interior } from "@/lib/estilos";

type Props = {
  /** h1 de la página («Servicios»). */
  titulo: string;
  /** Migas hasta la página actual (el último elemento va sin `href`). */
  migas: { href?: string; texto: string }[];
};

/**
 * Cabecera de página interior (Pantalla, `pageHead`): migas y h1 en 800, sin fondo ni botones.
 * Medidas del diseño: 20 → 44 px arriba. Los enlaces de las migas miden 44 px de alto (zona táctil) con
 * texto de 15 px: ese hueco ya cuenta como margen, de ahí el padding reducido.
 */
export function CabeceraInterior({ titulo, migas }: Props) {
  return (
    <header className="contenedor relative z-10 pt-1 lg:pt-6">
      <Migas items={migas} />
      <h1 className={`${h1Interior} mt-1`}>{titulo}</h1>
    </header>
  );
}
