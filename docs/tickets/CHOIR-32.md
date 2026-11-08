# CHOIR-32 — Vista individual de coreuta

## Fuente y dependencias

- Jira: [CHOIR-32](https://rubengarcia0510.atlassian.net/browse/CHOIR-32)
- Repositorio: `rubengarcia0510/choir-platform-web`
- Spec backend: `choir-platform/docs/tickets/CHOIR-32.md`
- Depende de autenticación/rol de coreuta y CHOIR-30 backend. Confirmar en Jira que el endpoint del spec es el contrato acordado.

## Objetivo

Ofrecer a un coreuta autenticado una vista móvil de solo lectura con sus posiciones publicadas por obra y la información de su próximo movimiento cuando esté disponible.

## Contrato propuesto por backend

`GET /api/me/concerts/{concertId}/my-positions`

La respuesta de ejemplo del spec backend incluye la identidad del coreuta y una lista de repertorio con posición y `nextTransition`. Usar la ruta y estructura únicamente después de verificar que siguen siendo el contrato oficial; no usar las rutas alternativas que aparecen en versiones anteriores del roadmap.

La autenticación debe utilizar el mecanismo de sesión existente de la aplicación. No incluir tokens, credenciales ni headers ficticios en el código o ejemplos.

## Alcance

- Agregar una ruta de solo lectura con diseño mobile-first.
- Mostrar solo los datos del coreuta autenticado devueltos por backend y las versiones autorizadas/publicadas.
- Mostrar carga, vacío, error de autorización y reintento.
- Presentar obra, coordenadas y movimiento siguiente sin inferir instrucciones que no estén en la respuesta.
- No permitir edición ni aceptar `singerId` arbitrario del cliente para consultar datos de otro coreuta.

## Bloqueos

- Confirmar que el login/rol de coreuta y el endpoint existen, así como el estado/versiones que pueden exponerse.
- Alinear la nomenclatura de la respuesta con el modelo backend real; el ejemplo incluye `row`/`column`, pero los modelos actuales del editor usan coordenadas `x`/`y`.

## Pruebas requeridas

- Aislamiento de identidad: la respuesta solo contiene los datos del usuario autenticado.
- Render mobile de repertorio, coordenadas y movimiento siguiente disponible.
- Solo GET; ninguna acción de mutación.
- Carga, vacío, 401/403, error de red y reintento.
- No filtrar información de otros coreutas ni de versiones no publicadas.
