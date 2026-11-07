# CHOIR-110 — Integrar la creación y visualización de la formación agrupada por cuerda

## 1. Objetivo

Integrar en el frontend la creación de una formación nueva cuya distribución inicial de posiciones es generada por el backend y agrupada según las cuerdas vocales configuradas para el coro.

La formación resultante debe visualizarse en el editor existente y permitir que el director modifique libremente las posiciones antes de guardar el borrador.

La distribución inicial es una conveniencia visual. No debe convertirse en una restricción espacial ni impedir que el director mezcle coreutas de distintas cuerdas.

## 2. Contexto funcional

Esta tarea implementa la parte frontend de CHOIR-89.

La generación de posiciones iniciales ya está implementada en backend mediante CHOIR-109.

El backend:
- Utiliza las cuerdas vocales reales configuradas para el coro.
- No presupone un catálogo fijo de cuerdas.
- Genera posiciones iniciales agrupadas por cuerda.
- Crea la formación y su primera versión DRAFT.
- Devuelve los identificadores y metadatos de la formación creada.
- No devuelve las posiciones iniciales en la respuesta de creación.

Por lo tanto, después de crear la formación, el frontend debe recuperar el borrador mediante el endpoint existente de consulta.

**No implementar en Angular el algoritmo de distribución.** La generación de posiciones es responsabilidad exclusiva del backend.

## 3. Alcance

Implementar en la pantalla de formaciones:

1. Una acción explícita para crear una formación nueva.
2. Captura y validación del nombre y descripción.
3. Invocación del endpoint existente de creación.
4. Recuperación del borrador inicial mediante GET.
5. Incorporación de la nueva formación al selector.
6. Selección automática de la formación recién creada.
7. Visualización de las posiciones generadas por backend.
8. Edición manual de las posiciones mediante el editor existente.
9. Persistencia de los cambios utilizando el mecanismo actual de guardado.

No modificar formaciones existentes como efecto secundario de la creación.

## 4. Inspección previa obligatoria

Antes de implementar:

- Revisar `src/app/pages.ts` y el componente `FormationPage`.
- Revisar `src/app/pages.spec.ts`.
- Revisar `src/app/formations/formation-draft.model.ts`.
- Revisar `src/app/formations/formation-drafts-api.service.ts`.
- Revisar `src/app/formations/formation-drafts-api.service.spec.ts`.
- Revisar `src/app/formations/formation-drafts.integration.spec.ts`.

Reutilizar los modelos, servicios y mecanismos de estado existentes.

No crear un segundo servicio para las operaciones que ya están implementadas.

No duplicar lógica de carga, selección, edición o guardado de borradores.

## 5. Integración con el servicio existente

El servicio ya dispone de las operaciones necesarias:

- `createFormation(choirId, concertId, repertoireItemId, request)`
- `listFormations(...)`
- `getDraft(...)`
- `saveDraftPositions(...)`

Reutilizar estos métodos y sus modelos existentes.

El endpoint de creación es:

`POST /api/choirs/{choirId}/concerts/{concertId}/repertoire/{repertoireItemId}/formations`

El request de creación contiene:

- `name`: obligatorio.
- `description`: opcional.

La respuesta contiene los identificadores y metadatos de la formación creada, pero no las posiciones.

Después de recibir una respuesta exitosa:

1. Obtener el identificador de la formación creada.
2. Incorporarla al listado de formaciones del contexto actual.
3. Seleccionarla.
4. Solicitar su borrador mediante `getDraft(...)`.
5. Aplicar las posiciones devueltas utilizando el mecanismo existente.
6. Mostrar la formación en el editor.

No asumir que la respuesta del POST contiene las posiciones.

## 6. Comportamiento de la interfaz

Agregar una acción explícita para crear una formación nueva dentro del flujo actual de `FormationPage`.

La creación debe estar asociada al coro, concierto y elemento de repertorio seleccionados.

Solicitar:
- Nombre de la formación.
- Descripción opcional.

Validaciones:
- El nombre no puede estar vacío.
- El nombre debe eliminar espacios al principio y al final antes de enviarse.
- La descripción es opcional.
- No enviar solicitudes cuando falte el contexto necesario: coro, concierto o elemento de repertorio.
- Mostrar los errores de validación sin ejecutar el POST.

Durante la creación:
- Deshabilitar la acción para evitar solicitudes duplicadas.
- Mostrar un indicador de operación en curso.
- Evitar que varios clics generen varias formaciones.
- Mantener el contexto de la operación asociado a los identificadores originales.

No crear automáticamente una formación cuando el usuario cambia de coro, concierto, repertorio o selección de formación.

La creación debe ocurrir únicamente como consecuencia de una acción explícita del director.

## 7. Manejo de respuestas asíncronas

Considerar los siguientes escenarios:

### 7.1 POST exitoso y GET exitoso

- Incorporar la formación al listado.
- Seleccionarla.
- Recuperar el borrador.
- Mostrar las posiciones generadas por backend.
- Habilitar la edición normal.

### 7.2 POST fallido

- Mostrar el error correspondiente.
- No incorporar una formación inexistente al listado.
- No cambiar la selección actual.
- Permitir que el usuario vuelva a intentar la operación.

### 7.3 POST exitoso y GET fallido

Este escenario requiere un tratamiento especial.

La formación ya fue creada en backend. Por lo tanto:

- Conservar la formación en el listado.
- Mantener seleccionada la formación creada si el contexto sigue siendo válido.
- Informar que la formación fue creada, pero no se pudieron cargar sus posiciones.
- Permitir reintentar la carga del borrador.
- No volver a ejecutar el POST al reintentar la carga.

