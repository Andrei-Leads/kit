/*
 * SEO técnico: sitemap, robots, metadatos por página y JSON-LD.
 *
 * Sin dependencia de `next`: se devuelven objetos planos compatibles con
 * `MetadataRoute.Sitemap`, `MetadataRoute.Robots` y `Metadata`. El template
 * los conecta en `app/sitemap.ts`, `app/robots.ts`, `metadata` y
 * `generateMetadata`.
 *
 * Next fusiona los metadatos por clave de primer nivel: si una página define
 * `openGraph`, sustituye entero al del layout. Por eso cada ayudante devuelve
 * el `openGraph`, el `twitter`, el `robots` y el `canonical` completos.
 */
import type { Imagen, SiteConfig } from "./site-config";
import { DIAS_SCHEMA, formatearHorario, listaY } from "./horario";

/* ─────────────────────────────── Tipos ─────────────────────────────── */

export type EntradaSitemap = { url: string };

export type Robots = {
  rules: { userAgent: string; allow?: string; disallow?: string };
  sitemap?: string;
};

type ImagenOG = { url: string; alt: string };

export type Metadatos = {
  metadataBase?: URL;
  title?: string | { default: string; template: string };
  description?: string;
  robots?: { index: boolean; follow: boolean };
  alternates?: { canonical: string };
  openGraph?: {
    type: "website";
    locale: string;
    siteName: string;
    title: string;
    description: string;
    url: string;
    images?: ImagenOG[];
  };
  twitter?: {
    card: "summary" | "summary_large_image";
    title: string;
    description: string;
    images?: string[];
  };
};

/* ───────────────────────────── Ayudantes ───────────────────────────── */

/** `seo.url` sin barra final: "https://ejemplo.com". */
function base(config: SiteConfig): string {
  return config.seo.url.replace(/\/+$/, "");
}

