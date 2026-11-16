# CHOIR — Auditoría preliminar de accesibilidad

Estado: revisión estática de código. No constituye certificación WCAG.

Referencia: WCAG 2.2 nivel AA.

## 1. Alcance

Se revisaron los componentes y estilos disponibles en `main`:

- `src/app/app.html`
- `src/app/app.ts`
- `src/app/app.scss`
- `src/styles.scss`
- `src/app/app.routes.ts`
- `src/app/pages.ts`
- `src/app/auth/login.page.ts`
- `src/app/formations/formation-stage.component.html`
- `src/app/formations/formation-stage.component.scss`

No se realizaron modificaciones de código ni pruebas manuales sobre
un navegador o dispositivo.

## 2. Hallazgos

### A11Y-01 — Enlace para saltar al contenido

Prioridad: P1.

Observación:
El layout contiene un elemento `main` con identificador `main-content`,
pero no se identificó un enlace inicial para saltar la navegación.

Recomendación:
Incorporar un enlace accesible al comienzo de la página que lleve a
`#main-content`, visible al recibir foco.

Validación:
Comprobar navegación por teclado desde el inicio de cada ruta.

### A11Y-02 — Foco global de controles

Prioridad: P1.

Observación:
La regla global `:focus-visible` contempla enlaces, botones e inputs,
pero no incluye explícitamente `select` ni `textarea`.

Recomendación:
Definir un indicador de foco consistente para todos los controles
interactivos y comprobar que no quede oculto por contenedores.

Validación:
Recorrer formularios y selectores mediante teclado.

### A11Y-03 — Edición de posiciones mediante teclado

Prioridad: P1.

Observación:
Los integrantes del escenario reciben eventos de puntero para iniciar,
mover y finalizar el arrastre. No se identificó en el template revisado
un mecanismo alternativo para cambiar posiciones mediante teclado.

Recomendación:
Diseñar una alternativa operable por teclado para seleccionar un
integrante y modificar su posición, conservando las reglas existentes.

Validación:
Completar la operación sin utilizar mouse ni gestos táctiles.

### A11Y-04 — Semántica del escenario

Prioridad: P2.

Observación:
El escenario utiliza contenedores `div` con atributos `aria-label`.
Debe verificarse que la información y su jerarquía se expongan
correctamente a tecnologías de asistencia.

Recomendación:
Evaluar una estructura semántica y nombres accesibles adecuados para
el escenario, sus integrantes y sus acciones.

Validación:
Inspeccionar el árbol de accesibilidad con lector de pantalla.

### A11Y-05 — Ilustración de Inicio

Prioridad: P2.

Observación:
La ilustración abstracta de Inicio tiene un `aria-label` en un
contenedor genérico.

Recomendación:
Determinar si es decorativa o informativa. Si es decorativa, evitar
anunciarla innecesariamente; si aporta información, utilizar semántica
accesible apropiada.

Validación:
Comprobar el anuncio con lector de pantalla.

## 3. Aspectos positivos observados

- El layout utiliza un elemento `main`.
- La navegación principal tiene etiquetas `aria-label`.
- El login asocia etiquetas a los campos mediante `for` e `id`.
- Los errores del login y de varios flujos utilizan `role="alert"`.
- Existen estados de carga identificados mediante `role="status"`.
- Algunos controles de Formaciones tienen nombres accesibles explícitos.
- Hay estilos `:focus-visible` para enlaces y botones.
- Se contempla `prefers-reduced-motion`.
- Existen adaptaciones responsive para distintos anchos.

Estos puntos no equivalen a una validación completa de conformidad.

## 4. Pruebas pendientes

- [ ] Recorrido completo por teclado en todas las rutas.
- [ ] Verificación de orden de foco y ausencia de trampas.
- [ ] Prueba de lector de pantalla.
- [ ] Medición de contraste de texto, controles y estados.
- [ ] Verificación de zoom y reflow.
- [ ] Validación de tamaños de objetivos táctiles.
- [ ] Prueba de la alternativa de teclado en Formaciones.
- [ ] Revisión de anuncios dinámicos y mensajes de estado.
- [ ] Prueba en móvil y escritorio.

## 5. Criterio de cierre

La auditoría se considerará completa cuando los hallazgos tengan
resolución documentada, las pruebas pendientes se hayan ejecutado
y exista evidencia de validación.

No se declara conformidad WCAG 2.2 AA a partir de esta revisión estática.

## 6. Fuera de alcance

Este documento no autoriza cambios de CSS, templates, componentes,
comportamiento funcional ni contratos backend.

Cada corrección debe contar con un ticket y criterios de aceptación
propios en Jira.
