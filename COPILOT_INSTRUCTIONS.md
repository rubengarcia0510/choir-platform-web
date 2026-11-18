# Copilot Instructions – choir-platform-web

## Project overview

- Framework: Angular 22.
- Language: TypeScript.
- Package manager: npm.
- Tests: Vitest through Angular CLI.
- CI: GitHub Actions.
- Deployment: GitHub Pages.

Follow the existing project conventions and architecture. Before introducing a dependency, check whether the existing Angular and TypeScript capabilities are sufficient.

## Branching and integration workflow

- `main` contains stable, published production code.
- `develop` is the pre-release integration branch.
- `124-integradora` is the active integration branch for CHOIR-124 Design Discovery.
- CHOIR-124 feature branches must be created from the latest `124-integradora` and target `124-integradora`.
- Do not redirect CHOIR-124 feature work to `develop`.
- Other feature branches must use the integration branch explicitly assigned to their work. Do not assume every feature starts from `develop`.
- Do not work directly on `main`, `develop`, or `124-integradora`.
- Do not delete or repurpose existing branches without explicit authorization.

### CHOIR-124 release flow

The release of the current state of CHOIR-124 does not close the Jira issue.

1. Integrate `124-integradora` into `develop` through a pull request.
2. Validate the integrated state and CI on `develop`.
3. Create the release branch from `develop`.
4. Update and verify the release version.
5. Run the required tests and build validations.
6. Promote the release branch to `main` through a pull request.
7. Create the version tag on the published commit in `main`.

Do not close CHOIR-124 as part of an intermediate release. Its remaining tasks and final integration requirements remain in force.

### Other branch rules

- Hotfix branches must be created from `main` and integrated into `main` through a pull request.
- After a hotfix is published, synchronize it into the relevant integration branch.
- Do not merge directly into protected branches.
- Do not merge a pull request unless explicitly authorized.

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

Use a concise description in imperative form. Include the corresponding CHOIR ticket reference in the commit body or footer whenever applicable.

## Pull request checklist

Before opening a pull request:

1. Confirm that the source branch is based on the correct integration branch.
2. Confirm that the target branch is correct for the ticket or release.
3. Review the complete diff.
4. Remove unrelated changes and temporary files.
5. Run the relevant tests.
6. Run the available lint and formatting checks.
7. Verify that the application builds successfully.
8. Include the corresponding CHOIR ticket reference.
9. Describe the changes and validations in the pull request.

Do not merge before required checks pass and explicit authorization is given.

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

Do not invent or change a release version without explicit confirmation.

When preparing a release, keep the frontend version synchronized in:

- `package.json`

Do not update the release version for every feature.

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

## Development commands

Install dependencies:

    npm install

Run unit tests:

    npx ng test --watch=false

Build the application:

    npx ng build

Run lint checks when configured:

    npm run lint

Use Playwright for end-to-end tests when the change requires them and the repository has the required infrastructure configured.

Keep project documentation under `docs/`. The complete branching and release procedure is documented in `docs/development-workflow.md`.

## Additional safeguards

- Do not reuse a feature branch for a different CHOIR ticket.
- Review the complete diff before committing or opening a pull request.
- Do not include temporary files, backups, generated artifacts, or unrelated changes in commits.
- Never report tests, builds, lint checks, or other validations as successful unless they were actually executed and passed.
