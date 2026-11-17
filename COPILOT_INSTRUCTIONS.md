# Copilot Instructions – choir‑platform‑web

## 1️⃣ General Project Guidelines (already used)

- **Angular version**: 22.0.6 (see `angular.json`).
- **Package manager**: npm (use `npm ci` in CI, `npm install` locally).
- **Testing**: Vitest for unit tests (`ng test`), optional Playwright for e2e (`ng e2e`).
- **CI**: GitHub Actions workflow `.github/workflows/angular-ci.yml` runs on every PR to `main` and on every push to `main`. It:
  - Installs dependencies with `npm ci`.
  - Executes unit tests (`npx ng test --watch=false`).
  - Builds the app (`npx ng build`).
- **Static docs**: Stored under `docs/`, published via GitHub Pages from the `main` branch.
- **Formatting**: Prettier (`.prettierrc`), ESLint if present, always run `npm run lint` locally before committing.

## 2️⃣ GitFlow Rules (required)

| Branch type | Prefix | Purpose | Merge direction |
|-------------|--------|---------|-----------------|
| **Develop** | `develop` | Integration branch where features land. | → `main` (release) |
| **Feature** | `feature/XYZ` | New work for ticket **XYZ** (e.g., `feature/125-integradora`). | → `develop` |
| **Release** | `release/vX.Y.Z` | Prepare a new version. | → `main` (tag) and → `develop` (merge back) |
| **Hotfix** | `hotfix/XYZ` | Emergency fixes on production. | → `main` and → `develop` |
| **Support** | `support/XYZ` | Maintenance on previous release branches. | → none (only patches) |

**Naming conventions**
- Use *kebab‑case* for names (`feature/125-integradora`).
- Feature branches must always be created **from `develop`**.
- Pull requests must target the branch they merge into (`develop` for features, `main` for releases).

**Branch protection** (recommended, configure in GitHub):
- Require PR reviews (at least 1 reviewer).
- Require status checks (`angular-ci` workflow) to pass before merging.
- Disallow force pushes on protected branches.

## 3️⃣ Commit Message Style

Follow **Conventional Commits**:

```
<type>(<scope>): <subject>

<body>
<footer>
```

- `type` examples: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`, `perf`, `build`, `ci`.
- `scope` is optional but useful (`ticket-125`, `auth`, `layout`).
- Include ticket reference in body/footer (`Closes #125` or `Refs CHOIR‑125`).

### Example

```
feat(ticket-125): add integradora branch workflow

Implemented GitFlow feature branch `feature/125-integradora` and CI checks.
Closes CHOIR-125
```

## 4️⃣ Pull Request Checklist (copy‑paste in PR template)
- [ ] Branch created from `develop`.
- [ ] All unit tests pass (`npm test`).
- [ ] Lint passes (`npm run lint`).
- [ ] Changes adhere to the coding style (Prettier).
- [ ] Documentation updated (README, docs, changelog).
- [ ] Relevant ticket(s) referenced (`Closes CHOIR‑XXX`).
- [ ] Screenshots / UI changes attached if applicable.

## 5️⃣ Testing & Coverage
- Maintain **≥ 80 %** line coverage for new/modified code.
- Add unit tests for every new component/service (`*.spec.ts`).
- For UI changes, add at least one **Vitest** component test and, when critical, a **Playwright** e2e test in `e2e/`.

## 6️⃣ Linting & Formatting
- Run `npm run lint` locally before committing.
- Run `npm run format` (Prettier) on changed files.
- CI enforces lint + format; failures block the merge.

## 7️⃣ Release Process
1. Create a `release/vX.Y.Z` branch from `develop`.
2. Update `package.json` version, generate changelog (`npm run changelog`).
3. Run full CI, fix any issues.
4. Merge `release/vX.Y.Z` into `main` (creates a tag).
5. Merge `release/vX.Y.Z` back into `develop` to keep fixes.

---

> **Tip:** Edit this file whenever a rule changes; Copilot will immediately adapt its suggestions.
