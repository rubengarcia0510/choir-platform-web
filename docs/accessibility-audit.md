# CHOIR — Auditoría de estados y accesibilidad (CHOIR-128)

Estado: auditoría estática y automatizada sobre `124-integradora`.
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
- `src/app/formations/formation-stage.keyboard.spec.ts`
- `src/app/formations/formation-stage.drag.spec.ts`
- `src/styles.scss`
- `src/app/choirs/choir-page.spec.ts`

Se inspeccionó el código y los tests disponibles. Las validaciones manuales con lector de pantalla y las mediciones de contraste se documentan por separado.

## 2. Inventario de pantallas y estados

| Pantalla | Estados y comportamientos observados |
|---|---|
| Inicio `/` | Contenido estático, navegación pública y enlaces a los módulos. |
| Ingresar `/ingresar` | Formulario, validación HTML, carga, error de autenticación/conexión y navegación al espacio de trabajo. |
| Registro `/registro` | Formulario, validación, envío, campos deshabilitados durante el envío, error y confirmación mediante `role="status"`. |
| Verificación `/registro/verificar` | Carga, éxito, token ausente/inválido/vencido y error de conexión. |
| Mi coro `/app/coro` | Carga, error con reintento, vacío, listado, creación, edición, validación, guardado, confirmación de archivo y error de archivo. |
| Conciertos `/app/conciertos` | Placeholder informativo. No hay operaciones funcionales de conciertos implementadas en esta pantalla. |
| Formaciones `/app/formaciones` | Carga/error/vacío de coros, selección de coro/concierto/obra/formación, carga/error de planificación, creación de formación, guardado y errores de posiciones. |
| Escenario | Carga, error con reintento, sin borrador, formación vacía, integrantes, bloqueo de posición, movimiento por puntero y alternativa de movimiento por teclado. |
| No encontrado `**` | Pantalla de fallback. |

## 3. Hallazgos y estado de resolución

### A11Y-01 — Enlace para saltar al contenido

Estado: corregido en `124-integradora` mediante CHOIR-134.

Evidencia:

- `src/app/app.html` incorpora un enlace inicial hacia `#main-content`.
- El elemento principal tiene `id="main-content"` y `tabindex="-1"`.
- `src/styles.scss` define estilos para `.skip-link` y `.skip-link:focus`.

Criterio relacionado: WCAG 2.2, 2.4.1 (Bloques omitidos).

Validación pendiente:

- Recorrer el inicio de las rutas con teclado.
- Comprobar que el enlace recibe foco, se vuelve visible y permite llegar al contenido principal.
- Verificar que el foco queda en un destino útil después de activarlo.

No debe registrarse como una funcionalidad ausente.

### A11Y-02 — Indicador de foco global

Estado: corregido en `124-integradora`; no registrar como hallazgo abierto.

Evidencia:

`src/styles.scss` contempla explícitamente:

- `a:focus-visible`
- `button:focus-visible`
- `input:focus-visible`
- `textarea:focus-visible`
- `select:focus-visible`

Las reglas aplican `--focus-ring` y `outline-offset`.

Validación pendiente:

- Comprobar visualmente el foco en todos los controles.
- Verificar que no quede recortado u oculto.
- Revisar los estados de foco de componentes con estilos propios.

### A11Y-03 — Movimiento de integrantes del escenario mediante teclado

Estado: corregido en `124-integradora` mediante CHOIR-135.

Evidencia:

- `formation-stage.component.html` conecta los controles de integrantes con eventos de teclado.
- `formation-stage.component.ts` implementa una sesión de movimiento por teclado.
- `handleSingerKeydown`, `moveWithKeyboard`, `confirmKeyboardMove` y `cancelKeyboardMove` gestionan la interacción.
- Enter o Espacio inicia y confirma el movimiento.
- Las flechas permiten modificar la posición.
- Shift junto con una flecha permite un desplazamiento mayor.
- Escape cancela el movimiento.
- Se respetan límites, bloqueos, permisos y estados incompatibles de carga o guardado.
- La interfaz anuncia el estado de la operación mediante una región viva.

El test `formation-stage.keyboard.spec.ts` contempla nueve escenarios:

1. Iniciar el movimiento con Enter.
2. Mover con flechas y confirmar.
3. Aplicar un desplazamiento mayor con Shift.
4. Respetar los límites del escenario.
5. Cancelar con Escape.
6. Impedir mover integrantes bloqueados.
7. Respetar los permisos de edición.
8. Impedir movimientos durante guardados y cargas.
9. No emitir cambios cuando no hubo desplazamiento.

Criterio relacionado: WCAG 2.2, 2.1.1 (Teclado).

Validación manual pendiente:

