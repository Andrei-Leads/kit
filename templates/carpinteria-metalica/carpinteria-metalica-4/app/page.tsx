import Link from "next/link";

import { Pareja } from "@/components/Botones";
import { Encabezado } from "@/components/Encabezado";
import { Marco } from "@/components/Marco";
import { Preguntas } from "@/components/base/Preguntas";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { DespieceInicio } from "@/components/secciones/Despiece";
import { FichasObra } from "@/components/secciones/FichasObra";
import { HeroPlano } from "@/components/secciones/HeroPlano";
import { HojaMedicionServidor } from "@/components/secciones/HojaMedicionServidor";
import { hayNotas, NotasDePlano, tituloNotas } from "@/components/secciones/NotasDePlano";
import { Observaciones } from "@/components/secciones/Observaciones";
import { RelatoObra } from "@/components/secciones/RelatoObra";
import { Zonas } from "@/components/secciones/Zonas";
import { mensajeInicio } from "@/lib/mensajes";
import { dosCifras } from "@/lib/textos";
import config from "@/site.config";

type Id = "obras" | "despiece" | "proceso" | "notas" | "observaciones" | "hoja" | "zonas" | "preguntas";

/**
 * Inicio (encargo §6): hero tipográfico, obras, despiece, relato (estrella), notas del plano,
 * observaciones, hoja de medición, zonas, preguntas y CTA final. Cada sección sin datos desaparece
 * y la numeración «01, 02…» (y las anclas del índice lateral) se recalcula.
 */
export default function Page() {
  const { negocio, contacto, valoracion, zonas, servicios, trabajos, galeria, resenas, preguntas } = config;
  const mensaje = mensajeInicio(contacto);
  const hayObras = trabajos.length > 0 || galeria.length > 0;

  const orden: [Id, string, boolean][] = [
    ["obras", "Obras", hayObras],
    ["despiece", "Despiece", true],
    ["proceso", "Proceso", true],
    ["notas", "Notas", hayNotas(config)],
    ["observaciones", "Observaciones", resenas.length > 0],
    ["hoja", "Hoja de medición", !!contacto.whatsapp],
    ["zonas", "Zonas", zonas.length > 0],
    ["preguntas", "Preguntas", preguntas.length > 0],
  ];
  const presentes = orden.filter(([, , si]) => si);
  const n: Partial<Record<Id, string>> = {};
  presentes.forEach(([id], i) => (n[id] = dosCifras(i + 1)));
  const anclas = presentes.map(([id, texto], i) => ({ href: `#${id}`, texto, n: dosCifras(i + 1) }));

  return (
    <Marco anclas={anclas} lamina="00">
      <HeroPlano negocio={negocio} contacto={contacto} valoracion={valoracion} zonas={zonas} />

      {hayObras && (
        <section id="obras" aria-labelledby="titulo-obras" className="gutter seccion">
          <Encabezado n={n.obras} etiqueta="OBRAS" titulo="Obras recientes" id="titulo-obras" />
          <FichasObra trabajos={trabajos} servicios={servicios} galeria={galeria} modo="inicio" />
          <Link href="/trabajos" className="enlace mt-7">
            Ver todas las obras&nbsp;<span className="flecha">→</span>
          </Link>
        </section>
      )}

      <section id="despiece" aria-labelledby="titulo-despiece" className="gutter seccion">
        <Encabezado n={n.despiece} etiqueta="DESPIECE" titulo="Lo que fabricamos" id="titulo-despiece" />
        <DespieceInicio servicios={servicios} />
        <Pareja contacto={contacto} mensaje={mensaje} tamano="medio" className="mt-9 max-w-[720px]" />
      </section>

      <RelatoObra proceso={config.proceso} n={n.proceso} />

      {hayNotas(config) && (
        <section id="notas" aria-labelledby="titulo-notas" className="gutter seccion">
          <Encabezado n={n.notas} etiqueta="NOTAS" titulo={tituloNotas(config)} id="titulo-notas" />
          <NotasDePlano garantias={config.garantias} acreditaciones={config.acreditaciones} marcas={config.marcas} />
        </section>
      )}

      <Observaciones id="observaciones" resenas={resenas} valoracion={valoracion} fichaGoogle={contacto.fichaGoogle} n={n.observaciones} />

      {/* Sin WhatsApp no hay hoja: la pareja (solo Llamar) cierra el bloque para no pasar de 3 secciones sin CTA. */}
      {!contacto.whatsapp && (
        <div className="gutter pt-10">
          <Pareja contacto={contacto} mensaje={mensaje} tamano="medio" className="max-w-[720px]" />
        </div>
      )}

      <HojaMedicionServidor servicios={servicios} contacto={contacto} n={n.hoja} />

      <Zonas zonas={zonas} n={n.zonas} />

      {preguntas.length > 0 && (
        <section id="preguntas" aria-labelledby="titulo-preguntas" className="gutter seccion">
          <Encabezado n={n.preguntas} etiqueta="PREGUNTAS" titulo="Preguntas antes de medir" id="titulo-preguntas" className="mb-6" />
          <Preguntas preguntas={preguntas} />
        </section>
      )}

      <CtaFinal contacto={contacto} mensaje={mensaje} />
    </Marco>
  );
}
