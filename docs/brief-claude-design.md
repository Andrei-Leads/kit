# Brief para Claude Design: templates de Andrei Leads

> Este documento es tu encargo. Léelo entero antes de diseñar. Si algo de tu diseño contradice una regla, la regla gana; si crees que una regla impide un buen diseño, dilo explícitamente en lugar de saltártela.

---

## 1. Qué vas a diseñar

Un **template**: el diseño reutilizable de una web para un nicho de pymes locales. No es la web de un cliente concreto. Se rellenará con los datos de cualquier negocio del nicho.

**Para qué se usa:** como demostración. Se le enseña al dueño de un negocio sin web cómo quedaría la suya, con sus datos reales. Tiene que reconocerse en ella en cinco segundos.

**Objetivo único de la página:** que el visitante **llame** (o escriba por WhatsApp). Todo lo demás está al servicio de eso.

**Quién la visita:** particulares y comunidades de vecinos de municipios de la provincia de Valencia que buscan el servicio en el **móvil**, casi siempre desde Google. Llegan con prisa y deciden en segundos si llamar.

**Quién la compra:** el dueño del negocio. Es de oficio, no de tecnología. Valora que se vea profesional, cercana y clara, no "de agencia".

---

## 2. Restricciones técnicas

- **Stack:** Next.js (App Router) con TypeScript, Tailwind CSS v4 y componentes **shadcn/ui** copiados dentro del template.
- **Una sola página principal** (one-page) más tres páginas legales que **ya existen**: no las diseñes, solo enlázalas desde el pie.
- **Móvil primero:** diseña a 375 px de ancho y después adapta a escritorio a 1280 px.
- **Español de España** en todos los textos.
- **Ningún dato del negocio escrito a mano.** Nombres, teléfonos, servicios, fotos y textos salen del contrato de datos (§4). Los textos genéricos de la interfaz sí pueden ser fijos (por ejemplo, "Nuestros servicios" o "Llamar ahora").

---

## 3. Estructura de un template

```
templates/<nicho>-<n>/
├─ app/
│  ├─ layout.tsx          # tipografías (next/font), color primario, cabecera y pie
│  ├─ page.tsx            # compone las secciones en el orden que elijas
│  ├─ globals.css         # Tailwind + estilos de core + @theme con TUS tokens
│  ├─ aviso-legal/        # ya existe: no diseñar
│  ├─ privacidad/         # ya existe: no diseñar
│  └─ cookies/            # ya existe: no diseñar
├─ components/
│  ├─ ui/                 # componentes shadcn que uses
│  └─ secciones/          # un componente por sección: Hero.tsx, Servicios.tsx…
├─ public/
│  └─ ejemplo/            # imágenes de ejemplo neutras
└─ site.config.ts         # los datos del negocio (§4)
```

Cada sección es un componente que recibe **solo su parte** de los datos. Por ejemplo, `Servicios` recibe `servicios` y no el objeto completo.

---

## 4. Contrato de datos (`site.config`)

`?` significa opcional. Las listas marcadas con "por defecto vacía" pueden llegar sin elementos.

| Bloque | Campos |
|---|---|
| `negocio` | `nombre`, `nombreLegal`, `nif`, `sector`, `descripcionCorta` (≤ 160 caracteres), `logo?` |
| `contacto` | `telefono`, `whatsapp?`, `email`, `direccion` {`calle`, `cp`, `ciudad`, `provincia`}, `horario` [{`dias`, `horas`}], `coordenadas?` |
| `zonas` | lista de municipios donde trabaja (por defecto vacía) |
| `servicios` | lista de {`titulo`, `descripcion`, `imagen?`}, **mínimo 1** |
| `resenas` | lista de {`autor`, `texto`, `puntuacion` 1–5} (por defecto vacía) |
| `galeria` | lista de {`src`, `alt`, `titulo?`} (por defecto vacía) |
| `preguntas` | lista de {`pregunta`, `respuesta`} (por defecto vacía) |
| `marca` | `colorPrimario?`: color de marca del cliente (ver §6, regla 3) |
| `seo` | `titulo`, `descripcion`, `url` |
| `redes` | `instagram?`, `facebook?` |

