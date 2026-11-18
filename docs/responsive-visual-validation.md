# CHOIR-129 — Validación responsive y consistencia visual

> **Actualización 18/11/2026 (secciones 10 a 16).** Se agregó medición en Chromium emulado sobre la compilación de `9605292`, en los cinco viewports de referencia y ocho rutas. Las secciones 1 a 9 conservan la evidencia original; donde una afirmación quedó superada se indica con una nota.

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

> **Nota 18/11/2026:** la ruta `/registro` carga `register.page` (formulario con nombre, correo y contraseña, integrado en #34). La fila «Placeholder informativo» refleja el estado anterior; la evidencia de la sección 6 corresponde al formulario.

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

> **Nota 18/11/2026:** las celdas «Pendiente» corresponden a la evidencia original. Los resultados por viewport están en la sección 11.

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

> **Nota 18/11/2026:** el estado vigente de lo pendiente está en la sección 15.

## 8. Límites

- No se modificó CSS ni comportamiento; este entregable documenta la auditoría.
- No se auditó semántica, lector de pantalla ni conformidad WCAG.
- Las capturas permiten revisar los estados visibles, pero no certifican responsive en tamaños distintos.
- No se afirma que el producto completo sea responsive a partir de esta inspección parcial.
- Rediseños y cambios funcionales se derivarán a tickets separados.

## 9. Aclaración de evidencia de viewport

La captura compartida durante la revisión registra una ventana de 1240 × 262 px. Esta medida se conserva como referencia de la evidencia visual recibida y no debe confundirse con las dimensiones del elemento inspeccionado en DevTools (1180 × 407,083 px).

No se solicitarán nuevas mediciones de configuración del navegador para repetir esta evidencia.

## 10. Actualización de la validación (18/11/2026)

### 10.1 Estados de resultado

| Estado | Significado |
|---|---|
| Verificado (emulado) | Medido en Chromium headless con viewport emulado y datos simulados. |
| Verificado (dispositivo real) | Evidencia aportada desde un dispositivo físico. Todavía no hay ninguna. |
| Pendiente | No hay evidencia. |
| No aplica | La pantalla es un placeholder o no corresponde evaluarla. |
| No verificable | No puede comprobarse sin datos o estados reales. |

### 10.2 Método y límites

- Compilación: `ng build` de `124-integradora` en `9605292`, sin cambios de código.
- Navegador: Chromium headless (HeadlessChrome 153), controlado con un script externo al repositorio. No se agregó al proyecto, no se incorporaron dependencias y no se modificó `scripts/accessibility-audit.mjs`.
- Viewports: 1440 × 900 sin emulación móvil; 1024 × 768, 768 × 1024, 390 × 844 y 320 × 800 con emulación móvil y táctil. Factor de pixel 1.
- Datos simulados: las rutas públicas sin sesión (401 en `/api/auth/me`); las rutas `/app/*` con un director sintético y respuestas vacías para coros, conciertos e integrantes. No se crearon coros, conciertos, integrantes ni formaciones.
- Mediciones por ruta y viewport: ancho de desplazamiento del documento frente al ancho del viewport; elementos visibles fuera del viewport que no estén dentro de un contenedor con desplazamiento; solapamiento entre hijos directos de `header.topbar` y `footer.footer`; tamaño de los controles interactivos visibles; desplazamiento de `.main-nav`; capturas de página completa.
- Límites: no es un dispositivo real; no cubre otros navegadores, lectores de pantalla, ampliación de texto ni conformidad WCAG. El reflow a 320 px se verifica solo con el viewport de 320 px.

## 11. Resultados por viewport

### 11.1 Matriz (verificado, emulado)

| Pantalla | 1440 × 900 | 1024 × 768 | 768 × 1024 | 390 × 844 | 320 × 800 |
|---|---|---|---|---|---|
| Inicio | OK | OK | OK | OK | OK |
| Ingresar | OK | OK | OK | OK | OK |
| Registro (formulario) | OK | OK | OK | OK | OK |
| Verificación (sin token) | OK | OK | OK | OK | OK |
| No encontrado | OK | OK | OK | OK | OK |
| Mi coro (estado vacío) | OK | OK | OK | OK | OK |
| Conciertos (placeholder) | OK, solo overflow | OK, solo overflow | OK, solo overflow | OK, solo overflow | OK, solo overflow |
| Formaciones (director sin coros) | OK, solo layout | OK, solo layout | OK, solo layout | OK, solo layout | OK, solo layout |

OK significa: ancho de desplazamiento igual al del viewport (diferencia de 0 px), 0 elementos fuera del viewport, 0 solapamientos en cabecera y pie, y ruta final igual a la solicitada. Conciertos y Formaciones no se evalúan como módulos funcionales.

### 11.2 Resultado agregado

- 40 combinaciones (8 rutas × 5 viewports): 0 con overflow horizontal, 0 elementos fuera del viewport y 0 solapamientos.
- No se detectaron controles fuera del viewport en los viewports medidos. No se midieron controles recortados por contenedores con desplazamiento.

### 11.3 Riesgos estáticos de la sección 4

| ID | Estado | Resultado |
|---|---|---|
| RSP-01 | Verificado (emulado) | `.main-nav` conserva `overflow-x: auto`, pero con tres enlaces no desborda a 768, 390 ni 320 px (anchos de desplazamiento y visible iguales: 720, 358 y 288 px). Con más enlaces no se evaluó. |
| RSP-02 | Verificado (emulado) | Inicio: hero en dos columnas a 1440 y 1024 px, y en una columna a 768, 390 y 320 px. Ilustración y acciones visibles. |
| RSP-03 | Verificado en parte | Mi coro pasa a una columna a 768 px o menos. Solo con estado vacío; textos largos y acciones con datos siguen pendientes. |
| RSP-04 | No verificable | Requiere formación e integrantes reales. |
| RSP-05 | No verificable | Requiere formación e integrantes reales. |
| RSP-06 | Verificado (emulado) | El pie se reparte en varias líneas a 390 y 320 px sin solapamientos medidos. |
| RSP-07 | Verificado (emulado) | A 320 px no hay overflow en las ocho rutas. No se afirma soporte por debajo. |

## 12. Evidencia visual (emulada)

Capturas en `docs/assets/choir-129/`. Las hojas de contacto muestran los primeros 1200 px de cada pantalla.

- Escritorio: `1440x900-inicio.png`, `1440x900-registro.png`, `1440x900-mi-coro.png`, `1440x900-formaciones-sin-coros.png`.
- Tablet horizontal: `1024x768-inicio-mi-coro.png`.
- Tablet vertical: `768x1024-inicio-registro-mi-coro.png`.
- Móvil habitual: `390x844-inicio-ingresar-registro-mi-coro.png` y `390x844-verificar-404-formaciones-conciertos.png`.
- Móvil angosto: `320x800-inicio-ingresar-registro-mi-coro.png`.

Los datos son simulados: la sesión es sintética («Director simulado») y las listas están vacías.

## 13. Comparación con el sistema de diseño

Referencia: `docs/design-system.md`, sección 8. Este documento es una propuesta inicial de diseño, no un sistema aprobado ni una especificación normativa de los estilos actuales. La comparación siguiente registra observaciones visuales respecto de esa propuesta; no certifica conformidad con un sistema de diseño aprobado.

| Aspecto | Resultado |
|---|---|
| Escritorio | Registro usa panel artístico y tarjeta operativa; el resto usa el fondo y las superficies operativas. Sin desviaciones observadas. |
| Tablet | Los paneles se reorganizan sin perder jerarquía (Inicio y Mi coro a 768 px). Sin desviaciones observadas. |
| Móvil | Lectura vertical, botones de ancho completo en Inicio, Ingresar, Registro y Verificación. Ver RV-03 para los controles pequeños. |
| Paneles | Espaciado de 18 px entre paneles, salvo en Formaciones sin coros (RV-02). |
| Marca | El texto «CHOIR.» de la barra superior no usa el color de texto principal (RV-01). |
| Botones y campos | Los patrones compartidos están aplicados en las pantallas revisadas. No se midieron todos sus estados. |
| Tipografía y contraste | No se midieron en esta validación. |

## 14. Hallazgos priorizados

| ID | Prioridad | Pantalla y viewport | Condición reproducible | Recomendación |
|---|---|---|---|---|
| RV-01 | P2 | Todas las pantallas con barra superior, en todos los viewports | El enlace `.brand` toma el color predeterminado de enlace (`rgb(0, 0, 238)`) en vez del color de texto principal `#252B25`; el punto sí usa el verde. | Ticket de ajuste visual del shell. Definir el color de la marca con tokens. |
| RV-02 | P3 | Formaciones con director sin coros, en los cinco viewports | `.empty-state` y `.formation-panel` quedan pegados (0 px de separación; el resto de los paneles usa 18 px). A 1440 px miden 750 y 766 px de ancho. | Ticket de ajuste de espaciado en Formaciones. |
| RV-03 | P3, observación | Navegación, «← Volver al inicio» y enlaces de texto, en todos los viewports | Los enlaces de navegación miden entre 15 y 17 px de alto y el enlace de retorno 15 px. WCAG 2.2 (2.5.8) puede cumplirse por la excepción de espaciado, que no se evaluó. | Evaluar la excepción y, si no aplica, ampliar el área táctil. No es un defecto confirmado. |

Notas:

- RV-01 y RV-02 son reproducibles con la compilación de `9605292`. Una captura anterior en Android, tomada en otra rama, mostraba el mismo texto con color de enlace visitado.
- Informativo: sumando las ocho rutas, entre 38 y 39 de 63 o 64 controles interactivos miden menos de 44 px en alguno de sus lados, según el viewport. El sistema de diseño no fija ese valor.
- Los hallazgos se derivan a tickets separados; esta tarea no modifica código.

## 15. Estado de lo pendiente

| Elemento | Estado |
|---|---|
| Verificación en dispositivo real (Android) | Pendiente |
| Formaciones con coro, concierto, integrantes y formación reales | No verificable |
| Mi coro con coros cargados (textos largos, acciones) | No verificable |
| Conciertos como módulo funcional | No aplica (placeholder) |
| Verificación de correo con token válido | No verificable |
| Navegación con más de tres enlaces | Pendiente |
| Ampliación de texto y zoom del navegador | Pendiente |
| Firefox y Safari | Pendiente |
| Lector de pantalla | No aplica a esta tarea |
| Contraste y tipografía | No evaluados |

## 16. Criterios de aceptación de CHOIR-129

| Criterio | Estado |
|---|---|
| 1. Matriz de pantallas y viewports | Cumplido en emulado (sección 11) |
| 2. Ausencia de overflow y de controles inaccesibles | Parcial: overflow horizontal y elementos fuera del viewport verificados en Chromium emulado. No se comprobaron todos los controles recortados dentro de contenedores con scroll ni todas las condiciones de accesibilidad táctil. |
| 3. Capturas de escritorio, tablet y móvil | Emuladas disponibles (sección 12); falta dispositivo real |
| 4. Comparación con el sistema de diseño | Documentada (sección 13) |
| 5. Hallazgos priorizados | Documentados (sección 14) |
| 6. Verificado, pendiente, no aplica y no verificable | Separados (secciones 10 y 15) |
| 7. Build y tests | No aplica: no hay cambios de código ni de CSS |

La validación emulada queda documentada y completada dentro del alcance definido. La comprobación en dispositivo real queda registrada como limitación pendiente, sin bloquear este entregable.
