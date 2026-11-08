# CHOIR-25 — Comparación y selección de alternativas de transición

## Fuente y dependencias

- Jira: [CHOIR-25](https://rubengarcia0510.atlassian.net/browse/CHOIR-25)
- Repositorio: `rubengarcia0510/choir-platform-web`
- Specs backend: `CHOIR-24.md` (evaluación/métricas) y `CHOIR-25.md` (alternativas), en `choir-platform/docs/tickets/`.
- Depende de que CHOIR-24 y CHOIR-25 backend estén implementados y sus contratos mergeados.

## Objetivo

Permitir al director comparar las alternativas calculadas por backend, inspeccionar sus métricas y seleccionar explícitamente una sin modificar las formaciones originales.

## Alcance

- Incorporar el flujo en el contexto de concierto, obra y versiones/formaciones de origen y destino.
- Solicitar alternativas a backend y mostrar carga, vacío, error y reintento.
- Comparar las métricas devueltas (distancia, cruces, integrantes en movimiento, score y advertencias, según el DTO real).
- Permitir previsualizar una alternativa en el escenario sin persistirla.
- Confirmar la selección de una alternativa solo mediante el mecanismo de creación/actualización que el backend implemente.

## Contrato pendiente de confirmación

El spec backend propone `POST /api/choirs/{choirId}/concerts/{concertId}/transitions/alternatives`, con `fromVersionId`, `targetFormationId` y `repertoireItemId`; también propone una ruta de evaluación separada en CHOIR-24. Esos cuerpos y las rutas de selección no son aún un contrato verificado. No asignar tipos de ID, crear endpoints ni asumir que elegir una alternativa escribe un borrador hasta contrastarlo con el backend implementado.

## Reglas UX

- Mostrar que las alternativas son propuestas calculadas y no datos guardados.
- Mantener selección y datos de origen/destino explícitos.
- No mutar formaciones ni versiones históricas durante comparación o previsualización.
- Indicar advertencias y explicar qué alternativa está seleccionada antes de confirmar.
- Ignorar resultados tardíos de una consulta iniciada con otro contexto.

## Pruebas requeridas

- Renderizar y comparar métricas reales de varias alternativas.
- Vacío/error/reintento y cambio de contexto con solicitud pendiente.
- Previsualización no persistente.
- Selección/confirmación usa el endpoint confirmado y no altera formaciones de origen.
- Advertencias accesibles y manejo de errores de autorización/conflicto.
