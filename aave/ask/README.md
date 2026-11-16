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
- Reference days: 261 weekdays (2027) minus stated paid annual leave and paid holidays. Missing counts use explicit, adjustable assumptions: 20 paid leave days and zero additional paid holidays by default, giving 241 reference days. This does not assert that employees receive no holidays.
- Each current source was checked for a quantified allowance; none supplies one. See [SALARY-SOURCES.md](SALARY-SOURCES.md). Flexible or unlimited leave is not a numerical allowance. Stated counts override fallback counts if later verified.
- Apply the resulting hourly rate to Alexander's 221 billed days × 8 hours. That schedule excludes 35 additional leave days and five weekday Swedish red days, with no double deductions.
- The default comparison is about USD 190/hour and USD 336,000 annual invoices, using rounded SEK 3,377,000 as the preferred currency anchor. The salary-band mean USD 366,820 is context, not the annual B2B target.
- A 231-day employee reference year (20 leave + 10 holiday days) gives about USD 351,000 for Alexander; a 261-day reference year gives about USD 311,000. These are adjustable assumptions, not verified work schedules.
- FX is a dated 13 November 2026 snapshot: EUR 1 = USD 1.1052 = SEK 11.1075. SEK agreement and payment are preferred, not required.
- The contractor day rate stays fixed as contractor leave settings change. Paid time off bills all 261 weekdays. Monthly costs are budget averages, not retainers. Changing comparator assumptions recalculates the proposed rate; changing the custom SEK ask explores a separate fee.

## Content sources and verification

Credentials were checked against Alexander's iOS CV PDF and its LaTeX source in the CV repository. Public repositories were fetched from GitHub on 15 November 2026. The Aave assignment repository is private and labelled as requiring access.

The salary comparison uses five Principal iOS/Mobile employee-base ranges, checked against linked salary records. These are market context, not Aave's budget or direct B2B equivalents. Role fit references https://builtin.com/job/principal-ios-engineer/11194620 .

Mario Baxter's remark is user-supplied and explicitly labelled as Alexander's recollection of a paraphrase, not independently verified or verbatim.

The palette draws on https://github.com/aave-dao/aave-brand-kit and the existing Aave presentation. Desktop browser review covered the calculator, currency and period controls, SEK 1,000 increments, paid-leave comparison, reset and earlier layout revisions. Subsequent typography changes were applied for local review; mobile layout has not been visually verified.

## Publication

Commit and push are authorized. Deployment remains pending explicit approval. GitHub Pages publishes the root of `master`; keep this work on its feature branch until publication is approved. Do not merge into or push this work to `master` yet.

## PTO-normalized revision

The summary and table expose both the per-ad source findings and fallback assumptions. Unknown leave defaults to 20 days and unknown additional holidays to zero, after the user rejected 261 reference days as an overly conservative fallback. Twelve model checks cover mixed employer-specific counts, fallback overrides, annual normalization, calendar deductions, FX and the calculator. Desktop review includes changing fallback holidays and resetting the proposal. Commit and push are authorized; deployment remains unauthorized.
