import config from "@/site.config";
import { h1Interior } from "@/lib/estilos";

/**
 * Inicio PROVISIONAL (fase 1): solo el h1 «{sector} en {ciudad}». La fase 2 lo sustituye por el hero
 * y las secciones del encargo §5 (Precios → Confianza → Servicios → Proceso → Reseñas → Zonas → Preguntas → CTA).
 */
export default function Page() {
  const { negocio, contacto } = config;
  return (
    <div className="contenedor pt-11 pb-8">
      <h1 className={h1Interior}>
        {negocio.sector} en {contacto.direccion.ciudad}
      </h1>
    </div>
  );
}
