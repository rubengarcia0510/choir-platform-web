# CHOIR — Sistema de diseño

Estado: sistema de diseño consolidado como referencia documental (CHOIR-125 / CHOIR-145). No es una aprobación definitiva ni una certificación de accesibilidad.

Este documento define la dirección visual canónica, los tokens de diseño, las pautas de accesibilidad y los criterios de consistencia entre los dominios operativos y artísticos de CHOIR. Los valores de tokens y patrones se contrastaron con `src/styles.scss` y `src/shared-patterns.scss`, con las propuestas de CHOIR-141 y con las propuestas conceptuales de CHOIR-142 a CHOIR-144.

### Alcance de las afirmaciones

- **Implementado:** comprobable en el código de `develop` (`src/styles.scss`, `src/shared-patterns.scss`, `src/app/pages.scss` y los componentes citados).
- **Propuesta documentada:** diseño descrito en `design-proposals.md` y `design-module-references.md`. No es una pantalla operativa.
- **Concepto no implementado:** Transiciones y las evoluciones futuras de Conciertos y Formaciones.
- **Validación manual pendiente:** medición de contraste con herramienta (CHOIR-140), teclado, foco y formularios (CHOIR-137), escenario de Formaciones (CHOIR-138), nombre accesible de la ilustración de Inicio (CHOIR-139) y mediciones responsive, zoom y objetivos táctiles (CHOIR-129), según `accessibility-audit.md` y `responsive-visual-validation.md`.

Los ratios de contraste de este documento son cálculos sobre los valores hexadecimales con la fórmula de luminancia relativa de WCAG. No son mediciones con herramienta externa ni certifican conformidad WCAG 2.2 AA.

## 1. Principios

1. Identidad artística: transmitir música, armonía y dirección coral mediante la sobriedad del azul nocturno y detalles dorados.
2. Claridad operativa: facilitar las tareas cotidianas del director coral sobre superficies limpias, claras y de alto contraste.
3. Consistencia: mantener patrones y tokens compartidos reconocibles y reutilizables entre todos los módulos.
4. Accesibilidad: tomar WCAG 2.2 AA como objetivo de referencia, con contraste calculado, foco visible global, alternativa de teclado en el escenario de Formaciones y reglas de movimiento reducido. La conformidad no está certificada y sus validaciones manuales siguen pendientes (ver «Alcance de las afirmaciones» y la sección 17).
5. Responsividad: diseñar composiciones específicas para escritorio, tablet y móvil. No se detectó desbordamiento horizontal en la medición emulada de `responsive-visual-validation.md`; la validación en dispositivo real sigue pendiente.
6. Moderación y legibilidad: reservar los recursos decorativos para momentos que aporten valor sin interferir en la lectura prolongada ni en la gestión técnica.

## 2. Ambientes visuales y tokens de color

El sistema articula dos ambientes coordinados que comparten la misma escala de espaciado, tipografía base y componentes:

### 2.1 Ambiente artístico

Implementado únicamente en el panel artístico de Registro (`src/app/auth/register.page.scss`); el resto de las pantallas implementadas usa el ambiente operativo claro, incluido el Inicio actual. Su uso en presentaciones y destacados es una propuesta documentada.

| Token Canónico | Valor | Contraste calculado | Uso Principal |
|---|---|:---:|---|
| `--choir-night` | `#00102A` | Base | Fondo azul profundo para áreas artísticas |
| `--choir-night-secondary` | `#142747` | — | Superficies oscuras secundarias y tarjetas artísticas |
| `--choir-gold` | `#D8B879` | 9.98:1 vs night | Acentos dorados, detalles musicales y realces |
| `--choir-ivory` | `#F5F1E8` | 16.82:1 vs night | Texto o superficies claras sobre fondos nocturnos |
| `--choir-white` | `#FFFFFF` | 18.96:1 vs night | Texto y contraste máximo sobre azul nocturno |

### 2.2 Ambiente operativo

