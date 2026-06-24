# Playwright Boilerplate

This project is a simple Playwright test setup for web automation testing. It is written for junior QA engineers who are new to Playwright and GitHub Actions.

## 1. Prerequisites
Before you start, make sure you have the following installed:
- Node.js (recommended: latest LTS)
- npm
- preferred IDE

## 2. Install dependencies
Open the project folder in your terminal and run:

```bash
npm ci
```

This installs all required packages from package.json.

### I. Install Playwright browsers
Playwright needs browser binaries to run tests. Install them with:

```bash
npx playwright install --with-deps chromium
```

If you want all browsers, you can use:

```bash
npx playwright install --with-deps
```

### II. Environment variables (.env file)
This project uses a .env file to store test settings.

After pulling the code, create a file named .env in the project root and add the following values:

```env
BASE_URL=https://ecommerce-playground.lambdatest.io
USER_EMAIL=your_test_email@example.com
USER_PASSWORD=your_test_password
```

Important notes:
- Replace the example values with real test credentials.
- For CI/GitHub Actions, the same values should also be added as GitHub Secrets.
- The project loads the .env file automatically through dotenv.

### III. Dotenv usage
This project already uses dotenv, so you do not need to run a separate command normally.

If you want to install it manually, use:

```bash
npm install dotenv
```

If you ever need to run a Node script with dotenv manually, you can use:

```bash
npx dotenv -e .env -- node your-script.js
```

### IV. Playwright MCP usage
Playwright MCP can be added to your IDE so you can use browser automation features directly from the editor.

If you want to install it manually, run the following in your terminal:

```bash
npx @playwright/mcp@latest
```

If the client configuration still hangs, bypass the client completely and force your system to download and cache the package:

```bash
npm install -g @playwright/mcp
```

Install the package locally as a development dependency:

```bash
npm install -D @playwright/mcp@latest
```

Validate that the package was installed correctly:
```bash
npm list @playwright/mcp
```

To configure Playwright MCP in VS Code, open "Preferences: Open Settings (JSON)" and add the following MCP server configuration:

```json
{
  "servers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```
If the command-line option does not work in your environment, use the Settings JSON approach above instead.

## 3. Run tests
To run all Playwright tests:

```bash
npx playwright test
```

To run tests in a specific browser:

```bash
npx playwright test --project=chromium
```

To open the HTML report after a test run:

```bash
npx playwright show-report
```

To run tests in headed mode (visible browser):

```bash
npx playwright test --headed
```

## 4. Folder overview
- tests/: contains test cases
- pages/: contains page object classes
- helpers/: contains helper functions
- playwright.config.ts: main Playwright configuration
- .github/workflows/: contains GitHub Actions CI workflows

## 5. Common QA tips
- Always check that the .env file exists before running tests.
- If a test fails, review the Playwright report first.
- Keep test data separate from test code.
- Use meaningful test names so others can understand what each test checks.

## 6. Useful commands summary
```bash
npm ci
npx playwright install --with-deps chromium
npx playwright test
npx playwright test --project=chromium
npx playwright show-report
```
