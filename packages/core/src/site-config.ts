import { z } from "zod";

const telefonoES = z
  .string()
  .regex(/^\+34\d{9}$/, "Formato: +34 seguido de 9 dígitos");

export const siteConfigSchema = z.object({
  negocio: z.object({
    nombre: z.string().min(1),
    nombreLegal: z.string().min(1),
    nif: z.string().regex(/^[A-Z0-9]{9}$/, "NIF/CIF/NIE de 9 caracteres"),
    sector: z.string().min(1),
    descripcionCorta: z.string().max(160),
    logo: z.string().optional(),
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
  }),
  zonas: z.array(z.string()).default([]),
  servicios: z
    .array(
      z.object({
        titulo: z.string().min(1),
        descripcion: z.string().min(1),
        imagen: z.string().optional(),
      })
    )
    .min(1, "Al menos un servicio"),
  resenas: z
    .array(
      z.object({
        autor: z.string(),
        texto: z.string(),
        puntuacion: z.number().min(1).max(5),
      })
    )
    .default([]),
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
});

export type SiteConfigInput = z.input<typeof siteConfigSchema>;
export type SiteConfig = z.output<typeof siteConfigSchema>;

export function defineSiteConfig(config: SiteConfigInput): SiteConfig {
  const resultado = siteConfigSchema.safeParse(config);
  if (!resultado.success) {
    throw new Error(
      "site.config inválido:\n" + z.prettifyError(resultado.error)
    );
  }
  return resultado.data;
}