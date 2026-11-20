# CHOIR — Sistema de diseño

Estado: documentación reconciliada con la implementación observada en `develop` para CHOIR-145.

Este documento reúne los fundamentos visuales de CHOIR y distingue los elementos implementados de las propuestas conceptuales y las decisiones pendientes de validación. La existencia de tokens o patrones compartidos no implica que todas las pantallas los utilicen de manera uniforme ni que se haya certificado su accesibilidad.

## 1. Estado de las decisiones

Se utilizan las siguientes categorías:

- **Implementado y verificado estáticamente:** existe en los estilos o componentes actuales.
- **Implementado, con validación pendiente:** existe en código, pero falta comprobar su comportamiento, contraste o cobertura en todos los contextos.
- **Aprobado pendiente de implementación:** decisión aceptada que todavía no está reflejada en la interfaz.
- **Conceptual:** alternativa visual o criterio exploratorio que no debe describirse como funcionalidad existente.
- **Descartado o reemplazado:** propuesta anterior que ya no representa el estado vigente.

La fuente de verdad para los tokens compartidos es `src/styles.scss`. Los patrones compartidos de botones, paneles y avisos están en `src/shared-patterns.scss`.

## 2. Principios

1. Identidad artística: transmitir música, armonía y dirección coral.
2. Claridad operativa: facilitar las tareas cotidianas del director.
3. Consistencia: mantener patrones reconocibles entre módulos.
4. Accesibilidad: priorizar contraste, legibilidad y navegación.
5. Responsividad: contemplar escritorio, tablet y móvil.
6. Moderación: reservar los recursos decorativos para momentos donde aporten valor.

Los ambientes artístico y operativo comparten identidad, tipografía, espaciado y criterios de interacción. No es necesario que todos los módulos tengan la misma composición o densidad visual.

## 3. Ambientes visuales

### 3.1 Ambiente artístico

Dirección visual conceptual para presentaciones, destacados y experiencias visuales.

| Token | Valor implementado | Uso previsto |
|---|---|---|
| `--choir-night` | `#00102A` | Fondo azul profundo |
| `--choir-night-secondary` | `#142747` | Superficies oscuras secundarias |
| `--choir-gold` | `#D8B879` | Acentos y detalles |
| `--choir-ivory` | `#F5F1E8` | Texto o superficies claras |
| `--choir-white` | `#FFFFFF` | Texto o superficies de alto contraste |

Los tokens están definidos en `src/styles.scss`. Su aplicación uniforme en todas las pantallas artísticas no se considera verificada por la sola existencia de las variables.

### 3.2 Ambiente operativo

Base visual implementada para formularios, gestión y tareas frecuentes.

| Token | Valor implementado | Uso |
|---|---|---|
| `--choir-page` | `#FCFBF8` | Fondo general |
| `--choir-surface` | `#FFFFFF` | Tarjetas y paneles |
| `--choir-ink` | `#252B25` | Texto principal |
| `--choir-muted` | `#6B7168` | Texto secundario |
| `--choir-line` | `#E9E8E1` | Líneas, separadores y bordes de patrones compartidos; contraste pendiente de validación |
| `--choir-accent` | `#456B4C` | Acento operativo |
| `--choir-accent-dark` | `#34533A` | Acento oscuro para interacción |
| `--choir-accent-soft` | `#EDF2EB` | Superficies suaves y realces |

`--choir-muted` tiene como valor vigente `#6B7168`. El valor anterior `#747A70` queda reemplazado y no debe documentarse como token actual.

## 4. Bordes, separadores y foco

No todos los bordes cumplen la misma función. La documentación distingue:

1. **Bordes decorativos y separadores:** pueden tener contraste bajo porque organizan visualmente contenido que sigue siendo comprensible sin esa línea.
2. **Límites de controles interactivos:** deben permitir identificar visualmente el control y su estado. No se debe asumir que un separador tenue sirve también como borde accesible de un campo.
3. **Indicadores de foco:** deben identificar claramente qué elemento recibe el foco del teclado.

El token `--choir-line` (`#E9E8E1`) está implementado como línea y separador tenue. No debe presentarse como solución validada para todos los límites de controles.

El valor `#8A9086` fue considerado como candidato para bordes de controles, pero no está aprobado como token ni debe adoptarse sin medición y validación.

El foco global está implementado en `src/styles.scss` mediante:

