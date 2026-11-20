# CHOIR — Referencias visuales de los módulos operativos

Estado: referencias conceptuales de CHOIR-124, contrastadas con las capacidades actuales. La validación visual y manual sigue pendiente.

Este documento complementa `design-proposals.md` y concreta la jerarquía
visual de Mi coro, Conciertos y Formaciones a partir de las capacidades
observadas en la implementación actual.

No autoriza cambios funcionales, modificaciones de Angular ni CSS.

## 1. Criterios comunes

- Utilizar el ambiente operativo como base: fondo `#FCFBF8`,
  superficies blancas, texto `#252B25` y acento verde `#456B4C`.
- Reservar el azul profundo `#00102A` y el dorado `#D8B879`
  para destacados artísticos y elementos que necesiten ese contexto.
- Usar Inter para controles y textos de interfaz.
- Mantener una jerarquía clara entre título, descripción, contenido
  principal y acciones.
- No representar acciones, datos ni estados que la aplicación no ofrece.
- Diseñar escritorio y móvil como composiciones específicas.
- No depender del hover para descubrir acciones.
- Mantener foco visible, etiquetas comprensibles y contraste suficiente.

## 2. Mi coro

### Capacidades existentes

La pantalla permite:
- Consultar los coros disponibles.
- Crear un coro.
- Editar un coro.
- Archivar un coro mediante confirmación.
- Visualizar estados de carga, error y ausencia de coros.
- Diferenciar visualmente los coros archivados.

No se debe representar:
- Un listado de integrantes.
- Un resumen de integrantes.
- Búsqueda o filtros.
- Una vista de detalle del coro.
- Acciones que no estén disponibles en la pantalla actual.

### Referencia de escritorio

1. Encabezado con título «Mi coro» y descripción breve.
2. Formulario de creación o edición en un panel claramente identificado.
3. Listado de coros como contenido principal.
4. Cada elemento muestra el nombre y la descripción disponibles.
5. Acciones de edición y archivo agrupadas y visualmente diferenciadas.
6. Confirmación de archivo próxima al elemento correspondiente.
7. Coros archivados diferenciados sin depender únicamente del color.

La composición debe dar prioridad al listado y evitar que el formulario
compita visualmente con él. La distribución actual de dos columnas puede
servir como referencia, pero no es un requisito de diseño.

### Referencia móvil

1. Encabezado compacto.
2. Formulario en una columna.
3. Listado debajo del formulario.
4. Cada coro se presenta como una tarjeta o fila vertical.
5. Nombre y descripción con jerarquía tipográfica clara.
6. Acciones visibles y alcanzables mediante controles táctiles.
7. Confirmación de archivo sin depender de interacciones hover.

Evitar acciones comprimidas en una misma fila cuando el ancho disponible
no permita identificarlas y utilizarlas cómodamente.

### Estados

- Cargando: indicar que se está consultando la información.
- Error: explicar el problema y conservar las acciones de recuperación
  que existan.
- Sin coros: explicar que todavía no hay elementos y mantener visible
  la posibilidad de crear uno.
- Listado disponible: mostrar los elementos recibidos.
- Edición: diferenciar claramente el formulario de creación del de edición.
- Archivo: mostrar una confirmación contextual antes de ejecutar la acción.

## 3. Conciertos

### Capacidades existentes

La pantalla es actualmente un placeholder informativo.
Presenta el título, una descripción, el indicador «MÓDULO EN PREPARACIÓN»
y un panel vacío que explica que la información todavía no está conectada.

No existe en esta pantalla:
- Listado de conciertos.
- Creación o edición de conciertos.
- Calendario.
- Filtros.
- Detalle de conciertos.
- Acciones sobre conciertos.
- Datos reales de próximos conciertos.

### Referencia de escritorio

1. Encabezado «Conciertos».
2. Descripción breve del propósito del módulo.
3. Indicador textual «Módulo en preparación».
4. Panel informativo central con el mensaje de que la funcionalidad
   todavía no está conectada.
5. Composición clara, sin tarjetas ficticias ni datos de ejemplo
   que puedan confundirse con información real.

El panel debe comunicar una limitación temporal del producto.
No debe parecer un estado vacío de una consulta que ya funciona.

### Referencia móvil