Ten en cuenta la variabilidad real: de 1 a 10 servicios, servicios con y sin imagen, reseñas de una línea o de un párrafo, nombres de negocio cortos ("Verde") y largos ("Jardinería y Mantenimientos Hermanos García").

---

## 5. Catálogo de secciones

Tú eliges cuáles usar y en qué orden. **Si una sección opcional no tiene datos, desaparece sin dejar hueco.**

| Sección | Campos que usa | Sin datos |
|---|---|---|
| Cabecera | `negocio.nombre`, `negocio.logo?`, `contacto.telefono` | Siempre visible |
| Hero | `negocio.nombre`, `negocio.descripcionCorta`, `negocio.sector`, `zonas` | Siempre visible |
| Servicios | `servicios` | Siempre visible (mínimo 1) |
| Galería | `galeria` | Se oculta |
| Reseñas | `resenas` | Se oculta |
| Zonas | `zonas` | Se oculta |
| Preguntas frecuentes | `preguntas` (acordeón) | Se oculta |
| Contacto | `contacto`: teléfono, WhatsApp, email, dirección y horario | Siempre visible |
| Pie | `negocio.nombre`, enlaces legales, `redes` | Siempre visible |

Recomendado en móvil: una barra fija abajo con "Llamar" y, si existe, "WhatsApp".

---

## 6. Reglas fijas

1. **Botón de llamada:** usa el componente `BotonLlamada` del paquete core (props: `telefono`, `className?`, `children?`). Su aspecto lo decides tú mediante `className`. Debe aparecer como mínimo en el hero y en contacto, y verse en móvil sin hacer scroll.
2. **WhatsApp:** un enlace `https://wa.me/<número sin el +>`, y solo si existe `contacto.whatsapp`.
3. **Color:** define tus propios tokens en `@theme` (colores, radios, sombras). `--color-primario` es el acento principal **y el cliente puede sustituirlo por su color de marca**. Úsalo donde funcione con cualquier color medio u oscuro con texto blanco encima (botones, franjas, acentos). El diseño no puede depender de un tono concreto de primario.
4. **Tipografías:** siempre con `next/font` (autoalojadas). Máximo dos familias.
5. **Nada de terceros:** ni iframes (Google Maps, YouTube), ni scripts externos, ni fuentes cargadas desde servidores de Google, ni píxeles de seguimiento. La política de cookies de la web declara que no hay cookies de terceros. Para la ubicación, muestra la dirección en texto con un **enlace** "Cómo llegar" a Google Maps: un enlace no instala cookies.
6. **Imágenes:** con `next/image`, y el `alt` sale de los datos. Las de ejemplo son neutras y están en `public/ejemplo/`. El diseño debe aguantar fotos reales de calidad irregular, hechas con el móvil del cliente: proporciones fijas con recorte (`object-cover`) y nunca texto sobre una foto sin una capa oscura debajo.
7. **Accesibilidad:** contraste WCAG AA, un solo `h1`, un `h2` por sección y zonas táctiles de al menos 44 px.
8. **Legal:** el pie enlaza a `/aviso-legal`, `/privacidad` y `/cookies`. Esas rutas vienen de `enlacesLegales` en core.
9. **Sin formulario de contacto** en esta versión: el contacto es por llamada, WhatsApp o email.
10. **Ligera:** sin animaciones pesadas ni nada que retrase la primera carga.

---

## 7. Qué entregar

1. La página completa a **375 px** y a **1280 px**, con los datos de ejemplo de §8.
2. La **misma página con otro primario** (por ejemplo, `#1e40af`), para comprobar que el diseño aguanta el cambio de color.
3. Los **tokens**: colores en hex, tipografías, radios y sombras.
4. Por cada sección: el **nombre del componente**, los **campos** que usa y cómo se comporta cuando falta algo opcional (un servicio sin imagen, una reseña muy larga, la falta de WhatsApp).
5. La lista de **componentes shadcn** que hayas usado.
6. Un **nombre y una frase** que definan el concepto del diseño. Habrá tres templates por nicho y cada uno necesita una identidad propia, no genérica.

---

## 8. Encargo actual: jardinería (`jardineria-1`)

