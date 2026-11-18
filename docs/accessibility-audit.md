# Auditoría de accesibilidad CHOIR-128

## 1. Objetivo

Documentar el inventario estático de rutas y estados, los hallazgos de accesibilidad y los resultados de las pruebas automatizadas de la aplicación CHOIR.

Este informe refleja únicamente las comprobaciones efectivamente realizadas. No declara conformidad global WCAG 2.2 AA.

## 2. Cobertura automatizada

La auditoría automatizada contempla:

- Tests frontend.
- Build Angular.
- axe-core.
- Playwright con Chromium.
- Revisión de las rutas y estados renderizados disponibles.

El último CI registrado para esta rama completó correctamente tests, build y auditoría de accesibilidad.

Las pruebas automatizadas no sustituyen la validación manual con teclado y tecnologías de asistencia.

## 3. Hallazgos y correcciones

- A11Y-01: corrección del enlace para saltar al contenido principal, integrada mediante CHOIR-134.
- A11Y-02: corrección del tratamiento del foco global, integrada.
- A11Y-03: alternativa de teclado para las interacciones correspondientes, integrada mediante CHOIR-135.
- A11Y-04: semántica del escenario de Formaciones. Su validación manual se separó en CHOIR-138.
- A11Y-05: evaluación del nombre accesible de la ilustración de Inicio, separada en CHOIR-139.
- A11Y-06: anuncio accesible de operaciones sobre coros, integrado mediante CHOIR-136 y validado manualmente con NVDA.

## 4. Validaciones manuales confirmadas

- [x] NVDA anuncia correctamente el éxito al crear un coro.
- [x] NVDA anuncia correctamente el éxito al editar un coro.

No se extrapolan estos resultados a otras pantallas o interacciones.

## 5. Trabajo separado

Las validaciones manuales que no forman parte del alcance cerrado de CHOIR-128 tienen seguimiento independiente:

- CHOIR-137: navegación por teclado, foco y formularios en pantallas públicas y Mi coro.
- CHOIR-138: semántica y operación accesible del escenario de Formaciones, cuando existan pantalla y datos operativos de prueba.
- CHOIR-139: evaluación del nombre accesible de la ilustración de Inicio.
- CHOIR-140: medición manual de contraste de texto, controles y estados visuales.

Las mediciones responsive, zoom/reflow y objetivos táctiles se gestionan por separado en CHOIR-129.

## 6. Limitaciones

- Las pruebas automatizadas cubren los estados que pueden renderizarse en el entorno de test.
- No se consideran verificadas las pantallas o interacciones que requieren datos de dominio no disponibles.
- No se declara conformidad WCAG 2.2 AA.
- La ausencia de un hallazgo automatizado no demuestra por sí sola que una interacción sea accesible.

## 7. Criterio de aceptación de CHOIR-128

El alcance de CHOIR-128 queda satisfecho con:

1. Inventario estático de rutas y estados documentado.
2. Hallazgos A11Y-01 a A11Y-06 reconciliados con sus correcciones y evidencias.
3. Resultados y limitaciones de las pruebas automatizadas documentados.
4. Validaciones manuales efectivamente confirmadas identificadas sin extrapolar resultados.
5. Validaciones manuales pendientes trasladadas a tickets independientes.
6. Informe integrado mediante PR a `124-integradora`.

Este cierre no implica que las tareas trasladadas estén completadas ni que exista conformidad global WCAG 2.2 AA.
