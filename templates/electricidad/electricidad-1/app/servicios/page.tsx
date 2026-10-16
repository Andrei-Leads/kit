import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { FilaServicio } from "@/components/secciones/FilaServicio";
import { GuiaCabeceraInterior } from "@/components/secciones/GuiaCabeceraInterior";
import { Resenas } from "@/components/secciones/Resenas";
import { ServicioDestacado } from "@/components/secciones/ServicioDestacado";
import { Tarifas } from "@/components/secciones/Tarifas";
import { TramiteResumido } from "@/components/secciones/TramiteResumido";
import { pasosProceso } from "@/lib/proceso";
import { numerarSecciones } from "@/lib/secciones";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Servicios" });

type Seccion = "tramite" | "tarifas" | "resenas";

/**
 * /servicios (encargo §5): h1 → servicio destacado (`servicios[0]`) → todas las filas → trámite
 * resumido → tarifas → reseñas → CTA. Con 1 servicio, el destacado hace de lista. Tarifas y reseñas
 * solo con datos; los números «01 —» se recalculan sobre las secciones que salen (empiezan en 01
 * porque la página no tiene sección numerada antes).
 */
export default function Page() {
  const { contacto, servicios } = config;
  const [destacado, ...resto] = servicios;

  const visibles: Seccion[] = ["tramite"];
  if (config.tarifas) visibles.push("tarifas");
  if (config.resenas.length > 0) visibles.push("resenas");
  const n = numerarSecciones(visibles, 1);

  return (
    <>
      <GuiaCabeceraInterior titulo="Servicios" migas={[{ href: "/", texto: "Inicio" }, { texto: "Servicios" }]} />

      <section aria-labelledby="titulo-lista-servicios" className="contenedor pt-12 md:pt-[72px]">
        <h2 id="titulo-lista-servicios" className="sr-only">
          Todos los servicios
        </h2>
        <ServicioDestacado servicio={destacado} contacto={contacto} />
        {resto.length > 0 && (
          <ul className="m-0 mt-10 list-none border-b border-regla p-0">
            {resto.map((servicio) => (
              <FilaServicio key={servicio.slug} servicio={servicio} />
            ))}
          </ul>
        )}
      </section>

      <TramiteResumido numero={n.tramite} pasos={pasosProceso(config.proceso)} />
      {config.tarifas && <Tarifas numero={n.tarifas} tarifas={config.tarifas} />}
      {config.resenas.length > 0 && (
        <Resenas
          numero={n.resenas}
          resenas={config.resenas}
          valoracion={config.valoracion}
          fichaGoogle={contacto.fichaGoogle}
        />
      )}
      <CtaFinal contacto={contacto} />
    </>
  );
}
