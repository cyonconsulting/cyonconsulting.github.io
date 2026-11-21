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
- Numeric evidence: Google 20 vacation + 13 holidays; NBCUniversal 22 vacation/personal + 10 holidays; Snap 12 holidays. Missing counts use leave mean 21 (two companies) and holiday mean 35/3 (three companies). Sick, parental and caregiving allowances are excluded. See [SALARY-SOURCES.md](SALARY-SOURCES.md).
- Apply the mean hourly rate to Alexander's 221 billed days × 8 hours, excluding 35 leave days and five weekday Swedish red days.
- Selected sample: 10 distinct employers, every advertised upper band at least USD 200,000, one below USD 220,000 (cap five). One role per employer. Mean upper salary USD 316,608.40; mean hourly USD 173.35881; rounded annual target USD 306,000 and SEK anchor 3,075,000. The broader selected sample is not a representative salary survey.
- Fallbacks remain 20 leave / zero additional holidays, but are inactive while company evidence supplies a mean. They are last-resort assumptions, not employee entitlements.
- FX is a dated 13 November 2026 snapshot: EUR 1 = USD 1.1052 = SEK 11.1075. SEK agreement and payment are preferred, not required.
- The contractor day rate stays fixed as contractor leave settings change. Paid time off bills all 261 weekdays. Monthly costs are budget averages, not retainers. The page now presents the fixed proposal and salary evidence; exploratory calculator controls have been removed.

## Content sources and verification

Credentials were checked against Alexander's iOS CV PDF and its LaTeX source in the CV repository. Public repositories were fetched from GitHub on 15 November 2026. The Aave assignment repository is private and labelled as requiring access.

The salary comparison uses ten Principal iOS/Mobile employee-base ranges, checked against linked salary records. These are market context, not Aave's budget or direct B2B equivalents. Role fit references https://builtin.com/job/principal-ios-engineer/11194620 .

Mario Baxter's remark is user-supplied and explicitly labelled as Alexander's recollection of a paraphrase, not independently verified or verbatim.

The palette draws on https://github.com/aave-dao/aave-brand-kit and the existing Aave presentation. Desktop browser review covered the calculator, currency and period controls, SEK 1,000 increments, paid-leave comparison, reset and earlier layout revisions. Subsequent typography changes were applied for local review; mobile layout has not been visually verified.

## Publication

Republishing was explicitly authorized on 21 November 2026. GitHub Pages publishes the root of `master`. Restored the compensation page, including Walmart, MiniMed and NBCUniversal, with the original dated salary/PTO audit and 13 November 2026 FX snapshot. The references page remains available independently at `/aave/references/`.

## Validation

Sixteen model checks cover company evidence, separate means, per-ad hourly normalization, fractional imputation, fallback precedence, calendar deductions, FX and contractor leave scenarios. Company evidence is labelled separately from estimates and linked in each table row. The sample is sparse: two numeric leave policies and three holiday counts. It cannot establish typical employee time off at all ten companies.

## Simplified presentation

Removed the fallback inputs, Explore the cost calculator, calculation/currency prose and holiday-planning disclosure at the user’s request. The first-section formulas and linked salary table remain driven by the same model. SEK agreement/payment remains a preference, with USD/EUR possible. Prior calculator verification above is historical; it is no longer part of the page.

The three lowest advertised upper bands—ION/Lab49 USD 200,000, SharkNinja USD 210,000 and Green Dot USD 214,300—were removed at the user’s request. The ten retained roles form a selected higher-paying comparison, not a representative market sample.

NBCUniversal (USD 215,000 upper band) was previously removed, then restored on 21 November 2026. Its 22 vacation/personal days and 10 holidays now contribute to the sample means. Ten comparators remain.

Republication checks: all 16 model tests and JavaScript syntax validation passed. Native browser preview was attempted but the computer-use service could not start; the restored layout was not visually rechecked in this run.

## Compact recommendations and tenth source — 21 November 2026

NBCUniversal restored at Alex’s request. Its preserved salary advert and current US benefits page were rechecked: USD 185,000–215,000, 15 vacation + 7 personal days + 10 company holidays. Ten-source model yields USD 306,000 PA and SEK 3,075,000. The compact recommendation rows precede the annual headline; each contains only a portrait, name, role/company and at most 200 characters quoted from the full recommendation. Ellipses mark omitted text. Rows link to matching reference fragments. Reference-page fragment scrolling waits for asynchronous cards and font loading.

Validation for this update: all 23 model, privacy, quote and navigation checks passed, plus syntax checks for both scripts. Direct-link regression tests defer data and font loading, then verify `#vanja` and `#omar` scroll to the intended cards. Native browser preview could not start; visual/runtime browser verification remains unavailable in this run.
