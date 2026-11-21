---
"@andrei-leads/core": minor
---

Dos campos opcionales nuevos en el contrato (una web que no los use no cambia):

- **`videoPano?`:** `{ src, srcAv1?, poster }`, con la misma forma que `videoHero` y el póster obligatorio. Es el vídeo de la sección «pano», la que crece a pantalla completa con el scroll, aparte del vídeo del hero. No entra en Open Graph. Tipo `Video`, igual a `VideoHero`.
- **`proceso[].imagen?`:** una foto por paso de «Cómo trabajamos». `Paso` lleva `imagen?`, y `pasosProceso` la devuelve tal cual. Los pasos por defecto no llevan foto.
