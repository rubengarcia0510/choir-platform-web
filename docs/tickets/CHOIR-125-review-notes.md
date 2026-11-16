# CHOIR-125 — Reporte de Implementación y Revisión Técnica (DS-01)

**Fecha:** 2026-11-16  
**Rama:** `feature/125-design-system-foundations`  
**Ticket Jira:** [CHOIR-125](https://rubengarcia0510.atlassian.net/browse/CHOIR-125)  
**Unidad de Trabajo:** DS-01 — Fundamentos visuales compartidos

---

## 1. Resumen de Hallazgos y Correcciones

En la revisión técnica de la implementación inicial de CHOIR-125 se resolvieron los siguientes 4 puntos clave:

1. **Carga global de patrones compartidos:**
   - _Problema:_ `shared-patterns.scss` se importaba dentro de `src/app/app.scss`, lo cual limitaba su alcance por el encapsulamiento de estilos del componente raíz de Angular (`App`), impidiendo que afectara de forma predecible a componentes bajo `router-outlet`.
   - _Solución:_ Se trasladó a `src/shared-patterns.scss` y se incorporó en la raíz global vía `src/styles.scss`. Se retiró la importación de `app.scss`, preservando este último únicamente para el layout raíz.

2. **Estados interactivos consistentes en botones:**
   - _Problema:_ Existía la posibilidad de que botones deshabilitados (`:disabled`) recibieran transformaciones de movimiento (`translateY(-2px)`) en hover.
   - _Solución:_ Se restringieron los selectores de hover y active a `:hover:not(:disabled):not([aria-disabled="true"])`. Se definió un estado disabled con `opacity: 0.55`, `cursor: not-allowed` y `transform: none !important`. Se incorporó soporte semántico para estados de carga/espera mediante `[aria-busy="true"]` (`cursor: wait`).

3. **Corrección de contraste WCAG 2.2 AA:**
   - _Problema:_ El token original `--choir-muted` (`#747A70`) sobre el fondo operativo `#FCFBF8` alcanzaba un ratio de 4.26:1, inferior al mínimo de 4.5:1 exigido para texto normal.
   - _Solución:_ Se ajustó al valor canónico `#6B7168` (definido en la especificación CHOIR-124), alcanzando 4.85:1 sobre fondo de página y 5.02:1 sobre superficie blanca.

4. **Consolidación de tokens y compatibilidad retroactiva:**
   - _Problema:_ Coexistían variables anteriores (`--ink`, `--muted`, `--accent`, etc.) con los tokens canónicos `--choir-*`.
   - _Solución:_ Se establecieron como canónicos todos los tokens `--choir-*`, mapeando las variables heredadas como alias directos (`--ink: var(--choir-ink);`, etc.) en `styles.scss`. Esto asegura interoperabilidad total con componentes existentes sin regresiones visuales.

---

## 2. Tabla de Medición de Contraste (WCAG 2.2 AA)

Mediciones calculadas mediante la fórmula estándar de luminancia relativa W3C:

| Elemento / Combinación                          | Color Primer Plano |       Color Fondo       | Ratio Calculado |        Criterio WCAG AA         |           Estado           |
| :---------------------------------------------- | :----------------: | :---------------------: | :-------------: | :-----------------------------: | :------------------------: |
| **Texto operativo principal (`--choir-ink`)**   |     `#252B25`      |   `#FCFBF8` (página)    |   **13.99:1**   |   $\ge 4.5:1$ (Texto normal)    |         ✅ Cumple          |
| **Texto operativo principal (`--choir-ink`)**   |     `#252B25`      | `#FFFFFF` (superficie)  |   **14.47:1**   |   $\ge 4.5:1$ (Texto normal)    |         ✅ Cumple          |
| **Texto secundario (`--choir-muted` ajustado)** |     `#6B7168`      |   `#FCFBF8` (página)    |   **4.85:1**    |   $\ge 4.5:1$ (Texto normal)    | ✅ Cumple _(antes 4.26:1)_ |
| **Texto secundario (`--choir-muted` ajustado)** |     `#6B7168`      | `#FFFFFF` (superficie)  |   **5.02:1**    |   $\ge 4.5:1$ (Texto normal)    | ✅ Cumple _(antes 4.41:1)_ |
| **Texto enlace/acento (`--choir-accent`)**      |     `#456B4C`      |   `#FCFBF8` (página)    |   **5.86:1**    |   $\ge 4.5:1$ (Texto normal)    |         ✅ Cumple          |
| **Botón primario (`.button-primary`)**          |     `#FFFFFF`      |   `#456B4C` (accent)    |   **6.07:1**    | $\ge 4.5:1$ (Componentes/Texto) |         ✅ Cumple          |
| **Botón primario en hover**                     |     `#FFFFFF`      | `#34533A` (accent-dark) |   **8.59:1**    | $\ge 4.5:1$ (Componentes/Texto) |         ✅ Cumple          |
| **Botón secundario (`.button-secondary`)**      |     `#252B25`      |   `#FFFFFF` (surface)   |   **14.47:1**   | $\ge 4.5:1$ (Componentes/Texto) |         ✅ Cumple          |
| **Botón peligro (`.button-danger`)**            |     `#FFFFFF`      |   `#C82333` (danger)    |   **5.61:1**    | $\ge 4.5:1$ (Componentes/Texto) |         ✅ Cumple          |
| **Ambiente artístico: Texto marfil**            |     `#F5F1E8`      |    `#00102A` (night)    |   **16.82:1**   |   $\ge 4.5:1$ (Texto normal)    |         ✅ Cumple          |
| **Ambiente artístico: Texto blanco**            |     `#FFFFFF`      |    `#00102A` (night)    |   **18.96:1**   |   $\ge 4.5:1$ (Texto normal)    |         ✅ Cumple          |
| **Ambiente artístico: Dorado (`--choir-gold`)** |     `#D8B879`      |    `#00102A` (night)    |   **9.98:1**    |  $\ge 4.5:1$ (Texto/Gráficos)   |         ✅ Cumple          |

---

## 3. Verificación de Compilación y Suites de Pruebas

Los resultados vigentes de la rama están en la sección 5. La ejecución de la
primera revisión (13 suites, 97 pruebas) quedó superada por la sección 5.

---

## 4. Seguimiento de la revisión técnica (puntos pendientes)

### 4.1 Contraste del indicador de foco

- Valor anterior: `--focus-ring: 3px solid #91AA91`.
- Valor actual: `--focus-ring: 3px solid var(--choir-accent-dark)` (`#34533A`),
  con `outline-offset: 3px` sin cambios.
- Se conserva el verde del sistema (`--choir-accent-dark` ya existía) y el
  mismo grosor y desplazamiento, para mantener un indicador consistente.

Mediciones por luminancia relativa W3C (cálculo, no prueba con herramienta
externa). Criterio de referencia: 3:1 para indicadores de foco frente a
las superficies adyacentes.

| Superficie del control                          | Anterior `#91AA91` | Actual `#34533A` |
| :---------------------------------------------- | :----------------: | :--------------: |
| Página `#FCFBF8`                                | 2.43:1 (no cumple) |      8.30:1      |
| Superficie `#FFFFFF`                            | 2.51:1 (no cumple) |      8.59:1      |
| `--choir-accent-soft` `#EDF2EB`                 | 2.21:1 (no cumple) |      7.57:1      |
| Marfil `#F5F1E8`                                | 2.23:1 (no cumple) |      7.62:1      |
| Línea `#E9E8E1` (fondo en `:active` secundario) | 2.04:1 (no cumple) |      6.99:1      |

Observaciones:

- El anillo se dibuja con 3 px de separación respecto del control, por lo
  que sobre un botón primario (`#456B4C`) el contraste anillo/relleno
  (1.42:1) no es el relevante: el anillo se distingue por la separación y
  por su contraste con la superficie.
- No hay controles enfocables sobre fondos oscuros en las pantallas
  revisadas; el anillo no se evaluó sobre `--choir-night`.
- Otros focos definidos fuera del alcance no se modificaron:
  `login.page.ts` (`outline: 2px solid var(--accent-soft)` con borde
  `--accent`), `app.scss` línea 418 y `formation-stage.component.scss`
  (`outline: 3px solid var(--accent)`).
- Esta corrección es puntual y no implica conformidad global WCAG 2.2 AA.

### 4.2 Selector `.full-button`

- Consumidores actuales: `src/app/auth/login.page.ts` (botón de envío),
  `src/app/pages.ts` línea 107 (enlace «Volver al inicio») y línea 128
  (enlace «Ir a ingresar»). Los tres están fuera del alcance de CHOIR-125.
- En `124-integradora` la regla vivía en `src/app/app.scss`, cuyos estilos
  están encapsulados en el componente raíz. Compilando esa rama se midió
  que la regla no llegaba a los consumidores (`margin-top` en 0 px).
- Resolución: se eliminó de `src/shared-patterns.scss`, que solo debe
  contener los patrones autorizados. No se la reubicó globalmente porque
  eso habría vuelto activa una regla que antes no afectaba a sus
  consumidores (nuevos 18 px de margen y ancho completo en el enlace de
  Registro).
- Se mantiene el comportamiento medido en la base. En la rama, el ancho
  del enlace de Registro cambió de 90 px a 125 px solo por el padding del
  patrón `.button` global, no por `.full-button`.
- Propuesta de seguimiento (otro ticket): resolver el ancho completo en
  los estilos de cada consumidor, o decidir si hace falta una utilidad
  de layout compartida, y recién entonces retirar las clases del
  marcado.

### 4.3 Estado de carga de los botones

Definido en `src/shared-patterns.scss`, activado por `[aria-busy="true"]` o
`[data-loading="true"]`:

- Indicador giratorio (`::before`, `currentColor`) antes de la etiqueta.
- `cursor: wait` y opacidad completa (la opacidad de `disabled`, 0.55,
  reduce el contraste del texto blanco sobre `#456B4C` a 2.42:1; con
  opacidad completa es 6.07:1).
- Sin `translateY` ni cambio de fondo en hover/active mientras dura.
- Compatible con `disabled`: con `disabled` y carga a la vez prevalece el
  aspecto de carga; `disabled` solo mantiene 0.55 y `not-allowed`.
- `prefers-reduced-motion: reduce` detiene la animación y deja el
  indicador estático.

Compatibilidad con los consumidores actuales:

- `login.page.ts` (`auth.isLoading()`) y `pages.ts` (`saving()`,
  `archivingId()`) bloquean la acción con `[disabled]` y cambian la
  etiqueta («Ingresando…», «Guardando…», «Archivando…»). Esa etiqueta es
  hoy la comunicación del estado y el bloqueo nativo evita el reenvío.
- Ninguno aplica `aria-busy` ni `data-loading`, por lo que el indicador
  no se verá hasta que lo hagan. Hacerlo requiere tocar archivos fuera
  del alcance de este ticket. Cambio propuesto para el seguimiento:
  `[attr.aria-busy]="auth.isLoading()"` en el login y la condición
  equivalente en `pages.ts`, sin lógica nueva.
- La comunicación a tecnologías de apoyo sigue dependiendo de la
  etiqueta; `aria-busy` en un botón no se anuncia de forma consistente.

### 4.4 Documentación del ticket

`docs/tickets/CHOIR-125.md` se actualizó con la rama
`feature/125-design-system-foundations`, la base `124-integradora` y el PR
dirigido a `124-integradora`. No se tocaron criterios ni alcance. La
precondición 5 («CHOIR-124 integrado en main») y la sección 5, que
menciona `src/app/app.scss`, quedaron sin cambios y conviene revisarlas.

---

## 5. Evidencia de validación (ejecutada)

Entorno: Node v22.23.4, npm 10.9.9, dependencias instaladas con `npm ci`.

| Comando                                                                         | Resultado                                                                                                    |
| :------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------- |
| `npm run build`                                                                 | Código 0, sin advertencias. Bundle de estilos 5.62 kB (1.33 kB transfer)                                     |
| `npm run test:ci`                                                               | Código 0. 14 archivos y 98 pruebas aprobados                                                                 |
| `npm run lint`                                                                  | Código 1. `prettier --check .` informa 53 archivos con estilo; el repositorio ya fallaba antes (55 archivos) |
| `prettier --check` sobre `shared-patterns.scss`, `styles.scss` y `CHOIR-125.md` | Aprobado                                                                                                     |

El lint falla por archivos ajenos a este cambio; no se reformateó el
repositorio. Se aplicó Prettier solo a `src/shared-patterns.scss` y
`src/styles.scss`, lo que reformateó líneas preexistentes de ambos.
No hay ESLint configurado.

### Revisión visual

Método: build de producción servido en local y controlado con Chromium
headless (HeadlessChrome 153) vía `puppeteer-core`, instalado fuera del
repositorio. Las respuestas de `/api/*` se simularon con datos de ejemplo.
Se comparó contra una compilación de `124-integradora`.

- Inicio, Mi coro y Formaciones en 1440 × 900 y 390 × 844: carga
  correcta y sin desplazamiento horizontal en ninguna.
- Foco por teclado (Tab) en enlace, botón, input, textarea y select:
  `3px solid rgb(52, 83, 58)` con offset 3px en todos. Antes:
  `rgb(145, 170, 145)`.
- Estados sobre botones primario, secundario y peligro, en un arnés
  sintético montado sobre la página (los consumidores no los activan):
  default, hover (primario: fondo `#34533A`, `translateY(-2px)`), active
  (sin desplazamiento), disabled (0.55, `not-allowed`), carga y carga con
  `disabled`, en escritorio y móvil, además de carga con
  `prefers-reduced-motion`.
- Efecto de los patrones globales: los botones de Mi coro y Formaciones
  ahora reciben los estilos de `.button`; la altura total de página
  aumentó (por ejemplo, Mi coro en escritorio pasó de 1018 px a 1149 px).
  Es el efecto buscado de cargar los patrones de forma global.

### Hallazgo preexistente (fuera de alcance)

Tanto en `124-integradora` como en esta rama, las pantallas Mi coro,
Formaciones e Inicio se renderizan con sus estilos de layout ausentes
(título, formulario y listado sin formato). Esos estilos siguen en
`src/app/app.scss`, encapsulado en el componente raíz, y no alcanzan a
las páginas del router. Conviene tratarlo en un ticket aparte.

### Limitaciones

- Solo Chromium headless; no se probó Firefox ni Safari, ni un
  dispositivo móvil real (el móvil se emuló por viewport).
- Hover y active se simularon con el puntero; no hay prueba táctil.
- El indicador giratorio se verificó por estilos computados y capturas
  estáticas, no en video.
- Lectores de pantalla, zoom al 200 % y tamaño de fuente ampliado no se
  probaron. Los contrastes son cálculos, no medición con herramienta
  externa.
- Los estados de carga reales de los consumidores no pudieron verificarse
  con el indicador, porque no aplican `aria-busy` ni `data-loading`.
