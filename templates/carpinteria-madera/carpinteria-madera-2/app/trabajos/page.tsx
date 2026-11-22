import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hayTrabajos, metadatosPagina, type Trabajo } from "@andrei-leads/core";

import { Pareja } from "@/components/Botones";
import { Marco } from "@/components/Marco";
import { CabeceraPlena } from "@/components/secciones/CabeceraPlena";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { TarjetaGaleria, TarjetaTrabajo } from "@/components/secciones/TarjetaTrabajo";
import { mensajeInicio } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Trabajos" });

const SIZES = "(min-width: 1024px) 380px, 45vw";

type Grupo = { id: string; titulo: string; trabajos: Trabajo[] };

/** Trabajos agrupados por servicio, en el orden de `servicios`; los que no tienen servicio, al final. */
function grupos(): Grupo[] {
  const lista: Grupo[] = config.servicios
    .map((s) => ({ id: `servicio-${s.slug}`, titulo: s.titulo, trabajos: config.trabajos.filter((t) => t.servicio === s.slug) }))
    .filter((g) => g.trabajos.length > 0);
  const otros = config.trabajos.filter((t) => !t.servicio);
  if (otros.length > 0) lista.push({ id: "servicio-otros", titulo: "Otros trabajos", trabajos: otros });
  return lista;
}

/**
 * /trabajos (encargo §7): rejilla de 3 (2 en móvil) agrupada por servicio, con píldoras-enlace a las
 * anclas de cada grupo (`#servicio-{slug}`, sin `?servicio=`: con cacheComponents, leer
 * searchParams vuelve dinámica la página). Sin trabajos, la galería. Sin nada, 404.
 */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { contacto } = config;
  const mensaje = mensajeInicio(contacto);
  const lista = grupos();
  return (
    <Marco actual="trabajos">
      <CabeceraPlena
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Trabajos" },
        ]}
        titulo="Trabajos"
        entradilla="Piezas terminadas y montadas en su hueco."
      >
        {lista.length > 1 && (
          <nav aria-label="Trabajos por servicio" className="mt-2">
            <ul className="flex flex-wrap gap-2">
              {lista.map((g) => (
                <li key={g.id}>
                  <a
                    href={`#${g.id}`}
                    className="inline-flex min-h-11 items-center rounded-full border-2 border-(--color-sobre-pleno)/50 px-[18px] text-[15px] font-semibold no-underline hover:border-(--color-sobre-pleno)"
                  >
                    {g.titulo} · {g.trabajos.length}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <Pareja contacto={contacto} mensaje={mensaje} tono="pleno" textoWhatsapp="Pedir presupuesto por WhatsApp" className="mt-3" />
      </CabeceraPlena>

      <section aria-label="Trabajos" className="seccion">
        <div className="contenedor flex flex-col gap-[clamp(48px,7vw,88px)]">
          {lista.length > 0
            ? lista.map((g) => (
                <div key={g.id} id={g.id} className="flex scroll-mt-[100px] flex-col gap-6">
                  <h2 className="h3-seccion">{g.titulo}</h2>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-5 lg:grid-cols-3">
                    {g.trabajos.map((t) => (
                      <li key={t.slug} data-aparecer="" className="min-w-0">
                        <TarjetaTrabajo trabajo={t} sizes={SIZES} compacta />
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            : (
                <ul className="grid grid-cols-2 gap-x-4 gap-y-5 lg:grid-cols-3">
                  {config.galeria.map((g) => (
                    <li key={g.src} data-aparecer="" className="min-w-0">
                      <TarjetaGaleria imagen={g} sizes={SIZES} compacta nivel="h2" />
                    </li>
                  ))}
                </ul>
              )}
        </div>
      </section>

      <CtaFinal contacto={contacto} mensaje={mensaje} />
    </Marco>
  );
}