**Clientes del jardinero:** propietarios de chalets y adosados, y comunidades de vecinos con zonas verdes, en municipios de la provincia de Valencia.

**Tono:** cercano, fiable, de trabajo bien hecho. Nada corporativo. Debe transmitir puntualidad, presupuesto sin compromiso y que trabaja cerca.

**Datos de ejemplo** (ficticios):

```ts
export default defineSiteConfig({
  negocio: {
    nombre: "Jardines Ejemplo",
    nombreLegal: "Jardines Ejemplo SL",
    nif: "B12345678",
    sector: "Jardinería y mantenimiento de jardines",
    descripcionCorta:
      "Mantenimiento, poda y diseño de jardines en la Ribera. Presupuesto sin compromiso.",
  },
  contacto: {
    telefono: "+34600000000",
    whatsapp: "+34600000000",
    email: "info@ejemplo.com",
    direccion: { calle: "Calle Mayor 1", cp: "46460", ciudad: "Silla", provincia: "Valencia" },
    horario: [
      { dias: "Lunes a viernes", horas: "8:00–18:00" },
      { dias: "Sábados", horas: "9:00–13:00" },
    ],
  },
  zonas: ["Silla", "Almussafes", "Sollana", "Benifaió", "Alginet", "Picassent"],
  servicios: [
    { titulo: "Mantenimiento de jardines", descripcion: "Visitas periódicas: corte de césped, recorte de setos y limpieza.", imagen: "/ejemplo/servicio-1.jpg" },
    { titulo: "Poda y tala", descripcion: "Poda de árboles, palmeras y setos con retirada de restos.", imagen: "/ejemplo/servicio-2.jpg" },
    { titulo: "Diseño de jardines", descripcion: "Proyectamos e instalamos tu jardín desde cero." },
    { titulo: "Césped natural y artificial", descripcion: "Instalación y renovación de césped." },
    { titulo: "Riego automático", descripcion: "Instalación y reparación de sistemas de riego por goteo y aspersión." },
    { titulo: "Desbroce de parcelas", descripcion: "Limpieza de parcelas y solares con retirada de residuos." },
  ],
  resenas: [
    { autor: "María L.", texto: "Puntuales y muy limpios. El jardín ha quedado como nuevo.", puntuacion: 5 },
    { autor: "Comunidad Residencial Los Pinos", texto: "Llevan el mantenimiento de nuestras zonas verdes desde hace dos años. Siempre responden rápido y el trato es excelente; lo recomendamos a cualquier comunidad.", puntuacion: 5 },
    { autor: "José R.", texto: "Buen precio en la poda de las palmeras.", puntuacion: 4 },
  ],
  galeria: [
    { src: "/ejemplo/galeria-1.jpg", alt: "Jardín de chalet con césped recién cortado", titulo: "Mantenimiento en Almussafes" },
    { src: "/ejemplo/galeria-2.jpg", alt: "Setos recortados en una comunidad de vecinos" },
    { src: "/ejemplo/galeria-3.jpg", alt: "Instalación de riego por goteo en un huerto" },
    { src: "/ejemplo/galeria-4.jpg", alt: "Parcela desbrozada lista para construir" },
  ],
  preguntas: [
    { pregunta: "¿El presupuesto tiene coste?", respuesta: "No. Vamos a ver el jardín y te damos un presupuesto sin compromiso." },
    { pregunta: "¿Trabajáis con comunidades de vecinos?", respuesta: "Sí, hacemos contratos de mantenimiento periódico para comunidades." },
    { pregunta: "¿Os lleváis los restos de poda?", respuesta: "Sí, la retirada de restos vegetales está incluida." },
    { pregunta: "¿Cada cuánto conviene el mantenimiento?", respuesta: "Depende del jardín; lo habitual es cada dos o cuatro semanas." },
  ],
  marca: { colorPrimario: "#2f6b3a" },
  seo: {
    titulo: "Jardinero en Silla y la Ribera | Jardines Ejemplo",
    descripcion: "Mantenimiento, poda y diseño de jardines. Presupuesto sin compromiso.",
    url: "https://ejemplo.com",
  },
  redes: { instagram: "https://instagram.com/ejemplo" },
});
```