Se utiliza en formularios, gestión de agrupaciones, administración de integrantes, tablas, escenografía y tareas cotidianas.

| Token Canónico | Valor | Contraste calculado | Uso Principal |
|---|---|:---:|---|
| `--choir-page` | `#FCFBF8` | Base | Fondo general operativo de la aplicación |
| `--choir-surface` | `#FFFFFF` | Base | Fondo de tarjetas, paneles y modales |
| `--choir-ink` | `#252B25` | 13.99:1 vs page / 14.47:1 vs surface | Texto principal; el cálculo supera 4.5:1 |
| `--choir-muted` | `#6B7168` | 4.85:1 vs page / 5.02:1 vs surface | Texto secundario y etiquetas auxiliares; el cálculo supera 4.5:1. Reemplaza al valor anterior `#747A70`, que no debe documentarse como vigente |
| `--choir-line` | `#E9E8E1` | 1.23:1 vs surface | Bordes y líneas divisorias. No se asume suficiente como límite de controles; su contraste queda pendiente de validación (CHOIR-140) |
| `--choir-accent` | `#456B4C` | 5.86:1 vs page / 6.07:1 vs surface | Acento operativo primario y botones primarios |
| `--choir-accent-dark` | `#34533A` | 8.30:1 vs page / 8.59:1 vs surface | Hover y active de acentos; color base del indicador de foco |
| `--choir-accent-soft` | `#EDF2EB` | — | Fondos suaves para badges, píldoras de estado y selecciones |

### 2.3 Colores semánticos

Solo `--color-danger` se usa en componentes (`.button-danger`). `--color-success`, `--color-warning` y `--color-info` están definidos en `src/styles.scss` sin uso verificado en componentes.

| Token | Valor | Uso |
|---|---|---|
| `--color-success` | `#28A745` | Confirmación y operaciones exitosas |
| `--color-warning` | `#FFC107` | Advertencias de estado o atención requerida |
| `--color-danger` | `#C82333` | Errores críticos y acciones destructivas (`.button-danger`) |
| `--color-info` | `#17A2B8` | Mensajes informativos y notas contextuales |

### 2.4 Foco visible accesible

| Token | Definición | Ratio de Contraste | Cobertura |
|---|---|:---:|---|
| `--focus-ring` | `3px solid var(--choir-accent-dark)` (`#34533A`) | 6.99:1 a 8.59:1 sobre página, superficie, `--choir-accent-soft` y `--choir-line` (cálculo) | Enlaces, botones, inputs, selects y textareas con `outline-offset: 3px` |

Excepciones comprobadas en el código que no usan `--focus-ring` y cuyo contraste no se midió: los integrantes del escenario de Formaciones (`formation-stage.component.scss`, contorno de 3 px con `--accent`) y los campos de `login.page.ts` (contorno de 2 px con `--accent-soft`, junto con el borde de acento).

### 2.5 Variables de compatibilidad retroactiva

Para garantizar la interoperabilidad con componentes existentes sin regresiones, las variables heredadas se mapean directamente a los tokens canónicos en `src/styles.scss`:
`--ink: var(--choir-ink);`, `--muted: var(--choir-muted);`, `--accent: var(--choir-accent);`, `--accent-dark: var(--choir-accent-dark);`, `--accent-soft: var(--choir-accent-soft);`, `--line: var(--choir-line);`, `--surface: var(--choir-surface);`, `--page: var(--choir-page);`.

## 3. Tipografía

### Interfaz

Implementado: tipografía sans-serif definida en `--font-family-base` (Inter y alternativas del sistema), con escala `--font-size-xs` a `--font-size-xl` (12 a 20 px) y pesos 400, 500 y 700.

Aplicaciones:
- Formularios.
- Tablas.
- Navegación.
- Etiquetas.
- Mensajes.
- Controles.

### Títulos artísticos

Implementado como token `--font-family-serif` (`Georgia, serif`), con tres usos verificados en estilos. Su aplicación a títulos de presentaciones y destacados artísticos es una propuesta documentada.

