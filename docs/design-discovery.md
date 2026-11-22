# CHOIR — Design Discovery

## 1. Objetivo

Definir una dirección visual y de experiencia de usuario coherente para CHOIR, una plataforma destinada a la gestión y dirección de agrupaciones corales.

El trabajo consiste en relevar la experiencia existente, identificar inconsistencias y oportunidades de mejora, y establecer criterios visuales que orienten futuras implementaciones.

Este documento no autoriza cambios funcionales ni modificaciones de estilos.

## 2. Estado actual del frontend

La aplicación utiliza Angular y dispone de las siguientes rutas:

| Ruta | Pantalla | Estado observado |
|---|---|---|
| `/` | Inicio | Implementada (`HomePage` en `src/app/pages.ts`); propuesta CHOIR-141 contrastada con capturas reales; validación manual completa pendiente |
| `/ingresar` | Iniciar sesión | Formulario funcional (`src/app/auth/login.page.ts`); propuesta CHOIR-141 contrastada con capturas reales |
| `/registro` | Registro | Formulario funcional (`src/app/auth/register.page.ts`); el alta depende de la configuración del backend y del servicio de correo; propuesta CHOIR-141 contrastada con capturas reales |
| `/registro/verificar` | Verificación de correo | Funcional (`src/app/auth/verify-email.page.ts`); se observó el estado sin token |
| `/app/coro` | Gestión del coro | Implementada: coros e integrantes (`ChoirSingersComponent`, CHOIR-151); el panel de integrantes no formó parte de la validación visual de CHOIR-141 |
| `/app/conciertos` | Conciertos | Módulo informativo en preparación, sin operaciones; propuesta CHOIR-142 documentada |
| `/app/formaciones` | Formaciones | Editor funcional con puntero y alternativa de teclado; validación manual y con datos reales pendiente; propuesta CHOIR-143 conceptual |
| `**` | No encontrado | Implementada |

Las rutas privadas se encuentran protegidas mediante `directorGuard`.

### Observaciones sobre autenticación

La revisión del backend confirmó:

- `POST /api/auth/register` recibe `displayName`, `email` y `password`.
- El registro depende de `choir.auth.registration.enabled`, de un `VerificationEmailSender` disponible y de una URL base de verificación configurada.
- La configuración incluida en `application.yml` deshabilita el registro por defecto y deja vacía la URL base. La configuración efectiva de los entornos desplegados no fue verificada.
- Una solicitud procesada devuelve HTTP 202 con una respuesta genérica, también utilizada cuando el correo ya existe.
- El registro requiere verificación de correo y no inicia sesión automáticamente.
- El token de verificación vence a los 30 minutos y se consume una sola vez.
- La verificación utiliza `POST /api/auth/verify-email`.
- La protección CSRF requiere obtener el token mediante `GET /api/auth/csrf`, conservar la cookie de sesión y enviar el header `X-CSRF-TOKEN`.
- No se encontró un endpoint de reenvío de correo de verificación.

El contrato, sus límites y las decisiones de diseño derivadas están documentados en `design-proposals.md`, sección 2. No debe asumirse que el registro está habilitado en producción ni que el correo se envía correctamente en todos los entornos.

## 3. Auditoría visual inicial

> Nota (CHOIR-145): las secciones 3.1 a 3.5 describen la auditoría inicial. Donde el código cambió después se indica la actualización.

### 3.1 Estilos globales

Archivo: `src/styles.scss`

Actualmente existen variables globales para:

- Color principal y variantes.
- Color de texto y texto secundario.
- Fondos y superficies.
- Bordes.
- Tipografía general.
- Foco visible y selección de texto.

La paleta actual utiliza verde como color de acento y superficies claras.

### 3.2 Estructura general

Archivos: `src/app/pages.scss` y `src/shared-patterns.scss`. Actualización: `src/app/app.scss` ya no existe.

Se identifican estilos compartidos para:

- Navegación y encabezado.
- Marca e identidad de la aplicación.
- Hero y presentación.
- Botones y enlaces.
- Tarjetas y paneles.
- Formularios.
- Estados vacíos.
- Indicadores de estado.
- Layouts de gestión y formaciones.
- Adaptación a distintos tamaños de pantalla.

