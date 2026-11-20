# BAND — Instrucciones de implementación CHOIR-145

**Ticket:** https://rubengarcia0510.atlassian.net/browse/CHOIR-145
**Repositorio:** rubengarcia0510/choir-platform-web
**Rama:** docs/CHOIR-145-design-system-reconciliation
**Base:** develop
**Destino del PR:** develop
**Alcance:** reconciliación documental del sistema de diseño.

## 1. Objetivo

Alinear la documentación del sistema de diseño de CHOIR con la implementación real del frontend.

El trabajo consiste en distinguir:
- Decisiones visuales implementadas y verificadas.
- Decisiones aceptadas pero pendientes de aplicación.
- Propuestas conceptuales todavía no aprobadas.
- Referencias visuales que representan pantallas futuras.

No implementar cambios funcionales ni visuales.

## 2. Precondiciones

Antes de modificar documentación:

1. Consultar CHOIR-145 en Jira y verificar estado, descripción y criterios de aceptación.
2. Leer `docs/tickets/FRONTEND.md`.
3. Leer `docs/design-system.md`.
4. Leer `docs/design-discovery.md`.
5. Leer `docs/design-proposals.md`.
6. Leer `docs/design-module-references.md`.
7. Contrastar los valores documentados con `src/styles.scss` y `src/shared-patterns.scss`.
8. Revisar `src/app/app.scss` para identificar los patrones compartidos realmente implementados.

Jira es la fuente de verdad del alcance.

Si existe alguna diferencia entre Jira y este documento, informar la discrepancia antes de ampliar el alcance.

## 3. Archivos autorizados

Modificar exclusivamente:

- `docs/design-system.md`
- `docs/design-discovery.md`
- `docs/design-proposals.md`
- `docs/design-module-references.md`

No modificar archivos adicionales sin justificar previamente su necesidad.

No modificar la implementación para hacerla coincidir con una propuesta documental.

## 4. Reconciliación del sistema de diseño

### 4.1 Tokens implementados

Verificar el valor real en `src/styles.scss`.

Documentar como valor implementado:

- `--choir-muted: #6B7168`

No presentar `#747A70` como valor operativo vigente.

### 4.2 Bordes

Distinguir claramente:

- Bordes decorativos y separadores.
- Bordes de campos y controles interactivos.
- Indicadores de foco.

`--choir-line: #E9E8E1` no debe documentarse como suficiente para todos los límites de controles.

No adoptar `#8A9086` como token aprobado sin evidencia y validación.

Las correcciones de contraste de controles pertenecen a sus tickets específicos, no a esta tarea documental.

### 4.3 Estado de las decisiones

Cada decisión relevante debe identificarse como una de estas categorías:

- Implementada y verificada.
- Implementada, con validación pendiente.
- Aprobada, pendiente de implementación.
- Propuesta conceptual.
- Descartada o reemplazada.

No presentar una propuesta como funcionalidad disponible.

No declarar conformidad WCAG global.

## 5. Coherencia entre dominios

Verificar y documentar las diferencias entre la dirección visual compartida y las necesidades de cada dominio.

### Mi coro

- Gestión operativa de agrupaciones.
- Formularios, información y estados de las agrupaciones.
- Distinguir pantalla funcional de propuestas visuales.

### Conciertos

- La pantalla actual es informativa y el módulo todavía no dispone de todas las operaciones previstas.
- No documentar como implementados listados, formularios o acciones que todavía no existen.

### Formaciones

- Editor de formaciones y escenario interactivo.
- Respetar que una formación puede variar entre conciertos.
- No presentar las referencias visuales como sustituto de la funcionalidad real.

### Transiciones

- Distinguir las referencias conceptuales de las funcionalidades implementadas.
- No afirmar que existen flujos interactivos que todavía no están disponibles.

Mantener una identidad compartida sin forzar que todos los dominios tengan exactamente la misma composición o densidad visual.

## 6. Restricciones estrictas

NO modificar:

- `src/styles.scss`
- `src/shared-patterns.scss`
- `src/app/app.scss`
- `src/app/pages.scss`
- `src/app/pages.ts`
- Componentes Angular.
- Templates.
- Servicios.
- Stores.
- Modelos.
- Rutas.
- Contratos HTTP.

NO:
- Crear componentes.
- Cambiar tokens CSS.
- Cambiar colores implementados.
- Corregir problemas de contraste en código.
- Incorporar dependencias.
- Rediseñar pantallas.
- Inventar estados o funcionalidades.
- Duplicar tickets Jira.
- Reabrir CHOIR-125.

Los hallazgos de contraste deben mantenerse vinculados a CHOIR-140 y sus tickets de corrección.

## 7. Validaciones

Antes de finalizar:

1. Comparar los valores documentados con los tokens reales.
2. Comprobar que las referencias a archivos y secciones sean correctas.
3. Buscar contradicciones entre los cuatro documentos.
4. Comprobar que ninguna propuesta figure como funcionalidad implementada.
5. Ejecutar `git diff --check`.
6. Revisar el diff completo y confirmar que solo se modificaron los archivos autorizados.

Al ser una tarea exclusivamente documental, no es necesario modificar ni ejecutar pruebas de comportamiento de Angular.

No declarar validaciones que no se hayan realizado.

## 8. Git y entrega

1. Trabajar en `docs/CHOIR-145-design-system-reconciliation`.
2. Crear la rama desde el último `develop`.
3. No trabajar directamente en `develop` ni `main`.
4. No incluir cambios de otros tickets.
5. Usar Conventional Commits:
   `docs(CHOIR-145): reconcile design system documentation`
6. Crear un PR contra `develop`.
7. Incluir en el PR los documentos modificados y las validaciones realizadas.
8. No hacer merge sin autorización explícita.

## 9. Criterios de aceptación

- Los valores documentados coinciden con los tokens implementados.
- Se distingue el uso decorativo de los bordes del uso en controles.
- Las decisiones aprobadas se diferencian de las propuestas.
- Los dominios mantienen una dirección visual coherente sin inventar funcionalidades.
- Las referencias documentales coinciden con el estado real del frontend.
- No existen cambios de código funcional ni CSS.
- El diff es exclusivamente documental.
- El PR está abierto y listo para revisión.

No cerrar CHOIR-145 hasta verificar sus criterios de aceptación en Jira.