Aplicaciones:
- Títulos de presentaciones.
- Portadas.
- Destacados artísticos.
- Encabezados de experiencias visuales.

La tipografía serif no debe utilizarse en textos extensos ni controles operativos.

## 4. Recursos gráficos

Se proponen:

- Líneas curvas inspiradas en ondas sonoras.
- Formas orbitales y trayectorias sutiles.
- Partículas doradas en fondos artísticos.
- Composiciones geométricas relacionadas con armonía y agrupación.

Reglas:
- No utilizar decoración detrás de información que requiera lectura prolongada.
- Evitar animaciones innecesarias.
- Respetar `prefers-reduced-motion`.
- No depender de imágenes para transmitir información funcional.
- Mantener los recursos gráficos fuera del área principal de interacción cuando puedan distraer.

## 5. Componentes base y patrones compartidos

Los patrones base se centralizan globalmente en `src/shared-patterns.scss` para su aplicación consistente en todos los componentes:

### Botones (`.button`)

Variantes autorizadas:
- Primario (`.button-primary`): fondo `--choir-accent`, texto blanco, hover `--choir-accent-dark`.
- Secundario (`.button-secondary`): borde `--choir-line`, fondo `--choir-surface`, texto `--choir-ink`.
- Peligro (`.button-danger`): fondo `--color-danger`, texto blanco para acciones destructivas confirmadas.

Estados interactivos completos:
- `Default`: altura mínima de 47 px, padding horizontal `var(--space-4)` y radio `var(--radius-sm)`.
- `Hover`: elevación sutil `translateY(-2px)` protegida para no activarse en controles deshabilitados ni en carga (`:hover:not(:disabled):not([aria-disabled="true"]):not([aria-busy="true"])`).
- `Active`: presión `translateY(0)` con oscurecimiento de superficie.
- `Focus-visible`: anillo accesible `outline: var(--focus-ring)` con `outline-offset: 3px`.
- `Disabled`: `opacity: 0.55`, `cursor: not-allowed` y `transform: none !important`.
- `Loading / Carga`: soporte visual para `[aria-busy="true"]` y `[data-loading="true"]`: cursor `wait`, opacidad completa, indicador giratorio (estático con `prefers-reduced-motion`) y sin traslación en hover. El patrón no inhibe eventos de puntero ni impide reenvíos: cada consumidor mantiene su propio bloqueo (`[disabled]` o guardas en el manejador). La adopción de estos atributos por cada botón consumidor no se verificó de forma exhaustiva.

Los estados hover y active de `.button-danger` usan valores hexadecimales fijos (`#a71d2a` y `#8c1823`), no tokens.

*Nota de alcance:* El modificador `.full-button` se reserva para bloques de layout específicos de autenticación y no forma parte de los patrones compartidos de DS-01.

### Tarjetas y paneles (`.panel`, `.notice-card`)

- `.panel`: contenedor multipropósito con borde `--choir-line`, fondo `--choir-surface`, radio `--radius-md` y padding `--space-4`.
- `.notice-card`: tarjeta de notificación o estado contextual con borde `--choir-line`, fondo `--choir-surface`, radio `--radius-sm` y padding `--space-3`.

### Formularios

Deben definir:
- Etiquetas visibles.
- Ayudas contextuales.
- Errores asociados al campo.
- Estados disabled y loading.
- Foco visible.
- Mensajes comprensibles.

### Estados de pantalla

Definir patrones comunes para:
- Carga.
- Vacío.
- Error.
- Éxito.
- Sin permisos.

Los skeletons no deben representar datos que todavía no fueron recibidos del backend.

### Navegación

Mantener:
- Ubicación clara dentro de la aplicación.
- Diferenciación del módulo activo.
- Acceso consistente a acciones principales.
- Adaptación a dispositivos móviles.

## 6. Espaciado, forma, superficies y elevación

