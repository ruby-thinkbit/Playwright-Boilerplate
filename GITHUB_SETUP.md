# GitHub Actions Environment Configuration Guide

## Problem Analysis
The error "Cannot find module './config/env.config'" occurred because:

1. **Missing TypeScript Configuration**: GitHub Actions couldn't resolve TypeScript imports without a `tsconfig.json`
2. **No TypeScript Compilation**: The workflow didn't compile TypeScript before running tests
3. **No Environment Variables**: The workflow didn't set `TARGET_ENV` which Playwright needs to load the correct config

## What We Fixed

### 1. **tsconfig.json** - TypeScript Configuration
- Enables proper module resolution for TypeScript imports
- Configured for CommonJS (compatible with Playwright)
- Added path aliases for cleaner imports: `@config/*` and `@pages/*`

### 2. **Updated playwright.yml** - Smart Environment Detection
- **Automatic branch detection**: 
  - `main`/`master` branches → runs in `prod` environment
  - `develop`/`staging` branches → runs in `stage` environment
- **Sets `TARGET_ENV` variable** before running tests
- **Separate artifact reports** for each environment (`playwright-report-stage` vs `playwright-report-prod`)

## GitHub Setup Instructions

### Step 1: Enable Environment-Based Variables

If you need different configurations per environment (recommended for production), set up GitHub Environments:

1. Go to your repository → **Settings** → **Environments**
2. Create two environments:
   - **`stage`** (for develop/staging branches)
   - **`prod`** (for main/master branches)

3. For each environment, add variables:
   ```
   TARGET_ENV=stage    # or prod
   ```

### Step 2: Add Secrets (Optional - if using sensitive data)

If your config needs secrets (API keys, credentials, etc.):

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add secrets for both environments or globally:
   - `STAGE_API_KEY=<value>`
   - `PROD_API_KEY=<value>`
   - `STAGE_BASE_URL=https://stage.example.com`
   - `PROD_BASE_URL=https://prod.example.com`

3. Update `env.config.ts` to use them:
   ```typescript
   stage: {
     baseUrl: process.env.STAGE_BASE_URL || 'https://stage.example.com',
     // ...
   }
   ```

### Step 3: Update env.config.ts to Support Environment Variables

Enhance your config to use secrets:

```typescript
// config/env.config.ts
import dotenv from 'dotenv';
dotenv.config();

export type EnvType = 'stage' | 'prod';

interface UserCredentials {
  username: string;
  password: string;
}

interface EnvConfig {
  baseUrl: string;
  users: {
    standard: UserCredentials;
    lockedOut: UserCredentials;
    problem: UserCredentials;
    performanceGlitch: UserCredentials;
    errorUser: UserCredentials;
    visualUser: UserCredentials;
  };
}

const environmentConfig: Record<EnvType, EnvConfig> = {
  stage: {
    baseUrl: process.env.STAGE_BASE_URL || 'https://www.saucedemo.com',
    users: {
      standard: { 
        username: process.env.STAGE_USER_STANDARD || 'standard_user', 
        password: process.env.STAGE_PASS_STANDARD || 'secret_sauce' 
      },
      // ... other users
    },
  },
  prod: {
    baseUrl: process.env.PROD_BASE_URL || 'https://www.saucedemo.com',
    users: {
      standard: { 
        username: process.env.PROD_USER_STANDARD || 'standard_user', 
        password: process.env.PROD_PASS_STANDARD || 'secret_sauce' 
      },
      // ... other users
    },
  },
};

const currentEnv: EnvType = (process.env.TARGET_ENV as EnvType) || 'stage';
export const Config = environmentConfig[currentEnv];
```

## How It Works Now

### Local Testing
```bash
# Test stage environment (default)
npx playwright test --grep @stage

# Test prod environment
npx playwright test --grep @prod
```

### GitHub Actions (Automatic)
1. Push to `develop` or `staging` → runs in **stage** mode
2. Push to `main` or `master` → runs in **prod** mode
3. Pull requests inherit from target branch

## Troubleshooting

### If tests still fail on GitHub:
1. Check workflow logs: Repository → **Actions** → Failed workflow → Logs
2. Verify `TARGET_ENV` is set: Look for "Run Playwright tests (stage environment)" or similar
3. Ensure `.env.example` is committed to git
4. Test locally first: `npm run test:stage`

### Module not found errors:
- TypeScript compilation now happens automatically
- If errors persist, run locally: `npx tsc --noEmit` to check for TypeScript errors

## File Structure Recap
```
├── config/
│   └── env.config.ts          # Environment-based configuration
├── pages/                      # Page Object Models
├── tests/                      # Test files
├── .env.example               # Environment variables template
├── .github/
│   └── workflows/
│       └── playwright.yml     # CI/CD pipeline (now branch-aware)
├── tsconfig.json              # TypeScript config (NEW)
├── playwright.config.ts       # Playwright configuration
└── package.json
```

## Next Steps
1. ✅ Commit all changes to git
2. ✅ Push to GitHub
3. ✅ Monitor the Actions tab for test results
4. ✅ Configure GitHub Environments if needed for secrets/variables
