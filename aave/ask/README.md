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

- Alexander confirmed an opening ask of approximately USD 317,000 in actual annual invoices after unpaid time off.
- The preferred agreement and payment currency is SEK; USD or EUR remain possible.
- The SEK anchor is 3,186,000, rounded from the ECB 13 November 2026 fixing: EUR 1 = USD 1.1052 = SEK 11.1075. Rates are a dated snapshot, not automatically refreshed.
- The 2027 estimate has 261 weekdays minus five weekday public holidays minus 35 additional leave days: 221 billed days. Optional holiday eves deduct three more days. Leave is counted outside public holidays to avoid overlap.
- The day rate stays fixed as leave settings change. Paid time off bills all 261 weekdays. The working day is eight hours; monthly costs are annual budget averages, not retainers.
- The original brief used 210 billed days; the confirmed annual ask is preserved approximately in the revised seven-week model. Annual amounts and salary bands display rounded figures; smaller fees display whole currency units.

## Content sources and verification

Credentials were checked against Alexander's iOS CV PDF and its LaTeX source in the CV repository. Public repositories were fetched from GitHub on 15 November 2026. The Aave assignment repository is private and labelled as requiring access.

The salary comparison uses five Principal employee-base ranges from the supplied compensation brief, checked against linked preserved job adverts. These are market context, not Aave's budget or direct B2B equivalents. Role fit references https://builtin.com/job/principal-ios-engineer/11194620 .

Mario Baxter's remark is user-supplied and explicitly labelled as Alexander's recollection of a paraphrase, not independently verified or verbatim.

The palette draws on https://github.com/aave-dao/aave-brand-kit and the existing Aave presentation. Desktop browser review covered the calculator, currency and period controls, SEK 1,000 increments, paid-leave comparison, reset and earlier layout revisions. Subsequent typography changes were applied for local review; mobile layout has not been visually verified.

## Publication

Commit and push are authorized. Deployment remains pending explicit approval. GitHub Pages publishes the root of `master`; keep this work on its feature branch until publication is approved. Do not merge into or push this work to `master` yet.

## Formula-led revision

The base target is now derived from the mean of five upper employee salary bands: USD 317,016, rounded to USD 317,000. Divide that annual benchmark by 221 days times eight hours to derive the hourly rate; averaging annual salaries does not itself give an hourly rate. The first section shows variables and substitutions, with letters A-E and colours matching the salary table immediately below. The SEK anchor is approximately 3,186,000 at the dated FX snapshot. Deployment remains unauthorized.
