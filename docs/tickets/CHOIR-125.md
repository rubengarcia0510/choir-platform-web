# BAND — Instrucciones de implementación CHOIR-125

**Ticket:** https://rubengarcia0510.atlassian.net/browse/CHOIR-125
**Repositorio:** rubengarcia0510/choir-platform-web
**Rama de implementación:** feature/CHOIR-125-design-system-foundations
**Unidad:** DS-01 — Fundamentos visuales compartidos.

## 1. Objetivo

Definir e implementar los fundamentos visuales compartidos del frontend Angular de CHOIR, de acuerdo con las decisiones documentadas en `docs/design-system.md`.

El trabajo se limita a tokens globales y patrones compartidos ya existentes. No implica rediseñar pantallas ni crear componentes nuevos.

## 2. Precondiciones

Antes de implementar:

1. Leer CHOIR-125 en Jira y verificar sus criterios de aceptación.
2. Leer `docs/tickets/FRONTEND.md`.
3. Leer `docs/design-system.md`.
4. Leer `docs/design-discovery.md`.
5. Verificar que CHOIR-124 esté integrado en main.
6. Revisar el estado de los estilos y componentes actuales.
7. Identificar los patrones compartidos que realmente existen.

Si CHOIR-124 no está integrado, documentar el bloqueo y no asumir que las decisiones visuales están cerradas.

## 3. Inspección y plan técnico

Inspeccionar:

- `src/styles.scss`
- `src/app/app.scss`
- Componentes y templates que consumen estilos compartidos.
- Pruebas existentes relacionadas con estilos y componentes.

Antes de modificar archivos, entregar un plan que indique:

- Tokens que se incorporarán.
- Selectores compartidos que se ajustarán.
- Componentes que consumen esos estilos.
- Archivos exactos que se modificarán.
- Pruebas que se agregarán o actualizarán.
- Riesgos de regresión visual.

No iniciar cambios sin este plan.

## 4. Tokens globales

Implementar en `src/styles.scss` los tokens definidos en `docs/design-system.md`.

Considerar:

- Colores de marca y superficies.
- Colores semánticos.
- Tipografía.
- Escala de espaciado basada en múltiplos de 4.
- Bordes y radios.
- Elevaciones.
- Foco visible.
- Transiciones y movimiento reducido.

Respetar la distinción entre áreas artísticas y operativas.

Referencia de dirección visual:

- Azul profundo: `#00102A`
- Azul secundario: `#142747`
- Dorado: `#D8B879`
- Marfil: `#F5F1E8`
- Fondo operativo: `#FCFBF8`
- Superficie: `#FFFFFF`
- Texto operativo: `#252B25`
- Texto secundario: `#6B7168`
- Bordes: `#E9E8E1`
- Verde: `#456B4C`

No cambiar estos valores arbitrariamente. Si la inspección revela una incompatibilidad, documentarla y justificar cualquier ajuste antes de implementarlo.

## 5. Patrones compartidos

En `src/app/app.scss`, limitar los cambios a los patrones existentes:

- `.button`
- `.button-primary`
- `.button-secondary`
- `.button-danger`
- `.panel`
- `.notice-card`

Verificar sus variantes y estados:

- Normal.
- Hover.
- Focus-visible.
- Active.
- Disabled.

Mantener la compatibilidad con los componentes que ya utilizan estos selectores.

No aplicar estilos globales indiscriminados ni cambiar la apariencia de componentes específicos que no pertenezcan a este alcance.

## 6. Accesibilidad

Verificar:

- Contraste de texto normal: mínimo 4.5:1.
- Contraste de texto grande: mínimo 3:1.
- Contraste de componentes y estados: mínimo 3:1 cuando corresponda.
- Foco visible y distinguible.
- Uso por teclado.
- Estados disabled comprensibles.
- Respeto por `prefers-reduced-motion`.
- Ausencia de información comunicada únicamente mediante color.

No declarar conformidad WCAG 2.2 AA global sin una evaluación completa.

## 7. Restricciones

No modificar:

- `pages.ts`
- `auth/login.page.ts`
- `formation-stage.component.scss`
- Componentes específicos de pantallas.
- Servicios.
- Stores.
- Modelos.
- Contratos HTTP.
- Lógica de negocio.
- Rutas.

No crear componentes nuevos.
No incorporar dependencias.
No realizar refactors generales.
No rediseñar pantallas completas.
No modificar funcionalidades de registro o verificación.

El alcance de CHOIR-125 no incluye la auditoría por pantalla de CHOIR-128 ni la validación integral responsive de CHOIR-129.

## 8. Pruebas

Agregar o actualizar pruebas únicamente cuando sean compatibles con la infraestructura existente.

Validar los patrones compartidos y sus estados.

Ejecutar:

- `npm run build`
- `npx ng test --watch=false`

Revisar visualmente, como mínimo:

- Inicio.
- Mi coro.
- Formaciones.

Comprobar que los cambios no generen regresiones en pantallas que consumen los estilos compartidos.

## 9. Git y entrega

1. Implementar en `feature/CHOIR-125-design-system-foundations`.
2. No trabajar directamente en main.
3. No mezclar cambios de otros tickets.
4. Revisar el diff completo.
5. Verificar que solo se hayan modificado archivos autorizados.
6. Crear un PR propio contra main.
7. Referenciar CHOIR-125.

## 10. Criterios de finalización

- Tokens globales implementados según el sistema de diseño.
- Patrones compartidos actualizados sin regresiones.
- Estados interactivos definidos.
- Foco y contraste revisados.
- Build y pruebas ejecutados correctamente.
- Pantallas de referencia verificadas.
- Documentación actualizada si corresponde.
- PR abierto y listo para revisión.

No cerrar el ticket hasta cumplir los criterios de aceptación.
