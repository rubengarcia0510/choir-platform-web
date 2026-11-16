# CHOIR — Design Discovery

## 1. Objetivo

Definir una dirección visual y de experiencia de usuario coherente para CHOIR, una plataforma destinada a la gestión y dirección de agrupaciones corales.

El trabajo consiste en relevar la experiencia existente, identificar inconsistencias y oportunidades de mejora, y establecer criterios visuales que orienten futuras implementaciones.

Este documento no autoriza cambios funcionales ni modificaciones de estilos.

## 2. Estado actual del frontend

La aplicación utiliza Angular y dispone de las siguientes rutas:

| Ruta | Pantalla | Estado observado |
|---|---|---|
| `/` | Inicio | Implementada |
| `/ingresar` | Iniciar sesión | Formulario funcional (`src/app/auth/login.page.ts`); pendiente de propuesta visual validada |
| `/registro` | Registro | Placeholder informativo; pendiente de definir campos y flujo |
| `/app/coro` | Gestión del coro | Implementada |
| `/app/conciertos` | Conciertos | Pendiente de completar |
| `/app/formaciones` | Formaciones | Implementada parcialmente |
| `**` | No encontrado | Implementada |

Las rutas privadas se encuentran protegidas mediante `directorGuard`.

## 3. Auditoría visual inicial

### 3.1 Estilos globales

Archivo: `src/styles.scss`

Actualmente existen variables globales para:

- Color principal y variantes.
- Color de texto y texto secundario.
- Fondos y superficies.
- Bordes.
- Tipografía general.
- Foco visible y selección de texto.

La paleta actual utiliza verde como color de acento y superficies claras.

### 3.2 Estructura general

Archivo: `src/app/app.scss`

Se identifican estilos compartidos para:

- Navegación y encabezado.
- Marca e identidad de la aplicación.
- Hero y presentación.
- Botones y enlaces.
- Tarjetas y paneles.
- Formularios.
- Estados vacíos.
- Indicadores de estado.
- Layouts de gestión y formaciones.
- Adaptación a distintos tamaños de pantalla.

Hay una cantidad importante de estilos concentrada en este archivo. Se deberá evaluar su futura distribución en componentes y estilos específicos, evitando duplicaciones.

### 3.3 Formaciones

El módulo de formaciones cuenta con un escenario visual propio y estilos asociados a integrantes, posiciones e interacciones.

Es uno de los flujos de mayor complejidad funcional y necesita una evaluación específica de jerarquía visual, controles, legibilidad y adaptación a pantallas táctiles.

### 3.4 Accesibilidad

La hoja global define foco visible para enlaces, botones e inputs. Se deberá revisar la cobertura de otros controles, especialmente `select` y `textarea`.

También se deberá validar:

- Contraste de texto y controles.
- Navegación por teclado.
- Nombres accesibles para botones de icono.
- Estados que no dependan exclusivamente del color.
- Movimiento reducido.
- Legibilidad en dispositivos móviles.

### 3.5 Responsive

Existen reglas responsive en los estilos de la aplicación.

La auditoría visual posterior deberá verificar el comportamiento real de las pantallas en escritorio, tablet y móvil, sin asumir que la existencia de media queries garantiza una experiencia correcta.

## 4. Dirección visual propuesta

### Concepto

Una identidad artística, elegante y profesional, inspirada en la música coral y en la estética nocturna de la referencia visual compartida.

La propuesta combina una identidad visual expresiva con una interfaz operativa, clara y eficiente.

### Referencia estética

Elementos identificados en la referencia:

- Azul nocturno profundo.
- Detalles dorados.
- Líneas curvas y ondas.
- Partículas luminosas sutiles.
- Contraste entre tipografía serif y sans-serif.
- Composición equilibrada y elegante.

La referencia funciona como inspiración visual, no como diseño que deba copiarse literalmente.

### Dos ambientes visuales

**Ambiente artístico**

Uso previsto:
- Inicio y presentación.
- Portadas y destacados.
- Conciertos.
- Experiencias visuales de formaciones y transiciones.

Características:
- Fondos azul profundo.
- Detalles dorados moderados.
- Recursos gráficos inspirados en ondas musicales.
- Tipografía con mayor personalidad en títulos.

**Ambiente operativo**

Uso previsto:
- Gestión del coro.
- Administración de coreutas.
- Formularios.
- Configuraciones.
- Tablas y tareas cotidianas.

Características:
- Fondos claros.
- Superficies limpias.
- Contraste elevado.
- Jerarquía visual consistente.
- Controles claros y accesibles.

Ambos ambientes deben compartir los mismos criterios de espaciado, componentes, estados e interacción.

## 5. Oportunidades de mejora

1. Consolidar una identidad visual consistente entre módulos.
2. Definir tokens compartidos de color, tipografía, espaciado y superficies.
3. Establecer componentes reutilizables para botones, tarjetas, formularios y estados.
4. Mejorar la jerarquía visual de las pantallas operativas.
5. Diseñar estados de carga, vacío, error y éxito de forma consistente.
6. Revisar accesibilidad y navegación por teclado.
7. Validar la experiencia responsive.
8. Evitar que los recursos decorativos interfieran con las tareas de dirección coral.

