import { Migas } from "@/components/Migas";
import { h1Interior } from "@/lib/estilos";

type Props = {
  /** h1 de la página («Servicios»). */
  titulo: string;
  /** Migas hasta la página actual (el último elemento va sin `href`). */
  migas: { href?: string; texto: string }[];
};

/**
 * Cabecera de página interior (mockup «Páginas»: /servicios, /trabajos, /trabajos/[slug], /empresa,
 * /contacto): migas, h1 en mono y regla de 1 px debajo. Sin fondo ni botones.
 * Medidas del mockup: 24 → 40 px arriba, 14 px entre migas y h1, 28 → 44 px abajo. Los enlaces de
 * las migas miden 44 px de alto (zona táctil) con texto de 16 px: esos 14 px por lado ya cuentan
 * como margen, de ahí pt-2.5 / md:pt-[26px] y sin gap.
 */
export function CabeceraInterior({ titulo, migas }: Props) {
  return (
    <header className="border-b border-regla">
      <div className="contenedor flex flex-col pt-2.5 pb-7 md:pt-[26px] md:pb-11">
        <Migas items={migas} />
        <h1 className={h1Interior}>{titulo}</h1>
      </div>
    </header>
  );
}
