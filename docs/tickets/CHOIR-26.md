# CHOIR-26 — Preferencias artísticas de transición

## Fuente y dependencias

- Jira: [CHOIR-26](https://rubengarcia0510.atlassian.net/browse/CHOIR-26)
- Repositorio: `rubengarcia0510/choir-platform-web`
- Spec backend: `choir-platform/docs/tickets/CHOIR-26.md`
- Depende de CHOIR-25 backend y de decisiones de contrato aún pendientes.

## Objetivo

Permitir al director configurar las preferencias que backend utilice para ordenar alternativas de transición, explicando cómo influyen en el ranking.

## Bloqueos de definición

El spec backend menciona cuatro criterios (distancia, cruces, cohesión de cuerda y simultaneidad), pero el payload de ejemplo solo incluye tres pesos. También deja sin decidir si las preferencias se guardan por concierto o formación. Estos puntos deben resolverse en Jira/backend antes de implementar controles o persistencia. No sumar campos ni elegir un ámbito por inferencia.

## Alcance después de confirmar el contrato

- Cargar las preferencias existentes del recurso definido por backend.
- Mostrar un control accesible por cada peso confirmado, con valor actual y texto explicativo.
- Validar el rango localmente solo para UX; backend sigue siendo la autoridad y puede normalizar o rechazar.
- Guardar explícitamente y reflejar solo la respuesta confirmada.
- Mostrar estados de carga, error y éxito; preservar valores confirmados si falla el guardado.

## Contrato

El spec backend incluye como propuesta:

- `GET /api/choirs/{choirId}/concerts/{concertId}/optimization-preferences`
- `PUT /api/choirs/{choirId}/concerts/{concertId}/optimization-preferences`

Usar estas rutas y el DTO final únicamente después de verificar el contrato backend/Jira.

## Pruebas requeridas

- Carga y guardado de todos y solo los pesos confirmados.
- Error de carga/guardado, reintento y ausencia de falso éxito.
- Validación de cambios sin duplicar solicitudes.
- Aislamiento entre los ámbitos que defina backend.
- Accesibilidad de sliders/controles por teclado y lector de pantalla.
