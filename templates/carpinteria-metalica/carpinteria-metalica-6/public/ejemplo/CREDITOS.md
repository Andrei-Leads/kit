# Fotos de ejemplo de «Fachada nueva» (carpinteria-metalica-6)

**Estado (24/11/2026):** 14 fotos ya son de IA (ChatGPT; prompts en `docs/fotos-ejemplo/carpinteria-metalica-6/prompts-chatgpt.md`). Siguen de relleno gris `fachada-03-antes.jpg` y `fachada-05.jpg`, **pendientes de la foto generada con IA** según la ficha de estilo fotográfico del encargo (§10) y la entrega de Claude Design (§7). Foto ancla: `fachada-01-despues.jpg`. Cada «antes» se genera **a partir de su después** (inpainting solo en carpinterías, persianas y cierros), con la misma semilla, luz y encuadre. En `site.config.ts` todas llevan `origen: "ia"` (etiqueta «Imagen generada con IA»).

Al sustituirlas: mismo nombre, JPG calidad ~82, recortado a la proporción indicada, lado largo ≤ 1600 px (docs/nuevo-template.md, paso 9). Origen: «Generada con IA (ChatGPT, OpenAI)». Las fotos de fachada se recortan también a 4:3 en pantalla (ficha del trabajo): deja aire alrededor.

El servicio «Cerramientos de azotea» no lleva foto a propósito: prueba la tarjeta sin foto (icono de ventana).

| Archivo | Qué muestra (prompt tras el base) | Proporción | Dónde | Estado |
|---|---|---|---|---|
| `fachada-01-despues.jpg` | Bloque de cuatro alturas de ladrillo visto y revoco de los años 70 en Dos Hermanas, doce ventanas nuevas de PVC blanco con persianas térmicas grises, macetas en dos balcones, un toldo verde | 4:5 | Hero (antes/después) y trabajo «Ventanas de un bloque en Dos Hermanas» | IA (ChatGPT) |
| `fachada-01-antes.jpg` | La misma imagen: ventanas de aluminio blanco amarillento, persianas de lamas con lamas rotas y una torcida, dos aparatos de aire acondicionado, algo de suciedad real en los alféizares | 4:5 | Hero (antes/después) y trabajo «Ventanas de un bloque en Dos Hermanas» | IA (ChatGPT) |
| `fachada-02-despues.jpg` | Primer piso de ladrillo en Nervión, cierro de balcón nuevo de aluminio blanco con vidrio, macetas detrás | 4:5 | Trabajo «Cierro nuevo en Nervión» | IA (ChatGPT) |
| `fachada-02-antes.jpg` | La misma imagen: cierro de hierro con óxido en la base y un cristal rayado | 4:5 | Trabajo «Cierro nuevo en Nervión» | IA (ChatGPT) |
| `fachada-03-despues.jpg` | Casa encalada de dos plantas en Mairena del Aljarafe, nueve ventanas de PVC gris antracita con persianas a juego | 4:5 | Trabajo «Casa en Mairena del Aljarafe» | IA (ChatGPT) |
| `fachada-03-antes.jpg` | La misma imagen: ventanas de aluminio anodizado bronce y persianas de PVC descoloridas | 4:5 | Trabajo «Casa en Mairena del Aljarafe» | Relleno |
| `fachada-04-despues.jpg` | Fachada de un piso en Alcalá de Guadaíra, cinco persianas nuevas de aluminio térmico gris a media altura | 4:5 | Trabajo «Persianas en Alcalá de Guadaíra» | IA (ChatGPT) |
| `fachada-04-antes.jpg` | La misma imagen: persianas de lamas rotas, una caída del todo | 4:5 | Trabajo «Persianas en Alcalá de Guadaíra» | IA (ChatGPT) |
| `fachada-05.jpg` | Azotea de un adosado en Tomares cerrada con aluminio blanco y vidrio, vista desde la calle | 4:5 | Trabajo «Azotea cerrada en Tomares» (sin antes) | Relleno |
| `servicio-cambio-ventanas.jpg` | Plano medio de una ventana nueva de PVC blanco en ladrillo visto, desde la calle | 4:3 | Tarjeta y ficha de su servicio | IA (ChatGPT) |
| `servicio-cierros.jpg` | Cierro de balcón de aluminio blanco en un primer piso, macetas tras el cristal | 4:3 | Tarjeta y ficha de su servicio | IA (ChatGPT) |
| `servicio-persianas.jpg` | Tres persianas térmicas grises a medio bajar en una fachada al sol | 4:3 | Tarjeta y ficha de su servicio | IA (ChatGPT) |
| `servicio-comunidad.jpg` | Bloque de cinco alturas con todas las ventanas blancas iguales | 4:3 | Tarjeta y ficha de su servicio | IA (ChatGPT) |
| `servicio-portal.jpg` | Puerta de portal de aluminio negro y vidrio, sin número ni rótulo | 4:3 | Tarjeta y ficha de su servicio | IA (ChatGPT) |
| `taller-nave.jpg` | Nave de taller con perfiles de aluminio en estanterías, mesa de corte con virutas, luz de lucernario, sin personas | 3:2 | `/empresa` | IA (ChatGPT) |
| `taller-furgoneta.jpg` | Furgoneta blanca sin rotular, de espaldas, con perfiles en la baca, en una calle de polígono | 3:2 | `/empresa` | IA (ChatGPT) |

## Prompt base

*Fotografía documental de una fachada residencial andaluza, tomada desde la acera de enfrente con un 35 mm a la altura de los ojos y una ligera contrapicada natural. Media mañana con cielo despejado, sol en diagonal y sombras suaves de los balcones. Color natural y luminoso, blancos cálidos de cal, cielo azul limpio poco saturado. Fachada centrada con aire alrededor para recortar a 4:3 y a 4:5. Sin personas reconocibles, matrículas, rótulos ni números de portal legibles. Sin hora dorada ni cielo dramático. Hiperrealista, sin filtros.*

Prohibido (encargo §10 y entrega): personas reconocibles, matrículas, rótulos o números de portal legibles, hora dorada o cielo dramático, el reflejo del fotógrafo en el vidrio y arquitectura de fuera de España.

Los `alt` de la entrega están ya en `site.config.ts` (algunos ampliados con el material o la ubicación).
