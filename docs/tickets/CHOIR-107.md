# CHOIR-107 — Bloqueo y desbloqueo de posiciones

## Fuente de verdad

- Jira: https://rubengarcia.atlassian.net/browse/CHOIR-107
- Repositorio: `rubengarcia0510/choir-platform-web`
- Documento general: `docs/tickets/FRONTEND.md`
- Backend relacionado: CHOIR-84
- Editor base: CHOIR-21
- Integración API: CHOIR-73

Jira es la fuente de verdad para el alcance y los criterios de aceptación.

## Objetivo

Permitir al director bloquear y desbloquear posiciones de coreutas en el editor visual de formaciones.

El backend es la autoridad sobre el estado persistido. Angular debe reflejar el estado confirmado por el servidor.

## Alcance

- Incorporar `locked` a `FormationDraftPosition`.
- Incorporar operaciones HTTP de bloqueo y desbloqueo.
- Representar visualmente las posiciones bloqueadas.
- Ofrecer acciones accesibles de bloqueo y desbloqueo.
- Impedir iniciar drag sobre posiciones bloqueadas.
- Mantener la posibilidad de quitar un coreuta bloqueado de la formación.
- Actualizar el estado después de las respuestas satisfactorias.
- Manejar errores sin presentar falsos éxitos.

## Fuera de alcance

- Persistencia y migraciones backend.
- Autorización y validaciones de negocio backend.
- Restricciones de proximidad, movilidad o visibilidad.
- Rediseño general del editor.
- Cambios al mecanismo de guardado que no sean necesarios para integrar el bloqueo.

## Contrato HTTP confirmado

Base:

`/api/choirs/{choirId}/concerts/{concertId}/repertoire/{repertoireItemId}/formations`

Bloquear:

`PUT /{formationId}/versions/{versionId}/positions/{positionId}/lock`

Desbloquear:

`DELETE /{formationId}/versions/{versionId}/positions/{positionId}/lock`

Ambas operaciones:

- Responden HTTP 204.
- No requieren body.
- Utilizan `positionId`, no `singerId`.
- Requieren las credenciales existentes (`withCredentials: true`).

La consulta del borrador devuelve `locked` dentro de cada posición.

No inventar rutas alternativas ni agregar payloads.

## Archivos identificados

### Modelo

`src/app/formations/formation-draft.model.ts`

Extender `FormationDraftPosition` con:

- `locked: boolean`.

### Servicio API

`src/app/formations/formation-drafts-api.service.ts`

Agregar operaciones:

- `lockPosition(...)`.
- `unlockPosition(...)`.

Ambas deben recibir los identificadores de coro, concierto, inclusión del repertorio, formación, versión y posición.

Construir las rutas utilizando la estructura existente del servicio.

### Pruebas del servicio

`src/app/formations/formation-drafts-api.service.spec.ts`

Cubrir:

- Método HTTP correcto.
- Ruta completa.
- Identificadores correctos.
- `withCredentials`.
- Ausencia de body.
- Respuesta 204.
- Errores HTTP.

### Editor visual

`src/app/pages.ts`

- Incorporar `locked` al modelo visual derivado de las posiciones.
- Mantener el identificador de posición del backend.
- Mostrar el indicador de bloqueo.
- Incorporar una acción contextual accesible.
- Impedir el inicio del drag si la posición está bloqueada.
- No modificar las coordenadas locales al intentar arrastrar una posición bloqueada.
- Permitir quitar un coreuta bloqueado de la formación.
- Actualizar el borrador y el estado visual después de cada operación exitosa.

No asumir que el identificador de posición coincide con el identificador del coreuta.

### Estilos

`src/app/app.scss`

Agregar estilos para:

- Indicador visual de posición bloqueada.
- Estado de acción de bloqueo/desbloqueo.
- Estado visual del cursor y del arrastre.
- Foco accesible.
- Movimiento reducido cuando corresponda.

El estado bloqueado debe poder reconocerse sin depender exclusivamente del color.

### Pruebas del editor

`src/app/pages.spec.ts`

Cubrir:

- Posición desbloqueada.
- Posición bloqueada.
- Indicador visual.
- Bloqueo exitoso.
- Desbloqueo exitoso.
- Imposibilidad de iniciar drag estando bloqueada.
- Posibilidad de arrastrar después de desbloquear.
- Error 403.
- Error 409.
- Conservación del estado anterior cuando la operación falla.
- Posibilidad de quitar una posición bloqueada.

## Secuencia de implementación

### Fase 1 — Modelo y API

1. Agregar `locked` al modelo.
2. Agregar métodos lock/unlock.
3. Implementar pruebas HTTP.
4. Ejecutar pruebas específicas del servicio.

### Fase 2 — Estado del editor

1. Incorporar el estado `locked` a la representación visual.
2. Mantener el `positionId` asociado a cada coreuta.
3. Verificar que el estado provenga del borrador del backend.
4. Verificar que una respuesta de guardado actualice el estado correctamente.

### Fase 3 — Interacción

1. Agregar indicador visual.
2. Agregar acción accesible de bloqueo.
3. Agregar acción accesible de desbloqueo.
4. Impedir el drag de posiciones bloqueadas.
5. No impedir la eliminación de un coreuta bloqueado.

Las acciones contextuales no deben interferir con el evento de drag ni con otros controles.

### Fase 4 — Consistencia y errores

1. No cambiar el estado confirmado antes de recibir respuesta exitosa.
2. Después de bloquear o desbloquear, reflejar la respuesta del servidor.
3. Ante 403, informar que la operación no está autorizada.
4. Ante 409, informar el conflicto sin modificar falsamente el estado.
5. Evitar que una respuesta atrasada modifique otra formación o borrador seleccionado.
6. Verificar persistencia después de recargar el borrador.

### Fase 5 — Validación

1. Ejecutar pruebas del modelo y servicio.
2. Ejecutar pruebas del editor.
3. Ejecutar la suite frontend completa.
4. Ejecutar build de producción.
5. Revisar `git diff --check`.
6. Revisar el diff completo.
7. Confirmar que no haya cambios ajenos a CHOIR-107.

## Criterios de aceptación

- El editor representa correctamente `locked`.
- El director puede bloquear una posición.
- El bloqueo persiste después de recargar el borrador.
- El director puede desbloquear una posición.
- Una posición desbloqueada puede moverse.
- Una posición bloqueada no inicia drag.
- El bloqueo no impide quitar al coreuta.
- Los errores no producen falsos éxitos.
- Las pruebas cubren modelo, API, indicador, acciones, drag y errores.
- La suite frontend y el build pasan.

## Git y entrega

- Rama: `feature/CHOIR-107-lock-positions`.
- Crear desde `origin/main` actualizado.
- No implementar directamente sobre `main`.
- Mantener los cambios limitados a CHOIR-107.
- Abrir PR contra `main`.
- Verificar CI antes del merge.
- Actualizar Jira después de integrar.

## Regla de implementación

Antes de modificar archivos, presentar el plan concreto de cambios y sus dependencias.

Implementar una fase por vez. No avanzar a la siguiente hasta verificar la anterior.

No sobrescribir cambios locales ni eliminar pruebas existentes para hacer pasar la suite.
