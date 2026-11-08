# CHOIR-29 — Comparador y aplicación de adaptaciones por ausencia

## Fuente y dependencias

- Jira: [CHOIR-29](https://rubengarcia0510.atlassian.net/browse/CHOIR-29)
- Repositorio: `rubengarcia0510/choir-platform-web`
- Specs backend: CHOIR-28 (cálculo de propuesta) y CHOIR-29 (aplicación), en `choir-platform/docs/tickets/`.
- No iniciar integración hasta que ambos contratos estén disponibles y mergeados.

## Objetivo

Permitir al director revisar el impacto de ausencias, comparar la distribución original con una propuesta backend y decidir explícitamente si aplicarla, ajustarla o descartarla.

## Alcance

- Seleccionar integrantes ausentes dentro del concierto/ámbito confirmado por backend.
- Solicitar una propuesta de adaptación; no cambiar posiciones o versiones por el solo hecho de calcularla.
- Mostrar un diff antes/después que distinga posiciones originales, nuevas, ausencias y métricas/advertencias devueltas.
- Permitir aplicar explícitamente la propuesta confirmada por el director.
- Mostrar el resultado persistido por backend y conservar las versiones originales.

## Contrato pendiente

Los specs backend proponen `/adaptations/absence/calculate` y `/adaptations/absence/apply`, pero no definen completamente la forma de la propuesta, su identificador, concurrencia ni cómo se seleccionan formaciones para aplicar. No inventar payloads, almacenamiento local duradero ni rutas. Ajustar modelos y flujo a los DTOs implementados.

## UX y seguridad de datos

- Diferenciar claramente “calcular propuesta” de “aplicar propuesta”.
- Solicitar confirmación antes de aplicar; bloquear doble confirmación.
- No aplicar automáticamente una propuesta ni reemplazar versiones históricas.
- Si cambia el concierto o la propuesta queda obsoleta, impedir aplicar datos viejos y pedir recalcular.
- Presentar errores de autorización/conflicto y permitir recuperarse sin falso éxito.

## Pruebas requeridas

- Cálculo sin mutación; diff de posiciones y ausencias.
- Aplicación explícita, confirmación y visualización del resultado.
- Error y reintento, propuesta obsoleta y cambios de contexto.
- Verificar que no se modifiquen versiones originales ni se apliquen parcialmente resultados.
- Accesibilidad del diff y acciones de confirmación.
