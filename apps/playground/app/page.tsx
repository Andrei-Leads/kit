import { mensajeGeneral, type Ancla } from "@andrei-leads/core";

import { AntesDespues } from "@/components/base/AntesDespues";
import { BarraMovil } from "@/components/base/BarraMovil";
import { Foto } from "@/components/base/Foto";
import { MedioHero } from "@/components/base/MedioHero";
import { MenuPopover } from "@/components/base/MenuPopover";
import { Migas } from "@/components/base/Migas";
import { Preguntas } from "@/components/base/Preguntas";
import config from "@/site.config";

const ENLACES: Ancla[] = [
  { href: "/servicios", texto: "Servicios" },
  { href: "/trabajos", texto: "Trabajos" },
  { href: "/empresa", texto: "Empresa" },
  { href: "/contacto", texto: "Contacto" },
];

function Bloque({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 border-t border-borde py-10" data-aparecer>
      <h2 className="font-titulo text-2xl text-texto">{titulo}</h2>
      {children}
    </section>
  );
}

/** Banco de pruebas: cada pieza del registro con datos del contrato. Sin JS, todo se ve. */
export default function Page() {
  const [trabajo] = config.trabajos;
  const [servicio] = config.servicios;
  return (
    <main className="mx-auto max-w-5xl px-4">
      <header className="flex items-center justify-between py-4">
        <span className="font-titulo text-lg">{config.negocio.nombre}</span>
        <MenuPopover enlaces={ENLACES} />
      </header>

      <Migas
        migas={[
          { href: "/", texto: "Inicio" },
          { href: "/trabajos", texto: "Trabajos" },
          { href: `/trabajos/${trabajo.slug}`, texto: trabajo.titulo },
        ]}
      />

      <h1 className="py-8 font-titulo text-display leading-none text-balance">Piezas base del kit</h1>

      <Bloque titulo="MedioHero (foto, origen IA)">
        <MedioHero imagen={config.imagenesHero[0]} video={config.videoHero} sizes="(min-width: 1024px) 992px, 100vw" proporcion="16/9" />
      </Bloque>

      <Bloque titulo="Foto (origen ficha de Google, etiqueta arriba)">
        <Foto imagen={servicio.imagenes[0]} sizes="(min-width: 768px) 50vw, 100vw" proporcion="3/2" posicionEtiqueta="arriba-derecha" className="md:w-1/2" />
      </Bloque>

      {trabajo.antes && (
        <Bloque titulo="AntesDespues">
          <AntesDespues antes={trabajo.antes} despues={trabajo.imagenes[0]} sizes="(min-width: 1024px) 992px, 100vw" />
        </Bloque>
      )}

      <Bloque titulo="Preguntas">
        <Preguntas preguntas={config.preguntas} />
      </Bloque>

      <Bloque titulo="Botones con el primario">
        <p className="inline-block rounded-boton bg-primario px-4 py-3 font-semibold text-sobre-primario">Texto sobre primario</p>
      </Bloque>

      <MenuPopover enlaces={ENLACES} id="menu-barra" sinBoton />
      <BarraMovil
        telefono={config.contacto.telefono}
        whatsapp={config.contacto.whatsapp}
        mensaje={mensajeGeneral(config.contacto)}
        variante="combinada"
        idMenu="menu-barra"
      />
    </main>
  );
}
