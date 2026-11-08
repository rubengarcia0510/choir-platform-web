# CHOIR-86 — Configuración visual de restricciones de movilidad y visibilidad

## Fuente y dependencias

- Jira: [CHOIR-86](https://rubengarcia0510.atlassian.net/browse/CHOIR-86)
- Repositorio: `rubengarcia0510/choir-platform-web`
- Spec backend: `choir-platform/docs/tickets/CHOIR-86.md`
- Bloquea la integración hasta que el contrato backend esté implementado y mergeado.

## Objetivo

Permitir al director consultar, configurar y quitar restricciones físicas de integrantes en una formación. La UI presenta y envía reglas explícitas; el backend valida la geometría y persiste el estado.

## Alcance

- Agregar la sección de restricciones físicas al flujo de edición de la formación seleccionada.
- Consultar y mostrar restricciones de movilidad y visibilidad asociadas únicamente a esa formación.
- Permitir crear y eliminar restricciones mediante los endpoints confirmados por el backend.
- Mostrar estados de carga, vacío, guardado, eliminación y error; evitar solicitudes duplicadas y respuestas tardías sobre otro contexto.
- Usar identificadores de coreuta reales del elenco del coro. No hardcodear filas, alturas, secciones ni integrantes.

## Contrato de integración

El spec backend propone esta base:

`/api/choirs/{choirId}/concerts/{concertId}/repertoire/{repertoireItemId}/formations/{formationId}/constraints/physical`

Operaciones propuestas:

- `GET /` — listar restricciones.
- `POST /mobility` — crear restricción de movilidad.
- `POST /visibility` — crear restricción de visibilidad.
- `DELETE /{constraintId}` — eliminar.

Los cuerpos y DTOs todavía no están especificados de forma suficiente. No inventar campos, rutas alternativas (`/constraints/mobility`) ni supuestos de unidades. Ajustar los modelos y pruebas al contrato backend publicado antes de integrar; si el contrato cambia, actualizar ambos specs.

## Reglas y accesibilidad

- No calcular validez espacial en Angular ni presentar una regla como confirmada antes de una respuesta exitosa.
- La definición de fila accesible, orientación del escenario y datos necesarios para visibilidad debe provenir del contrato de dominio/backend.
- Etiquetar controles, mostrar foco visible y hacer los errores perceptibles con tecnología asistiva.
- Conservar la lista confirmada ante fallos; permitir reintentar sin duplicar la mutación.

## Pruebas requeridas

- Carga, estado vacío y error; reintento.
- Cuerpos y rutas según los DTOs confirmados, incluyendo `withCredentials`.
- Crear/eliminar con respuesta exitosa y errores de autorización/conflicto.
- Ignorar respuestas de otra formación o contexto.
- Verificar que cambiar restricciones no cambie posiciones ni bloqueos.
