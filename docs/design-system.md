# CHOIR — Sistema de diseño propuesto

Estado: propuesta inicial para CHOIR-124.

Este documento define una dirección visual y un conjunto inicial de criterios. Los valores son una propuesta de diseño, no una descripción de los estilos actualmente implementados.

## 1. Principios

1. Identidad artística: transmitir música, armonía y dirección coral.
2. Claridad operativa: facilitar las tareas cotidianas del director.
3. Consistencia: mantener patrones reconocibles entre módulos.
4. Accesibilidad: priorizar contraste, legibilidad y navegación.
5. Responsividad: contemplar escritorio, tablet y móvil.
6. Moderación: reservar los recursos decorativos para momentos donde aporten valor.

## 2. Ambientes visuales

### 2.1 Ambiente artístico

Se utilizará en presentaciones, destacados y experiencias visuales.

Paleta propuesta:

| Token | Valor | Uso |
|---|---|---|
| `--choir-night` | `#00102A` | Fondo azul profundo |
| `--choir-night-secondary` | `#142747` | Superficies oscuras secundarias |
| `--choir-gold` | `#D8B879` | Acentos y detalles |
| `--choir-ivory` | `#F5F1E8` | Texto o superficies claras |
| `--choir-white` | `#FFFFFF` | Texto de alto contraste |

### 2.2 Ambiente operativo

Se utilizará en formularios, gestión, tablas y tareas frecuentes.

Paleta propuesta:

| Token | Valor | Uso |
|---|---|---|
| `--choir-page` | `#FCFBF8` | Fondo general |
| `--choir-surface` | `#FFFFFF` | Tarjetas y paneles |
| `--choir-ink` | `#252B25` | Texto principal |
| `--choir-muted` | `#747A70` | Texto secundario |
| `--choir-line` | `#E9E8E1` | Bordes y separadores |
| `--choir-accent` | `#456B4C` | Acento operativo actual |

La paleta operativa se conserva como punto de partida para evitar una sustitución visual innecesaria.

La convivencia entre ambos ambientes deberá mantener contraste suficiente y una identidad reconocible.

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

## 5. Componentes base

El sistema deberá definir criterios compartidos para:

### Botones

Variantes:
- Primario.
- Secundario.
- Terciario o de texto.
- Peligro.

Estados:
- Normal.
- Hover.
- Focus.
- Disabled.
- Loading.

### Tarjetas y paneles

Deben mantener:
- Espaciado consistente.
- Bordes y superficies coherentes.
- Jerarquía clara entre título, descripción y acciones.
- Comportamiento responsive.

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

## 9. Aplicación por módulo

| Módulo | Ambiente predominante | Consideraciones |
|---|---|---|
| Inicio | Artístico | Identidad, presentación y accesos |
| Mi coro | Operativo | Gestión clara y estados consistentes |
| Conciertos | Mixto | Presentación artística y gestión operativa |
| Formaciones | Operativo con detalles artísticos | Escenario, posiciones y controles |
| Transiciones | Mixto | Visualización de movimiento y métricas |
| Ingresar y registro | Operativo | Simplicidad y legibilidad |

## 10. Reglas de implementación futura

- No duplicar tokens entre componentes.
- Centralizar los valores compartidos.
- Evitar estilos globales específicos de una sola pantalla.
- Mantener estilos propios cerca del componente cuando corresponda.
- No introducir dependencias visuales sin justificación.
- Mantener compatibilidad con la arquitectura Angular existente.
- No modificar contratos backend desde una tarea de diseño.
- Incorporar pruebas visuales o de componentes cuando el alcance lo requiera.

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