1. Encabezado compacto.
2. Indicador de preparación visible.
3. Panel informativo adaptado a una sola columna.
4. Texto legible y sin desplazamiento horizontal.
5. Sin botones de creación ni filtros ficticios.

### Estados

La referencia debe representar exclusivamente el estado de módulo
en preparación observado en la implementación. No inventar estados
de carga, error, listado vacío o éxito para operaciones que todavía
no existen en esta pantalla.

## 4. Formaciones

### Capacidades existentes

La pantalla permite:
- Seleccionar el coro.
- Seleccionar el concierto.
- Seleccionar la obra del repertorio.
- Seleccionar una formación.
- Crear y editar una formación.
- Consultar el escenario y los integrantes representados.
- Agregar y quitar integrantes.
- Visualizar y modificar posiciones mediante arrastre.
- Bloquear y desbloquear posiciones.
- Guardar posiciones.
- Mostrar estados de carga, error y éxito.

La formación debe entenderse dentro del contexto del concierto.
No asumir que una distribución es global o idéntica para todos los conciertos.

### Referencia de escritorio

1. Encabezado con título y contexto del módulo.
2. Selectores de coro, concierto, obra y formación en una zona
   de configuración claramente delimitada.
3. Escenario como superficie visual dominante una vez seleccionado
   el contexto.
4. Integrantes representados con identificación legible y posición visible.
5. Controles de bloqueo y eliminación próximos al integrante correspondiente.
6. Acciones de edición y guardado agrupadas fuera del área principal
   del escenario.
7. Mensajes de error y confirmación asociados a la operación correspondiente.

Los selectores deben tener una jerarquía clara y no competir con el escenario.
El elenco debe permanecer disponible sin quitar protagonismo a la distribución.

### Referencia móvil

1. Encabezado compacto.
2. Selectores organizados en una secuencia vertical y fácil de recorrer.
3. Escenario adaptado al ancho disponible, conservando la relación
   espacial entre integrantes.
4. Elenco y controles organizados en una zona accesible después del escenario.
5. Acciones principales claramente identificadas.
6. Controles táctiles con tamaño y separación suficientes.
7. Sin pérdida de información por superposición o recorte.

No basta con apilar las columnas de escritorio: hay que revisar
el orden de lectura y la relación entre escenario, elenco y controles.

### Interacción y accesibilidad

El arrastre no debe ser la única forma de modificar posiciones.
La futura implementación deberá ofrecer una alternativa operable
por teclado y controles accesibles para ajustar posiciones.

Esta referencia es un requisito de diseño futuro, no una afirmación
de que esa alternativa ya exista.

Verificar:
- Foco visible en integrantes y controles.
- Nombres accesibles para bloquear y quitar integrantes.
- Identificación textual de selección y bloqueo.
- Anuncios comprensibles de errores y resultados.
- Compatibilidad con movimiento reducido.
- Uso mediante teclado sin depender de pointer events.

### Estados

- Selección de contexto pendiente.
- Carga de información.
- Error de consulta o guardado.
- Escenario disponible.
- Elenco cargando.
- Cambios pendientes de guardar.
- Guardado exitoso.
- Escenario sin integrantes, únicamente cuando corresponda al estado real.

No representar datos de ejemplo como si fueran integrantes reales.

## 5. Validación de las referencias

Antes de considerar aprobadas estas propuestas:

- [ ] Contrastar cada composición con la pantalla y el flujo reales.
- [ ] Revisar escritorio, tablet y móvil.
- [ ] Confirmar que no se incorporen operaciones inexistentes.
- [ ] Validar jerarquía, legibilidad y consistencia entre módulos.
- [ ] Comprobar contraste y foco visible.
- [ ] Revisar nombres accesibles y navegación por teclado.
- [ ] Validar la alternativa accesible al arrastre en Formaciones.
- [ ] Registrar evidencia y decisiones pendientes.

## 6. Restricciones

Estas referencias no autorizan:
- Crear funcionalidades nuevas.
- Modificar contratos o endpoints.
- Cambiar reglas de negocio.
- Agregar datos ficticios a la interfaz.
- Modificar estilos o componentes Angular.

Toda implementación posterior requiere un ticket Jira propio,
con alcance, dependencias y criterios de aceptación definidos,
además de su rama y PR independientes.
