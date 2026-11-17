# CHOIR — Auditoría de estados y accesibilidad (CHOIR-128)

Estado: auditoría estática sobre `124-integradora`.
Referencia: WCAG 2.2 nivel AA.
Esta revisión no constituye certificación de conformidad.

## 1. Base y alcance

La auditoría se realiza sobre la rama `124-integradora`, que contiene la integración de CHOIR-124, CHOIR-125, CHOIR-126 y CHOIR-127.

Archivos revisados:

- `src/app/app.routes.ts`
- `src/app/app.html`
- `src/app/app.ts`
- `src/app/pages.ts`
- `src/app/auth/login.page.ts`
- `src/app/auth/register.page.ts`
- `src/app/auth/verify-email.page.ts`
- `src/app/formations/formation-stage.component.html`
- `src/app/formations/formation-stage.component.ts`
- `src/styles.scss`
- `src/app/choirs/choir-page.spec.ts`
- `src/app/formations/formation-stage.drag.spec.ts`

Se inspeccionó el código y los tests disponibles. No se realizaron pruebas manuales con lector de pantalla ni mediciones de contraste en navegador.

## 2. Inventario de pantallas y estados

| Pantalla | Estados y comportamientos observados |
|---|---|
| Inicio `/` | Contenido estático, navegación pública y enlaces a los módulos. |
| Ingresar `/ingresar` | Formulario, validación HTML, carga, error de autenticación/conexión y navegación al espacio de trabajo. |
| Registro `/registro` | Formulario, validación, envío, campos deshabilitados durante el envío, error y confirmación de solicitud mediante `role="status"`. |
| Verificación `/registro/verificar` | Carga, éxito, token ausente/inválido/vencido y error de conexión. |
| Mi coro `/app/coro` | Carga, error con reintento, vacío, listado, creación, edición, validación, guardado, confirmación de archivo y error de archivo. |
| Conciertos `/app/conciertos` | Placeholder informativo. No hay operaciones funcionales de conciertos implementadas en esta pantalla. |
| Formaciones `/app/formaciones` | Carga/error/vacío de coros, selección de coro/concierto/obra/formación, carga/error de planificación, creación de formación, guardado y errores de posiciones. |
| Escenario | Carga, error con reintento, sin borrador, formación vacía, integrantes, bloqueo de posición y arrastre por puntero. |
| No encontrado `**` | Pantalla de fallback. |

## 3. Hallazgos

### A11Y-01 — Falta un enlace para saltar al contenido

Prioridad: P1.

Evidencia:
`src/app/app.html` contiene `main#main-content`, pero no se identifica un enlace inicial que permita saltar directamente al contenido principal.

Criterio relacionado: WCAG 2.2, 2.4.1 (Bloques omitidos).

Recomendación:
Agregar un enlace de salto al comienzo del layout, visible al recibir foco, que navegue a `#main-content`.

Validación pendiente:
Recorrer el inicio de cada ruta usando solamente teclado y comprobar que el enlace sea el primer mecanismo de navegación útil.

### A11Y-02 — Indicador de foco global

Estado: corregido en `124-integradora`; no registrar como hallazgo abierto.

Evidencia:
`src/styles.scss` contempla explícitamente:

- `a:focus-visible`
- `button:focus-visible`
- `input:focus-visible`
- `textarea:focus-visible`
- `select:focus-visible`

La regla aplica `--focus-ring` y `outline-offset`.

Validación pendiente:
Comprobar visualmente el foco en todos los controles, verificar que no quede recortado u oculto y revisar los estados de foco de componentes con estilos propios.

### A11Y-03 — El movimiento de integrantes del escenario no tiene alternativa de teclado

Prioridad: P1.

Evidencia:
`src/app/formations/formation-stage.component.html` conecta los botones de integrantes a `pointerdown`, `pointermove`, `pointerup`, `pointercancel` y `lostpointercapture`.

`src/app/formations/formation-stage.component.ts` implementa el movimiento mediante `DragSession` y coordenadas del puntero.

El botón tiene un nombre accesible que indica que se puede arrastrar, pero no se identificó una interacción equivalente mediante teclado para modificar la posición.

El test `src/app/formations/formation-stage.drag.spec.ts` valida el movimiento visual mediante eventos de puntero; no demuestra una alternativa de teclado.

Criterio relacionado: WCAG 2.2, 2.1.1 (Teclado).

Recomendación:
Proporcionar una alternativa operable mediante teclado para seleccionar un integrante y modificar su posición, respetando las restricciones de edición y bloqueo.

Validación pendiente:
Mover, guardar y comprobar la posición de un integrante sin mouse ni gestos táctiles.

### A11Y-04 — Semántica y jerarquía accesible del escenario

Prioridad: P2.

Evidencia:
`formation-stage.component.html` utiliza:

- Un contenedor `.stage` con `aria-label` y `aria-busy`.
- Un contenedor `.stage-people` con `aria-label`.
- Botones individuales con nombres accesibles que incluyen nombre, sección y estado de bloqueo.
- Botones separados para quitar integrantes y bloquear/desbloquear posiciones.

Los botones tienen nombres explícitos, pero los contenedores principales son `div` genéricos y no se identificó una estructura semántica que describa claramente el escenario como conjunto y la relación entre sus integrantes.

Criterios relacionados: WCAG 2.2, 1.3.1 y 4.1.2.

Recomendación:
Evaluar una estructura semántica apropiada para el escenario y el conjunto de integrantes, sin perder la información de posición ni los nombres accesibles de las acciones.

Validación pendiente:
Inspeccionar el árbol de accesibilidad y recorrer el escenario con lector de pantalla.

### A11Y-05 — Nombre accesible de la ilustración de Inicio

Prioridad: P2.

