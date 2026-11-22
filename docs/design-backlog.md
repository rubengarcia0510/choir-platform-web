# CHOIR — Backlog de implementación UX/UI

Estado: propuesta para validación dentro de CHOIR-124.

Este backlog convierte los hallazgos del Discovery en unidades de trabajo
independientes. No representa tickets ya creados ni autoriza implementaciones.

## 1. Reglas de planificación

- Cada tarea debe tener un único módulo o responsabilidad principal.
- Los componentes compartidos se definen antes de replicarlos en las pantallas.
- No modificar contratos API ni reglas de negocio desde tareas visuales.
- Respetar los flujos, permisos y estados existentes.
- Verificar dependencias con Jira antes de iniciar cada implementación.
- No asignar tareas paralelas que modifiquen los mismos componentes.
- Cada implementación debe realizarse en su propia rama y PR.
- Cada unidad DS que se implemente debe tener un ticket Jira propio.
- Las etapas A y B de DS-02 son tickets Jira independientes, con ramas y PR separados.
- Los identificadores DS organizan este backlog; no representan tickets Jira creados.

## 2. Criterios de prioridad

- P1: bloquea o afecta flujos esenciales, accesibilidad o módulos incompletos.
- P2: mejora importante de consistencia y experiencia.
- P3: refinamiento visual que no bloquea tareas principales.

La prioridad propuesta debe confirmarse al crear los tickets.

## 3. Backlog por funcionalidad

### DS-01 — Fundamentos visuales y componentes compartidos

Prioridad: P1.

Objetivo:
Establecer los patrones visuales que utilizarán los módulos del frontend.

Responsabilidad exclusiva: definir y documentar los fundamentos visuales y los contratos de los componentes compartidos. No implementar estados específicos de cada pantalla ni rediseñar módulos.

Alcance:
- Tokens de color, tipografía, espaciado, bordes y superficies.
- Botones y sus variantes.
- Campos y controles de formularios.
- Tarjetas y paneles.
- Alertas y mensajes de feedback.
- Estados visuales de los componentes base: foco, disabled, validación y feedback.
- Estados de carga y deshabilitado propios de los controles.
- Criterios responsive.

Criterios de aceptación:
- Los tokens están centralizados y documentados.
- Cada componente tiene variantes y estados definidos.
- Los componentes conservan contraste y foco visible.
- Los patrones se pueden reutilizar sin duplicar estilos.
- Se documenta qué componentes existentes se reutilizan.
- No se introducen cambios funcionales ni contratos nuevos.

Dependencias:
- Validación de `design-system.md`.
- Revisión de los componentes existentes antes de crear otros.

Fuera de alcance:
- Rediseñar pantallas completas.
- Cambiar comportamiento de negocio.
- Refactorizar módulos sin necesidad visual demostrada.

### DS-02 — Experiencia de Ingresar y Registro

Prioridad: P1.

Objetivo:
Aplicar la propuesta visual de CHOIR-124 (`design-proposals.md`, sección 2)
a los flujos de autenticación, respetando la implementación existente y el
contrato de registro confirmado en backend.

Estado actual:
- Ingresar dispone de un formulario funcional en
  `src/app/auth/login.page.ts`. Su trabajo previsto es visual y de
  accesibilidad; no debe reemplazar ni duplicar el flujo existente.
- Registro continúa siendo un placeholder informativo en
  `src/app/pages.ts`.
- El backend dispone de `POST /api/auth/register` y
  `POST /api/auth/verify-email`. La disponibilidad del registro depende
  de configuración y del servicio de envío de correo.
- El contrato backend fue revisado y está documentado en
  `design-proposals.md`, sección 2.

#### Etapa A — Diseño visual

Alcance:
- Reorganización visual del formulario existente de Ingresar.
- Definición visual de Registro para escritorio y móvil.
- Definición de estados de carga, error, indisponibilidad y aceptación.
- Consistencia visual entre Ingresar y Registro.
- Revisión de etiquetas, foco, contraste y accesibilidad.

Criterios de aceptación:
- Ingresar conserva sus campos, validaciones, autenticación y mensajes
  funcionales actuales.
- La propuesta visual de Ingresar no introduce nuevas operaciones.
- La propuesta de Registro utiliza los campos confirmados:
  nombre para mostrar, correo y contraseña.
- Los estados visuales no afirman que se creó una cuenta ni que se envió
  un correo cuando la respuesta del backend no lo garantiza.
- Ambos formularios tienen etiquetas visibles, foco perceptible y errores
  comprensibles.