Escala de espaciado implementada en `src/styles.scss` (múltiplos de 4):

| Token | Valor |
|---|---:|
| `--space-1` | 4 px |
| `--space-2` | 8 px |
| `--space-3` | 12 px |
| `--space-4` | 16 px |
| `--space-5` | 20 px |
| `--space-6` | 24 px |
| `--space-8` | 32 px |
| `--space-10` | 40 px |
| `--space-12` | 48 px |

Radios implementados: `--radius-sm` 4 px, `--radius-md` 8 px, `--radius-lg` 12 px (sin uso verificado) y `--radius-full` 9999 px. Los radios propuestos en el Discovery (controles pequeños 8 px, botones y campos 10–12 px, tarjetas 16–18 px, paneles destacados 20–24 px) no coinciden con esos tokens: son una propuesta y deben validarse con las pantallas reales antes de convertirse en tokens.

Superficies y bordes implementados: `.panel` y `.notice-card` usan fondo `--choir-surface`, borde de 1 px `--choir-line` y color de texto `--choir-ink`; la página usa `--choir-page`.

Elevación: `--elevation-1` tiene un uso verificado; `--elevation-2` y `--elevation-3` están definidos sin uso verificado. La duración de transición es `--transition-duration` (200 ms).

## 7. Accesibilidad

- Mantener foco visible en todos los controles interactivos.
- Verificar contraste de texto y controles.
- Utilizar etiquetas accesibles en botones de icono.
- No comunicar estados exclusivamente mediante color.
- Mantener navegación por teclado.
- Respetar movimiento reducido.
- Evitar texto demasiado pequeño.
- Asociar mensajes de error con sus respectivos campos.

## 8. Responsive

La interfaz deberá contemplar:

- Escritorio: aprovechar el espacio sin dispersar información.
- Tablet: reorganizar paneles y controles sin perder jerarquía.
- Móvil: priorizar tareas principales, controles táctiles y lectura vertical.

La adaptación debe validarse por pantalla y no solamente por la existencia de breakpoints.

## 9. Aplicación por módulo y estado de implementación

| Módulo | Ambiente | Estado de implementación | Evidencia y propuestas asociadas |
|---|---|---|---|
| **Inicio** | Operativo claro con ilustración abstracta | Implementada | `HomePage` en `src/app/pages.ts`. Propuesta CHOIR-141 contrastada con capturas reales de Android en modo móvil y con la medición emulada. La evaluación del nombre accesible de la ilustración sigue pendiente (CHOIR-139). |
| **Ingresar y Registro** | Operativo; Registro con panel artístico | Implementadas | `login.page.ts`, `register.page.ts` y `register.page.scss`; la verificación de correo está en `/registro/verificar` (`verify-email.page.ts`). Propuesta CHOIR-141 contrastada con capturas reales de Android y con la medición emulada. El alta depende de la configuración del backend, no verificada en entornos desplegados. |
| **Mi coro** | Operativo | Implementada | Coros (crear, editar, archivar) y gestión de integrantes (`ChoirSingersComponent`, CHOIR-151). La propuesta CHOIR-141 se contrastó con capturas reales antes de incorporar la gestión de integrantes; ese panel no está representado en ella ni se validó visualmente con datos reales. |
| **Conciertos** | Mixto | Módulo informativo en preparación | `ConcertsPage`, sin datos ni operaciones. Propuesta visual CHOIR-142 documentada y no implementada. |
| **Formaciones** | Operativo con escenario interactivo | Implementada; validación manual y con datos reales pendiente | Escenario con puntero y alternativa de teclado (`formation-stage.component.ts`; integrada mediante CHOIR-135 según `accessibility-audit.md`). Propuesta conceptual CHOIR-143 no implementada. |
| **Transiciones** | Mixto | Concepto no implementado | Propuesta conceptual CHOIR-144, sin código en el frontend. |

## 10. Reglas de consistencia entre dominios

