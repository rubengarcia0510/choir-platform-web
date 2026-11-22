# BAND — Instrucciones de implementación CHOIR-127

**Ticket:** https://rubengarcia0510.atlassian.net/browse/CHOIR-127
**Repositorio:** rubengarcia0510/choir-platform-web
**Rama de implementación:** feature/CHOIR-127-registration-integration
**Unidad:** DS-02 B — Integración funcional de registro y verificación.

## Objetivo

Completar la integración funcional del registro de directores y la verificación de cuentas utilizando exclusivamente contratos y configuraciones reales del backend.

El rediseño visual corresponde a CHOIR-126 y queda fuera de este ticket.

## 1. Precondiciones obligatorias

Antes de implementar:

1. Leer CHOIR-127 en Jira.
2. Leer docs/tickets/FRONTEND.md.
3. Leer docs/design-discovery.md.
4. Leer docs/design-system.md.
5. Revisar CHOIR-126 y su estado.
6. Consultar el repositorio rubengarcia0510/choir-platform.
7. Identificar el contrato real de registro y verificación.
8. Confirmar la configuración de correo y seguridad.

Verificar:

- Endpoint y método HTTP de registro.
- DTO de entrada y respuesta.
- Significado exacto de HTTP 202.
- Configuración del remitente y mecanismo de correo.
- Endpoint y método de verificación.
- Formato y vigencia del token.
- Tratamiento de token inválido, expirado o utilizado.
- Comportamiento CSRF/CORS.
- Errores reales del backend.
- Configuración necesaria en los entornos desplegados.

Si falta alguna dependencia, no implementar esa parte. Documentar qué falta, dónde se verificó y qué ticket o equipo debe resolverlo.

## 2. Inspección del frontend

Identificar los archivos reales involucrados:

- Página o componente de registro.
- Template y estilos.
- Servicio HTTP de autenticación.
- Modelos y DTOs.
- Configuración de rutas.
- Interceptores HTTP.
- Manejo de CSRF.
- Pruebas existentes.

No asumir nombres de clases, métodos ni archivos.

## 3. Plan obligatorio antes de implementar

Entregar un plan técnico que detalle:

1. Endpoint backend verificado y referencia a su implementación.
2. Payload exacto de registro.
3. Respuestas posibles y sus significados.
4. Contrato de verificación.
5. Clases y métodos frontend involucrados.
6. Archivos exactos que se modificarán.
7. Estados funcionales que se implementarán.
8. Pruebas necesarias.
9. Dependencias pendientes.
10. Riesgos de seguridad.

No iniciar cambios hasta contar con el plan y confirmar que las precondiciones están satisfechas.

## 4. Integración del registro

Conectar el formulario existente al endpoint real.

Implementar:

- Envío del payload conforme al DTO backend.
- Estado de carga.
- Prevención de doble submit.
- Tratamiento de HTTP 202 según el contrato.
- Manejo de errores reales.
- Recuperación de errores cuando corresponda.
- Mensajes consistentes con la política de seguridad.

HTTP 202 no confirma que el correo haya sido entregado ni que exista una sesión iniciada.

No iniciar sesión automáticamente por recibir HTTP 202.

No revelar si una dirección de correo está registrada cuando el backend exige una respuesta genérica.

No implementar reintentos automáticos que puedan producir registros o correos duplicados.

## 5. Integración de verificación

Implementar únicamente cuando el contrato backend esté confirmado.

Verificar:

- Ruta frontend definitiva.
- Parámetro o formato del token.
- Endpoint real.
- Respuesta de éxito.
- Token inválido.
- Token expirado.
- Token ya utilizado, si corresponde.
- Errores recuperables y no recuperables.

No inventar rutas, parámetros ni estados.

No almacenar tokens innecesariamente ni registrarlos completos en logs.

No asumir que una verificación exitosa inicia automáticamente una sesión.

## 6. Seguridad

Comprobar:

- Protección CSRF.
- Configuración CORS.
- Tratamiento seguro de errores.
- Ausencia de secretos en el frontend.
- Ausencia de tokens en logs.
- No exposición innecesaria de información de cuentas.
- Prevención de envíos duplicados.
- Comportamiento ante navegación repetida o recarga de la página de verificación.

No desactivar controles de seguridad para conseguir que la integración funcione.

No modificar configuraciones backend para adaptar el frontend.

Si una configuración impide continuar, registrar el bloqueo con evidencia.

## 7. Separación arquitectónica

Respetar las convenciones del proyecto:

- El componente gestiona la interacción y presentación.
- El servicio HTTP encapsula las llamadas al backend.
- Los modelos representan los contratos verificados.
- Las rutas gestionan la navegación.
- Las pruebas cubren cada responsabilidad.

No introducir llamadas HTTP directamente en templates.

No duplicar lógica de autenticación en varios componentes.

No introducir un store global si el flujo puede resolverse con la arquitectura existente.

No realizar refactors generales.

## 8. Archivos autorizados

Solo se podrán modificar:

- Componentes y páginas del registro/verificación.
- Templates correspondientes.
- Estilos estrictamente necesarios para estados funcionales.
- Servicio API específico de registro/verificación.
- Modelos y DTOs frontend estrictamente necesarios.
- Configuración de rutas relacionada.
- Pruebas asociadas.

Los nombres y rutas exactos deberán quedar registrados en el plan previo.

No modificar backend, contratos públicos, módulos ajenos ni configuración global de seguridad.

No modificar los fundamentos visuales de CHOIR-125 ni rehacer el diseño de CHOIR-126.

## 9. Pruebas obligatorias

### Registro

- Envío correcto del payload.
- Estado de carga.
- Prevención de doble submit.
- Respuesta HTTP 202.
- Error de validación.
- Error de servidor.
- Error de conectividad.
- Ausencia de exposición de información sensible.

### Verificación

- Token válido.
- Token inválido, si está contemplado.
- Token expirado, si está contemplado.
- Token ya utilizado, si está contemplado.
- Error del servidor.
- Navegación y recarga.

### Seguridad

- CSRF/CORS conforme a configuración real.
- No registrar secretos.
- No duplicar solicitudes.

Ejecutar:

- npm run build
- npx ng test --watch=false

No simular respuestas inexistentes para hacer pasar las pruebas.

## 10. Git y entrega

1. Crear la rama feature/CHOIR-127-registration-integration para la implementación, cuando corresponda.
2. No trabajar directamente en main.
3. No mezclar cambios de CHOIR-126.
4. No incorporar modificaciones ajenas al ticket.
5. Ejecutar todas las pruebas.
6. Revisar el diff completo.
7. Crear un PR propio contra main.
8. Referenciar CHOIR-127.
9. Documentar dependencias pendientes.

## 11. Criterios de finalización

- El registro utiliza el contrato backend real.
- La verificación utiliza el contrato backend real.
- Los estados corresponden a respuestas verificadas.
- Se respeta CSRF/CORS.
- No existen envíos duplicados.
- No se exponen datos sensibles.
- Las pruebas pasan.
- El PR está abierto y listo para revisión.

Si las dependencias siguen sin resolverse, el resultado correcto es un bloqueo documentado y verificable, no una implementación basada en supuestos.

No cerrar el ticket hasta cumplir los criterios de aceptación.