- `--focus-ring: 3px solid var(--choir-accent-dark)`.
- `outline-offset: 3px`.
- Selectores para enlaces, botones, inputs, `textarea` y `select`.

Los patrones compartidos también definen foco visible para botones y paneles enfocables.

La auditoría de contraste de combinaciones, controles y estados se mantiene vinculada a CHOIR-140. No se declara conformidad global con WCAG 2.2 AA.

## 5. Tipografía

### 5.1 Tokens implementados

`src/styles.scss` define:

| Token | Valor |
|---|---|
| `--font-family-base` | Inter y alternativas sans-serif del sistema |
| `--font-family-serif` | Georgia, serif |
| `--font-weight-regular` | 400 |
| `--font-weight-medium` | 500 |
| `--font-weight-bold` | 700 |
| `--font-size-xs` | 12 px |
| `--font-size-sm` | 14 px |
| `--font-size-base` | 16 px |
| `--font-size-lg` | 18 px |
| `--font-size-xl` | 20 px |
| `--line-height-base` | 1.5 |

### 5.2 Criterios de aplicación

Interfaz:
- Formularios.
- Tablas y listados.
- Navegación.
- Etiquetas.
- Mensajes.
- Controles.

Títulos artísticos:
- Presentaciones.
- Portadas.
- Destacados.
- Encabezados de experiencias visuales.

Georgia está disponible como token serif. Su utilización en todas las pantallas artísticas es una decisión de aplicación visual y no una cobertura verificada.

## 6. Recursos gráficos

Se proponen como recursos conceptuales:

- Líneas curvas inspiradas en ondas sonoras.
- Formas orbitales y trayectorias sutiles.
- Partículas doradas en fondos artísticos.
- Composiciones geométricas relacionadas con armonía y agrupación.

Criterios:

- No utilizar decoración detrás de información que requiera lectura prolongada.
- Evitar animaciones innecesarias.
- Respetar `prefers-reduced-motion`.
- No depender de imágenes para transmitir información funcional.
- Mantener los recursos gráficos fuera del área principal de interacción cuando puedan distraer.

Estos recursos no deben describirse como componentes compartidos implementados si no existe evidencia en el código.

## 7. Espaciado y forma

### 7.1 Espaciado implementado

`src/styles.scss` define una escala basada en múltiplos de 4:

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

### 7.2 Radios implementados

| Token | Valor |
|---|---:|
| `--radius-sm` | 4 px |
| `--radius-md` | 8 px |
| `--radius-lg` | 12 px |
| `--radius-full` | 9999 px |

Los valores anteriores son los tokens compartidos reales. No están implementados como tokens globales los rangos conceptuales de 16–24 px para tarjetas o paneles destacados.

## 8. Componentes y patrones compartidos

Los patrones compartidos observados se encuentran en `src/shared-patterns.scss`.

### 8.1 Botones

Clases compartidas:

- `.button`
- `.button-primary`
- `.button-secondary`
- `.button-danger`

Estados contemplados por los estilos:

- Default.
- Hover.
- Active.
- Focus-visible.
- Disabled.
- Loading o waiting.

El estado de carga utiliza `aria-busy="true"` o `data-loading="true"`. La lógica de bloqueo y la confirmación de la operación corresponden al componente consumidor.

No se debe asumir que todas las pantallas utilizan exclusivamente estas clases ni que existe una variante compartida para cada estilo conceptual.

### 8.2 Paneles y avisos

Patrones compartidos:

- `.panel`
- `.notice-card`

Ambos tienen estilos de superficie, borde, espaciado y foco visible. Sus dimensiones y radios actuales son los definidos en `src/shared-patterns.scss`, no los tamaños conceptuales de propuestas anteriores.

### 8.3 Formularios

Criterios de diseño:

- Etiquetas visibles.
- Ayudas contextuales cuando correspondan.
- Errores asociados al campo.
- Estados disabled y loading.
- Foco visible.
- Mensajes comprensibles.

La cobertura de estos criterios debe verificarse por pantalla y por control. No se considera garantizada por la existencia de estilos globales.

### 8.4 Estados de pantalla

Los patrones deben diferenciar, cuando el flujo real los contemple:

- Carga.
- Vacío.
- Error.
- Éxito.
- Falta de permisos.

No representar como disponibles estados u operaciones que no existan en el módulo correspondiente. Los skeletons no deben simular datos que todavía no fueron recibidos del backend.