- Mover un integrante sin mouse ni gestos táctiles.
- Confirmar el movimiento.
- Guardar la formación y comprobar la persistencia de la posición.
- Comprobar los anuncios con lector de pantalla.

No debe describirse como una funcionalidad de teclado ausente.

### A11Y-04 — Semántica y jerarquía accesible del escenario

Estado: pendiente de validación manual.

Evidencia:

`formation-stage.component.html` utiliza:

- Un contenedor `.stage` con `aria-label` y `aria-busy`.
- Un contenedor `.stage-people` con `aria-label`.
- Botones individuales con nombres accesibles que incluyen nombre, sección y estado de bloqueo.
- Botones separados para quitar integrantes y bloquear/desbloquear posiciones.
- Instrucciones para operar mediante teclado.
- Una región viva para anunciar cambios de la interacción por teclado.

Los contenedores principales son `div` genéricos. Se debe evaluar con el árbol de accesibilidad y lector de pantalla si su semántica actual comunica adecuadamente la relación entre el escenario y sus integrantes.

Criterios relacionados: WCAG 2.2, 1.3.1 y 4.1.2.

Validación pendiente:

- Inspeccionar el árbol de accesibilidad.
- Recorrer el escenario con NVDA.
- Comprobar que se entienden los integrantes, sus nombres, estados y acciones.
- Evaluar si hace falta modificar la semántica de los contenedores. No agregar roles sin evidencia de que mejoren la experiencia.

### A11Y-05 — Nombre accesible de la ilustración de Inicio

Estado: pendiente de decisión y validación manual.

Evidencia:

`src/app/pages.ts` asigna `aria-label` a `.hero-art`, un contenedor `div` que agrupa elementos gráficos y decorativos.

La ilustración contiene elementos visuales y textos decorativos. Es necesario determinar si transmite información que no esté disponible en el contenido principal.

Criterio relacionado: WCAG 2.2, 1.1.1 (Contenido no textual).

Recomendación:

- Si la ilustración es puramente decorativa o redundante, excluirla del árbol accesible.
- Si transmite información necesaria, proporcionar una alternativa semántica adecuada.
- Evitar que el lector de pantalla anuncie contenido visual redundante.

Validación pendiente:

- Comprobar el anuncio actual con NVDA.
- Determinar si corresponde tratar la ilustración como decorativa o informativa.

### A11Y-06 — Anuncio de éxito en operaciones de Mi coro

Estado: corregido e integrado mediante CHOIR-136.

Evidencia:

- La implementación agrega una región viva accesible para anunciar el resultado de creación y edición.
- El usuario verificó manualmente con NVDA ambos flujos.
- Al crear un coro, NVDA anunció: «Coro creado correctamente».
- Al editar un coro, NVDA anunció: «Coro actualizado correctamente».

Criterio relacionado: WCAG 2.2, 4.1.3 (Mensajes de estado).

La validación manual de estos dos anuncios fue confirmada. No debe mantenerse como hallazgo pendiente.

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
- La creación y edición anuncian el resultado mediante una región viva accesible.

Validación manual confirmada para los anuncios de éxito de creación y edición mediante NVDA.

Pendiente: validar el orden de foco durante edición, cancelación y confirmación de archivo.

### Formaciones

- Los selectores tienen etiquetas o nombres accesibles.
- Los estados de carga usan `role="status"`.
- Los errores usan `role="alert"`.
- El guardado exitoso de posiciones utiliza `role="status"`.
- Los controles de creación y guardado se deshabilitan durante operaciones incompatibles.
- El escenario permite movimiento mediante puntero y teclado.

Pendiente: verificar anuncios de cambios, selectores dependientes y controles del escenario con lector de pantalla.

## 5. Aspectos positivos observados

- Existe un enlace para saltar al contenido principal.
- El elemento `main` tiene un destino identificable para ese enlace.
- Las navegaciones principales tienen etiquetas accesibles.
- Los formularios de ingreso y registro tienen etiquetas asociadas.
- Los mensajes de error y varios estados de carga usan roles de estado.
- Los botones del escenario tienen nombres accesibles explícitos.
- El escenario ofrece interacción por teclado y por puntero.
- Hay tests específicos para los movimientos mediante teclado.
- La creación y edición de coros anuncian su resultado.
- Los controles nativos `select` y `textarea` tienen estilos globales de foco visible.
- Se contempla `prefers-reduced-motion`.
- Registro y verificación exponen estados de carga, éxito y error.

Estos puntos no equivalen a una validación completa de conformidad.

## 6. Pruebas manuales pendientes

