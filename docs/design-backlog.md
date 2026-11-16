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

Alcance:
- Tokens de color, tipografía, espaciado, bordes y superficies.
- Botones y sus variantes.
- Campos y controles de formularios.
- Tarjetas y paneles.
- Alertas y mensajes de feedback.
- Estados de carga, vacío, error y éxito.
- Foco visible y estados disabled.
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
a los flujos de autenticación: el formulario funcional de Ingresar
(`src/app/auth/login.page.ts`) y, una vez definido su alcance, Registro.

Estado:
- Ingresar ya es funcional; el trabajo es visual y no cambia su comportamiento.
- Registro es un placeholder informativo. Sus campos, validaciones y flujo
  de verificación de correo no están confirmados; esa parte no debe
  implementarse hasta confirmar contra el backend las decisiones propuestas
  de la sección 2 de `design-proposals.md`.

Alcance:
- Presentación de los formularios.
- Jerarquía de títulos, etiquetas y acciones.
- Estados inicial, validación, carga, error y éxito.
- Adaptación móvil y escritorio.
- Consistencia visual entre Ingresar y Registro.

Criterios de aceptación:
- Ambos formularios mantienen una estructura visual consistente.
- Cada campo tiene una etiqueta visible.
- Los errores se identifican junto al campo correspondiente.
- Los controles tienen estados de foco y deshabilitado.
- La acción principal se distingue claramente.
- La pantalla funciona en móvil sin desplazamiento horizontal.
- Se respetan los contratos y validaciones existentes.

Dependencias:
- DS-01.
- Verificación de los flujos y endpoints actuales de autenticación.
- Para Registro: contrato backend, campos y flujo de verificación de correo
  confirmados.

Fuera de alcance:
- Nuevos proveedores de autenticación.
- Recuperación de contraseña si no existe en el alcance funcional.
- Modificaciones del backend.

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

Alcance:
- Carga.
- Vacío.
- Error.
- Éxito.
- Confirmación.
- Falta de permisos.
- Mensajes de validación.

Criterios de aceptación:
- Los estados tienen patrones visuales consistentes.
- Los mensajes son claros y accionables.
- Los errores y confirmaciones son accesibles.
- No se confunden errores técnicos con estados vacíos.
- Los patrones se reutilizan entre módulos.

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
2. DS-02 y DS-03: autenticación y conciertos.
3. DS-04 y DS-05: formaciones y gestión del coro.
4. DS-06 y DS-07: transiciones e Inicio.
5. DS-08: consolidación de estados.
6. DS-09: validación integral.

Esta secuencia es orientativa. Las dependencias reales deben verificarse
contra Jira y los componentes compartidos antes de asignar trabajo paralelo.

## 5. Estrategia para evitar conflictos

- DS-01 es responsable de los patrones compartidos.
- Cada módulo debe tener un responsable de implementación.
- Las tareas de DS-02 a DS-07 no deben modificar componentes ajenos a su módulo.
- DS-08 debe reutilizar los patrones definidos, no crear variantes aisladas.
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
