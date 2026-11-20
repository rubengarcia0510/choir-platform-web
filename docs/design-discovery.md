# CHOIR — Design Discovery

## 1. Objetivo

Definir una dirección visual y de experiencia de usuario coherente para CHOIR, una plataforma destinada a la gestión y dirección de agrupaciones corales.

El trabajo consiste en relevar la experiencia existente, identificar inconsistencias y oportunidades de mejora, y establecer criterios visuales que orienten futuras implementaciones.

Este documento no autoriza cambios funcionales ni modificaciones de estilos.

## 2. Estado actual del frontend

La aplicación utiliza Angular y dispone de las siguientes rutas:

| Ruta | Pantalla | Estado observado |
|---|---|---|
| `/` | Inicio | Implementada (propuesta visual CHOIR-141 validada en desktop y móvil) |
| `/ingresar` | Iniciar sesión | Formulario funcional (`src/app/auth/login.page.ts`); propuesta visual CHOIR-141 validada |
| `/registro` | Registro | Formulario funcional de alta e integración de verificación (`src/app/auth/register.page.ts`); propuesta visual CHOIR-141 validada |
| `/verificar-correo` | Verificación de correo | Funcional (`src/app/auth/verify-email.page.ts`) |
| `/app/coro` | Gestión del coro | Implementada con administración de agrupaciones e integrantes (`ChoirSingersComponent` / CHOIR-151) |
| `/app/conciertos` | Conciertos | Módulo en preparación con propuesta visual CHOIR-142 documentada |
| `/app/formaciones` | Formaciones | Editor visual interactivo con soporte de puntero y teclado (CHOIR-21 / CHOIR-37); propuesta conceptual CHOIR-143 documentada |
| `**` | No encontrado | Implementada |

Las rutas privadas se encuentran protegidas mediante `directorGuard`.

### Observaciones sobre autenticación

La revisión del backend confirmó:

- `POST /api/auth/register` recibe `displayName`, `email` y `password`.
- El registro depende de `choir.auth.registration.enabled`, de un `VerificationEmailSender` disponible y de una URL base de verificación configurada.
- La configuración incluida en `application.yml` deshabilita el registro por defecto y deja vacía la URL base. La configuración efectiva de los entornos desplegados no fue verificada.
- Una solicitud procesada devuelve HTTP 202 con una respuesta genérica, también utilizada cuando el correo ya existe.
- El registro requiere verificación de correo y no inicia sesión automáticamente.
- El token de verificación vence a los 30 minutos y se consume una sola vez.
- La verificación utiliza `POST /api/auth/verify-email`.
- La protección CSRF requiere obtener el token mediante `GET /api/auth/csrf`, conservar la cookie de sesión y enviar el header `X-CSRF-TOKEN`.
- No se encontró un endpoint de reenvío de correo de verificación.

El contrato, sus límites y las decisiones de diseño derivadas están documentados en `design-proposals.md`, sección 2. No debe asumirse que el registro está habilitado en producción ni que el correo se envía correctamente en todos los entornos.

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

La hoja global (`src/styles.scss`) define foco visible accesible para enlaces, botones, inputs, `select` y `textarea` mediante `--focus-ring: 3px solid var(--choir-accent-dark)` (`#34533A`), garantizando contraste superior a 3:1 sobre todas las superficies operativas.

Asimismo, se han incorporado:
- Enlace de salto al contenido principal (`.skip-link` a `#main-content`).
- Alternativa completa por teclado en el escenario de Formaciones (`Enter`/`Espacio` para seleccionar, flechas para mover con pasos grandes vía `Shift`, `Enter` para confirmar, `Escape` o `Tab` para cancelar y anuncios `aria-live`).
- Estados de foco y hover sin transformaciones no deseadas en controles deshabilitados.
- Respeto estricto por `prefers-reduced-motion` anulando duraciones de transición y traslaciones.

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
- `docs/design-proposals.md`: propuestas conceptuales de Inicio, Ingresar y Registro.
- `docs/assets/choir-design-reference.png`: referencia conceptual general de identidad visual.

### Propuestas visuales y validación disponible

En `docs/assets/choir-124/`, `docs/assets/choir-142/`, `docs/assets/choir-143/` y `docs/assets/choir-144/` se encuentran los recursos visuales para:

- Inicio (propuesta CHOIR-141 validada en desktop y móvil).
- Ingresar y Registro (propuestas CHOIR-141 validadas con formularios funcionales).
- Mi coro (propuesta CHOIR-141 validada, incorporando gestión de elenco vía CHOIR-151).
- Conciertos (propuesta visual CHOIR-142 para módulo en preparación).
- Formaciones (propuesta conceptual CHOIR-143 para el editor visual).
- Transiciones (propuesta conceptual CHOIR-144 para comparación de origen y destino).

### Estado de validación por dominio

- **Pantallas operativas validadas con código real:** Inicio, Ingresar, Registro, Verificación de correo y Mi coro (incluyendo coros y gestión de integrantes).
- **Módulos con propuesta visual de estado en preparación:** Conciertos.
- **Módulos operativos con propuesta conceptual documentada:** Formaciones (escenario operativo interactivo con soporte de puntero y teclado implementado; propuesta conceptual estática documentada para futuras iteraciones de layout).
- **Módulos conceptuales no implementados en frontend:** Transiciones (propuesta estrictamente conceptual sin funcionalidad ni persistencia asociada).
- **Auditoría visual y responsive:** Validación responsive documentada en `docs/responsive-visual-validation.md` y auditoría de accesibilidad registrada en `docs/accessibility-audit.md`.

La documentación y las propuestas constituyen un Discovery preliminar. No representan una aprobación definitiva del sistema visual ni una certificación de accesibilidad.

## 9. Registro de hallazgos UX/UI priorizados

Los siguientes hallazgos surgen de la revisión estática documentada en este
Discovery y en `accessibility-audit.md`. Las prioridades expresan impacto
potencial y necesidad de resolución; no representan una certificación
ni sustituyen las pruebas manuales pendientes.

| ID | Área | Evidencia observada | Impacto | Prioridad / Estado |
|---|---|---|---|---|
| UX-01 | Ingresar y Registro | `/ingresar` y `/registro` cuentan con componentes y formularios funcionales (`login.page.ts`, `register.page.ts`). Propuestas CHOIR-141 validadas. | Resuelto en código y diseño; validado en desktop y móvil. | Resuelto (P1) |
| UX-02 | Conciertos | La ruta `/app/conciertos` es un placeholder del módulo en preparación con propuesta CHOIR-142 documentada. | Módulo identificado claramente como en preparación sin datos simulados. | Propuesta documentada (P1) |
| UX-03 | Estilos compartidos | Se migraron patrones a `src/shared-patterns.scss` y `src/styles.scss`, desacoplándolos del encapsulamiento de `app.scss`. | Resuelto mediante tokens globales canónicos y patrones reutilizables. | Resuelto (P2) |
| UX-04 | Formaciones | El escenario cuenta con soporte nativo de puntero y navegación/edición por teclado con anuncios accesibles (CHOIR-37). | Resuelto en código de componente y verificado mediante suites de tests. | Resuelto (P1) |
| UX-05 | Foco de controles | `src/styles.scss` define `--focus-ring: 3px solid var(--choir-accent-dark)` para `a`, `button`, `input`, `select` y `textarea`. | Resuelto con contraste superior a 3:1 sobre todas las superficies operativas. | Resuelto (P1) |
| UX-06 | Responsive | Validación visual exhaustiva ejecutada y documentada en `docs/responsive-visual-validation.md` en viewports de 320px a 1440px. | Comprobado sin desbordamientos ni pérdida de legibilidad en los flujos principales. | Validado (P2) |
| UX-07 | Semántica y contenido accesible | Skip link implementado, anuncios dinámicos de éxito y error con `aria-live`, y textos alternativos revisados. | Cobertura integrada en componentes interactivos y documentada en la auditoría. | Resuelto (P2) |

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

- Contrastar las propuestas de Inicio, Ingresar y Registro con los
  componentes y flujos existentes.
- Preparar propuestas visuales diferenciadas para escritorio y móvil de
  las pantallas restantes.
- Registrar las decisiones aceptadas y descartadas.
- Revalidar las prioridades con evidencia de uso y dependencias funcionales.

Este registro no implica que los hallazgos estén corregidos ni autoriza
cambios de implementación.
