# CHOIR-30 — Modo ensayo y reproducción de transiciones

## Fuente y dependencias

- Jira: [CHOIR-30](https://rubengarcia0510.atlassian.net/browse/CHOIR-30)
- Repositorio: `rubengarcia0510/choir-platform-web`
- Spec backend: `choir-platform/docs/tickets/CHOIR-30.md`
- Depende de CHOIR-24 y de que el endpoint de playback esté implementado y mergeado.

## Objetivo

Reproducir visualmente en el escenario la transición entre dos versiones usando los pasos temporales proporcionados por backend.

## Alcance

- Cargar los pasos de playback para la transición seleccionada.
- Presentar controles accesibles de iniciar/pausar, reiniciar, velocidad y avance/retroceso por paso, si los datos del endpoint permiten esa operación.
- Renderizar las coordenadas recibidas; no recalcular trayectorias ni colisiones en el cliente.
- Manejar carga, vacío, error y reintento.
- Detener/limpiar la reproducción al cambiar de transición o salir de la vista.

## Contrato

El spec backend propone:

`GET /api/choirs/{choirId}/concerts/{concertId}/transitions/{transitionId}/playback-steps`

La respuesta propuesta contiene `totalDurationSeconds`, `steps` con `timestamp` y posiciones por `singerId`, y `potentialCollisions`. Verificar los DTOs reales antes de fijar modelos; no interpolar pasos ni añadir cálculos de duración/collision que el backend no entregue.

## Accesibilidad y movimiento

- Respetar `prefers-reduced-motion`: ofrecer avance discreto y evitar animación continua por defecto en ese modo.
- Los controles deben funcionar con teclado y tener etiquetas/estado accesibles.
- La pausa debe detener la actualización visual y el reinicio debe volver a las coordenadas iniciales recibidas.
- No anunciar cada frame al lector de pantalla; anunciar estados y pasos de manera controlada.

## Pruebas requeridas

- Render de posiciones/etapas de un playback real.
- Play/pause, reinicio, velocidad y avance discreto según contrato.
- Reducir movimiento, errores, ausencia de datos y cambio de transición durante reproducción.
- No realizar llamadas de mutación ni modificar borradores.