### 8.5 Navegación

Criterios:

- Ubicación clara dentro de la aplicación.
- Diferenciación del módulo activo.
- Acceso consistente a las acciones disponibles.
- Adaptación a dispositivos móviles.

La composición concreta puede variar entre el sitio público y el espacio autenticado.

## 9. Tablas y listados

### Estructura

- Utilizar encabezados claros y descriptivos.
- Mantener jerarquía visual entre encabezados, datos y acciones.
- Alinear valores según su naturaleza.
- Evitar columnas que repitan información.
- Agrupar las acciones de cada registro en una ubicación predecible.
- No utilizar únicamente el color para destacar una fila o un estado.

### Comportamiento responsive

- En escritorio, utilizar tablas cuando faciliten la comparación.
- En móvil, priorizar filas compactas o tarjetas cuando la tabla no resulte legible.
- No ocultar información esencial.
- Evitar que el desplazamiento horizontal sea el único medio para consultar datos importantes.
- Mantener las acciones accesibles sin depender del hover.

Estos son criterios de diseño; no implican que todos los módulos tengan tablas, filtros, paginación u ordenamiento implementados.

## 10. Diálogos y confirmaciones

### Estructura

Un diálogo debe mantener:

- Título que describa su propósito.
- Contenido breve y comprensible.
- Acciones claramente identificadas.
- Acción principal diferenciada.
- Acción secundaria para cancelar o volver cuando corresponda.

### Comportamiento

- El foco inicial debe ubicarse en un elemento apropiado.
- La navegación por teclado debe permanecer dentro del diálogo mientras esté abierto.
- Escape debe cerrar el diálogo cuando la operación lo permita.
- Al cerrar, el foco debe regresar al control que lo abrió.
- No utilizar diálogos para información que pueda comunicarse de forma menos intrusiva.

### Acciones destructivas

- Explicar qué operación se va a realizar.
- Identificar claramente la acción destructiva.
- Evitar botones ambiguos como «Aceptar» cuando sea posible describir la acción.
- No presentar una confirmación como garantía de que la operación se completó.

Estos criterios no afirman que exista un componente de diálogo compartido para toda la aplicación.

## 11. Alertas y notificaciones

### Variantes

Diferenciar:

- Información.
- Éxito.
- Advertencia.
- Error.

### Contenido y accesibilidad

- Utilizar mensajes breves y específicos.
- Describir el resultado o problema en lenguaje comprensible.
- Incluir una acción de recuperación cuando exista.
- Evitar mensajes técnicos internos.
- No comunicar el significado exclusivamente mediante color o iconografía.
- Utilizar una región `aria-live` apropiada cuando el mensaje deba anunciarse sin interrumpir la tarea.
- No anunciar repetidamente el mismo mensaje.
- Mantener visibles las notificaciones temporales el tiempo suficiente para leerlas.
- No depender exclusivamente de un toast que desaparece para comunicar información importante.

La implementación concreta debe comprobarse en cada flujo.

## 12. Iconografía

### Criterios visuales

- Mantener una familia de iconos consistente.
- Evitar mezclar estilos de trazo, relleno y proporciones sin razón funcional.
- Utilizar tamaños coherentes según el contexto.
- Reservar los iconos decorativos para acompañar contenido.
- No utilizar iconos como sustituto de etiquetas cuando la acción resulte ambigua.

### Accesibilidad

- Los iconos decorativos deben quedar fuera del árbol de accesibilidad.
- Los controles representados únicamente mediante iconos deben tener un nombre accesible.
- Las acciones deben poder identificarse sin depender de la forma o el color.
- Mantener áreas interactivas adecuadas para uso táctil.

La selección definitiva de una biblioteca de iconos compartida no se considera aprobada por este documento.

## 13. Estados de interacción

Los componentes interactivos deben definir los estados que correspondan a su función:

| Estado | Criterio |
|---|---|
| Default | Presentación inicial y comportamiento normal |
| Hover | Realimentación al pasar el puntero, cuando corresponda |
| Focus-visible | Foco claramente visible mediante teclado |
| Active | Indicación de interacción o selección activa |
| Disabled | Estado no disponible, identificable y no ambiguo |
| Loading | Operación en curso y prevención de acciones duplicadas cuando corresponda |
| Error | Problema asociado al control o a la operación |
| Success | Confirmación de resultado exitoso |
| Empty | Ausencia de contenido con explicación contextual |
| Permission | Acción o contenido no disponible por permisos |

