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

## PTO audit — 16 November 2026

| Source | Annual PTO and public-holiday information | Model treatment |
| --- | --- | --- |
| Snap advert | No fixed ordinary annual-leave or holiday count. Parental leave is mentioned; do not treat it as recurring vacation. Company-level job-board metadata mentions unlimited PTO but does not quantify days or establish this role's actual use. | Unknown counts. |
| Reddit preserved advert | Flexible vacation, no numerical annual allowance or paid holiday count. | Unknown counts. |
| MetaMask preserved advert | No numerical annual-leave or paid-holiday allowance in this advert. | Unknown counts. |
| Google dated salary record | No PTO or holiday allowance in the surviving record. Original employer advert unavailable; do not infer a role-specific entitlement. | Unknown counts. |
| ServiceTitan employer advert | Flexible time off; no fixed annual allowance or paid holiday count. | Unknown counts. |

## Calculation and limits

Each source is normalized separately: `upperSalary / (8 * referenceDays)`. Reference days are 261 weekdays (2027) minus quantified, non-overlapping paid annual leave and paid holidays. When either count is missing, use that count's explicit fallback assumption.

Default fallbacks: 20 paid annual-leave days and zero additional paid public holidays. This gives 241 reference days for all five current sources. Zero additional holidays is a conservative calculation assumption, not a claim that employers offer none. The user asked to replace the overly conservative 261-day fallback with 241. Both fallback counts are adjustable on the page. Employer-specific stated counts take precedence, including an explicit zero.

The exact mean upper annual band remains USD 366,820, but it is not the B2B target. The mean normalized hourly comparison is about USD 190.26 at 241 reference days. Applied to 221 eight-hour billed days, it produces about USD 336,379, displayed as USD 336,000 PA. The rounded SEK anchor is 3,377,000 at the dated 13 November FX snapshot.

Sensitivity: 20 paid annual-leave days plus 10 additional holidays gives 231 reference days and about USD 351,000 PA. No assumed paid days off gives 261 days and about USD 311,000 PA. No source currently quantifies a count, so these are assumptions, not measured employee work schedules.

These are selected upper-market advertised bands across different employers, scopes, dates and US locations, not a representative salary survey, a guaranteed offer, or Aave's budget. The Google record has weaker provenance than the employer-hosted ServiceTitan advert; it is labelled accordingly on the page. Link availability can change after this check.
