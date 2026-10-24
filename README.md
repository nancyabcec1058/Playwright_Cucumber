# 🥒 Playwright + Cucumber BDD Framework with Azure Cloud Execution

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![Cucumber](https://img.shields.io/badge/Cucumber-23D96C?style=for-the-badge&logo=cucumber&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Azure](https://img.shields.io/badge/Azure_Playwright_Workspaces-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)

A **Behaviour-Driven Development (BDD)** test framework that combines **Playwright** with **Cucumber.js**. Business-readable Gherkin scenarios drive a Page Object Model, and the Playwright suite runs in the cloud on **Azure Playwright Workspaces** from a **GitHub Actions** pipeline with 5 parallel workers.

---

## ✨ Key features

| Area | What's implemented |
|---|---|
| **BDD with Gherkin** | Feature files describe behaviour in plain English (`Given / When / Then`), so QA, developers and business people can read the same spec |
| **Scenario Outlines** | Data-driven negative tests use `Examples` tables to run one scenario with several inputs |
| **Tag-based execution** | `@Regression` and `@ErrorValidation` tags pick which scenarios run, and which hooks apply |
| **Cucumber hooks** | `Before` launches the browser and creates the page objects; `AfterStep` takes a screenshot automatically when a step fails |
| **World object** | Page objects and test state (such as the order ID) are shared across steps through Cucumber's World (`this`) |
| **Page Object Model** | Login, Dashboard, Cart, Checkout and Orders pages behind a `POManager` |
| **Retries and parallelism** | Failed scenarios retry once (`--retry 1`), and scenarios can run in parallel with `--parallel` |
| **Cloud execution** | `playwright.service.config.js` runs tests on **Azure Playwright Workspaces** using `@azure/playwright` and `DefaultAzureCredential` |
| **CI/CD** | GitHub Actions logs in to Azure with a stored secret, runs the suite in the cloud with 5 workers and uploads the report |
| **Reporting** | Cucumber HTML report, Playwright HTML report and Allure |
| **Playwright test suite** | The repo also includes Playwright specs for API + UI hybrid flows, network mocking, file upload/download, visual testing and a standalone REST `GET` API test |

## 🧰 Tech stack

| Tool | Purpose |
|---|---|
| Playwright | Browser automation and API testing |
| Cucumber.js | BDD runner and Gherkin parser |
| JavaScript (Node.js) | Step definitions, hooks and page objects |
| Azure Playwright Workspaces | Cloud browsers for scalable parallel runs |
| GitHub Actions | CI pipeline |
| ExcelJS, Allure | Excel handling and reporting |

## 📁 Project structure

```
Playwright_Cucumber/
├── .github/workflows/playwright.yml      # CI: Azure login + cloud test run
├── features/
│   ├── Ecommerce.feature                 # @Regression: place order, list products
│   ├── ErrorValidation.feature           # @ErrorValidation: Scenario Outline for bad logins
│   ├── stepDefinitions/Ecommerce_step.js # Step definitions
│   └── Support/hooks.js                  # Before / AfterStep / After hooks
├── PageObjects/                          # POM classes + POManager
├── tests/                                # Playwright Test specs
├── utils/                                # API helpers, fixtures, JSON test data
├── playwright.config.js                  # Local config
├── playwright.config1.js                 # Multi-browser config
├── playwright.service.config.js          # Azure Playwright Workspaces config
└── package.json
```

## 📝 Sample scenario

```gherkin
Feature: Ecommerce site validations

  @Regression
  Scenario: Place order
    Given Login to ecommerce site with "<user>" and "<password>"
    When Add "ZARA COAT 3" to cart
    Then Verify "ZARA COAT 3" is displayed in cart
    When Enter details in checkout verify "<user>" and place order
    Then Verify order is present in order history page
```

The order ID captured at checkout is stored on the World object and checked again on the order history page, so the scenario verifies the whole purchase from start to finish.

## 🚀 Getting started

**Prerequisites:** Node.js 18+ and npm.

```bash
git clone https://github.com/nancyabcec1058/Playwright_Cucumber.git
cd Playwright_Cucumber
npm install
npx playwright install
```

### Run BDD scenarios

```bash
npm run CucumberRegression                                  # @Regression, retry 1, HTML report
npx cucumber-js --tags "@ErrorValidation" --exit            # negative login scenarios
npx cucumber-js features/Ecommerce.feature --parallel 2 --exit
```

The Cucumber report is written to `cucumber-report.html`.

### Run the Playwright suite

```bash
npm run regression       # all Playwright specs
npm run webtest          # @web tagged tests
npm run APItest          # @API tagged tests
```

### Run on Azure Playwright Workspaces

```bash
az login
export PLAYWRIGHT_SERVICE_URL=<your-workspace-endpoint>
npx playwright test --config=playwright.service.config.js --workers=5
```

## 🔄 Continuous integration

`.github/workflows/playwright.yml` runs on every push and pull request to `main`/`master`:

1. Checks out the code and installs dependencies with `npm ci`
2. Signs in to Azure with the `AZURE_CREDENTIALS` secret
3. Runs the suite on Azure Playwright Workspaces with 5 workers, using the `PLAYWRIGHT_SERVICE_URL` variable
4. Uploads the Playwright HTML report as an artifact

## 👩‍💻 Author

**Nancy**, SDET / Senior QA Automation Engineer
[GitHub](https://github.com/nancyabcec1058) · [LinkedIn](https://www.linkedin.com/in/nancy1912)

> The application under test is a public demo site built for automation practice.
