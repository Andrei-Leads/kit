import type { ReactNode } from "react";
import type { Ancla, Imagen } from "@andrei-leads/core";

import { AntesDespues, type Forma } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";

type Props = {
  migas: readonly Ancla[];
  titulo: string;
  /** El par antes/después (si hay `antes`) o la foto sola en el arco. Sin ninguno, cabecera sólida y sin arco. */
  par?: { antes: Imagen; despues: Imagen; titulo: string };
  foto?: Imagen;
  /** Proporción del arco: «apaisada» (servicio, 4:3) o «cuadrada» (trabajo, 1:1); 3:2 desde `lg`. */
  forma: Forma;
  children?: ReactNode;
};

const SIZES = "(min-width: 1280px) 620px, (min-width: 1024px) 52vw, 100vw";
const PROPORCION_FOTO: Record<Forma, string> = {
  apaisada: "aspect-[4/3] lg:aspect-[3/2]",
  cuadrada: "aspect-square lg:aspect-[3/2]",
  vertical: "aspect-[4/5] lg:aspect-[3/2]",
};

/**
 * Cabecera de las fichas de servicio y de trabajo (encargo §7): el arco arriba (en móvil sube bajo
 * la cabecera transparente; en escritorio, a la izquierda con 104 px de aire) y, al lado, migas,
 * h1 y lo que ponga la página (descripción, precio, ficha, botones).
 */
export function CabeceraFicha({ migas, titulo, par, foto, forma, children }: Props) {
  const conMedio = Boolean(par || foto);
  return (
    <section data-cabecera={conMedio ? "transparente" : undefined} className={conMedio ? "bajo-cabecera" : undefined}>
      <div className={conMedio ? "contenedor flex flex-wrap items-end gap-x-[clamp(32px,5vw,64px)] gap-y-4 lg:pt-[104px]" : "contenedor pt-10"}>
        {par ? (
          <AntesDespues
            antes={par.antes}
            despues={par.despues}
            titulo={par.titulo}
            sizes={SIZES}
            forma={forma}
            preload
            antesInmediata
            className="min-w-0 flex-[1.25_1_480px] max-lg:[@media(scripting:none)]:pt-[calc(var(--alto-cabecera)+8px)]"
          />
        ) : foto ? (
          <div className="min-w-0 flex-[1.25_1_480px]">
            <Foto imagen={foto} sizes={SIZES} proporcion="relleno" preload posicionEtiqueta="arco" className={PROPORCION_FOTO[forma]} />
          </div>
        ) : null}
        <div className="min-w-0 flex-[1_1_340px]">
          <Migas migas={migas} />
          <h1 className="mt-2 text-[clamp(2rem,1.4rem+2.8vw,4rem)] leading-[1.04] font-[660] tracking-[-0.025em] text-balance">{titulo}</h1>
          {children}
        </div>
      </div>
    </section>
  );
}
