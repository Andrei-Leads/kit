import { CasillasConfianza } from "@/components/secciones/CasillasConfianza";
import { CronologiaAviso } from "@/components/secciones/CronologiaAviso";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Dudas } from "@/components/secciones/Dudas";
import { HeroParte } from "@/components/secciones/HeroParte";
import { Resenas } from "@/components/secciones/Resenas";
import { ServiciosParte } from "@/components/secciones/ServiciosParte";
import { Tarifas } from "@/components/secciones/Tarifas";
import { Zonas } from "@/components/secciones/Zonas";
import { Marco } from "@/components/Marco";
import { Pareja } from "@/components/Pareja";
import { mensajeAviso } from "@/lib/mensajes";
import { lineaConfianza } from "@/lib/formato";
import { datosMarco, numerar } from "@/lib/navegacion";
import config from "@/site.config";

/**
 * Inicio (orden de urgencias del brief, encargo §6): HeroParte → CasillasConfianza → CronologiaAviso
 * (estrella) → ServiciosParte → Tarifas → Resenas → Zonas → Dudas → CtaFinal. Cada sección es un
 * «campo del parte» numerado; sin datos, desaparece y la numeración se recompone.
 */
export default function Page() {
  const c = config;
  const hayConfianza = Boolean(c.negocio.anioFundacion) || c.acreditaciones.length > 0 || c.garantias.length > 0;
  const campos = numerar([
    { id: "aviso", texto: "Aviso" },
    hayConfianza && { id: "garantias", texto: "Garantías" },
    { id: "cronologia", texto: "Cronología" },
    { id: "servicios", texto: "Servicios" },
    c.tarifas && { id: "tarifas", texto: "Tarifas" },
    c.resenas.length > 0 && { id: "resenas", texto: "Reseñas" },
    c.zonas.length > 0 && { id: "zona", texto: "Zona" },
    c.preguntas.length > 0 && { id: "dudas", texto: "Dudas" },
    { id: "abrir-aviso", texto: "Abrir aviso" },
  ]);
  const n = (id: string) => campos.find((x) => x.id === id)?.n ?? "";

  return (
    <Marco {...datosMarco(config)} pagina="inicio" campos={campos}>
      <HeroParte negocio={c.negocio} contacto={c.contacto} acreditaciones={c.acreditaciones} valoracion={c.valoracion} />
      <CasillasConfianza
        acreditaciones={c.acreditaciones}
        garantias={c.garantias}
        valoracion={c.valoracion}
        anioFundacion={c.negocio.anioFundacion}
        n={n("garantias")}
      />
      <CronologiaAviso proceso={c.proceso} galeria={c.galeria} trabajos={c.trabajos} contacto={c.contacto} n={n("cronologia")} />
      <ServiciosParte servicios={c.servicios} n={n("servicios")} />
      <Tarifas tarifas={c.tarifas} n={n("tarifas")} />
      <Resenas resenas={c.resenas} valoracion={c.valoracion} fichaGoogle={c.contacto.fichaGoogle} n={n("resenas")}>
        <Pareja contacto={c.contacto} mensaje={mensajeAviso(c.contacto)} confianza={lineaConfianza(c)} />
      </Resenas>
      <Zonas zonas={c.zonas} n={n("zona")} />
      <Dudas preguntas={c.preguntas} n={n("dudas")} />
      <CtaFinal contacto={config.contacto} confianza={lineaConfianza(config)} mensaje={mensajeAviso(c.contacto)} />
    </Marco>
  );
}
