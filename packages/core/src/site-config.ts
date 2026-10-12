import { z } from "zod";

/* ─────────────────────────── Piezas reutilizables ─────────────────────────── */

const telefonoES = z
  .string()
  .regex(/^\+34\d{9}$/, "Formato: +34 seguido de 9 dígitos");

const anio = z.number().int().min(1900).max(2100);

/** Único tipo de imagen del contrato. `alt` es obligatorio (accesibilidad). */
const imagen = z.object({
  src: z.string().min(1),
  alt: z.string().min(1, "Texto alternativo obligatorio"),
});

/** Texto largo: lista de párrafos. */
const parrafos = z.array(z.string().min(1));

const pregunta = z.object({
  pregunta: z.string().min(1),
  respuesta: z.string().min(1),
});

const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug: solo minúsculas sin acentos, números y guiones");

/** Mensaje precargado de WhatsApp. */
const mensajeWhatsapp = z.string().min(1).max(200);

/**
 * "Reformas de baño" → "reformas-de-bano".
 * Sin acentos (la ñ pasa a n), minúsculas y guiones.
 */
export function crearSlug(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Rellena `slug` desde `titulo` si falta. */
function conSlug<T extends { titulo: string; slug?: string }>(item: T) {
  return { ...item, slug: item.slug ?? crearSlug(item.titulo) };
}

/** Comprueba que cada slug existe y es único dentro de su lista. */
function slugsUnicos(lista: string) {
  return (items: { titulo: string; slug: string }[], ctx: z.core.$RefinementCtx) => {
    const vistos = new Map<string, number>();
    items.forEach((item, i) => {
      if (!item.slug) {
        ctx.addIssue({
          code: "custom",
          path: [i, "slug"],
          message: `No se puede generar el slug de «${item.titulo}»: escribe uno a mano`,
        });
        return;
      }
      const previo = vistos.get(item.slug);
      if (previo !== undefined) {
        ctx.addIssue({
          code: "custom",
          path: [i, "slug"],
          message: `Slug repetido en ${lista}: «${item.slug}» ya lo usa ${lista}[${previo}]. Cambia el título o escribe otro slug`,
        });
      } else {
        vistos.set(item.slug, i);
      }
    });
  };
}

/*
 * PRECIOS: solo cifras que el cliente haya validado por escrito. Nunca se
 * inventan ni se copian de la competencia. Sin datos, la sección no sale.
 */
const precio = z.string().min(1).max(40); // "desde 60 €", "181 € + IVA"

/* ──────────────────────────────── Bloques ──────────────────────────────── */

const servicio = z.object({
  titulo: z.string().min(1),
  /** Corta: tarjeta y meta description de la página. */
  descripcion: z.string().min(1),
  /** Si falta, se genera del título. Ruta: /servicios/<slug>. */
  slug: slug.optional(),
  /** Párrafos de la página del servicio. Vacío → la página lleva noindex. */
  contenido: parrafos.default([]),
  incluye: z.array(z.string().min(1)).default([]),
  imagenes: z.array(imagen).default([]),
  preguntas: z.array(pregunta).default([]),
  mensajeWhatsapp: mensajeWhatsapp.optional(),
  precioDesde: precio.optional(),
});

const trabajo = z.object({
  titulo: z.string().min(1),
  /** Si falta, se genera del título. Ruta: /trabajos/<slug>. */
  slug: slug.optional(),
  descripcion: z.string().min(1).max(300),
  /** Barrio o municipio. */
  ubicacion: z.string().min(1).optional(),
  anio: anio.optional(),
  /** Slug de un servicio de `servicios` (enlace cruzado y filtro). */
  servicio: z.string().min(1).optional(),
  superficie: z.string().min(1).max(20).optional(), // "5 m²"
  duracion: z.string().min(1).max(20).optional(), // "10 días"
  precio: precio.optional(), // rango aproximado validado por el cliente
  contenido: parrafos.default([]),
  /** La primera es la foto principal («después»). */
  imagenes: z.array(imagen).min(1, "Al menos una imagen por trabajo"),
  antes: imagen.optional(),
  testimonio: z
    .object({ autor: z.string().min(1), texto: z.string().min(1) })
    .optional(),
});

export const siteConfigSchema = z
  .object({
    negocio: z.object({
      nombre: z.string().min(1),
      nombreLegal: z.string().min(1),
      nif: z.string().regex(/^[A-Z0-9]{9}$/, "NIF/CIF/NIE de 9 caracteres"),
      sector: z.string().min(1),
      descripcionCorta: z.string().max(160),
      logo: imagen.optional(),
      anioFundacion: anio.optional(),
      /** Solo sociedades (LSSI): "Inscrita en el Registro Mercantil de Valencia, tomo…". */
      registroMercantil: z.string().min(1).optional(),
      /** Tipo de LocalBusiness para el JSON-LD, del más específico al más general. */
      tipoSchema: z
        .array(
          z.enum([
            "Plumber",
            "Electrician",
            "Locksmith",
            "RoofingContractor",
            "HVACBusiness",
            "HousePainter",
            "GeneralContractor",
            "HomeAndConstructionBusiness",
            "Store",
          ])
        )
        .min(1)
        .default(["HomeAndConstructionBusiness"]),
    }),
    contacto: z.object({
      telefono: telefonoES,
      whatsapp: telefonoES.optional(),
      email: z.email(),
      direccion: z.object({
        calle: z.string().min(1),
        cp: z.string().regex(/^\d{5}$/, "Código postal de 5 dígitos"),
        ciudad: z.string().min(1),
        provincia: z.string().min(1),
      }),
      horario: z.array(z.object({ dias: z.string(), horas: z.string() })),
      coordenadas: z.object({ lat: z.number(), lng: z.number() }).optional(),
      /** Mensaje de WhatsApp por defecto. */
      mensajeWhatsapp: mensajeWhatsapp.optional(),
      /** Solo si es verdad (y coincide con la ficha de Google). */
      urgencias24h: z.boolean().default(false),
      /** Texto, no promesa calculada: "45 min". */
      tiempoLlegada: z.string().min(1).max(20).optional(),
      /** Enlace a la ficha de Google (reseñas y «Cómo llegar»). */
      fichaGoogle: z.url().optional(),
    }),
    zonas: z.array(z.string()).default([]),
    servicios: z
      .array(servicio.transform(conSlug))
      .min(1, "Al menos un servicio")
      .superRefine(slugsUnicos("servicios")),
    trabajos: z
      .array(trabajo.transform(conSlug))
      .default([])
      .superRefine(slugsUnicos("trabajos")),
    /** Resumen de Google. Se muestra; NO va al JSON-LD (aggregateRating). */
    valoracion: z
      .object({
        media: z.number().min(1).max(5),
        total: z.number().int().min(0),
      })
      .optional(),
    resenas: z
      .array(
        z.object({
          autor: z.string(),
          texto: z.string(),
          puntuacion: z.number().min(1).max(5),
          /** "2026-09" o "2026-09-14". */
          fecha: z
            .string()
            .regex(/^\d{4}-\d{2}(-\d{2})?$/, "Fecha: AAAA-MM o AAAA-MM-DD")
            .optional(),
          fuente: z.enum(["google", "web", "otra"]).optional(),
        })
      )
      .default([]),
    proceso: z
      .array(z.object({ titulo: z.string().min(1), texto: z.string().min(1) }))
      .max(6, "Máximo 6 pasos")
      .default([]),
    acreditaciones: z
      .array(
        z.object({
          nombre: z.string().min(1), // "Empresa instaladora de baja tensión (RII)"
          numero: z.string().min(1).optional(), // solo números reales
        })
      )
      .default([]),
    garantias: z
      .array(z.string().min(1).max(80))
      .max(6, "Máximo 6 garantías")
      .default([]), // "Presupuesto cerrado antes de empezar"
    marcas: z.array(z.string().min(1)).default([]),
    tarifas: z
      .object({
        items: z
          .array(z.object({ concepto: z.string().min(1), precio }))
          .min(1, "Al menos una tarifa"),
        nota: z.string().min(1).optional(), // "IVA incluido. Precio final tras ver la avería."
      })
      .optional(),
    empresa: z
      .object({
        historia: parrafos.default([]),
        imagenes: z.array(imagen).default([]),
        equipo: z
          .array(
            z.object({
              nombre: z.string().min(1),
              cargo: z.string().min(1).optional(),
              foto: imagen.optional(),
            })
          )
          .default([]),
      })
      .prefault({}),
    /** Solo obra técnica. Sin este bloque no existe /comunidades. */
    comunidades: z
      .object({
        texto: parrafos.min(1, "Al menos un párrafo"),
        puntos: z.array(z.string().min(1)).default([]),
        /** Muestra el bloque «¿Tu edificio tiene más de 50 años?» (IEEV.CV). */
        ieev: z.boolean().default(false),
      })
      .optional(),
    imagenesHero: z.array(imagen).default([]),
    galeria: z
      .array(imagen.extend({ titulo: z.string().optional() }))
      .default([]),
    preguntas: z.array(pregunta).default([]),
    marca: z
      .object({
        colorPrimario: z
          .string()
          .regex(/^#[0-9a-fA-F]{6}$/, "Color hex, p. ej. #1f6f50")
          .optional(),
      })
      .default({}),
    seo: z.object({
      titulo: z.string().max(60),
      descripcion: z.string().max(160),
      url: z.url(),
    }),
    redes: z
      .object({
        instagram: z.url().optional(),
        facebook: z.url().optional(),
      })
      .default({}),
  })
  .superRefine((config, ctx) => {
    const slugsServicios = new Set(config.servicios.map((s) => s.slug));
    config.trabajos.forEach((t, i) => {
      if (t.servicio && !slugsServicios.has(t.servicio)) {
        ctx.addIssue({
          code: "custom",
          path: ["trabajos", i, "servicio"],
          message: `El servicio «${t.servicio}» no existe. Usa el slug de un servicio: ${[
            ...slugsServicios,
          ].join(", ")}`,
        });
      }
    });
  });

export type SiteConfigInput = z.input<typeof siteConfigSchema>;
export type SiteConfig = z.output<typeof siteConfigSchema>;

export type Imagen = z.output<typeof imagen>;
export type Servicio = SiteConfig["servicios"][number];
export type Trabajo = SiteConfig["trabajos"][number];
export type Resena = SiteConfig["resenas"][number];
export type Pregunta = SiteConfig["preguntas"][number];
export type Acreditacion = SiteConfig["acreditaciones"][number];
export type Tarifas = NonNullable<SiteConfig["tarifas"]>;
export type Empresa = SiteConfig["empresa"];
export type Comunidades = NonNullable<SiteConfig["comunidades"]>;

/** Mensajes genéricos de Zod en español (sin tocar la configuración global). */
const erroresEnEspanol = z.locales.es().localeError;

export function defineSiteConfig(config: SiteConfigInput): SiteConfig {
  const resultado = siteConfigSchema.safeParse(config, { error: erroresEnEspanol });
  if (!resultado.success) {
    throw new Error(
      "site.config inválido:\n" + z.prettifyError(resultado.error)
    );
  }
  return resultado.data;
}
