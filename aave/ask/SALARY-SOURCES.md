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

## Calculation and limits

The exact mean of these five upper bounds is USD 366,820; the displayed benchmark is USD 367,000. It drives the hourly rate and 221-day annual fee through the existing model. The rounded SEK anchor is 3,688,000 at the existing 13 November FX snapshot.

These are selected upper-market advertised bands across different employers, scopes, dates and US locations, not a representative salary survey, a guaranteed offer, or Aave's budget. The Google record has weaker provenance than the employer-hosted ServiceTitan advert; it is labelled accordingly on the page. Link availability can change after this check.
