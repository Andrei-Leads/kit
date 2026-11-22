import type { Metadata } from "next";
import Link from "next/link";
import { metadatosPagina, minusculaInicial } from "@andrei-leads/core";

import { CabeceraPagina } from "@/components/CabeceraPagina";
import { Despiece } from "@/components/Despiece";
import { Lamina } from "@/components/Lamina";
import { Marco } from "@/components/Marco";
import { Pareja } from "@/components/Pareja";
import { letra, notaHorario } from "@/lib/formato";
import { mensajeTaller } from "@/lib/mensajes";
import config from "@/site.config";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

/**
 * /servicios, «Hoja de piezas» (encargo §7): el despiece grande con la leyenda completa (enlaces reales)
 * y, debajo, un bloque por pieza: «Pieza A», h2, descripción, «desde» si existe, «Ver pieza A →» y su
 * lámina 4:3 (sin foto, sin lámina). Cierra con la pareja y el horario.
 */
export default function Page() {
  const { negocio, contacto, servicios } = config;
  const mensaje = mensajeTaller(contacto);
  let lamina = 0;
  const laminas = servicios.map((s) => (s.imagenes.length > 0 ? ++lamina : undefined));

  return (
    <Marco config={config} pagina="servicios" rotulo="Hoja de piezas">
      <CabeceraPagina
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/servicios", texto: "Servicios" },
        ]}
        rotulo="Hoja de piezas"
        titulo={`Servicios de ${minusculaInicial(negocio.sector)} en ${contacto.direccion.ciudad}`}
      >
        <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-center gap-8">
          <div aria-hidden="true">
            <Despiece n={Math.min(servicios.length, 6)} />
          </div>
          <ul className="border-t border-tinta">
            {servicios.map((s, i) => (
              <li key={s.slug} className="border-b border-borde">
                <Link href={`/servicios/${s.slug}`} className="group flex min-h-13 items-center gap-3.5 no-underline">
                  <span className="letra">{letra(i)}</span>
                  <span className="flex-1 group-hover:text-lapiz">{s.titulo}</span>
                  <span aria-hidden="true" className="font-titulo text-texto-suave">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </CabeceraPagina>

      <div className="flex flex-col gap-16 pt-18">
        {servicios.map((s, i) => {
          const foto = s.imagenes[0];
          const num = laminas[i];
          return (
            <article
              key={s.slug}
              aria-labelledby={`h2-${s.slug}`}
              className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] items-start gap-x-10 gap-y-6 border-t border-tinta pt-6"
            >
              <div className="flex flex-col gap-3">
                <p className="font-titulo text-[13px] font-semibold tracking-[0.04em] text-lapiz">Pieza {letra(i)}</p>
                <h2 id={`h2-${s.slug}`} className="titulo text-[clamp(1.5rem,1.2rem+1.4vw,2.25rem)] leading-[1.1] tracking-normal">
                  {s.titulo}
                </h2>
                <p className="max-w-[56ch]">{s.descripcion}</p>
                {s.precioDesde && <p className="font-titulo text-[13px]">{s.precioDesde}</p>}
                <Link href={`/servicios/${s.slug}`} className="btn btn-contorno mt-1 min-h-12 self-start px-[18px]">
                  Ver pieza {letra(i)} →
                </Link>
              </div>
              {foto && num !== undefined && <Lamina imagen={foto} numero={num} sizes="(min-width: 1024px) 32vw, 100vw" />}
            </article>
          );
        })}
      </div>

      <div className="max-w-[720px] pt-16">
        <Pareja contacto={contacto} mensaje={mensaje} nota={notaHorario(contacto)} />
      </div>
    </Marco>
  );
}
