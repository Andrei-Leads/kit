import { Migas } from "@/components/Migas";
import { h1Interior } from "@/lib/estilos";

type Props = {
  /** h1 de la página («Servicios»). */
  titulo: string;
  /** Migas hasta la página actual (el último elemento va sin `href`). */
  migas: { href?: string; texto: string }[];
  /** Línea de datos bajo el h1 (trabajo: «Valencia (Benimaclet) · 2 horas · 2026»). */
  datos?: string;
  /** Entrada de página (empresa, estado vacío): 20 px. */
  intro?: string;
};

/**
 * Cabecera de página interior (mockup «Páginas»: /servicios, /trabajos, /trabajos/[slug], /empresa,
 * /contacto): migas + h1 en serif sobre piedra. Las migas miden 44 px de alto (zona táctil), así que
 * el hueco de arriba es corto: los ~10 px de aire por lado de cada enlace ya cuentan como margen.
 */
export function CabeceraInterior({ titulo, migas, datos, intro }: Props) {
  return (
    <header className="contenedor pt-1 pb-8 lg:pb-14">
      <Migas items={migas} />
      <h1 className={`${h1Interior} mt-1`}>{titulo}</h1>
      {datos && <p className="mt-3 mb-0 text-lg text-tinta-suave">{datos}</p>}
      {intro && <p className="mt-4 mb-0 max-w-[56ch] text-xl leading-normal text-pretty">{intro}</p>}
    </header>
  );
}
