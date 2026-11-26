# Registro de piezas base

Piezas de diseño compartidas por los templates. **Se copian, no se importan**: una web entregada no cambia cuando se mejora una pieza aquí.

- Para un niño de 12 años: core es una pieza de Lego pegada; el registro es un molde. Te haces tu copia, la pintas como quieras y, si mañana mejoran el molde, tu pieza no cambia sola.

## Qué hay

| Archivo | Qué es | JS en el navegador |
|---|---|---|
| `base/Foto.tsx` | `next/image` con proporción fija y la etiqueta de `imagen.origen` (desde core 0.8.0 `etiquetaOrigen` no devuelve ninguna) | No |
| `base/MedioHero.tsx` | Vídeo en bucle con póster (`config.videoHero`) o foto (`imagenesHero[0]`). Con «reducir movimiento», solo el póster | No |
| `base/AntesDespues.tsx` + `base/DeslizadorAntesDespues.tsx` | Antes y después. Sin JS, en fila; con JS, superpuestas ya en el HTML (`@media (scripting: enabled)`, sin salto al hidratar) con un `<input type="range">`. `preload` para cuando la foto de «después» es el LCP | Sí, una isla pequeña |
| `base/Preguntas.tsx` | Preguntas con `<details name>` (sustituye al `accordion` de shadcn) | No |
| `base/MenuPopover.tsx` | Menú móvil con la API `popover` (sustituye al `sheet` de shadcn) | No |
| `base/BarraMovil.tsx` | Barra fija en móvil: `dos` (Llamar \| WhatsApp, o al revés con `primero="whatsapp"`) o `combinada` (Menú \| Llamar \| WhatsApp, solo urgencias) | No |
| `base/Migas.tsx` | Migas de pan con `aria-current="page"` | No |
| `base/aparecer.css` | Aparición al hacer scroll solo con CSS (`data-aparecer`). Nunca en el h1, la foto del hero ni el botón de llamada | No |
| `lib/utils.ts` | `cn` con los tokens comunes declarados (sin esto, `cn("text-display text-texto")` borra `text-display`) | — |

## Reglas

- Solo usan los **16 tokens comunes**: `--color-fondo`, `--color-superficie`, `--color-alterna`, `--color-texto`, `--color-texto-suave`, `--color-borde`, `--color-primario`, `--color-sobre-primario`, `--color-acento`, `--color-foco`, `--font-titulo`, `--font-texto`, `--radius-boton`, `--radius-tarjeta`, `--radius-foto`, `--text-display`. El template les da valor en `@theme`.
- Sin JavaScript, todo se ve y funciona.
- En los archivos `"use client"`, `clsx` y no `cn()`: `cn` mete tailwind-merge (~9 KB gzip) en el navegador. `cn` solo en componentes de servidor.
- La lógica sale de `@andrei-leads/core` (`etiquetaOrigen`, `telefonoVisible`, `BotonLlamada`, `BotonWhatsApp`…). Aquí solo hay diseño.

## Cómo se usan en un template (a mano, la primera vez)

Desde la carpeta del template (comando de terminal):

```bash
mkdir -p components/base
cp ../../../registry/base/* components/base/
cp ../../../registry/lib/utils.ts lib/utils.ts
```

Y en `app/globals.css` (contenido del archivo):

```css
@import "../components/base/aparecer.css";
```

Después, cada pieza es del template: se puede reestilar o sustituir.

## Banco de pruebas

`apps/playground` copia el registro en cada `dev`, `build` y `lint` (`pnpm copiar-registro`) y pinta todas las piezas con valores neutros de los tokens. Desde la raíz del repo: `pnpm --filter playground dev`.
