import Image from "next/image";
import type { Metadata } from "next";
import { direccionLinea, listaY, metadatosPagina, pasosProceso, urlComoLlegar } from "@andrei-leads/core";

import config from "@/site.config";
import { ParejaCta } from "@/components/Botones";
import { EnlaceFlecha } from "@/components/EnlaceFlecha";
import { Destacada } from "@/components/Titulo";
import { HeroInterior } from "@/components/secciones/HeroInterior";
import { alcanceRegla, itemRegla, Regla, seccionRegla } from "@/components/secciones/Regla";
import { anioActual } from "@/lib/anio";
import { mensajeInicio } from "@/lib/mensajes";
import { datosCta, dosCifras, lineaConfianza } from "@/lib/textos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "El taller" });

const BLOQUE = "contenedor mt-(--espacio-seccion)";

/**
 * /empresa «El taller» (encargo §7): historia a 40 ch, años desde la fundación en
 * grande, el proceso como lista (sin apilado), el equipo como nombres y cargos (foto
 * solo si existe: nunca un hueco de retrato ni una cara de IA), garantías, marcas,
 * dirección con «Cómo llegar →» y pareja final. Cada bloque vacío se oculta.
 */
export default async function Page() {
  const { contacto, empresa, negocio } = config;
  const cta = datosCta(contacto, mensajeInicio(contacto));
  const anio = await anioActual();
  const anios = negocio.anioFundacion ? anio - negocio.anioFundacion : 0;
  const pasos = pasosProceso(config.proceso, "proyecto");
  const hayHistoria = empresa.historia.length > 0 || anios > 0;
  const regla = [
    ...(hayHistoria ? [itemRegla("historia", "Historia")] : []),
    itemRegla("como-trabajamos", "Cómo trabajamos"),
    ...(empresa.equipo.length > 0 ? [itemRegla("equipo", "Quiénes somos")] : []),
    itemRegla("visita", "Visítanos"),
  ];

  return (
    <>
      <span data-pagina="empresa" hidden />
      <HeroInterior
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/empresa", texto: "El taller" },
        ]}
        etiqueta={negocio.nombre}
        titulo={
          <>
            El <Destacada>taller</Destacada>
          </>
        }
        frase="Aquí se dibuja, se elige la madera y se fabrica cada pieza. Se puede visitar."
        cta={cta}
        confianza={lineaConfianza(config, "valoracion")}
        fotos={[empresa.imagenes[0], empresa.imagenes[1]]}
      />

      <div className="relative" style={alcanceRegla(regla)}>
        <Regla items={regla} />
        {hayHistoria && (
          <section {...seccionRegla("historia")} data-tono="claro" aria-label="Historia" className={`${BLOQUE} flex flex-wrap items-start justify-between gap-12`}>
            {empresa.historia.length > 0 && (
              <div className="medida flex-[1_1_360px]">
                {empresa.historia.map((p) => (
                  <p key={p} className="mb-5 text-cuerpo">
                    {p}
                  </p>
                ))}
              </div>
            )}
            {anios > 0 && (
              <p data-aparecer className="m-0 flex flex-[0_1_360px] flex-col border-t border-borde pt-5">
                <span className="titulo text-[clamp(4rem,3rem+4vw,7.5rem)] leading-none tabular-nums">{anios}</span>
                <span className="mt-2 text-[15px] text-texto-suave">años en el oficio, desde {negocio.anioFundacion}</span>
              </p>
            )}
          </section>
        )}

        <section {...seccionRegla("como-trabajamos")} data-tono="claro" aria-labelledby="titulo-como" className={BLOQUE}>
          <h2 id="titulo-como" className="titulo text-h2">
            Cómo <Destacada>trabajamos</Destacada>
          </h2>
          <ol className="m-0 mt-10 list-none border-b border-borde p-0">
            {pasos.map((p, i) => (
              <li key={p.titulo} data-aparecer className="grid gap-x-10 gap-y-2 border-t border-borde py-6 md:grid-cols-[80px_minmax(0,1fr)_minmax(0,1.2fr)]">
                <span aria-hidden="true" className="titulo text-[32px] leading-none text-destacado">
                  {dosCifras(i + 1)}
                </span>
                <h3 className="titulo text-h3">{p.titulo}</h3>
                <p className="m-0 max-w-[48ch] text-base text-texto-suave">{p.texto}</p>
              </li>
            ))}
          </ol>
        </section>

        {empresa.equipo.length > 0 && (
          <section {...seccionRegla("equipo")} data-tono="claro" aria-labelledby="titulo-equipo" className={BLOQUE}>
            <h2 id="titulo-equipo" className="etiqueta m-0 text-texto-suave">
              Quiénes somos
            </h2>
            <ul className="m-0 mt-6 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-8 p-0">
              {empresa.equipo.map((m) => (
                <li key={m.nombre} className="flex items-center gap-4 border-t border-borde py-5">
                  {m.foto && <Image src={m.foto.src} alt={m.foto.alt} width={64} height={80} className="h-20 w-16 flex-none object-cover" />}
                  <span>
                    <span className="titulo block text-h3">{m.nombre}</span>
                    {m.cargo && <span className="mt-1 block text-sm text-texto-suave">{m.cargo}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {(config.garantias.length > 0 || config.marcas.length > 0) && (
          <section data-tono="oscuro" aria-label="Garantías" className="seccion sobre-oscuro mt-(--espacio-seccion) bg-tinta text-fondo">
            <div className="contenedor">
              {config.garantias.length > 0 && (
                <>
                  <h2 className="titulo text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] leading-[1.1]">Lo que firmamos</h2>
                  <ul className="m-0 mt-6 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-x-12 p-0">
                    {config.garantias.map((g) => (
                      <li key={g} className="border-t border-fondo/20 py-[18px] text-[17px] leading-[1.45]">
                        {g}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {config.marcas.length > 0 && (
                <p className="mt-7 text-[15px] text-papel-suave">
                  Herrajes y acabados: <span className="text-fondo">{listaY(config.marcas)}</span>
                </p>
              )}
            </div>
          </section>
        )}

        <section {...seccionRegla("visita")} data-tono="claro" aria-labelledby="titulo-visita" className="contenedor seccion">
          <h2 id="titulo-visita" className="titulo text-h2">
            Ven a ver las <Destacada>maderas</Destacada>
          </h2>
          <div className="mt-8 flex flex-wrap items-baseline gap-x-10 gap-y-3">
            <p className="m-0 max-w-[44ch] text-cuerpo">
              {direccionLinea(contacto.direccion)}
              <br />
              <span className="text-texto-suave">El taller se puede visitar: avísanos antes.</span>
            </p>
            <EnlaceFlecha href={urlComoLlegar(contacto)} externo>
              Cómo llegar
            </EnlaceFlecha>
          </div>
          <ParejaCta cta={cta} tono="claro" confianza={lineaConfianza(config, "horario")} className="mt-10" />
        </section>
      </div>
    </>
  );
}
