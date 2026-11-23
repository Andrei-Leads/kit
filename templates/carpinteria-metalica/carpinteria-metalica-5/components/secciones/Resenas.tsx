import Link from "next/link";
import { fechaResena, type Resena, type SiteConfig, type Trabajo } from "@andrei-leads/core";

import { Filetes } from "@/components/Filetes";
import { textoValoracion } from "@/lib/textos";

type Props = {
  resenas: readonly Resena[];
  valoracion: SiteConfig["valoracion"];
  fichaGoogle?: string;
  /** Para el `testimonio` de obra (solo en el inicio). */
  trabajos?: readonly Trabajo[];
};

const LARGA = 280;

/** Más reciente primero (AAAA-MM[-DD] se ordena como texto); sin fecha, al final. */
function porFecha(resenas: readonly Resena[]): Resena[] {
  return [...resenas].sort((a, b) => (b.fecha ?? "").localeCompare(a.fecha ?? ""));
}

function Firma({ r, pequena }: { r: Resena; pequena?: boolean }) {
  return (
    <figcaption className={`flex flex-wrap items-center gap-3 font-medium tracking-[0.12em] text-texto-suave uppercase ${pequena ? "mt-3 text-xs" : "mt-6 text-[13px]"}`}>
      <Filetes puntos={r.puntuacion} ancho={pequena ? 10 : 12} />
      <span className="sr-only">Puntuación: {r.puntuacion} de 5. </span>
      {r.autor}
      {r.fecha && <> · {fechaResena(r.fecha)}</>}
    </figcaption>
  );
}

/**
 * «Lo que *cuentan*» (encargo §6.7): una reseña grande en serif cursiva (la más reciente de
 * menos de 280 caracteres) y dos pequeñas al lado (debajo en móvil), cortadas a 6 líneas con
 * «Leerla entera en Google» si pasan de 280 y hay ficha. Filetes en lugar de estrellas. Debajo,
 * el `testimonio` de una obra con su enlace. Sin reseñas, la sección no existe.
 */
export function Resenas({ resenas, valoracion, fichaGoogle, trabajos = [] }: Props) {
  if (resenas.length === 0) return null;
  const orden = porFecha(resenas);
  const grande = orden.find((r) => r.texto.length < LARGA) ?? orden[0];
  const pequenas = orden.filter((r) => r !== grande).slice(0, 2);
  const conTestimonio = trabajos.find((t) => t.testimonio);
  return (
    <section aria-labelledby="titulo-resenas" className="contenedor seccion">
      <div className="mb-[clamp(32px,5vw,64px)] flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 id="titulo-resenas" className="titulo-h2">
          Lo que <em>cuentan</em>
        </h2>
        <div className="flex flex-wrap items-center gap-5">
          {valoracion && <span className="text-sm text-texto-suave">{textoValoracion(valoracion)}</span>}
          {fichaGoogle && (
            <a href={fichaGoogle} target="_blank" rel="noopener noreferrer" className="enlace">
              Ver todas en Google
            </a>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-start gap-x-[clamp(32px,5vw,80px)] gap-y-12">
        <figure className="m-0 flex-[2_1_460px] border-t border-anodizado pt-7">
          <blockquote className="m-0 font-titulo text-[clamp(1.625rem,1.2rem+1.4vw,2.25rem)] leading-[1.3] font-[350] text-pretty italic">«{grande.texto}»</blockquote>
          <Firma r={grande} />
        </figure>
        {pequenas.length > 0 && (
          <div className="flex flex-[1_1_300px] flex-col gap-8">
            {pequenas.map((r, i) => {
              const cortar = r.texto.length > LARGA && Boolean(fichaGoogle);
              return (
                <figure key={`${r.autor}-${r.fecha ?? i}`} className="m-0 border-t border-borde pt-5">
                  <blockquote className={`m-0 text-base leading-[1.6] text-pretty ${cortar ? "line-clamp-6" : ""}`}>«{r.texto}»</blockquote>
                  {cortar && (
                    <a href={fichaGoogle} target="_blank" rel="noopener noreferrer" className="enlace text-sm">
                      Leerla entera en Google
                    </a>
                  )}
                  <Firma r={r} pequena />
                </figure>
              );
            })}
          </div>
        )}
      </div>
      {conTestimonio?.testimonio && (
        <div className="mt-14 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-borde pt-7">
          <p className="m-0 flex-[1_1_320px] font-titulo text-[22px] leading-[1.4] italic">
            «{conTestimonio.testimonio.texto}»{" "}
            <span className="font-texto text-[13px] tracking-[0.12em] text-texto-suave uppercase not-italic">— {conTestimonio.testimonio.autor}</span>
          </p>
          <Link href={`/trabajos/${conTestimonio.slug}`} className="enlace">
            Ver la obra: {conTestimonio.titulo}
          </Link>
        </div>
      )}
    </section>
  );
}
