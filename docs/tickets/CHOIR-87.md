# CHOIR-87 — Feedback visual de errores de restricciones espaciales

## Fuente y dependencias

- Jira: [CHOIR-87](https://rubengarcia0510.atlassian.net/browse/CHOIR-87)
- Repositorio: `rubengarcia0510/choir-platform-web`
- Spec backend: `choir-platform/docs/tickets/CHOIR-87.md`
- Depende de CHOIR-85 y CHOIR-86 backend; no inventar ni simular errores estructurados antes de que su contrato esté disponible.

## Objetivo

Cuando el guardado del borrador sea rechazado por una posición bloqueada o una restricción de formación, explicar el conflicto y señalar en el escenario los coreutas identificados por el backend.

## Contrato de integración

La operación actual de guardado es:

`PUT /api/choirs/{choirId}/concerts/{concertId}/repertoire/{repertoireItemId}/formations/{formationId}/versions/{versionId}/positions`

El backend propone `409 Conflict` con un objeto que incluye `message` y `violations`. Cada violación puede identificar `singerId`, `positionId` y/o `firstSingerId` / `secondSingerId`, además de `type` y `message`. El formato final es responsabilidad del contrato backend; tolerar identificadores opcionales y no asumir que todos los tipos incluyen los mismos campos.

`400` corresponde a entrada inválida/malformada; no mostrarlo como una violación espacial salvo que el backend incluya una violación de dominio explícita.

## Comportamiento

- Mantener en pantalla los cambios locales no guardados cuando el servidor rechaza la operación.
- Mostrar el mensaje general y los mensajes de cada violación.
- Resaltar en el escenario los coreutas identificados por cada violación sin depender solo del color; ofrecer una leyenda o texto accesible.
- Quitar el resaltado cuando el usuario modifica/reintenta o cambia de formación, según el flujo existente.
- No reenviar automáticamente el PUT; la persona directora debe corregir y guardar explícitamente.
- Ignorar respuestas tardías que pertenezcan a otra formación o versión.
- Para errores sin payload compatible, mostrar el tratamiento genérico existente sin inventar una causa.

## Fuera de alcance

- Validar restricciones matemáticamente en Angular.
- Cambiar los contratos HTTP o el algoritmo backend.
- Rechazar automáticamente movimientos antes de guardar si backend no ofrece esa validación.

## Pruebas requeridas

- `409` con múltiples tipos de violación: mensajes y cantantes destacados.
- Campos opcionales/desconocidos sin fallar el renderizado.
- Preservación de posiciones locales y ausencia de éxito falso.
- `400`, `403`, error de red y payload no estructurado.
- Limpiar errores/highlights al cambiar contexto y no aplicar respuestas obsoletas.
- Accesibilidad del resumen y del estado de error.
