import { Cierre } from "@/components/Botones";
import { Marco } from "@/components/Marco";
import { Confianza } from "@/components/secciones/Confianza";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { HeroCuadro } from "@/components/secciones/HeroCuadro";
import { Leyenda } from "@/components/secciones/Leyenda";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { Proceso } from "@/components/secciones/Proceso";
import { Resenas } from "@/components/secciones/Resenas";
import { Tarifas } from "@/components/secciones/Tarifas";
import { Zonas } from "@/components/secciones/Zonas";
import { anioActual } from "@/lib/anio";
import { mensajeCuadro } from "@/lib/mensajes";
import config from "@/site.config";

/**
 * Inicio (orden de urgencias del brief, encargo §6): HeroCuadro (hero + servicios como diagrama) →
 * Confianza → Proceso → Leyenda → Tarifas → Reseñas → Zonas → Preguntas → CtaFinal, con una pareja
 * Llamar + WhatsApp al cierre de cada 2–3 bloques (solo si el bloque anterior tiene datos). Cero islas de cliente.
 */
export default async function Page() {
  const c = config;
  const mensaje = mensajeCuadro(c.contacto);
  const anio = await anioActual();
  return (
    <Marco actual="inicio">
      <HeroCuadro
        negocio={c.negocio}
        contacto={c.contacto}
        valoracion={c.valoracion}
        servicios={c.servicios}
        acreditacion={c.acreditaciones[0]}
        mensaje={mensaje}
      />
      <Confianza
        anioFundacion={c.negocio.anioFundacion}
        anio={anio}
        acreditaciones={c.acreditaciones}
        garantias={c.garantias}
        valoracion={c.valoracion}
      />
      <Proceso proceso={c.proceso} />
      <Cierre texto={c.contacto.whatsapp ? "¿Ha saltado algo? Llámanos o escríbenos." : "¿Ha saltado algo? Llámanos."} contacto={c.contacto} mensaje={mensaje} />
      <Leyenda servicios={c.servicios} telefono={c.contacto.telefono} />
      <Tarifas tarifas={c.tarifas} />
      {c.tarifas && <Cierre texto="Te decimos qué es por teléfono." contacto={c.contacto} mensaje={mensaje} />}
      <Resenas resenas={c.resenas} valoracion={c.valoracion} fichaGoogle={c.contacto.fichaGoogle} />
      <Zonas zonas={c.zonas} />
      {(c.resenas.length > 0 || c.zonas.length > 0) && (
        <Cierre
          texto={c.zonas.length > 0 ? "¿Estás en la zona? Te decimos a qué hora llegamos." : "Te decimos a qué hora llegamos."}
          contacto={c.contacto}
          mensaje={mensaje}
        />
      )}
      <PreguntasFrecuentes preguntas={c.preguntas} />
      <CtaFinal contacto={c.contacto} mensaje={mensaje} />
    </Marco>
  );
}
