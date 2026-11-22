import type { SiteConfig } from "@andrei-leads/core";

import { EnlaceFlecha } from "@/components/EnlaceFlecha";
import { ParejaCta, type DatosCta } from "@/components/ParejaCta";
import { TituloLineas } from "@/components/TituloLineas";
import { Foto } from "@/components/base/Foto";
import { TrabajoCollage } from "@/components/secciones/TrabajoCollage";
import { RESPUESTA, TEXTO_WA } from "@/lib/mensajes";
import { porAnio } from "@/lib/textos";

type Props = Pick<SiteConfig, "trabajos" | "galeria"> & { cta: DatosCta };

/**
 * Trabajos del inicio (encargo §6.4): los 2 más recientes como collages alternos,
 * «Ver los {n} trabajos →» y la pareja al final. Solo con `galeria`: sus 2 primeras
 * fotos. Sin datos, la sección (y su pareja) desaparece.
 */
export function Trabajos({ trabajos, galeria, cta }: Props) {
  if (trabajos.length === 0 && galeria.length === 0) return null;
  const recientes = porAnio(trabajos).slice(0, 2);
  return (
    <section data-tono="claro" aria-labelledby="titulo-trabajos" className="seccion bg-fondo">
      <div className="contenedor">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <p className="etiqueta">Trabajos</p>
            <TituloLineas id="titulo-trabajos" lineas={["Obras", <><em>terminadas</em>.</>]} className="titulo-h2 mt-3" />
          </div>
          <EnlaceFlecha href="/trabajos">{trabajos.length > 0 ? `Ver los ${trabajos.length} trabajos` : "Ver la galería"}</EnlaceFlecha>
        </div>
        {recientes.length > 0 ? (
          <div className="mt-12 flex flex-col gap-[72px] lg:mt-20 lg:gap-[120px]">
            {recientes.map((t, i) => (
              <TrabajoCollage key={t.slug} trabajo={t} invertido={i % 2 === 1} />
            ))}
          </div>
        ) : (
          <ul className="m-0 mt-12 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:mt-20">
            {galeria.slice(0, 2).map((f) => (
              <li key={f.src}>
                <Foto imagen={f} sizes="(min-width: 640px) 45vw, 100vw" />
                {f.titulo && <p className="fino m-0 mt-3 text-xl">{f.titulo}</p>}
              </li>
            ))}
          </ul>
        )}
        <ParejaCta cta={cta} textoWhatsapp={TEXTO_WA} confianza={{ texto: RESPUESTA }} className="mt-16 max-w-[620px] lg:mt-24" />
      </div>
    </section>
  );
}
