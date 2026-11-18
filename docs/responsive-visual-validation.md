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
