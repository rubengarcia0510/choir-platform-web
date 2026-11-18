# CHOIR-129 — Validación responsive y consistencia visual

Estado: inspección visual inicial realizada sobre seis pantallas mediante capturas del navegador en la ventana utilizada durante la revisión. No se detectaron defectos visuales concluyentes en esas capturas. La comprobación en otros tamaños y los estados que requieren datos reales siguen pendientes.

## 1. Alcance revisado

Archivos inspeccionados:

- `src/app/app.routes.ts`
- `src/app/app.html`
- `src/app/app.ts`
- `src/app/pages.ts`
- `src/app/auth/login.page.ts`
- `src/app/pages.scss`
- `src/app/formations/formation-stage.component.html`
- `src/app/formations/formation-stage.component.scss`
- `src/styles.scss`
- `docs/design-system.md`
- `docs/design-discovery.md`

La revisión combina inspección estática y capturas aportadas desde el navegador. Las observaciones describen únicamente los estados visibles; no se extrapolan a tamaños o estados no probados.

## 2. Viewports de referencia

| Perfil | Dimensiones CSS | Estado |
|---|---:|---|
| Escritorio | 1440 × 900 | No probado específicamente |
| Tablet horizontal | 1024 × 768 | Pendiente |
| Tablet vertical | 768 × 1024 | Pendiente |
| Móvil habitual | 390 × 844 | Pendiente |
| Móvil angosto | 320 × 800 | Pendiente |

La inspección visual se realizó en la ventana normal del navegador, sin forzar dimensiones adicionales. No se asigna esa evidencia a ninguno de los tamaños de referencia.

Breakpoints globales: 850 px y 560 px. El escenario tiene un ajuste propio a 560 px.

## 3. Inventario de pantallas

| Ruta | Pantalla | Estado observado | Resultado |
|---|---|---|---|
| `/` | Inicio | Implementada | Captura revisada; sin overflow horizontal ni solapamientos evidentes |
| `/ingresar` | Ingresar | Formulario funcional | Captura revisada; formulario centrado y alineado |
| `/registro` | Registro | Placeholder informativo | Captura revisada; composición de dos columnas |
| `/registro/verificar` | Verificación | Error por ausencia de token | Captura revisada; mensaje y acción de retorno visibles |
| `/app/coro` | Mi coro | Gestión implementada, estado vacío | Captura revisada; sin overflow horizontal evidente |
| `/app/conciertos` | Conciertos | Placeholder | No evaluado como módulo funcional |
| `/app/formaciones` | Formaciones | Editor parcial | No validado operativamente por falta de datos reales |
| `**` | No encontrado | Página 404 implementada | Captura revisada; mensaje 404 y retorno al inicio visibles |

No se deben inventar datos ni estados para Conciertos o Formaciones. Sin conciertos, integrantes y formaciones reales no se puede certificar el flujo operativo de Formaciones.

## 4. Riesgos de la revisión estática

No son defectos confirmados.

| ID | Área | Observación | Comprobación requerida |
|---|---|---|---|
| RSP-01 | Navegación | Hasta 850 px usa `overflow-x: auto`. | Verificar visibilidad y desplazamiento en tamaños reducidos. |
| RSP-02 | Inicio | El hero cambia a una columna en 850 px; las tarjetas pasan a dos y luego una columna. | Comprobar orden, altura, ilustración y acciones. |
| RSP-03 | Mi coro | Formulario y listado pasan a una columna en 850 px. | Revisar campos, textos largos y acciones con datos disponibles. |
| RSP-04 | Formaciones | Escenario y elenco pasan a una columna. Tarjetas de integrantes de 86 px y 70 px en móvil. | Revisar superposición, recortes y distribución cuando haya datos reales. |
| RSP-05 | Formaciones | Controles contextuales de 28 px y acciones del elenco con padding reducido. | Comprobar interacción y presentación en móvil. |
| RSP-06 | Footer | Cambia a varias líneas hasta 560 px. | Verificar solapamientos y overflow en móvil. |
| RSP-07 | Ancho mínimo | `html` y `body` declaran `min-width: 320px`. | Comprobar a 320 px; no afirmar soporte por debajo. |

## 5. Matriz de resultados

La columna de inspección visual resume las capturas revisadas en la ventana normal del navegador. Los tamaños de referencia no se probaron individualmente.

| Pantalla | Captura revisada | 1024 × 768 | 768 × 1024 | 390 × 844 | 320 × 800 |
|---|---|---|---|---|---|
| Inicio | Sí; sin defecto concluyente | Pendiente | Pendiente | Pendiente | Pendiente |
| Ingresar | Sí; sin defecto concluyente | Pendiente | Pendiente | Pendiente | Pendiente |
| Registro | Sí; sin defecto concluyente | Pendiente | Pendiente | Pendiente | Pendiente |
| Mi coro | Sí; sin defecto concluyente | Pendiente | Pendiente | Pendiente | Pendiente |
| Conciertos | Placeholder; no evaluado funcionalmente | No aplica | No aplica | No aplica | No aplica |
| Formaciones | No validada por falta de datos reales | Pendiente | Pendiente | Pendiente | Pendiente |
| Verificación | Sí; estado de error sin defecto concluyente | Pendiente | Pendiente | Pendiente | Pendiente |
| No encontrado | Sí; sin defecto concluyente | Pendiente | Pendiente | Pendiente | Pendiente |

