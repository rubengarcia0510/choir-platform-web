# CHOIR-125 — Reporte de Implementación y Revisión Técnica (DS-01)

**Fecha:** 2026-11-16  
**Rama:** `feature/125-design-system-foundations`  
**Ticket Jira:** [CHOIR-125](https://rubengarcia0510.atlassian.net/browse/CHOIR-125)  
**Unidad de Trabajo:** DS-01 — Fundamentos visuales compartidos  

---

## 1. Resumen de Hallazgos y Correcciones

En la revisión técnica de la implementación inicial de CHOIR-125 se resolvieron los siguientes 4 puntos clave:

1. **Carga global de patrones compartidos:**
   - *Problema:* `shared-patterns.scss` se importaba dentro de `src/app/app.scss`, lo cual limitaba su alcance por el encapsulamiento de estilos del componente raíz de Angular (`App`), impidiendo que afectara de forma predecible a componentes bajo `router-outlet`.
   - *Solución:* Se trasladó a `src/shared-patterns.scss` y se incorporó en la raíz global vía `src/styles.scss`. Se retiró la importación de `app.scss`, preservando este último únicamente para el layout raíz.

2. **Estados interactivos consistentes en botones:**
   - *Problema:* Existía la posibilidad de que botones deshabilitados (`:disabled`) recibieran transformaciones de movimiento (`translateY(-2px)`) en hover.
   - *Solución:* Se restringieron los selectores de hover y active a `:hover:not(:disabled):not([aria-disabled="true"])`. Se definió un estado disabled con `opacity: 0.55`, `cursor: not-allowed` y `transform: none !important`. Se incorporó soporte semántico para estados de carga/espera mediante `[aria-busy="true"]` (`cursor: wait`).

3. **Corrección de contraste WCAG 2.2 AA:**
   - *Problema:* El token original `--choir-muted` (`#747A70`) sobre el fondo operativo `#FCFBF8` alcanzaba un ratio de 4.26:1, inferior al mínimo de 4.5:1 exigido para texto normal.
   - *Solución:* Se ajustó al valor canónico `#6B7168` (definido en la especificación CHOIR-124), alcanzando 4.85:1 sobre fondo de página y 5.02:1 sobre superficie blanca.

4. **Consolidación de tokens y compatibilidad retroactiva:**
   - *Problema:* Coexistían variables anteriores (`--ink`, `--muted`, `--accent`, etc.) con los tokens canónicos `--choir-*`.
   - *Solución:* Se establecieron como canónicos todos los tokens `--choir-*`, mapeando las variables heredadas como alias directos (`--ink: var(--choir-ink);`, etc.) en `styles.scss`. Esto asegura interoperabilidad total con componentes existentes sin regresiones visuales.

---

## 2. Tabla de Medición de Contraste (WCAG 2.2 AA)

Mediciones calculadas mediante la fórmula estándar de luminancia relativa W3C:

| Elemento / Combinación | Color Primer Plano | Color Fondo | Ratio Calculado | Criterio WCAG AA | Estado |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Texto operativo principal (`--choir-ink`)** | `#252B25` | `#FCFBF8` (página) | **13.99:1** | $\ge 4.5:1$ (Texto normal) | ✅ Cumple |
| **Texto operativo principal (`--choir-ink`)** | `#252B25` | `#FFFFFF` (superficie) | **14.47:1** | $\ge 4.5:1$ (Texto normal) | ✅ Cumple |
| **Texto secundario (`--choir-muted` ajustado)** | `#6B7168` | `#FCFBF8` (página) | **4.85:1** | $\ge 4.5:1$ (Texto normal) | ✅ Cumple *(antes 4.26:1)* |
| **Texto secundario (`--choir-muted` ajustado)** | `#6B7168` | `#FFFFFF` (superficie) | **5.02:1** | $\ge 4.5:1$ (Texto normal) | ✅ Cumple *(antes 4.41:1)* |
| **Texto enlace/acento (`--choir-accent`)** | `#456B4C` | `#FCFBF8` (página) | **5.86:1** | $\ge 4.5:1$ (Texto normal) | ✅ Cumple |
| **Botón primario (`.button-primary`)** | `#FFFFFF` | `#456B4C` (accent) | **6.07:1** | $\ge 4.5:1$ (Componentes/Texto) | ✅ Cumple |
| **Botón primario en hover** | `#FFFFFF` | `#34533A` (accent-dark) | **8.59:1** | $\ge 4.5:1$ (Componentes/Texto) | ✅ Cumple |
| **Botón secundario (`.button-secondary`)** | `#252B25` | `#FFFFFF` (surface) | **14.47:1** | $\ge 4.5:1$ (Componentes/Texto) | ✅ Cumple |
| **Botón peligro (`.button-danger`)** | `#FFFFFF` | `#C82333` (danger) | **5.61:1** | $\ge 4.5:1$ (Componentes/Texto) | ✅ Cumple |
| **Ambiente artístico: Texto marfil** | `#F5F1E8` | `#00102A` (night) | **16.82:1** | $\ge 4.5:1$ (Texto normal) | ✅ Cumple |
| **Ambiente artístico: Texto blanco** | `#FFFFFF` | `#00102A` (night) | **18.96:1** | $\ge 4.5:1$ (Texto normal) | ✅ Cumple |
| **Ambiente artístico: Dorado (`--choir-gold`)** | `#D8B879` | `#00102A` (night) | **9.98:1** | $\ge 4.5:1$ (Texto/Gráficos) | ✅ Cumple |

---

## 3. Verificación de Compilación y Suites de Pruebas

- **`npm run build`:** Compilación limpia exitosa (código 0). Bundle de estilos globales de 4.80 kB (1.22 kB transfer).
- **`npm run test:ci`:** 13 suites pasaron exitosamente (97 pruebas unitarias e integraciones confirmadas).
- **Foco visible y accesible:** Regla global `:focus-visible` activa para enlaces, botones, inputs, selects y textareas con `--focus-ring: 3px solid #91aa91` y `outline-offset: 3px`.
- **Preferencia de movimiento reducido:** Regla `@media (prefers-reduced-motion: reduce)` activa estableciendo `--transition-duration: 0ms`.
