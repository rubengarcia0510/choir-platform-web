# Flujo de desarrollo y releases

## Ramas

- `main`: versión estable publicada.
- `124-integradora`: rama de integración activa del frontend.
- `feature/CHOIR-XXX-descripcion`: trabajo de un ticket.
- `release/X.Y.Z`: preparación de una versión coordinada.
- `hotfix/CHOIR-XXX-descripcion`: corrección urgente de producción.

## Desarrollo de funcionalidades

1. Actualizar referencias remotas.
2. Crear cada rama `feature/*` desde `origin/124-integradora`.
3. Mantener los cambios de cada ticket aislados en su rama.
4. Abrir PR hacia `124-integradora`.
5. Revisar el alcance y esperar que CI termine correctamente antes de integrar.
6. No abrir PRs de funcionalidades directamente hacia `main`.

No usar `develop` como rama de integración.

## Releases coordinados

Backend y frontend se publican como una misma versión de CHOIR. Ambos repositorios deben utilizar exactamente el mismo número de versión.

Formato: `X.Y.Z`, sin prefijo `v`.

Ejemplo: `0.1.0`.

La numeración sigue SemVer:

- MAJOR: cambios incompatibles.
- MINOR: funcionalidades nuevas compatibles.
- PATCH: correcciones compatibles.

### Preparación

1. Confirmar que el alcance previsto para la versión está integrado y revisado.
2. Crear `release/X.Y.Z` en el frontend desde `124-integradora`.
3. Crear `release/X.Y.Z` en el backend desde `main`.
4. Actualizar la versión del frontend en `package.json`.
5. Actualizar `version` en `build.gradle` del backend, sin sufijo `-SNAPSHOT`.
6. Verificar que ambos repositorios declaren exactamente la misma versión.
7. Instalar dependencias del frontend con `npm install`.
8. Ejecutar las validaciones completas de ambos proyectos.
9. Corregir cualquier fallo en las ramas release y volver a validar.

### Publicación

1. Abrir un PR del release frontend hacia `main`.
2. Abrir un PR del release backend hacia `main`.
3. Revisar ambos PR y sus validaciones.
4. Integrar ambos cambios cuando estén aprobados.
5. Crear en cada repositorio el tag `X.Y.Z`, sin prefijo `v`.
6. Publicar una GitHub Release `X.Y.Z` en cada repositorio.
7. Verificar que ambos releases correspondan a la misma versión y al mismo ciclo de publicación.
8. Sincronizar `main` hacia `124-integradora` mediante un PR, conservando los cambios que se hayan integrado durante la preparación del release.

No publicar un repositorio como versión coordinada si el otro todavía no está listo.

## Reglas

- No trabajar directamente en `main` ni en `124-integradora`.
- No reutilizar ramas de tickets diferentes.
- No forzar pushes ni resolver divergencias descartando commits.
- No crear tags antes de integrar y validar el release.
- No modificar la versión en cada feature: se actualiza durante la preparación del release.
- No incluir credenciales, secretos ni configuración específica de producción en Git.
