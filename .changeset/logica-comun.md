---
"@andrei-leads/core": minor
---

Lógica común de los templates en core (todo nuevo, nada cambia en lo que ya existía):

- **Formato:** `telefonoVisible`, `listaY`, `mediaVisible`, `direccionLinea` (con `{ provincia: true }` opcional), `urlComoLlegar`, `listaRedes`, `horarioVisible` (fila de urgencias con texto opcional), `iniciales`, `minusculaInicial`, `MESES`, `fechaResena` y `precioDesde`. Tipo `Ancla`.
- **Mensajes de WhatsApp:** `MENSAJE_GENERICO`, `MENSAJE_NO_ENCONTRADA`, `mensajeGeneral`, `mensajeServicio` y `mensajeTrabajo`. Cada uno acepta el texto por defecto del template.
- **Rutas y contenido:** `hayTrabajos`, `parametrosServicios` y `parametrosTrabajos` (con el slug de relleno `"_"`, `SLUG_RELLENO`), `buscarServicio`, `buscarTrabajo`, `otrosServicios`, `trabajosDelServicio`, `otrosTrabajos`, `servicioDelTrabajo`, `PASOS_POR_DEFECTO` (urgencias, proyecto y obra técnica) y `pasosProceso`. Tipos `Paso` y `TipoNegocio`.

Una web que no los use no cambia. Para usarlos: importarlos de `@andrei-leads/core` y borrar la copia de `lib/`.
