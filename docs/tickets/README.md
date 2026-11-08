# Especificaciones de tickets CHOIR — Frontend

Este directorio contiene las especificaciones de implementación de los tickets Jira del frontend (`choir-platform-web`).

> 📌 Para consultar el orden de ejecución sugerido, el grafo de dependencias de Angular y la relación con el backend, consulta el documento principal: **[ROADMAP.md](ROADMAP.md)**.
> 📌 Para convenciones de arquitectura y buenas prácticas de frontend, consulta: **[FRONTEND.md](FRONTEND.md)**.

---

## Estado Actual de los Tickets en `main`

| Ticket | Estado | Título |
|---|---|---|
| **[CHOIR-107](CHOIR-107.md)** | ✅ Completado | Bloqueo y desbloqueo de posiciones en el escenario |
| **[CHOIR-108](CHOIR-108.md)** | ✅ Completado | Eliminación contextual de coreutas desde el escenario |
| **[CHOIR-110](CHOIR-110.md)** | ✅ Completado | Creación de formaciones y visualización inicial agrupada por cuerda |
| **[CHOIR-82](https://rubengarcia0510.atlassian.net/browse/CHOIR-82)** | ✅ Completado | CI y automatización de despliegue en GitHub Pages |
| **[CHOIR-85](CHOIR-85.md)** | ⏳ Pendiente (Fase 1) | Configuración visual de restricciones de proximidad entre coreutas |
| **[CHOIR-86](CHOIR-86.md)** | ⏳ Pendiente (Fase 1) | Configuración visual de restricciones de movilidad y visibilidad |
| **[CHOIR-87](CHOIR-87.md)** | ⏳ Pendiente (Fase 1) | Manejo de errores de validación espacial y feedback en escenario |
| **[CHOIR-20](CHOIR-20.md)** | ⏳ Pendiente (Fase 2) | Panel de reglas especiales de escena por canción en el repertorio |
| **[CHOIR-25](CHOIR-25.md)** | ⏳ Pendiente (Fase 3) | Comparación y selección de alternativas de transición |
| **[CHOIR-26](CHOIR-26.md)** | ⏳ Pendiente (Fase 3) | Selector y configuración de preferencias artísticas de transición |
| **[CHOIR-29](CHOIR-29.md)** | ⏳ Pendiente (Fase 4) | Comparador visual y aplicación de adaptaciones por ausencia |
| **[CHOIR-30](CHOIR-30.md)** | ⏳ Pendiente (Fase 5) | Modo ensayo y reproducción interactiva de transiciones |
| **[CHOIR-32](CHOIR-32.md)** | ⏳ Pendiente (Fase 5) | Vista de coreuta con repertorio, posiciones y movimientos individuales |

---

## Cómo usar las especificaciones

1. Consulta **[ROADMAP.md](ROADMAP.md)** para verificar si el ticket del backend correspondiente ya está disponible en `main` de `choir-platform`.
2. Lee **[FRONTEND.md](FRONTEND.md)** para alinearte con las pautas de Angular 22, SignalStore, accesibilidad y presupuesto de estilos.
3. No simules datos falsos ni hardcodees catálogos fijos de cuerdas o integrantes.
4. Toda implementación debe incluir pruebas unitarias y de integración con Vitest (`npm test -- --watch=false`).
5. Verifica siempre que `npm run build` finalice con código de salida 0 y respete los presupuestos de estilos (`anyComponentStyle` < 15 kB).
6. Jira es la fuente de verdad. Los specs frontend documentan el alcance de integración y señalan contratos aún propuestos; no inventes rutas o payloads para llenar esos vacíos.
