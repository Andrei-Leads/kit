import type { ReactNode } from "react";
import type { SiteConfig } from "./site-config";

/** Rutas que todo template debe enlazar desde su pie de página. */
export const enlacesLegales = [
  { href: "/aviso-legal", texto: "Aviso legal" },
  { href: "/privacidad", texto: "Política de privacidad" },
  { href: "/cookies", texto: "Política de cookies" },
] as const;

function Documento({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl space-y-4 px-6 py-16 leading-relaxed">
      <h1 className="text-3xl font-bold">{titulo}</h1>
      {children}
    </article>
  );
}

function H2({ children }: { children: ReactNode }) {
  return <h2 className="pt-4 text-xl font-semibold">{children}</h2>;
}

function direccionCompleta(config: SiteConfig) {
  const d = config.contacto.direccion;
  return `${d.calle}, ${d.cp} ${d.ciudad} (${d.provincia})`;
}

export function AvisoLegal({ config }: { config: SiteConfig }) {
  const { negocio, contacto, seo } = config;
  return (
    <Documento titulo="Aviso legal">
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la
        Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de
        este sitio web:
      </p>
      <ul className="list-disc space-y-1 pl-6">
        <li>Titular: {negocio.nombreLegal}</li>
        <li>NIF: {negocio.nif}</li>
        <li>Domicilio: {direccionCompleta(config)}</li>
        <li>Email: {contacto.email}</li>
        <li>Teléfono: {contacto.telefono}</li>
        <li>Sitio web: {seo.url}</li>
      </ul>

      <H2>Condiciones de uso</H2>
      <p>
        El acceso a este sitio web es gratuito e implica la aceptación de estas condiciones. El
        usuario se compromete a hacer un uso adecuado de los contenidos y a no emplearlos para
        actividades ilícitas.
      </p>

      <H2>Propiedad intelectual</H2>
      <p>
        Los textos, imágenes, logotipos y demás contenidos de este sitio web son propiedad de{" "}
        {negocio.nombreLegal} o se usan con autorización. Queda prohibida su reproducción sin
        permiso expreso.
      </p>

      <H2>Responsabilidad</H2>
      <p>
        {negocio.nombreLegal} no se hace responsable de los daños derivados de un uso indebido de
        este sitio web ni de los contenidos de sitios de terceros enlazados desde él.
      </p>

      <H2>Legislación aplicable</H2>
      <p>Este aviso legal se rige por la legislación española.</p>
    </Documento>
  );
}

export function PoliticaPrivacidad({ config }: { config: SiteConfig }) {
  const { negocio, contacto } = config;
  return (
    <Documento titulo="Política de privacidad">
      <H2>Responsable del tratamiento</H2>
      <p>
        {negocio.nombreLegal}, NIF {negocio.nif}, con domicilio en {direccionCompleta(config)}.
        Contacto: {contacto.email}.
      </p>

      <H2>Qué datos tratamos y para qué</H2>
      <p>
        Los datos que nos facilitas al contactar por teléfono, email, WhatsApp o formulario
        (nombre, datos de contacto y el contenido de tu consulta) se usan exclusivamente para
        atender tu solicitud y, en su caso, preparar un presupuesto o prestar el servicio.
      </p>

      <H2>Legitimación</H2>
      <p>
        La base legal es tu consentimiento al contactarnos y, cuando solicitas un presupuesto o
        servicio, la aplicación de medidas precontractuales o la ejecución de un contrato
        (artículo 6.1.a y 6.1.b del RGPD).
      </p>

      <H2>Conservación</H2>
      <p>
        Conservamos los datos mientras sean necesarios para atender tu solicitud y, después,
        durante los plazos exigidos por la ley.
      </p>

      <H2>Destinatarios</H2>
      <p>
        No cedemos tus datos a terceros salvo obligación legal. Algunos proveedores (por ejemplo,
        el alojamiento web o el correo electrónico) pueden tratarlos por cuenta nuestra con las
        garantías que exige el RGPD.
      </p>

      <H2>Tus derechos</H2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación
        del tratamiento y portabilidad escribiendo a {contacto.email}. Si consideras que no hemos
        atendido correctamente tu solicitud, puedes presentar una reclamación ante la Agencia
        Española de Protección de Datos (www.aepd.es).
      </p>
    </Documento>
  );
}

export function PoliticaCookies({ config }: { config: SiteConfig }) {
  return (
    <Documento titulo="Política de cookies">
      <p>Una cookie es un pequeño archivo que un sitio web guarda en tu navegador.</p>
      <p>
        Este sitio web de {config.negocio.nombre} no utiliza cookies de análisis, de publicidad
        ni de terceros. Solo podría usar cookies técnicas imprescindibles para su funcionamiento,
        que no requieren consentimiento.
      </p>
      <p>
        Si en el futuro se incorporan otras cookies, esta política se actualizará y se te pedirá
        el consentimiento antes de instalarlas.
      </p>
      <p>Puedes eliminar o bloquear las cookies desde la configuración de tu navegador.</p>
    </Documento>
  );
}