## 6. Criterios de diseño

- La información funcional debe tener prioridad sobre la decoración.
- El color no debe ser el único medio para comunicar estados.
- Los controles deben tener estados hover, focus, disabled y loading cuando corresponda.
- Las pantallas deben conservar una jerarquía visual reconocible.
- Las interacciones táctiles deben ser cómodas en dispositivos móviles.
- Los elementos gráficos deben reforzar la identidad musical sin reducir la legibilidad.
- Los componentes compartidos deben mantener un comportamiento consistente.

## 7. Alcance y límites

Este Discovery no incluye:

- Modificaciones de CSS.
- Refactor de componentes Angular.
- Cambios de contratos backend.
- Modificaciones de reglas de negocio.
- Nuevas funcionalidades.
- Cambios de arquitectura.

Las futuras implementaciones deberán contar con alcance y criterios de aceptación definidos en Jira.

## 8. Estado de entregables

### Documentación completada

- `docs/design-discovery.md`: relevamiento inicial, dirección visual y hallazgos UX/UI.
- `docs/design-system.md`: tokens propuestos, componentes, estados y criterios de accesibilidad.
- `docs/design-references.md`: wireframes conceptuales para los módulos principales, incluyendo gestión de coreutas y transiciones.
- `docs/accessibility-audit.md`: auditoría estática preliminar con cinco hallazgos y pruebas pendientes.
- `docs/design-backlog.md`: backlog propuesto DS-01 a DS-09 con prioridades, dependencias y criterios de aceptación.
- `docs/assets/choir-design-reference.png`: referencia conceptual general de identidad visual.

### Pendiente de validación

- Preparar propuestas visuales diferenciadas de escritorio y móvil para las pantallas representativas.
- Validar la dirección artística y operativa con las pantallas y flujos reales.
- Ejecutar las pruebas manuales de accesibilidad y responsive indicadas en `accessibility-audit.md`.
- Confirmar las decisiones finales de diseño y actualizar el backlog si la validación modifica prioridades o dependencias.
- Crear tickets Jira independientes únicamente después de validar el alcance y evitar solapamientos.

La documentación completada constituye una propuesta de Discovery, no una aprobación definitiva del sistema visual ni una certificación de accesibilidad.

## 9. Registro de hallazgos UX/UI priorizados

Los siguientes hallazgos surgen de la revisión estática documentada en este
Discovery y en `accessibility-audit.md`. Las prioridades expresan impacto
potencial y necesidad de resolución; no representan una certificación
ni sustituyen las pruebas manuales pendientes.

| ID | Área | Evidencia observada | Impacto | Prioridad |
|---|---|---|---|---|
| UX-01 | Ingresar y Registro | `/ingresar` ya cuenta con un formulario funcional y `/registro` es un placeholder informativo; ninguna tiene una propuesta visual validada. | Los recorridos de acceso no cuentan todavía con una experiencia visual completa. | P1 |
| UX-02 | Conciertos | La ruta `/app/conciertos` está identificada como pendiente de completar. | La gestión de conciertos carece de una experiencia visual terminada. | P1 |
| UX-03 | Estilos compartidos | `src/app/app.scss` concentra estilos de navegación, presentación, formularios, estados y layouts. | La concentración puede dificultar la evolución y consistencia de los patrones compartidos. | P2 |
| UX-04 | Formaciones | El escenario utiliza interacciones de puntero para mover integrantes; no se identificó una alternativa de teclado en el template revisado. | Algunas operaciones pueden no estar disponibles para usuarios que navegan con teclado. | P1 |
| UX-05 | Foco de controles | `src/styles.scss` contempla foco visible para enlaces, botones e inputs, pero no incluye explícitamente `select` y `textarea`. | La indicación de foco puede ser inconsistente entre controles. | P1 |
| UX-06 | Responsive | Existen reglas responsive, pero no se realizaron pruebas manuales completas en móvil, tablet y escritorio. | La existencia de breakpoints no garantiza que los flujos sean utilizables en todos los tamaños. | P2 |
| UX-07 | Semántica y contenido accesible | La auditoría identifica aspectos pendientes en el escenario de Formaciones y en la ilustración de Inicio. | La información puede no comunicarse correctamente mediante tecnologías de asistencia. | P2 |

### Evidencia y límites

- Los hallazgos de accesibilidad UX-04, UX-05 y UX-07 se detallan en
  `accessibility-audit.md`, con observaciones, recomendaciones y pruebas
  pendientes.
- Los estados de implementación de las rutas se registran en la sección 2.
- La concentración de estilos se observa en `src/app/app.scss`.
- Los hallazgos responsive requieren validación manual antes de confirmar
  su alcance real.
- No se atribuyen problemas visuales específicos a pantallas que no hayan
  sido inspeccionadas visualmente en todos sus estados.

### Trabajo pendiente para cerrar la validación visual

- Preparar propuestas visuales diferenciadas para escritorio y móvil de
  las pantallas representativas.
- Contrastar las propuestas con los componentes y flujos existentes.
- Registrar las decisiones aceptadas y descartadas.
- Revalidar las prioridades con evidencia de uso y dependencias funcionales.

Este registro no implica que los hallazgos estén corregidos ni autoriza
cambios de implementación.