/** URL absoluta de una ruta ("/servicios") o de una imagen ("/ejemplo/x.jpg"). */
function absoluta(config: SiteConfig, ruta: string): string {
  if (/^https?:\/\//.test(ruta)) return ruta;
  return base(config) + (ruta.startsWith("/") ? ruta : "/" + ruta);
}

/** Imagen para compartir: hero → galería → primera foto de un servicio. */
function imagenPrincipal(config: SiteConfig): Imagen | undefined {
  return (
    config.imagenesHero[0] ??
    config.galeria[0] ??
    config.servicios.find((s) => s.imagenes.length > 0)?.imagenes[0]
  );
}

/* ─────────────────────── Descripciones por página ─────────────────────── */

const MAX_DESCRIPCION = 160;

/** Recorta a ≤ 160 caracteres sin partir palabras y añade «…». */
function recortar(texto: string, max = MAX_DESCRIPCION): string {
  const limpio = texto.replace(/\s+/g, " ").trim();
  if (limpio.length <= max) return limpio;
  const corte = limpio.slice(0, max).replace(/\s+\S*$/, "");
  return corte.replace(/[\s,;:.–-]+$/, "") + "…";
}

/** "Reparación de persianas" → "reparación de persianas" (respeta siglas: "RII"). */
function minuscula(texto: string): string {
  return /^\p{Lu}\p{Ll}/u.test(texto) ? texto.charAt(0).toLowerCase() + texto.slice(1) : texto;
}

/** "+34600000000" → "600 00 00 00". */
function telefonoVisible(telefono: string): string {
  const d = telefono.replace(/\D/g, "").replace(/^34(?=\d{9}$)/, "");
  return d.length === 9 ? `${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5, 7)} ${d.slice(7)}` : telefono;
}

/** Descripción generada de los datos para las rutas fijas; `undefined` si la ruta no es una de ellas. */
function descripcionAutomatica(config: SiteConfig, ruta: string): string | undefined {
  const { negocio, contacto, servicios, trabajos, empresa } = config;
  const ciudad = contacto.direccion.ciudad;
  switch (ruta) {
    case "/servicios": {
      // 4 títulos; si no cabe, 3 (y si tampoco, se recorta).
      const frase = (n: number) => {
        const titulos = servicios.slice(0, n).map((s) => minuscula(s.titulo));
        const lista = servicios.length > n ? titulos.join(", ") + " y más" : listaY(titulos);
        return `${negocio.sector} en ${ciudad}: ${lista}.`;
      };
      const larga = frase(4);
      return larga.length <= MAX_DESCRIPCION ? larga : frase(3);
    }
    case "/trabajos": {
      const lugares = [...new Set(trabajos.map((t) => t.ubicacion).filter((u): u is string => Boolean(u)))];
      const donde = lugares.length > 0 ? listaY(lugares) : ciudad;
      if (trabajos.length === 0) return `Fotos de trabajos de ${minuscula(negocio.sector)} en ${donde}.`;
      const n = trabajos.length === 1 ? "1 trabajo real" : `${trabajos.length} trabajos reales`;
      return `${n} de ${minuscula(negocio.sector)} en ${donde}, con fotos y detalles de cada obra.`;
    }
    case "/empresa": {
      if (empresa.historia.length > 0) return empresa.historia[0];
      const desde = negocio.anioFundacion ? ` En el oficio desde ${negocio.anioFundacion}.` : "";
      return negocio.descripcionCorta + desde;
    }
    case "/contacto": {
      const d = contacto.direccion;
      const [primera] = formatearHorario(contacto.horario);
      const horario = primera ? ` ${primera.dias}, ${primera.horas}.` : "";
      return `Contacta con ${negocio.nombre}: ${d.calle}, ${d.cp} ${d.ciudad}. Teléfono ${telefonoVisible(contacto.telefono)}.${horario}`;
    }
    case "/aviso-legal":
      return `Aviso legal de ${negocio.nombre}: datos del titular de la web y condiciones de uso.`;
    case "/privacidad":
      return `Política de privacidad de ${negocio.nombre}: qué datos tratamos, para qué y cómo ejercer tus derechos.`;
    case "/cookies":
      return `Política de cookies de ${negocio.nombre}: esta web no usa cookies de terceros.`;
    default:
      return undefined;
  }
}

function robotsPagina(config: SiteConfig, indexable = true) {
  if (!config.seo.indexar) return { index: false, follow: false };
  return { index: indexable, follow: true };
}

/** Bloque común de cada página: canonical, robots, Open Graph y Twitter. */
function metadatosComunes(
  config: SiteConfig,
  opciones: { ruta: string; titulo: string; descripcion: string; imagen?: Imagen; indexable?: boolean }
): Metadatos {
  const { ruta, titulo, descripcion, imagen, indexable } = opciones;
  return {
    description: recortar(descripcion),
    robots: robotsPagina(config, indexable),
    alternates: { canonical: ruta },
    openGraph: {
      type: "website",
      locale: "es_ES",
      siteName: config.negocio.nombre,
      title: titulo,
      description: recortar(descripcion),
      url: ruta,
      ...(imagen && { images: [{ url: imagen.src, alt: imagen.alt }] }),
    },
    twitter: {
      card: imagen ? "summary_large_image" : "summary",
      title: titulo,
      description: recortar(descripcion),
      ...(imagen && { images: [imagen.src] }),
    },
  };
}

/* ─────────────────────────────── API ─────────────────────────────── */

/**
 * Páginas que existen según los datos (sin legales ni servicios sin
 * `contenido`). Si `seo.indexar` es false, lista vacía.
 */
export function crearSitemap(config: SiteConfig): EntradaSitemap[] {
  if (!config.seo.indexar) return [];
  const rutas = ["/", "/servicios"];
  for (const s of config.servicios) {
    if (s.contenido.length > 0) rutas.push(`/servicios/${s.slug}`);
  }
  if (config.trabajos.length > 0 || config.galeria.length > 0) {
    rutas.push("/trabajos");
    for (const t of config.trabajos) rutas.push(`/trabajos/${t.slug}`);
  }
  rutas.push("/empresa", "/contacto");
  if (config.comunidades) rutas.push("/comunidades");
  return rutas.map((ruta) => ({ url: absoluta(config, ruta) }));
}

/** `indexar: true` → todo permitido + sitemap; false → `Disallow: /`. */
export function crearRobots(config: SiteConfig): Robots {
  if (!config.seo.indexar) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluta(config, "/sitemap.xml"),
  };
}

/** Metadatos base del layout (y de la home). */
export function crearMetadatos(config: SiteConfig): Metadatos {
  const { seo, negocio } = config;
  return {
    metadataBase: new URL(seo.url),
    title: { default: seo.titulo, template: "%s · " + negocio.nombre },
    ...metadatosComunes(config, {
      ruta: "/",
      titulo: seo.titulo,
      descripcion: seo.descripcion,
      imagen: imagenPrincipal(config),
    }),
  };
}

