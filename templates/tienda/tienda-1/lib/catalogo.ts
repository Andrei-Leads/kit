import type { Imagen, Servicio } from "@andrei-leads/core";

/*
 * Catálogo LOCAL del template «Almacén» (tienda-1).
 *
 * Lo que el contrato de core no tiene y la spec necesita: la foto oscura de cada familia en la
 * rejilla de inicio, los lemas de la cabecera de familia (F1) y las subfamilias con sus referencias
 * (F2), más las imágenes propias del diseño (portadas de página, composición circular, «cómo
 * trabajamos»). Cada familia se enlaza con su servicio por `slug` (= `servicios[].slug` de
 * site.config.ts). Una familia sin entrada aquí sigue funcionando: usa sus datos de site.config y
 * las secciones que dependen de este archivo se ocultan.
 *
 * Este archivo NO importa `@/site.config`: es solo datos, y lo puede leer cualquier componente.
 * En la web de un cliente se rellena junto con site.config.ts.
 */

export type Subfamilia = {
  /** Título de la tarjeta (1-2 palabras): «Correderas», «Cremonas»… */
  titulo: string;
  /** Recorte de producto 1:1, PNG transparente (sobresale por encima de la tarjeta). Opcional. */
  imagen?: Imagen;
  /** 3-5 referencias de ejemplo (1-4 palabras cada una). */
  referencias: string[];
};

export type FamiliaCatalogo = {
  /** Slug del servicio de site.config.ts al que completa. */
  slug: string;
  /** Foto oscura 4:3 para la rejilla de inicio y el mosaico de la banda CTA. Sin ella, `imagenes[0]` del servicio. */
  tile?: Imagen;
  /** Lema de marca de la columna izquierda de la cabecera de familia (8-10 palabras). */
  lemaIzquierda?: string;
  /** Lema de marca de la columna derecha (4-5 palabras). */
  lemaDerecha?: string;
  /** Título de la sección de subfamilias (6-8 palabras). Sin él: «Nuestra gama de {familia}». */
  tituloGama?: string;
  /** Tarjetas de subfamilia (F2). Vacío: la sección no sale. */
  subfamilias: Subfamilia[];
};

const sub = (familia: string, n: number, titulo: string, alt: string, referencias: string[]): Subfamilia => ({
  titulo,
  imagen: { src: `/ejemplo/sub-${familia}-${n}.png`, alt },
  referencias,
});

export const familias: FamiliaCatalogo[] = [
  {
    slug: "herrajes-de-aluminio",
    tile: { src: "/ejemplo/tile-herrajes-de-aluminio.jpg", alt: "Herrajes de aluminio sobre fondo oscuro" },
    lemaIzquierda: "Todo el herraje para ventana y puerta de aluminio",
    lemaDerecha: "Las series más habituales",
    tituloGama: "Lo que encontrarás en herrajes de aluminio",
    subfamilias: [
      sub("herrajes-de-aluminio", 1, "Practicables", "Cremona de ventana practicable", ["Cremonas", "Bisagras de ventana", "Cierres embutidos"]),
      sub("herrajes-de-aluminio", 2, "Correderas", "Cierre de ventana corredera", ["Cierres de gancho", "Guías", "Topes y tacos"]),
      sub("herrajes-de-aluminio", 3, "Escuadras", "Escuadra de unión de perfiles", ["Escuadras de unión", "Escuadras de alineación", "Tornillería"]),
      sub("herrajes-de-aluminio", 4, "Puertas", "Bisagra de puerta de aluminio", ["Bisagras de puerta", "Cerraderos", "Cierrapuertas"]),
    ],
  },
  {
    slug: "herrajes-de-pvc",
    tile: { src: "/ejemplo/tile-herrajes-de-pvc.jpg", alt: "Herraje oscilobatiente de PVC sobre fondo oscuro" },
    lemaIzquierda: "Herraje perimetral para ventanas y balconeras de PVC",
    lemaDerecha: "Para las series más comunes",
    subfamilias: [
      sub("herrajes-de-pvc", 1, "Oscilobatientes", "Kit de herraje oscilobatiente", ["Kits completos", "Compases", "Cremonas"]),
      sub("herrajes-de-pvc", 2, "Bisagras", "Bisagra de ventana de PVC", ["Bisagras de hoja", "Pernios", "Tapetas"]),
      sub("herrajes-de-pvc", 3, "Cierres", "Cierre de seguridad de PVC", ["Cerraderos", "Bulones", "Cierres de seguridad"]),
      sub("herrajes-de-pvc", 4, "Accesorios", "Accesorios de montaje para PVC", ["Calzos", "Tapones", "Tornillería"]),
    ],
  },
  {
    slug: "cerraduras-y-cilindros",
    tile: { src: "/ejemplo/tile-cerraduras-y-cilindros.jpg", alt: "Cerradura y cilindros sobre fondo oscuro" },
    subfamilias: [
      sub("cerraduras-y-cilindros", 1, "Cerraduras", "Cerradura de embutir", ["De embutir", "De sobreponer", "Para perfil estrecho"]),
      sub("cerraduras-y-cilindros", 2, "Cilindros", "Cilindro de seguridad", ["Cilindros europeos", "Antibumping", "Amaestrados"]),
      sub("cerraduras-y-cilindros", 3, "Cerraderos", "Cerradero eléctrico", ["Cerraderos", "Abrepuertas", "Contracerraderos"]),
    ],
  },
  {
    slug: "bisagras-y-pernios",
    tile: { src: "/ejemplo/tile-bisagras-y-pernios.jpg", alt: "Bisagras y pernios sobre fondo oscuro" },
    subfamilias: [],
  },
  {
    slug: "manillas-y-tiradores",
    tile: { src: "/ejemplo/tile-manillas-y-tiradores.jpg", alt: "Manillas y tiradores sobre fondo oscuro" },
    subfamilias: [],
  },
  {
    slug: "ruedas-y-rodamientos",
    tile: { src: "/ejemplo/tile-ruedas-y-rodamientos.jpg", alt: "Ruedas de corredera sobre fondo oscuro" },
    subfamilias: [],
  },
  {
    slug: "juntas-y-felpudos",
    tile: { src: "/ejemplo/tile-juntas-y-felpudos.jpg", alt: "Rollos de junta y felpudo sobre fondo oscuro" },
    subfamilias: [],
  },
];