Separar claramente el estado de creación del estado de carga del borrador.

### 7.4 Cambio de contexto durante la operación

Si el usuario cambia el coro, concierto, repertorio o formación mientras hay solicitudes pendientes:

- Evitar que una respuesta tardía modifique el contexto nuevo.
- No aplicar posiciones pertenecientes a otra formación.
- No reemplazar la selección actual con una respuesta obsoleta.
- Utilizar el mecanismo de cancelación o control de concurrencia que ya exista en el proyecto.

La respuesta del backend no debe aplicarse si ya no corresponde al contexto activo.

## 8. Visualización y edición

La visualización debe reutilizar el editor actual.

Las posiciones iniciales deben provenir exclusivamente del borrador recuperado desde backend.

El frontend debe:
- Mostrar todas las posiciones devueltas.
- Respetar las coordenadas y los identificadores recibidos.
- No recalcular ni reorganizar las posiciones.
- Permitir mover coreutas.
- Permitir mezclar coreutas de distintas cuerdas.
- Permitir agregar o quitar coreutas según las capacidades actuales del editor.
- Guardar los cambios mediante `saveDraftPositions(...)`.

La agrupación inicial no debe introducir restricciones nuevas sobre movimientos posteriores.

No inferir que una cuerda debe ocupar una región fija del escenario.

## 9. Preservación de datos

La operación debe crear una formación nueva y no modificar las existentes.

Garantizar que:

- Crear una formación no sobrescribe otra formación.
- No se reutiliza accidentalmente el identificador de una formación existente.
- No se modifican borradores de otras formaciones.
- No se alteran posiciones guardadas previamente.
- El guardado posterior afecta únicamente al borrador de la formación seleccionada.

No introducir llamadas de guardado automáticas durante la creación.

## 10. Archivos involucrados

Revisar y modificar únicamente los archivos necesarios, priorizando:

- `src/app/pages.ts`
- `src/app/pages.spec.ts`
- `src/app/formations/formation-drafts-api.service.ts`
- `src/app/formations/formation-drafts-api.service.spec.ts`
- `src/app/formations/formation-drafts.integration.spec.ts`

No modificar el contrato HTTP existente salvo que se detecte una incompatibilidad real.

No agregar dependencias externas para resolver este alcance.

## 11. Pruebas requeridas

Agregar o adaptar pruebas unitarias y de integración.

### Creación

- Permite crear una formación con nombre válido.
- Permite crearla con descripción vacía.
- Envía correctamente los identificadores de coro, concierto y repertorio.
- Envía el nombre y descripción esperados.
- No crea formaciones si el nombre está vacío.
- No crea formaciones si falta el contexto requerido.
- Evita solicitudes duplicadas durante una operación en curso.

### Recuperación del borrador

- Después de crear la formación, consulta su borrador.
- Utiliza las posiciones devueltas por backend.
- No intenta obtener posiciones desde la respuesta del POST.
- Muestra correctamente formaciones con distintas cantidades de cuerdas.
- No presupone cuatro cuerdas ni nombres específicos.

### Edición

- Permite mover coreutas después de la creación.
- Permite mezclar coreutas de distintas cuerdas.
- Guarda los cambios utilizando el servicio existente.
- No modifica otras formaciones.

### Errores y concurrencia

- Un POST fallido no agrega una formación al listado.
- Un GET fallido después de un POST exitoso no provoca otro POST al reintentar.
- Una respuesta tardía no reemplaza un contexto más reciente.
- Una respuesta de otra formación no modifica el borrador seleccionado.
- Los errores se muestran sin perder innecesariamente el estado actual.

## 12. Criterios de aceptación

- [ ] El director puede crear explícitamente una formación nueva desde el flujo existente.
- [ ] Se validan nombre y contexto antes de enviar la solicitud.
- [ ] El frontend utiliza el endpoint existente de creación.
- [ ] El frontend recupera el borrador inicial mediante GET.
- [ ] La formación creada aparece en el selector y queda seleccionada.
- [ ] Se visualizan las posiciones agrupadas generadas por backend.
- [ ] Se admiten distintas cantidades y nombres de cuerdas.
- [ ] El director puede editar libremente las posiciones.
- [ ] Los cambios se guardan en el borrador correcto.
- [ ] La creación no modifica otras formaciones.
- [ ] Se manejan correctamente los errores de POST y GET.
- [ ] No se producen duplicados por doble clic o reintentos de carga.
- [ ] Las respuestas tardías no alteran el contexto activo.
- [ ] Las pruebas existentes siguen pasando.

## 13. Restricciones de implementación

- No implementar el algoritmo de agrupación en frontend.
- No introducir nombres de cuerdas hardcodeados.
- No asumir una cantidad fija de cuerdas.
- No convertir la agrupación inicial en una regla de validación espacial.
- No crear una formación automáticamente al cambiar selectores.
- No duplicar servicios ni modelos existentes.
- No modificar formaciones anteriores.
- No volver a ejecutar POST cuando solamente falla la recuperación del borrador.
- No modificar backend dentro de esta tarea.
- No ampliar el alcance a funcionalidades de otras historias.

## 14. Verificación final

Ejecutar la suite de pruebas frontend con:

`npm test -- --watch=false`

Verificar además que:
- No haya regresiones en la pantalla de formaciones.
- Los tests cubran los escenarios de creación y recuperación.
- No se hayan introducido errores de TypeScript.
- No se hayan agregado dependencias innecesarias.

Al finalizar, informar:
- Archivos modificados.
- Comportamiento implementado.
- Pruebas agregadas.
- Resultado de `npm test -- --watch=false`.
- Cualquier limitación o dependencia detectada.
