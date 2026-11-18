# Copilot Instructions – choir-platform-web

## General Project Guidelines

- Angular version: 22.0.6 (see `angular.json`).
- Package manager: npm.
- Use `npm ci` in CI and `npm install` locally.
- Tests: Vitest through Angular CLI (`npx ng test --watch=false`).
- Build: `npx ng build`.
- Static documentation is stored under `docs/`.

## Branching and Integration Workflow

- `main`: published, stable production code.
- `develop`: pre-release integration branch.
- `124-integradora`: active integration branch for CHOIR-124 Design Discovery.
- Feature branches belonging to CHOIR-124 work must be created from `124-integradora` and target `124-integradora`.
- Do not redirect CHOIR-124 feature work to `develop`.
- Other feature branches must use the integration branch explicitly assigned to their work. Do not assume every feature starts from `develop`.
- Release flow for the current CHOIR-124 delivery:
  1. Integrate `124-integradora` into `develop` through a pull request.
  2. Validate the integrated state and CI on `develop`.
  3. Create the release branch from `develop`.
  4. Validate the release branch.
  5. Promote the release branch to `main` through a pull request.
  6. Create the version tag on the published commit in `main`.
- Do not merge directly into protected branches.
- Do not close CHOIR-124 as part of an intermediate release.

## Commit Messages

Follow Conventional Commits:

`<type>(<scope>): <subject>`

Examples: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `ci`.

## Pull Request Checklist

- Verify the target branch is correct for the ticket.
- Review the complete diff.
- Ensure relevant tests pass.
- Ensure the Angular build passes.
- Update documentation when required.
- Reference the relevant Jira ticket.
- Do not merge before required checks pass.

## Release Versioning

Keep the frontend version synchronized in:
- `package.json`
- `package-lock.json`
- `angular.json`

All three must contain exactly the same release version.

Do not invent or change a release version without explicit confirmation.
