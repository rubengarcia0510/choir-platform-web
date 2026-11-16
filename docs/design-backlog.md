# CHOIR — Backlog de mejoras UX/UI

Estado: propuesta inicial de CHOIR-124.

Este backlog traduce los hallazgos del Design Discovery en áreas de trabajo
para futuras tareas de diseño e implementación.

Las prioridades son preliminares. Antes de crear o ejecutar tickets se deben
validar alcance, dependencias y criterios de aceptación en Jira.

## 1. Criterios de priorización

- P1 — Alta: afecta flujos principales, pantallas incompletas o tareas
  esenciales para utilizar la plataforma.
- P2 — Media: mejora consistencia, claridad y calidad de la experiencia.
- P3 — Evolutiva: mejoras visuales complementarias que no bloquean los flujos.

La prioridad no implica autorización para modificar código.

## 2. Backlog por módulo

| Prioridad | Módulo | Oportunidad | Resultado esperado |
|---|---|---|---|
| P1 | Ingresar | Completar la experiencia visual y los estados del formulario | Acceso claro, legible y consistente |
| P1 | Registro | Definir jerarquía, validaciones y estados de interacción | Registro comprensible y accesible |
| P1 | Conciertos | Diseñar la experiencia de gestión y presentación de conciertos | Flujo completo y coherente con el dominio |
| P1 | Formaciones | Revisar jerarquía del escenario, controles y acciones | Edición clara en escritorio y móvil |
| P2 | Mi coro | Mejorar jerarquía de información y acciones de gestión | Gestión cotidiana más consistente |
| P2 | Inicio | Aplicar la identidad artística propuesta | Presentación visual reconocible |
| P2 | Transiciones | Definir representación visual de alternativas y cambios | Información artística comprensible |
| P3 | Navegación | Revisar consistencia de navegación entre módulos | Orientación clara dentro de la aplicación |
| P3 | Estados globales | Unificar carga, vacío, error, éxito y falta de permisos | Comportamiento visual predecible |

## 3. Trabajo transversal

| Prioridad | Área | Trabajo | Criterio de validación |
|---|---|---|---|
| P1 | Accesibilidad | Revisar contraste, foco y navegación por teclado | Controles utilizables sin depender del mouse |
| P1 | Responsive | Validar los flujos principales en móvil y tablet | Sin pérdida de información ni controles inaccesibles |
| P2 | Design tokens | Consolidar color, tipografía, espaciado y superficies | Valores compartidos y consistentes |
| P2 | Componentes | Definir patrones para botones, campos, tarjetas y paneles | Misma interacción y jerarquía entre módulos |
| P3 | Movimiento | Definir uso de animaciones y movimiento reducido | Animaciones justificadas y no intrusivas |

## 4. Dependencias y restricciones

- Las propuestas visuales deben respetar los flujos y reglas de negocio existentes.
- El diseño de formaciones y transiciones debe considerar los contratos funcionales
  disponibles; no debe inventar métricas ni reglas de optimización.
- Los cambios de comportamiento requieren tickets funcionales independientes.
- Las mejoras de estilos deben ejecutarse después de validar la dirección visual.
- No se deben modificar contratos backend como parte de tareas exclusivamente visuales.
- Las tareas deben dividirse por módulo o componente para evitar conflictos entre
  implementaciones paralelas.

## 5. Propuestas visuales pendientes

Antes de iniciar la implementación se deben preparar referencias para:

1. Inicio: identidad artística azul profundo y dorado.
2. Ingresar y registro: formularios operativos claros.
3. Mi coro: gestión de integrantes y acciones principales.
4. Conciertos: presentación artística y administración.
5. Formaciones: escenario, integrantes, posiciones y controles.

Cada propuesta debe mostrar al menos escritorio y móvil cuando el flujo lo requiera.

Las referencias son una guía de diseño y no una autorización para copiar literalmente
la imagen de inspiración.

## 6. Criterios de aceptación del Discovery

- [ ] Dirección visual artística y operativa validada.
- [ ] Paleta y tipografías revisadas.
- [ ] Componentes base y estados definidos.
- [ ] Pantallas principales relevadas.
- [ ] Oportunidades ordenadas por prioridad.
- [ ] Dependencias funcionales identificadas.
- [ ] Referencias visuales preparadas.
- [ ] Backlog revisado antes de crear tickets de implementación.

## 7. Fuera de alcance

Este backlog no autoriza:

- Cambios de CSS o templates Angular.
- Refactors de componentes.
- Cambios de contratos o lógica backend.
- Nuevas funcionalidades.
- Modificaciones de reglas de negocio.

Cada implementación futura debe tener su propio ticket, alcance y criterios de
aceptación en Jira.
