# BAND — Instrucciones de implementación CHOIR-128

**Ticket:** https://rubengarcia0510.atlassian.net/browse/CHOIR-128
**Repositorio:** rubengarcia0510/choir-platform-web
**Rama de implementación:** feature/CHOIR-128-screen-accessibility-audit
**Unidad:** DS-08 — Auditoría de estados visuales y accesibilidad por pantalla.

## Objetivo

Auditar los estados visuales y la accesibilidad de las pantallas y flujos existentes de CHOIR.

El resultado debe ser una auditoría verificable, con evidencia, hallazgos priorizados y recomendaciones concretas.

No implementar rediseños ni cambios funcionales en este ticket.

## 1. Precondiciones

Antes de comenzar:

1. Leer CHOIR-128 en Jira.
2. Leer docs/tickets/FRONTEND.md.
3. Leer docs/design-discovery.md.
4. Leer docs/design-system.md.
5. Leer docs/accessibility-audit.md.
6. Leer docs/design-proposals.md.
7. Revisar el estado de CHOIR-124 y CHOIR-125.
8. Inspeccionar las pantallas y componentes reales del frontend.

Si CHOIR-124 o CHOIR-125 todavía no están integrados en main, documentar la dependencia y no asumir que sus decisiones son definitivas.

## 2. Inventario de pantallas y flujos

Identificar las pantallas y flujos realmente existentes en Angular.

Para cada pantalla registrar:

- Ruta.
- Componente responsable.
- Propósito.
- Estados funcionales existentes.
- Estados visuales disponibles.
- Elementos interactivos.
- Componentes compartidos utilizados.
- Comportamiento responsive conocido.
- Evidencia de la inspección.

No inventar pantallas, rutas ni funcionalidades.

No considerar una propuesta de diseño como una funcionalidad ya implementada.

## 3. Auditoría de estados

Evaluar, cuando corresponda a cada pantalla:

- Estado inicial.
- Carga.
- Éxito.
- Error.
- Vacío.
- Deshabilitado.
- Seleccionado.
- En foco.
- Hover.
- Validación de formularios.
- Confirmación de acciones.
- Estados de interacción y navegación.

Registrar los estados que no existan o que sean inconsistentes.

Distinguir entre:

1. Estado funcional ausente.
2. Estado funcional existente con presentación deficiente.
3. Estado que no aplica a esa pantalla.

No proponer estados que contradigan el comportamiento real del backend.

## 4. Auditoría de accesibilidad

Tomar WCAG 2.2 AA como referencia de evaluación, sin declarar conformidad global sin pruebas suficientes.

Revisar:

### Semántica

- Jerarquía de encabezados.
- Regiones y landmarks.
- Etiquetas de controles.
- Nombres accesibles.
- Roles y atributos ARIA.
- Elementos interactivos semánticos.

### Teclado

- Acceso a controles mediante teclado.
- Orden de tabulación.
- Indicador de foco visible.
- Ausencia de trampas de teclado.
- Operación de diálogos y menús.
- Interacciones de arrastre y alternativas accesibles.

### Formularios

- Labels asociados.
- Instrucciones y ayudas.
- Identificación de errores.
- Asociación de errores con campos.
- Anuncios accesibles de resultados.
- Mensajes de validación comprensibles.

### Contraste y percepción

- Contraste de texto normal.
- Contraste de texto grande.
- Contraste de componentes y estados.
- Información que no dependa únicamente del color.
- Visibilidad de foco.
- Respeto por preferencias de movimiento reducido.

### Tecnologías de asistencia

- Nombres y estados anunciables.
- Actualizaciones dinámicas.
- Mensajes de éxito y error.
- Navegación comprensible.
- Controles personalizados.

No afirmar que un lector de pantalla fue probado si no se realizó esa prueba.

## 5. Hallazgos existentes

Revisar los hallazgos ya registrados en docs/accessibility-audit.md.

En particular, reconciliar:

