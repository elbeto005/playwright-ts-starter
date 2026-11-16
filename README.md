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

# 4. Download the browsers Playwright needs
npx playwright install

# 5. Run the tests
npm test

# 6. Open the HTML report of the last run
npm run report
```

### Useful commands

| Command | Description |
| --- | --- |
| `npm test` | Run all tests in all browsers (headless) |
| `npx playwright test --project=chromium` | Run tests in a single browser |
| `npx playwright test --headed` | Run tests with a visible browser window |
| `npx playwright test --ui` | Open Playwright's UI mode to run and debug tests interactively |
| `npm run report` | Open the HTML report of the last run |

## Project structure

```text
playwright-ts-starter/
├── .github/
│   └── workflows/
│       └── playwright.yml   # CI pipeline: install, run tests, upload report
├── tests/
│   └── example.spec.ts      # Example tests against playwright.dev
├── .gitignore               # Ignores node_modules, reports, .env, etc.
├── .nvmrc                   # Node.js version used locally and in CI
├── package.json             # Scripts and dev dependencies
├── package-lock.json        # Locked dependency versions (used by npm ci)
└── playwright.config.ts     # Playwright configuration (browsers, retries, reporter)
```

## Continuous Integration

The [Playwright Tests](.github/workflows/playwright.yml) workflow runs on every push and pull request to `main`:

1. Checks out the code
2. Sets up Node.js using the version in `.nvmrc`
3. Installs dependencies with `npm ci`
4. Installs the browsers and their system dependencies
5. Runs the test suite
6. Uploads the HTML report as the `playwright-report` artifact, even when tests fail

To inspect a run, open the **Actions** tab, select the run and download the `playwright-report` artifact.

## Using this template

To start a new project from this starter, click **Use this template** at the top of the repository page, or clone it and point it to a new remote. Then replace `tests/example.spec.ts` with your own tests.

## Roadmap

- [ ] Page Object Model structure
- [ ] Custom Playwright fixtures
- [ ] ESLint and Prettier
- [ ] `.env.example` for environment-specific settings (base URL, credentials)
- [ ] Browser caching in CI to speed up the pipeline
