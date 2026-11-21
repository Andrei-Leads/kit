import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { Migas } from "@/components/base/Migas";
import { BandaCabecera, H1_INTERIOR } from "@/components/secciones/BandaCabecera";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { TarjetaTrabajo } from "@/components/secciones/TarjetaTrabajo";
import { mensajeInicio } from "@/lib/mensajes";
import { filtroTrabajos, ID_LISTA } from "@/lib/trabajos";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Trabajos" });

/**
 * /trabajos: tarjetas con la ubicación como dato estrella. Filtro por servicio en etiquetas cortadas
 * (enlaces a la primera tarjeta de cada servicio: página estática, sin JS). Sin trabajos, la
 * `galeria` en rejilla de 3 (2 en móvil). Sin ninguno de los dos, 404.
 */
export default function Trabajos() {
  if (!hayTrabajos(config)) notFound();
  const { contacto, trabajos, galeria } = config;
  const filtro = filtroTrabajos(config);
  return (
    <>
      <BandaCabecera>
        <Migas migas={[{ href: "/", texto: "Inicio" }, { href: "/trabajos", texto: "Trabajos" }]} className="text-texto [&_a]:underline" />
        <h1 className={`${H1_INTERIOR} mt-3`}>{trabajos.length > 0 ? "Trabajos hechos cerca de ti" : "Trabajos"}</h1>
        <p className="mt-3 mb-0 max-w-[46ch] text-[clamp(1rem,0.9rem+0.4vw,1.1875rem)]">
          {trabajos.length > 0
            ? `Trabajos en ${contacto.direccion.ciudad} y los pueblos de alrededor.`
            : "Algunas fotos de nuestro trabajo."}
        </p>
        {filtro && (
          <nav aria-label="Filtrar por servicio" className="mt-5 flex flex-wrap gap-2">
            <a href={`#${ID_LISTA}`} className="corte-9 inline-flex min-h-11 items-center bg-tinta pr-5 pl-3 font-titulo text-[15px] font-semibold text-sobre-tinta no-underline">
              Todos
            </a>
            {filtro.chips.map((c) => (
              <a key={c.id} href={`#${c.id}`} className="corte-9 block bg-tinta p-0.5 text-texto no-underline">
                <span className="corte-8 flex min-h-10 items-center bg-superficie pr-5 pl-3 font-titulo text-[15px] font-semibold">{c.texto}</span>
              </a>
            ))}
          </nav>
        )}
      </BandaCabecera>
      {trabajos.length > 0 ? (
        <section className="contenedor pt-9 pb-4 lg:pt-14">
          <h2 className="sr-only">Lista de trabajos</h2>
          <ul id={ID_LISTA} className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3.5">
            {trabajos.map((t, i) => (
              <li key={t.slug} className="flex">
                <TarjetaTrabajo trabajo={t} id={filtro?.anclas.get(t.slug)} preload={i === 0} />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="contenedor pt-9 pb-4 lg:pt-14">
          <h2 className="sr-only">Galería</h2>
          <ul className="m-0 grid list-none grid-cols-2 gap-2.5 p-0 lg:grid-cols-3 lg:gap-3.5">
            {galeria.map((g, i) => (
              <li key={g.src}>
                <figure className="m-0">
                  <div className="corte">
                    <Foto imagen={g} proporcion="4/3" preload={i === 0} sizes="(min-width: 1024px) 400px, 50vw" />
                  </div>
                  {g.titulo && <figcaption className="mt-1.5 font-titulo text-[15px] font-semibold">{g.titulo}</figcaption>}
                </figure>
              </li>
            ))}
          </ul>
        </section>
      )}
      <CtaFinal contacto={contacto} mensaje={mensajeInicio(contacto)} titulo="¿Tienes algo parecido cerca?" textoWhatsapp="Envíanos una foto por WhatsApp" />
    </>
  );
}
