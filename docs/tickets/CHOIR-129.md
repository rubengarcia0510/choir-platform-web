# BAND — Instrucciones de implementación CHOIR-129

**Ticket:** https://rubengarcia0510.atlassian.net/browse/CHOIR-129
**Repositorio:** rubengarcia0510/choir-platform-web
**Rama de implementación:** feature/CHOIR-129-responsive-visual-validation
**Unidad:** DS-09 — Validación responsive y consistencia visual integral.

## 1. Objetivo

Validar el comportamiento responsive y la consistencia visual de todas las pantallas existentes de CHOIR.

El resultado debe documentar problemas reproducibles, evidencias, prioridades y recomendaciones concretas.

Este ticket es de validación y documentación. No autoriza rediseños ni refactors generales.

## 2. Precondiciones

Antes de comenzar:

1. Leer CHOIR-129 en Jira.
2. Leer docs/tickets/FRONTEND.md.
3. Leer docs/design-discovery.md.
4. Leer docs/design-system.md.
5. Leer docs/design-proposals.md.
6. Leer docs/design-backlog.md.
7. Revisar el estado de CHOIR-124 y CHOIR-125.
8. Inspeccionar las pantallas y componentes reales del frontend.

Si CHOIR-124 o CHOIR-125 todavía no están integrados en main, documentar la dependencia y no asumir que sus decisiones son definitivas.

## 3. Inventario de pantallas

Identificar todas las rutas y pantallas realmente implementadas.

Para cada una registrar:

- Ruta.
- Componente.
- Propósito.
- Layout utilizado.
- Componentes compartidos.
- Elementos que requieren comportamiento responsive.
- Estados relevantes.
- Evidencia visual.

No inventar pantallas ni tratar propuestas como funcionalidades existentes.

## 4. Matriz de viewport

Evaluar, como mínimo, estos anchos:

- Móvil pequeño: 320 px.
- Móvil: 375 px.
- Móvil amplio: 430 px.
- Tablet: 768 px.
- Desktop: 1024 px.
- Desktop amplio: 1440 px.

Registrar el viewport real utilizado en cada captura.

No asumir que un único ancho representa todos los dispositivos.

## 5. Validaciones responsive

En cada pantalla revisar:

- Scroll horizontal inesperado.
- Contenido cortado.
- Superposición de elementos.
- Anchos y alturas rígidos.
- Formularios y campos.
- Tablas y listas.
- Navegación.
- Diálogos y menús.
- Botones y acciones.
- Tarjetas y paneles.
- Imágenes y recursos gráficos.
- Espaciado y alineación.
- Legibilidad y jerarquía visual.
- Targets táctiles.
- Contenido largo y textos extensos.

Distinguir entre:

1. Problema reproducible.
2. Comportamiento esperado.
3. Limitación del entorno de prueba.
4. Elemento no aplicable.

No registrar como defecto un comportamiento que sea intencional y coherente con el diseño.

## 6. Consistencia visual

Comparar las pantallas reales con los fundamentos definidos en docs/design-system.md.

Evaluar:

- Paleta y uso semántico del color.
- Tipografía y jerarquías.
- Espaciado.
- Bordes y radios.
- Elevaciones.
- Botones.
- Formularios.
- Paneles y tarjetas.
- Alertas y mensajes.
- Estados visuales.
- Patrones de navegación.
- Consistencia entre pantallas equivalentes.

No modificar tokens ni redefinir el sistema visual.

Distinguir inconsistencias reales de diferencias intencionales entre áreas artísticas y operativas.

## 7. Evidencia

Para cada problema registrar:

- Identificador.
- Pantalla y ruta.
- Viewport.
- Pasos para reproducir.
- Resultado observado.
- Resultado esperado.
- Captura o referencia verificable.
- Componente o archivo involucrado.
- Impacto.
- Severidad.
- Prioridad.
- Recomendación concreta.

Las capturas deben corresponder a la aplicación real, no a mockups o propuestas.

No afirmar que se probó un dispositivo físico si solo se utilizó emulación del navegador.

## 8. Severidad y prioridad

Usar estas categorías:

- Crítica.
- Alta.
- Media.
- Baja.

Explicar el impacto y justificar la prioridad.

No confundir severidad con orden de implementación.

## 9. Plan previo

Antes de modificar documentación:

1. Enumerar las rutas existentes.
2. Definir la matriz de viewports.
3. Identificar los componentes compartidos.
4. Establecer el procedimiento de captura.
5. Enumerar los problemas ya conocidos.
6. Definir los documentos que se actualizarán.
7. Identificar las limitaciones de la evaluación.

No modificar componentes Angular ni estilos durante la auditoría.

## 10. Archivos autorizados

Principalmente:

- Documentación de auditoría dentro de docs/.
- Documentación de evidencias dentro de docs/, si es necesaria.

No modificar:

- src/styles.scss
- src/app/app.scss
- pages.ts
- Componentes Angular.
- Templates.
- Estilos de componentes.
- Servicios.
- Stores.
- Modelos.
- Contratos HTTP.
- Configuración funcional.

No implementar las correcciones detectadas.

## 11. Separación con CHOIR-128

- CHOIR-128 evalúa accesibilidad y estados visuales por pantalla.
- CHOIR-129 evalúa responsive y consistencia visual integral.

Si aparece un hallazgo de accesibilidad, referenciarlo en lugar de duplicar su auditoría.

Si aparece un problema de responsive que afecta accesibilidad, registrar la relación entre ambos hallazgos.

Cada corrección que requiera implementación debe tener un ticket Jira independiente.

No crear tickets adicionales sin autorización.

## 12. Entregables

- Inventario de pantallas evaluadas.
- Matriz de viewports por pantalla.
- Capturas reales.
- Hallazgos responsive reproducibles.
- Auditoría de consistencia visual.
- Severidad y prioridad.
- Recomendaciones implementables.
- Limitaciones y viewports no evaluados.
- Referencias a tickets relacionados.

## 13. Git y entrega

1. Crear la rama feature/CHOIR-129-responsive-visual-validation cuando corresponda.
2. No trabajar directamente en main.
3. No mezclar cambios de otros tickets.
4. Revisar el diff completo.
5. Verificar que no haya cambios funcionales ni visuales.
6. Crear un PR propio contra main.
7. Referenciar CHOIR-129.

## 14. Criterios de finalización

- Las pantallas existentes están inventariadas.
- Se evaluaron los viewports definidos.
- Los problemas tienen evidencia reproducible.
- La consistencia visual se contrastó con el sistema de diseño.
- Los hallazgos tienen severidad y prioridad justificadas.
- Se documentaron las limitaciones.
- No se implementaron cambios fuera de alcance.
- El PR está abierto y listo para revisión.

No cerrar el ticket hasta completar y revisar los entregables.
