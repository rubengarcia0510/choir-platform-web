# CHOIR-129 — Validación responsive y consistencia visual

Estado: revisión estática inicial. La validación visual en navegador y las capturas por viewport siguen pendientes.

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

Esta revisión es estática. No certifica overflow, recortes, solapamientos ni legibilidad visual real sin inspección en navegador.

## 2. Viewports previstos

| Perfil | Viewport CSS | Estado |
|---|---:|---|
| Escritorio | 1440 × 900 | Pendiente |
| Tablet horizontal | 1024 × 768 | Pendiente |
| Tablet vertical | 768 × 1024 | Pendiente |
| Móvil habitual | 390 × 844 | Pendiente |
| Móvil angosto | 320 × 800 | Pendiente |

Los breakpoints globales relevantes son 850 px y 560 px. El escenario tiene un ajuste propio a 560 px.

## 3. Inventario de pantallas

| Ruta | Pantalla | Estado observado | Validación |
|---|---|---|---|
| `/` | Inicio | Implementada | Estática; navegador pendiente |
| `/ingresar` | Ingresar | Formulario funcional | Estática; navegador pendiente |
| `/registro` | Registro | Placeholder informativo | Solo presentación |
| `/registro/verificar` | Verificación | Ruta y componente existentes | Pendiente |
| `/app/coro` | Mi coro | Gestión implementada | Estática; navegador pendiente |
| `/app/conciertos` | Conciertos | Placeholder | No evaluar como módulo funcional |
| `/app/formaciones` | Formaciones | Editor parcial | Pendiente de datos reales |
| `**` | No encontrado | Implementada | Pendiente |

No se deben inventar datos ni estados para Conciertos o Formaciones. Sin conciertos, integrantes y formaciones reales no se puede certificar el flujo operativo de Formaciones.

## 4. Riesgos identificados en la revisión estática

No son defectos confirmados; requieren comprobación visual.

| ID | Área | Observación | Comprobación requerida |
|---|---|---|---|
| RSP-01 | Navegación | Hasta 850 px la navegación usa `overflow-x: auto`. | Verificar visibilidad y desplazamiento de enlaces. |
| RSP-02 | Inicio | El hero cambia a una columna en 850 px; las tarjetas pasan a dos y luego una columna. | Comprobar orden, altura, ilustración y acciones. |
| RSP-03 | Mi coro | Formulario y listado pasan a una columna en 850 px. | Revisar campos, textos largos y acciones de edición/archivo. |
| RSP-04 | Formaciones | El escenario y el elenco pasan a una columna. Las tarjetas de integrantes miden 86 px y 70 px en móvil. | Revisar superposición, recortes y distribución. |
| RSP-05 | Formaciones | Los controles contextuales del escenario miden 28 px; las acciones del elenco tienen padding reducido. | Comprobar interacción y presentación en móvil. |
| RSP-06 | Footer | El footer cambia a varias líneas hasta 560 px. | Verificar que no haya solapamientos ni overflow. |
| RSP-07 | Ancho mínimo | `html` y `body` declaran `min-width: 320px`. | Validar a 320 px; no afirmar soporte por debajo. |

## 5. Matriz de resultados

| Pantalla | 1440 × 900 | 1024 × 768 | 768 × 1024 | 390 × 844 | 320 × 800 |
|---|---|---|---|---|---|
| Inicio | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| Ingresar | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| Registro | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| Mi coro | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| Conciertos | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| Formaciones | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| Verificación | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| No encontrado | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |

## 6. Evidencia pendiente

Para cada pantalla disponible se necesitan capturas de escritorio, tablet y móvil, con:

- Viewport CSS exacto.
- Ruta y estado mostrado.
- Resultado de overflow, recortes, solapamientos y jerarquía.
- Hallazgo, severidad y recomendación, si corresponde.

En Formaciones solo se validarán estados que puedan abrirse con datos reales disponibles. Si faltan datos, se documentará como no verificado.

## 7. Límites

- No se modificó CSS ni comportamiento.
- No se auditó semántica, lector de pantalla ni conformidad WCAG.
- No se certifica responsive integral hasta completar las comprobaciones manuales.
- Rediseños y cambios funcionales se derivarán a tickets separados.

## 6. Evidencia visual parcial

### Inicio (/)

- Evidencia: fotografía de la aplicación en navegador, aportada durante la validación manual.
- Viewport CSS: no confirmado; no se asigna a ninguno de los tamaños previstos.
- Observaciones: hero en dos columnas; texto y acciones a la izquierda e ilustración a la derecha. En la captura no se aprecia overflow horizontal ni solapamiento entre ambos bloques. Título y acciones mantienen jerarquía visual legible. Se observa espacio vertical amplio entre navegación y contenido, sin evidencia suficiente para clasificarlo como defecto. Hay scrollbar vertical.
- Resultado: revisión visual parcial; no certifica responsive para un viewport concreto.

### Mi coro (/app/coro)

- Evidencia: fotografía aportada durante la validación manual.
- Viewport CSS: no confirmado.
- Observaciones: se distinguen navegación, encabezado y contenido en dos columnas, además del estado vacío «Todavía no hay coros». No se aprecia overflow horizontal evidente. La definición y perspectiva no permiten evaluar con precisión espaciados ni tamaños.
- Resultado: revisión visual parcial; no certifica responsive para un viewport concreto.


### Ingresar (/ingresar)

- Evidencia: fotografía de la aplicación en navegador, aportada durante la validación manual.
- Viewport CSS: no confirmado.
- Observaciones: formulario centrado, con título destacado, campos de correo electrónico y contraseña alineados y botón de ingreso a ancho completo. No se aprecia overflow horizontal. El botón aparece atenuado con los campos vacíos, comportamiento compatible con una acción deshabilitada hasta completar los datos. Hay espacio libre amplio alrededor del formulario, sin evidencia suficiente para clasificarlo como defecto.
- Resultado: revisión visual parcial; no certifica responsive para un viewport concreto.


### Registro (/registro)

- Evidencia: fotografía de la aplicación en navegador, aportada durante la validación manual.
- Viewport CSS: no confirmado.
- Observaciones: composición en dos columnas, con panel oscuro de identidad visual a la izquierda y formulario de registro a la derecha. Se distinguen los campos de nombre, correo electrónico y contraseña, la indicación de mínimo 12 caracteres, el botón «Crear cuenta» y el enlace para usuarios existentes. No se aprecia solapamiento entre columnas ni overflow horizontal evidente.
- Resultado: revisión visual parcial; no certifica responsive para un viewport concreto. La adaptación a tablet y móvil queda pendiente.


### Verificación de cuenta (/registro/verificar)

- Evidencia: fotografía de la aplicación en navegador, aportada durante la validación manual.
- Estado observado: error por ausencia de token de verificación.
- Viewport CSS: no confirmado.
- Observaciones: mensaje «No pudimos verificar tu correo» con explicación de que el enlace no contiene un token y recomendación de revisar el enlace completo. Botón «Ir a ingresar» visible y con buen contraste. Contenido centrado; no se aprecia overflow horizontal.
- Resultado: revisión visual parcial del estado de error. No valida el flujo exitoso de verificación ni el comportamiento responsive en viewports concretos.

