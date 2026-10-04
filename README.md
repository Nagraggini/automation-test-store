![Playwright Tests](https://github.com/Nagraggini/automation-test-store/actions/workflows/playwright.yml/badge.svg)

# Automation Test Store Automation Framework

Automated UI test suite for the CURA Healthcare Service application, designed to demonstrate proficiency in modern test automation practices.

Tested web application: [https://automationteststore.com/](https://automationteststore.com/)

## Tech Stack

- Test framework: Playwright
- Language: TypeScript
- Scope: Automated UI testing

## Key Features

- End-to-end testing of the appointment booking workflow
- Cross-browser testing with Chromium, Firefox, and WebKit
- Parallel test execution to optimize CI/CD pipeline performance
- Clean and maintainable test architecture using the Page Object Model

## Allure Test Report

The automated test results and execution reports are generated and published automatically via GitHub Actions:

![Test Report](docs/images/allure-report.png)           
📊 [View Allure Report](https://nagraggini.github.io/automation-test-store/)

## Prerequisites

- Node.js (latest LTS version)
- npm (included with Node.js)

## Installation

Install the project dependencies and required Playwright browsers:

```bash
npm install
npx playwright install
```

## Running the Tests

Run all tests:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Open the Playwright HTML report:

```bash
npx playwright show-report
```