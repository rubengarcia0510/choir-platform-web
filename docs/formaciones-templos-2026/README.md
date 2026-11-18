# Formaciones – Noche de los Templos 2026

Animación de las formaciones del coro para el concierto "Noche de los Templos 2026".
Es una página HTML autocontenida (sin dependencias ni build): se abre `index.html` en el navegador.

No forma parte de la app Angular ni toca CSS/SCSS ni backend.

## Qué muestra

- Entrada del coro por el centro (fila de atrás primero) y salida al final.
- Director (W) saludando, yendo al púlpito para presentar cada tema y volviendo al atril.
- Cambios de formación entre temas, escalonados (no todos a la vez).
- Pausa de 10 s por tema; controles de reproducir, parar, anterior/siguiente e inicio.
- Lista de coreutas seleccionable para resaltar a una persona.

## Repertorio (sujeto a confirmación de los organizadores)

1. Diez Mil Razones
2. Pescador de Hombres (formación 2°)
3. Lux Aeterna (Pedro cambia con Rubén y pasa a T2)
4. La Jardinera (BBs: Dani - Clau - Gus - Jiho)
5. Zamba por Vos (igual que Jardinera)
6. Mariposa Tecknicolor
7. Candombe
8. (BIS) Thank You
9. Misa Criolla: "Gloria"

Daniela (altos, línea punteada) canta solo 10K, Pescador, Candombe y Thank You.

## Supuestos a confirmar

- Se usa la Formación General en todos los temas salvo Pescador (2°), Lux y Jardinera/Zamba, que son los que indican las notas del PDF.
- En Jardinera/Zamba: sopranos y altos se corren un lugar hacia los costados (4 a cada lado en la fila del medio) y Sofi baja a Piso junto a Ani.
- Los nombres (Pe = Pedro, Ru = Rubén, So = Sofi, An = Ani, G = Gus, Ji = Jiho, C = Clau, Da verde = Dani) se infirieron; el resto figura solo con la inicial.
- Los colores son los de la Formación General.

## Cómo editar

Los datos están al inicio del `<script>` de `index.html`:

- `P`: coreutas (id, inicial, nombre, color, x, y en la Formación General).
- `S`: temas (nombre, formación G/L/J/P, si canta Daniela).
- `form()`: posiciones de las formaciones L (Lux), J (Jardinera/Zamba) y P (Pescador 2°).
