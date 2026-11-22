import type { ReactNode } from "react";

import { Pareja } from "@/components/Botones";
import type { DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  cta: DatosCta;
  /** Titular en display; la palabra destacada va en `<em>` (cursiva y primario). */
  titulo: ReactNode;
  textoWhatsapp?: ReactNode;
  /** Páginas interiores: titular algo más pequeño. */
  compacto?: boolean;
};

/** CTA final (tablero Inicio): filete de tinta, titular display y los dos botones. */
export function CtaFinal({ cta, titulo, textoWhatsapp, compacto }: Props) {
  return (
    <section aria-labelledby="titulo-cta" className="border-t border-texto">
      <div className={cn("contenedor", compacto ? "py-[clamp(48px,8vw,112px)]" : "py-[clamp(56px,9vw,128px)]")}>
        <h2 id="titulo-cta" className="titulo-display [&_em]:text-primario-texto"
          style={compacto ? { fontSize: "clamp(2rem, 1.3rem + 3vw, 4.5rem)" } : undefined}>
          {titulo}
        </h2>
        <Pareja cta={cta} textoWhatsapp={textoWhatsapp} className="mt-[clamp(24px,3vw,40px)] max-w-[520px]" />
      </div>
    </section>
  );
}
