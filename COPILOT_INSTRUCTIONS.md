# Copilot Instructions

## Project overview

This repository contains the CHOIR frontend application.

- Framework: Angular 22.
- Language: TypeScript.
- Package manager: npm.
- Tests: Angular testing tools.
- CI: GitHub Actions.
- Deployment: GitHub Pages.

Follow the existing project conventions and architecture. Before introducing a dependency, check whether the existing Angular and TypeScript capabilities are sufficient.

## Branching and integration workflow

The active integration branch is `124-integradora`.

- `main` contains stable, reviewed code.
- `124-integradora` is the active frontend integration branch.
- Feature branches must be created from the latest `124-integradora`.
- Feature pull requests must target `124-integradora`.
- Release branches must be created from `124-integradora` using `release/X.Y.Z`.
- Release pull requests must target `main`.
- Hotfix branches must be created from `main` and merged into `main`. Afterward, synchronize the fix into `124-integradora`.
- Do not use `develop` as part of the active workflow.
- Do not merge directly into `main` or `124-integradora`.
- Do not delete or repurpose existing branches without explicit authorization.

The backend currently uses `main` as its integration base. Do not assume that the backend has a permanent integration branch equivalent to `124-integradora`.

### Branch protection

The following protections are recommended for `main` and `124-integradora`:

- Require pull requests before merging.
- Require successful CI checks.
- Require review before merging when reviewers are available.
- Prevent force pushes.
- Prevent deletion of protected branches.

Do not change repository protection settings without authorization.

## Commit conventions

Use Conventional Commits.

The commit message format is:

`type(scope): description`

Common types:

- `feat`: new functionality.
- `fix`: bug correction.
- `refactor`: code restructuring without changing behavior.
- `test`: tests.
- `docs`: documentation.
- `style`: formatting or style changes without functional impact.
- `perf`: performance improvements.
- `build`: build system or dependency changes.
- `ci`: continuous integration changes.
- `chore`: maintenance tasks.

Use a concise description in imperative form.

Include the corresponding CHOIR ticket reference in the commit body or footer whenever applicable.

Example:

    feat(registration): add registration form

    Implements the registration flow.
    Refs CHOIR-127

## Pull request checklist

Before opening a pull request:

1. Confirm that the source branch is based on the correct integration branch.
2. Review the complete diff.
3. Remove unrelated changes and temporary files.
4. Run the relevant tests.
5. Run the available lint and formatting checks.
6. Verify that the application builds successfully.
7. Include the corresponding CHOIR ticket reference.
8. Describe the changes and validations in the pull request.

Pull requests for features must target `124-integradora`, not `main`.

Release pull requests must target `main`.

Do not merge a pull request unless explicitly authorized.

## Testing and quality

- Add or update tests for new behavior.
- Keep tests focused on observable behavior.
- Cover success cases, validation, error handling, and relevant edge cases.
- Avoid tests that depend on implementation details when behavior can be tested instead.
- Maintain the project's configured coverage requirements. The target coverage is 80%.
- Run the relevant tests before requesting review.
- Do not claim that a validation passed unless it was actually executed successfully.

## Linting and formatting

- Follow the existing TypeScript and Angular style.
- Use the formatting and linting tools configured in the repository.
- Avoid introducing formatting changes unrelated to the task.
- Do not assume a CI job runs a check unless it is configured in the workflow.

## Versioning and coordinated releases

Frontend and backend releases must use the same SemVer version when publishing CHOIR as a coordinated product.

Use Semantic Versioning:

- MAJOR: incompatible changes.
- MINOR: backward-compatible functionality.
- PATCH: backward-compatible fixes.

Do not use a `v` prefix in version numbers or Git tags.

Example version: `0.1.0`.

Update the frontend version in `package.json` and `package-lock.json` when preparing a release, not for every feature.

The frontend release process is:

1. Create `release/X.Y.Z` from the latest `124-integradora`.
2. Update the frontend version.
3. Run tests and build validations.
4. Open a pull request targeting `main`.
5. Coordinate the release with the backend so both repositories use the same version.
6. After approval and merge, create the matching Git tag and GitHub Release.
7. Synchronize `main` back into `124-integradora`.

The backend has its own release pull request and version update. Do not assume that a frontend release alone completes the coordinated release.

Do not publish releases, create release tags, or merge release pull requests without explicit authorization.

## Angular architecture and design

- Prefer Angular standalone components and the established project patterns.
- Keep components focused on presentation and user interaction.
- Move reusable business logic into appropriate services.
- Avoid putting unrelated responsibilities into large components or central routing files.
- Extract components when a page or component becomes too large or handles multiple independent responsibilities.
- Follow SOLID principles where they improve separation of concerns.
- Avoid unnecessary abstractions and dependencies.
- Reuse existing shared components and services when appropriate.
- Keep routing, state management, and data access responsibilities clearly separated.
- Preserve accessibility and responsive behavior.

## TypeScript practices

- Prefer strict typing.
- Avoid `any` unless there is a documented and justified reason.
- Handle nullable and optional values explicitly.
- Avoid duplicated logic.
- Prefer clear, maintainable code over unnecessarily compact implementations.

## Security and maintenance

- Do not commit credentials, tokens, secrets, or environment-specific private data.
- Validate user input.
- Handle API errors explicitly.
- Avoid logging sensitive information.
- Do not introduce unnecessary dependencies.
- Keep dependencies and configuration consistent with the existing project.
- Do not modify unrelated backend files or backend behavior from this repository.

## Development commands and additional safeguards

Install dependencies with:

    npm ci

Run unit tests with:

    npx ng test --watch=false

Build the application with:

    npx ng build

Run lint and formatting checks with:

    npm run lint

Use Playwright for end-to-end tests when the change requires them and the repository has the required infrastructure configured.

Keep project documentation under `docs/`. The complete branching and release procedure is documented in `docs/development-workflow.md`.

Additional branch and pull request rules:

- Do not reuse a feature branch for a different CHOIR ticket.
- Do not work directly on `main` or `124-integradora`.
- Review the complete diff before committing or opening a pull request.
- Do not include temporary files, backups, generated artifacts, or unrelated changes in commits.
- Never report tests, builds, lint checks, or other validations as successful unless they were actually executed and passed.