- Las propuestas funcionan en móvil sin desplazamiento horizontal.

#### Etapa B — Integración funcional de Registro

Esta etapa no debe comenzar hasta resolver las dependencias indicadas abajo.

Alcance:
- Implementar el formulario con `displayName`, `email` y `password`.
- Respetar los límites confirmados: nombre hasta 160 caracteres,
  correo hasta 254 caracteres y contraseña entre 12 y 200 caracteres.
- Integrar la protección CSRF existente: obtener el token, conservar
  la cookie de sesión y enviar el header `X-CSRF-TOKEN`.
- Gestionar la respuesta HTTP 202 con un mensaje neutral.
- Gestionar HTTP 503 como indisponibilidad del registro.
- Integrar la verificación de correo únicamente cuando esté confirmado
  el destino frontend del enlace.
- Mantener el comportamiento responsive y accesible.

Criterios de aceptación:
- El request utiliza los campos y límites del contrato existente.
- No se agregan reglas de composición de contraseña no confirmadas.
- La respuesta HTTP 202 no revela si la dirección ya estaba registrada.
- La interfaz no afirma que el correo fue enviado efectivamente
  en todos los casos.
- La respuesta HTTP 503 se presenta como indisponibilidad del registro,
  sin atribuir el problema a los datos ingresados.
- No se ofrece reenvío de verificación porque no existe un endpoint
  confirmado para esa operación.
- No se inicia sesión automáticamente después del registro.
- Se respeta la protección CSRF existente.
- Los errores y estados son accesibles y comprensibles.

Dependencias para la Etapa B:
- DS-01.
- Revisión de los componentes y servicios de autenticación existentes.
- Confirmar la configuración efectiva de Registro en los entornos donde
  vaya a habilitarse.
- Confirmar la disponibilidad del servicio de envío de correo.
- Confirmar la ruta frontend de destino del enlace de verificación.
- Verificar la integración CSRF con el cliente HTTP existente.

La Etapa A puede avanzar sin implementar el recorrido funcional de Registro.
La Etapa B queda bloqueada hasta confirmar las dependencias anteriores.

Fuera de alcance:
- Nuevos proveedores de autenticación.
- Recuperación de contraseña.
- Reenvío de correo de verificación.
- Confirmación de contraseña si no existe en el contrato.
- Mostrar u ocultar contraseña.
- Autenticación social.
- Inicio de sesión automático después del registro.
- Modificaciones del backend o de sus contratos.

### DS-03 — Gestión de Conciertos

Prioridad: P1.

Objetivo:
Diseñar una experiencia clara para consultar y gestionar conciertos.

Alcance:
- Encabezado y acciones principales.
- Listado de conciertos.
- Presentación de fecha, lugar y estado cuando existan.
- Diferenciación entre próximos y anteriores.
- Estados de carga, vacío y error.
- Adaptación responsive.

Criterios de aceptación:
- La información principal se identifica rápidamente.
- Las acciones disponibles respetan los permisos actuales.
- Los estados no dependen exclusivamente del color.
- El listado se adapta a móvil y escritorio.
- Los estados vacíos y errores tienen mensajes comprensibles.
- No se muestran datos que no estén disponibles en el contrato actual.

Dependencias:
- DS-01.
- Revisión del flujo funcional de conciertos en Jira.

Fuera de alcance:
- Nuevas reglas de planificación.
- Nuevos estados de negocio.
- Cambios de API.

### DS-04 — Formaciones y escenario

Prioridad: P1.

Objetivo:
Mejorar la claridad visual y operativa del editor de formaciones.

Alcance:
- Jerarquía del escenario.
- Representación de integrantes.
- Selección y posición.
- Paneles y controles.
- Indicadores de cambios.
- Presentación responsive.
- Alternativa accesible a las operaciones de arrastrar y soltar.

Criterios de aceptación:
- El escenario mantiene una relación espacial comprensible.
- Los integrantes se identifican sin depender exclusivamente del color.
- Selección, posición y estados se distinguen claramente.
- Los controles funcionan en móvil y escritorio.
- Existe una alternativa operable por teclado para las operaciones de movimiento.
- No se alteran las reglas de distribución ni persistencia.
- Se respetan las formaciones asociadas al concierto correspondiente.

Dependencias:
- DS-01.
- Verificación de los contratos y reglas funcionales vigentes.
- Revisar dependencias de Jira antes de iniciar.

Fuera de alcance:
- Cambiar el algoritmo de optimización.
- Modificar reglas de distribución.
- Cambiar contratos backend.

### DS-05 — Gestión del coro y coreutas