/** Entrada local de una familia, o `undefined` si no tiene. */
export function familiaCatalogo(slug: string): FamiliaCatalogo | undefined {
  return familias.find((f) => f.slug === slug);
}

/** Foto oscura de la familia para la rejilla de inicio y el mosaico CTA: `tile` o, si no hay, su primera foto. */
export function fotoTile(servicio: Pick<Servicio, "slug" | "imagenes">): Imagen | undefined {
  return familiaCatalogo(servicio.slug)?.tile ?? servicio.imagenes[0];
}

/** Imágenes propias del diseño, sin campo en el contrato. */
export const IMAGENES = {
  /** Último tile de la rejilla de inicio («Ver todo»): pasillo del almacén. 4:3. */
  verTodo: { src: "/ejemplo/tile-ver-todo.jpg", alt: "Pasillo de estanterías del almacén con cajetines" },
  /** Composición circular de producto con un círculo blanco vacío en el centro (ahí va el nombre). 1:1, PNG transparente. */
  composicion: {
    src: "/ejemplo/composicion.png",
    alt: "Herrajes y herramientas en abanico alrededor de un círculo blanco",
  },
  /** Fotos de las tarjetas de «Cómo trabajamos», en el orden de los pasos. 6:5. */
  proceso: [
    { src: "/ejemplo/proceso-1.jpg", alt: "Móvil con un chat que muestra la foto de una pieza" },
    { src: "/ejemplo/proceso-2.jpg", alt: "Mostrador del almacén con una pieza sobre el banco" },
    { src: "/ejemplo/proceso-3.jpg", alt: "Carpintero instalando una ventana de aluminio" },
    { src: "/ejemplo/proceso-4.jpg", alt: "Cajas de pedido preparadas en el almacén" },
  ],
  /** Fotos de fondo de los PageHero (≈ 2,75:1, centro libre para el título). */
  portadas: {
    productos: { src: "/ejemplo/portada-productos.jpg", alt: "Surtido de herrajes sobre una superficie metálica oscura" },
    empresa: { src: "/ejemplo/portada-empresa.jpg", alt: "Herrajes y herramientas sobre un fondo burdeos oscuro" },
    contacto: { src: "/ejemplo/portada-contacto.jpg", alt: "Persona hablando por el móvil en un taller de carpintería metálica" },
  },
} satisfies Record<string, Imagen | Imagen[] | Record<string, Imagen>>;
