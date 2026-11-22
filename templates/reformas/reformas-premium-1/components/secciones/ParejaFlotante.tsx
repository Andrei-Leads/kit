import { Pareja } from "@/components/Botones";
import { llamarPunto, type DatosCta } from "@/lib/textos";

/**
 * Pareja flotante en escritorio (encargo §5.5, P2.4): con `html[data-scroll="abajo"]`
 * (cabecera escondida), abajo a la derecha, 48 px. Sin JS no hace falta: la cabecera
 * no se esconde. La muestra y la anima `.pareja-flotante` (globals.css).
 */
export function ParejaFlotante({ datos }: { datos: DatosCta }) {
  return (
    <div className="pareja-flotante fixed right-6 bottom-6 z-40 rounded-boton bg-fondo p-1 shadow-[0_0_0_1px_var(--color-borde)]">
      <Pareja datos={datos} fondo="claro" alto={48} textoWa="WhatsApp" textoLlamar={llamarPunto(datos.telefono)} className="flex-nowrap gap-1" />
    </div>
  );
}