Prioridad: P1.

Objetivo:
Unificar la experiencia de consulta y administración de integrantes.

Alcance:
- Encabezado y contexto del coro.
- Resumen de información disponible.
- Listado de coreutas.
- Acciones de gestión existentes.
- Presentación de secciones vocales cuando corresponda.
- Estados de carga, vacío y error.
- Adaptación responsive.

Criterios de aceptación:
- La información de cada integrante tiene jerarquía clara.
- Las acciones disponibles son visibles y comprensibles.
- Los estados vacíos explican qué ocurre y qué acción está disponible.
- La información se adapta a pantallas pequeñas.
- Las secciones vocales se representan según los datos existentes.
- Se respetan permisos y reglas actuales.

Dependencias:
- DS-01.
- Revisión de los flujos de Mi coro y coreutas en Jira.

Fuera de alcance:
- Nuevas operaciones de administración.
- Cambios de asignación de secciones.
- Modificaciones del modelo de datos.

### DS-06 — Visualización de transiciones

Prioridad: P2.

Objetivo:
Definir una presentación comprensible de las transiciones entre formaciones.

Alcance:
- Contexto de formación de origen y destino.
- Representación visual del cambio.
- Jerarquía de información y métricas existentes.
- Estados de visualización.
- Adaptación responsive.
- Movimiento reducido y alternativas no animadas.

Criterios de aceptación:
- Se distingue claramente el estado inicial del final.
- Los cambios se comprenden sin depender exclusivamente de animaciones.
- Las métricas solo se muestran cuando existen en el contrato.
- La visualización conserva legibilidad en móvil.
- Se respeta la preferencia de movimiento reducido.
- No se agregan reglas ni cálculos nuevos.

Dependencias:
- DS-01.
- Confirmación del flujo funcional de transiciones.
- Verificación de los tickets funcionales relacionados.

Fuera de alcance:
- Nuevos algoritmos de transición.
- Cálculos de métricas.
- Cambios de persistencia o API.

### DS-07 — Inicio y presentación institucional

Prioridad: P2.

Objetivo:
Aplicar la identidad artística de CHOIR a la pantalla de presentación.

Alcance:
- Encabezado y navegación.
- Hero institucional.
- Mensaje principal.
- Acciones de acceso.
- Recursos gráficos musicales.
- Adaptación responsive.

Criterios de aceptación:
- La identidad artística es reconocible.
- La acción principal se distingue claramente.
- El contenido sigue siendo comprensible sin imágenes.
- La composición funciona en escritorio y móvil.
- Los recursos decorativos no afectan la legibilidad.
- Se mantiene coherencia con el sistema de diseño.

Dependencias:
- DS-01.
- Validación de las referencias visuales.

Fuera de alcance:
- Cambios de navegación funcional.
- Nuevos flujos de registro o acceso.

### DS-08 — Estados globales y consistencia visual

Prioridad: P2.

Objetivo:
Consolidar los estados compartidos de la aplicación.

Responsabilidad exclusiva: aplicar y verificar los patrones de estado ya definidos por DS-01 en los módulos existentes. No crear tokens, variantes ni componentes base nuevos.

Alcance:
- Carga.
- Vacío.
- Error.
- Éxito.
- Confirmación.
- Falta de permisos.
- Aplicación de mensajes de validación en formularios existentes.
- Aplicación de los patrones en las pantallas existentes, sin redefinir componentes base.

Criterios de aceptación:
- Los estados tienen patrones visuales consistentes.
- Los mensajes son claros y accionables.
- Los errores y confirmaciones son accesibles.
- No se confunden errores técnicos con estados vacíos.
- Los patrones se reutilizan entre módulos.
- DS-08 no modifica tokens, variantes ni contratos visuales definidos por DS-01.

Dependencias:
- DS-01.
- Pantallas principales implementadas o con diseño validado.

Fuera de alcance:
- Cambios en el tratamiento de errores del backend.
- Nuevas reglas de permisos.

### DS-09 — Validación responsive y accesibilidad

Prioridad: P1.

Objetivo:
Validar la experiencia real de los flujos principales.

Alcance:
- Recorrido por teclado.
- Foco visible.
- Contraste.
- Semántica y nombres accesibles.
- Zoom y reflow.
- Objetivos táctiles.
- Lectores de pantalla.
- Móvil, tablet y escritorio.

Criterios de aceptación:
- Los flujos principales pueden completarse con teclado.
- Los controles tienen nombres accesibles.
- Los mensajes de error y estado se anuncian correctamente.
- No hay pérdida de contenido con zoom.
- No existe desplazamiento horizontal injustificado.
- Los hallazgos tienen evidencia y resolución documentada.
- Se documenta el resultado de las pruebas.

