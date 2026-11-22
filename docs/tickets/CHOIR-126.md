# BAND — Instrucciones de implementación CHOIR-126

**Ticket:** https://rubengarcia0510.atlassian.net/browse/CHOIR-126
**Repositorio:** rubengarcia0510/choir-platform-web
**Rama de implementación:** feature/CHOIR-126-registration-visual-design
**Unidad:** DS-02 A — Diseño visual del flujo de registro.

## 1. Objetivo

Mejorar exclusivamente la presentación visual del flujo de registro existente, siguiendo las decisiones de diseño documentadas en el sistema de diseño de CHOIR.

El trabajo comprende la interfaz, sus estados visuales y su adaptación responsive. No autoriza cambios funcionales ni modificaciones de contratos con el backend.

## 2. Precondiciones

Antes de implementar:

1. Leer CHOIR-126 en Jira y verificar sus criterios de aceptación.
2. Leer `docs/tickets/FRONTEND.md`.
3. Leer `docs/design-discovery.md`.
4. Leer `docs/design-system.md`.
5. Leer `docs/design-proposals.md`.
6. Leer `docs/accessibility-audit.md`.
7. Verificar que CHOIR-124 esté integrado en main.
8. Revisar el estado de CHOIR-125 y sus fundamentos visuales.

Si alguna dependencia no está integrada, documentar el bloqueo. No asumir que una propuesta visual ya está implementada.

## 3. Inspección obligatoria

Identificar el flujo real de registro en el frontend.

Inspeccionar:

- Página y componente de registro.
- Template y estilos asociados.
- Componentes compartidos utilizados.
- Servicios y modelos consumidos, solo para comprender el comportamiento existente.
- Estados de carga, validación, error y respuesta.
- Navegación y rutas relacionadas.

No asumir nombres de clases, endpoints, propiedades ni estados sin verificarlos en el código.

## 4. Plan técnico previo

Antes de modificar archivos, presentar un plan que incluya:

- Componentes y clases reales involucrados.
- Templates y estilos que se modificarán.
- Estados existentes que deben conservarse.
- Cambios visuales propuestos.
- Adaptación desktop y móvil.
- Pruebas existentes y nuevas.
- Riesgos de regresión.
- Confirmación de que no se modifican contratos ni lógica funcional.

No iniciar la implementación sin este plan.

## 5. Alcance visual

Trabajar exclusivamente sobre la interfaz existente de registro.

Revisar y mejorar:

- Jerarquía visual.
- Distribución y espaciado.
- Tipografía.
- Campos y etiquetas.
- Botones y acciones.
- Mensajes de validación y error.
- Estados de carga.
- Presentación de confirmaciones.
- Adaptación a pantallas pequeñas.

Usar los tokens y patrones compartidos definidos por el sistema de diseño.

No inventar pasos, campos, opciones ni funcionalidades que no existan en el flujo real.

## 6. Comportamiento que debe preservarse

No cambiar:

- Endpoint de registro.
- Método HTTP.
- Payload ni nombres de propiedades.
- Validaciones funcionales.
- Manejo de errores del backend.
- Servicios ni modelos.
- Autenticación o gestión de sesiones.
- Rutas de verificación.
- Envío de correos.
- Configuración CSRF/CORS.

La respuesta HTTP 202 debe conservar su semántica: indica que la solicitud fue aceptada, pero no confirma por sí sola que el correo haya sido entregado ni que exista una sesión iniciada.

No presentar una confirmación visual que prometa algo que el backend no garantiza.

## 7. Accesibilidad y responsive

Verificar:

- Labels asociados a sus campos.
- Mensajes de error comprensibles y asociados al campo correspondiente.
- Navegación completa por teclado.
- Foco visible.
- Orden lógico de foco.
- Contraste suficiente.
- Estados que no dependan únicamente del color.
- Targets táctiles adecuados.
- Ausencia de scroll horizontal no intencional.
- Respeto por `prefers-reduced-motion`.

Probar como mínimo:

- Desktop.
- Tablet.
- Móvil de 320 px.
- Móvil de 375 px.
- Móvil de 430 px.

No declarar conformidad WCAG 2.2 AA sin una evaluación completa.

## 8. Restricciones

No modificar backend ni contratos HTTP.

No implementar el proceso funcional de verificación de correo.

No cambiar servicios, stores, modelos ni lógica de negocio.

No agregar dependencias.

No rediseñar otras pantallas.

No modificar componentes ajenos al flujo de registro, salvo que exista una dependencia compartida imprescindible y esté expresamente justificada y aprobada en el plan.

No mezclar el trabajo de CHOIR-127: la integración funcional de registro y verificación es una unidad separada.

## 9. Pruebas

Agregar o actualizar pruebas para comprobar que los cambios visuales no alteran el comportamiento existente.

Verificar:

- Renderizado de los campos y acciones.
- Labels y mensajes de validación.
- Estados de carga y error.
- Presentación de la respuesta 202.
- Ausencia de regresiones en el flujo existente.

Ejecutar:

- `npm run build`
- `npx ng test --watch=false`

Revisar visualmente el flujo en desktop y móvil.

## 10. Git y entrega

1. Implementar en `feature/CHOIR-126-registration-visual-design`.
2. No trabajar directamente en main.
3. No mezclar cambios de otros tickets.
4. Revisar el diff completo.
5. Verificar que los cambios respeten el alcance visual.
6. Crear un PR propio contra main.
7. Referenciar CHOIR-126.

## 11. Criterios de finalización

- Flujo visual de registro actualizado.
- Diseño consistente con el sistema de diseño.
- Estados existentes correctamente representados.
- Responsive validado.
- Accesibilidad revisada.
- Contratos y comportamiento funcional preservados.
- Build y pruebas ejecutados correctamente.
- PR abierto y listo para revisión.

No cerrar el ticket hasta cumplir los criterios de aceptación.
