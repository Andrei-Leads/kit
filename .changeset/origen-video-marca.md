---
"@andrei-leads/core": minor
---

Novedades del contrato y de marca (todo opcional; una web que no las use no cambia):

- **`origen?` en toda imagen:** `"cliente"`, `"ficha-google"`, `"ia"` o `"stock"`. `etiquetaOrigen(imagen)` devuelve la etiqueta que hay que pintar: «Imagen generada con IA» (AI Act, art. 50.4) o «Foto de tu ficha de Google». Tipo `OrigenImagen`.
- **`videoHero?`:** `{ src, srcAv1?, poster }`, con el póster obligatorio. Solo tipo proyecto. El póster entra como imagen de Open Graph después de `imagenesHero[0]`. Tipo `VideoHero`.
- **`--color-sobre-primario`:** `estiloMarca(config)` devuelve el `style` del `<html>`, con `--color-primario` y el texto que va encima (blanco o `#111111`, el que más contraste dé). Si ninguno llega a 4,5:1, `defineSiteConfig` avisa en la consola sin romper el build. `styles.css` pone `--color-sobre-primario: #ffffff` por defecto. Funciones `colorSobre` y `contraste`.

Para usar el color calculado: en `app/layout.tsx`, `<html lang="es" style={estiloMarca(config)}>`, y en el CSS, el texto sobre el primario con `text-sobre-primario`.