Hay una cantidad importante de estilos concentrada en `src/app/pages.scss`. Se deberá evaluar su futura distribución en componentes y estilos específicos, evitando duplicaciones.

### 3.3 Formaciones

El módulo de formaciones cuenta con un escenario visual propio y estilos asociados a integrantes, posiciones e interacciones.

Es uno de los flujos de mayor complejidad funcional y necesita una evaluación específica de jerarquía visual, controles, legibilidad y adaptación a pantallas táctiles.

### 3.4 Accesibilidad

La hoja global (`src/styles.scss`) define foco visible para enlaces, botones, inputs, `select` y `textarea` mediante `--focus-ring: 3px solid var(--choir-accent-dark)` (`#34533A`). El contraste calculado frente a página, superficie, `--choir-accent-soft` y `--choir-line` está entre 6.99:1 y 8.59:1; no se midió con herramienta (CHOIR-140). Hay excepciones que no usan `--focus-ring`: los integrantes del escenario de Formaciones y los campos de `login.page.ts`.

Implementado en el código y comprobado con pruebas automatizadas o con revisión estática:

- Enlace para saltar al contenido principal (`.skip-link` hacia `#main-content`), con pruebas en `src/app/app.spec.ts` (CHOIR-134).
- Alternativa de teclado en el escenario de Formaciones: Enter o Espacio inicia el movimiento, las flechas desplazan (con Shift, en pasos mayores), Enter o Espacio confirman, Escape o Tab cancelan, con anuncios `aria-live` (CHOIR-135; pruebas en `formation-stage.keyboard.spec.ts` y `formation-stage.keyboard-tab.spec.ts`).
- Hover y active sin traslación en controles deshabilitados o en carga (`src/shared-patterns.scss`).
- Reglas de movimiento reducido, con una prueba sobre `pages.scss` (`src/app/app-reduced-motion.spec.ts`).

Validación manual confirmada: NVDA anuncia el éxito al crear y al editar un coro (`accessibility-audit.md`). No se extrapola a otras pantallas ni interacciones. Siguen pendientes las validaciones de CHOIR-137 a CHOIR-140. No se declara conformidad WCAG 2.2 AA.

### 3.5 Responsive

Existen reglas responsive en los estilos de la aplicación.

La auditoría visual posterior deberá verificar el comportamiento real de las pantallas en escritorio, tablet y móvil, sin asumir que la existencia de media queries garantiza una experiencia correcta.

## 4. Dirección visual propuesta

### Concepto

Una identidad artística, elegante y profesional, inspirada en la música coral y en la estética nocturna de la referencia visual compartida.

La propuesta combina una identidad visual expresiva con una interfaz operativa, clara y eficiente.

### Referencia estética

Elementos identificados en la referencia:

- Azul nocturno profundo.
- Detalles dorados.
- Líneas curvas y ondas.
- Partículas luminosas sutiles.
- Contraste entre tipografía serif y sans-serif.
- Composición equilibrada y elegante.

La referencia funciona como inspiración visual, no como diseño que deba copiarse literalmente.

### Dos ambientes visuales

**Ambiente artístico**

Uso previsto:
- Inicio y presentación.
- Portadas y destacados.
- Conciertos.
- Experiencias visuales de formaciones y transiciones.

Características:
- Fondos azul profundo.
- Detalles dorados moderados.
- Recursos gráficos inspirados en ondas musicales.
- Tipografía con mayor personalidad en títulos.

**Ambiente operativo**

Uso previsto:
- Gestión del coro.
- Administración de coreutas.
- Formularios.
- Configuraciones.
- Tablas y tareas cotidianas.

Características:
- Fondos claros.
- Superficies limpias.
- Contraste elevado.
- Jerarquía visual consistente.
- Controles claros y accesibles.

Ambos ambientes deben compartir los mismos criterios de espaciado, componentes, estados e interacción.

## 5. Oportunidades de mejora

