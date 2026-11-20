# CHOIR — Sistema de diseño

Estado: sistema de diseño consolidado (CHOIR-125 / CHOIR-145).

Este documento define la dirección visual canónica, los tokens de diseño, las pautas de accesibilidad y los criterios de consistencia entre los dominios operativos y artísticos de CHOIR. Los valores reflejan la implementación real en `src/styles.scss` y `src/shared-patterns.scss`, alineados con las propuestas validadas en CHOIR-141 y las propuestas conceptuales de CHOIR-142 a CHOIR-144.

## 1. Principios

1. Identidad artística: transmitir música, armonía y dirección coral mediante la sobriedad del azul nocturno y detalles dorados.
2. Claridad operativa: facilitar las tareas cotidianas del director coral sobre superficies limpias, claras y de alto contraste.
3. Consistencia: mantener patrones y tokens compartidos reconocibles y reutilizables entre todos los módulos.
4. Accesibilidad integral: garantizar contraste (WCAG 2.2 AA), foco visible en todos los controles, navegación multimodal (puntero y teclado) y respeto estricto por movimiento reducido.
5. Responsividad: diseñar composiciones específicas para escritorio, tablet y móvil con soporte táctil y sin desbordamientos horizontales.
6. Moderación y legibilidad: reservar los recursos decorativos para momentos que aporten valor sin interferir en la lectura prolongada ni en la gestión técnica.

## 2. Ambientes visuales y tokens de color

El sistema articula dos ambientes coordinados que comparten la misma escala de espaciado, tipografía base y componentes:

### 2.1 Ambiente artístico

Se utiliza en presentaciones, destacados, cabecera/hero de Inicio y experiencias visuales.

| Token Canónico | Valor | Ratio vs Superficie | Uso Principal |
|---|---|:---:|---|
| `--choir-night` | `#00102A` | Base | Fondo azul profundo para áreas artísticas |
| `--choir-night-secondary` | `#142747` | — | Superficies oscuras secundarias y tarjetas artísticas |
| `--choir-gold` | `#D8B879` | 9.98:1 vs night | Acentos dorados, detalles musicales y realces |
| `--choir-ivory` | `#F5F1E8` | 16.82:1 vs night | Texto o superficies claras sobre fondos nocturnos |
| `--choir-white` | `#FFFFFF` | 18.96:1 vs night | Texto y contraste máximo sobre azul nocturno |

### 2.2 Ambiente operativo

Se utiliza en formularios, gestión de agrupaciones, administración de integrantes, tablas, escenografía y tareas cotidianas.

| Token Canónico | Valor | Ratio de Contraste | Uso Principal |
|---|---|:---:|---|
| `--choir-page` | `#FCFBF8` | Base | Fondo general operativo de la aplicación |
| `--choir-surface` | `#FFFFFF` | Base | Fondo de tarjetas, paneles y modales |
| `--choir-ink` | `#252B25` | 13.99:1 vs page / 14.47:1 vs surface | Texto principal (WCAG AA $\ge 4.5:1$) |
| `--choir-muted` | `#6B7168` | 4.85:1 vs page / 5.02:1 vs surface | Texto secundario y etiquetas auxiliares (WCAG AA $\ge 4.5:1$) |
| `--choir-line` | `#E9E8E1` | — | Bordes y líneas divisorias |
| `--choir-accent` | `#456B4C` | 5.86:1 vs page / 6.07:1 vs surface | Acento operativo primario y botones primarios |
| `--choir-accent-dark` | `#34533A` | 8.30:1 vs page / 8.59:1 vs surface | Hover y active de acentos; color base del indicador de foco |
| `--choir-accent-soft` | `#EDF2EB` | — | Fondos suaves para badges, píldoras de estado y selecciones |

### 2.3 Colores semánticos

| Token | Valor | Uso |
|---|---|---|
| `--color-success` | `#28A745` | Confirmación y operaciones exitosas |
| `--color-warning` | `#FFC107` | Advertencias de estado o atención requerida |
| `--color-danger` | `#C82333` | Errores críticos y acciones destructivas (`.button-danger`) |
| `--color-info` | `#17A2B8` | Mensajes informativos y notas contextuales |

### 2.4 Foco visible accesible

| Token | Definición | Ratio de Contraste | Cobertura |
|---|---|:---:|---|
| `--focus-ring` | `3px solid var(--choir-accent-dark)` (`#34533A`) | 6.99:1 a 8.59:1 | Enlaces, botones, inputs, selects y textareas con `outline-offset: 3px` |

### 2.5 Variables de compatibilidad retroactiva

