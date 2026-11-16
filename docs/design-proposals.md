# CHOIR — Propuestas visuales

Estado: propuestas conceptuales de CHOIR-124. Pendientes de validación.

Este documento registra las propuestas visuales de escritorio y móvil.
No representa una implementación ni autoriza cambios en Angular o CSS.

## 1. Inicio

### Objetivo

Presentar CHOIR como una herramienta de dirección coral y facilitar el
acceso a las tres áreas principales disponibles desde la página inicial.

### Escritorio

- Navegación superior con marca y accesos a Inicio, Mi coro, Conciertos,
  Formaciones e Ingresar.
- Hero de identidad artística con fondo azul profundo.
- Mensaje principal: "Cada voz importa. Cada detalle también."
- Descripción breve del propósito de la plataforma.
- Acción principal: Comenzar.
- Acción secundaria: Explorar la plataforma.
- Ilustración musical abstracta como recurso decorativo.
- Sección operativa clara con tres accesos: Tu coro, Conciertos y Formaciones.
- Pie institucional discreto.

### Móvil

- Marca y navegación compacta.
- Hero en una columna.
- Mensaje principal con jerarquía tipográfica clara.
- Acciones de ancho suficiente para interacción táctil.
- Ilustración adaptada al ancho disponible.
- Accesos a las tres áreas apilados verticalmente.
- Sin desplazamiento horizontal.

### Dirección visual

- Ambiente artístico: azul profundo y dorado.
- Superficies operativas: marfil y blanco.
- Títulos artísticos con serif; textos de interfaz con sans-serif.
- Dorado reservado para acentos y acciones destacadas.
- Mantener el verde operativo actual como referencia para enlaces y acciones
  de gestión, sujeto a validación de contraste.

### Correspondencia con la implementación actual

La página existente presenta:
- Mensaje institucional y descripción.
- Acceso a Registro y a la plataforma.
- Accesos a Mi coro, Conciertos y Formaciones.
- Ilustración abstracta con referencias a las voces.

La propuesta reorganiza visualmente esos elementos. No implica agregar
redes sociales, nuevas rutas, autenticación ni funcionalidades adicionales.
Los elementos de navegación y pie institucional deberán contrastarse
con las rutas y capacidades reales antes de aprobar el diseño.

### Criterios de validación

- [ ] Confirmar navegación y destinos de cada enlace.
- [ ] Validar legibilidad y contraste en ambos tamaños.
- [ ] Revisar el comportamiento del menú móvil.
- [ ] Verificar que la ilustración sea decorativa para tecnologías
      de asistencia.
- [ ] Comprobar que las acciones principales sean visibles sin
      desplazamiento excesivo.
- [ ] Contrastar la propuesta con la implementación real.

## 2. Ingresar y Registro

Estado: propuesta conceptual pendiente de validación. No representa pantallas
implementadas ni autoriza cambios en Angular, CSS ni backend.

Recursos visuales (fuente SVG y vista previa PNG en `docs/assets/choir-124/`):

| Propuesta | Archivo |
|---|---|
| Ingresar — escritorio | `auth-login-desktop` |
| Ingresar — móvil | `auth-login-mobile` |
| Registro — escritorio | `auth-register-desktop` |
| Registro — móvil | `auth-register-mobile` |
| Registro, éxito — escritorio | `auth-register-success-desktop` |
| Registro, éxito — móvil | `auth-register-success-mobile` |
| Estados visuales | `auth-states` |

![Ingresar — escritorio](assets/choir-124/auth-login-desktop.png)
![Registro — escritorio](assets/choir-124/auth-register-desktop.png)

### Correspondencia con la implementación actual

- `/ingresar` ya carga `src/app/auth/login.page.ts`, un formulario funcional
  (correo, contraseña, estado de carga y mensajes de error). El `LoginPage`
  placeholder de `src/app/pages.ts` no es la pantalla enrutada. Por eso la
  propuesta de Ingresar es una **reorganización visual** del formulario
  existente y conserva sus campos, textos y acciones. La tabla de rutas de
  `design-discovery.md` aún marca `/ingresar` como pendiente de completar;
  conviene corregirla.
- `/registro` carga `RegisterPage` de `src/app/pages.ts`, un placeholder
  informativo que indica que el alta depende de flujos de registro,
  verificación de correo y autenticación aún no definidos.
- Los mensajes de error de Ingresar reutilizan el texto existente, que ya
  menciona que el correo debe estar verificado.

### Decisiones de diseño

- **Dos ambientes, sin oscurecer todo.** Escritorio: panel artístico
  (azul `#00102A`, dorado `#D8B879`, títulos en serif con el mensaje de
  Inicio) junto a una tarjeta operativa clara (`#FCFBF8`/`#FFFFFF`, Inter).
  El formulario nunca se apoya sobre fondo oscuro.
- **Verde operativo conservado** para la acción principal y los enlaces
  (`#456B4C` sobre blanco: 6.07:1, calculado).
- **Marca y recurso gráfico moderado:** ondas doradas finas y puntos
  decorativos (`aria-hidden`) solo en el panel o la banda superior.
- **Misma estructura en ambas pantallas:** eyebrow, título serif, bajada,
  campos con etiqueta siempre visible, acción principal de ancho completo y
  enlace al flujo opuesto subrayado (no depende solo del color).
