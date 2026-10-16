import type { SiteConfig } from "@andrei-leads/core";

import { Sello } from "@/components/Sello";
import { etiquetaCampo } from "@/lib/estilos";
import { campoAcreditacion } from "@/lib/formato";

/**
 * Bloque de habilitación de /empresa (Specs §2): caja sobre `primario-tinte` con borde primario, el
 * sello de 104 px (se «estampa» al entrar en pantalla: `data-anim="sello"`, solo CSS bajo `.js`, sin
 * estado de React) y, a su lado, cada acreditación como campo de documento. Solo se pinta si hay
 * `acreditaciones`: sin ellas no hay sello (el dato real va siempre en texto).
 */
export function EmpresaSello({ acreditaciones }: { acreditaciones: SiteConfig["acreditaciones"] }) {
  if (acreditaciones.length === 0) return null;
  return (
    <section
      aria-labelledby="titulo-habilitacion"
      className="flex flex-col items-start gap-6 border border-primario bg-primario-tinte p-6 md:flex-row"
    >
      <h2 id="titulo-habilitacion" className="sr-only">
        Empresa instaladora habilitada
      </h2>
      <Sello animar className="size-[104px]" />
      <ul className="m-0 flex min-w-0 flex-1 list-none flex-col gap-3 self-stretch p-0">
        {acreditaciones.map((a) => {
          const campo = campoAcreditacion(a);
          return (
            <li key={`${a.nombre}-${a.numero ?? ""}`} className="flex flex-col gap-[3px] border border-regla bg-papel px-3.5 py-3">
              <span className={etiquetaCampo}>{campo.etiqueta}</span>
              <span className="font-mono text-lg leading-[1.3] font-bold [overflow-wrap:anywhere]">{campo.valor}</span>
              {campo.detalle && <span className="text-[15px] leading-[1.4] text-tinta-cuerpo">{campo.detalle}</span>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
