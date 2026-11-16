# Salary-source audit — 16 November 2026

Five distinct Principal iOS/Mobile roles are included. Figures below are exact annual USD employee base bands; the page rounds for display. HTTP results are from direct GETs with a browser user agent, checked together with the actual role and compensation text. An HTTP 200 alone does not establish that the advert survives.

| Role | Exact base band | Linked evidence | Verification |
| --- | --- | --- | --- |
| Snap, Principal Software Engineer, iOS | 276,000–414,000 | [Built In preserved advert](https://www.builtinsf.com/job/principal-software-engineer-ios/4750752) | HTTP 200; full advert and Zone A base range retained. 2025; CA/WA/NYC band. |
| Reddit, Principal Engineer, iOS Performance | 232,500–325,500 | [Remotestake preserved advert](https://remotestake.com/jobs/principal-engineer-ios-performance-9850301c46) | HTTP 200; role and exact base band present. Replaces Employbl, which returned HTTP 429. |
| Consensys / MetaMask, Principal Mobile Engineer, Platform | 227,000–272,000 | [Electric Capital preserved advert](https://jobs.electriccapital.com/companies/consensys-2-33323f7e-0ce6-439f-89d6-30a145d8d69c/jobs/85611542-principal-mobile-engineer-platform-metamask) | HTTP 200; closed advert retained; US-specific range excluding other compensation. |
| Google, Principal Engineer, iOS Search App | 307,000–427,000 | [7 June 2026 newsletter record](https://stanforiosdevelopers.substack.com/p/new-ios-hiring-activity-204) | HTTP 200; exact role, locations and cash band, with other compensation separately listed. This is a dated secondary record, not a surviving employer advert. |
| ServiceTitan, Principal Software Engineer, Mobile | 263,800–395,600 | [Employer Workday advert JR115706](https://servicetitan.wd1.myworkdayjobs.com/servicetitan/job/us-remote/principal-software-engineer--mobile_jr115706) | HTTP 200; employer JobPosting structured data contains the complete role and base-pay paragraph. Zone 1; Zone 2 is 246,500–369,700. |

## Replacements and exclusions

- Toast's Android-only role was replaced by ServiceTitan's iOS/Android platform leadership role.
- Procore's Startup Jobs URL returned HTTP 403 and a BeBee replacement returned HTTP 410. Removed from the working-source set, rather than counting search-cache text as a working link.
- Google's original careers URL returns HTTP 200 but shows job-not-found/search results: excluded as a source link. Cached search results differ on the upper figure (428,000); use the dated preserved record's 427,000 without combining variants. [Mobile Signal's fuller preserved description](https://www.mobilesignal.io/ios-jobs/principal-engineer-ios-search-google) was readable through web retrieval but a direct GET reset the connection, so the directly accessible newsletter is the linked source.
- RecWorks' Principal Mobile listing quotes GBP 220,000–300,000 including bonus: excluded from the base-only calculation.
- Estimated aggregator salaries, Staff/Senior Staff roles and product-management roles were excluded from this Principal-only set.

## Company-specific US PTO audit — 16 November 2026

The original salary ads do not quantify both allowances. Broadened the search to other ads, company careers/benefits pages, preserved company profiles and historical policies. Do not transfer an Ireland/UK entitlement or an hourly/non-exempt vacation bank into a US Principal software-engineering comparison.

| Company | Evidence and applicability | Numeric inputs |
| --- | --- | --- |
| Snap | [US company benefits profile on Built In](https://www.builtinnyc.com/company/snap-inc/benefits) separates flexible vacation for exempt staff from up to three weeks for non-exempt staff and lists 12 paid holidays. Use the company profile, not Built In's editorial FAQ. This is company-level evidence, not the historical Principal ad's contract. The current [employer benefits landing page](https://careers.snap.com/benefits) no longer exposes numeric US allowances. | Vacation unknown/flexible; holidays 12. Exclude non-exempt vacation bank and 15 sick days. |
| Reddit | [Employer careers page](https://redditinc.com/careers) says flexible vacation and Reddit global days off, without counts. The [historical Ireland microsite](https://ireland.redditinc.com/) says 25 days and has a 2021 footer/pre-IPO text: excluded from US inputs. | Both unknown; estimate from available-company means. |
| Consensys / MetaMask | [Company benefits profile on Wellfound](https://wellfound.com/company/consensys/culture_and_benefits) says unlimited vacation/holidays and quarterly zero-productivity days, but no annual numeric vacation or holiday allowance. Quarterly frequency does not establish how many days, or whether they overlap holidays/vacation. Current employer careers site has changed following corporate changes; do not treat unrelated later policies as the preserved MetaMask role's contract. | Both unknown; estimate from available-company means. Do not invent four recharge days. |
| Google | [Live employer Staff Software Engineer, Infrastructure, Google Cloud Runtimes ad](https://www.google.com/about/careers/applications/jobs/results/113654329000239814-staff-software-engineer-infrastructure-google-cloud-runtimes), benefit disclosure for all eligible US employees: 20 vacation days/year for first five years, plus 13 paid holidays/year. Full ad text verified, not merely a search result. Salary in that other ad is not used. This supplies a current US policy proxy for the preserved Principal salary record, not proof of its exact historical terms. [2022 employer-confirmed announcement reported by HR Dive](https://www.hrdive.com/news/google-expands-pto-sets-minimum-20-days-vacation/618108/) corroborates the 20-day minimum historically. | Vacation 20; holidays 13. Exclude sick, parental and caregiver leave. |
| ServiceTitan | Principal ad and [other employer analyst advert JR116409](https://servicetitan.wd1.myworkdayjobs.com/servicetitan/job/us-remote/senior-analyst--business-operations---strategy_jr116409) say flexible time off without annual counts. Employee anecdotes vary, so no numerical entitlement inferred from them. | Both unknown; estimate from available-company means. |

## Calculation and limits

Resolve each vacation/holiday count: salary advert → applicable company evidence → mean of known company counts → last-resort fallback. Compute each upper salary's hourly rate separately, then sum hourly rates and divide by five. Imputed counts never contribute to the evidence mean. Means are separate for vacation and holidays, including explicit zeros but excluding unknowns.

Available vacation mean: 20 days from Google alone. Available holiday mean: (12 Snap + 13 Google) / 2 = 12.5 days. This is a sparse comparison proxy, not a representative estimate of actual time taken at flexible/unlimited-PTO employers. Company holiday counts are treated as paid workday allowances; no 2027 employer holiday calendars were verified. Do not add Swedish holidays to these employee reference years.

| Company | Vacation input | Holiday input | Reference days | Upper salary / (8 × reference days) |
| --- | --- | --- | --- | --- |
| Snap | 20 estimated | 12 company profile | 229 | USD 225.98/hour |
| Reddit | 20 estimated | 12.5 estimated | 228.5 | USD 178.06/hour |
| MetaMask | 20 estimated | 12.5 estimated | 228.5 | USD 148.80/hour |
| Google | 20 US policy | 13 US policy | 228 | USD 234.10/hour |
| ServiceTitan | 20 estimated | 12.5 estimated | 228.5 | USD 216.41/hour |

Exact mean hourly: USD 200.67094894723934. At 221 eight-hour billed days this gives USD 354,786.24; rounded target USD 355,000 PA. SEK anchor 3,568,000 at the dated 13 November FX snapshot. The actual SEK agreement therefore has a small rounding difference from the formula. Previous all-unknown fallback result was USD 336,000; it is superseded by this evidence-enriched methodology.

Last-resort fallback settings remain 20 vacation days and zero additional holidays, but are inactive while evidence exists for both components. The model tests retain no-evidence cases to verify fallback behavior.

These selected upper-market advertised bands span different employers, scopes, dates and US locations. They are not a salary survey, a guaranteed offer or Aave's budget. Company policy proxies are not exact terms of the historical Principal ads. Flexible/unlimited PTO is not a measurable annual allowance. Links and policies can change after this audit.
