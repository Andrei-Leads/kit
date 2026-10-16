import config from "@/site.config";
import { h1Inicio } from "@/lib/estilos";

// Provisional (fase 1): la fase 2 la sustituye por el inicio completo.
export default function Page() {
  return (
    <div className="contenedor py-10">
      <h1 className={h1Inicio}>
        {config.negocio.sector} en {config.contacto.direccion.ciudad}
      </h1>
    </div>
  );
}
