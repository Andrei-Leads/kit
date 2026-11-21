import type { Metadata } from "next";
import Image from "next/image";
import { iniciales, mediaVisible, metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/base/Foto";
import { BandaInterior } from "@/components/secciones/BandaInterior";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { anioActual } from "@/lib/anio";
import { datosCta, valoracionCompleta } from "@/lib/textos";
import { cn } from "@/lib/utils";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "Quiénes somos" });

const TARJETA = "flex flex-col rounded-tarjeta bg-superficie p-6 lg:p-7";

/**
 * /empresa, corta: cifras en bento (años, valoración, zonas) → historia con su
 * foto → equipo (con foto: redondeada; sin foto: inicial en círculo) →
 * habilitaciones, garantías y marcas en una sola fila de pastillas (sin repetir)
 * → CTA. Las zonas van en su tarjeta de cifras, con la lista. Cada bloque vacío
 * se oculta; con todo vacío quedan la descripción y el CTA.
 */
export default async function Page() {
  const { negocio, valoracion, zonas, empresa, acreditaciones, garantias, marcas, contacto } = config;
  const anioHoy = negocio.anioFundacion ? await anioActual() : 0;
  const cifras = [negocio.anioFundacion, valoracion, zonas.length > 0].filter(Boolean).length;
  const [fotoHistoria, ...masFotos] = empresa.imagenes;
  const pastillas = [
    ...new Set([...acreditaciones.map((a) => (a.numero ? `${a.nombre} · n.º ${a.numero}` : a.nombre)), ...garantias, ...marcas]),
  ];
  const tituloPastillas =
    marcas.length === 0
      ? "Habilitaciones y garantías"
      : acreditaciones.length + garantias.length === 0
        ? "Marcas con las que trabajamos"
        : "Habilitaciones y marcas";

  return (
    <>
      <span data-pagina="empresa" hidden />
      <BandaInterior migas={[{ href: "/", texto: "Inicio" }, { href: "/empresa", texto: "Empresa" }]} titulo="Quiénes somos" entrada={<p>{negocio.descripcionCorta}</p>} />

      {cifras > 0 && (
        <section aria-label="En cifras" className="seccion pb-0">
          <div className={cn("contenedor grid gap-(--hueco-bento)", cifras === 3 && "md:grid-cols-3", cifras === 2 && "md:grid-cols-2")}>
            {negocio.anioFundacion && (
              <div className={TARJETA}>
                <p className="m-0 text-sm font-semibold text-texto-suave">Desde</p>
                <p className="cifra m-0 mt-3">{negocio.anioFundacion}</p>
                <span aria-hidden="true" className="raya-acento mt-2" />
                {anioHoy - negocio.anioFundacion > 1 && (
                  <p className="m-0 mt-2 text-[0.9375rem] text-texto-suave">{anioHoy - negocio.anioFundacion} años trabajando</p>
                )}
              </div>
            )}
            {valoracion && (
              <div className={TARJETA}>
                <span className="sr-only">{valoracionCompleta(valoracion)}</span>
                <p aria-hidden="true" className="m-0 text-sm font-semibold text-texto-suave">
                  Google
                </p>
                <p aria-hidden="true" className="m-0 mt-3 flex items-baseline gap-1.5">
                  <span className="cifra">{mediaVisible(valoracion.media)}</span>
                  <span className="text-lg font-bold">/5</span>
                </p>
                <span aria-hidden="true" className="raya-acento mt-2" />
                <p aria-hidden="true" className="m-0 mt-2 text-[0.9375rem] text-texto-suave">
                  {valoracion.total} {valoracion.total === 1 ? "reseña" : "reseñas"}
                </p>
              </div>
            )}
            {zonas.length > 0 && (
              <div className={TARJETA}>
                <p className="m-0 text-sm font-semibold text-texto-suave">Trabajamos en</p>
                <p className="m-0 mt-3 flex items-baseline gap-1.5">
                  <span className="cifra">{zonas.length}</span>
                  <span className="text-xl font-bold">{zonas.length === 1 ? "municipio" : "municipios"}</span>
                </p>
                <span aria-hidden="true" className="raya-acento mt-2" />
                <ul className="m-0 mt-2 flex list-none flex-wrap gap-x-1 p-0 text-[0.9375rem] text-texto-suave">
                  {zonas.map((z, i) => (
                    <li key={z}>
                      {z}
                      {i < zonas.length - 1 && ","}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {(empresa.historia.length > 0 || fotoHistoria) && (
        <section aria-labelledby="titulo-historia" className="seccion pb-0">
          <div className={cn("contenedor grid gap-8", fotoHistoria && "lg:grid-cols-2 lg:items-center lg:gap-14")}>
            <div className="max-w-[60ch]">
              <h2 id="titulo-historia" className="titulo-seccion">
                Nuestra historia
              </h2>
              {empresa.historia.map((p) => (
                <p key={p} className="m-0 mt-4 text-[1.125rem]">
                  {p}
                </p>
              ))}
            </div>
            {fotoHistoria && (
              <div className="rounded-tarjeta bg-superficie p-2.5">
                <Foto imagen={fotoHistoria} sizes="(min-width: 1024px) 45vw, 100vw" proporcion="3/2" />
              </div>
            )}
          </div>
          {masFotos.length > 0 && (
            <ul className="contenedor mt-(--hueco-bento) grid list-none gap-(--hueco-bento) sm:grid-cols-2 lg:grid-cols-3">
              {masFotos.map((f) => (
                <li key={f.src} className="rounded-tarjeta bg-superficie p-2.5">
                  <Foto imagen={f} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" proporcion="4/3" />
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {empresa.equipo.length > 0 && (
        <section aria-labelledby="titulo-equipo" className="seccion pb-0">
          <div className="contenedor">
            <h2 id="titulo-equipo" className="titulo-seccion">
              El equipo
            </h2>
            <ul className="m-0 mt-7 grid list-none gap-(--hueco-bento) p-0 sm:grid-cols-2 lg:grid-cols-3">
              {empresa.equipo.map((m) => (
                <li key={m.nombre} className="flex items-center gap-4 rounded-tarjeta bg-superficie p-4">
                  {m.foto ? (
                    <Image src={m.foto.src} alt={m.foto.alt} width={64} height={64} className="size-16 flex-none rounded-full object-cover" />
                  ) : (
                    <span aria-hidden="true" className="grid size-16 flex-none place-items-center rounded-full bg-primario-suave font-titulo text-2xl font-bold">
                      {iniciales(m.nombre)}
                    </span>
                  )}
                  <span className="flex flex-col">
                    <span className="text-lg font-bold">{m.nombre}</span>
                    {m.cargo && <span className="text-[0.9375rem] text-texto-suave">{m.cargo}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {pastillas.length > 0 && (
        <section aria-labelledby="titulo-pastillas" className="seccion pb-0">
          <div className="contenedor">
            <h2 id="titulo-pastillas" className="titulo-seccion">
              {tituloPastillas}
            </h2>
            <ul className="m-0 mt-6 flex list-none flex-wrap gap-2.5 p-0">
              {pastillas.map((t) => (
                <li key={t} className="inline-flex min-h-[52px] items-center rounded-boton bg-superficie px-5 text-[1.0625rem] font-semibold">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <div className="pt-[clamp(3.5rem,2.5rem+4vw,6.5rem)]" />
      <CtaFinal cta={datosCta(config)} contacto={contacto} />
    </>
  );
}
