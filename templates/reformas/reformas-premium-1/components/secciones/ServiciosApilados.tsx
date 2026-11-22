import Link from "next/link";
import { minusculaInicial, precioDesde, type Servicio } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Enlace, Pareja, Titular } from "@/components/Botones";
import { mensajeDeServicio } from "@/lib/mensajes";
import { num, type DatosCta } from "@/lib/textos";
import { cn } from "@/lib/utils";

type Props = {
  servicios: readonly Servicio[];
  datos: Omit<DatosCta, "mensaje">;
  /** Cuántos se apilan (4 en el inicio, 6 en /servicios); el resto va en filas. */
  apilados?: number;
  /** Con título de sección («Lo que *hacemos*»); en /servicios lo pone el hero. */
  conTitulo?: boolean;
  /** Nivel del título de cada bloque. */
  nivel?: "h2" | "h3";
};

/** «Desde 850 €/m²» o el importe tal cual. */
function textoPrecio(s: Servicio) {
  if (!s.precioDesde) return null;
  const p = precioDesde(s.precioDesde);
  return p.desde ? `Desde ${p.importe}` : p.importe;
}

/**
 * Servicios que se fijan y se apilan (encargo §5.4, recurso 5). Cada bloque es un `<li>`
 * `sticky` (globals.css: `.apilado`), con fondo opaco alterno y filete superior; en
 * móvil, `top: calc(72px + n × 10 px)`: asoman los bordes de los anteriores. Con «reducir
 * movimiento», lista normal; con 1 servicio, sin sticky. Cada bloque lleva su pareja
 * (48 px) con el mensaje del servicio. Sin foto, bloque en tinta suave con la espiga.
 * Desviación del diseño (aceptada en la entrega): en móvil la foto va en una franja de
 * 168 px y el botón dice «Pide presupuesto» (el nombre accesible lleva el servicio).
 */
export function ServiciosApilados({ servicios, datos, apilados = 4, conTitulo = true, nivel = "h3" }: Props) {
  if (servicios.length === 0) return null;
  const bloque = servicios.slice(0, apilados);
  const mas = servicios.slice(apilados);
  const Titulo = nivel;

  return (
    <section data-tono="claro" aria-labelledby={conTitulo ? "titulo-servicios" : undefined} className="seccion bg-fondo">
      <div className="contenedor">
        {conTitulo && (
          <div className="mb-[clamp(40px,4vw,72px)]">
            <p className="etiqueta mb-4 text-texto-suave">Servicios</p>
            <Titular id="titulo-servicios" antes="Lo que" destacada="hacemos" />
          </div>
        )}
        <ol className={cn("apilado m-0 list-none p-0", bloque.length === 1 && "uno")}>
          {bloque.map((s, i) => {
            const [foto, mini] = s.imagenes;
            const precio = textoPrecio(s);
            const [primera, ...resto] = s.titulo.split(" ");
            const oscuro = !foto;
            return (
              <li
                key={s.slug}
                data-tono={oscuro ? "oscuro" : "claro"}
                style={{ "--n": i } as React.CSSProperties}
                className={cn(
                  "border-t",
                  oscuro ? "espiga border-borde-oscuro bg-tinta-suave text-fondo" : i % 2 === 0 ? "border-borde bg-superficie" : "border-borde bg-alterna",
                )}
              >
                <article
                  className={cn(
                    "grid items-center gap-x-16 gap-y-5 p-5 sm:p-8 lg:min-h-[min(80vh,720px)] lg:p-14",
                    foto && "lg:grid-cols-2",
                  )}
                >
                  {foto && (
                    <div className={cn("relative", i % 2 === 1 && "lg:order-2")}>
                      <Foto imagen={foto} sizes="(min-width: 1024px) 480px, 90vw" proporcion="relleno" className="h-[168px] lg:aspect-[4/5] lg:h-auto lg:max-h-[600px]" />
                      {mini && (
                        <div className={cn("paralaje-mini absolute -bottom-8 -left-8 hidden w-[38%] outline-8 lg:block", i % 2 === 0 ? "outline-superficie" : "outline-alterna")}>
                          <Foto imagen={mini} sizes="200px" proporcion="4/5" etiqueta="mini" />
                        </div>
                      )}
                    </div>
                  )}
                  <div className={cn("max-w-[440px]", !foto && "lg:max-w-[640px]")}>
                    <p className={cn("etiqueta flex flex-wrap gap-x-4", oscuro ? "text-texto-claro" : "text-texto-suave")}>
                      <span>Servicio {num(i + 1)}</span>
                      {precio && <span>{precio}</span>}
                    </p>
                    <Titulo className="m-0 mt-3 text-[clamp(1.75rem,1.2rem+2.2vw,2.75rem)] leading-[1.05] tracking-[-0.015em]">
                      {oscuro ? (
                        <>
                          <span className="destacada">{primera}</span> {resto.join(" ")}
                        </>
                      ) : (
                        s.titulo
                      )}
                    </Titulo>
                    <p className={cn("m-0 mt-3 line-clamp-3 lg:mt-5 lg:line-clamp-none", oscuro ? "text-texto-claro" : "text-texto-suave")}>{s.descripcion}</p>
                    {s.incluye.length > 0 && (
                      <ol className="m-0 mt-5 hidden list-none p-0 text-[15px] lg:block">
                        {s.incluye.slice(0, 3).map((x, j) => (
                          <li key={x} className={cn("flex gap-4 border-t py-2.5", oscuro ? "border-borde-oscuro" : "border-borde")}>
                            <span className={cn("tabular-nums", oscuro ? "text-texto-claro" : "text-texto-suave")}>{num(j + 1)}</span>
                            {x}
                          </li>
                        ))}
                      </ol>
                    )}
                    <Enlace href={`/servicios/${s.slug}`} className="mt-2 lg:mt-5">
                      Ver el servicio<span className="sr-only">: {s.titulo}</span>
                    </Enlace>
                    <Pareja
                      datos={{ ...datos, mensaje: mensajeDeServicio(s) }}
                      fondo={oscuro ? "oscuro" : "claro"}
                      alto={48}
                      textoWa={
                        <span>
                          Pide presupuesto<span className="sr-only lg:not-sr-only"> de {minusculaInicial(s.titulo)}</span>
                        </span>
                      }
                      textoLlamar="Llamar"
                      className="mt-3 flex-nowrap lg:mt-6 lg:flex-wrap"
                    />
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
        {mas.length > 0 && (
          <div className="mt-[clamp(56px,5vw,96px)]">
            <p className="etiqueta mb-4 text-texto-suave">Más servicios</p>
            <ul className="m-0 list-none border-t border-borde p-0">
              {mas.map((s) => (
                <li key={s.slug} className="border-b border-borde">
                  <Link href={`/servicios/${s.slug}`} className="group flex min-h-16 items-center justify-between gap-6 py-4 no-underline">
                    <span>
                      <span className="block text-[22px] leading-tight">{s.titulo}</span>
                      <span className="mt-1 block text-[15px] text-texto-suave">{s.descripcion}</span>
                    </span>
                    <span aria-hidden="true" className="text-xl motion-safe:transition-transform group-hover:translate-x-[5px]">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
