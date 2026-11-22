import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { precioDesde, type Servicio } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { dosCifras, romano } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  servicios: readonly Servicio[];
  /** Título de la sección: `h2` en el inicio, `h1` en /servicios. */
  titulo: ReactNode;
  /** Fichas antes del índice (4 en el inicio; todas en /servicios). */
  fichas?: number;
};

const SIZES = "(min-width: 1024px) 50vw, 100vw";

/** Número romano gigante de la ficha tipográfica (sin foto). Decorativo. */
export function NumeroGigante({ n, className }: { n: number; className?: string }) {
  return (
    <p aria-hidden="true" className={cn("m-0 border-t border-anodizado pt-6 font-titulo text-[clamp(120px,5rem+9vw,220px)] leading-[0.85] font-light text-anodizado italic", className)}>
      {romano(n)}
    </p>
  );
}

/** «Desde 1.200 €» o el texto tal cual (la etiqueta «desde» solo si el dato empieza por «desde»). */
function Precio({ texto }: { texto: string }) {
  const p = precioDesde(texto);
  return <p className="versalitas mt-4">{p.desde ? `Desde ${p.importe}` : p.importe}</p>;
}

/** Lista de especificaciones de `incluye` con filetes (textos del cliente, nada inventado). */
export function ListaIncluye({ incluye, grande }: { incluye: readonly string[]; grande?: boolean }) {
  return (
    <ul aria-label="Incluye" className={cn("m-0 list-none border-t p-0", grande ? "mt-8 border-anodizado" : "mt-6 border-borde")}>
      {incluye.map((t, j) => (
        <li
          key={t}
          className={cn("subir flex border-b border-borde", grande ? "gap-5 py-4 text-[17px]/[1.4]" : "gap-4 py-3 text-[15px]/[1.4]")}
          style={{ "--i": j } as CSSProperties}
        >
          <span aria-hidden="true" className="min-w-[2ch] font-titulo text-anodizado italic">
            {dosCifras(j + 1)}
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}

function Ficha({ s, i, sola }: { s: Servicio; i: number; sola?: boolean }) {
  const foto = s.imagenes[0];
  const enlace = (
    <Link href={`/servicios/${s.slug}`} className="enlace mt-4">
      Ver la solución<span className="sr-only">: {s.titulo}</span>
    </Link>
  );
  const cabeza = (
    <>
      {foto && <span className="font-titulo text-[28px] leading-none text-anodizado italic">{romano(i + 1)}</span>}
      <h3 className={cn("m-0 font-titulo text-[clamp(2rem,1.6rem+1.4vw,2.5rem)] leading-[1.1] font-[350] tracking-[-0.01em]", sola ? "mt-2" : "mt-2.5")}>{s.titulo}</h3>
      <div aria-hidden="true" className="trazo mt-5 h-px w-16 bg-anodizado" />
      {s.precioDesde && <Precio texto={s.precioDesde} />}
    </>
  );

  if (sola) {
    return (
      <article className="flex flex-col gap-[clamp(28px,4vw,56px)]">
        {foto ? <Foto imagen={foto} sizes="100vw" className="revelar" /> : <NumeroGigante n={i + 1} className="text-[clamp(120px,6rem+8vw,240px)] leading-[0.8]" />}
        <div className="flex flex-wrap gap-x-[clamp(32px,6vw,96px)] gap-y-6">
          <div className="flex-[1_1_320px]">{cabeza}</div>
          <div className="max-w-[560px] flex-[1_1_360px]">
            <p className="m-0 text-texto-suave">{s.descripcion}</p>
            {s.incluye.length > 0 && <ListaIncluye incluye={s.incluye} />}
            {enlace}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={cn("flex flex-wrap items-center gap-x-[clamp(32px,5vw,80px)] gap-y-7", i % 2 === 1 && "lg:flex-row-reverse")}>
      <div className="min-w-0 flex-[1_1_520px]">{foto ? <Foto imagen={foto} sizes={SIZES} className="revelar" /> : <NumeroGigante n={i + 1} />}</div>
      <div className="min-w-0 max-w-[540px] flex-[1_1_320px]">
        {cabeza}
        <p className="m-0 mt-5 text-texto-suave">{s.descripcion}</p>
        {s.incluye.length > 0 && <ListaIncluye incluye={s.incluye} />}
        {enlace}
      </div>
    </article>
  );
}

/**
 * Soluciones, sección estrella (encargo §6.4): cada servicio es una ficha (foto 3:2 o, sin foto,
 * ficha tipográfica con el romano gigante), número romano, título en serif de 40 px, filete que
 * se dibuja, precio solo si existe, descripción, `incluye` como especificaciones y «Ver la
 * solución». Con 1, a todo el ancho; de 2 en adelante, alternas; las que pasan de `fichas`, en
 * un índice en serif de 28 px. Sin marcas en las fichas (el contrato no las relaciona).
 */
export function Soluciones({ servicios, titulo, fichas = 4 }: Props) {
  const sola = servicios.length === 1;
  const grandes = servicios.slice(0, fichas);
  const indice = servicios.slice(fichas);
  return (
    <section aria-labelledby="titulo-soluciones" className="contenedor seccion">
      <div className="mb-[clamp(48px,7vw,112px)]">{titulo}</div>
      {sola ? (
        <Ficha s={servicios[0]} i={0} sola />
      ) : (
        <div className="flex flex-col gap-[clamp(80px,10vw,160px)]">
          {grandes.map((s, i) => (
            <Ficha key={s.slug} s={s} i={i} />
          ))}
        </div>
      )}
      {!sola && indice.length > 0 && (
        <div className="mt-[clamp(80px,10vw,140px)]">
          <h3 className="versalitas mb-4">Más soluciones</h3>
          <ol className="m-0 list-none border-t border-anodizado p-0">
            {indice.map((s, k) => (
              <li key={s.slug}>
                <Link
                  href={`/servicios/${s.slug}`}
                  className="flex items-baseline gap-5 border-b border-borde py-5 font-titulo text-[28px] leading-[1.2] font-[350] text-texto no-underline hover:italic"
                >
                  <span aria-hidden="true" className="min-w-[3.2ch] text-lg text-anodizado italic">
                    {romano(fichas + k + 1)}
                  </span>
                  <span className="flex-1 text-balance">{s.titulo}</span>
                  <span aria-hidden="true" className="font-texto text-[13px] tracking-[0.12em] text-texto-suave uppercase not-italic">
                    Ver
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
