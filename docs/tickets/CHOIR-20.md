# CHOIR-20 — Panel de reglas especiales de escena por canción

## Fuente y dependencias

- Jira: [CHOIR-20](https://rubengarcia0510.atlassian.net/browse/CHOIR-20)
- Repositorio: `rubengarcia0510/choir-platform-web`
- Spec backend: `choir-platform/docs/tickets/CHOIR-20.md`
- Depende del contrato backend y de su implementación mergeada; el roadmap de fases es una secuencia sugerida, no una dependencia técnica de CHOIR-87.

## Objetivo

Ofrecer al director una interfaz para consultar y administrar reglas especiales asociadas a una inclusión de repertorio de un concierto, por ejemplo, grupos, tandas y orden de ejecución.

## Alcance

- Integrar el panel en el contexto de coro, concierto e inclusión de repertorio seleccionados.
- Consultar, crear, editar, ordenar y eliminar reglas solo mediante las operaciones soportadas por backend.
- Mostrar explícitamente qué canción/concierto se está editando.
- Representar el orden secuencial y los grupos de acuerdo con los DTOs definitivos.
- Respetar advertencias e historial inmutable que devuelva backend; no borrar evidencia histórica desde la UI.

## Contrato

El spec backend propone la base:

`/api/choirs/{choirId}/concerts/{concertId}/repertoire/{repertoireItemId}/scene-rules`

`GET /`, `POST /`, `PUT /{ruleId}` y `DELETE /{ruleId}` son rutas propuestas en el spec. El modelo de regla y los payloads aún no están definidos; no inventar nombres de campos, semántica de simultaneidad, asignación por cuerda ni comportamiento de borrado hasta contrastarlos con el contrato backend/Jira.

## UX y consistencia

- Estados de carga, vacío, guardado, error y confirmación de eliminación.
- No enviar solicitudes sin contexto completo ni traslapes de mutaciones duplicadas.
- Si una mutación falla, preservar el estado confirmado y permitir reintentar.
- Proteger cambios de orden concurrentes contra respuestas obsoletas.
- Accesibilidad por teclado, etiquetas y foco visible.

## Pruebas requeridas

- CRUD/orden con las rutas y DTOs finalmente publicados.
- Contexto incompleto, estados de carga/vacío/error y reintentos.
- Errores de autorización y conflicto sin presentar éxito.
- Aislamiento entre canciones y conciertos al cambiar selección.
- Orden visible persistido tras recarga.
