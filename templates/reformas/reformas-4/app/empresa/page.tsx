import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Marco } from "@/components/Marco";
import { Rotulo } from "@/components/Rotulo";
import { CabeceraPagina } from "@/components/secciones/CabeceraPagina";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Garantias } from "@/components/secciones/Garantias";
import { ZonasPreguntas } from "@/components/secciones/ZonasPreguntas";
import { horarioLinea, pasosDiario } from "@/lib/formato";
import { mensajeDiario } from "@/lib/mensajes";
import { numerar, numeroDe } from "@/lib/navegacion";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "Quiénes somos" });

/**
 * /empresa (encargo §7): historia como relato editorial, equipo en lista mono de nombre y cargo (sin
 * fotos), imágenes, años, garantías, acreditaciones con número, marcas y zonas. Cada bloque vacío se oculta.
 */
export default function Page() {
  const { negocio, contacto, empresa, garantias, acreditaciones, marcas, zonas } = config;
  const hayGarantias = garantias.length > 0 || acreditaciones.length > 0 || Boolean(negocio.anioFundacion);
  const secciones = numerar([
    empresa.historia.length > 0 && { id: "historia", texto: "Historia" },
    empresa.equipo.length > 0 && { id: "equipo", texto: "Equipo" },
    empresa.imagenes.length > 0 && { id: "fotos", texto: "Fotos" },
    hayGarantias && { id: "garantias", texto: "Garantías" },
    zonas.length > 0 && { id: "zonas", texto: "Zonas" },
  ]);
  const n = (id: string) => numeroDe(secciones, id);

  return (
    <Marco config={config} pagina="empresa" secciones={secciones}>
      <CabeceraPagina
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/empresa", texto: "Empresa" },
        ]}
        cinta={negocio.anioFundacion ? `Empresa · desde ${negocio.anioFundacion}` : "Empresa"}
        titulo="Quiénes somos"
        entradilla={negocio.descripcionCorta}
      />
      {empresa.historia.length > 0 && (
        <section id="historia" aria-labelledby="h2-historia" className="px-(--pad) py-(--sec)">
          <div className="max-w-[1040px]">
            <Rotulo n={n("historia")}>Historia</Rotulo>
            <h2 id="h2-historia" className="h2-diario mb-8">
              Cómo empezó el diario
            </h2>
            <div className="texto-editorial grid gap-5 text-texto">
              {empresa.historia.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}
      {empresa.equipo.length > 0 && (
        <section id="equipo" aria-labelledby="h2-equipo" className="border-t border-borde bg-alterna px-(--pad) py-(--sec)">
          <div className="max-w-[1040px]">
            <Rotulo n={n("equipo")}>Equipo</Rotulo>
            <h2 id="h2-equipo" className="h2-diario mb-8">
              Quién lleva tu obra
            </h2>
            <ul className="border-t border-borde">
              {empresa.equipo.map((p) => (
                <li key={p.nombre} className="mono flex flex-wrap gap-x-8 gap-y-1 border-b border-borde py-[18px]">
                  <span className="flex-[1_1_220px] text-[17px] text-texto">{p.nombre}</span>
                  {p.cargo && <span className="flex-[2_1_220px] text-[13px] text-texto-suave">{p.cargo}</span>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      {empresa.imagenes.length > 0 && (
        <section id="fotos" aria-label="Fotos de la empresa" className="px-(--pad) py-(--sec)">
          <div className="grid max-w-[1040px] grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-4">
            {empresa.imagenes.map((img) => (
              <Foto key={img.src} imagen={img} sizes="(min-width: 1024px) 520px, calc(100vw - 40px)" />
            ))}
          </div>
        </section>
      )}
      {hayGarantias && (
        <Garantias
          n={n("garantias")}
          garantias={garantias}
          acreditaciones={acreditaciones}
          marcas={marcas}
          anioFundacion={negocio.anioFundacion}
          ciudad={contacto.direccion.ciudad}
        />
      )}
      {zonas.length > 0 && <ZonasPreguntas n={n("zonas")} zonas={zonas} />}
      <CtaFinal contacto={contacto} primerPaso={pasosDiario(config.proceso)[0]?.titulo ?? ""} horario={horarioLinea(contacto.horario)} mensaje={mensajeDiario(contacto)} />
    </Marco>
  );
}
