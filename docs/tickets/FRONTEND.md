# Frontend — instrucciones de implementación

## 1. Fuente de verdad y alcance

- Jira es la fuente de verdad para alcance, reglas funcionales, criterios de aceptación y estado de cada ticket.
- Antes de implementar, revisar el ticket, sus subtareas, dependencias y comentarios relevantes.
- No ampliar el alcance ni introducir decisiones funcionales que no estén respaldadas por Jira.
- Si hay contradicciones entre tickets, código y documentación, identificarlas antes de implementar.
- No marcar como completado un requisito solo porque existe una pantalla o un componente: verificar comportamiento y pruebas.
- Mantener separados los cambios de tickets distintos. No integrar trabajo ajeno al ticket en una misma rama o PR.

## 2. Arquitectura y tecnologías

- Aplicación Angular 22.
- TypeScript.
- NgRx SignalStore (`@ngrx/signals`) para estado compartido cuando corresponda.
- Vitest para pruebas.
- Mantener la arquitectura y las convenciones existentes del repositorio.
- Preferir componentes pequeños, responsabilidades claras y servicios específicos.
- Evitar duplicar estado entre componentes, servicios y stores.
- No incorporar dependencias nuevas sin una justificación concreta.

## 3. Integración con backend

- El backend es la autoridad sobre los datos y las reglas de negocio.
- No reemplazar datos reales por arreglos estáticos, nombres ficticios o valores hardcodeados.
- Respetar los contratos HTTP existentes: métodos, rutas, parámetros, cuerpos, códigos de respuesta y modelos.
- No inventar endpoints ni modificar contratos desde el frontend.
- Representar explícitamente los estados de carga, éxito, vacío y error.
- Manejar errores de autorización y conflictos de negocio sin ocultarlos.
- Evitar solicitudes duplicadas y conservar la consistencia entre el estado local y el servidor.
- No asumir que una operación fue persistida hasta recibir una respuesta satisfactoria.

## 4. Estado compartido y caché

- Utilizar SignalStore para el estado compartido del dominio cuando corresponda.
- El estado de un coro debe estar aislado del estado de otros coros.
- La caché del elenco se mantiene en memoria y se identifica por `choirId`.
- Evitar múltiples GET concurrentes para obtener el mismo recurso.
- No utilizar `localStorage` como sustituto de la fuente de verdad del backend.
- Invalidar o actualizar el estado compartido después de las mutaciones correspondientes.
- Evitar que una respuesta atrasada sobrescriba un estado más reciente.

## 5. Elenco y secciones vocales

- Obtener integrantes y secciones desde el backend.
- Las secciones vocales son configurables por coro.
- No asumir un catálogo fijo de soprano, alto, tenor y bajo.
- No inventar integrantes ni posiciones para completar visualmente una pantalla.
- Distinguir visualmente las secciones sin depender exclusivamente de etiquetas de texto.
- Mantener separada la pertenencia al elenco de la asignación de un integrante a una formación.

## 6. Editor visual y escenario

- El escenario debe representar las posiciones y los integrantes reales de la formación.
- Soportar interacción con mouse y pantallas táctiles.
- Mantener diferenciados el director, los integrantes y sus posiciones.
- Respetar las reglas de persistencia y los contratos del backend.
- No confundir la sección vocal de un integrante con su agrupación efectiva dentro de una formación.
- Las agrupaciones y posiciones persistidas deben provenir de los datos reales.

### Carga, vacío y error

- Durante la carga, conservar la estructura del escenario y mostrar skeletons que representen filas o posiciones.
- Los skeletons no deben simular integrantes ni posiciones persistidas.
- El estado vacío debe reemplazar los skeletons cuando finaliza la carga sin resultados.
- El estado de error debe reemplazar los skeletons y ofrecer una acción de reintento.
- Respetar `prefers-reduced-motion`.
- No mostrar simultáneamente skeletons, estado vacío y datos como si fueran estados equivalentes.

## 7. Versiones y borradores de formaciones

- Respetar la separación entre formación, versión y borrador.
- No asumir que la versión más reciente es necesariamente la publicada.
- Mantener explícita la versión seleccionada cuando el contrato lo requiera.
- No modificar una versión histórica como si fuera un borrador editable.
- Después de guardar, reflejar el resultado confirmado por el backend.
- Los errores de validación, autorización y conflicto deben conservar su significado.

## 8. Bloqueo de posiciones — CHOIR-107

Contrato backend:

- Bloquear: `PUT .../positions/{positionId}/lock`.
- Desbloquear: `DELETE .../positions/{positionId}/lock`.
- Ambas operaciones responden `204` y no requieren body.
- El identificador utilizado es `positionId`, no `singerId`.
- La consulta del borrador incluye el atributo `locked`.
- Los conflictos de bloqueo o actualización pueden responder `409`.
- Los errores de autorización pueden responder `403`.

Comportamiento esperado:

- Representar visualmente las posiciones bloqueadas.
- Ofrecer acciones contextuales de bloqueo y desbloqueo.
- Impedir el movimiento de una posición bloqueada mediante drag and drop.
- No impedir quitar un coreuta de la formación por el solo hecho de estar bloqueado.
- Sincronizar el estado con el backend.
- Manejar correctamente errores `403` y `409`, sin mostrar un estado local que no se haya confirmado.

## 9. Quitar coreutas — CHOIR-108

- Permitir quitar un coreuta de una formación desde el editor visual.
- La acción debe estar disponible tanto para posiciones bloqueadas como desbloqueadas.
- Quitar al integrante de la formación no significa eliminarlo del elenco ni de la selección general.
- Al quitarlo, debe desaparecer del escenario y quedar excluido del próximo payload de guardado.
- Mantener consistente el estado local.
- Evitar interferencias entre drag and drop y acciones contextuales.
- Prestar atención a botones anidados y propagación de eventos.
- Verificar que el cambio persista después de guardar y volver a cargar la formación.
- No implementar endpoints nuevos si el contrato existente permite representar la eliminación omitiendo la posición en el guardado.

## 10. Accesibilidad y experiencia de usuario

- Utilizar elementos semánticos y controles accesibles.
- Las acciones importantes deben poder identificarse sin depender únicamente del color.
- Proporcionar nombres accesibles para controles de icono.
- Mantener estados de foco visibles.
- Respetar `prefers-reduced-motion`.
- Evitar animaciones innecesarias y cambios bruscos de layout.
- Los errores deben ser comprensibles y permitir recuperarse cuando sea posible.

## 11. Pruebas

Cada cambio debe incorporar pruebas acordes con su alcance.

Verificar, según corresponda:

- Renderizado y comportamiento de componentes.
- Estados de carga, vacío y error.
- Reintentos.
- Integración con servicios y contratos HTTP.
- Estado compartido y aislamiento por `choirId`.
- Ausencia de solicitudes duplicadas.
- Persistencia de cambios.
- Bloqueo y desbloqueo de posiciones.
- Restricción de drag and drop para posiciones bloqueadas.
- Eliminación de integrantes de una formación.
- Tratamiento de errores `403` y `409`.
- Accesibilidad y movimiento reducido.

Las pruebas deben comprobar comportamiento observable, no detalles internos innecesarios.
No eliminar ni debilitar pruebas existentes para hacer pasar una implementación.
No utilizar datos ficticios que oculten la ausencia de integración real.

## 12. Flujo Git y Pull Requests

- Crear una rama específica por ticket o unidad de trabajo acordada.
- No trabajar directamente sobre `main`, salvo que el cambio documental o la tarea lo requiera expresamente.
- No mezclar cambios ajenos al ticket.
- Antes de comenzar, comprobar la rama y el estado del repositorio.
- No descartar modificaciones locales que no pertenezcan al trabajo actual.
- Mantener commits pequeños y con mensajes descriptivos.
- Abrir PR contra la rama objetivo acordada.
- Revisar el diff completo y el resultado de CI antes de solicitar el merge.
- No considerar terminado un ticket hasta verificar el merge y actualizar Jira.

## 13. Proceso obligatorio para cada ticket

1. Leer el ticket y sus criterios de aceptación en Jira.
2. Revisar dependencias, subtareas y comentarios.
3. Diagnosticar el estado actual del frontend y del contrato backend.
4. Identificar los archivos, componentes, servicios, stores y pruebas que deben cambiar.
5. Presentar un plan concreto antes de implementar.
6. Implementar paso a paso, sin ampliar el alcance.
7. Agregar o actualizar pruebas.
8. Ejecutar las verificaciones disponibles.
9. Revisar el diff y confirmar que no haya cambios ajenos al ticket.
10. Publicar la rama y abrir el PR.
11. Verificar CI y revisión.
12. Una vez integrado, actualizar Jira con el resultado real.

## 14. Criterio de finalización

Un ticket frontend está completo cuando:

- Se cumplen todos sus criterios de aceptación.
- Los contratos backend se respetan.
- Los estados de carga, vacío y error están resueltos.
- Las pruebas relevantes están incorporadas y pasan.
- No quedan datos ficticios ni comportamientos temporales.
- El diff no contiene cambios ajenos al ticket.
- El PR fue integrado en la rama objetivo.
- Jira refleja el resultado final.