1. Consolidar una identidad visual consistente entre módulos.
2. Definir tokens compartidos de color, tipografía, espaciado y superficies.
3. Establecer componentes reutilizables para botones, tarjetas, formularios y estados.
4. Mejorar la jerarquía visual de las pantallas operativas.
5. Diseñar estados de carga, vacío, error y éxito de forma consistente.
6. Revisar accesibilidad y navegación por teclado.
7. Validar la experiencia responsive.
8. Evitar que los recursos decorativos interfieran con las tareas de dirección coral.

## 6. Criterios de diseño

- La información funcional debe tener prioridad sobre la decoración.
- El color no debe ser el único medio para comunicar estados.
- Los controles deben tener estados hover, focus, disabled y loading cuando corresponda.
- Las pantallas deben conservar una jerarquía visual reconocible.
- Las interacciones táctiles deben ser cómodas en dispositivos móviles.
- Los elementos gráficos deben reforzar la identidad musical sin reducir la legibilidad.
- Los componentes compartidos deben mantener un comportamiento consistente.

## 7. Alcance y límites

Este Discovery no incluye:

- Modificaciones de CSS.
- Refactor de componentes Angular.
- Cambios de contratos backend.
- Modificaciones de reglas de negocio.
- Nuevas funcionalidades.
- Cambios de arquitectura.

Las futuras implementaciones deberán contar con alcance y criterios de aceptación definidos en Jira.

## 8. Estado de entregables

### Documentación completada

- `docs/design-discovery.md`: relevamiento inicial, dirección visual, evidencia de validación, hallazgos UX/UI y criterios de aceptación de CHOIR-145.
- `docs/design-system.md`: referencia central de tokens implementados, componentes, estados y criterios de consistencia, con el alcance de cada afirmación.
- `docs/design-module-references.md`: referencias visuales de Mi coro, Conciertos y Formaciones a partir de las capacidades existentes.
- `docs/design-references.md`: wireframes conceptuales para los módulos principales, incluyendo gestión de coreutas y transiciones.
- `docs/design-proposals.md`: propuestas de Inicio, Ingresar, Registro y Mi coro con su validación (CHOIR-141), y propuestas visuales o conceptuales de Conciertos (CHOIR-142), Formaciones (CHOIR-143) y Transiciones (CHOIR-144).
- `docs/accessibility-audit.md`: auditoría estática con el seguimiento de las correcciones CHOIR-134 a CHOIR-136 y las pruebas manuales pendientes.
- `docs/responsive-visual-validation.md`: inspección con capturas y medición emulada en Chromium, con sus límites.
- `docs/design-backlog.md`: backlog propuesto DS-01 a DS-09 con prioridades, dependencias y criterios de aceptación.
- `docs/assets/choir-design-reference.png`: referencia conceptual general de identidad visual.

### Propuestas visuales disponibles

Los recursos visuales están en `docs/assets/choir-124/`, `docs/assets/choir-129/`, `docs/assets/choir-142/`, `docs/assets/choir-143/` y `docs/assets/choir-144/`. Son propuestas de diseño o capturas de validación, no pantallas operativas, salvo las capturas de validación que se indican en la tabla siguiente:

- Inicio, Ingresar, Registro y Mi coro: propuestas de CHOIR-141 contrastadas con la implementación.
- Conciertos: propuesta visual de CHOIR-142 para un módulo en preparación.
- Formaciones: propuesta conceptual de CHOIR-143 para el editor visual.
- Transiciones: propuesta conceptual de CHOIR-144 para comparar origen y destino.

### Evidencia de validación por tipo