- Se mantiene el enlace "Volver al inicio" que ya existe.
- No se incorpora recuperación de contraseña, mostrar/ocultar contraseña,
  autenticación social ni "recordarme".

### Escritorio y móvil

| Aspecto | Escritorio | Móvil |
|---|---|---|
| Composición | Dos zonas: panel artístico (≈40 %) y zona operativa | Una columna; banda azul compacta (120 px) con marca |
| Formulario | Tarjeta de 440 px (campos de 360 px), centrada | Ancho completo con margen de 24 px |
| Título | Serif 32 px | Serif 28 px |
| Controles | Campos de 48 px, botón de 52 px | Igual altura; botón y campos de ancho completo |
| Enlace a la otra pantalla | Línea de texto bajo un separador | Dos líneas; área de toque ≥ 44 px |
| Desplazamiento | Sin desplazamiento en 1440×900 | Solo vertical; sin desplazamiento horizontal |

La acción principal queda dentro del flujo del formulario, no fija al borde
inferior, para no quedar tapada por el teclado del móvil.

### Estados visuales

Ver `auth-states`. Se definen para Ingresar y Registro:

- **Reposo:** borde de campo reforzado y etiqueta visible.
- **Foco:** borde de 2 px en verde más halo; el botón usa anillo oscuro.
- **Error:** borde, ícono y texto asociados al campo (`aria-invalid` y
  `aria-describedby`); el error de la operación usa `role="alert"`.
- **Carga:** campos bloqueados, botón con indicador y texto "Ingresando…",
  sin cambio de ancho ni reenvío.
- **Deshabilitado:** relleno neutro y texto atenuado, distinguible sin color.

El estado de éxito de Registro se propone en `auth-register-success-*`:
aviso de que debe verificarse el correo y acción "Ir a ingresar".

El texto "Ingresá un correo electrónico válido.", "Este campo es
obligatorio." y el copy del éxito son propuestas, no contratos existentes.

### Decisiones propuestas (a confirmar contra el backend)

Aprobadas para el diseño, no como contrato. Cada una debe verificarse con
el backend antes de implementar.

1. **Campos de Registro:** nombre para mostrar, correo y contraseña
   (`DirectorSession` tiene `displayName` y `email`). Sin confirmación de
   contraseña.
2. **Validaciones:** formato de correo y obligatoriedad en el frontend; las
   reglas de contraseña son las que imponga el backend, sin duplicarlas.
3. **Correo ya registrado:** mensaje genérico ("No pudimos crear la cuenta.
   Revisá los datos e intentá nuevamente.") para no revelar qué correos
   existen.
4. **Verificación de correo:** se asume. El error de Ingresar ya la
   menciona y el alta no inicia sesión sola.
5. **Después del alta:** pantalla de éxito en la misma ruta, con aviso de
   verificación y enlace a Ingresar.
6. **Botón de Registro:** "Crear cuenta".
7. **Errores de Ingresar:** se mantiene el mensaje actual, que agrupa
   credenciales y correo no verificado; separarlos exigiría cambios de
   backend y revelaría si un correo existe.

Pendiente de confirmar: endpoint y DTO de registro, si el backend envía el
correo de verificación y las respuestas para correo duplicado y datos
inválidos.

### Ajustes de tokens sugeridos (a validar en `design-system.md`)

Contrastes calculados, sin pruebas manuales:

- `--choir-muted` `#747A70`: 4.41:1 sobre blanco y 4.26:1 sobre `#FCFBF8`;
  no alcanza 4.5:1 para texto pequeño. Candidato: `#5F655C` (5.79:1 sobre
  `#FCFBF8`).
- `--choir-line` `#E9E8E1` sobre blanco: 1.23:1; sirve para separadores y
  bordes de tarjeta, pero no para delimitar campos (referencia 1.4.11,
  3:1). Candidato para campos: `#8A9086` (3.27:1 sobre blanco).
- El foco actual de `login.page.ts` usa `--accent-soft`; verificar que
  cumpla 3:1 o adoptar el borde de 2 px en verde de la propuesta.

### Recomendaciones para incorporar al flujo de revisión

- Mantener esta sección y registrar aquí las decisiones aceptadas o
  descartadas tras la revisión.
- Corregir el estado de `/ingresar` en `design-discovery.md`.
- Reconciliar DS-02 en `design-backlog.md` con el formulario ya existente
  y con las decisiones pendientes de Registro antes de crear tickets.

### Criterios de validación

- [ ] Confirmar contra el backend las decisiones propuestas de Registro.
- [ ] Medir contrastes con herramienta sobre los tokens definitivos.
- [ ] Probar navegación por teclado y foco en ambos formularios.
- [ ] Probar en móvil real con teclado abierto y zoom al 200 %.
- [ ] Verificar mensajes de error con lector de pantalla.
- [ ] Contrastar la propuesta final con la implementación real.

## 3. Otras pantallas

Pendientes de propuesta visual:
- Mi coro y gestión de coreutas.
- Conciertos.
- Formaciones y transiciones.

Cada pantalla deberá documentarse para escritorio y móvil, respetando
los datos, permisos, rutas y operaciones existentes.
