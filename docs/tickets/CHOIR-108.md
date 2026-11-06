# CHOIR-108 — Quitar coreutas desde el escenario

## Objetivo

Completar el editor visual de formaciones con una acción contextual para quitar un coreuta directamente desde su representación en el escenario, sin eliminarlo del repertorio ni de la selección general.

## Contexto verificado en main

- Repositorio: `rubengarcia0510/choir-platform-web`.
- Editor visual: CHOIR-21.
- Integración con borradores: CHOIR-73.
- Bloqueo de posiciones: CHOIR-107.
- En `main` ya existe la acción Agregar/Quitar en el panel lateral y una prueba de integración que cubre quitar una posición bloqueada, guardar el borrador y volver a cargarlo.
- Lo que falta en este issue es ofrecer esa acción también directamente sobre cada integrante dibujado en el escenario. No duplicar ni reimplementar la lógica ya existente del panel lateral.

## Alcance

- Incorporar una acción contextual explícita y accesible para quitar a cada coreuta desde su elemento visual en el escenario.
- Debe estar disponible para posiciones bloqueadas y desbloqueadas.
- Al activarla, retirar inmediatamente al coreuta del escenario y del conjunto de posiciones que se enviará en el próximo guardado.
- Mantener al coreuta en el repertorio y en la selección general; no ejecutar una baja ni deseleccionarlo globalmente.
- Reutilizar el estado local existente para mantener sincronizados el panel lateral y el escenario.
- No ejecutar el endpoint de desbloqueo como paso previo. Quitar una posición bloqueada debe resolverse mediante el guardado del borrador, omitiendo la posición quitada.
- La acción no debe iniciar accidentalmente el drag ni interferir con bloquear/desbloquear.
- Evitar controles interactivos anidados inválidos y asegurar operación por teclado y tecnologías de asistencia.

## Fuera de alcance

- Cambiar o duplicar la acción Agregar/Quitar ya disponible en el panel lateral.
- Cambiar el comportamiento de bloqueo/desbloqueo de CHOIR-107.
- Cambios en backend, endpoints, contratos HTTP, persistencia, migraciones, autorización o validaciones.
- Eliminar coreutas del repertorio o modificar su disponibilidad/selección general.
- Refactorizaciones generales del editor no necesarias para esta acción contextual.

## Criterios de aceptación

- [ ] Cada coreuta presente en el escenario dispone de una acción contextual visible o accesible para quitarlo de la formación.
- [ ] La acción contextual está disponible también cuando la posición está bloqueada.
- [ ] Al activarla, el coreuta desaparece inmediatamente del escenario.
- [ ] El panel lateral refleja el cambio y vuelve a ofrecer Agregar para ese coreuta.
- [ ] El próximo guardado no incluye la posición quitada.
- [ ] Tras guardar y volver a cargar el borrador, el coreuta continúa fuera de esa formación.
- [ ] El coreuta permanece en el repertorio y en la selección general.
- [ ] Quitar una posición bloqueada no requiere desbloquearla previamente ni llama al endpoint de desbloqueo.
- [ ] La acción puede utilizarse con teclado y tecnologías de asistencia.
- [ ] Activar Quitar no inicia drag ni activa accidentalmente bloquear/desbloquear.
- [ ] Se agregan pruebas para la acción contextual en posiciones bloqueadas y desbloqueadas, sincronización con el panel lateral, payload de guardado y persistencia tras recarga.
- [ ] Las pruebas existentes de eliminación desde el panel lateral siguen pasando.
- [ ] La suite frontend y el build pasan.

## Consideraciones técnicas

- Revisar primero el template del escenario y los métodos existentes de `FormationsPage`, especialmente `stageSingers()`, `toggleSingerInFormation()`, `startDrag()` y `savePositions()`.
- Reutilizar `toggleSingerInFormation(singerId)` o extraer una operación compartida si hace falta; no mantener dos implementaciones divergentes.
- Si el control contextual está dentro de un elemento que recibe eventos de puntero, detener la propagación para evitar iniciar el drag.
- Mantener el cambio en una rama feature del repositorio frontend y entregar mediante PR.
- No modificar backend ni contratos HTTP.