| Tipo de evidencia | Qué se hizo | Qué cubre | Qué no cubre |
|---|---|---|---|
| Revisión estática del código | Lectura de rutas, templates, estilos y pruebas de `develop` | Las capacidades implementadas citadas en esta documentación | El comportamiento visual en un navegador |
| Pruebas automatizadas | Pruebas del frontend y auditoría con axe-core y Playwright en CI (`accessibility-audit.md`) | Los estados que se renderizan en el entorno de prueba | No demuestran accesibilidad por sí solas ni cubren interacciones que requieren datos reales |
| Inspección visual con capturas reales | Capturas de Chrome para Android, con «Sitio para computadoras» desactivado, de Inicio, Ingresar, Registro y Mi coro (CHOIR-141); capturas de ventana de escritorio de seis pantallas (`responsive-visual-validation.md`) | Esas pantallas, en esos dispositivos y momentos | Mi coro con el panel de integrantes (posterior a CHOIR-141), tablet, otros navegadores y dispositivos |
| Chromium emulado con datos simulados | Medición de ocho rutas en cinco viewports de 320 a 1440 px sobre una compilación de `124-integradora` (`9605292`): sin desbordamiento horizontal ni solapamientos en cabecera y pie; hallazgos RV-01 a RV-03 | El layout de esas rutas con sesión y listas simuladas | Dispositivo real, datos reales, y Mi coro y Formaciones con contenido real |
| Validación operativa con datos reales | No realizada para Mi coro con integrantes, Conciertos ni Formaciones | Nada | Todo lo anterior queda pendiente |
| Validación manual con tecnologías de asistencia | NVDA anuncia el éxito al crear y al editar un coro | Solo esas dos interacciones | Teclado y foco (CHOIR-137), escenario de Formaciones (CHOIR-138), ilustración de Inicio (CHOIR-139) y contraste medido con herramienta (CHOIR-140) |

### Estado por dominio

- **Implementadas:** Inicio, Ingresar, Registro, Verificación de correo y Mi coro (coros e integrantes). Su contraste con las propuestas de CHOIR-141 se apoya en las capturas y mediciones de la tabla anterior, con las limitaciones indicadas.
- **Módulo informativo en preparación:** Conciertos, con propuesta visual documentada y sin operaciones.
- **Módulo operativo con propuesta conceptual:** Formaciones, con escenario interactivo con puntero y alternativa de teclado implementados; la propuesta de CHOIR-143 es estática y conceptual.
- **Concepto no implementado en el frontend:** Transiciones, propuesta conceptual sin funcionalidad ni persistencia asociada.

La documentación y las propuestas constituyen un Discovery consolidado, pero no representan una aprobación definitiva del sistema visual ni una certificación de accesibilidad.

## 9. Registro de hallazgos UX/UI priorizados

Los siguientes hallazgos surgen de la revisión estática documentada en este
Discovery y en `accessibility-audit.md`. Las prioridades expresan impacto
potencial y necesidad de resolución; no representan una certificación
ni sustituyen las pruebas manuales pendientes.

| ID | Área | Evidencia observada | Impacto | Prioridad / Estado |
|---|---|---|---|---|
| UX-01 | Ingresar y Registro | `/ingresar` y `/registro` cuentan con formularios funcionales (`login.page.ts`, `register.page.ts`). Propuestas CHOIR-141 contrastadas con capturas reales de Android y con la medición emulada. | Reorganización visual documentada y contrastada. La validación manual de formularios y teclado sigue pendiente (CHOIR-137). | Implementado; validación manual pendiente (P1) |
| UX-02 | Conciertos | La ruta `/app/conciertos` es un módulo informativo en preparación, con propuesta CHOIR-142 documentada. | Módulo identificado como en preparación sin datos simulados. Las operaciones de gestión no existen. | Propuesta documentada; no implementada (P1) |
| UX-03 | Estilos compartidos | Los patrones están en `src/shared-patterns.scss` y los tokens en `src/styles.scss` (CHOIR-125). `src/app/app.scss` ya no existe y los estilos de página están en `src/app/pages.scss`. | Tokens y seis patrones implementados. No se verificó de forma exhaustiva su uso en cada pantalla. Tokens sin uso verificado: `--elevation-2`, `--elevation-3`, `--color-success`, `--color-warning`, `--color-info` y `--radius-lg`. | Implementado; uso parcialmente verificado (P2) |
| UX-04 | Formaciones | El escenario permite mover integrantes con puntero y con teclado, con anuncios `aria-live` (`formation-stage.component.ts`, CHOIR-135). | Implementado y con pruebas automatizadas. La validación manual con tecnologías de asistencia sigue pendiente (CHOIR-138). | Implementado; validación manual pendiente (P1) |
| UX-05 | Foco de controles | `src/styles.scss` define `--focus-ring: 3px solid var(--choir-accent-dark)` para `a`, `button`, `input`, `select` y `textarea`. | Contraste calculado entre 6.99:1 y 8.59:1 sobre las superficies operativas, sin medición con herramienta (CHOIR-140). Dos excepciones no usan `--focus-ring`: el escenario de Formaciones y los campos de `login.page.ts`. | Implementado; medición pendiente (P1) |
| UX-06 | Responsive | Medición emulada en Chromium (ocho rutas, cinco viewports de 320 a 1440 px) sin desbordamiento horizontal. Hallazgos RV-01 a RV-03 en `docs/responsive-visual-validation.md`. | Verificado solo en emulación con datos simulados. Dispositivo real, zoom, reflow y objetivos táctiles siguen pendientes (CHOIR-129). | Verificado en emulación; dispositivo real pendiente (P2) |
| UX-07 | Semántica y contenido accesible | Enlace para saltar al contenido principal (CHOIR-134) y anuncio de éxito al crear y editar un coro, validado con NVDA (CHOIR-136). La ilustración de Inicio queda por evaluar (CHOIR-139). | Cobertura parcial según `accessibility-audit.md`. No se extrapola a otras pantallas. | Parcial (P2) |

