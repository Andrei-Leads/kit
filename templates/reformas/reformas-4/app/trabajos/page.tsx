import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina, type Trabajo } from "@andrei-leads/core";

import { Foto } from "@/components/base/Foto";
import { Entrada } from "@/components/Entrada";
import { Marco } from "@/components/Marco";
import { CabeceraPagina } from "@/components/secciones/CabeceraPagina";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { horarioLinea, pasosDiario, trabajosOrdenados } from "@/lib/formato";
import { mensajeDiario } from "@/lib/mensajes";
import { numerar } from "@/lib/navegacion";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Diario de obras" });

/**
 * /trabajos (encargo §7): el diario completo, con las entradas agrupadas por año y un separador de año
 * en mono grande en contorno. Sin trabajos, la `galeria` como «Cuaderno de fotos». Sin ninguna, 404.
 */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { contacto, galeria } = config;
  const trabajos = trabajosOrdenados(config.trabajos);

  const grupos: { id: string; anio: string; items: { t: Trabajo; i: number }[] }[] = [];
  trabajos.forEach((t, i) => {
    const anio = t.anio ? String(t.anio) : "Sin año";
    let g = grupos.find((x) => x.anio === anio);
    if (!g) grupos.push((g = { id: `y${t.anio ?? "sin"}`, anio, items: [] }));
    g.items.push({ t, i });
  });
  const secciones = numerar(trabajos.length > 0 ? grupos.map((g) => ({ id: g.id, texto: g.anio })) : [{ id: "cuaderno", texto: "Cuaderno de fotos" }]);

  return (
    <Marco config={config} pagina="trabajos" secciones={secciones}>
      <CabeceraPagina
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Obras" },
        ]}
        cinta={trabajos.length > 0 ? "Diario completo" : "Cuaderno de fotos"}
        titulo="Diario de obras"
        entradilla={
          trabajos.length > 0
            ? `${trabajos.length === 1 ? "1 obra" : `${trabajos.length} obras`} con su lugar, superficie y plazo, de la más reciente a la más antigua.`
            : "Fotos de nuestras obras."
        }
      />
      {trabajos.length > 0 ? (
        grupos.map((g) => (
          <section key={g.id} id={g.id} aria-labelledby={`h2-${g.id}`} className="px-(--pad) pt-[clamp(56px,3rem+3vw,104px)] pb-6">
            <div className="max-w-[1040px]">
              <h2 id={`h2-${g.id}`} className="contorno mb-2 text-[clamp(3.5rem,2rem+6vw,7.5rem)]">
                {g.anio}
              </h2>
              <p className="mono mb-6 text-xs text-texto-suave">{g.items.length === 1 ? "1 obra" : `${g.items.length} obras`}</p>
              {g.items.map(({ t, i }) => (
                <Entrada key={t.slug} trabajo={t} indice={i} />
              ))}
            </div>
          </section>
        ))
      ) : (
        <section id="cuaderno" aria-label="Cuaderno de fotos" className="px-(--pad) py-(--sec)">
          <ul className="grid max-w-[1040px] grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-4">
            {galeria.map((g) => (
              <li key={g.src} data-aparecer>
                <Foto imagen={g} sizes="(min-width: 1024px) 320px, calc(100vw - 40px)" />
                {g.titulo && <p className="mono mt-2 text-xs text-texto-suave">{g.titulo}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}
      <CtaFinal contacto={contacto} primerPaso={pasosDiario(config.proceso)[0]?.titulo ?? ""} horario={horarioLinea(contacto.horario)} mensaje={mensajeDiario(contacto)} />
    </Marco>
  );
}