## 6. Evidencia visual

### Inicio (`/`)

- Evidencia: fotografía de la aplicación en navegador.
- Observaciones: hero en dos columnas; texto y acciones a la izquierda e ilustración a la derecha. No se aprecia overflow horizontal ni solapamiento. Título y acciones mantienen jerarquía visual legible. Hay espacio vertical amplio entre navegación y contenido, sin evidencia suficiente para clasificarlo como defecto.
- Resultado: revisión visual parcial; sin defecto concluyente en el estado capturado.

### Mi coro (`/app/coro`)

- Evidencia: fotografía aportada durante la validación.
- Observaciones: navegación, encabezado y contenido en dos columnas; estado vacío «Todavía no hay coros». No se aprecia overflow horizontal evidente. La definición y perspectiva no permiten evaluar con precisión espaciados ni tamaños.
- Resultado: revisión visual parcial del estado vacío; sin defecto concluyente.

### Ingresar (`/ingresar`)

- Evidencia: fotografía de la aplicación en navegador.
- Observaciones: formulario centrado, título destacado, campos de correo y contraseña alineados y botón a ancho completo. No se aprecia overflow horizontal. El botón aparece atenuado con los campos vacíos.
- Resultado: revisión visual parcial; sin defecto concluyente en el estado capturado.

### Registro (`/registro`)

- Evidencia: fotografía de la aplicación en navegador.
- Observaciones: panel oscuro de identidad visual a la izquierda y formulario a la derecha. Se distinguen nombre, correo, contraseña, indicación de mínimo 12 caracteres, botón «Crear cuenta» y enlace para usuarios existentes. No se aprecia solapamiento ni overflow horizontal evidente.
- Resultado: revisión visual parcial; sin defecto concluyente.

### Verificación (`/registro/verificar`)

- Evidencia: fotografía de la aplicación en navegador.
- Estado observado: error por ausencia de token.
- Observaciones: mensaje «No pudimos verificar tu correo», explicación sobre el enlace sin token y botón «Ir a ingresar». Contenido centrado; no se aprecia overflow horizontal.
- Resultado: revisión visual parcial del estado de error. No valida el flujo exitoso.

### No encontrado (ruta inexistente)

- Evidencia: fotografía de `/ruta-inexistente`.
- Estado observado: página 404.
- Observaciones: mensaje «Esta página no existe», identificación del error 404 y botón «Ir al inicio». Se conserva navegación y pie de página. No se aprecia overflow horizontal ni solapamiento.
- Resultado: revisión visual parcial; sin defecto concluyente.

### Evidencia técnica complementaria — modelo de caja

- Evidencia: captura del panel Box Model de DevTools.
- Elemento seleccionado: contenido de 1180 × 407,083 px.
- Padding: 28 px superior y 86 px inferior.
- Border: 0 px.
- Margin: 30 px izquierdo y derecho; 0 px superior e inferior.
- Alcance: medidas del elemento seleccionado, no del viewport completo.
- Resultado: evidencia complementaria sobre dimensiones y espaciado; no constituye por sí sola una validación responsive.

## 7. Comprobaciones pendientes

- Comprobaciones específicas en tablet horizontal, tablet vertical, móvil habitual y móvil angosto.
- Revisión operativa de Formaciones cuando existan datos reales de coro, concierto, integrantes y formación.
- Conciertos no se evalúa como módulo funcional mientras siga siendo un placeholder.
- Registrar nuevos hallazgos con pantalla, condición observada, severidad y recomendación. No abrir correcciones por riesgos estáticos no confirmados.

## 8. Límites

- No se modificó CSS ni comportamiento; este entregable documenta la auditoría.
- No se auditó semántica, lector de pantalla ni conformidad WCAG.
- Las capturas permiten revisar los estados visibles, pero no certifican responsive en tamaños distintos.
- No se afirma que el producto completo sea responsive a partir de esta inspección parcial.
- Rediseños y cambios funcionales se derivarán a tickets separados.

## 9. Aclaración de evidencia de viewport

La captura compartida durante la revisión registra una ventana de 1240 × 262 px. Esta medida se conserva como referencia de la evidencia visual recibida y no debe confundirse con las dimensiones del elemento inspeccionado en DevTools (1180 × 407,083 px).

No se solicitarán nuevas mediciones de configuración del navegador para repetir esta evidencia.