- [ ] Recorrido completo por teclado en todas las rutas.
- [ ] Verificar orden de foco y ausencia de trampas.
- [ ] Comprobar visibilidad del foco en enlaces, botones, inputs, selects y textareas.
- [ ] Validar el enlace de salto al contenido con teclado.
- [ ] Probar ingreso, registro y verificación con lector de pantalla.
- [ ] Comprobar anuncios de errores y éxitos en formularios.
- [x] Comprobar con NVDA el anuncio de éxito al crear un coro.
- [x] Comprobar con NVDA el anuncio de éxito al editar un coro.
- [ ] Probar movimiento, confirmación y cancelación de integrantes mediante teclado con NVDA.
- [ ] Probar selectores dependientes de Formaciones.
- [ ] Probar las acciones de quitar y bloquear/desbloquear integrantes.
- [ ] Inspeccionar el árbol accesible del escenario.
- [ ] Determinar si la ilustración de Inicio debe anunciarse o ser decorativa.
- [ ] Medir contraste de texto, controles y estados.
- [ ] Comprobar zoom y reflow.
- [ ] Validar tamaños de objetivos táctiles.

Las casillas marcadas corresponden exclusivamente a las comprobaciones manuales confirmadas por el usuario. La existencia de tests automatizados no sustituye las pruebas manuales indicadas.

## 7. Alcance y límites

Esta auditoría cubre estados y accesibilidad. No reemplaza la validación responsive de DS-09 ni redefine tokens o patrones globales cubiertos por CHOIR-125.

No se realizaron cambios funcionales ni se alteraron reglas de negocio como parte de la auditoría.

Las correcciones que excedan ajustes puntuales deben tener tickets propios en Jira.

No se declara conformidad WCAG 2.2 AA mientras existan criterios sin verificar.

## 8. Criterio de cierre

La auditoría se considerará completa cuando:

1. La matriz de estados por pantalla esté revisada.
2. Los hallazgos tengan resolución documentada o tickets de corrección vinculados.
3. Se hayan ejecutado las pruebas manuales críticas de teclado y lector de pantalla.
4. Se documenten las limitaciones de las pruebas y la evidencia obtenida.
5. El informe esté integrado mediante PR a `124-integradora`.

## 9. Automatización axe-core y Playwright

Se incorpora una auditoría automatizada con axe-core ejecutada mediante Playwright y Chromium en GitHub Actions.

La ejecución recorre las rutas principales de la aplicación y comprueba reglas etiquetadas como WCAG 2.0 A/AA, WCAG 2.1 A/AA y WCAG 2.2 AA.

El workflow falla cuando se detectan violaciones o errores al auditar una ruta.

Esta automatización permite detectar, entre otros problemas, controles sin nombre accesible, asociaciones incorrectas de etiquetas, atributos ARIA inválidos y determinados problemas de contraste.

**Limitaciones:** el análisis automatizado no sustituye las pruebas manuales con NVDA, navegación completa por teclado, revisión del orden de foco, anuncios de cambios dinámicos ni mediciones manuales de contraste y reflow. Un resultado sin violaciones no certifica por sí solo conformidad WCAG 2.2 AA.

Las pruebas manuales pendientes de esta auditoría continúan pendientes hasta que exista evidencia de su ejecución.

### 9.1 Acceso automatizado a rutas protegidas

Playwright intercepta `GET /api/auth/me` y devuelve una sesión sintética de director, exclusivamente dentro del navegador de auditoría. No utiliza credenciales reales ni modifica el mecanismo de autenticación de la aplicación.

Esto permite atravesar `directorGuard` y cargar las rutas privadas.

Las API de dominio no se simulan. Por lo tanto, las pantallas privadas se inspeccionan con el backend de dominio no disponible y únicamente se pueden evaluar los estados que la aplicación presenta en esas condiciones.

No se consideran auditados los estados exitosos que requieren datos reales.

El script comprueba la URL final de cada ruta. Si una ruta protegida redirige a otra pantalla, la auditoría falla en lugar de contar esa pantalla como una revisión válida de la ruta solicitada.

Esta ejecución no sustituye pruebas de flujos exitosos, teclado físico ni tecnologías de asistencia.

### 9.2 Navegación de rutas protegidas con SSR

La aplicación utiliza renderizado del lado del servidor. Una navegación directa a una ruta protegida puede ejecutar `directorGuard` en el servidor, antes de que Playwright pueda interceptar las peticiones del navegador.

Para evitar confundir ese comportamiento SSR con una sesión de navegador, la auditoría carga primero `/ingresar` y navega después a las rutas privadas mediante el Router del navegador.

El script espera la petición `GET /api/auth/me` y comprueba que Playwright la haya interceptado antes de considerar válida la navegación. Si no se intercepta o la ruta redirige, la auditoría falla explícitamente.

Este mecanismo es exclusivo del entorno de pruebas y no modifica la configuración SSR ni el guard de producción.