/**
 * Página estática (`/servicios`, `/empresa`, `/contacto`, legales…). Sin
 * `descripcion`, se genera de los datos según la ruta. `indexable: false` →
 * `noindex, follow` (legales).
 */
export function metadatosPagina(
  config: SiteConfig,
  pagina: { ruta: string; titulo: string; descripcion?: string; indexable?: boolean }
): Metadatos {
  return {
    title: pagina.titulo,
    ...metadatosComunes(config, {
      ruta: pagina.ruta,
      titulo: `${pagina.titulo} · ${config.negocio.nombre}`,
      descripcion:
        pagina.descripcion ?? descripcionAutomatica(config, pagina.ruta) ?? config.seo.descripcion,
      imagen: imagenPrincipal(config),
      indexable: pagina.indexable,
    }),
  };
}

/** `/servicios/<slug>`. Sin `contenido` → noindex, follow. Slug inexistente → {}. */
export function metadatosServicio(config: SiteConfig, slug: string): Metadatos {
  const servicio = config.servicios.find((s) => s.slug === slug);
  if (!servicio) return {};
  return {
    title: servicio.titulo,
    ...metadatosComunes(config, {
      ruta: `/servicios/${servicio.slug}`,
      titulo: `${servicio.titulo} · ${config.negocio.nombre}`,
      descripcion: servicio.descripcion,
      imagen: servicio.imagenes[0] ?? imagenPrincipal(config),
      indexable: servicio.contenido.length > 0,
    }),
  };
}

/** `/trabajos/<slug>`. Slug inexistente → {}. */
export function metadatosTrabajo(config: SiteConfig, slug: string): Metadatos {
  const trabajo = config.trabajos.find((t) => t.slug === slug);
  if (!trabajo) return {};
  return {
    title: trabajo.titulo,
    ...metadatosComunes(config, {
      ruta: `/trabajos/${trabajo.slug}`,
      titulo: `${trabajo.titulo} · ${config.negocio.nombre}`,
      descripcion: trabajo.descripcion,
      imagen: trabajo.imagenes[0],
    }),
  };
}

/**
 * JSON-LD LocalBusiness. Nunca `aggregateRating` ni `review` (las directrices
 * de Google no lo permiten con reseñas de Google). `urgencias24h` no se
 * convierte en 24/7: manda el horario de oficina.
 */
export function crearDatosEstructurados(config: SiteConfig): Record<string, unknown> {
  const { negocio, contacto, zonas, redes } = config;
  const d = contacto.direccion;
  const imagen = imagenPrincipal(config);
  const sameAs = [redes.instagram, redes.facebook].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": negocio.tipoSchema,
    name: negocio.nombre,
    description: negocio.descripcionCorta,
    url: config.seo.url,
    telephone: contacto.telefono,
    email: contacto.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: d.calle,
      postalCode: d.cp,
      addressLocality: d.ciudad,
      addressRegion: d.provincia,
      addressCountry: "ES",
    },
    ...(contacto.coordenadas && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: contacto.coordenadas.lat,
        longitude: contacto.coordenadas.lng,
      },
    }),
    ...(contacto.horario.length > 0 && {
      openingHoursSpecification: contacto.horario.map((f) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: f.dias.map((dia) => DIAS_SCHEMA[dia]),
        opens: f.abre,
        closes: f.cierra,
      })),
    }),
    ...(zonas.length > 0 && {
      areaServed: zonas.map((name) => ({ "@type": "City", name })),
    }),
    ...(imagen && { image: absoluta(config, imagen.src) }),
    ...(negocio.logo && { logo: absoluta(config, negocio.logo.src) }),
    ...(sameAs.length > 0 && { sameAs }),
    ...(negocio.anioFundacion && { foundingDate: String(negocio.anioFundacion) }),
  };
}

/** `<script type="application/ld+json">` con el LocalBusiness. Va en el layout. */
export function DatosEstructurados({ config }: { config: SiteConfig }) {
  // `<` escapado para que ningún dato pueda cerrar el <script>.
  const json = JSON.stringify(crearDatosEstructurados(config)).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