Reglas:

- No utilizar hover como único indicador de una acción.
- Mantener foco visible en componentes personalizados.
- Diferenciar selección de foco.
- No comunicar estados exclusivamente mediante color.
- Evitar cambios bruscos de disposición.
- Respetar `prefers-reduced-motion`.
- No representar como exitosa una operación que todavía no fue confirmada.

La tabla define criterios. No significa que todos los estados estén implementados en todos los componentes.

## 14. Accesibilidad

Antes de aprobar un patrón o componente, verificar:

- Contraste de texto, iconos, bordes y controles.
- Foco visible y orden lógico de navegación.
- Nombre, rol y estado accesibles.
- Uso mediante teclado sin depender del puntero.
- Asociación entre campos y mensajes de validación.
- Anuncios de carga, errores y resultados dinámicos.
- Comportamiento con ampliación de texto y reflow.
- Tamaño y separación de objetivos táctiles.
- Compatibilidad con lectores de pantalla.

WCAG 2.2 AA es el objetivo de referencia. Los valores de contraste y dimensiones deben medirse sobre los componentes implementados. Este documento no certifica el cumplimiento global.

Los hallazgos y las verificaciones de contraste pendientes deben mantenerse vinculados a CHOIR-140 y a los tickets de corrección relacionados.

## 15. Responsive

Criterios:

- **Escritorio:** aprovechar el espacio sin dispersar información.
- **Tablet:** reorganizar paneles y controles sin perder jerarquía.
- **Móvil:** priorizar tareas principales, controles táctiles y lectura vertical.

La adaptación debe validarse por pantalla, estado y flujo. La existencia de media queries no demuestra por sí sola que una experiencia sea correcta.

## 16. Aplicación por módulo

| Módulo | Ambiente predominante | Estado y consideraciones |
|---|---|---|
| Inicio | Artístico | Pantalla implementada; propuestas de reorganización visual conceptuales |
| Ingresar | Operativo | Formulario funcional; propuesta de reorganización visual conceptual |
| Registro | Operativo con detalles artísticos | Formulario frontend implementado; disponibilidad del alta depende de configuración y servicio de correo |
| Mi coro | Operativo | Gestión de coros y miembros implementada |
| Conciertos | Operativo con identidad artística | Pantalla informativa en preparación; no existe aún gestión operativa de conciertos |
| Formaciones | Operativo con detalles artísticos | Editor implementado; la formación depende del contexto del concierto |
| Transiciones | Mixto | Propuesta conceptual; no representa una funcionalidad implementada |

La dirección común no obliga a que todos los módulos tengan la misma composición, densidad ni jerarquía secundaria.

## 17. Reglas de implementación futura

- No duplicar tokens entre componentes.
- Centralizar los valores compartidos.
- Evitar estilos globales específicos de una sola pantalla.
- Mantener estilos propios cerca del componente cuando corresponda.
- No introducir dependencias visuales sin justificación.
- Mantener compatibilidad con la arquitectura Angular existente.
- No modificar contratos backend desde una tarea de diseño.
- Incorporar pruebas visuales o de componentes cuando el alcance lo requiera.

Toda implementación debe contar con alcance, dependencias y criterios de aceptación definidos en Jira.

## 18. Resumen de madurez

| Área | Estado |
|---|---|
| Tokens de color, tipografía, espaciado y radios | Implementados en `src/styles.scss` |
| Patrones de botones, paneles y avisos | Implementados en `src/shared-patterns.scss` |
| Foco global para enlaces, botones, inputs, `textarea` y `select` | Implementado; validación por pantalla pendiente |
| Bordes de paneles, avisos, botones secundarios y separadores | Implementados mediante `--choir-line`; contraste pendiente de validación |
| Borde de control con contraste validado para todos los contextos | Pendiente de auditoría |
| `#8A9086` como token de borde de control | Candidato no aprobado |
| Ambientes artístico y operativo | Dirección visual documentada; aplicación integral pendiente |
| Composiciones visuales de módulos | Conceptuales o sujetas a validación según el documento de cada módulo |
| Conformidad global WCAG 2.2 AA | No declarada |

Este sistema de diseño describe el estado documental y técnico observado. No autoriza por sí mismo cambios de CSS, componentes Angular, contratos backend ni funcionalidades.