### Evidencia y límites

- Los hallazgos de accesibilidad UX-04, UX-05 y UX-07 se detallan en
  `accessibility-audit.md`, con observaciones, recomendaciones y pruebas
  pendientes.
- Los estados de implementación de las rutas se registran en la sección 2.
- Los estilos de página se concentran en `src/app/pages.scss`.
- Los hallazgos responsive de la medición emulada requieren validación en
  dispositivo real antes de confirmar su alcance.
- No se atribuyen problemas visuales específicos a pantallas que no hayan
  sido inspeccionadas visualmente en todos sus estados.

### Trabajo pendiente

- Validar en dispositivo real los viewports de tablet y móvil (CHOIR-129).
- Validar Mi coro con integrantes reales, Conciertos y Formaciones con datos reales.
- Medir el contraste con herramienta y completar las validaciones de teclado, foco y lectores de pantalla (CHOIR-137 a CHOIR-140).
- Revalidar las prioridades con evidencia de uso y dependencias funcionales.

## 10. Criterios de aceptación de CHOIR-145

| Criterio | Estado | Evidencia |
|---|---|---|
| 1. Dirección visual única y consistente documentada | Cumplido (documental) | `docs/design-system.md` es la referencia central. Los tokens citados se contrastaron con `src/styles.scss` y los ratios de contraste se recalcularon. |
| 2. Diferencias entre dominios corregidas o justificadas | Cumplido | El ambiente artístico se documenta como implementado solo en Registro. Se corrigieron las contradicciones sobre integrantes de Mi coro, alternativa de teclado de Formaciones, ruta de verificación y pendientes ya cubiertos por CHOIR-141 a CHOIR-144. |
| 3. Decisiones reflejadas en `design-discovery.md` y `design-system.md` | Cumplido | Secciones 2, 3.4, 8, 9 y 10 de este documento; secciones iniciales, 2, 5, 6, 9 y 11 de `design-system.md`. |
| 4. Distinción entre lo validado en pantallas reales y lo conceptual | Cumplido en la documentación | Tabla «Evidencia de validación por tipo» y estados por módulo. La validación en dispositivo real y con datos reales sigue pendiente y debe registrarse como trabajo pendiente. |

Quedan pendientes de validación manual real: medición de contraste con herramienta (CHOIR-140), validación con tecnologías de asistencia (CHOIR-137, CHOIR-138, CHOIR-139), validación en dispositivo real (CHOIR-129) y validación con datos reales de Mi coro, Conciertos y Formaciones.

### Verificaciones internas (no son criterios oficiales de CHOIR-145)

- **Sin contradicciones documentales comprobables:** se contrastaron las afirmaciones sobre rutas, integrantes, teclado, foco y archivos citados con el código y entre los cuatro documentos. Esta comprobación no constituye una revisión semántica exhaustiva.
- **Verificación técnica del cambio documental:** `git diff --check` debe finalizar sin errores y los cambios de este ajuste deben limitarse a la documentación.
