import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina, type Trabajo } from "@andrei-leads/core";

import { CabeceraPagina } from "@/components/CabeceraPagina";
import { Lamina } from "@/components/Lamina";
import { Marco } from "@/components/Marco";
import { Pareja } from "@/components/Pareja";
import { letra, metaTrabajo, refTrabajo } from "@/lib/formato";
import { mensajeTaller } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Trabajos" });

type Fila = { t: Trabajo; i: number; lamina: number };
type Grupo = { id: string; letra: string; titulo: string; filas: Fila[] };

/**
 * /trabajos, «Catálogo de referencias» (encargo §7): los trabajos agrupados por pieza, en el orden de
 * los servicios (los que no tienen pieza, al final como «Otros trabajos»), con un filtro de anclas
 * arriba. En escritorio, una tabla (Lámina, Ref., Trabajo, Ubicación, Año, Sup., Plazo; «—» si falta);
 * en móvil, fichas con la lámina. Sin trabajos, la `galeria` en láminas 1:1. Sin ninguno, 404.
 */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { contacto, servicios, trabajos, galeria } = config;

  const posicion = (slug?: string) => servicios.findIndex((s) => s.slug === slug);
  const grupos: Grupo[] = [];
  trabajos.forEach((t, i) => {
    const si = posicion(t.servicio);
    const id = si >= 0 ? `servicio-${servicios[si].slug}` : "servicio-otros";
    let g = grupos.find((x) => x.id === id);
    if (!g) grupos.push((g = { id, letra: si >= 0 ? letra(si) : "—", titulo: si >= 0 ? servicios[si].titulo : "Otros trabajos", filas: [] }));
    g.filas.push({ t, i, lamina: 0 });
  });
  const orden = (g: Grupo) => (g.id === "servicio-otros" ? Infinity : posicion(g.id.slice("servicio-".length)));
  grupos.sort((a, b) => orden(a) - orden(b));
  // Láminas en el orden en que salen en la página.
  let lamina = 0;
  grupos.forEach((g) => g.filas.forEach((f) => (f.lamina = ++lamina)));

  const celda = "py-3.5 pr-4 align-middle";
  const cifra = `${celda} font-titulo text-[13px]`;

  return (
    <Marco config={config} pagina="trabajos" rotulo="Catálogo de referencias">
      <CabeceraPagina
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Trabajos" },
        ]}
        rotulo="Catálogo de referencias"
        titulo="Trabajos del taller"
      >
        <p className="max-w-[60ch] text-texto-suave">
          {trabajos.length > 0
            ? "Cada trabajo con su referencia, dónde está, cuánto ocupa y lo que tardamos."
            : "Fotos del taller y de piezas terminadas."}
        </p>
      </CabeceraPagina>

      {grupos.length > 0 && (
        <>
          <nav aria-label="Trabajos por pieza" className="mt-6">
            <ul className="flex flex-wrap gap-2">
              {grupos.map((g) => (
                <li key={g.id}>
                  <a
                    href={`#${g.id}`}
                    className="inline-flex min-h-11 items-center gap-2 border border-tinta px-3 font-titulo text-[12.5px] tracking-[0.03em] no-underline hover:bg-superficie"
                  >
                    <span className="text-lapiz">{g.letra}</span>
                    {g.titulo} ({g.filas.length})
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {grupos.map((g) => (
            <section key={g.id} id={g.id} aria-labelledby={`h2-${g.id}`} className="scroll-mt-24 pt-12">
              <h2 id={`h2-${g.id}`} className="titulo mb-3 flex items-baseline gap-3 text-[1.375rem] tracking-normal">
                <span className="text-[13px] text-lapiz">{g.letra === "—" ? "Sin pieza" : `Pieza ${g.letra}`}</span>
                {g.titulo}
              </h2>

              {/* Escritorio: tabla. Móvil: fichas. La otra vista no se pinta (display: none) ni carga sus fotos. */}
              <table className="hidden w-full border-collapse border-t border-tinta text-[0.9375rem] lg:table">
                <caption className="sr-only">{g.titulo}: trabajos del taller</caption>
                <thead>
                  <tr className="border-b border-tinta text-left font-titulo text-[11.5px] tracking-[0.05em] text-texto-suave uppercase">
                    <th scope="col" className="w-[156px] py-2.5 pr-4 font-normal">
                      Lámina
                    </th>
                    <th scope="col" className="w-[92px] py-2.5 pr-4 font-normal">
                      Ref.
                    </th>
                    <th scope="col" className="py-2.5 pr-4 font-normal">
                      Trabajo
                    </th>
                    <th scope="col" className="py-2.5 pr-4 font-normal">
                      Ubicación
                    </th>
                    <th scope="col" className="w-[64px] py-2.5 pr-4 font-normal">
                      Año
                    </th>
                    <th scope="col" className="w-[84px] py-2.5 pr-4 font-normal">
                      Sup.
                    </th>
                    <th scope="col" className="w-[104px] py-2.5 font-normal">
                      Plazo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {g.filas.map(({ t, i, lamina: num }) => (
                    <tr key={t.slug} className="border-b border-borde hover:bg-superficie">
                      <td className={celda}>
                        <Lamina imagen={t.imagenes[0]} numero={num} sizes="140px" />
                      </td>
                      <td className={`${cifra} text-lapiz`}>{refTrabajo(i)}</td>
                      <th scope="row" className={`${celda} text-left`}>
                        <Link href={`/trabajos/${t.slug}`} className="font-semibold">
                          {t.titulo}
                        </Link>
                      </th>
                      <td className={celda}>{t.ubicacion ?? "—"}</td>
                      <td className={cifra}>{t.anio ?? "—"}</td>
                      <td className={cifra}>{t.superficie ?? "—"}</td>
                      <td className={`${cifra} pr-0`}>{t.duracion ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <ul className="flex flex-col gap-7 border-t border-tinta pt-5 lg:hidden">
                {g.filas.map(({ t, i, lamina: num }) => (
                  <li key={t.slug} className="flex flex-col gap-2">
                    <Lamina imagen={t.imagenes[0]} numero={num} sizes="100vw" />
                    <p className="mt-1.5 font-titulo text-[12.5px] tracking-[0.04em] text-lapiz">{metaTrabajo(t, i)}</p>
                    <h3 className="text-[1.1875rem] leading-[1.3] font-semibold">
                      <Link href={`/trabajos/${t.slug}`} className="no-underline">
                        {t.titulo}
                      </Link>
                    </h3>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </>
      )}

      {trabajos.length === 0 && galeria.length > 0 && (
        <ul className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-6">
          {galeria.map((g, i) => (
            <li key={g.src + i} className="flex flex-col gap-1.5">
              <Lamina imagen={g} numero={i + 1} proporcion="1/1" sizes="(min-width: 1024px) 300px, 100vw" />
              {g.titulo && <p>{g.titulo}</p>}
            </li>
          ))}
        </ul>
      )}

      <div className="max-w-[720px] pt-16">
        <Pareja contacto={contacto} mensaje={mensajeTaller(contacto)} />
      </div>
    </Marco>
  );
}
