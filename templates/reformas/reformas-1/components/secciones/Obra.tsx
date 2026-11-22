import Link from "next/link";
import type { Trabajo } from "@andrei-leads/core";

import { AntesDespues } from "@/components/base/AntesDespues";
import { Foto } from "@/components/base/Foto";
import { filasObra, lineaObra } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  trabajo: Trabajo;
  /** «doble»: doble página de la home (foto 7/12 + ficha 5/12). «tarjeta»: rejilla de /trabajos. */
  modo: "doble" | "tarjeta";
  /** En escritorio, la foto a la derecha (las obras alternan). */
  invertir?: boolean;
  /** Nivel del título de la obra. */
  nivel?: "h2" | "h3";
  /** Primera obra de /trabajos: su foto es el LCP (se precarga; el «antes», eager sin precarga). */
  preload?: boolean;
};

/** Deslizador si hay `antes`; si no, la foto sola con la misma ficha. Siempre con la pista del asa. */
function Imagenes({ trabajo, sizes, preload }: { trabajo: Trabajo; sizes: string; preload?: boolean }) {
  return trabajo.antes ? (
    <AntesDespues
      antes={trabajo.antes}
      despues={trabajo.imagenes[0]}
      titulo={trabajo.titulo}
      sizes={sizes}
      preload={preload}
      antesInmediata={preload}
      pista
    />
  ) : (
    <Foto imagen={trabajo.imagenes[0]} sizes={sizes} preload={preload} />
  );
}

function VerObra({ trabajo }: { trabajo: Trabajo }) {
  return (
    <Link href={`/trabajos/${trabajo.slug}`} className="enlace inline-flex min-h-11 items-center">
      Ver la obra<span className="sr-only">: {trabajo.titulo}</span>
    </Link>
  );
}

/** Una obra (encargo §6.2 y tablero Obra): ficha con línea en versalitas, título en serif y tabla con filetes. */
export function Obra({ trabajo, modo, invertir, nivel = "h3", preload }: Props) {
  const Titulo = nivel;
  const linea = lineaObra(trabajo);

  if (modo === "tarjeta") {
    const resumen = [trabajo.superficie, trabajo.duracion].filter(Boolean).join(" · ");
    return (
      <article data-aparecer>
        <Imagenes trabajo={trabajo} sizes="(min-width: 1024px) 560px, 100vw" preload={preload} />
        {linea && <p className="versalitas mt-4 mb-1.5">{linea}</p>}
        <Titulo className={cn("mb-2.5 font-titulo text-[26px] leading-[1.15] font-normal", !linea && "mt-4")}>{trabajo.titulo}</Titulo>
        {resumen && <p className="mb-1.5 text-[15px] text-texto-suave">{resumen}</p>}
        <VerObra trabajo={trabajo} />
      </article>
    );
  }

  const filas = filasObra(trabajo);
  return (
    <article data-aparecer className="grid items-center gap-[clamp(20px,3.5vw,64px)] lg:grid-cols-[7fr_5fr] lg:data-[invertir]:grid-cols-[5fr_7fr]" data-invertir={invertir || undefined}>
      <div className={cn(invertir && "lg:order-2")}>
        <Imagenes trabajo={trabajo} sizes="(min-width: 1024px) 680px, 100vw" />
      </div>
      <div>
        {linea && <p className="versalitas mb-3">{linea}</p>}
        <Titulo className="mb-5 font-titulo text-[clamp(1.5rem,1.2rem+1vw,1.75rem)] leading-[1.15] font-normal tracking-[-0.01em]">
          {trabajo.titulo}
        </Titulo>
        {filas.length > 0 && (
          <table className="mb-5 w-full border-collapse border-b border-filete">
            <tbody>
              {filas.map((f) => (
                <tr key={f.k} className="border-t border-filete">
                  <th scope="row" className="versalitas w-[46%] py-[11px] pr-3 text-left align-baseline">
                    {f.k}
                  </th>
                  <td className="py-[11px] align-baseline font-titulo text-lg">{f.v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <p className="mb-[18px] text-texto-suave">{trabajo.descripcion}</p>
        <VerObra trabajo={trabajo} />
      </div>
    </article>
  );
}