- Reutilización de tokens canónicos: todo componente debe utilizar `--choir-*` o sus alias estándar.
- Separación de ambientes: las áreas de trabajo continuo y lectura de datos extensos (coreutas, configuración, formularios) deben utilizar el ambiente operativo claro; el azul nocturno y dorado se reservan para presentación, hero y momentos artísticos.
- Jerarquía de interacción: los botones primarios denotan avance (`.button-primary`), los secundarios mantienen la neutralidad sobre fondo blanco (`.button-secondary`) y las acciones destructivas requieren advertencia y confirmación antes de aplicar `.button-danger`.
- Accesibilidad multimodal: ninguna interacción crítica en ningún dominio debe depender exclusivamente de eventos táctiles o de ratón. Todo control debe ser operable por teclado.

## 11. Estado de aprobación

Este documento es la referencia consolidada por CHOIR-145. Los tokens y patrones citados están implementados en el código; no existe una aprobación definitiva de la identidad visual ni una certificación de accesibilidad.

Siguen pendientes de validación:
- Paleta definitiva, con medición de contraste mediante herramienta (CHOIR-140).
- Tipografías.
- Componentes base en todos sus estados y en cada consumidor.
- Aplicación de los dos ambientes más allá del panel artístico de Registro.
- Propuestas de Conciertos, Formaciones y Transiciones.
- Priorización del backlog frontend.

## 12. Tablas y listados

### Estructura

- Utilizar encabezados claros y descriptivos.
- Mantener una jerarquía visual entre encabezados, datos y acciones.
- Alinear los valores según su naturaleza: textos a la izquierda y valores numéricos de forma consistente.
- Evitar columnas que repitan información ya visible.
- Agrupar las acciones de cada registro en una ubicación predecible.
- No utilizar únicamente el color para destacar una fila o un estado.

### Comportamiento responsive

- En escritorio, utilizar tablas cuando faciliten la comparación de datos.
- En móvil, priorizar filas compactas o tarjetas cuando la tabla no resulte legible.
- No ocultar información esencial al adaptar una tabla.
- Evitar el desplazamiento horizontal como único medio para consultar datos importantes.
- Mantener las acciones accesibles sin depender del hover.

### Estados

Definir presentaciones consistentes para:
- Carga de datos.
- Listado disponible.
- Listado vacío.
- Búsqueda sin resultados, cuando exista búsqueda.
- Error de consulta.
- Operación en curso.
- Resultado de una operación.

La paginación, ordenamiento y filtros solo deben representarse cuando formen parte de las capacidades existentes.

## 13. Diálogos y confirmaciones

### Estructura

Un diálogo deberá mantener:
- Título que describa su propósito.
- Contenido breve y comprensible.
- Acciones claramente identificadas.
- Acción principal diferenciada.
- Acción secundaria para cancelar o volver cuando corresponda.

### Comportamiento

- El foco inicial debe ubicarse en un elemento apropiado para la tarea.
- La navegación por teclado debe permanecer dentro del diálogo mientras esté abierto.
- Escape debe cerrar el diálogo cuando la operación lo permita.
- Al cerrar, el foco debe regresar al control que lo abrió.
- Los diálogos no deben utilizarse para información que pueda comunicarse de forma menos intrusiva.

### Acciones destructivas

- Explicar qué operación se va a realizar.
- Identificar claramente la acción irreversible o destructiva.
- Evitar botones ambiguos como "Aceptar" cuando sea posible describir la acción.
- No presentar una confirmación como garantía de que la operación se completó.

## 14. Alertas y notificaciones

### Variantes

Definir patrones diferenciados para:
- Información: comunica contexto o novedades.
- Éxito: confirma una operación completada.
- Advertencia: señala una condición que requiere atención.
- Error: informa un problema y, cuando corresponda, cómo continuar.

### Contenido

- Utilizar mensajes breves y específicos.
- Describir el resultado o problema en lenguaje comprensible.
- Incluir una acción de recuperación cuando exista.
- Evitar mensajes técnicos internos o detalles de implementación.
- No comunicar el significado exclusivamente mediante color o iconografía.

