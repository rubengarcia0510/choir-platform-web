# CHOIR-85 — Frontend: Configuración visual de restricciones de proximidad entre coreutas

## Fuente de verdad y contexto
- Jira: [CHOIR-85](https://rubengarcia0510.atlassian.net/browse/CHOIR-85)
- Repositorio: `rubengarcia0510/choir-platform-web`
- Documento general: `docs/tickets/FRONTEND.md`
- Roadmap: `docs/tickets/ROADMAP.md`
- Backend relacionado: CHOIR-85 (`choir-platform`)
- Editor base: CHOIR-21, CHOIR-107, CHOIR-110

---

## 1. Objetivo
Permitir al director configurar relaciones de **proximidad espacial** entre dos coreutas específicos dentro del editor de formaciones (`FormationsPage`), fijando una distancia euclidiana máxima admisible entre ambos sin imponer un agrupamiento automático por cuerda.

---

## 2. Alcance
1. Incorporar el modelo TypeScript `ProximityConstraint` (`id`, `formationId`, `firstSingerId`, `secondSingerId`, `maxDistance`).
2. Extender el servicio de formaciones (`FormationDraftsApiService`) con los métodos:
   - `listProximityConstraints(choirId, concertId, repertoireItemId, formationId)`
   - `createProximityConstraint(choirId, concertId, repertoireItemId, formationId, request)`
   - `deleteProximityConstraint(choirId, concertId, repertoireItemId, formationId, constraintId)`
3. Agregar en la barra lateral o panel de configuración de la formación una sección "Restricciones de Proximidad".
4. Permitir seleccionar dos integrantes activos y especificar una distancia máxima positiva en las mismas unidades que las coordenadas del escenario (`x`/`y`, normalizadas entre `0` y `100`). No mostrar ni etiquetar el valor como metros.
5. Renderizar en el escenario visual un indicador/línea punteada tenue que conecte a ambos coreutas cuando una restricción esté activa y seleccionada.
6. Manejar estados de carga, guardado y eliminación con confirmación accesible.

---

## 3. Fuera de alcance
- Restricciones de movilidad o visibilidad (CHOIR-86).
- Cálculo o validación matemática pesada en el cliente (responsabilidad del backend en CHOIR-87).
- Restricciones globales que trasciendan la formación actual.

---

## 4. Contrato HTTP Backend
Base: `/api/choirs/{choirId}/concerts/{concertId}/repertoire/{repertoireItemId}/formations/{formationId}/constraints/proximity`
- `GET /` $\to$ `200 OK` lista de restricciones.
- `POST /` $\to$ `201 Created` payload: `{ "firstSingerId": 10, "secondSingerId": 14, "maxDistance": 2.5 }`.
- `DELETE /{constraintId}` $\to$ `204 No Content`.

---

## 5. Pruebas requeridas (Vitest)
- Renderiza la lista de restricciones de proximidad recuperadas del backend.
- Envía el payload correcto al asociar una nueva pareja de coreutas.
- No permite seleccionar al mismo coreuta en ambos desplegables.
- Elimina la restricción visual y llama a `deleteProximityConstraint`.
- No afecta las posiciones ni bloqueos existentes.
- Expresa la distancia en unidades normalizadas del escenario; no asume una conversión a metros.