Para garantizar la interoperabilidad con componentes existentes sin regresiones, las variables heredadas se mapean directamente a los tokens canónicos en `src/styles.scss`:
`--ink: var(--choir-ink);`, `--muted: var(--choir-muted);`, `--accent: var(--choir-accent);`, `--accent-dark: var(--choir-accent-dark);`, `--accent-soft: var(--choir-accent-soft);`, `--line: var(--choir-line);`, `--surface: var(--choir-surface);`, `--page: var(--choir-page);`.

## 3. Tipografía

### Interfaz

Se propone mantener una tipografía sans-serif moderna y legible, utilizando la familia actualmente definida en el frontend: Inter y alternativas del sistema.

Aplicaciones:
- Formularios.
- Tablas.
- Navegación.
- Etiquetas.
- Mensajes.
- Controles.

### Títulos artísticos

Se propone utilizar una tipografía serif elegante, por ejemplo Georgia como alternativa inicial.

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
- `Default`: dimensiones base, padding uniforme (`var(--space-4)`), min-height 47px y radio `var(--radius-sm)`.
- `Hover`: elevación sutil `translateY(-2px)` protegida para no activarse en controles deshabilitados ni en carga (`:hover:not(:disabled):not([aria-disabled="true"]):not([aria-busy="true"])`).
- `Active`: presión `translateY(0)` con oscurecimiento de superficie.
- `Focus-visible`: anillo accesible `outline: var(--focus-ring)` con `outline-offset: 3px`.
- `Disabled`: `opacity: 0.55`, `cursor: not-allowed` y `transform: none !important`.
- `Loading / Carga`: soporte semántico para `[aria-busy="true"]` y `[data-loading="true"]`, con cursor `wait` e inhibición de eventos de puntero para evitar reenvíos accidentales.

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

## 6. Espaciado y forma

Se propone una escala base de espaciado basada en múltiplos de 4:

| Token | Valor |
|---|---:|
| `space-1` | 4 px |
| `space-2` | 8 px |
| `space-3` | 12 px |
| `space-4` | 16 px |
| `space-5` | 20 px |
| `space-6` | 24 px |
| `space-8` | 32 px |
| `space-10` | 40 px |
| `space-12` | 48 px |

Radios propuestos:
- Controles pequeños: 8 px.
- Botones y campos: 10–12 px.
- Tarjetas: 16–18 px.
- Paneles destacados: 20–24 px.

Estos valores deberán validarse con las pantallas reales antes de convertirse en tokens definitivos.

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

| Módulo | Ambiente | Estado de Implementación | Criterios y Propuestas Asociadas |
|---|---|---|---|
| **Inicio** | Artístico con accesos operativos | **Implementada y validada** | Hero azul profundo, ilustración abstracta accesible, navegación clara y accesos directos (CHOIR-141). |
| **Ingresar y Registro** | Operativo | **Implementada y validada** | Formulario funcional de login y registro integrado con verificación de correo (`register.page.ts`, `verify-email.page.ts`). |
| **Mi coro** | Operativo | **Implementada y validada** | Administración de coros y gestión completa de coreutas con asignación de cuerdas (`ChoirSingersComponent` / CHOIR-151). |
| **Conciertos** | Mixto | **Módulo en preparación** | Presentación honesta sin datos ficticios con propuesta visual CHOIR-142. |
| **Formaciones** | Operativo con escenario interactivo | **Implementada con propuesta conceptual** | Escenario funcional con soporte multimodal (puntero + teclado CHOIR-37). Propuesta conceptual CHOIR-143 para iteraciones de layout. |
| **Transiciones** | Mixto | **Propuesta conceptual** | Exploración estática de origen y destino (CHOIR-144). No implementada en frontend. |

## 10. Reglas de consistencia entre dominios

- Reutilización de tokens canónicos: todo componente debe utilizar `--choir-*` o sus alias estándar.
- Separación de ambientes: las áreas de trabajo continuo y lectura de datos extensos (coreutas, configuración, formularios) deben utilizar el ambiente operativo claro; el azul nocturno y dorado se reservan para presentación, hero y momentos artísticos.
- Jerarquía de interacción: los botones primarios denotan avance (`.button-primary`), los secundarios mantienen la neutralidad sobre fondo blanco (`.button-secondary`) y las acciones destructivas requieren advertencia y confirmación antes de aplicar `.button-danger`.
- Accesibilidad multimodal: ninguna interacción crítica en ningún dominio debe depender exclusivamente de eventos táctiles o de ratón. Todo control debe ser operable por teclado.

## 11. Estado de aprobación

Esta es una propuesta inicial de CHOIR-124.

Antes de implementarla se deberán validar:
- Paleta definitiva.
- Tipografías.
- Componentes base.
- Aplicación de los dos ambientes.
- Propuestas visuales de las pantallas principales.
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
