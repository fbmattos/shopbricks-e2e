# ShopBricks E2E Test Suite

This repository contains end-to-end tests for the ShopBricks e-commerce platform using Playwright. The test suite covers critical user paths and core functionality to ensure the website works as expected.

## Test Coverage

### Critical Path Tests (@critical)

1. **Product Search** (`tests/product.search.spec.ts`)
   - Verifies search functionality
   - Tests product results visibility
   - Handles dynamic content loading
   - Tag: `@critical`

2. **Cart Operations** (`tests/cart.add-item.spec.ts`)
   - Tests adding items to cart from product detail pages
   - Verifies search-to-purchase flow
   - Ensures cart updates correctly
   - Tag: `@critical`

3. **Shop Filtering** (`tests/shop.filtering.spec.ts`)
   - Tests category filtering functionality
   - Verifies filter URL parameters
   - Ensures correct category navigation
   - Tag: `@critical`

### Smoke Tests (@smoke)

1. **Basic Navigation** (`tests/navigation.smoke.spec.ts`)
   - Tests homepage loading
   - Verifies main header visibility
   - Checks "Shop Now" navigation
   - Tag: `@smoke`

## Configuration

The test suite is configured with the following settings (see `playwright.config.ts`):

- **Timeout**: 10 seconds (optimized for production environment)
- **Browsers**: Tests run on Chromium, Firefox, and WebKit
- **Retries**: Enabled on CI (2 retries)
- **Parallel Execution**: Enabled for faster test runs
- **Trace**: Captures on first retry for debugging

## Running Tests

To run all tests:
```bash
npx playwright test
```

To run a specific test file:
```bash
npx playwright test tests/file-name.spec.ts
```

To run tests by tag:
```bash
npx playwright test --grep @critical  # Run critical path tests
npx playwright test --grep @smoke     # Run smoke tests
```

To run tests in a specific browser:
```bash
npx playwright test --project=chromium
```

## Test Organization

Tests are organized by functionality and tagged for easy filtering:
- `@critical`: Core business functionality tests
- `@smoke`: Basic navigation and functionality tests

Each test file focuses on a specific feature area and follows best practices for selector usage and wait strategies.