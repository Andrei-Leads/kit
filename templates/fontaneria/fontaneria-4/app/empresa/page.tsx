import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { CasillaMarcada } from "@/components/Iconos";
import { Marco } from "@/components/Marco";
import { CabeceraParte } from "@/components/secciones/CabeceraParte";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Encabezado } from "@/components/secciones/Encabezado";
import { mensajeAviso } from "@/lib/mensajes";
import { lineaConfianza } from "@/lib/formato";
import { datosMarco, numerar } from "@/lib/navegacion";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "Empresa" });

/**
 * /empresa «Ficha de empresa» (encargo §7): datos (nombre legal, NIF, fundación, registro mercantil,
 * acreditaciones con número) y garantías; historia como texto editorial; equipo en casillas (nombre y
 * cargo en mono); fotos; marcas y zonas. Cada bloque vacío se oculta; con todo vacío queda la ficha
 * con la descripción y el CTA.
 */
export default function Page() {
  const { negocio, acreditaciones, garantias, empresa, marcas, zonas, contacto } = config;
  const celdas = [
    { rotulo: "Nombre legal", valor: negocio.nombreLegal, sub: "", base: "basis-[260px]" },
    { rotulo: "NIF", valor: negocio.nif, sub: "", base: "basis-[140px]" },
    ...(negocio.anioFundacion ? [{ rotulo: "Fundación", valor: String(negocio.anioFundacion), sub: "", base: "basis-[140px]" }] : []),
    ...(negocio.registroMercantil ? [{ rotulo: "Registro mercantil", valor: negocio.registroMercantil, sub: "", base: "basis-full" }] : []),
    ...acreditaciones.map((a) => ({ rotulo: "Acreditación", valor: a.nombre, sub: a.numero ?? "", base: "basis-[260px]" })),
  ];
  const campos = numerar([
    { id: "ficha", texto: "Datos" },
    empresa.historia.length > 0 && { id: "historia", texto: "Historia" },
    empresa.equipo.length > 0 && { id: "equipo", texto: "Equipo" },
    empresa.imagenes.length > 0 && { id: "fotos", texto: "Fotos" },
    (marcas.length > 0 || zonas.length > 0) && { id: "marcas", texto: marcas.length > 0 ? "Marcas" : "Zona" },
    { id: "abrir-aviso", texto: "Abrir aviso" },
  ]);
  const n = (id: string) => campos.find((c) => c.id === id)?.n ?? "";

  return (
    <Marco {...datosMarco(config)} pagina="empresa" campos={campos}>
      <CabeceraParte
        tipo="Ficha de empresa"
        casillas={negocio.anioFundacion ? [{ rotulo: "Desde", valor: String(negocio.anioFundacion) }] : []}
        titulo={negocio.nombre}
        entradilla={negocio.descripcionCorta}
      />
      <div className="flex flex-col gap-(--sec) px-(--pad) pt-(--sec)">
        <section id="ficha" aria-labelledby="h2-ficha">
          <Encabezado n={n("ficha")} rotulo="Datos" titulo="Datos de la empresa" id="h2-ficha" />
          <div className="casillas">
            {celdas.map((c) => (
              <div key={c.rotulo + c.valor} className={`casilla grow px-3 py-2.5 ${c.base}`}>
                <div className="rotulo text-[0.6875rem]">{c.rotulo}</div>
                <div className="mt-0.5 font-titulo text-sm leading-snug font-semibold">{c.valor}</div>
                {c.sub && <div className="font-titulo text-[0.8125rem] text-primario">{c.sub}</div>}
              </div>
            ))}
          </div>
          {garantias.length > 0 && (
            <ul className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-5 gap-y-2.5">
              {garantias.map((g) => (
                <li key={g} className="flex items-start gap-2.5 leading-snug">
                  <CasillaMarcada />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {empresa.historia.length > 0 && (
          <section id="historia" aria-labelledby="h2-historia">
            <Encabezado n={n("historia")} rotulo="Historia" titulo="Cómo empezamos" id="h2-historia" />
            <div className="texto-editorial flex flex-col gap-[1.1em]">
              {empresa.historia.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>
        )}

        {empresa.equipo.length > 0 && (
          <section id="equipo" aria-labelledby="h2-equipo">
            <Encabezado n={n("equipo")} rotulo="Equipo" titulo="Quién firma los partes" id="h2-equipo" />
            <ul className="casillas">
              {empresa.equipo.map((m) => (
                <li key={m.nombre} className="casilla flex flex-[1_1_200px] items-center gap-3 p-3">
                  {m.foto && (
                    <div className="w-16 flex-none">
                      <Foto imagen={m.foto} sizes="64px" marco="ninguno" proporcion="1/1" />
                    </div>
                  )}
                  <div>
                    <div className="font-titulo text-[0.9375rem] font-bold">{m.nombre}</div>
                    {m.cargo && <div className="mt-1 font-titulo text-xs tracking-[0.04em] text-texto-suave uppercase">{m.cargo}</div>}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {empresa.imagenes.length > 0 && (
          <section id="fotos" aria-labelledby="h2-fotos">
            <Encabezado n={n("fotos")} rotulo="Fotos de la empresa" titulo="Fotos" id="h2-fotos" />
            <div className="flex flex-wrap gap-6">
              {empresa.imagenes.map((img, i) => (
                <div key={img.src} className={`w-[220px] ${i % 2 ? "giro-der" : "giro-izq"}`}>
                  <Foto imagen={img} sizes="220px" />
                </div>
              ))}
            </div>
          </section>
        )}

        {(marcas.length > 0 || zonas.length > 0) && (
          <section id="marcas" aria-label={marcas.length > 0 ? "Marcas" : "Zona de servicio"} className="flex flex-col gap-px">
            {marcas.length > 0 && (
              <div className="border border-texto bg-superficie p-3">
                <div className="rotulo text-[0.6875rem]">Marcas con las que trabajamos</div>
                <p className="mt-1.5 font-titulo text-[0.9375rem] leading-relaxed">{marcas.join(" · ")}</p>
              </div>
            )}
            {zonas.length > 0 && (
              <div className="border border-texto bg-superficie p-3">
                <div className="rotulo text-[0.6875rem]">Zona de servicio</div>
                <p className="mt-1.5 font-titulo text-sm leading-[1.7]">{zonas.join(" · ")}</p>
              </div>
            )}
          </section>
        )}
      </div>
      <CtaFinal contacto={config.contacto} confianza={lineaConfianza(config)} mensaje={mensajeAviso(contacto)} />
    </Marco>
  );
}
