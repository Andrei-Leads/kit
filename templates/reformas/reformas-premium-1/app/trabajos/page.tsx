import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { Destacada, Pareja } from "@/components/Botones";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { HeroInterior } from "@/components/secciones/HeroInterior";
import { TarjetaObra } from "@/components/secciones/TarjetaObra";
import { mensajeInicio } from "@/lib/mensajes";
import { datosCta, lineaConfianza } from "@/lib/textos";
import { cn } from "@/lib/utils";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Obras" });

/** Columnas alternas del sumario: 7 y 4 en escritorio; 100 % y 78 % en móvil. */
const ritmo = (i: number) =>
  i % 2 === 0 ? "lg:col-span-7" : "ml-auto w-[78%] lg:col-span-4 lg:col-start-9 lg:mt-[160px] lg:ml-0 lg:w-auto";

/**
 * /trabajos («Obras», encargo §7): `h1` «Obras en *{ciudad}*» y el sumario de tarjetas 4:5
 * numeradas a dos escalas, con nombre de transición. **Sin filtro.** Sin trabajos, la
 * galería; sin nada, 404.
 */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { trabajos, galeria, contacto } = config;
  const datos = datosCta(contacto, mensajeInicio(contacto));
  const total = trabajos.length > 0 ? trabajos.length : galeria.length;
  return (
    <>
      <HeroInterior
        pagina="trabajos"
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Obras" },
        ]}
        etiqueta="Obras"
        titulo={
          <>
            Obras en <Destacada>{contacto.direccion.ciudad}</Destacada>
          </>
        }
        frase={trabajos.length > 0 ? "Cada obra con su barrio, sus metros y lo que tardamos." : "Algunas casas en las que hemos trabajado."}
        franja={false}
      >
        <Pareja datos={datos} fondo="claro" className="max-w-[620px]" />
      </HeroInterior>
      <section data-tono="claro" aria-label="Sumario" className="bg-fondo pb-[clamp(80px,3rem+6vw,160px)]">
        <div className="contenedor">
          <p className="etiqueta border-t border-borde pt-6 text-texto-suave">
            Sumario · {total} {trabajos.length > 0 ? (total === 1 ? "obra" : "obras") : total === 1 ? "foto" : "fotos"}
          </p>
          {trabajos.length > 0 ? (
            <div className="mt-10 grid gap-x-12 gap-y-16 lg:grid-cols-12">
              {trabajos.map((t, i) => (
                <TarjetaObra
                  key={t.slug}
                  trabajo={t}
                  numero={i + 1}
                  nivel="h2"
                  i={i % 2}
                  sizes="(min-width: 1024px) 620px, 90vw"
                  className={ritmo(i)}
                />
              ))}
            </div>
          ) : (
            <ul className="m-0 mt-10 grid list-none gap-x-12 gap-y-16 p-0 lg:grid-cols-12">
              {galeria.map((g, i) => (
                <li key={g.src} data-aparecer className={cn(ritmo(i))}>
                  <figure className="m-0">
                    <Foto imagen={g} sizes="(min-width: 1024px) 620px, 90vw" proporcion="4/5" />
                    {g.titulo && <figcaption className="mt-3 text-[15px] text-texto-suave">{g.titulo}</figcaption>}
                  </figure>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <CtaFinal datos={datos} confianza={lineaConfianza(config, "horario")} />
    </>
  );
}
