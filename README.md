# playwright-ts-starter

[![Playwright Tests](https://github.com/elbeto005/playwright-ts-starter/actions/workflows/playwright.yml/badge.svg)](https://github.com/elbeto005/playwright-ts-starter/actions/workflows/playwright.yml)

A minimal, ready-to-use starter for end-to-end testing with **Playwright** and **TypeScript**, with CI on GitHub Actions. It is the base template for the other projects in my QA automation portfolio.

## What's included

- **Playwright Test** with TypeScript
- **Cross-browser runs**: Chromium, Firefox and WebKit
- **GitHub Actions** workflow that runs the suite on every push and pull request to `main`
- **HTML report** uploaded as a CI artifact (kept for 30 days)
- **Pinned Node.js version** via `.nvmrc`, shared by local development and CI
- **CI-aware config**: retries, a single worker and `forbidOnly` are enabled only when running in CI
- **Linting and formatting** with ESLint (including Playwright-specific rules) and Prettier, enforced in CI
- **Type-aware linting**: ESLint uses TypeScript type information to catch a missing `await` on async calls
- **Page Object Model with custom fixtures**: tests receive page objects ready to use, with no setup code in the test
- **Environment variables** loaded from an optional `.env` file (for example, the base URL), with safe defaults for CI

## Requirements

- [Node.js](https://nodejs.org/) 24 (the version is defined in [`.nvmrc`](.nvmrc))
- [nvm](https://github.com/nvm-sh/nvm) (optional, recommended): run `nvm use` inside the project to switch to the right version

## Getting started

```bash
# 1. Clone the repository
git clone https://github.com/elbeto005/playwright-ts-starter.git
cd playwright-ts-starter

# 2. Use the Node.js version from .nvmrc (if you use nvm)
nvm use

# 3. Install the exact dependencies from package-lock.json
npm ci

# 4. (Optional) Create your local environment file
cp .env.example .env

# 5. Download the browsers Playwright needs
npx playwright install

# 6. Run the tests
npm test

# 7. Open the HTML report of the last run
npm run report
```

### Environment variables

Settings that change between environments live in a local `.env` file, which is ignored by Git. Copy [`.env.example`](.env.example) to `.env` and adjust the values. If `.env` does not exist (for example, in CI), the defaults are used.

| Variable   | Description                       | Default                  |
| ---------- | --------------------------------- | ------------------------ |
| `BASE_URL` | URL of the application under test | `https://playwright.dev` |

Never commit real credentials: add new variables to `.env.example` without secret values, and keep the real ones only in `.env`.

### Useful commands

| Command                                  | Description                                                    |
| ---------------------------------------- | -------------------------------------------------------------- |
| `npm test`                               | Run all tests in all browsers (headless)                       |
| `npx playwright test --project=chromium` | Run tests in a single browser                                  |
| `npx playwright test --headed`           | Run tests with a visible browser window                        |
| `npx playwright test --ui`               | Open Playwright's UI mode to run and debug tests interactively |
| `npm run report`                         | Open the HTML report of the last run                           |
| `npm run lint`                           | Check the code with ESLint                                     |
| `npm run format`                         | Format all files with Prettier                                 |
| `npm run format:check`                   | Check formatting without changing files (used in CI)           |

## Project structure

```text
playwright-ts-starter/
├── .github/
│   └── workflows/
│       └── playwright.yml   # CI pipeline: install, run tests, upload report
├── fixtures/
│   └── index.ts             # Custom fixtures: page objects ready to use in tests
├── pages/
│   └── home.page.ts         # Example page object for the playwright.dev home page
├── tests/
│   └── home.spec.ts         # Example tests that use the homePage fixture
├── .env.example             # Template for local environment variables (copy to .env)
├── .gitignore               # Ignores node_modules, reports, .env, etc.
├── .nvmrc                   # Node.js version used locally and in CI
├── .prettierignore          # Files Prettier should skip (on top of .gitignore)
├── .prettierrc.json         # Prettier settings
├── eslint.config.mjs        # ESLint rules (TypeScript + Playwright)
├── package.json             # Scripts and dev dependencies
├── package-lock.json        # Locked dependency versions (used by npm ci)
├── playwright.config.ts     # Playwright configuration (baseURL, browsers, retries, reporter)
└── tsconfig.json            # TypeScript settings (also used by ESLint for type-aware rules)
```

## Continuous Integration

The [Playwright Tests](.github/workflows/playwright.yml) workflow runs on every push and pull request to `main`:

1. Checks out the code
2. Sets up Node.js using the version in `.nvmrc`, with npm dependencies cached between runs
3. Installs dependencies with `npm ci`
4. Runs ESLint and checks formatting with Prettier (fails fast, before installing browsers)
5. Installs the browsers and their system dependencies
6. Runs the test suite
7. Uploads the HTML report as the `playwright-report` artifact, even when tests fail

To inspect a run, open the **Actions** tab, select the run and download the `playwright-report` artifact.

## Using this template

1. Click **Use this template** at the top of the repository page to create your own repository, then clone it.
2. Set `baseURL` in `playwright.config.ts` to the application you want to test.
3. Remove the examples: `pages/home.page.ts`, `tests/home.spec.ts` and the `homePage` fixture in `fixtures/index.ts`.
4. Add a page object for each page of your app in `pages/` (for example `login.page.ts`).
5. Register each page object as a fixture in `fixtures/index.ts`.
6. Write your tests in `tests/`, importing `test` and `expect` from `../fixtures`.

## Roadmap

- [x] Page Object Model structure
- [x] Custom Playwright fixtures
- [x] ESLint and Prettier
- [x] Type-aware linting (`no-floating-promises`) to catch missing `await` on Playwright actions
- [x] `.env.example` for environment-specific settings (base URL, credentials)
- [x] npm dependency caching in CI (pipeline went from ~106 s to ~59 s)
- [x] Browser caching in CI: evaluated and discarded. Restoring the cache plus installing system dependencies took as long as a full browser install, so it added complexity with no gain

### Nice to have

- [ ] Dependabot to open automated pull requests for dependency updates
