# Instrucciones de desarrollo – choir-platform-web

## Proyecto

- Angular 22.
- Node.js y npm.
- Instalar dependencias con `npm ci`.
- Tests unitarios: `npx ng test --watch=false`.
- Build: `npx ng build`.
- Lint y formato: `npm run lint` (Prettier).
- E2E: Playwright cuando el cambio lo requiera y exista cobertura configurada.
- CI: `.github/workflows/angular-ci.yml`.
- Documentación: `docs/`.

## Flujo de ramas obligatorio

La rama de integración activa es `124-integradora`. `develop` no forma parte del flujo vigente.

- `main`: código estable publicado.
- `124-integradora`: integración de funcionalidades.
- `feature/CHOIR-XXX-descripcion`: ramas de trabajo creadas desde `origin/124-integradora`.
- `release/X.Y.Z`: preparación de versiones, creada desde `124-integradora`.
- `hotfix/CHOIR-XXX-descripcion`: correcciones urgentes de producción.

Las funcionalidades se integran mediante PR hacia `124-integradora`. No abrir PR de features directamente hacia `main`.

Los releases se integran mediante PR hacia `main`. Después de publicar, sincronizar `main` de vuelta a `124-integradora` mediante PR. No hacer merges locales improvisados entre ramas divergentes ni usar force push.

El procedimiento completo está en [docs/development-workflow.md](docs/development-workflow.md).

## Versionado

Backend y frontend comparten una versión coordinada.

- Usar SemVer: `X.Y.Z`.
- No anteponer `v` a versiones, tags ni nombres de releases.
- Ejemplo: `0.1.0`.
- Actualizar `package.json` y `package-lock.json` durante la preparación del release.
- No actualizar la versión en cada feature.

## Commits

Seguir Conventional Commits:

`<type>(<scope>): <subject>`

Tipos habituales: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`, `perf`, `build`, `ci`.

Incluir la referencia al ticket CHOIR correspondiente en el cuerpo o pie del commit cuando aplique.

## Pull requests y calidad

Antes de abrir un PR:

- Verificar que la rama parta de `124-integradora`.
- Ejecutar `npx ng test --watch=false`.
- Ejecutar `npx ng build`.
- Ejecutar `npm run lint`.
- Revisar el diff y evitar archivos temporales o backups.
- Actualizar documentación cuando corresponda.
- Referenciar el ticket CHOIR correspondiente.
- Adjuntar capturas cuando el cambio visual lo amerite.

No declarar una validación exitosa si no se ejecutó o si falló.

## Pruebas y cobertura

- Agregar pruebas unitarias para cada componente o servicio nuevo.
- Mantener como objetivo una cobertura mínima del 80 % en código nuevo o modificado.
- Para cambios de UI, cubrir renderizado, interacciones, accesibilidad y estados relevantes.
- Agregar pruebas E2E con Playwright cuando el flujo sea crítico y la infraestructura existente lo permita.

## Diseño y arquitectura

- Mantener componentes y responsabilidades cohesivos.
- Evitar concentrar HTML, estilos y lógica de múltiples páginas en archivos generales.
- Preferir componentes standalone y estilos encapsulados cuando corresponda.
- No introducir estado global ni abstracciones innecesarias para resolver cambios acotados.
- Mantener accesibilidad, navegación por teclado y diseño responsive.
- Agregar pruebas para los comportamientos nuevos y los estados relevantes.

## Reglas generales

- No trabajar directamente en `main` ni en `124-integradora`.
- No reutilizar ramas de tickets diferentes.
- No forzar pushes ni resolver divergencias descartando commits.
- No incluir credenciales, secretos ni configuración específica de producción en Git.
