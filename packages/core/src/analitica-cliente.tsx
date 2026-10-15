"use client";

/*
 * Parte de cliente de <Analitica />. Solo se monta con `analitica.vercel: true`.
 *
 * - Carga diferida: `@vercel/analytics` se importa con `import()` dentro del
 *   efecto, así que el bundler lo saca a un chunk aparte que el navegador solo
 *   descarga cuando este componente se monta. Con `vercel: false` no se baja
 *   nada de la librería. Se usa `inject()` (lo mismo que hace por dentro el
 *   <Analytics /> de `/react`) porque no pinta nada: no hace falta lazy +
 *   Suspense. Sin `next/dynamic`: core no depende de `next`.
 * - `inject()` carga el script de Vercel desde la propia web y cuenta las
 *   visitas, también las navegaciones sin recarga. Sin cookies ni nada
 *   guardado en el navegador.
 * - Clics de contacto sin tocar los botones: un único listener en `document`
 *   (fase de captura) que, ante un clic en un enlace `tel:` o `wa.me`, envía
 *   `phone_click` o `whatsapp_click` con la ruta (`path`). Máximo 2
 *   propiedades por evento (límite de Vercel Pro). En Hobby, Vercel ignora los
 *   eventos propios sin error.
 */
import { useEffect } from "react";

// Solo para los tipos (core no instala @types/node). El bundler sustituye
// `process.env.*` por su valor al compilar.
declare const process: { env: Record<string, string | undefined> };

function eventoDeContacto(href: string) {
  if (href.startsWith("tel:")) return "phone_click";
  if (href.includes("wa.me")) return "whatsapp_click";
  return null;
}

export function MedicionCliente() {
  useEffect(() => {
    let montado = true;
    const libreria = import("@vercel/analytics");

    libreria.then(({ inject }) => {
      if (!montado) return;
      inject(
        {
          framework: "react",
          // En un build de Vercel, estas variables traen la ruta propia del
          // script (Resilient Intake de la v2). Sin ellas (en local), se usa
          // /_vercel/insights/script.js.
          basePath: process.env.NEXT_PUBLIC_VERCEL_OBSERVABILITY_BASEPATH,
        },
        process.env.NEXT_PUBLIC_VERCEL_OBSERVABILITY_CLIENT_CONFIG
      );
    });

    function alHacerClic(e: MouseEvent) {
      if (!(e.target instanceof Element)) return;
      // El clic suele caer en un icono o un <span> dentro del enlace.
      const enlace = e.target.closest("a");
      const evento = eventoDeContacto(enlace?.getAttribute("href") ?? "");
      if (!evento) return;
      // La ruta se lee ya, antes de que el enlace cambie de página.
      const path = location.pathname;
      libreria.then(({ track }) => track(evento, { path }));
    }
    document.addEventListener("click", alHacerClic, true);

    return () => {
      montado = false;
      document.removeEventListener("click", alHacerClic, true);
    };
  }, []);

  return null;
}
