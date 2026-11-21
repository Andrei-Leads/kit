import { Marco } from "@/components/Marco";
import { ParCta } from "@/components/Botones";
import { H2, Rotulo } from "@/components/Rotulo";
import { BloqueComunidades } from "@/components/secciones/BloqueComunidades";
import { CtaFinal } from "@/components/secciones/CtaFinal";
import { Dossier } from "@/components/secciones/Dossier";
import { HeroLamina } from "@/components/secciones/HeroLamina";
import { ListaServicios } from "@/components/secciones/ListaServicios";
import { PreguntasFrecuentes } from "@/components/secciones/PreguntasFrecuentes";
import { Proceso } from "@/components/secciones/Proceso";
import { Resenas } from "@/components/secciones/Resenas";
import { Tarifas } from "@/components/secciones/Tarifas";
import { Zonas } from "@/components/secciones/Zonas";
import { numerar } from "@/lib/formato";
import { mensajeEdificio } from "@/lib/mensajes";
import { cn } from "@/lib/utils";
import config from "@/site.config";

/**
 * Inicio (orden de urgencias del brief con el Dossier como estrella, encargo §6): HeroLamina →
 * Dossier → Proceso → Servicios → Comunidades → Tarifas → Reseñas → Zonas → Preguntas → CtaFinal.
 * Cada sección lleva su número de plano; sin datos, desaparece y la numeración se recompone. La
 * pareja Llamar + WhatsApp cierra los servicios y las reseñas (como mucho cada 2–3 secciones).
 */
export default function Page() {
  const c = config;
  const mensaje = mensajeEdificio(c.contacto);
  const n = numerar([
    "hero",
    "dossier",
    "proceso",
    "servicios",
    c.comunidades && "comunidades",
    c.tarifas && "tarifas",
    c.resenas.length > 0 && "resenas",
    c.zonas.length > 0 && "zonas",
    c.preguntas.length > 0 && "preguntas",
    "cta",
  ]);

  return (
    <Marco actual="inicio">
      <HeroLamina
        negocio={c.negocio}
        contacto={c.contacto}
        imagen={c.imagenesHero[0]}
        valoracion={c.valoracion}
        zonas={c.zonas}
        mensaje={mensaje}
        n={n("hero")}
      />
      <Dossier
        acreditaciones={c.acreditaciones}
        garantias={c.garantias}
        negocio={c.negocio}
        contacto={c.contacto}
        comunidades={Boolean(c.comunidades)}
        n={n("dossier")}
      />
      <Proceso proceso={c.proceso} n={n("proceso")} />
      <section aria-labelledby="h2-servicios" className="contenedor pb-14 lg:pb-24">
        <Rotulo n={n("servicios")} texto="Servicios" />
        <h2 id="h2-servicios" className={cn(H2, "mt-4")}>
          Nuestros servicios
        </h2>
        <ListaServicios servicios={c.servicios} className="mt-8" />
        <ParCta contacto={c.contacto} mensaje={mensaje} className="mt-8" />
      </section>
      <BloqueComunidades comunidades={c.comunidades} contacto={c.contacto} n={n("comunidades")} />
      <Tarifas tarifas={c.tarifas} n={n("tarifas")} />
      <Resenas resenas={c.resenas} valoracion={c.valoracion} fichaGoogle={c.contacto.fichaGoogle} n={n("resenas")}>
        <ParCta contacto={c.contacto} mensaje={mensaje} />
      </Resenas>
      <Zonas zonas={c.zonas} n={n("zonas")} />
      <PreguntasFrecuentes preguntas={c.preguntas} n={n("preguntas")} />
      <CtaFinal contacto={c.contacto} mensaje={mensaje} n={n("cta")} />
    </Marco>
  );
}
