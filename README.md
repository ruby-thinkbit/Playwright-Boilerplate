# Playwright Boilerplate

This repository is a simple Playwright boilerplate for web UI automation.

It includes:
- Playwright test setup in `playwright.config.ts`
- Page object files in `pages/` for reusable page behavior
- Example tests in `tests/` such as `login.spec.ts`
- Environment configuration support using `dotenv`

## What this code does

This code is used to help automate browser tests with Playwright. It is built as a starting point for:
- logging into a web application
- organizing selectors and actions in page objects
- running Playwright tests with a clean structure
- using environment variables safely with `dotenv`

## Install needed tools

1. Install Node.js and npm if you do not already have them.
2. Open a terminal in this project folder.
3. Install dependencies:

```powershell
npm install
```

4. Install Playwright browsers:

```powershell
npx playwright install
```

5. Add `dotenv` if needed in your project (this boilerplate expects environment config support):

```powershell
npm install dotenv
```

## Run tests

Use the Playwright test runner:

```powershell
npx playwright test
```

If you want to open the HTML report after tests:

```powershell
npx playwright show-report
```

## Playwright MCP / AI agent support

This boilerplate can work with Playwright MCP agents for AI-based test generation and healing.

### Install Playwright MCP and Agents

Run the following command to initialize Playwright agents in your project:

```powershell
npx playwright init-agents
```

This command will:
- Install the Playwright MCP server
- Generate agent files in `.github/agents/` directory:
  - `playwright-test-generator.agent.md` - generates new test files
  - `playwright-test-healer.agent.md` - debugs and fixes failing tests
  - `playwright-test-planner.agent.md` - creates comprehensive test plans

After initialization, these agent files will enable AI-assisted test creation and debugging features in your IDE.

## Create tests

Create new test files under `tests/` and use the Playwright test runner to execute them. Keep tests simple and readable by using page objects in `pages/`.

Example structure:
- `tests/login.spec.ts` for login scenarios
- `pages/login.page.ts` for login page actions
- `pages/inventory.page.ts` for inventory page actions

## Notes

- Keep environment variables in a `.env` file if you use `dotenv`.
- `config/env.config.ts` is where environment variables are loaded and used.
- `pages/login.page.ts` and `pages/inventory.page.ts` show how page objects help keep tests readable.
