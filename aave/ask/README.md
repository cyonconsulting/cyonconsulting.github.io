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
- Reference days: 261 weekdays (2027) minus paid annual leave and paid holidays. Resolve each allowance from the salary ad, then relevant US company evidence, then the mean of available company counts, and finally the visible fallback if no count exists. Unknown and unlimited leave are not zero.
- Google’s other US engineering ad supplies 20 vacation days (first five years) and 13 paid holidays; Snap’s US company profile supplies 12 holidays and flexible vacation. Those give leave mean 20 (one company) and holiday mean 12.5 (two companies). Missing counts are explicitly estimated; policies do not measure actual time taken. See [SALARY-SOURCES.md](SALARY-SOURCES.md) for links, scope and rejected evidence.
- Apply the resulting hourly mean to Alexander's 221 billed days × 8 hours. That schedule excludes 35 additional leave days and five weekday Swedish red days.
- Default reference days: Snap 229; Google 228; Reddit, MetaMask and ServiceTitan 228.5. The comparison is about USD 200.67/hour and USD 355,000 annual invoices, using rounded SEK 3,568,000. The raw salary-band mean USD 366,820 is context, not the annual B2B target.
- Fallbacks remain 20 leave / zero additional holidays, but are inactive while company evidence supplies a mean. They are last-resort assumptions, not employee entitlements.
- FX is a dated 13 November 2026 snapshot: EUR 1 = USD 1.1052 = SEK 11.1075. SEK agreement and payment are preferred, not required.
- The contractor day rate stays fixed as contractor leave settings change. Paid time off bills all 261 weekdays. Monthly costs are budget averages, not retainers. Changing comparator assumptions recalculates the proposed rate; changing the custom SEK ask explores a separate fee.

## Content sources and verification

Credentials were checked against Alexander's iOS CV PDF and its LaTeX source in the CV repository. Public repositories were fetched from GitHub on 15 November 2026. The Aave assignment repository is private and labelled as requiring access.

The salary comparison uses five Principal iOS/Mobile employee-base ranges, checked against linked salary records. These are market context, not Aave's budget or direct B2B equivalents. Role fit references https://builtin.com/job/principal-ios-engineer/11194620 .

Mario Baxter's remark is user-supplied and explicitly labelled as Alexander's recollection of a paraphrase, not independently verified or verbatim.

The palette draws on https://github.com/aave-dao/aave-brand-kit and the existing Aave presentation. Desktop browser review covered the calculator, currency and period controls, SEK 1,000 increments, paid-leave comparison, reset and earlier layout revisions. Subsequent typography changes were applied for local review; mobile layout has not been visually verified.

## Publication

Commit and push are authorized. Deployment remains pending explicit approval. GitHub Pages publishes the root of `master`; keep this work on its feature branch until publication is approved. Do not merge into or push this work to `master` yet.

## Validation

Fourteen model checks cover company evidence, separate means, per-ad hourly normalization, fractional imputation, fallback precedence, calendar deductions, FX and contractor leave scenarios. Company evidence is labelled separately from estimates and linked in each table row. The sample is sparse: one numeric vacation policy and two holiday counts. It cannot establish typical employee time off at all five companies.