Evidencia:
`src/app/pages.ts` asigna `aria-label` a `.hero-art`, un contenedor `div` que agrupa elementos gráficos y decorativos.

Criterio relacionado: WCAG 2.2, 1.1.1 (Contenido no textual).

Recomendación:
Determinar si la ilustración aporta información necesaria. Si es decorativa, excluirla del árbol accesible; si transmite información, utilizar una semántica apropiada.

Validación pendiente:
Comprobar el anuncio con lector de pantalla y evitar anuncios redundantes de elementos decorativos.

### A11Y-06 — Anuncio de éxito en operaciones de Mi coro

Prioridad: P2.

Evidencia:
`ChoirPage` actualiza la lista después de crear o editar un coro y limpia el formulario. Sin embargo, no se identificó un mensaje explícito de éxito con `role="status"` para esas operaciones.

Los errores del formulario usan `role="alert"`, pero el éxito no cuenta con un anuncio equivalente.

Criterio relacionado: WCAG 2.2, 4.1.3 (Mensajes de estado).

Recomendación:
Agregar un mensaje de éxito accesible para creación y edición, anunciado sin mover el foco de forma innecesaria.

Validación pendiente:
Comprobar que lector de pantalla anuncie el resultado de crear y editar un coro.

## 4. Revisión de formularios y mensajes

### Ingresar

- Los campos tienen etiquetas asociadas mediante `for` e `id`.
- Se utilizan atributos HTML de tipo y obligatoriedad.
- El botón se deshabilita durante la carga o cuando faltan datos.
- Los errores utilizan `role="alert"`.
- La autenticación exitosa navega a `/app/coro`.

Pendiente: comprobar anuncio de errores y comportamiento del foco al producirse la navegación.

### Registro

- Los campos tienen etiquetas asociadas mediante `for` e `id`.
- Se utilizan `autocomplete`, restricciones de longitud y validación de formato.
- Los campos se deshabilitan durante el envío.
- Los errores utilizan `role="alert"`.
- La confirmación utiliza `role="status"`.

Pendiente: comprobar la asociación de errores con sus campos y el anuncio del resultado.

### Verificación de correo

- Se expone el estado de carga mediante `role="status"`.
- El éxito utiliza `role="status"`.
- Los errores utilizan `role="alert"`.

Pendiente: comprobar los anuncios y la navegación al destino después de la verificación.

### Mi coro

- Los campos están dentro de etiquetas.
- Los errores de formulario utilizan `role="alert"`.
- La carga general utiliza `role="status"`.
- La confirmación de archivo se presenta como acciones en línea, no como diálogo modal.
- No se encontró anuncio explícito de éxito para creación y edición.

Pendiente: validar el orden de foco durante edición, cancelación y confirmación de archivo.

### Formaciones

- Los selectores tienen etiquetas o nombres accesibles.
- Los estados de carga usan `role="status"`.
- Los errores usan `role="alert"`.
- El guardado exitoso de posiciones utiliza `role="status"`.
- Los controles de creación y guardado se deshabilitan durante operaciones incompatibles.

Pendiente: verificar anuncios de cambios, selectores dependientes y controles del escenario con lector de pantalla.

## 5. Aspectos positivos observados

- Existe un elemento `main` identificable.
- Las navegaciones principales tienen etiquetas accesibles.
- Los formularios de ingreso y registro tienen etiquetas asociadas.
- Los mensajes de error y varios estados de carga usan roles de estado.
- Los botones del escenario tienen nombres accesibles explícitos.
- Los controles nativos `select` y `textarea` ya tienen estilos globales de foco visible.
- Se contempla `prefers-reduced-motion`.
- Registro y verificación exponen estados de carga, éxito y error.

Estos puntos no equivalen a una validación completa de conformidad.

## 6. Pruebas manuales pendientes

- [ ] Recorrido completo por teclado en todas las rutas.
- [ ] Verificar orden de foco y ausencia de trampas.
- [ ] Comprobar visibilidad del foco en enlaces, botones, inputs, selects y textareas.
- [ ] Verificar el enlace de salto al contenido cuando esté implementado.
- [ ] Probar ingreso, registro y verificación con lector de pantalla.
- [ ] Comprobar anuncios de errores y éxitos en formularios.
- [ ] Probar creación y edición de coros y verificar anuncio de éxito.
- [ ] Probar selectores dependientes de Formaciones.
- [ ] Probar las acciones de quitar y bloquear/desbloquear integrantes.
- [ ] Verificar alternativa de teclado para mover integrantes cuando esté implementada.
- [ ] Inspeccionar el árbol accesible del escenario.
- [ ] Determinar si la ilustración de Inicio debe anunciarse o ser decorativa.
- [ ] Medir contraste de texto, controles y estados.
- [ ] Comprobar zoom y reflow.
- [ ] Validar tamaños de objetivos táctiles.

## 7. Alcance y límites

Esta auditoría cubre estados y accesibilidad. No reemplaza la validación responsive de DS-09 ni redefine tokens o patrones globales cubiertos por CHOIR-125.

No se realizaron cambios funcionales ni se alteraron reglas de negocio.

Las correcciones que excedan ajustes puntuales deben tener tickets propios en Jira.

No se declara conformidad WCAG 2.2 AA mientras existan criterios sin verificar.

## 8. Criterio de cierre

La auditoría se considerará completa cuando:

1. La matriz de estados por pantalla esté revisada.
2. Los hallazgos tengan resolución documentada o tickets de corrección vinculados.
3. Se hayan ejecutado las pruebas manuales críticas de teclado y lector de pantalla.
4. Se documenten las limitaciones de las pruebas y la evidencia obtenida.
5. El informe esté integrado mediante PR a `124-integradora`.