### Accesibilidad y duración

- Los mensajes que deban anunciarse sin interrumpir la tarea deben utilizar una región `aria-live` apropiada.
- Los errores que requieren atención inmediata deben utilizar una semántica adecuada a su urgencia.
- No anunciar repetidamente el mismo mensaje.
- Las notificaciones temporales deben permanecer visibles el tiempo suficiente para poder leerse.
- La información importante no debe depender exclusivamente de un toast que desaparece.

## 15. Iconografía

### Criterios visuales

- Mantener una familia de iconos consistente.
- Evitar mezclar estilos de trazo, relleno y proporciones sin una razón funcional.
- Utilizar tamaños coherentes según el contexto.
- Reservar los iconos decorativos para acompañar contenido, sin competir con él.
- No utilizar iconos como sustituto de etiquetas cuando la acción pueda resultar ambigua.

### Accesibilidad

- Los iconos decorativos deben quedar fuera del árbol de accesibilidad.
- Los controles representados únicamente mediante iconos deben tener un nombre accesible.
- Las acciones deben poder identificarse sin depender de la forma o el color del icono.
- Mantener áreas interactivas adecuadas para uso táctil.

La selección definitiva de la biblioteca de iconos queda pendiente de revisar las dependencias existentes en Angular.

## 16. Estados de interacción

Todos los componentes interactivos deberán definir los estados que correspondan a su función:

| Estado | Criterio |
|---|---|
| Default | Presentación inicial y comportamiento normal |
| Hover | Realimentación visual al pasar el puntero, cuando corresponda |
| Focus | Foco claramente visible mediante teclado |
| Active | Indicación de interacción o selección activa |
| Disabled | Estado no disponible, identificable y no ambiguo |
| Loading | Operación en curso y prevención de acciones duplicadas cuando corresponda |
| Error | Problema asociado al control o a la operación |
| Success | Confirmación de resultado exitoso |
| Empty | Ausencia de contenido con explicación contextual |
| Permission | Acción o contenido no disponible por permisos |

Reglas generales:

- No utilizar hover como único indicador de una acción.
- Mantener el foco visible incluso en componentes personalizados.
- Diferenciar selección de foco.
- No comunicar estados exclusivamente mediante color.
- Evitar cambios bruscos de disposición al cambiar de estado.
- Respetar `prefers-reduced-motion`.
- No representar como exitosas operaciones que todavía no fueron confirmadas.

## 17. Validación de accesibilidad de componentes

Antes de aprobar la implementación de cada patrón, verificar:

- Contraste de texto, iconos, bordes y controles.
- Foco visible y orden lógico de navegación.
- Nombre, rol y estado accesibles.
- Uso mediante teclado sin depender del puntero.
- Asociación entre campos y mensajes de validación.
- Anuncios de carga, errores y resultados dinámicos.
- Comportamiento con ampliación de texto y reflow.
- Tamaño y separación de objetivos táctiles.
- Compatibilidad con lectores de pantalla.

El objetivo de referencia es WCAG 2.2 AA. Los valores de contraste y dimensiones deberán medirse sobre los componentes implementados; este documento no certifica su cumplimiento.

## 18. Criterios de validación del sistema

La propuesta se considerará lista para pasar a implementación cuando:

- Los dos ambientes visuales estén validados.
- Los componentes compartidos tengan variantes y estados definidos.
- Tablas, listados, diálogos y notificaciones tengan criterios documentados.
- La iconografía sea consistente y accesible.
- Los patrones responsive estén definidos por tipo de pantalla.
- Los criterios de accesibilidad tengan verificaciones asociadas.
- Las decisiones estén reflejadas en el backlog y vinculadas a tickets con alcance independiente.

Estas definiciones son criterios de diseño. No autorizan cambios de CSS, componentes Angular, contratos backend ni funcionalidades.