- Navegación por teclado y arrastre de integrantes.
- Semántica del escenario de formaciones.
- Hallazgos UX-01 a UX-07.
- Hallazgos A11Y pendientes de validación.

Para cada hallazgo existente indicar:

- Sigue vigente.
- Corregido y verificado.
- No reproducible.
- Requiere nueva evidencia.
- Duplicado de otro hallazgo.

No duplicar hallazgos existentes ni cambiar su estado sin evidencia.

## 6. Método de evaluación

Para cada hallazgo registrar:

- Identificador.
- Pantalla y ruta.
- Componente involucrado.
- Descripción del problema.
- Pasos para reproducirlo.
- Resultado observado.
- Resultado esperado.
- Evidencia: captura, referencia de código o prueba.
- Impacto para el usuario.
- Criterio WCAG relacionado, cuando corresponda.
- Severidad.
- Prioridad.
- Recomendación concreta.
- Posibles dependencias.

Clasificar severidad como:

- Crítica.
- Alta.
- Media.
- Baja.

Diferenciar severidad de prioridad de implementación.

No registrar como incumplimiento confirmado algo que no se pudo comprobar.

## 7. Plan previo

Antes de modificar documentación:

1. Enumerar las pantallas reales.
2. Identificar los componentes y archivos inspeccionados.
3. Definir qué pruebas manuales se realizarán.
4. Identificar qué pruebas automatizadas existen.
5. Enumerar los hallazgos previos que deben reconciliarse.
6. Identificar las limitaciones de la auditoría.
7. Definir los cambios documentales concretos.

No modificar componentes Angular ni estilos.

## 8. Archivos autorizados

Principalmente:

- docs/accessibility-audit.md

Se podrán agregar documentos auxiliares dentro de docs/ si son necesarios para presentar la matriz de evaluación o evidencias.

No modificar:

- src/styles.scss
- src/app/app.scss
- pages.ts
- Componentes Angular.
- Templates.
- Servicios.
- Stores.
- Modelos.
- Contratos HTTP.
- Configuración funcional.

No corregir problemas detectados dentro de este ticket. Documentarlos para su implementación en tickets independientes.

## 9. Separación con otros tickets

- CHOIR-125 define fundamentos visuales compartidos y tokens.
- CHOIR-126 diseña visualmente el registro.
- CHOIR-127 integra funcionalmente registro y verificación.
- CHOIR-128 audita estados y accesibilidad por pantalla.
- CHOIR-129 valida responsive y consistencia visual integral.

No duplicar el alcance de esos tickets.

Cada corrección que requiera implementación deberá convertirse en una tarea independiente de Jira, con alcance y criterios de aceptación propios.

No crear tickets adicionales sin autorización.

## 10. Entregables

- Auditoría actualizada.
- Inventario de pantallas evaluadas.
- Matriz de estados por pantalla.
- Hallazgos priorizados con evidencia.
- Reconciliación de hallazgos anteriores.
- Recomendaciones implementables.
- Limitaciones y pruebas pendientes.
- Referencias a tickets existentes, cuando corresponda.

## 11. Git y entrega

1. Crear la rama feature/CHOIR-128-screen-accessibility-audit cuando corresponda.
2. No trabajar directamente en main.
3. No mezclar cambios de otros tickets.
4. Revisar el diff completo.
5. Verificar que solo haya documentación de auditoría.
6. Crear un PR propio contra main.
7. Referenciar CHOIR-128.

## 12. Criterios de finalización

- Las pantallas existentes están inventariadas.
- Los estados están evaluados por pantalla.
- Los hallazgos tienen evidencia y prioridad.
- Los hallazgos anteriores fueron reconciliados.
- Las limitaciones de las pruebas están documentadas.
- No se afirma conformidad WCAG sin evidencia.
- No se introdujeron cambios funcionales o visuales.
- El PR está abierto y listo para revisión.

No cerrar el ticket hasta completar y revisar los entregables.
