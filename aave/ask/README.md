# Aave compensation proposal

Buildless HTML, CSS and JavaScript for `/aave/ask/`.

## Preview and checks

From the repository root:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
node --test aave/ask/model.test.mjs
node --check aave/ask/app.mjs
```

Open http://127.0.0.1:8765/aave/ask/.

## Compensation model

- Normalize each upper annual employee salary separately to an hourly rate, then average: `mean(upperSalary / (8 * referenceDays))`.
- Reference days: 261 weekdays (2027) minus paid annual leave and paid holidays. Resolve each allowance from the salary ad, then relevant US company evidence, then the mean of available company counts, and finally the model fallback if no count exists. Unknown and unlimited leave are not zero.
- Numeric evidence: Google 20 vacation + 13 holidays; Snap 12 holidays. Missing counts use leave mean 20 (one company) and holiday mean 12.5 (two companies). Sick, parental and caregiving allowances are excluded. See [SALARY-SOURCES.md](SALARY-SOURCES.md).
- Apply the mean hourly rate to Alexander's 221 billed days × 8 hours, excluding 35 leave days and five weekday Swedish red days.
- Selected sample: 9 distinct employers, every advertised upper band at least USD 200,000, none below USD 220,000 (cap five). One role per employer. Mean upper salary USD 327,898.22; mean hourly USD 179.37737; rounded annual target USD 317,000 and SEK anchor 3,186,000. The broader selected sample is not a representative salary survey.
- Fallbacks remain 20 leave / zero additional holidays, but are inactive while company evidence supplies a mean. They are last-resort assumptions, not employee entitlements.
- FX is a dated 13 November 2026 snapshot: EUR 1 = USD 1.1052 = SEK 11.1075. SEK agreement and payment are preferred, not required.
- The contractor day rate stays fixed as contractor leave settings change. Paid time off bills all 261 weekdays. Monthly costs are budget averages, not retainers. The page now presents the fixed proposal and salary evidence; exploratory calculator controls have been removed.

## Content sources and verification

Credentials were checked against Alexander's iOS CV PDF and its LaTeX source in the CV repository. Public repositories were fetched from GitHub on 15 November 2026. The Aave assignment repository is private and labelled as requiring access.

The salary comparison uses nine Principal iOS/Mobile employee-base ranges, checked against linked salary records. These are market context, not Aave's budget or direct B2B equivalents. Role fit references https://builtin.com/job/principal-ios-engineer/11194620 .

Mario Baxter's remark is user-supplied and explicitly labelled as Alexander's recollection of a paraphrase, not independently verified or verbatim.

The palette draws on https://github.com/aave-dao/aave-brand-kit and the existing Aave presentation. Desktop browser review covered the calculator, currency and period controls, SEK 1,000 increments, paid-leave comparison, reset and earlier layout revisions. Subsequent typography changes were applied for local review; mobile layout has not been visually verified.

## Publication

Commit and push are authorized. Deployment remains pending explicit approval. GitHub Pages publishes the root of `master`; keep this work on its feature branch until publication is approved. Do not merge into or push this work to `master` yet.

## Validation

Sixteen model checks cover company evidence, separate means, per-ad hourly normalization, fractional imputation, fallback precedence, calendar deductions, FX and contractor leave scenarios. Company evidence is labelled separately from estimates and linked in each table row. The sample is sparse: one numeric leave policy and two holiday counts. It cannot establish typical employee time off at all nine companies.

## Simplified presentation

Removed the fallback inputs, Explore the cost calculator, calculation/currency prose and holiday-planning disclosure at the user’s request. The first-section formulas and linked salary table remain driven by the same model. SEK agreement/payment remains a preference, with USD/EUR possible. Prior calculator verification above is historical; it is no longer part of the page.

The three lowest advertised upper bands—ION/Lab49 USD 200,000, SharkNinja USD 210,000 and Green Dot USD 214,300—were removed at the user’s request. The ten remaining roles form a selected higher-paying comparison, not a representative market sample.

NBCUniversal (USD 215,000 upper band) was subsequently removed at the user’s request. Its PTO policy no longer contributes to the sample means. Nine comparators remain.