Dependencias:
- Pantallas y componentes disponibles para validar.
- Auditoría preliminar `accessibility-audit.md`.

Fuera de alcance:
- Declarar conformidad WCAG sin evidencia de pruebas.
- Cambios funcionales no relacionados con accesibilidad.

## 4. Dependencias generales propuestas

Secuencia de referencia:

1. DS-01: fundamentos visuales.
2. DS-02 Etapa A y DS-03: diseño visual de autenticación y conciertos.
3. DS-02 Etapa B: integración de Registro, una vez resueltas sus dependencias.
4. DS-04 y DS-05: formaciones y gestión del coro.
5. DS-06 y DS-07: transiciones e Inicio.
6. DS-08: consolidación de estados.
7. DS-09: validación integral.

Esta secuencia es orientativa. Las dependencias reales deben verificarse
contra Jira y los componentes compartidos antes de asignar trabajo paralelo.

## 5. Estrategia para evitar conflictos

- DS-01 es responsable de los patrones compartidos.
- Cada módulo debe tener un responsable de implementación.
- Las tareas de DS-02 a DS-07 no deben modificar componentes ajenos a su módulo.
- DS-02 debe mantener separadas las tareas visuales y las de integración
  funcional de Registro.
- DS-08 debe reutilizar los patrones definidos, no crear variantes aisladas.
- DS-01 define estados a nivel de componente; DS-08 aplica y verifica estados globales a nivel de pantalla.
- DS-09 valida y reporta hallazgos; las correcciones se implementan en tickets
  específicos.
- No dividir una misma pantalla entre implementadores sin delimitar archivos
  y componentes.

## 6. Validación antes de crear tickets

- [ ] Confirmar alcance y dependencias funcionales en Jira.
- [ ] Validar los wireframes y referencias visuales.
- [ ] Confirmar el sistema de diseño.
- [ ] Revisar componentes existentes que pueden reutilizarse.
- [ ] Ajustar prioridades según impacto y esfuerzo.
- [ ] Confirmar criterios de aceptación con el flujo real.
- [ ] Verificar que las tareas no se solapen.
- [ ] Definir responsable y dependencias de cada ticket.

## 7. Restricciones

Este backlog no autoriza cambios de implementación.

No incluye:
- Cambios CSS o templates.
- Refactors generales de Angular.
- Cambios backend o contratos API.
- Modificaciones de reglas de negocio.
- Nuevas funcionalidades.

Cada tarea futura deberá contar con un ticket Jira propio y una rama/PR
independiente.

## 8. Estado real de ejecución — 21/11/2026

Esta sección prevalece sobre las prioridades y secuencias propuestas
en las secciones anteriores. El estado de cada trabajo se verifica
contra Jira; los identificadores DS organizan el diseño, no sustituyen
a los tickets.

### Unidades completadas

| Unidad | Ticket Jira | Estado |
|---|---|---|
| DS-01 — Fundamentos visuales | CHOIR-125 | Finalizada |
| DS-02 Etapa A — Diseño del flujo de registro | CHOIR-126 | Finalizada |
| DS-02 Etapa B — Integración de Registro | CHOIR-127 | Finalizada |
| DS-08 — Estados globales y consistencia visual | CHOIR-128 | Finalizada |
| DS-09 — Validación responsive y accesibilidad | CHOIR-129 | Finalizada |

### Trabajo de accesibilidad todavía pendiente

| Ticket Jira | Alcance |
|---|---|
| CHOIR-138 | Validar semántica y operación accesible del escenario de Formaciones |
| CHOIR-140 | Medir contraste de texto, controles y estados visuales |
| CHOIR-148 | Mejorar contraste de bordes de campos y foco en Ingresar |
| CHOIR-149 | Conservar contraste del contenido de coros archivados |
| CHOIR-150 | Reforzar límites visuales de controles del escenario |

Estos tickets son trabajo pendiente registrado en Jira. No deben
duplicarse como nuevas unidades DS.

### Criterio para continuar

- No reabrir unidades DS que ya tienen su ticket en estado Finalizada.
- No crear tickets duplicados para los hallazgos que ya tienen
  identificadores CHOIR.
- Antes de implementar una corrección, verificar su alcance y sus
  dependencias en Jira.
- Mantener separados los trabajos de auditoría, corrección y validación.
- No considerar una propuesta visual como una implementación terminada
  sin evidencia en el código y sus pruebas.
